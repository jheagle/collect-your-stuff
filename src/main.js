/**
 * All of the collections available.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module collections
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
const previousCollections = root.collections || {}

/**
 * All methods exported from this module are encapsulated within collections.
 * @typedef {module:collections} collections
 */
const collections = {}
root.collections = collections

/**
 * Return a reference to this library while preserving the original same-named library
 * @function
 * @returns {module:collections~collections}
 */
const noConflict = () => {
  root.collections = previousCollections
  return collections
}
collections.noConflict = noConflict

export default Object.assign(
  collections,
  Linker,
  LinkedList,
  TreeLinker,
  LinkedTreeList
)
