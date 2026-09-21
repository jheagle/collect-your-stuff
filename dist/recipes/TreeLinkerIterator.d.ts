import { IsTreeNode } from './IsTreeNode';
/**
 * Class TreeLinkerIterator returns the next value taking a left-first approach down a tree.
 */
export declare class TreeLinkerIterator implements Iterator<IsTreeNode> {
    private current;
    /**
     * Create an iterator starting at the given item.
     * @param {IsTreeNode} current The item to start from.
     */
    constructor(current: IsTreeNode);
    /**
     * Get the current item and move on to the following one (left-first, down each branch).
     * @param {*} [value] Not used, present to match the Iterator interface.
     * @return {IteratorResult<IsTreeNode>} The current item, or done when there are no more.
     */
    next(value?: any): IteratorResult<IsTreeNode>;
}
