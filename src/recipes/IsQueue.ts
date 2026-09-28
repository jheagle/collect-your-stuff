/**
 * Queue recipe.
 */

/**
 * Define a first-in-first-out queue: items are added to the back (enqueue) and taken from the front (dequeue).
 * This is the shape which si-funciona's queueManager / queueTimeout expect of a queue.
 */
export interface IsQueue<T = any> {
  /**
   * Take the item from the front of the queue.
   * @returns The item, or null when the queue is empty
   */
  dequeue: () => T | null

  /**
   * Check whether the queue has no items.
   */
  empty: () => boolean

  /**
   * Add an item to the back of the queue.
   * @param data The item to add
   */
  enqueue: (data: T) => void

  /**
   * Look at the item at the front of the queue, without removing it.
   * @returns The item, or null when the queue is empty
   */
  peek: () => T | null

  /**
   * Count the items in the queue.
   */
  size: () => number
}
