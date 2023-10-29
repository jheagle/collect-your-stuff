/**
 * @file doubly linked tree list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import DoublyLinkedList from '../doubly-linked-llist/DoublyLinkedList'
import TreeLinker from './TreeLinker'

/**
 * LinkedTreeList represents a collection stored with a root and spreading in branching (tree) formation..
 * @extends DoublyLinkedList
 */
class LinkedTreeList extends DoublyLinkedList {
  /**
   * Create the new LinkedTreeList instance, configure the list class.
   * @param {LinkedTreeList|Iterable} [listClass=LinkedTreeList]
   */
  constructor (listClass = LinkedTreeList) {
    super(listClass)
  }

  /**
   * Get the parent of this tree list.
   * @return {TreeLinker}
   */
  get parent () {
    return this.first.parent
  }

  /**
   * Set the parent of this tree list
   * @param {TreeLinker} parent
   */
  set parent (parent) {
    let current = this.first
    while (current !== null) {
      current.parent = parent
      current = current.next
    }
    if (parent) {
      parent.children = this
    }
  }

  /**
   * Return the root parent of the entire tree.
   * @return {TreeLinker}
   */
  get rootParent () {
    let current = this.first
    let parent = this.first.parent
    while (parent !== null) {
      current = parent
      parent = current.parent
    }
    return current
  }

  /**
   * Set the children on a parent item.
   * @param {TreeLinker} item
   * @param {LinkedTreeList} children
   */
  setChildren (item, children = null) {
    if (Array.from(this).indexOf(item) < 0) {
      console.error('item is not a child of this')
    }
    children.parent = item
  }
}

/**
 * Create an instance of LinkedTreeList from an array
 * @memberof LinkedTreeList
 * @param {Array} [values=[]]
 * @param {TreeLinker} [linkerClass=TreeLinker]
 * @param {LinkedTreeList} [listClass=LinkedTreeList]
 * @returns {DoublyLinkedList}
 */
LinkedTreeList.fromArray = (values = [], linkerClass = TreeLinker, listClass = LinkedTreeList) =>
  DoublyLinkedList.fromArray(values, linkerClass, listClass)

export default LinkedTreeList
