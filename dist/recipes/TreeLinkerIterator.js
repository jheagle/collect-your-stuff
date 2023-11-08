'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
var _parseTreeNext = _interopRequireDefault(require('../services/parseTreeNext'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
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
    this.current = (0, _parseTreeNext.default)(this.current)
    return result
  }
}
var _default = exports.default = TreeLinkerIterator
