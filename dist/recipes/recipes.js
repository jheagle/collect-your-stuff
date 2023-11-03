'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
var _ArrayIterator = _interopRequireDefault(require('./ArrayIterator'))
var _Runnable = _interopRequireDefault(require('./Runnable'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * @file sample classes which follow a pattern (have certain members or methods).
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */

/**
 * List of class declarations that can be used to specify attributes for a style of object / class.
 */
const recipes = {
  ArrayIterator: _ArrayIterator.default,
  Runnable: _Runnable.default
}
var _default = exports.default = recipes
