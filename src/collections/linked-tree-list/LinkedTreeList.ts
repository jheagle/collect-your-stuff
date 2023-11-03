/**
 * @file doubly linked tree list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import TreeLinker from './TreeLinker'
import IsArrayable, { forEachCallback } from '../../recipes/IsArrayable'
import IsElement from '../../recipes/IsElement'
import LinkerIterator from '../../recipes/LinkerIterator'

/**
 * LinkedTreeList represents a collection stored with a root and spreading in branching (tree) formation.
 */
class LinkedTreeList implements IsArrayable<LinkedTreeList>, Iterable<IsElement<TreeLinker>> {
  public readonly classType: typeof LinkedTreeList = null
  public innerList: IsElement<TreeLinker> = null
  public initialized: boolean = false

  /**
   * Create the new LinkedTreeList instance, configure the list class.
   */
  constructor () {
    this.classType = LinkedTreeList
  }

  /**
   * Initialize the inner list, should only run once.
   * @param {TreeLinker} initialList
   * @return {LinkedTreeList}
   */
  initialize (initialList: IsElement<TreeLinker>): LinkedTreeList {
    if (this.initialized) {
      console.warn('Attempt to initialize LinkedList which is not empty.')
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
  get list (): IsElement<TreeLinker> {
    return this.innerList
  }

  /**
   * Retrieve the first TreeLinker in the list.
   * @returns {TreeLinker}
   */
  get first (): IsElement<TreeLinker> {
    return this.reset()
  }

  /**
   * Retrieve the last TreeLinker in the list.
   * @returns {TreeLinker}
   */
  get last (): IsElement<TreeLinker> {
    let tail: IsElement<TreeLinker> = this.innerList
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
  get length (): number {
    let current: IsElement<TreeLinker> = this.first
    let length: number = 0
    while (current !== null) {
      ++length
      current = current.next
    }
    return length
  }

  /**
   * Alias for getting the inner list
   */
  get children(): IsElement<TreeLinker> {
    return this.innerList
  }

  /**
   * Set the inner list to new children
   * @param {TreeLinker} children
   */
  set children(children: IsElement<TreeLinker>) {
    const parent = this.parent
    this.innerList = children
    this.parent = parent
  }

  /**
   * Get the parent of this tree list.
   * @return {TreeLinker}
   */
  get parent (): IsElement<TreeLinker> {
    const first = this.first
    if (first === null) {
      return null
    }
    return this.first.parent
  }

  /**
   * Set the parent of this tree list
   * @param {TreeLinker} parent
   */
  set parent (parent: IsElement<TreeLinker>) {
    let current: IsElement<TreeLinker> = this.first
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
  get rootParent (): IsElement<TreeLinker> {
    let current: IsElement<TreeLinker> = this.first
    let parent: IsElement<TreeLinker> = this.first.parent
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
  setChildren (item: IsElement<TreeLinker>, children: LinkedTreeList = null): void {
    if (Array.from(this).indexOf(item) < 0) {
      console.error('item is not a child of this')
    }
    children.parent = item
  }

  /**
   * Insert a new node (or data) after a node.
   * @param {TreeLinker|*} node
   * @param {TreeLinker|*} newNode
   * @returns {LinkedTreeList}
   */
  insertAfter (node: IsElement<TreeLinker>, newNode: TreeLinker | any): LinkedTreeList {
    newNode = node.classType.make(newNode)
    // Ensure the next reference of this node is assigned to the new node
    newNode.next = node.next
    // Ensure this node is assigned as the prev reference of the new node
    newNode.prev = node
    // Then set this node's next reference to the new node
    node.next = newNode
    if (newNode.next) {
      // Update the next reference to ensure circular reference for prev points to the new node
      newNode.next.prev = newNode
    }
    this.reset()
    return this
  }

  /**
   * Insert a new node (or data) before a node.
   * @param {TreeLinker|*} node
   * @param {TreeLinker|*} newNode
   * @returns {LinkedTreeList}
   */
  insertBefore (node: IsElement<TreeLinker>, newNode: TreeLinker | any): LinkedTreeList {
    newNode = node.classType.make(newNode)
    // The new node will reference this prev node as prev
    newNode.prev = node.prev
    // The new node will reference this node as next
    newNode.next = node
    // This prev will reference the new node
    node.prev = newNode
    if (newNode.prev) {
      // Update the prev reference to ensure circular reference for next points to the new node
      newNode.prev.next = newNode
    }
    this.reset()
    return this
  }

  /**
   * Add a node (or data) after the given (or last) node in the list.
   * @param {TreeLinker|*} node
   * @param {TreeLinker} after
   * @returns {TreeLinker}
   */
  append (node: TreeLinker | any, after: IsElement<TreeLinker> = this.last): LinkedTreeList {
    return this.insertAfter(after, node)
  }

  /**
   * Add a node (or data) before the given (or first) node in the list.
   * @method
   * @param {TreeLinker|*} node
   * @param {TreeLinker} before
   * @returns {TreeLinker}
   */
  prepend (node: TreeLinker | any, before: IsElement<TreeLinker> = this.first): LinkedTreeList {
    return this.insertBefore(before, node)
  }

  /**
   * Remove a linker from this linked list.
   * @param {TreeLinker} node
   * @return {TreeLinker}
   */
  remove (node: TreeLinker): TreeLinker {
    if (node.prev) {
      // The previous node will reference this next node
      node.prev.next = node.next
    }
    if (node.next) {
      // The next node will reference this previous node
      node.next.prev = node.prev
    }
    // Update head reference
    this.reset()
    return node
  }

  /**
   * Refresh all references and return head reference.
   * @return {TreeLinker}
   */
  reset (): IsElement<TreeLinker> {
    // Start at the pointer for the list
    let pointer: IsElement<TreeLinker> = this.innerList
    if (pointer === null) {
      return null
    }
    let next: TreeLinker = pointer.next
    // Follow references till the end
    while (next !== null) {
      pointer = next
      next = pointer.next
    }
    let prev: TreeLinker = pointer.prev
    // From final reference, follow references back to the beginning
    while (prev !== null) {
      pointer = prev
      prev = pointer.prev
    }
    // All the live references should have been found and we are pointing to the true head
    this.innerList = pointer
    return pointer
  }

  /**
   * Retrieve a TreeLinker item from this list by numeric index, otherwise return null.
   * @param {number} index
   * @returns {TreeLinker|null}
   */
  item (index: number): IsElement<TreeLinker> {
    if (index >= 0) {
      let current: IsElement<TreeLinker> = this.first
      let currentIndex: number = -1
      while ((++currentIndex) < index && current !== null) {
        current = current.next
      }
      return currentIndex === index ? current : null
    }
    let current: IsElement<TreeLinker> = this.last
    let currentIndex: number = this.length
    const calculatedIndex: number = this.length + index
    if (calculatedIndex < 0) {
      return null
    }
    while ((--currentIndex) > calculatedIndex && current !== null) {
      current = current.prev
    }
    return currentIndex === calculatedIndex ? current : null
  }

  /**
   * Be able to run forEach on this LinkedTreeList ot iterate over the TreeLinker Items.
   * @param {forEachCallback} callback
   * @param {LinkedTreeList} thisArg
   */
  forEach (callback: forEachCallback, thisArg: LinkedTreeList = this): LinkedTreeList {
    let index: number = 0
    let current: IsElement<TreeLinker> = thisArg.first
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
  [Symbol.iterator] (): Iterator<IsElement<TreeLinker>> {
    let current: IsElement<TreeLinker> = this.first
    return new LinkerIterator(current)
  }

  /**
   * Convert an array into a LinkedTreeList instance, return the new instance.
   * @param {Array} [values=[]]
   * @param {TreeLinker} [linkerClass=TreeLinker]
   * @returns {LinkedTreeList}
   */
  public static fromArray = (values: Array<any> = [], linkerClass: typeof TreeLinker = TreeLinker): LinkedTreeList => {
    const list: LinkedTreeList = new LinkedTreeList()
    return list.initialize(linkerClass.fromArray(values).head)
  }
}

export default LinkedTreeList
