import { IsArrayable } from './IsArrayable'
import { IsDoubleLinker } from './IsDoubleLinker'
import { LinkedTreeList } from '../collections/linked-tree-list/LinkedTreeList'

/**
 * Define the common attributes of a Tree Node for a tree structure.
 */
export interface IsTreeNode extends IsDoubleLinker {
  /**
   * @property {IsTreeNode} [next=null]
   */
  next: IsTreeNode
  /**
   * @property {IsTreeNode} [prev=null]
   */
  prev: IsTreeNode
  /**
   * @property {IsTreeNode|null} [parent=null]
   */
  parent: IsTreeNode | null
  /**
   * @property {IsArrayable<IsTreeNode>|null} [children=null]
   */
  children: IsArrayable<IsTreeNode> | null

  /**
   * Create the children for this tree from an array.
   * @param {Array} children
   */
  childrenFromArray (children: Array<any> | null): LinkedTreeList
}
