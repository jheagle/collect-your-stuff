'use strict'

require('core-js/modules/esnext.weak-map.delete-all.js')
Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
require('core-js/stable')
var Linker = _interopRequireWildcard(require('./collections/Linker'))
var LinkedList = _interopRequireWildcard(require('./collections/LinkedList'))
var TreeLinker = _interopRequireWildcard(require('./collections/TreeLinker'))
var LinkedTreeList = _interopRequireWildcard(require('./collections/LinkedTreeList'))
function _getRequireWildcardCache (e) { if (typeof WeakMap !== 'function') return null; var r = new WeakMap(); var t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r })(e) }
function _interopRequireWildcard (e, r) { if (!r && e && e.__esModule) return e; if (e === null || typeof e !== 'object' && typeof e !== 'function') return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }; var a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if (u !== 'default' && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u] } return n.default = e, t && t.set(e, n), n }
/**
 * All of the collections available.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module collect-your-stuff
 */

/**
 * Store a reference to this scope which will be Window if rendered via browser
 */
const root = void 0 || window || global || {}

/**
 * Store reference to any pre-existing module of the same name
 * @type {module|*}
 */
const previousCollectYourStuff = root.collectYourStuff || {}

/**
 * All methods exported from this module are encapsulated within collect-your-stuff.
 * @typedef {module:collect-your-stuff} collectYourStuff
 */
const collectYourStuff = {}
root.collectYourStuff = collectYourStuff

/**
 * Return a reference to this library while preserving the original same-named library
 * @function
 * @returns {module:collect-your-stuff~collectYourStuff}
 */
const noConflict = () => {
  root.collectYourStuff = previousCollectYourStuff
  return collectYourStuff
}
collectYourStuff.noConflict = noConflict
var _default = exports.default = Object.assign(collectYourStuff, Linker, LinkedList, TreeLinker, LinkedTreeList)
