/**
 * @file doubly linked list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
import { DoubleLinker } from './DoubleLinker'
import { forEachCallback, IsArrayable } from '../../recipes/IsArrayable'
import { DoubleLinkerIterator } from '../../recipes/DoubleLinkerIterator'
import { LinkedList } from '../linked-list/LinkedList'
import { IsDoubleLinker } from '../../recipes/IsDoubleLinker'

/**
 * DoublyLinkedList represents a collection stored as a LinkedList with prev and next references.
 * @extends LinkedList
 */
export class DoublyLinkedList implements IsArrayable<DoubleLinker>, Iterable<DoubleLinker> {
  /** The class used to create this instance, so that it can be recognized as valid without an instanceof check. */
  public readonly classType: typeof DoublyLinkedList = DoublyLinkedList
  /** A linker of the list (null when the list is empty); the head is found by walking back from it. */
  public innerList: DoubleLinker = null
  /** Whether the inner list has been initialized (it can only be initialized once). */
  public initialized: boolean = false
  /** The class used to wrap the data given to this list as linkers. */
  public linkerClass: typeof DoubleLinker

  /** The last linker, remembered so that adding to the end does not need to walk the whole list (null when not known yet). */
  private tailCache: DoubleLinker | null = null
  /** The number of linkers, kept up to date by the list's own methods so that the length does not need to walk the whole list (null when not known yet). */
  private countCache: number | null = null

  /**
   * Create the new DoublyLinkedList instance.
   * @param {DoubleLinker} [linkerClass=DoubleLinker] The class used to wrap given data as linkers.
   */
  public constructor (linkerClass: typeof DoubleLinker = DoubleLinker) {
    this.linkerClass = linkerClass
  }

  /**
   * Initialize the inner list, should only run once.
   * @param {DoubleLinker} initialList Give the list of double-linkers to start in this doubly linked-list.
   * @return {DoublyLinkedList}
   */
  public initialize (initialList: DoubleLinker): DoublyLinkedList {
    // Borrowed from LinkedList, which types its return as a LinkedList although it returns whatever list called it
    return LinkedList.prototype.initialize.call(this, initialList) as unknown as DoublyLinkedList
  }

  /**
   * Retrieve the innerList used (the list itself, not a copy).
   * @returns {DoubleLinker}
   */
  public get list (): DoubleLinker {
    return this.innerList
  }

  /**
   * Retrieve the first DoubleLinker in the list.
   * @returns {DoubleLinker}
   */
  public get first (): DoubleLinker | null {
    let head: DoubleLinker | null = this.innerList
    if (head === null) {
      return null
    }
    // innerList is normally the head already, walking back also finds anything linked on before it outside of this list
    while (head.prev !== null) {
      head = head.prev
    }
    this.innerList = head
    return head
  }

  /**
   * Retrieve the last DoubleLinker in the list. The end is remembered, so this does not walk the list.
   * @returns {DoubleLinker}
   */
  public get last (): DoubleLinker | null {
    if (this.innerList === null) {
      return null
    }
    let tail: DoubleLinker = this.tailCache !== null ? this.tailCache : this.innerList
    // The remembered tail is normally the end already, walking on from it also finds anything linked on outside of this list
    while (tail.next !== null) {
      tail = tail.next
    }
    this.tailCache = tail
    return tail
  }

  /**
   * Return the length of the list. It is kept up to date by the list's own methods, so this does not walk the list
   * (call reset() after linkers were changed directly).
   * @returns {number}
   */
  public get length (): number {
    if (this.countCache === null) {
      this.reset()
    }
    return this.countCache as number
  }

  /**
   * Insert a new node (or data) after a node.
   * @param {DoubleLinker|*} node The existing node as reference (which must be in this list, this is not checked), or null to insert at the start of the list
   * @param {DoubleLinker|*} newNode The new node to go after the existing node
   * @returns {DoublyLinkedList}
   */
  public insertAfter (node: DoubleLinker | null, newNode: DoubleLinker | any): DoublyLinkedList {
    newNode = this.linkerClass.make(newNode, this.linkerClass)
    if (node === null || typeof node === 'undefined') {
      // After nothing means at the start of the list
      const head: DoubleLinker | null = this.first
      newNode.prev = null
      newNode.next = head
      if (head) {
        head.prev = newNode
      } else {
        this.tailCache = newNode
      }
      this.innerList = newNode
    } else {
      // Ensure the next reference of this node is assigned to the new node
      newNode.next = node.next
      // Ensure this node is assigned as the prev reference of the new node
      newNode.prev = node
      // Then set this node's next reference to the new node
      node.next = newNode
      if (newNode.next) {
        // Update the next reference to ensure circular reference for prev points to the new node
        newNode.next.prev = newNode
      } else {
        this.tailCache = newNode
      }
    }
    if (this.countCache !== null) {
      ++this.countCache
    }
    return this
  }

