'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.TaskQueue = void 0
const _Queueable = require('./Queueable')
const _LinkedList = require('../linked-list/LinkedList')
/**
 * @file task queue
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */

/**
 * Maintain a series of queued tasks (Queueables): dequeue() takes the next task from the front and RUNS it, giving each
 * task in turn a chance to run (a task which is not ready, or which has not finished, is placed at the back again).
 * This is a task scheduler, for a plain first-in-first-out collection of items use Queue.
 */
class TaskQueue {
  /**
   * Instantiate the queue with the given queue list.
   * @param {Iterable|LinkedList} queuedList Give the list of queueables to start in this queue.
   * @param {IsArrayable} [listClass=LinkedList] The type of list to create when no queued list is given.
   * @param {Queueable} [queueableClass=Queueable] The class used to wrap queued items.
   */
  constructor (queuedList = null, listClass = _LinkedList.LinkedList, queueableClass = _Queueable.Queueable) {
    this.listClass = listClass
    this.queueableClass = queueableClass
    if (queuedList === null) {
      queuedList = new listClass(queueableClass)
    }
    this.queuedList = queuedList
  }

  /**
   * Take a queued task from the front of the queue and run it if ready. A task which is not ready yet is kept in the
   * queue (never dropped), a task which is still running is reported as blocking and left to finish on its own, and
   * completed tasks are discarded.
   * @return {completeResponse|*}
   */
  dequeue () {
    let next = this.remove()
    // Tasks which already completed are discarded when they reach the front of the queue
    while (next && next.complete) {
      next = this.remove()
    }
    if (!next) {
      return {
        success: 'No more queueable tasks in the queue',
        error: false,
        context: this.queuedList
      }
    }
    if (next.running) {
      // The unfinished task reports back through its own complete callback, so it is not kept in the queue
      return {
        success: false,
        error: 'The queue has been blocked by an unfinished task.',
        context: next
      }
    }
    if (!next.isReady) {
      // Keep the task (at the back, so the next dequeue can try the other tasks) rather than losing it
      this.enqueue(next)
      // We could go check the next in queue here but if we end up in a state where nothing is ready it would infinite loop
      // Also, we want the loop handled externally
      return {
        success: false,
        error: 'Unable to find ready task.',
        context: next
      }
    }
    if (!this.empty()) {
      // Place back in queue to be checked once again next time, only if the queue will not be empty
      this.enqueue(next)
    }
    return next.run.call(next)
  }

  /**
   * Return true if the queue is empty (there are no tasks in the queue list)
   * @return {boolean}
   */
  empty () {
    return this.size() <= 0
  }

  /**
   * Add a queued task to the end of the queue
   * @param {Queueable} queueable Add a new queueable to the end of the queue
   */
  enqueue (queueable) {
    this.queuedList.append(queueable)
  }

  /**
   * Take a look at the next queued task
   * @return {Queueable}
   */
  peek () {
    return this.queuedList.first
  }

  /**
   * Remove the next queued item and return it.
   * @return {Queueable|null}
   */
  remove () {
    if (this.empty()) {
      return null
    }
    return this.queuedList.remove(this.queuedList.first)
  }

  /**
   * Get the length of the current queue.
   * @return {number}
   */
  size () {
    return this.queuedList.length
  }
}
/**
 * Convert an array to a TaskQueue.
 * @param {Array} values An array of values which will be converted to queueables in this queue
 * @param {Queueable} queueableClass The class to use for each queueable
 * @param {TaskQueue|Iterable} listClass The class to use to manage the queueables
 * @returns {TaskQueue}
 */
exports.TaskQueue = TaskQueue
TaskQueue.fromArray = (values = [], queueableClass = _Queueable.Queueable, listClass = _LinkedList.LinkedList) => {
  const list = new listClass(queueableClass)
  list.initialize(queueableClass.fromArray(values, queueableClass).head)
  return new TaskQueue(list, listClass, queueableClass)
}
