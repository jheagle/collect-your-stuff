/**
 * All of the collections available.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module collect-your-stuff
 */
import 'core-js/stable';
import { ArrayElement } from './collections/arrayable/ArrayElement';
import { Arrayable } from './collections/arrayable/Arrayable';
import { DoubleLinker } from './collections/doubly-linked-list/DoubleLinker';
import { DoublyLinkedList } from './collections/doubly-linked-list/DoublyLinkedList';
import { Linker } from './collections/linked-list/Linker';
import { LinkedList } from './collections/linked-list/LinkedList';
import { TreeLinker } from './collections/linked-tree-list/TreeLinker';
import { LinkedTreeList } from './collections/linked-tree-list/LinkedTreeList';
import { Queueable } from './collections/queue/Queueable';
import { Queue } from './collections/queue/Queue';
import { Stackable } from './collections/stack/Stackable';
import { Stack } from './collections/stack/Stack';
import { recipes } from './recipes/recipes';
import { services } from './services/services';
/**
 * TODO:
 * 1. Create binary tree. Use the tree, but it has a limit of only two children per parent, and when adding / removing sort is applied. Add sort function in fromArray
 * 2. Create a heap (both min and max heap variants) which is similar to binary tree in structure, but tree having its min / max value as root. and it must insert on the left-most lowest level, and removes from root. Be able to easily swap nodes to ensure min / max ordering.
 * 3. Create a graph type which can have directional and undirectional variants for linking nodes
 */
export { ArrayElement, Arrayable, DoubleLinker, DoublyLinkedList, Linker, LinkedList, TreeLinker, LinkedTreeList, Queueable, Queue, Stackable, Stack, recipes, services };
export type { IsArrayable, forEachCallback } from './recipes/IsArrayable';
export type { IsDoubleLinker } from './recipes/IsDoubleLinker';
export type { IsElement } from './recipes/IsElement';
export type { IsLinker } from './recipes/IsLinker';
export type { IsTree } from './recipes/IsTree';
export type { IsTreeNode } from './recipes/IsTreeNode';
export type { IsRunnable, completeResponse } from './recipes/Runnable';
/**
 * All methods exported from this module are encapsulated within collect-your-stuff (this default export is the same
 * set of classes as the named exports).
 */
declare const collectYourStuff: {
    ArrayElement: typeof ArrayElement;
    Arrayable: typeof Arrayable;
    DoubleLinker: typeof DoubleLinker;
    DoublyLinkedList: typeof DoublyLinkedList;
    Linker: typeof Linker;
    LinkedList: typeof LinkedList;
    TreeLinker: typeof TreeLinker;
    LinkedTreeList: typeof LinkedTreeList;
    Queueable: typeof Queueable;
    Queue: typeof Queue;
    Stackable: typeof Stackable;
    Stack: typeof Stack;
    recipes: {
        ArrayIterator: typeof import("./recipes/ArrayIterator").ArrayIterator;
        Runnable: typeof import("./recipes/Runnable").Runnable;
    };
    services: {
        parseTree: (tree: import("./main").IsTree, callback: import("./main").forEachCallback) => import("./main").IsTree;
        parseTreeNext: (treeNode: import("./main").IsTreeNode) => import("./main").IsTreeNode | null;
    };
};
export default collectYourStuff;
