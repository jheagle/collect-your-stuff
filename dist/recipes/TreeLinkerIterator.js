'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.TreeLinkerIterator = void 0
var _parseTreeNext = require('../services/parseTreeNext')
/**
 * Class TreeLinkerIterator returns the next value taking a left-first approach down a tree.
 */
class TreeLinkerIterator {
  constructor (current) {
    this.current = current
  }

  next (value) {
    const result = {
      value: this.current,
      done: !this.current
    }
    this.current = (0, _parseTreeNext.parseTreeNext)(this.current)
    return result
  }
}
exports.TreeLinkerIterator = TreeLinkerIterator
