/**
 * All of the collections available.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module collect-your-stuff
 */
import 'core-js/stable';
import Arrayable from './collections/arrayable/Arrayable';
import DoublyLinkedList from './collections/./doubly-linked-list/DoublyLinkedList';
import LinkedList from './collections/linked-list/LinkedList';
import LinkedTreeList from './collections/linked-tree-list/LinkedTreeList';
import Queue from './collections/queue/Queue';
import Stack from './collections/stack/Stack';
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
        ArrayIterator: typeof import("./recipes/ArrayIterator").default;
        Runnable: typeof import("./recipes/Runnable").default;
    };
};
export default collectYourStuff;
