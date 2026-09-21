/**
 * @file doubly linked tree node.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
import { IsArrayable } from '../../recipes/IsArrayable'
import { IsTreeNode } from '../../recipes/IsTreeNode'
import { DoubleLinker } from '../doubly-linked-list/DoubleLinker'
import { IsTree } from '../../recipes/IsTree'
import { LinkedTreeList } from './LinkedTreeList'

/**
 * TreeLinker represents a node in a LinkedTreeList having a parent (or root) and child nodes.
 * @extends DoubleLinker
 */
export class TreeLinker implements IsTreeNode {
  /** The class used to create this instance, so that it can be recognized as valid without an instanceof check. */
  public readonly classType: typeof TreeLinker = TreeLinker
  /** The data stored in this tree node. */
  public data: any = null
  /** The sibling after this node, or null when this is the last child. */
  public next: IsTreeNode | null = null
  /** The sibling before this node, or null when this is the first child. */
  public prev: IsTreeNode | null = null
  /** The node this node is a child of, or null for a root node. */
  public parent: IsTreeNode = null
  /** The list of the children of this node, or null when it has none. */
  public children: IsArrayable<IsTreeNode> = null

  /**
   * Create the new TreeLinker instance, provide the data and optionally set references for next, prev, parent, or children.
   * @param {Object} [settings={}] The settings for the new tree node.
   * @param {*} [settings.data=null] The data to be stored in this tree node
   * @param {TreeLinker} [settings.next=null] The reference to the next linker if any
   * @param {TreeLinker} [settings.prev=null] The reference to the previous linker if any
   * @param {LinkedTreeList} [settings.children=null] The references to child linkers if any
   * @param {TreeLinker} [settings.parent=null] The reference to a parent linker if any
   * @param {IsArrayable<IsTreeNode>} listClass Give the type of list to use for storing the children
   */
  public constructor ({
    data = null,
    next = null,
    prev = null,
    children = null,
    parent = null,
    listClass = LinkedTreeList
  }:
    {
      data?: any;
      next?: IsTreeNode;
      prev?: IsTreeNode;
      children?: Array<any>;
      parent?: IsTreeNode;
      listClass?: any
    } = {}) {
    this.data = data
    this.next = next
    this.prev = prev
    this.parent = parent
    this.children = this.childrenFromArray(children, listClass)
  }

  /**
   * Create the children for this tree from an array. Each child becomes a tree linker with this node as its parent: an
   * existing linker is kept as it is, an object with a data property gives the settings of the linker, and anything
   * else is the data of the linker.
   * @param {Array|null} children Provide an array of data / linker references to be children of this tree node.
   * @param {IsArrayable<IsTreeNode>} listClass Give the type of list to use for storing the children
   * @return {LinkedTreeList|null}
   */
  public childrenFromArray (children: Array<any> | null = null, listClass: any = LinkedTreeList): IsTree | any {
    if (children === null) {
      return null
    }
    // Every child is made into a tree linker (an existing one is kept as it is, and a plain value is the data) and is
    // given this node as its parent
    const nodes = children.map(child => {
      const linker = this.classType.make(child, this.classType)
      linker.parent = this
      return linker
    })
    // Creates a linked-tree-list to store the children, which remembers this node as its parent even when it is empty
    const list = listClass.fromArray(nodes, this.classType)
    list.parent = this
    return list
  }

  /**
   * Make a new DoubleLinker from the data given if it is not already a valid Linker.
   * @param {TreeLinker|*} linker Return a valid TreeLinker instance from given data, or even an already valid one.
   * @param {IsTreeNode} [classType=TreeLinker] Provide the type of IsTreeNode to use.
   * @return {TreeLinker}
   */
  public static make = (linker: TreeLinker | any, classType: any = TreeLinker): IsTreeNode | any => {
    return DoubleLinker.make(linker, classType)
  }

  /**
   * Convert an array into DoubleLinker instances, return the head and tail DoubleLinkers.
   * @param {Array} [values=[]] Provide an array of data that will be converted to a chain of tree-linkers.
   * @param {IsTreeNode} [classType=TreeLinker] Provide the type of IsTreeNode to use.
   * @returns {{head: TreeLinker, tail: TreeLinker}}
   */
  public static fromArray = (values: Array<any> = [], classType: any = TreeLinker): {
    head: TreeLinker | any;
    tail: TreeLinker | any;
  } => DoubleLinker.fromArray(values, classType)
}
