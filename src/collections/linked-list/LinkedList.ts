/**
 * @file linked list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
import IsArrayable, { forEachCallback } from '../../recipes/IsArrayable'
import IsLinker from '../../recipes/IsLinker'
import Linker from './Linker'
import LinkerIterator from '../../recipes/LinkerIterator'

/**
 * LinkedList represents a collection stored as a LinkedList with next references.
 */
class LinkedList implements IsArrayable<Linker>, Iterable<Linker> {
  public readonly classType: typeof LinkedList = null
  public innerList: Linker = null
  public initialized: boolean = false

  /**
   * Create the new LinkedList instance.
   */
  constructor () {
    this.classType = LinkedList
  }

  /**
   * Initialize the inner list, should only run once.
   * @param {Linker|Array} initialList Give the list of linkers to start in this linked-list.
   * @return {LinkedList}
   */
  initialize (initialList: Linker): LinkedList {
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
   * @returns {Linker}
   */
  get list (): IsLinker {
    return this.innerList
  }

  /**
   * Retrieve the first Linker in the list.
   * @returns {Linker}
   */
  get first (): Linker {
    return this.innerList
  }

  /**
   * Retrieve the last Linker in the list.
   * @returns {Linker}
   */
  get last (): Linker {
    let tail = this.innerList
    let next = tail.next
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
    let current: IsLinker = this.first
    let length: number = 0
    while (current !== null) {
      ++length
      current = current.next
    }
    return length
  }

  /**
   * Insert a new node (or data) after a node.
   * @param {Linker|*} node The existing node as reference
   * @param {Linker|*} newNode The new node to go after the existing node
   * @returns {LinkedList}
   */
  insertAfter (node: IsLinker, newNode: Linker | any): LinkedList {
    newNode = node.classType.make(newNode)
    // Ensure the next reference of this node is assigned to the new node
    newNode.next = node.next
    // Then set this node's next reference to the new node
    node.next = newNode
    return this
  }

  /**
   * Insert a new node (or data) before a node.
   * @param {Linker|*} node The existing node as reference
   * @param {Linker|*} newNode The new node to go before the existing node
   * @returns {LinkedList}
   */
  insertBefore (node: IsLinker, newNode: Linker | any): LinkedList {
    newNode = node.classType.make(newNode)
    let prevNode = null
    let currentNode: IsLinker = this.first
    while (currentNode !== node) {
      prevNode = currentNode
      currentNode = currentNode.next
    }
    // The new node will reference this node as next
    newNode.next = node
    if (prevNode) {
      // Ensure the next reference of the previous node is assigned to the new node
      prevNode.next = newNode
    }
    if (node === this.first) {
      this.innerList = newNode
    }
    return this
  }

  /**
   * Add a node (or data) after the given (or last) node in the list.
   * @param {Linker|*} node The new node to add to the end of the list
   * @param {Linker} after The existing last node
   * @returns {Linker}
   */
  append (node: Linker | any, after: IsLinker = this.last): LinkedList {
    return this.insertAfter(after, node)
  }

  /**
   * Add a node (or data) before the given (or first) node in the list.
   * @param {Linker|*} node The new node to add to the start of the list
   * @param {Linker} before The existing first node
   * @returns {Linker}
   */
  prepend (node: Linker | any, before: IsLinker = this.first): LinkedList {
    return this.insertBefore(before, node)
  }

  /**
   * Remove a linker from this linked list.
   * @param {Linker} node The node we wish to remove (and it will be returned after removal)
   * @return {Linker}
   */
  remove (node: Linker): Linker {
    let prevNode = null
    let currentNode: IsLinker = this.first
    while (currentNode !== node) {
      prevNode = currentNode
      currentNode = currentNode.next
    }
    if (prevNode) {
      // Ensure the next reference of the previous node skips over the removed node
      prevNode.next = node.next
    }
    if (node === this.first) {
      // Update list head to point to next if it was this node
      this.innerList = node.next
    }
    return node
  }

  /**
   * Retrieve a Linker item from this list by numeric index, otherwise return null.
   * @param {number} index The integer number for retrieving a node by position.
   * @returns {Linker|null}
   */
  item (index: number): Linker | null {
    if (index >= 0) {
      let current: Linker = this.first
      let currentIndex: number = -1
      while ((++currentIndex) < index && current !== null) {
        current = current.next
      }
      return currentIndex === index ? current : null
    }
    let current: Linker = this.first
    let currentIndex: number = 0
    const calculatedIndex: number = this.length + index
    if (calculatedIndex < 0) {
      return null
    }
    while (currentIndex < calculatedIndex && current !== null) {
      current = current.next
      ++currentIndex
    }
    return currentIndex === calculatedIndex ? current : null
  }

  /**
   * Be able to run forEach on this LinkedList to iterate over the linkers.
   * @param {forEachCallback} callback The function to call for-each linker
   * @param {LinkedList} thisArg Optional, 'this' reference
   * @returns {LinkedList}
   */
  forEach (callback: forEachCallback, thisArg: LinkedList = this): LinkedList {
    let index: number = 0
    let current: IsLinker = thisArg.first
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
  [Symbol.iterator] (): Iterator<Linker> {
    return new LinkerIterator(this.first)
  }

  /**
   * Convert an array to a LinkedList.
   * @param {Array} values An array of values which will be converted to linkers in this linked-list
   * @param {Linker} linkerClass The class to use for each linker
   * @returns {LinkedList}
   */
  public static fromArray = (values: Array<any> = [], linkerClass: typeof Linker = Linker): IsArrayable<Linker> => {
    const list = new LinkedList()
    return list.initialize(linkerClass.fromArray(values).head)
  }
}

export default LinkedList
