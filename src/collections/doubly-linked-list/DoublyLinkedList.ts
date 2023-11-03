/**
 * @file doubly linked list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import DoubleLinker from './DoubleLinker'
import LinkerIterator from '../../recipes/LinkerIterator'
import IsArrayable, { forEachCallback } from '../../recipes/IsArrayable'
import IsElement from '../../recipes/IsElement'

/**
 * DoublyLinkedList represents a collection stored as a LinkedList with prev and next references.
 */
class DoublyLinkedList implements IsArrayable<DoublyLinkedList>, Iterable<IsElement<DoubleLinker>> {
  public readonly classType: typeof DoublyLinkedList = null
  public innerList: IsElement<DoubleLinker> = null
  public initialized: boolean = false

  /**
   * Create the new DoublyLinkedList instance, configure the Linker and List classes.
   */
  constructor () {
    this.classType = DoublyLinkedList
  }

  /**
   * Initialize the inner list, should only run once.
   * @param {DoubleLinker} initialList
   * @return {DoublyLinkedList}
   */
  initialize (initialList: IsElement<DoubleLinker>): DoublyLinkedList {
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
  get list (): IsElement<DoubleLinker> {
    return this.innerList
  }

  /**
   * Retrieve the first DoubleLinker in the list.
   * @returns {DoubleLinker}
   */
  get first (): IsElement<DoubleLinker> {
    return this.reset()
  }

  /**
   * Retrieve the last DoubleLinker in the list.
   * @returns {DoubleLinker}
   */
  get last (): IsElement<DoubleLinker> {
    let tail: IsElement<DoubleLinker> = this.innerList
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
    let current: IsElement<DoubleLinker> = this.first
    let length: number = 0
    while (current !== null) {
      ++length
      current = current.next
    }
    return length
  }

  /**
   * Insert a new node (or data) after a node.
   * @param {DoubleLinker|*} node
   * @param {DoubleLinker|*} newNode
   * @returns {DoublyLinkedList}
   */
  insertAfter (node: IsElement<DoubleLinker>, newNode: DoubleLinker | any): DoublyLinkedList {
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
   * @param {DoubleLinker|*} node
   * @param {DoubleLinker|*} newNode
   * @returns {DoublyLinkedList}
   */
  insertBefore (node: IsElement<DoubleLinker>, newNode: DoubleLinker | any): DoublyLinkedList {
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
   * @param {DoubleLinker|*} node
   * @param {DoubleLinker} after
   * @returns {DoubleLinker}
   */
  append (node: DoubleLinker | any, after: IsElement<DoubleLinker> = this.last): DoublyLinkedList {
    return this.insertAfter(after, node)
  }

  /**
   * Add a node (or data) before the given (or first) node in the list.
   * @method
   * @param {DoubleLinker|*} node
   * @param {DoubleLinker} before
   * @returns {DoubleLinker}
   */
  prepend (node: DoubleLinker | any, before: IsElement<DoubleLinker> = this.first): DoublyLinkedList {
    return this.insertBefore(before, node)
  }

  /**
   * Remove a linker from this linked list.
   * @param {DoubleLinker} node
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
  reset (): IsElement<DoubleLinker> {
    // Start at the pointer for the list
    let pointer: IsElement<DoubleLinker> = this.innerList
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
   * @param {number} index
   * @returns {DoubleLinker|null}
   */
  item (index: number): IsElement<DoubleLinker> {
    if (index >= 0) {
      let current: IsElement<DoubleLinker> = this.first
      let currentIndex: number = -1
      while ((++currentIndex) < index && current !== null) {
        current = current.next
      }
      return currentIndex === index ? current : null
    }
    let current: IsElement<DoubleLinker> = this.last
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
   * Be able to run forEach on this DoublyLinkedList ot iterate over the DoubleLinker Items.
   * @param {forEachCallback} callback
   * @param {DoublyLinkedList} thisArg
   */
  forEach (callback: forEachCallback, thisArg: DoublyLinkedList = this): DoublyLinkedList {
    let index: number = 0
    let current: IsElement<DoubleLinker> = thisArg.first
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
  [Symbol.iterator] (): Iterator<IsElement<DoubleLinker>> {
    let current: IsElement<DoubleLinker> = this.first
    return new LinkerIterator(current)
  }

  /**
   * Convert an array into a DoublyLinkedList instance, return the new instance.
   * @param {Array} [values=[]]
   * @param {DoubleLinker} [linkerClass=DoubleLinker]
   * @returns {DoublyLinkedList}
   */
  public static fromArray = (values: Array<any> = [], linkerClass: typeof DoubleLinker = DoubleLinker): DoublyLinkedList => {
    const list = new DoublyLinkedList()
    return list.initialize(linkerClass.fromArray(values).head)
  }
}

export default DoublyLinkedList
