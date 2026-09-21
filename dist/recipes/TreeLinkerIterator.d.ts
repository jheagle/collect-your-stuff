import { IsTreeNode } from './IsTreeNode';
/**
 * Class TreeLinkerIterator returns the next value taking a left-first approach down a tree.
 */
export declare class TreeLinkerIterator implements Iterator<IsTreeNode> {
    private current;
    private readonly boundaryParent;
    /**
     * Create an iterator starting at the given item.
     * @param {IsTreeNode} current The item to start from.
     * @param {IsTreeNode|null} [boundaryParent] The parent of the nodes to stay within (null for the top of a tree), the whole tree when not given.
     */
    constructor(current: IsTreeNode, boundaryParent?: IsTreeNode | null);
    /**
     * Get the current item and move on to the following one (left-first, down each branch).
     * @param {*} [value] Not used, present to match the Iterator interface.
     * @return {IteratorResult<IsTreeNode>} The current item, or done when there are no more.
     */
    next(value?: any): IteratorResult<IsTreeNode>;
}
