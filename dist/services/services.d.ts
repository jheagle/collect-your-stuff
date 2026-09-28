/**
 * some useful resources when working with collections.
 */
/**
 * List helpful functions when dealing with collections.
 */
export declare const services: {
    parseTree: (tree: import("../main").IsTree, callback: import("../main").forEachCallback) => import("../main").IsTree;
    parseTreeNext: (treeNode: import("../main").IsTreeNode, boundaryParent?: import("../main").IsTreeNode | null) => import("../main").IsTreeNode | null;
};
