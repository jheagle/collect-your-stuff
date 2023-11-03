'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
/**
 * Class ArrayIterator returns the next value for Iterable classes.
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
var _default = exports.default = ArrayIterator
