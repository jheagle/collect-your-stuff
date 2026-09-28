'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.Queue = void 0
require('core-js/modules/esnext.iterator.constructor.js')
require('core-js/modules/esnext.iterator.for-each.js')
const _LinkedList = require('../linked-list/LinkedList')
const _Linker = require('../linked-list/Linker')
/**
 * queue
 */

/**
 * A first-in-first-out collection: items are added to the back with enqueue and taken from the front with dequeue.
 * Any value can be queued (it is stored as it is, whether it is a function, an object or null), and adding and taking
 * are constant time. To queue tasks which are run as they are taken use TaskQueue.
 */
class Queue {
  /**
   * Instantiate the queue, optionally with a list of items to start from.
   * @param queuedList The list of linkers to start in this queue (the first is the front)
   * @param listClass The type of list to create when no queued list is given
   * @param linkerClass The class used to hold each queued item
   */
  constructor (queuedList = null, listClass = _LinkedList.LinkedList, linkerClass = _Linker.Linker) {
    this.linkerClass = linkerClass
    this.queuedList = queuedList === null ? new listClass(linkerClass) : queuedList
  }

  /**
   * Take the item from the front of the queue.
   * @returns The item, or null when the queue is empty
   */
  dequeue () {
    const front = this.queuedList.first
    if (front === null || typeof front === 'undefined') {
      return null
    }
    this.queuedList.remove(front)
    return front.data
  }

  /**
   * Check whether the queue has no items.
   */
  empty () {
    return this.size() <= 0
  }

  /**
   * Add an item to the back of the queue.
   * @param data The item to add
   * @returns This queue, so that adding can be chained
   */
  enqueue (data) {
    // The item is wrapped here rather than left to the list, since the list treats objects that look like a linker's
    // settings (they have a data property) as such, and a queue must give back exactly what it was given
    this.queuedList.append(new this.linkerClass({
      data
    }))
    return this
  }

  /**
   * Look at the item at the front of the queue, without removing it.
   * @returns The item, or null when the queue is empty
   */
  peek () {
    const front = this.queuedList.first
    return front === null || typeof front === 'undefined' ? null : front.data
  }

  /**
   * Count the items in the queue.
   */
  size () {
    return this.queuedList.length
  }

  /**
   * Iterate over the items from the front of the queue to the back, without removing them.
   */
  [Symbol.iterator] () {
    const linkers = this.queuedList[Symbol.iterator]()
    return {
      next: () => {
        const result = linkers.next()
        return result.done
          ? {
              done: true,
              value: undefined
            }
          : {
              done: false,
              value: result.value.data
            }
      }
    }
  }
}
/**
 * Convert an array to a Queue, the first value is at the front.
 * @param values The items to queue
 * @param listClass The type of list used to store the items
 * @param linkerClass The class used to hold each queued item
 */
exports.Queue = Queue
Queue.fromArray = (values = [], listClass = _LinkedList.LinkedList, linkerClass = _Linker.Linker) => {
  const queue = new Queue(null, listClass, linkerClass)
  values.forEach(value => queue.enqueue(value))
  return queue
}
