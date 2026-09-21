/**
 * @file Queue recipe.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
/**
 * Define a first-in-first-out queue: items are added to the back (enqueue) and taken from the front (dequeue).
 * This is the shape which si-funciona's queueManager / queueTimeout expect of a queue.
 */
export interface IsQueue<T = any> {
    /**
     * Take the item from the front of the queue.
     * @return {T|null} The item, or null when the queue is empty
     */
    dequeue: () => T | null;
    /**
     * Check whether the queue has no items.
     * @return {boolean}
     */
    empty: () => boolean;
    /**
     * Add an item to the back of the queue.
     * @param {T} data The item to add
     */
    enqueue: (data: T) => void;
    /**
     * Look at the item at the front of the queue, without removing it.
     * @return {T|null} The item, or null when the queue is empty
     */
    peek: () => T | null;
    /**
     * Count the items in the queue.
     * @return {number}
     */
    size: () => number;
}
