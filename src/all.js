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

// eslint-disable-next-line no-import-assign
export default Object.assign(
  Linker,
  LinkedList,
  TreeLinker,
  LinkedTreeList
)
