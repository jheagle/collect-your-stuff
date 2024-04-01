/**
 * All of the collections available.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module collect-your-stuff
 */
import 'core-js/stable'
import { Arrayable } from './collections/arrayable/Arrayable'
import { DoublyLinkedList } from './collections/doubly-linked-list/DoublyLinkedList'
import { LinkedList } from './collections/linked-list/LinkedList'
import { LinkedTreeList } from './collections/linked-tree-list/LinkedTreeList'
import { Queue } from './collections/queue/Queue'
import { Stack } from './collections/stack/Stack'
import { recipes } from './recipes/recipes'
import { services } from './services/services'

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
  Arrayable,
  DoublyLinkedList,
  LinkedList,
  LinkedTreeList,
  Queue,
  Stack,
  recipes,
  services
}

export default collectYourStuff

if (this) {
  // @ts-ignore
  this.collectYourStuff = collectYourStuff
} else if (typeof window !== 'undefined') {
  // @ts-ignore
  window.collectYourStuff = collectYourStuff
}
