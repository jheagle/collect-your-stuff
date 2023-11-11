/**
 * @file arrayable list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
import ArrayElement from './ArrayElement'
import ArrayIterator from '../../recipes/ArrayIterator'
import IsArrayable, { forEachCallback } from '../../recipes/IsArrayable'
import IsElement from '../../recipes/IsElement'

/**
 * Arrayable represents a collection stored as an array.
 */
class Arrayable implements IsArrayable<ArrayElement>, Iterable<ArrayElement> {
  public readonly classType: typeof Arrayable = Arrayable
  public innerList: Array<ArrayElement> = []
  public initialized: boolean = false

  /**
   * Create the new Arrayable instance, configure the Arrayable class.
   */
  public constructor () {
    this.initialized = false
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
   * Retrieve a copy of the innerList used.
   * @returns {Array<ArrayElement>}
   */
  public get list (): Array<ArrayElement> {
    return this.innerList
  }

  /**
   * Retrieve the first Element from the Arrayable
   * @returns {ArrayElement}
   */
  public get first (): ArrayElement {
    return this.innerList[0]
  }

  /**
   * Retrieve the last Element from the Arrayable
   * @returns {ArrayElement}
   */
  public get last (): ArrayElement {
    return this.innerList[this.length - 1]
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
   * @param {ArrayElement|*} node The existing node as reference
   * @param {ArrayElement|*} newNode The new node to go after the existing node
   * @returns {Arrayable}
   */
  public insertAfter (node: ArrayElement, newNode: ArrayElement | any): Arrayable {
    const insertAt: number = this.innerList.indexOf(node)
    this.innerList.splice(insertAt + 1, 0, node.classType.make(newNode))
    return this
  }

  /**
   * Insert a new node (or data) before a node.
   * @param {ArrayElement|*} node The existing node as reference
   * @param {ArrayElement|*} newNode The new node to go before the existing node
   * @returns {Arrayable}
   */
  public insertBefore (node: ArrayElement, newNode: ArrayElement | any): Arrayable {
    const insertAt: number = this.innerList.indexOf(node)
    this.innerList.splice(insertAt, 0, node.classType.make(newNode))
    return this
  }

  /**
   * Add a node (or data) after the given (or last) node in the list.
   * @param {ArrayElement|*} node The new node to add to the end of the list
   * @param {ArrayElement} after The existing last node
   * @returns {Arrayable}
   */
  public append (node: ArrayElement | any, after: ArrayElement = this.last): Arrayable {
    return this.insertAfter(after, node)
  }

  /**
   * Add a node (or data) before the given (or first) node in the list.
   * @param {ArrayElement|*} node The new node to add to the start of the list
   * @param {ArrayElement} before The existing first node
   * @returns {Arrayable}
   */
  public prepend (node: ArrayElement | any, before: ArrayElement = this.first): Arrayable {
    return this.insertBefore(before, node)
  }

  /**
   * Remove an element from this arrayable.
   * @param {ArrayElement} node The node we wish to remove (and it will be returned after removal)
   * @return {ArrayElement}
   */
  public remove (node: ArrayElement): ArrayElement {
    const deleteAt = this.innerList.indexOf(node)
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
    const list: IsArrayable<IsElement> = new classType()
    return list.initialize(elementClass.fromArray(values).head)
  }
}

export default Arrayable
