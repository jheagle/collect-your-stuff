/**
 * @file Stack recipe.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
/**
 * Define a last-in-first-out stack: items are added to the top (push) and taken from the top (pop).
 */
export interface IsStack<T = any> {
    /**
     * Check whether the stack has no items.
     * @return {boolean}
     */
    empty: () => boolean;
    /**
     * Look at the item on the top of the stack, without removing it.
     * @return {T|null} The item, or null when the stack is empty
     */
    peek: () => T | null;
    /**
     * Take the item from the top of the stack.
     * @return {T|null} The item, or null when the stack is empty
     */
    pop: () => T | null;
    /**
     * Add an item to the top of the stack.
     * @param {T} data The item to add
     */
    push: (data: T) => void;
    /**
     * Count the items in the stack.
     * @return {number}
     */
    size: () => number;
}
