/**
 * All of the collections available.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module collect-your-stuff
 */

import 'core-js/stable'
import * as Linker from './collections/Linker'
import * as LinkedList from './collections/LinkedList'
import * as TreeLinker from './collections/TreeLinker'
import * as LinkedTreeList from './collections/LinkedTreeList'

/**
 * Store a reference to this scope which will be Window if rendered via browser
 */
const root = this || window || global || {}

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

export default Object.assign(
  collectYourStuff,
  Linker,
  LinkedList,
  TreeLinker,
  LinkedTreeList
)
