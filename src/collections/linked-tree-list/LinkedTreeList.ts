/**
 * @file doubly linked tree list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
import { TreeLinker } from './TreeLinker'
import { forEachCallback } from '../../recipes/IsArrayable'
import { TreeLinkerIterator } from '../../recipes/TreeLinkerIterator'
import { IsTree } from '../../recipes/IsTree'
import { DoublyLinkedList } from '../doubly-linked-list/DoublyLinkedList'
import { IsTreeNode } from '../../recipes/IsTreeNode'

/**
 * Use one of the accessors of DoublyLinkedList (which keeps track of the head, tail and length) for a LinkedTreeList.
 * @param {string} name The accessor to use
 * @param {LinkedTreeList} list The list to use it on
 * @returns {*}
 */
const borrowedGetter = (name: 'first' | 'last' | 'length', list: LinkedTreeList): any => (
  (Object.getOwnPropertyDescriptor(DoublyLinkedList.prototype, name) as PropertyDescriptor).get as () => any
).call(list)

/**
 * LinkedTreeList represents a collection stored with a root and spreading in branching (tree) formation.
 * @extends DoublyLinkedList
 */
export class LinkedTreeList implements IsTree, Iterable<TreeLinker> {
  /** The class used to create this instance, so that it can be recognized as valid without an instanceof check. */
  public readonly classType: typeof LinkedTreeList = LinkedTreeList
  /** A linker of the list (null when the list is empty); the head is found by walking back from it. */
  public innerList: IsTreeNode | any = null
  /** Whether the inner list has been initialized (it can only be initialized once). */
  public initialized: boolean = false
  /** The class used to wrap the data given to this list as tree linkers. */
  public linkerClass: typeof TreeLinker

  /** The last linker, remembered so that adding to the end does not need to walk the whole list (null when not known yet). */
  private tailCache: TreeLinker | null = null
  /** The number of linkers, kept up to date by the list's own methods so that the length does not need to walk the whole list (null when not known yet). */
  private countCache: number | null = null
  /** The node these linkers are the children of, remembered so that it is known even while the list is empty (undefined until it is known). */
  private ownerNode: TreeLinker | null | undefined = undefined

  /**
   * Create the new LinkedTreeList instance, configure the list class.
   * @param {TreeLinker} [linkerClass=TreeLinker] The class used to wrap given data as tree linkers.
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
   * Retrieve the innerList used (the list itself, not a copy).
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
    return borrowedGetter('first', this)
  }

  /**
   * Retrieve the last TreeLinker in the list. The end is remembered, so this does not walk the list.
   * @returns {TreeLinker}
   */
  public get last (): TreeLinker {
    return borrowedGetter('last', this)
  }

  /**
   * Return the length of the list. It is kept up to date by the list's own methods, so this does not walk the list
   * (call reset() after linkers were changed directly).
   * @returns {number}
   */
  public get length (): number {
    return borrowedGetter('length', this)
  }

  /**
   * Get the parent of this tree list: the node these linkers are the children of (remembered even while the list is
   * empty), or null for the linkers at the top of a tree.
   * @return {TreeLinker|null}
   */
  public get parent (): TreeLinker | null {
    if (this.ownerNode !== undefined) {
      return this.ownerNode
    }
    const first = this.first
    return first === null ? null : first.parent as TreeLinker
  }

