/**
 * All of the collections available.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module collect-your-stuff
 */
import 'core-js/stable'
import Arrayable from './collections/arrayable/Arrayable'
import DoublyLinkedList from './collections/./doubly-linked-list/DoublyLinkedList'
import LinkedList from './collections/linked-list/LinkedList'
import LinkedTreeList from './collections/linked-tree-list/LinkedTreeList'
import Queue from './collections/queue/Queue'
import Stack from './collections/stack/Stack'
import recipes from './recipes/recipes'

/**
 * All methods exported from this module are encapsulated within collect-your-stuff.
 */
const collectYourStuff = {
  Arrayable,
  DoublyLinkedList,
  LinkedList,
  LinkedTreeList,
  Queue,
  Stack,
  recipes
}

export default collectYourStuff

if (this) {
  // @ts-ignore
  this.collectYourStuff = collectYourStuff
} else if (typeof window !== 'undefined') {
  // @ts-ignore
  window.collectYourStuff = collectYourStuff
}
