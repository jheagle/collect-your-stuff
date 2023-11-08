/**
 * @file doubly linked list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
import DoubleLinker from './DoubleLinker'
import IsArrayable, { forEachCallback } from '../../recipes/IsArrayable'
import DoubleLinkerIterator from '../../recipes/DoubleLinkerIterator'

/**
 * DoublyLinkedList represents a collection stored as a LinkedList with prev and next references.
 */
class DoublyLinkedList implements IsArrayable<DoubleLinker>, Iterable<DoubleLinker> {
  public readonly classType: typeof DoublyLinkedList = null
  public innerList: DoubleLinker = null
  public initialized: boolean = false

  /**
   * Create the new DoublyLinkedList instance.
   */
  constructor () {
    this.classType = DoublyLinkedList
  }

  /**
   * Initialize the inner list, should only run once.
   * @param {DoubleLinker} initialList Give the list of double-linkers to start in this doubly linked-list.
   * @return {DoublyLinkedList}
   */
  initialize (initialList: DoubleLinker): DoublyLinkedList {
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
   * @returns {DoubleLinker}
   */
  get list (): DoubleLinker {
    return this.innerList
  }

  /**
   * Retrieve the first DoubleLinker in the list.
   * @returns {DoubleLinker}
   */
  get first (): DoubleLinker {
    return this.reset()
  }

  /**
   * Retrieve the last DoubleLinker in the list.
   * @returns {DoubleLinker}
   */
  get last (): DoubleLinker {
    let tail: DoubleLinker = this.innerList
    let next: DoubleLinker = tail.next
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
    let current: DoubleLinker = this.first
    let length: number = 0
    while (current !== null) {
      ++length
      current = current.next
    }
    return length
  }

  /**
   * Insert a new node (or data) after a node.
   * @param {DoubleLinker|*} node The existing node as reference
   * @param {DoubleLinker|*} newNode The new node to go after the existing node
   * @returns {DoublyLinkedList}
   */
  insertAfter (node: DoubleLinker, newNode: DoubleLinker | any): DoublyLinkedList {
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
   * @param {DoubleLinker|*} node The existing node as reference
   * @param {DoubleLinker|*} newNode The new node to go before the existing node
   * @returns {DoublyLinkedList}
   */
  insertBefore (node: DoubleLinker, newNode: DoubleLinker | any): DoublyLinkedList {
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
   * @param {DoubleLinker|*} node The new node to add to the end of the list
   * @param {DoubleLinker} after The existing last node
   * @returns {DoubleLinker}
   */
  append (node: DoubleLinker | any, after: DoubleLinker = this.last): DoublyLinkedList {
    return this.insertAfter(after, node)
  }

  /**
   * Add a node (or data) before the given (or first) node in the list.
   * @param {DoubleLinker|*} node The new node to add to the start of the list
   * @param {DoubleLinker} before The existing first node
   * @returns {DoubleLinker}
   */
  prepend (node: DoubleLinker | any, before: DoubleLinker = this.first): DoublyLinkedList {
    return this.insertBefore(before, node)
  }

  /**
   * Remove a linker from this linked list.
   * @param {DoubleLinker} node The node we wish to remove (and it will be returned after removal)
   * @return {DoubleLinker}
   */
  remove (node: DoubleLinker): DoubleLinker {
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
   * @return {DoubleLinker}
   */
  reset (): DoubleLinker {
    // Start at the pointer for the list
    let pointer: DoubleLinker = this.innerList
    let next: DoubleLinker = pointer.next
    // Follow references till the end
    while (next !== null) {
      pointer = next
      next = pointer.next
    }
    let prev: DoubleLinker = pointer.prev
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
   * Retrieve a DoubleLinker item from this list by numeric index, otherwise return null.
   * @param {number} index The integer number for retrieving a node by position.
   * @returns {DoubleLinker|null}
   */
  item (index: number): DoubleLinker {
    if (index >= 0) {
      let current: DoubleLinker = this.first
      let currentIndex: number = -1
      while ((++currentIndex) < index && current !== null) {
        current = current.next
      }
      return currentIndex === index ? current : null
    }
    let current: DoubleLinker = this.last
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
   * Be able to run forEach on this DoublyLinkedList to iterate over the DoubleLinker Items.
   * @param {forEachCallback} callback The function to call for-each double linker
   * @param {DoublyLinkedList} thisArg Optional, 'this' reference
   */
  forEach (callback: forEachCallback, thisArg: DoublyLinkedList = this): DoublyLinkedList {
    let index: number = 0
    let current: DoubleLinker = thisArg.first
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
  [Symbol.iterator] (): Iterator<DoubleLinker> {
    let current: DoubleLinker = this.first
    return new DoubleLinkerIterator(current)
  }

  /**
   * Convert an array into a DoublyLinkedList instance, return the new instance.
   * @param {Array} [values=[]] An array of values which will be converted to linkers in this doubly-linked-list
   * @param {DoubleLinker} [linkerClass=DoubleLinker] The class to use for each linker
   * @returns {DoublyLinkedList}
   */
  public static fromArray = (values: Array<any> = [], linkerClass: typeof DoubleLinker = DoubleLinker): DoublyLinkedList => {
    const list = new DoublyLinkedList()
    return list.initialize(linkerClass.fromArray(values).head)
  }
}

export default DoublyLinkedList
