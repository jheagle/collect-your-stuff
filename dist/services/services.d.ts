/**
 * @file some useful resources when working with collections.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
/**
 * List helpful functions when dealing with collections.
 */
export declare const services: {
    parseTree: (tree: import("../main").IsTree, callback: import("../main").forEachCallback) => import("../main").IsTree;
    parseTreeNext: (treeNode: import("../main").IsTreeNode) => import("../main").IsTreeNode | null;
};
