import { IsTreeNode } from './IsTreeNode'
import { IsArrayable } from './IsArrayable'

/**
 * Arrayable represents a collection stored as Elements.
 */
export interface IsTree extends IsArrayable<IsTreeNode> {
  /**
   * @property {IsTreeNode} rootParent
   */
  rootParent: IsTreeNode
}
