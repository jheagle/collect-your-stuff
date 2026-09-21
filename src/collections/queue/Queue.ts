/**
 * @file queue
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 2.0.0
 * @memberOf module:collect-your-stuff
 */
import { LinkedList } from '../linked-list/LinkedList'
import { Linker } from '../linked-list/Linker'
import { IsArrayable } from '../../recipes/IsArrayable'
import { IsQueue } from '../../recipes/IsQueue'

/**
 * A first-in-first-out collection: items are added to the back with enqueue and taken from the front with dequeue.
 * Any value can be queued (it is stored as it is, whether it is a function, an object or null), and adding and taking
 * are constant time. To queue tasks which are run as they are taken use TaskQueue.
 */
export class Queue<T = any> implements IsQueue<T>, Iterable<T> {
  /** The list which stores the queued items, the first is next to be dequeued. */
  public queuedList: IsArrayable<any>
  private readonly linkerClass: typeof Linker

  /**
   * Instantiate the queue, optionally with a list of items to start from.
   * @param {IsArrayable|null} [queuedList=null] The list of linkers to start in this queue (the first is the front)
   * @param {IsArrayable} [listClass=LinkedList] The type of list to create when no queued list is given
   * @param {Linker} [linkerClass=Linker] The class used to hold each queued item
   */
  public constructor (queuedList: IsArrayable<any> | null = null, listClass: any = LinkedList, linkerClass: typeof Linker = Linker) {
    this.linkerClass = linkerClass
    this.queuedList = queuedList === null ? new listClass(linkerClass) : queuedList
  }

  /**
   * Take the item from the front of the queue.
   * @return {*|null} The item, or null when the queue is empty
   */
  public dequeue (): T | null {
    const front = this.queuedList.first
    if (front === null || typeof front === 'undefined') {
      return null
    }
    this.queuedList.remove(front)
    return front.data
  }

  /**
   * Check whether the queue has no items.
   * @return {boolean}
   */
  public empty (): boolean {
    return this.size() <= 0
  }

  /**
   * Add an item to the back of the queue.
   * @param {*} data The item to add
   * @return {Queue} This queue, so that adding can be chained
   */
  public enqueue (data: T): this {
    // The item is wrapped here rather than left to the list, since the list treats objects that look like a linker's
    // settings (they have a data property) as such, and a queue must give back exactly what it was given
    this.queuedList.append(new this.linkerClass({ data }))
    return this
  }

  /**
   * Look at the item at the front of the queue, without removing it.
   * @return {*|null} The item, or null when the queue is empty
   */
  public peek (): T | null {
    const front = this.queuedList.first
    return front === null || typeof front === 'undefined' ? null : front.data
  }

  /**
   * Count the items in the queue.
   * @return {number}
   */
  public size (): number {
    return this.queuedList.length
  }

  /**
   * Iterate over the items from the front of the queue to the back, without removing them.
   * @return {Iterator}
   */
  public [Symbol.iterator] (): Iterator<T> {
    const linkers: Iterator<any> = this.queuedList[Symbol.iterator]()
    return {
      next: (): IteratorResult<T> => {
        const result = linkers.next()
        return result.done ? { done: true, value: undefined } : { done: false, value: result.value.data }
      }
    }
  }

  /**
   * Convert an array to a Queue, the first value is at the front.
   * @param {Array} [values=[]] The items to queue
   * @param {IsArrayable} [listClass=LinkedList] The type of list used to store the items
   * @param {Linker} [linkerClass=Linker] The class used to hold each queued item
   * @returns {Queue}
   */
  public static fromArray = <T = any>(values: Array<T> = [], listClass: any = LinkedList, linkerClass: typeof Linker = Linker): Queue<T> => {
    const queue = new Queue<T>(null, listClass, linkerClass)
    values.forEach(value => queue.enqueue(value))
    return queue
  }
}
