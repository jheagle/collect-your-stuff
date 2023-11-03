import IsElement from './IsElement'

/**
 * Run this function for each element in this arrayable.
 * @callback forEachCallback
 * @param {number} index
 * @param {IsArrayable} thisArg
 * @returns void
 */

export type forEachCallback = (element: IsElement<any>, index?: number, thisArg?: IsArrayable<any>) => void

/**
 * Arrayable represents a collection stored as Elements.
 */
export default interface IsArrayable<T> {
  classType: T | any
  innerList: Array<IsElement<any>> | IsElement<any> | null
  initialized: boolean

  /**
   * Initialize the inner list, should only run once.
   * @param {IsArrayable|Array} initialList
   * @return {IsArrayable}
   */
  initialize (initialList: Array<IsElement<any>> | IsElement<any>): IsArrayable<any>

  /**
   * Retrieve a copy of the innerList used.
   * @returns {Array}
   */
  get list (): Array<IsElement<any>> | IsElement<any>

  /**
   * Retrieve the first Element from the Arrayable
   * @returns {IsElement}
   */
  get first (): IsElement<any>

  /**
   * Retrieve the last Element from the Arrayable
   * @returns {IsElement}
   */
  get last (): IsElement<any>

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
  insertAfter (node: IsElement<any>, newNode: IsElement<any> | any): T

  /**
   * Insert a new node (or data) before a node.
   * @param {IsElement} node
   * @param {IsElement|*} newNode
   * @returns {IsArrayable}
   */
  insertBefore (node: IsElement<any>, newNode: IsElement<any> | any): T

  /**
   * Add a node (or data) after the given (or last) node in the list.
   * @param {IsElement|*} node
   * @param {IsElement} after
   * @returns {IsArrayable}
   */
  append (node: IsElement<any> | any, after?: IsElement<any>): T

  /**
   * Add a node (or data) before the given (or first) node in the list.
   * @param {IsElement|*} node
   * @param {IsElement} before
   * @returns {IsArrayable}
   */
  prepend (node: IsElement<any> | any, before?: IsElement<any>): T

  /**
   * Remove an element from this arrayable.
   * @param {IsElement} node
   * @return {IsElement}
   */
  remove (node: IsElement<any>): IsElement<any> | any

  /**
   * Retrieve an element item from this list by numeric index, otherwise return null.
   * @param {number} index
   * @return {IsElement|null}
   */
  item (index: number): IsElement<any> | null

  /**
   * Be able to run forEach on this Arrayable to iterate over the elements.
   * @param {forEachCallback} callback
   * @param {IsArrayable} thisArg
   * @returns {IsArrayable}
   */
  forEach (callback: forEachCallback, thisArg?: T): T

  /**
   * Be able to iterate over this class.
   * @returns {Iterator}
   */
  [Symbol.iterator] (): Iterator<IsElement<any>>
}
