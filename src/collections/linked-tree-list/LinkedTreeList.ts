/**
 * @file doubly linked tree list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
import TreeLinker from './TreeLinker'
import { forEachCallback } from '../../recipes/IsArrayable'
import TreeLinkerIterator from '../../recipes/TreeLinkerIterator'
import IsTree from '../../recipes/IsTree'
import DoublyLinkedList from '../doubly-linked-list/DoublyLinkedList'
import IsTreeNode from '../../recipes/IsTreeNode'

/**
 * LinkedTreeList represents a collection stored with a root and spreading in branching (tree) formation.
 * @extends DoublyLinkedList
 */
class LinkedTreeList implements IsTree, Iterable<TreeLinker> {
  public readonly classType: typeof LinkedTreeList = LinkedTreeList
  public innerList: IsTreeNode | any = null
  public initialized: boolean = false
  public linkerClass: typeof TreeLinker

  /**
   * Create the new LinkedTreeList instance, configure the list class.
   */
  public constructor (linkerClass: typeof TreeLinker = TreeLinker) {
    this.linkerClass = linkerClass
  }

  /**
   * Initialize the inner list, should only run once.
   * @param {TreeLinker} initialList Give the list of tree-linkers to start in this linked-tree-list.
   * @return {LinkedTreeList}
   */
  public initialize (initialList: TreeLinker): LinkedTreeList {
    if (this.initialized) {
      console.warn('Attempt to initialize LinkedTreeList which is not empty.')
      return this
    }
    this.initialized = true
    this.innerList = initialList
    return this
  }

  /**
   * Retrieve a copy of the innerList used.
   * @returns {TreeLinker}
   */
  public get list (): TreeLinker {
    return this.innerList
  }

  /**
   * Retrieve the first TreeLinker in the list.
   * @returns {TreeLinker}
   */
  public get first (): TreeLinker {
    return this.reset()
  }

  /**
   * Retrieve the last TreeLinker in the list.
   * @returns {TreeLinker}
   */
  public get last (): TreeLinker {
    let tail: TreeLinker = this.innerList
    if (tail === null) {
      return null
    }
    let next: TreeLinker = tail.next
    while (next !== null) {
      tail = next
      next = tail.next
    }
    return tail
  }

  /**
   * Return the length of the list.
   * @returns {number}
   */
  public get length (): number {
    let current: TreeLinker = this.first
    let length: number = 0
    while (current !== null) {
      ++length
      current = current.next
    }
    return length
  }

  /**
   * Get the parent of this tree list.
   * @return {TreeLinker}
   */
  public get parent (): TreeLinker {
    const first = this.first
    if (first === null) {
      return null
    }
    return this.first.parent
  }

  /**
   * Set the parent of this tree list
   * @param {TreeLinker} parent The new node to use as the parent for this group of children
   */
  public set parent (parent: TreeLinker) {
    let current: TreeLinker = this.first
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
  public get rootParent (): TreeLinker {
    let current: TreeLinker = this.first
    if (!current) {
      return null
    }
    let parent: TreeLinker = this.first.parent
    while (parent !== null) {
      current = parent
      parent = current.parent
    }
    return current
  }

  /**
   * Set the children on a parent item.
   * @param {TreeLinker} item The TreeLinker node that will be the parent of the children
   * @param {LinkedTreeList} children The LinkedTreeList which has the child nodes to use
   */
  public setChildren (item: TreeLinker, children: LinkedTreeList = null): void {
    if (Array.from(this).indexOf(item) < 0) {
      console.error('item is not a child of this')
    }
    children.parent = item
  }

  /**
   * Insert a new node (or data) after a node.
   * @param {TreeLinker|*} node The existing node as reference
   * @param {TreeLinker|*} newNode The new node to go after the existing node
   * @returns {LinkedTreeList}
   */
  public insertAfter (node: TreeLinker, newNode: TreeLinker | any): LinkedTreeList {
    return DoublyLinkedList.prototype.insertAfter.call(this, node, newNode)
  }

  /**
   * Insert a new node (or data) before a node.
   * @param {TreeLinker|*} node The existing node as reference
   * @param {TreeLinker|*} newNode The new node to go before the existing node
   * @returns {LinkedTreeList}
   */
  public insertBefore (node: TreeLinker, newNode: TreeLinker | any): LinkedTreeList {
    return DoublyLinkedList.prototype.insertBefore.call(this, node, newNode)
  }

  /**
   * Add a node (or data) after the given (or last) node in the list.
   * @param {TreeLinker|*} node The new node to add to the end of the list
   * @param {TreeLinker} after The existing last node
   * @returns {TreeLinker}
   */
  public append (node: TreeLinker | any, after: TreeLinker = this.last): LinkedTreeList {
    return DoublyLinkedList.prototype.append.call(this, node, after)
  }

  /**
   * Add a node (or data) before the given (or first) node in the list.
   * @param {TreeLinker|*} node The new node to add to the start of the list
   * @param {TreeLinker} before The existing first node
   * @returns {TreeLinker}
   */
  public prepend (node: TreeLinker | any, before: TreeLinker = this.first): LinkedTreeList {
    return DoublyLinkedList.prototype.prepend.call(this, node, before)
  }

  /**
   * Remove a linker from this linked list.
   * @param {TreeLinker} node The node we wish to remove (and it will be returned after removal)
   * @return {TreeLinker}
   */
  public remove (node: TreeLinker): TreeLinker {
    return DoublyLinkedList.prototype.remove.call(this, node)
  }

  /**
   * Refresh all references and return head reference.
   * @return {TreeLinker}
   */
  public reset (): TreeLinker {
    return DoublyLinkedList.prototype.reset.call(this)
  }

  /**
   * Retrieve a TreeLinker item from this list by numeric index, otherwise return null.
   * @param {number} index The integer number for retrieving a node by position.
   * @returns {TreeLinker|null}
   */
  public item (index: number): TreeLinker {
    return DoublyLinkedList.prototype.item.call(this, index)
  }

  /**
   * Be able to run forEach on this LinkedTreeList to iterate over the TreeLinker Items.
   * @param {forEachCallback} callback The function to call for-each tree node
   * @param {LinkedTreeList} thisArg Optional, 'this' reference
   */
  public forEach (callback: forEachCallback, thisArg: LinkedTreeList = this): LinkedTreeList {
    let index: number = 0
    let current: TreeLinker = thisArg.first
    while (current !== null) {
      callback(current, index, thisArg)
      current = current.next
      ++index
    }
    return thisArg
  }

  /**
   * Be able to iterate over this class.
   * @returns {Iterator}
   */
  [Symbol.iterator] (): Iterator<TreeLinker> {
    let root: IsTreeNode = this.rootParent
    return new TreeLinkerIterator(root)
  }

  /**
   * Convert an array into a LinkedTreeList instance, return the new instance.
   * @param {Array} [values=[]] An array of values which will be converted to nodes in this tree-list
   * @param {TreeLinker} [linkerClass=TreeLinker] The class to use for each node
   * @param {IsArrayable<TreeLinker>} [classType=LinkedTreeList] Provide the type of IsArrayable to use.
   * @returns {LinkedTreeList}
   */
  public static fromArray = (values: Array<any> = [], linkerClass: typeof TreeLinker = TreeLinker, classType: any = LinkedTreeList): IsTree | any => {
    const list: IsTree = new classType(linkerClass)
    return list.initialize(linkerClass.fromArray(values).head)
  }
}

export default LinkedTreeList
