import { Linker } from '../linked-list/Linker';
import { IsArrayable } from '../../recipes/IsArrayable';
import { IsStack } from '../../recipes/IsStack';
/**
 * A last-in-first-out collection: items are added to the top with push and taken from the top with pop. Any value can
 * be stacked (it is stored as it is, whether it is a function, an object or null), and adding and taking are constant
 * time. To stack tasks which are run as they are taken use TaskStack.
 */
export declare class Stack<T = any> implements IsStack<T>, Iterable<T> {
    /** The list which stores the stacked items, the first is the top of the stack. */
    stackedList: IsArrayable<any>;
    private readonly linkerClass;
    /**
     * Instantiate the stack, optionally with a list of items to start from.
     * @param {IsArrayable|null} [stackedList=null] The list of linkers to start in this stack (the first is the top)
     * @param {IsArrayable} [listClass=LinkedList] The type of list to create when no stacked list is given
     * @param {Linker} [linkerClass=Linker] The class used to hold each stacked item
     */
    constructor(stackedList?: IsArrayable<any> | null, listClass?: any, linkerClass?: typeof Linker);
    /**
     * Check whether the stack has no items.
     * @return {boolean}
     */
    empty(): boolean;
    /**
     * Look at the item on the top of the stack, without removing it.
     * @return {*|null} The item, or null when the stack is empty
     */
    peek(): T | null;
    /**
     * Take the item from the top of the stack.
     * @return {*|null} The item, or null when the stack is empty
     */
    pop(): T | null;
    /**
     * Add an item to the top of the stack.
     * @param {*} data The item to add
     * @return {Stack} This stack, so that adding can be chained
     */
    push(data: T): this;
    /**
     * Count the items in the stack.
     * @return {number}
     */
    size(): number;
    /**
     * The item on the top of the stack (the same as peek).
     * @return {*|null} The item, or null when the stack is empty
     */
    top(): T | null;
    /**
     * Iterate over the items from the top of the stack to the bottom, without removing them.
     * @return {Iterator}
     */
    [Symbol.iterator](): Iterator<T>;
    /**
     * Convert an array to a Stack by pushing each value in turn, so the last value is on the top.
     * @param {Array} [values=[]] The items to stack
     * @param {IsArrayable} [listClass=LinkedList] The type of list used to store the items
     * @param {Linker} [linkerClass=Linker] The class used to hold each stacked item
     * @returns {Stack}
     */
    static fromArray: <T_1 = any>(values?: Array<T_1>, listClass?: any, linkerClass?: typeof Linker) => Stack<T_1>;
}
