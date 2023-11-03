/**
 * @file queue
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import Queueable, { completeResponse } from './Queueable'
import LinkedList from '../linked-list/LinkedList'
import IsArrayable from '../../recipes/IsArrayable'
import IsElement from '../../recipes/IsElement'

/**
 * Maintain a series of queued items.
 * @see [Java Queue Interface]{@link http://www.cs.williams.edu/~freund/cs136-073/javadoc/structure5/structure5/Queue.html}
 */
class Queue {
  public queuedList: IsArrayable<any>

  /**
   * Instantiate the queue with the given queue list.
   * @param {Iterable|LinkedList} queuedList
   */
  constructor (queuedList: IsArrayable<any>) {
    this.queuedList = queuedList
  }

  /**
   * Add a queued task to the end of the queue
   * @param {Queueable|*} queueable
   */
  add (queueable: IsElement<Queueable>) {
    this.queuedList.append(queueable)
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
   * Add a queued task to the end of the queue (alias for 'add()')
   * @param {Queueable} queueable
   */
  enqueue (queueable: Queueable) {
    this.add(queueable)
  }

  /**
   * Return a reference to the next queued task.
   * @return {Queueable}
   */
  get (): IsElement<Queueable> {
    return this.queuedList.first
  }

  /**
   * Return a reference to the next queued / first queued task (alias for 'get()')
   * @return {Queueable}
   */
  getFirst (): IsElement<Queueable> {
    return this.get()
  }

  /**
   * Take a look at the next queued task (alias for 'get()')
   * @return {Queueable}
   */
  peek (): IsElement<Queueable> {
    return this.get()
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
   * @methodof Queue
   * @param {Array} values
   * @param {Queueable} queueableClass
   * @param {Queue|Iterable} listClass
   * @returns {Queue}
   */
  public static fromArray = (values: Array<any> = [], queueableClass: typeof Queueable = Queueable, listClass: any = LinkedList): Queue => {
    const list: IsArrayable<any> = new listClass(queueableClass)
    list.initialize(queueableClass.fromArray(values).head)
    return new Queue(list)
  }
}

export default Queue
