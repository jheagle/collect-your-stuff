/**
 * @file queue
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
import { Queueable } from './Queueable'
import { LinkedList } from '../linked-list/LinkedList'
import { IsArrayable } from '../../recipes/IsArrayable'
import { IsLinker } from '../../recipes/IsLinker'
import { completeResponse } from '../../recipes/Runnable'

/**
 * Maintain a series of queued items.
 */
export class Queue {
  /** The list which stores the queueables, the first is next to be dequeued. */
  public queuedList: IsArrayable<any>
  private listClass: any
  private queueableClass: typeof Queueable

  /**
   * Instantiate the queue with the given queue list.
   * @param {Iterable|LinkedList} queuedList Give the list of queueables to start in this queue.
   * @param {IsArrayable} [listClass=LinkedList] The type of list to create when no queued list is given.
   * @param {Queueable} [queueableClass=Queueable] The class used to wrap queued items.
   */
  public constructor (queuedList: IsArrayable<any> = null, listClass: any = LinkedList, queueableClass: typeof Queueable = Queueable) {
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
  public dequeue (): completeResponse | any {
    let next: Queueable | null = this.remove()
    // Tasks which already completed are discarded when they reach the front of the queue
    while (next && next.complete) {
      next = this.remove()
    }
    if (!next) {
      return {
        success: 'No more queueable tasks in the queue',
        error: false,
        context: this.queuedList,
      }
    }
    if (next.running) {
      // The unfinished task reports back through its own complete callback, so it is not kept in the queue
      return {
        success: false,
        error: 'The queue has been blocked by an unfinished task.',
        context: next,
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
        context: next,
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
  public empty (): boolean {
    return this.size() <= 0
  }

  /**
   * Add a queued task to the end of the queue
   * @param {Queueable} queueable Add a new queueable to the end of the queue
   */
  public enqueue (queueable: Queueable) {
    this.queuedList.append(queueable)
  }

  /**
   * Take a look at the next queued task
   * @return {Queueable}
   */
  public peek (): IsLinker {
    return this.queuedList.first
  }

  /**
   * Remove the next queued item and return it.
   * @return {Queueable|null}
   */
  public remove (): Queueable | null {
    if (this.empty()) {
      return null
    }
    return this.queuedList.remove(this.queuedList.first)
  }

  /**
   * Get the length of the current queue.
   * @return {number}
   */
  public size (): number {
    return this.queuedList.length
  }

  /**
   * Convert an array to a Queue.
   * @param {Array} values An array of values which will be converted to queueables in this queue
   * @param {Queueable} queueableClass The class to use for each queueable
   * @param {Queue|Iterable} listClass The class to use to manage the queueables
   * @returns {Queue}
   */
  public static fromArray = (values: Array<any> = [], queueableClass: typeof Queueable = Queueable, listClass: any = LinkedList): Queue => {
    const list: IsArrayable<any> = new listClass(queueableClass)
    list.initialize(queueableClass.fromArray(values, queueableClass).head)
    return new Queue(list, listClass, queueableClass)
  }
}
