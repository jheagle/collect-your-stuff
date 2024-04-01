'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.Queue = void 0
var _Queueable = require('./Queueable')
var _LinkedList = require('../linked-list/LinkedList')
/**
 * @file queue
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */

/**
 * Maintain a series of queued items.
 */
class Queue {
  /**
   * Instantiate the queue with the given queue list.
   * @param {Iterable|LinkedList} queuedList Give the list of queueables to start in this queue.
   * @param {IsArrayable} listClass
   * @param {Queueable} queueableClass
   */
  constructor () {
    let queuedList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null
    const listClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _LinkedList.LinkedList
    const queueableClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Queueable.Queueable
    this.listClass = listClass
    this.queueableClass = queueableClass
    if (queuedList === null) {
      queuedList = new listClass(queueableClass)
    }
    this.queuedList = queuedList
  }

  /**
   * Take a queued task from the front of the queue and run it if ready.
   * @return {completeResponse|*}
   */
  dequeue () {
    const next = this.remove()
    if (!next) {
      return {
        success: 'No more queueable tasks in the queue',
        error: false,
        context: this.queuedList
      }
    }
    if (next.complete) {
      // Previously ran queued, run next
      return this.dequeue()
    }
    if (next.running) {
      return {
        success: false,
        error: 'The queue has been blocked by an unfinished task.',
        context: next
      }
    }
    if (!this.empty()) {
      // Place back in queue to be checked once again next time, only if the queue will not be empty
      this.enqueue(next)
    }
    if (next.isReady) {
      return next.run.call(next)
    }
    // We could go check the next in queue here but if we end up in a state where nothing is ready it would infinite loop
    // Also, we want the loop handled externally
    return {
      success: false,
      error: 'Unable to find ready task.',
      context: next
    }
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
 * Convert an array to a Queue.
 * @param {Array} values An array of values which will be converted to queueables in this queue
 * @param {Queueable} queueableClass The class to use for each queueable
 * @param {Queue|Iterable} listClass The class to use to manage the queueables
 * @returns {Queue}
 */
exports.Queue = Queue
Queue.fromArray = function () {
  const values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
  const queueableClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Queueable.Queueable
  const listClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _LinkedList.LinkedList
  const list = new listClass(queueableClass)
  list.initialize(queueableClass.fromArray(values, queueableClass).head)
  return new Queue(list, listClass, queueableClass)
}
