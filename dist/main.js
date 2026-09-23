'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
Object.defineProperty(exports, 'ArrayElement', {
  enumerable: true,
  get: function () {
    return _ArrayElement.ArrayElement
  }
})
Object.defineProperty(exports, 'Arrayable', {
  enumerable: true,
  get: function () {
    return _Arrayable.Arrayable
  }
})
Object.defineProperty(exports, 'DoubleLinker', {
  enumerable: true,
  get: function () {
    return _DoubleLinker.DoubleLinker
  }
})
Object.defineProperty(exports, 'DoublyLinkedList', {
  enumerable: true,
  get: function () {
    return _DoublyLinkedList.DoublyLinkedList
  }
})
Object.defineProperty(exports, 'LinkedList', {
  enumerable: true,
  get: function () {
    return _LinkedList.LinkedList
  }
})
Object.defineProperty(exports, 'LinkedTreeList', {
  enumerable: true,
  get: function () {
    return _LinkedTreeList.LinkedTreeList
  }
})
Object.defineProperty(exports, 'Linker', {
  enumerable: true,
  get: function () {
    return _Linker.Linker
  }
})
Object.defineProperty(exports, 'Queue', {
  enumerable: true,
  get: function () {
    return _Queue.Queue
  }
})
Object.defineProperty(exports, 'Queueable', {
  enumerable: true,
  get: function () {
    return _Queueable.Queueable
  }
})
Object.defineProperty(exports, 'Stack', {
  enumerable: true,
  get: function () {
    return _Stack.Stack
  }
})
Object.defineProperty(exports, 'Stackable', {
  enumerable: true,
  get: function () {
    return _Stackable.Stackable
  }
})
Object.defineProperty(exports, 'TaskQueue', {
  enumerable: true,
  get: function () {
    return _TaskQueue.TaskQueue
  }
})
Object.defineProperty(exports, 'TaskStack', {
  enumerable: true,
  get: function () {
    return _TaskStack.TaskStack
  }
})
Object.defineProperty(exports, 'TreeLinker', {
  enumerable: true,
  get: function () {
    return _TreeLinker.TreeLinker
  }
})
exports.default = void 0
Object.defineProperty(exports, 'recipes', {
  enumerable: true,
  get: function () {
    return _recipes.recipes
  }
})
Object.defineProperty(exports, 'services', {
  enumerable: true,
  get: function () {
    return _services.services
  }
})
var _ArrayElement = require('./collections/arrayable/ArrayElement')
var _Arrayable = require('./collections/arrayable/Arrayable')
var _DoubleLinker = require('./collections/doubly-linked-list/DoubleLinker')
var _DoublyLinkedList = require('./collections/doubly-linked-list/DoublyLinkedList')
var _Linker = require('./collections/linked-list/Linker')
var _LinkedList = require('./collections/linked-list/LinkedList')
var _TreeLinker = require('./collections/linked-tree-list/TreeLinker')
var _LinkedTreeList = require('./collections/linked-tree-list/LinkedTreeList')
var _Queueable = require('./collections/queue/Queueable')
var _Queue = require('./collections/queue/Queue')
var _TaskQueue = require('./collections/queue/TaskQueue')
var _Stackable = require('./collections/stack/Stackable')
var _Stack = require('./collections/stack/Stack')
var _TaskStack = require('./collections/stack/TaskStack')
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
// Every collection (with the linker / element class it is built from), the recipes and the services are available by
// name: import { LinkedList, Linker } from 'collect-your-stuff', require('collect-your-stuff').LinkedList ...

/**
 * All methods exported from this module are encapsulated within collect-your-stuff (this default export is the same
 * set of classes as the named exports).
 */
const collectYourStuff = {
  ArrayElement: _ArrayElement.ArrayElement,
  Arrayable: _Arrayable.Arrayable,
  DoubleLinker: _DoubleLinker.DoubleLinker,
  DoublyLinkedList: _DoublyLinkedList.DoublyLinkedList,
  Linker: _Linker.Linker,
  LinkedList: _LinkedList.LinkedList,
  TreeLinker: _TreeLinker.TreeLinker,
  LinkedTreeList: _LinkedTreeList.LinkedTreeList,
  Queueable: _Queueable.Queueable,
  Queue: _Queue.Queue,
  TaskQueue: _TaskQueue.TaskQueue,
  Stackable: _Stackable.Stackable,
  Stack: _Stack.Stack,
  TaskStack: _TaskStack.TaskStack,
  recipes: _recipes.recipes,
  services: _services.services
}
const _default = exports.default = collectYourStuff
if (void 0) {
  // @ts-ignore
  (void 0).collectYourStuff = collectYourStuff
} else if (typeof window !== 'undefined') {
  // @ts-ignore
  window.collectYourStuff = collectYourStuff
}
