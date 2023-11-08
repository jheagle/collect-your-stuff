import IsTreeNode from './IsTreeNode';
/**
 * Class TreeLinkerIterator returns the next value taking a left-first approach down a tree.
 */
declare class TreeLinkerIterator implements Iterator<IsTreeNode> {
    private current;
    constructor(current: IsTreeNode);
    next(value?: any): IteratorResult<IsTreeNode>;
}
export default TreeLinkerIterator;