  /**
   * Insert a new node (or data) before a node.
   * @param {DoubleLinker|*} node The existing node as reference (which must be in this list, this is not checked), or null to insert at the end of the list
   * @param {DoubleLinker|*} newNode The new node to go before the existing node
   * @returns {DoublyLinkedList}
   */
  public insertBefore (node: DoubleLinker | null, newNode: DoubleLinker | any): DoublyLinkedList {
    newNode = this.linkerClass.make(newNode, this.linkerClass)
    if (node === null || typeof node === 'undefined') {
      // Before nothing means at the end of the list
      const tail: DoubleLinker | null = this.last
      newNode.next = null
      newNode.prev = tail
      if (tail === null) {
        this.innerList = newNode
      } else {
        tail.next = newNode
      }
      this.tailCache = newNode
    } else {
      // The new node will reference this prev node as prev
      newNode.prev = node.prev
      // The new node will reference this node as next
      newNode.next = node
      // This prev will reference the new node
      node.prev = newNode
      if (newNode.prev) {
        // Update the prev reference to ensure circular reference for next points to the new node
        newNode.prev.next = newNode
      } else {
        this.innerList = newNode
      }
    }
    if (this.countCache !== null) {
      ++this.countCache
    }
    return this
  }

  /**
   * Add a node (or data) after the given (or last) node in the list.
   * @param {DoubleLinker|*} node The new node to add to the end of the list
   * @param {DoubleLinker} after The existing last node
   * @returns {DoubleLinker}
   */
  public append (node: DoubleLinker | any, after: DoubleLinker = this.last): DoublyLinkedList {
    return this.insertAfter(after, node)
  }

  /**
   * Add a node (or data) before the given (or first) node in the list.
   * @param {DoubleLinker|*} node The new node to add to the start of the list
   * @param {DoubleLinker} before The existing first node
   * @returns {DoubleLinker}
   */
  public prepend (node: DoubleLinker | any, before: DoubleLinker = this.first): DoublyLinkedList {
    return this.insertBefore(before, node)
  }

  /**
   * Remove a linker from this linked list.
   * @param {DoubleLinker} node The node we wish to remove (and it will be returned after removal)
   * @return {DoubleLinker}
   */
  public remove (node: DoubleLinker | null): DoubleLinker | null {
    if (node === null || typeof node === 'undefined') {
      return null
    }
    if (node.prev) {
      // The previous node will reference this next node
      node.prev.next = node.next
    }
    if (node.next) {
      // The next node will reference this previous node
      node.next.prev = node.prev
    }
    // The list finds its head by walking from innerList, so it must not keep pointing at the node being removed. For the
    // last remaining node there is nothing to walk to, which would otherwise leave the removed node in the list.
    if (this.innerList === node) {
      this.innerList = node.next || node.prev || null
    }
    if (this.tailCache === node) {
      this.tailCache = node.prev
    }
    if (this.innerList === null) {
      this.tailCache = null
    }
    if (this.countCache !== null) {
      --this.countCache
    }
    return node
  }

  /**
   * Refresh all references (the head, the end and the length) by walking the list once, and return the head. The list's
   * own methods keep these up to date, so this is only needed after linkers were changed directly.
   * @return {DoubleLinker|null}
   */
  public reset (): DoubleLinker | null {
    // Start at the pointer for the list
    let pointer: DoubleLinker | null = this.innerList
    if (pointer === null) {
      this.countCache = 0
      this.tailCache = null
      return null
    }
    // Follow references back to the beginning
    while (pointer.prev !== null) {
      pointer = pointer.prev
    }
    // We are pointing to the true head, now count along to the end to find the tail and the length
    this.innerList = pointer
    let count: number = 0
    let tail: DoubleLinker = pointer
    let current: DoubleLinker | null = pointer
    while (current !== null) {
      ++count
      tail = current
      current = current.next
    }
    this.countCache = count
    this.tailCache = tail
    return pointer
  }

  /**
   * Retrieve a DoubleLinker item from this list by numeric index, otherwise return null.
   * @param {number} index The integer number for retrieving a node by position.
   * @returns {DoubleLinker|null}
   */
  public item (index: number): DoubleLinker {
    if (index >= 0) {
      // For a positive index, start from the beginning of the list until the current item counter equals our index
      let current: DoubleLinker = this.first
      let currentIndex: number = -1
      while ((++currentIndex) < index && current !== null) {
        current = current.next
      }
      return currentIndex === index ? current : null
    }
    // For a negative index, get the delta of index and length, then go backwards until we reach that delta
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
   * @return {DoublyLinkedList} The list which was iterated.
   */
  public forEach (callback: forEachCallback, thisArg: DoublyLinkedList = this): DoublyLinkedList {
    return LinkedList.prototype.forEach.call(this, callback, thisArg as unknown as LinkedList) as unknown as DoublyLinkedList
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
   * @param {IsDoubleLinker} [linkerClass=DoubleLinker] The class to use for each linker
   * @param {IsArrayable<IsDoubleLinker>} [classType=LinkedList] Provide the type of IsArrayable to use.
   * @returns {DoublyLinkedList}
   */
  public static fromArray = (values: Array<any> = [], linkerClass: typeof DoubleLinker = DoubleLinker, classType: any = DoublyLinkedList): IsArrayable<IsDoubleLinker> | any => {
    return LinkedList.fromArray(values, linkerClass, classType)
  }
}
