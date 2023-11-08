/**
 * @file queue
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
import Queueable from './Queueable'
import LinkedList from '../linked-list/LinkedList'
import IsArrayable from '../../recipes/IsArrayable'
import IsLinker from '../../recipes/IsLinker'
import { completeResponse } from '../../recipes/Runnable'

/**
 * Maintain a series of queued items.
 */
class Queue {
  public queuedList: IsArrayable<any>

  /**
   * Instantiate the queue with the given queue list.
   * @param {Iterable|LinkedList} queuedList Give the list of queueables to start in this queue.
   */
  constructor (queuedList: IsArrayable<any>) {
    this.queuedList = queuedList
  }

  /**
   * Take a queued task from the front of the queue and run it if ready.
   * @return {completeResponse|*}
   */
  dequeue (): completeResponse | any {
    const next: Queueable = this.remove()
    if (!next) {
      return {
        success: 'No more queueable tasks in the queue',
        error: false,
        context: this.queuedList,
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
        context: next,
      }
    }
    // Place back in queue to be checked once again next time
    this.enqueue(next)
    if (next.isReady) {
      return next.run.call(next)
    }
    // We could go check the next in queue here but if we end up in a state where nothing is ready it would infinite loop
    // Also, we want the loop handled externally
    return {
      success: false,
      error: 'Unable to find ready task.',
      context: next,
    }
  }

  /**
   * Return true if the queue is empty (there are no tasks in the queue list)
   * @return {boolean}
   */
  empty (): boolean {
    return this.size() <= 0
  }

  /**
   * Add a queued task to the end of the queue
   * @param {Queueable} queueable Add a new queueable to the end of the queue
   */
  enqueue (queueable: Queueable) {
    this.queuedList.append(queueable)
  }

  /**
   * Take a look at the next queued task
   * @return {Queueable}
   */
  peek (): IsLinker {
    return this.queuedList.first
  }

  /**
   * Remove the next queued item and return it.
   * @return {Queueable|null}
   */
  remove (): Queueable | null {
    if (this.empty()) {
      return null
    }
    return this.queuedList.remove(this.queuedList.first)
  }

  /**
   * Get the length of the current queue.
   * @return {number}
   */
  size (): number {
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
    list.initialize(queueableClass.fromArray(values).head)
    return new Queue(list)
  }
}

export default Queue
