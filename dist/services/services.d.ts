/**
 * @file some useful resources when working with collections.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
/**
 * List helpful functions when dealing with collections.
 */
declare const services: {
    parseTree: (tree: import("../recipes/IsTree").default, callback: import("../recipes/IsArrayable").forEachCallback) => import("../recipes/IsTree").default;
    parseTreeNext: (treeNode: import("../recipes/IsTreeNode").default) => import("../recipes/IsTreeNode").default;
};
export default services;
