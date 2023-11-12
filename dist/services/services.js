'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
var _parseTree = _interopRequireDefault(require('./parseTree'))
var _parseTreeNext = _interopRequireDefault(require('./parseTreeNext'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * @file some useful resources when working with collections.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */

/**
 * List helpful functions when dealing with collections.
 */
const services = {
  parseTree: _parseTree.default,
  parseTreeNext: _parseTreeNext.default
}
var _default = exports.default = services
