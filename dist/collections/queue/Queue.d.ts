import { Linker } from '../linked-list/Linker';
import { IsArrayable } from '../../recipes/IsArrayable';
import { IsQueue } from '../../recipes/IsQueue';
/**
 * A first-in-first-out collection: items are added to the back with enqueue and taken from the front with dequeue.
 * Any value can be queued (it is stored as it is, whether it is a function, an object or null), and adding and taking
 * are constant time. To queue tasks which are run as they are taken use TaskQueue.
 */
export declare class Queue<T = any> implements IsQueue<T>, Iterable<T> {
    /** The list which stores the queued items, the first is next to be dequeued. */
    queuedList: IsArrayable<any>;
    private readonly linkerClass;
    /**
     * Instantiate the queue, optionally with a list of items to start from.
     * @param queuedList The list of linkers to start in this queue (the first is the front)
     * @param listClass The type of list to create when no queued list is given
     * @param linkerClass The class used to hold each queued item
     */
    constructor(queuedList?: IsArrayable<any> | null, listClass?: any, linkerClass?: typeof Linker);
    /**
     * Take the item from the front of the queue.
     * @returns The item, or null when the queue is empty
     */
    dequeue(): T | null;
    /**
     * Check whether the queue has no items.
     */
    empty(): boolean;
    /**
     * Add an item to the back of the queue.
     * @param data The item to add
     * @returns This queue, so that adding can be chained
     */
    enqueue(data: T): this;
    /**
     * Look at the item at the front of the queue, without removing it.
     * @returns The item, or null when the queue is empty
     */
    peek(): T | null;
    /**
     * Count the items in the queue.
     */
    size(): number;
    /**
     * Iterate over the items from the front of the queue to the back, without removing them.
     */
    [Symbol.iterator](): Iterator<T>;
    /**
     * Convert an array to a Queue, the first value is at the front.
     * @param values The items to queue
     * @param listClass The type of list used to store the items
     * @param linkerClass The class used to hold each queued item
     */
    static fromArray: <T_1 = any>(values?: Array<T_1>, listClass?: any, linkerClass?: typeof Linker) => Queue<T_1>;
}
