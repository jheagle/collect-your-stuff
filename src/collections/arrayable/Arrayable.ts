/**
 * @file arrayable list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
import { ArrayElement } from './ArrayElement'
import { ArrayIterator } from '../../recipes/ArrayIterator'
import { forEachCallback, IsArrayable } from '../../recipes/IsArrayable'
import { IsElement } from '../../recipes/IsElement'

/**
 * Arrayable represents a collection stored as an array.
 */
export class Arrayable implements IsArrayable<ArrayElement>, Iterable<ArrayElement> {
  /** The class used to create this instance, so that it can be recognized as valid without an instanceof check. */
  public readonly classType: typeof Arrayable = Arrayable
  /** The array which stores the elements of this Arrayable. */
  public innerList: Array<ArrayElement> = []
  /** Whether the inner list has been initialized (it can only be initialized once). */
  public initialized: boolean = false
  /** The class used to wrap the data given to this Arrayable as elements. */
  public elementClass: typeof ArrayElement

  /**
   * Create the new Arrayable instance, configure the Arrayable class.
   * @param {ArrayElement} [elementClass=ArrayElement] The class used to wrap given data as elements.
   */
  public constructor (elementClass: typeof ArrayElement = ArrayElement) {
    this.elementClass = elementClass
  }

  /**
   * Find the position of an element which must be in this list.
   * @param {ArrayElement} node The element to find
   * @returns {number}
   * @throws {Error} When the element is not in this list
   */
  private indexOfElement (node: ArrayElement): number {
    const index: number = this.innerList.indexOf(node)
    if (index < 0) {
      throw new Error('The reference element is not in this list.')
    }
    return index
  }

  /**
   * Initialize the inner list, should only run once.
   * @param {Array<ArrayElement>} initialList Give the array of elements to start in this Arrayable.
   * @return {Arrayable}
   */
  public initialize (initialList: Array<ArrayElement>): Arrayable {
    if (this.initialized) {
      console.warn('Attempt to initialize non-empty list.')
      return this
    }
    this.initialized = true
    this.innerList = initialList
    return this
  }

  /**
   * Retrieve the innerList used (the list itself, not a copy).
   * @returns {Array<ArrayElement>}
   */
  public get list (): Array<ArrayElement> {
    return this.innerList
  }

  /**
   * Retrieve the first Element from the Arrayable
   * @returns {ArrayElement|null} The first element, or null when the Arrayable is empty
   */
  public get first (): ArrayElement | null {
    return this.length ? this.innerList[0] : null
  }

  /**
   * Retrieve the last Element from the Arrayable
   * @returns {ArrayElement|null} The last element, or null when the Arrayable is empty
   */
  public get last (): ArrayElement | null {
    return this.length ? this.innerList[this.length - 1] : null
  }

  /**
   * Return the length of the list.
   * @returns {number}
   */
  public get length (): number {
    return this.innerList.length
  }

  /**
   * Insert a new node (or data) after a node.
   * @param {ArrayElement|null} node The existing node as reference, or null to insert at the start of the list
   * @param {ArrayElement|*} newNode The new node to go after the existing node
   * @returns {Arrayable}
   * @throws {Error} When the reference node is not in this list
   */
  public insertAfter (node: ArrayElement | null, newNode: ArrayElement | any): Arrayable {
    // With no reference element, the new one goes after nothing: at the start of the list
    const insertAt: number = node === null || typeof node === 'undefined' ? -1 : this.indexOfElement(node)
    this.innerList.splice(insertAt + 1, 0, this.elementClass.make(newNode, this.elementClass))
    return this
  }

