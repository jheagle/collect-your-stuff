'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.services = void 0
const _parseTree = require('./parseTree')
const _parseTreeNext = require('./parseTreeNext')
/**
 * @file some useful resources when working with collections.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */

/**
 * List helpful functions when dealing with collections.
 */
const services = exports.services = {
  parseTree: _parseTree.parseTree,
  parseTreeNext: _parseTreeNext.parseTreeNext
}
