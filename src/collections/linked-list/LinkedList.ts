/**
 * @file linked list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import IsArrayable, { forEachCallback } from '../../recipes/IsArrayable'
import IsElement from '../../recipes/IsElement'
import Linker from './Linker'
import LinkerIterator from '../../recipes/LinkerIterator'

/**
 * LinkedList represents a collection stored as a LinkedList with next references.
 */
class LinkedList implements IsArrayable<LinkedList>, Iterable<IsElement<Linker>> {
  public readonly classType: typeof LinkedList = null
  public innerList: IsElement<Linker> = null
  public initialized: boolean = false

  /**
   * Create the new LinkedList instance, configure the Linker and List classes.
   */
  constructor () {
    this.classType = LinkedList
  }

  /**
   * Initialize the inner list, should only run once.
   * @param {Linker|Array} initialList
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
  get list (): IsElement<Linker> {
    return this.innerList
  }

  /**
   * Retrieve the first Linker in the list.
   * @returns {Linker}
   */
  get first (): IsElement<Linker> {
    return this.innerList
  }

  /**
   * Retrieve the last Linker in the list.
   * @returns {Linker}
   */
  get last (): IsElement<Linker> {
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
    let current: IsElement<Linker> = this.first
    let length: number = 0
    while (current !== null) {
      ++length
      current = current.next
    }
    return length
  }

  /**
   * Insert a new node (or data) after a node.
   * @param {Linker|*} node
   * @param {Linker|*} newNode
   * @returns {LinkedList}
   */
  insertAfter (node: IsElement<Linker>, newNode: Linker | any): LinkedList {
    newNode = node.classType.make(newNode)
    // Ensure the next reference of this node is assigned to the new node
    newNode.next = node.next
    // Then set this node's next reference to the new node
    node.next = newNode
    return this
  }

  /**
   * Insert a new node (or data) before a node.
   * @param {Linker|*} node
   * @param {Linker|*} newNode
   * @returns {LinkedList}
   */
  insertBefore (node: IsElement<Linker>, newNode: Linker | any): LinkedList {
    newNode = node.classType.make(newNode)
    let prevNode = null
    let currentNode: IsElement<Linker> = this.first
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
   * @param {Linker|*} node
   * @param {Linker} after
   * @returns {Linker}
   */
  append (node: Linker | any, after: IsElement<Linker> = this.last): LinkedList {
    return this.insertAfter(after, node)
  }

  /**
   * Add a node (or data) before the given (or first) node in the list.
   * @method
   * @param {Linker|*} node
   * @param {Linker} before
   * @returns {Linker}
   */
  prepend (node: Linker | any, before: IsElement<Linker> = this.first): LinkedList {
    return this.insertBefore(before, node)
  }

  /**
   * Remove a linker from this linked list.
   * @method
   * @param {Linker} node
   * @return {Linker}
   */
  remove (node: Linker): Linker {
    let prevNode = null
    let currentNode: IsElement<Linker> = this.first
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
   * @param {number} index
   * @returns {Linker|null}
   */
  item (index: number): IsElement<Linker> | null {
    if (index >= 0) {
      let current: IsElement<Linker> = this.first
      let currentIndex: number = -1
      while ((++currentIndex) < index && current !== null) {
        current = current.next
      }
      return currentIndex === index ? current : null
    }
    let current: IsElement<Linker> = this.first
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
   * @param {forEachCallback} callback
   * @param {LinkedList} thisArg
   * @returns {LinkedList}
   */
  forEach (callback: forEachCallback, thisArg: LinkedList = this): LinkedList {
    let index: number = 0
    let current: IsElement<Linker> = thisArg.first
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
  [Symbol.iterator] (): Iterator<IsElement<Linker>> {
    return new LinkerIterator(this.first)
  }

  /**
   * Convert an array to a LinkedList.
   * @param {Array} values
   * @param {Linker} linkerClass
   * @returns {LinkedList}
   */
  public static fromArray = (values: Array<any> = [], linkerClass: typeof Linker = Linker): IsArrayable<LinkedList> => {
    const list = new LinkedList()
    return list.initialize(linkerClass.fromArray(values).head)
  }
}

export default LinkedList