  /**
   * Insert a new node (or data) before a node.
   * @param {ArrayElement|null} node The existing node as reference, or null to insert at the end of the list
   * @param {ArrayElement|*} newNode The new node to go before the existing node
   * @returns {Arrayable}
   * @throws {Error} When the reference node is not in this list
   */
  public insertBefore (node: ArrayElement | null, newNode: ArrayElement | any): Arrayable {
    // With no reference element, the new one goes before nothing: at the end of the list
    const insertAt: number = node === null || typeof node === 'undefined' ? this.length : this.indexOfElement(node)
    this.innerList.splice(insertAt, 0, this.elementClass.make(newNode, this.elementClass))
    return this
  }

  /**
   * Add a node (or data) after the given (or last) node in the list.
   * @param {ArrayElement|*} node The new node to add to the end of the list
   * @param {ArrayElement} after The existing last node
   * @returns {Arrayable}
   */
  public append (node: ArrayElement | any, after: ArrayElement | null = this.last): Arrayable {
    if (after === this.last) {
      // Adding to the end does not need to search for where that is
      this.innerList.push(this.elementClass.make(node, this.elementClass))
      return this
    }
    return this.insertAfter(after, node)
  }

  /**
   * Add a node (or data) before the given (or first) node in the list.
   * @param {ArrayElement|*} node The new node to add to the start of the list
   * @param {ArrayElement} before The existing first node
   * @returns {Arrayable}
   */
  public prepend (node: ArrayElement | any, before: ArrayElement | null = this.first): Arrayable {
    if (before === this.first) {
      // Adding to the start does not need to search for where that is
      this.innerList.unshift(this.elementClass.make(node, this.elementClass))
      return this
    }
    return this.insertBefore(before, node)
  }

  /**
   * Remove an element from this arrayable.
   * @param {ArrayElement} node The node we wish to remove (and it will be returned after removal)
   * @return {ArrayElement|null} The removed node, or null when it was not in this list (nothing is removed)
   */
  public remove (node: ArrayElement): ArrayElement | null {
    const deleteAt = this.innerList.indexOf(node)
    if (deleteAt < 0) {
      return null
    }
    this.innerList.splice(deleteAt, 1)
    return node
  }

  /**
   * Retrieve an ArrayElement item from this list by numeric index, otherwise return null.
   * @param {number} index The integer number for retrieving a node by position.
   * @return {ArrayElement|null}
   */
  public item (index: number): ArrayElement | null {
    if (index >= this.length) {
      // index is beyond array limit
      return null
    }
    if (index >= 0) {
      // use the positive index at nth position from the beginning of the array
      return this.innerList[index]
    }
    const calculatedIndex = this.length + index
    if (calculatedIndex < 0) {
      // negative index is beyond array limit (minus direction)
      return null
    }
    // Return the item at nth position from the end of the array
    return this.innerList[calculatedIndex]
  }

  /**
   * Be able to run forEach on this Arrayable to iterate over the elements.
   * @param {forEachCallback} callback The function to call for-each element
   * @param {Arrayable} thisArg Optional, 'this' reference
   * @returns {Arrayable}
   */
  public forEach (callback: forEachCallback, thisArg: Arrayable = this): Arrayable {
    for (let i = 0; i < thisArg.length; ++i) {
      callback(thisArg.item(i), i, thisArg)
    }
    return thisArg
  }

  /**
   * Be able to iterate over this class.
   * @returns {Iterator}
   */
  [Symbol.iterator] (): Iterator<ArrayElement> {
    let index = 0
    return new ArrayIterator(this.innerList, index)
  }

  /**
   * Convert an array to an Arrayable.
   * @param {Array} values An array of values which will be converted to elements in this arrayable
   * @param {IsElement} [elementClass=ArrayElement] The class to use for each element
   * @param {IsArrayable<ArrayElement>} [classType=Arrayable] Provide the type of IsArrayable to use.
   * @returns {Arrayable}
   */
  public static fromArray = (values: Array<any> = [], elementClass: typeof ArrayElement = ArrayElement, classType: any = Arrayable): IsArrayable<IsElement> => {
    const list: IsArrayable<IsElement> = new classType(elementClass)
    return list.initialize(elementClass.fromArray(values).head)
  }
}
