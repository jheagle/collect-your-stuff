'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.ArrayIterator = void 0
/**
 * Class ArrayIterator returns the next value when using elements of array type list.
 */
class ArrayIterator {
  constructor (innerList) {
    const index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
    this.innerList = innerList
    this.index = index
  }

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
