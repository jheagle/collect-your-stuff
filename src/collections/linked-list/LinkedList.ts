/**
 * @file linked list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
import { forEachCallback, IsArrayable } from '../../recipes/IsArrayable'
import { IsLinker } from '../../recipes/IsLinker'
import { Linker } from './Linker'
import { LinkerIterator } from '../../recipes/LinkerIterator'
import { Arrayable } from '../arrayable/Arrayable'

/**
 * LinkedList represents a collection stored as a LinkedList with next references.
 * @extends Arrayable
 */
export class LinkedList implements IsArrayable<Linker>, Iterable<Linker> {
  /** The class used to create this instance, so that it can be recognized as valid without an instanceof check. */
  public readonly classType: typeof LinkedList = LinkedList
  /** The first linker of the list (null when the list is empty), from which the whole list is reached. */
  public innerList: Linker = null
  /** Whether the inner list has been initialized (it can only be initialized once). */
  public initialized: boolean = false
  /** The class used to wrap the data given to this list as linkers. */
  public linkerClass: typeof Linker

  /** The last linker, remembered so that adding to the end does not need to walk the whole list (null when not known yet). */
  private tailCache: Linker | null = null
  /** The number of linkers, kept up to date by the list's own methods so that the length does not need to walk the whole list (null when not known yet). */
  private countCache: number | null = null

  /**
   * Create the new LinkedList instance.
   * @param {Linker} [linkerClass=Linker] The class used to wrap given data as linkers.
   */
  public constructor (linkerClass: typeof Linker = Linker) {
    this.linkerClass = linkerClass
  }

  /**
   * Initialize the inner list, should only run once.
   * @param {Linker|Array} initialList Give the list of linkers to start in this linked-list.
   * @return {LinkedList}
   */
  public initialize (initialList: Linker): LinkedList {
    // Borrowed from Arrayable, which types its return as an Arrayable although it returns whatever list called it
    return Arrayable.prototype.initialize.call(this, initialList as unknown as Array<any>) as unknown as LinkedList
  }

  /**
   * Retrieve the innerList used (the list itself, not a copy).
   * @returns {Linker}
   */
  public get list (): IsLinker {
    return this.innerList
  }

  /**
   * Retrieve the first Linker in the list.
   * @returns {Linker}
   */
  public get first (): Linker {
    return this.innerList
  }

  /**
   * Retrieve the last Linker in the list. The end is remembered, so this does not walk the list.
   * @returns {Linker}
   */
  public get last (): Linker | null {
    if (this.innerList === null) {
      return null
    }
    let tail: Linker = this.tailCache !== null ? this.tailCache : this.innerList
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
   * @param {Linker|*} node The existing node as reference, or null to insert at the start of the list
   * @param {Linker|*} newNode The new node to go after the existing node
   * @returns {LinkedList}
   */
  public insertAfter (node: IsLinker | null, newNode: Linker | any): LinkedList {
    newNode = this.linkerClass.make(newNode, this.linkerClass)
    if (node === null || typeof node === 'undefined') {
      // After nothing means at the start of the list
      newNode.next = this.innerList
      if (this.innerList === null) {
        this.tailCache = newNode
      }
      this.innerList = newNode
    } else {
      newNode.next = node.next
      node.next = newNode
      if (newNode.next === null) {
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
   * @param {Linker|*} node The existing node as reference, or null to insert at the end of the list
   * @param {Linker|*} newNode The new node to go before the existing node
   * @returns {LinkedList}
   * @throws {Error} When the reference node is not in this list
   */
  public insertBefore (node: IsLinker | null, newNode: Linker | any): LinkedList {
    newNode = this.linkerClass.make(newNode, this.linkerClass)
    if (node === null || typeof node === 'undefined') {
      // Before nothing means at the end of the list
      const tail: Linker | null = this.last
      newNode.next = null
      if (tail === null) {
        this.innerList = newNode
      } else {
        tail.next = newNode
      }
      this.tailCache = newNode
    } else {
      let prevNode: Linker | null = null
      let currentNode: Linker | null = this.first
      while (currentNode !== null && currentNode !== node) {
        prevNode = currentNode
        currentNode = currentNode.next
      }
      if (currentNode === null) {
        throw new Error('The reference node is not in this list.')
      }
      newNode.next = node
      if (prevNode) {
        prevNode.next = newNode
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
   * @param {Linker|*} node The new node to add to the end of the list
   * @param {Linker} after The existing last node
   * @returns {Linker}
   */
  public append (node: Linker | any, after: IsLinker = this.last): LinkedList {
    return this.insertAfter(after, node)
  }

  /**
   * Add a node (or data) before the given (or first) node in the list.
   * @param {Linker|*} node The new node to add to the start of the list
   * @param {Linker} before The existing first node
   * @returns {Linker}
   */
  public prepend (node: Linker | any, before: IsLinker = this.first): LinkedList {
    return this.insertBefore(before, node)
  }

  /**
   * Remove a linker from this linked list.
   * @param {Linker} node The node we wish to remove (and it will be returned after removal)
   * @return {Linker|null} The removed node, or null when it was not in this list (nothing is removed)
   */
  public remove (node: Linker | null): Linker | null {
    if (node === null || typeof node === 'undefined') {
      return null
    }
    let prevNode: Linker | null = null
    let currentNode: Linker | null = this.first
    while (currentNode !== null && currentNode !== node) {
      prevNode = currentNode
      currentNode = currentNode.next
    }
    if (currentNode === null) {
      // The node is not in this list, so there is nothing to remove
      return null
    }
    if (prevNode) {
      prevNode.next = node.next
    } else {
      this.innerList = node.next
    }
    if (this.tailCache === node) {
      this.tailCache = prevNode
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
   * Refresh the remembered end and length of the list by walking it once. The list's own methods keep these up to date,
   * so this is only needed after linkers were changed directly (for example by setting next on a linker).
   * @return {Linker|null} The first linker of the list
   */
  public reset (): Linker | null {
    let count: number = 0
    let tail: Linker | null = null
    let current: Linker | null = this.innerList
    while (current !== null) {
      ++count
      tail = current
      current = current.next
    }
    this.countCache = count
    this.tailCache = tail
    return this.innerList
  }

  /**
   * Retrieve a Linker item from this list by numeric index, otherwise return null.
   * @param {number} index The integer number for retrieving a node by position.
   * @returns {Linker|null}
   */
  public item (index: number): Linker | null {
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
  public forEach (callback: forEachCallback, thisArg: LinkedList = this): LinkedList {
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
   * @param {IsLinker} linkerClass The class to use for each linker
   * @param {IsArrayable<Linker>} [classType=LinkedList] Provide the type of IsArrayable to use.
   * @returns {LinkedList}
   */
  public static fromArray = (values: Array<any> = [], linkerClass: typeof Linker = Linker, classType: any = LinkedList): IsArrayable<IsLinker> | any => {
    const list: IsArrayable<IsLinker> = new classType(linkerClass)
    return list.initialize(linkerClass.fromArray(values).head)
  }
}
