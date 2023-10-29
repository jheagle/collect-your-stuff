'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
var _Arrayable = _interopRequireDefault(require('./collections/arrayable/Arrayable'))
var _DoublyLinkedList = _interopRequireDefault(require('./collections/doubly-linked-llist/DoublyLinkedList'))
var _LinkedList = _interopRequireDefault(require('./collections/linked-list/LinkedList'))
var _LinkedTreeList = _interopRequireDefault(require('./collections/linked-tree-list/LinkedTreeList'))
var _Queue = _interopRequireDefault(require('./collections/queue/Queue'))
var _Stack = _interopRequireDefault(require('./collections/stack/Stack'))
var _recipes = _interopRequireDefault(require('./recipes/recipes'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * All of the collections available.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module collect-your-stuff
 */

/**
 * All methods exported from this module are encapsulated within collect-your-stuff.
 * @typedef {module:collect-your-stuff} collectYourStuff
 */
const collectYourStuff = {
  Arrayable: _Arrayable.default,
  DoublyLinkedList: _DoublyLinkedList.default,
  LinkedList: _LinkedList.default,
  LinkedTreeList: _LinkedTreeList.default,
  Queue: _Queue.default,
  Stack: _Stack.default,
  recipes: _recipes.default
}
var _default = exports.default = collectYourStuff
if (void 0) {
  // @ts-ignore
  (void 0).collectYourStuff = collectYourStuff
} else if (typeof window !== 'undefined') {
  // @ts-ignore
  window.collectYourStuff = collectYourStuff
}
