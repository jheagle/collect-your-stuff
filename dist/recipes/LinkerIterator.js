'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.LinkerIterator = void 0
/**
 * Class LinkerIterator returns the next value when using linkers of linked type lists.
 */
class LinkerIterator {
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
exports.LinkerIterator = LinkerIterator
