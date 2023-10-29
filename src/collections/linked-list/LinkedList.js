/**
 * @file doubly linked list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import Linker from './Linker'
import Arrayable from '../arrayable/Arrayable'

/**
 * LinkedList represents a collection stored as a LinkedList with next references.
 * @extends Arrayable
 */
class LinkedList extends Arrayable {
  /**
   * Create the new LinkedList instance, configure the Linker and List classes.
   * @param {LinkedList|Iterable} listClass
   */
  constructor (listClass = LinkedList) {
    super(listClass)
  }

  /**
   * Initialize the inner list, should only run once.
   * @method
   * @param {Linker|Array} initialList
   * @return {LinkedList}
   */
  initialize (initialList) {
    if (this.initialized) {
      console.warn('Attempt to initialize LinkedList which is not empty.')
      return this
    }
    this.initialized = true
    this.innerList = initialList
    return this
  }

  /**
   * Retrieve the first Linker in the list.

   * @returns {Linker}
   */
  get first () {
    return this.innerList
  }

  /**
   * Retrieve the last Linker in the list.

   * @returns {Linker}
   */
  get last () {
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
  get length () {
    let current = this.first
    let length = 0
    while (current !== null) {
      ++length
      current = current.next
    }
    return length
  }

  /**
   * Insert a new node (or data) after a node.
   * @method
   * @param {Linker|*} node
   * @param {Linker|*} newNode
   * @returns {LinkedList}
   */
  insertAfter (node, newNode) {
    newNode = node.classType.make(newNode)
    // Ensure the next reference of this node is assigned to the new node
    newNode.next = node.next
    // Then set this node's next reference to the new node
    node.next = newNode
    return this
  }

  /**
   * Insert a new node (or data) before a node.
   * @method
   * @param {Linker|*} node
   * @param {Linker|*} newNode
   * @returns {LinkedList}
   */
  insertBefore (node, newNode) {
    newNode = node.classType.make(newNode)
    let prevNode = null
    let currentNode = this.first
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
   * @method
   * @param {Linker|*} node
   * @param {Linker} after
   * @returns {Linker}
   */
  append (node, after = this.last) {
    this.insertAfter(after, node)
    return this
  }

  /**
   * Add a node (or data) before the given (or first) node in the list.
   * @method
   * @param {Linker|*} node
   * @param {Linker} before
   * @returns {Linker}
   */
  prepend (node, before = this.first) {
    this.insertBefore(before, node)
    return this
  }

  /**
   * Remove a linker from this linked list.
   * @method
   * @param {Linker} node
   * @return {Linker}
   */
  remove (node) {
    let prevNode = null
    let currentNode = this.first
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
   * @method
   * @param {number} index
   * @returns {Linker|null}
   */
  item (index) {
    if (index >= 0) {
      let current = this.first
      let currentIndex = -1
      while ((++currentIndex) < index && current !== null) {
        current = current.next
      }
      return currentIndex === index ? current : null
    }
    let current = this.first
    let currentIndex = 0
    const calculatedIndex = this.length + index
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
   * @param {LinkedList|Arrayable} thisArg
   * @returns {LinkedList}
   */
  forEach (callback, thisArg = this) {
    let index = 0
    let current = this.first
    while (current !== null) {
      callback(current, index, thisArg)
      current = current.next
      ++index
    }
    return thisArg
  }

  /**
   * Be able to iterate over this class.
   * @method
   * @returns {Iterator}
   */
  [Symbol.iterator] () {
    let current = this.first
    return {
      next: () => {
        const result = { value: current, done: !current }
        current = (current ? current.next : null)
        return result
      }
    }
  }
}

/**
 * Convert an array to a LinkedList.
 * @methodof LinkedList
 * @param {Array} values
 * @param {Linker} linkerClass
 * @param {LinkedList|Iterable} listClass
 * @returns {LinkedList}
 */
LinkedList.fromArray = (values = [], linkerClass = Linker, listClass = LinkedList) =>
  Arrayable.fromArray(values, linkerClass, listClass)

export default LinkedList
