/**
 * @file doubly linked tree item.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import IsElement from '../../recipes/IsElement'
import DoubleLinker from '../doubly-linked-list/DoubleLinker'
import IsArrayable from '../../recipes/IsArrayable'
import DoublyLinkedList from '../doubly-linked-list/DoublyLinkedList'
import LinkedTreeList from './LinkedTreeList'

/**
 * TreeLinker represents a node in a LinkedTreeList.
 */
class TreeLinker implements IsElement<TreeLinker> {
  public readonly classType: typeof TreeLinker
  public data: any = null
  public next: TreeLinker | null = null
  public prev: TreeLinker | null = null
  public parent: IsElement<TreeLinker> = null
  public children: IsArrayable<LinkedTreeList> = null

  /**
   * Create the new TreeLinker instance, provide the data and optionally configure the type of Linker.
   * @param {Object} [settings={}]
   * @param {*} [settings.data=null]
   * @param {TreeLinker} [settings.prev=null]
   * @param {TreeLinker} [settings.next=null]
   * @param {LinkedTreeList} [settings.children=null]
   * @param {TreeLinker} [settings.parent=null]
   */
  constructor ({
    data = null,
    prev = null,
    next = null,
    children = null,
    parent = null
  }: { data?: any; prev?: TreeLinker; next?: TreeLinker; children?: Array<any>; parent?: TreeLinker } = {}) {
    this.classType = TreeLinker
    this.data = data
    this.next = next
    this.prev = prev
    this.parent = parent
    this.children = this.childrenFromArray(children)
  }

  /**
   * Create the children for this tree from an array.
   * @param {Array|null} children
   * @return {DoubleLinker|null}
   */
  childrenFromArray (children: Array<any> | null = null): LinkedTreeList {
    if (children === null) {
      return null
    }
    return LinkedTreeList.fromArray(
      children.map(child => Object.assign({}, child, { parent: this })),
      TreeLinker
    )
  }

  /**
   * Make a new DoubleLinker from the data given if it is not already a valid Linker.
   * @param {TreeLinker|*} linker
   * @return {TreeLinker}
   */
  public static make = (linker: TreeLinker | any): IsElement<TreeLinker> => {
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
   * @methodof TreeLinker
   * @param {Array} [values=[]]
   * @param {TreeLinker} [linkerClass=TreeLinker]
   * @returns {{head: TreeLinker, tail: TreeLinker}}
   */
  public static fromArray = (values: Array<any> = [], linkerClass: typeof TreeLinker = TreeLinker): {
    head: TreeLinker;
    tail: TreeLinker;
  } => values.reduce(
    (references, linker) => {
      const newLinker = linkerClass.make(linker)
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
