'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
var _Arrayable = require('./collections/arrayable/Arrayable')
var _DoublyLinkedList = require('./collections/doubly-linked-list/DoublyLinkedList')
var _LinkedList = require('./collections/linked-list/LinkedList')
var _LinkedTreeList = require('./collections/linked-tree-list/LinkedTreeList')
var _Queue = require('./collections/queue/Queue')
var _Stack = require('./collections/stack/Stack')
var _recipes = require('./recipes/recipes')
var _services = require('./services/services')
/**
 * All of the collections available.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module collect-your-stuff
 */

/**
 * TODO:
 * 1. Create binary tree. Use the tree, but it has a limit of only two children per parent, and when adding / removing sort is applied. Add sort function in fromArray
 * 2. Create a heap (both min and max heap variants) which is similar to binary tree in structure, but tree having its min / max value as root. and it must insert on the left-most lowest level, and removes from root. Be able to easily swap nodes to ensure min / max ordering.
 * 3. Create a graph type which can have directional and undirectional variants for linking nodes
 */
/**
 * All methods exported from this module are encapsulated within collect-your-stuff.
 */
const collectYourStuff = {
  Arrayable: _Arrayable.Arrayable,
  DoublyLinkedList: _DoublyLinkedList.DoublyLinkedList,
  LinkedList: _LinkedList.LinkedList,
  LinkedTreeList: _LinkedTreeList.LinkedTreeList,
  Queue: _Queue.Queue,
  Stack: _Stack.Stack,
  recipes: _recipes.recipes,
  services: _services.services
}
var _default = exports.default = collectYourStuff
if (void 0) {
  // @ts-ignore
  (void 0).collectYourStuff = collectYourStuff
} else if (typeof window !== 'undefined') {
  // @ts-ignore
  window.collectYourStuff = collectYourStuff
}
