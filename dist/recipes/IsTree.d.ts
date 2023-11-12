import IsTreeNode from './IsTreeNode';
import IsArrayable from './IsArrayable';
/**
 * Arrayable represents a collection stored as Elements.
 */
export default interface IsTree extends IsArrayable<IsTreeNode> {
    /**
     * @property {IsTreeNode} rootParent
     */
    rootParent: IsTreeNode;
}
