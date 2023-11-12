import IsElement from './IsElement'

/**
 * Run this function for each element in this arrayable.
 * @callback forEachCallback
 * @param {number} index
 * @param {IsArrayable} thisArg
 * @returns void
 */

export type forEachCallback = (element: IsElement, index?: number, thisArg?: IsArrayable<any>) => void

/**
 * Arrayable represents a collection stored as Elements.
 */
export default interface IsArrayable<T extends IsElement> {
  /**
   * Obnoxious typescript won't let me use typeof this class
   * @property {IsArrayable} classType
   */
  classType: any
  /**
   * @property {Array<IsElement> | IsElement | null} innerList
   */
  innerList: Array<T> | T | null
  /**
   * @private {boolean} initialized
   */
  initialized: boolean

  /**
   * Initialize the inner list, should only run once.
   * @param {IsArrayable|Array} initialList
   * @return {IsArrayable}
   */
  initialize (initialList: Array<T> | T): IsArrayable<any>

  /**
   * Retrieve a copy of the innerList used.
   * @returns {Array}
   */
  get list (): Array<IsElement> | IsElement

  /**
   * Retrieve the first Element from the Arrayable
   * @returns {IsElement}
   */
  get first (): T

  /**
   * Retrieve the last Element from the Arrayable
   * @returns {IsElement}
   */
  get last (): T

  /**
   * Return the length of the list.
   * @returns {number}
   */
  get length (): number

  /**
   * Insert a new node (or data) after a node.
   * @param {IsElement} node
   * @param {IsElement|*} newNode
   * @returns {IsArrayable}
   */
  insertAfter (node: T, newNode: T | any): IsArrayable<any>

  /**
   * Insert a new node (or data) before a node.
   * @param {IsElement} node
   * @param {IsElement|*} newNode
   * @returns {IsArrayable}
   */
  insertBefore (node: T, newNode: T | any): IsArrayable<any>

  /**
   * Add a node (or data) after the given (or last) node in the list.
   * @param {IsElement|*} node
   * @param {IsElement} after
   * @returns {IsArrayable}
   */
  append (node: T | any, after?: T): IsArrayable<any>

  /**
   * Add a node (or data) before the given (or first) node in the list.
   * @param {IsElement|*} node
   * @param {IsElement} before
   * @returns {IsArrayable}
   */
  prepend (node: T | any, before?: T): IsArrayable<any>

  /**
   * Remove an element from this arrayable.
   * @param {IsElement} node
   * @return {IsElement}
   */
  remove (node: T): T

  /**
   * Retrieve an element item from this list by numeric index, otherwise return null.
   * @param {number} index
   * @return {IsElement|null}
   */
  item (index: number): T | null

  /**
   * Be able to run forEach on this Arrayable to iterate over the elements.
   * @param {forEachCallback} callback
   * @param {IsArrayable} thisArg
   * @returns {IsArrayable}
   */
  forEach (callback: forEachCallback, thisArg?: IsArrayable<any>): IsArrayable<any>

  /**
   * Be able to iterate over this class.
   * @returns {Iterator}
   */
  [Symbol.iterator] (): Iterator<T>
}
