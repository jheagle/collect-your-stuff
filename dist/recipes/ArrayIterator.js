'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.ArrayIterator = void 0
/**
 * Class ArrayIterator returns the next value when using elements of array type list.
 */
class ArrayIterator {
  /**
   * Create an iterator over the given array.
   * @param {Array<IsElement>} innerList The elements to iterate over.
   * @param {number} [index=0] The position to start from.
   */
  constructor (innerList, index = 0) {
    this.innerList = innerList
    this.index = index
  }

  /**
   * Get the next element, moving the iterator forward.
   * @param {*} [value] Not used, present to match the Iterator interface.
   * @return {IteratorResult<IsElement>} The next element, or done when there are no more.
   */
  next (value) {
    if (this.index < this.innerList.length) {
      return {
        value: this.innerList[this.index++],
        done: false
      }
    }
    return {
      value: undefined,
      done: true
    }
  }
}
exports.ArrayIterator = ArrayIterator
