'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.DoubleLinkerIterator = void 0
/**
 * Class DoubleLinkerIterator returns the next value when using linkers of linked type lists.
 */
class DoubleLinkerIterator {
  constructor (current) {
    this.current = current
  }

  next (value) {
    const result = {
      value: this.current,
      done: !this.current
    }
    this.current = this.current ? this.current.next : null
    return result
  }
}
exports.DoubleLinkerIterator = DoubleLinkerIterator
