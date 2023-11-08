import IsTreeNode from '../recipes/IsTreeNode'
import { forEachCallback } from '../recipes/IsArrayable'
import IsTree from '../recipes/IsTree'
import parseTreeNext from './parseTreeNext'

/**
 * Loop over all the nodes in a tree starting from left and apply a callback for each
 * @param {IsArrayable<IsTreeNode>} tree
 * @param {forEachCallback} callback
 * @returns {IsArrayable<IsTreeNode>}
 */
const parseTree = (tree: IsTree, callback: forEachCallback): IsTree => {
  let index: number = 0
  let current: IsTreeNode = tree.rootParent
  while (current !== null) {
    callback(current, index, tree)
    current = parseTreeNext(current)
    ++index
  }
  return tree
}

export default parseTree
