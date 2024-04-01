import { forEachCallback } from '../recipes/IsArrayable';
import { IsTree } from '../recipes/IsTree';
/**
 * Loop over all the nodes in a tree starting from left and apply a callback for each
 * @param {IsArrayable<IsTreeNode>} tree
 * @param {forEachCallback} callback
 * @returns {IsArrayable<IsTreeNode>}
 */
export declare const parseTree: (tree: IsTree, callback: forEachCallback) => IsTree;
