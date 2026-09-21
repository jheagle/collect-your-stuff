/**
 * All of the collections available.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module collect-your-stuff
 */
import 'core-js/stable'
import { ArrayElement } from './collections/arrayable/ArrayElement'
import { Arrayable } from './collections/arrayable/Arrayable'
import { DoubleLinker } from './collections/doubly-linked-list/DoubleLinker'
import { DoublyLinkedList } from './collections/doubly-linked-list/DoublyLinkedList'
import { Linker } from './collections/linked-list/Linker'
import { LinkedList } from './collections/linked-list/LinkedList'
import { TreeLinker } from './collections/linked-tree-list/TreeLinker'
import { LinkedTreeList } from './collections/linked-tree-list/LinkedTreeList'
import { Queueable } from './collections/queue/Queueable'
import { Queue } from './collections/queue/Queue'
import { TaskQueue } from './collections/queue/TaskQueue'
import { Stackable } from './collections/stack/Stackable'
import { Stack } from './collections/stack/Stack'
import { TaskStack } from './collections/stack/TaskStack'
import { recipes } from './recipes/recipes'
import { services } from './services/services'

/**
 * TODO:
 * 1. Create binary tree. Use the tree, but it has a limit of only two children per parent, and when adding / removing sort is applied. Add sort function in fromArray
 * 2. Create a heap (both min and max heap variants) which is similar to binary tree in structure, but tree having its min / max value as root. and it must insert on the left-most lowest level, and removes from root. Be able to easily swap nodes to ensure min / max ordering.
 * 3. Create a graph type which can have directional and undirectional variants for linking nodes
 */

// Every collection (with the linker / element class it is built from), the recipes and the services are available by
// name: import { LinkedList, Linker } from 'collect-your-stuff', require('collect-your-stuff').LinkedList ...
export {
  ArrayElement,
  Arrayable,
  DoubleLinker,
  DoublyLinkedList,
  Linker,
  LinkedList,
  TreeLinker,
  LinkedTreeList,
  Queueable,
  Queue,
  TaskQueue,
  Stackable,
  Stack,
  TaskStack,
  recipes,
  services
}

// ... and the types of the recipes, for TypeScript users
export type { IsArrayable, forEachCallback } from './recipes/IsArrayable'
export type { IsDoubleLinker } from './recipes/IsDoubleLinker'
export type { IsElement } from './recipes/IsElement'
export type { IsLinker } from './recipes/IsLinker'
export type { IsTree } from './recipes/IsTree'
export type { IsTreeNode } from './recipes/IsTreeNode'
export type { IsQueue } from './recipes/IsQueue'
export type { IsStack } from './recipes/IsStack'
export type { IsRunnable, completeResponse } from './recipes/Runnable'

/**
 * All methods exported from this module are encapsulated within collect-your-stuff (this default export is the same
 * set of classes as the named exports).
 */
const collectYourStuff = {
  ArrayElement,
  Arrayable,
  DoubleLinker,
  DoublyLinkedList,
  Linker,
  LinkedList,
  TreeLinker,
  LinkedTreeList,
  Queueable,
  Queue,
  TaskQueue,
  Stackable,
  Stack,
  TaskStack,
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
