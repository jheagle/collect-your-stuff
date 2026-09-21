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
  /**
   * Create an iterator starting at the given item.
   * @param {IsTreeNode} current The item to start from.
   */
  constructor (current) {
    this.current = current
  }

  /**
   * Get the current item and move on to the following one (left-first, down each branch).
   * @param {*} [value] Not used, present to match the Iterator interface.
   * @return {IteratorResult<IsTreeNode>} The current item, or done when there are no more.
   */
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
