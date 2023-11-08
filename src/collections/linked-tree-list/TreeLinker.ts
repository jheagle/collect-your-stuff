/**
 * @file doubly linked tree node.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
import IsArrayable from '../../recipes/IsArrayable'
import LinkedTreeList from './LinkedTreeList'
import IsTreeNode from '../../recipes/IsTreeNode'

/**
 * TreeLinker represents a node in a LinkedTreeList having a parent (or root) and child nodes.
 */
class TreeLinker implements IsTreeNode {
  public readonly classType: typeof TreeLinker
  public data: any = null
  public next: TreeLinker | null = null
  public prev: TreeLinker | null = null
  public parent: IsTreeNode = null
  public children: IsArrayable<IsTreeNode> = null

  /**
   * Create the new TreeLinker instance, provide the data and optionally set references for next, prev, parent, or children.
   * @param {Object} [settings={}]
   * @param {*} [settings.data=null] The data to be stored in this tree node
   * @param {TreeLinker} [settings.next=null] The reference to the next linker if any
   * @param {TreeLinker} [settings.prev=null] The reference to the previous linker if any
   * @param {LinkedTreeList} [settings.children=null] The references to child linkers if any
   * @param {TreeLinker} [settings.parent=null] The reference to a parent linker if any
   */
  constructor ({ data = null, next = null, prev = null, children = null, parent = null }:
    { data?: any; next?: TreeLinker; prev?: TreeLinker; children?: Array<any>; parent?: TreeLinker } = {}) {
    this.classType = TreeLinker
    this.data = data
    this.next = next
    this.prev = prev
    this.parent = parent
    this.children = this.childrenFromArray(children)
  }

  /**
   * Create the children for this tree from an array.
   * @param {Array|null} children Provide an array of data / linker references to be children of this tree node.
   * @return {LinkedTreeList|null}
   */
  childrenFromArray (children: Array<any> | null = null): LinkedTreeList {
    if (children === null) {
      return null
    }
    // Creates a linked-tree-list to store the children.
    return LinkedTreeList.fromArray(
      children.map(child => Object.assign({}, child, { parent: this })),
      TreeLinker
    )
  }

  /**
   * Make a new DoubleLinker from the data given if it is not already a valid Linker.
   * @param {TreeLinker|*} linker Return a valid TreeLinker instance from given data, or even an already valid one.
   * @return {TreeLinker}
   */
  public static make = (linker: TreeLinker | any): IsTreeNode => {
    if (typeof linker !== 'object') {
      // It is not an object, so instantiate the DoubleLinker with element as the data
      return new TreeLinker({ data: linker })
    }
    if (linker.classType) {
      // Already valid DoubleLinker, return as-is
      return linker
    }
    if (!linker.data) {
      linker = { data: linker }
    }
    // Create the new node as the configured #classType
    return new TreeLinker(linker)
  }

  /**
   * Convert an array into DoubleLinker instances, return the head and tail DoubleLinkers.
   * @param {Array} [values=[]] Provide an array of data that will be converted to a chain of tree-linkers.
   * @returns {{head: TreeLinker, tail: TreeLinker}}
   */
  public static fromArray = (values: Array<any> = []): {
    head: TreeLinker;
    tail: TreeLinker;
  } => values.reduce(
    (references, linker) => {
      const newLinker = TreeLinker.make(linker)
      if (references.head === null) {
        // Initialize the head and tail with the new node
        return { head: newLinker, tail: newLinker }
      }
      newLinker.prev = references.tail
      // Only update the tail once head has been set, tail is always the most recent node
      references.tail.next = newLinker
      references.tail = newLinker
      return references
    },
    { head: null, tail: null }
  )
}

export default TreeLinker