  /**
   * Set the parent of this tree list: every linker in it gets the node as its parent, and the node gets this list as its
   * children. Linkers added to the list later get this parent too.
   * @param {TreeLinker|null} parent The new node to use as the parent for this group of children
   */
  public set parent (parent: TreeLinker | null) {
    this.ownerNode = parent
    let current: TreeLinker = this.first
    while (current !== null) {
      current.parent = parent
      current = current.next as TreeLinker
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
   * @param {TreeLinker} item The TreeLinker node (one of the linkers of this list) that will be the parent of the children
   * @param {LinkedTreeList|null} [children=null] The LinkedTreeList which has the child nodes to use, or null to remove the children of the item
   * @throws {Error} When the item is not one of the linkers of this list
   */
  public setChildren (item: TreeLinker, children: LinkedTreeList | null = null): void {
    // The item must be one of the linkers of this list (only the siblings are checked, not the whole tree)
    let isChild: boolean = false
    this.forEach((linker: any) => {
      if (linker === item) {
        isChild = true
      }
    })
    if (!isChild) {
      throw new Error('The item is not one of the linkers of this list.')
    }
    if (children === null || typeof children === 'undefined') {
      item.children = null
      return
    }
    children.parent = item
  }

  /**
   * Make a linker of the given node (or data) and make this list's parent its parent.
   * @param {TreeLinker|*} newNode The node (or data) which is being added to this list
   * @returns {TreeLinker}
   */
  private adopt (newNode: TreeLinker | any): TreeLinker {
    const linker: TreeLinker = this.linkerClass.make(newNode, this.linkerClass)
    linker.parent = this.parent
    return linker
  }

  /**
   * Insert a new node (or data) after a node. The new node gets the parent of this list.
   * @param {TreeLinker|*} node The existing node as reference, or null to insert at the start of the list
   * @param {TreeLinker|*} newNode The new node to go after the existing node
   * @returns {LinkedTreeList}
   */
  public insertAfter (node: TreeLinker | null, newNode: TreeLinker | any): LinkedTreeList {
    return DoublyLinkedList.prototype.insertAfter.call(this, node, this.adopt(newNode)) as unknown as LinkedTreeList
  }

  /**
   * Insert a new node (or data) before a node. The new node gets the parent of this list.
   * @param {TreeLinker|*} node The existing node as reference, or null to insert at the end of the list
   * @param {TreeLinker|*} newNode The new node to go before the existing node
   * @returns {LinkedTreeList}
   */
  public insertBefore (node: TreeLinker | null, newNode: TreeLinker | any): LinkedTreeList {
    return DoublyLinkedList.prototype.insertBefore.call(this, node, this.adopt(newNode)) as unknown as LinkedTreeList
  }

  /**
   * Add a node (or data) after the given (or last) node in the list.
   * @param {TreeLinker|*} node The new node to add to the end of the list
   * @param {TreeLinker} after The existing last node
   * @returns {TreeLinker}
   */
  public append (node: TreeLinker | any, after: TreeLinker = this.last): LinkedTreeList {
    return DoublyLinkedList.prototype.append.call(this, node, after) as unknown as LinkedTreeList
  }

  /**
   * Add a node (or data) before the given (or first) node in the list.
   * @param {TreeLinker|*} node The new node to add to the start of the list
   * @param {TreeLinker} before The existing first node
   * @returns {TreeLinker}
   */
  public prepend (node: TreeLinker | any, before: TreeLinker = this.first): LinkedTreeList {
    return DoublyLinkedList.prototype.prepend.call(this, node, before) as unknown as LinkedTreeList
  }

  /**
   * Remove a linker from this linked list. The removed node no longer has a parent.
   * @param {TreeLinker} node The node we wish to remove (and it will be returned after removal)
   * @return {TreeLinker|null} The removed node, or null when there was nothing to remove
   */
  public remove (node: TreeLinker): TreeLinker | null {
    const owner: TreeLinker | null = this.parent
    const removed = DoublyLinkedList.prototype.remove.call(this, node) as unknown as TreeLinker | null
    if (removed && removed.parent === owner) {
      // Remember whose children these are (the list may now be empty), the removed node no longer has that parent
      this.ownerNode = owner
      removed.parent = null
    }
    return removed
  }

  /**
   * Refresh all references (the head, the end and the length) by walking the list once, and return the head. The
   * list's own methods keep these up to date, so this is only needed after linkers were changed directly.
   * @return {TreeLinker}
   */
  public reset (): TreeLinker {
    return DoublyLinkedList.prototype.reset.call(this) as unknown as TreeLinker
  }

  /**
   * Retrieve a TreeLinker item from this list by numeric index, otherwise return null.
   * @param {number} index The integer number for retrieving a node by position.
   * @returns {TreeLinker|null}
   */
  public item (index: number): TreeLinker {
    return DoublyLinkedList.prototype.item.call(this, index) as unknown as TreeLinker
  }

  /**
   * Be able to run forEach on this LinkedTreeList to iterate over the TreeLinker Items.
   * @param {forEachCallback} callback The function to call for-each tree node
   * @param {LinkedTreeList} thisArg Optional, 'this' reference
   * @return {LinkedTreeList} The list which was iterated.
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
   * Be able to iterate over this class: the linkers of this list and everything below them (left-first). It stays within
   * this list (it does not start at, or climb up to, the parents), use the parseTree service to parse a whole tree.
   * @returns {Iterator}
   */
  [Symbol.iterator] (): Iterator<TreeLinker> {
    // The linkers of this list and everything below them, left-first. It stays within this list: it does not start at,
    // or climb up to, the parents (use the parseTree service to parse a whole tree)
    return new TreeLinkerIterator(this.first, this.parent)
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
