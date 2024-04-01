/**
 * All of the collections available.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module collect-your-stuff
 */
import 'core-js/stable';
import { Arrayable } from './collections/arrayable/Arrayable';
import { DoublyLinkedList } from './collections/doubly-linked-list/DoublyLinkedList';
import { LinkedList } from './collections/linked-list/LinkedList';
import { LinkedTreeList } from './collections/linked-tree-list/LinkedTreeList';
import { Queue } from './collections/queue/Queue';
import { Stack } from './collections/stack/Stack';
/**
 * TODO:
 * 1. Create binary tree. Use the tree, but it has a limit of only two children per parent, and when adding / removing sort is applied. Add sort function in fromArray
 * 2. Create a heap (both min and max heap variants) which is similar to binary tree in structure, but tree having its min / max value as root. and it must insert on the left-most lowest level, and removes from root. Be able to easily swap nodes to ensure min / max ordering.
 * 3. Create a graph type which can have directional and undirectional variants for linking nodes
 */
/**
 * All methods exported from this module are encapsulated within collect-your-stuff.
 */
declare const collectYourStuff: {
    Arrayable: typeof Arrayable;
    DoublyLinkedList: typeof DoublyLinkedList;
    LinkedList: typeof LinkedList;
    LinkedTreeList: typeof LinkedTreeList;
    Queue: typeof Queue;
    Stack: typeof Stack;
    recipes: {
        ArrayIterator: typeof import("./recipes/ArrayIterator").ArrayIterator;
        Runnable: typeof import("./recipes/Runnable").Runnable;
    };
    services: {
        parseTree: (tree: import("./recipes/IsTree").IsTree, callback: import("./recipes/IsArrayable").forEachCallback) => import("./recipes/IsTree").IsTree;
        parseTreeNext: (treeNode: import("./recipes/IsTreeNode").IsTreeNode) => import("./recipes/IsTreeNode").IsTreeNode;
    };
};
export default collectYourStuff;
