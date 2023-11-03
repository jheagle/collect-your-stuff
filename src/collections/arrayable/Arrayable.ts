/**
 * @file arrayable list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import ArrayElement from './ArrayElement'
import ArrayIterator from '../../recipes/ArrayIterator'
import IsArrayable, { forEachCallback } from '../../recipes/IsArrayable'
import IsElement from '../../recipes/IsElement'

/**
 * Arrayable represents a collection stored as an array.
 */
class Arrayable implements IsArrayable<Arrayable>, Iterable<IsElement<ArrayElement>> {
  public readonly classType: typeof Arrayable = null
  public innerList: Array<IsElement<ArrayElement>> = []
  public initialized: boolean = false

  /**
   * Create the new Arrayable instance, configure the Arrayable class.
   */
  constructor () {
    this.classType = Arrayable
    this.initialized = false
  }

  /**
   * Initialize the inner list, should only run once.
   * @param {ArrayElement|Array} initialList
   * @return {Arrayable}
   */
  public initialize (initialList: Array<IsElement<ArrayElement>>): Arrayable {
    if (this.initialized) {
      console.warn('Attempt to initialize Arrayable which is not empty.')
      return this
    }
    this.initialized = true
    this.innerList = initialList
    return this
  }

  /**
   * Retrieve a copy of the innerList used.
   * @returns {Array}
   */
  get list (): Array<IsElement<ArrayElement>> {
    return this.innerList
  }

  /**
   * Retrieve the first Element from the Arrayable
   * @returns {ArrayElement}
   */
  get first (): IsElement<ArrayElement> {
    return this.innerList[0]
  }

  /**
   * Retrieve the last Element from the Arrayable
   * @returns {ArrayElement}
   */
  get last (): IsElement<ArrayElement> {
    return this.innerList[this.length - 1]
  }

  /**
   * Return the length of the list.
   * @returns {number}
   */
  get length (): number {
    return this.innerList.length
  }

  /**
   * Insert a new node (or data) after a node.
   * @param {ArrayElement|*} node
   * @param {ArrayElement|*} newNode
   * @returns {Arrayable}
   */
  insertAfter (node: IsElement<ArrayElement>, newNode: ArrayElement | any): Arrayable {
    const insertAt: number = this.innerList.indexOf(node)
    this.innerList.splice(insertAt + 1, 0, node.classType.make(newNode))
    return this
  }

  /**
   * Insert a new node (or data) before a node.
   * @param {ArrayElement|*} node
   * @param {ArrayElement|*} newNode
   * @returns {Arrayable}
   */
  insertBefore (node: IsElement<ArrayElement>, newNode: ArrayElement | any): Arrayable {
    const insertAt: number = this.innerList.indexOf(node)
    this.innerList.splice(insertAt, 0, node.classType.make(newNode))
    return this
  }

  /**
   * Add a node (or data) after the given (or last) node in the list.
   * @param {ArrayElement|*} node
   * @param {ArrayElement} after
   * @returns {Arrayable}
   */
  append (node: ArrayElement | any, after: IsElement<ArrayElement> = this.last): Arrayable {
    return this.insertAfter(after, node)
  }

  /**
   * Add a node (or data) before the given (or first) node in the list.
   * @param {ArrayElement|*} node
   * @param {ArrayElement} before
   * @returns {Arrayable}
   */
  prepend (node: ArrayElement | any, before: IsElement<ArrayElement> = this.first): Arrayable {
    return this.insertBefore(before, node)
  }

  /**
   * Remove an element from this arrayable.
   * @param {ArrayElement} node
   * @return {ArrayElement}
   */
  remove (node: ArrayElement): ArrayElement {
    const deleteAt = this.innerList.indexOf(node)
    this.innerList.splice(deleteAt, 1)
    return node
  }

  /**
   * Retrieve an ArrayElement item from this list by numeric index, otherwise return null.
   * @param {number} index
   * @return {ArrayElement|null}
   */
  item (index: number): IsElement<ArrayElement> | null {
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
   * @param {forEachCallback} callback
   * @param {Arrayable} thisArg
   * @returns {Arrayable}
   */
  forEach (callback: forEachCallback, thisArg: Arrayable = this): Arrayable {
    for (let i = 0; i < thisArg.length; ++i) {
      callback(thisArg.item(i), i, thisArg)
    }
    return thisArg
  }

  /**
   * Be able to iterate over this class.
   * @returns {Iterator}
   */
  [Symbol.iterator] (): Iterator<IsElement<ArrayElement>> {
    let index = 0
    return new ArrayIterator(this.innerList, index)
  }

  /**
   * Convert an array to an Arrayable.
   * @param {Array} values
   * @param {ArrayElement} elementClass
   * @returns {Arrayable}
   */
  public static fromArray = (values: Array<any> = [], elementClass: typeof ArrayElement = ArrayElement): IsArrayable<Arrayable> => {
    const list = new Arrayable()
    return list.initialize(elementClass.fromArray(values).head)
  }
}

export default Arrayable
