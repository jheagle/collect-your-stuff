/**
 * Stack recipe.
 */
/**
 * Define a last-in-first-out stack: items are added to the top (push) and taken from the top (pop).
 */
export interface IsStack<T = any> {
    /**
     * Check whether the stack has no items.
     */
    empty: () => boolean;
    /**
     * Look at the item on the top of the stack, without removing it.
     * @returns The item, or null when the stack is empty
     */
    peek: () => T | null;
    /**
     * Take the item from the top of the stack.
     * @returns The item, or null when the stack is empty
     */
    pop: () => T | null;
    /**
     * Add an item to the top of the stack.
     * @param data The item to add
     */
    push: (data: T) => void;
    /**
     * Count the items in the stack.
     */
    size: () => number;
}
