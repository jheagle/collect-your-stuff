import IsTreeNode from '../recipes/IsTreeNode'

/**
 * Figure this out
 * 1. Start at root (get root parent)
 * 2. Get first child (repeat until no children)
 * 3. Check next child
 * 4. Repeat 2
 * 5. Repeat 3
 * 6. If no next child, return to parent and repeat 3
 * 7. Stop at root (next is null and parent is null
 * @param {IsTreeNode} treeNode Provide a node in a tree and get the next node (left-first approach)
 * @returns {IsTreeNode|null}
 */
const parseTreeNext = (treeNode: IsTreeNode): IsTreeNode | null => {
  if (!treeNode) {
    return null
  }
  let test: IsTreeNode = null
  if (treeNode.children && treeNode.children.length) {
    // Go down the left side of the tree
    test = treeNode.children.first
  }
  if (!test) {
    // Reached the bottom, go the next node on the right
    test = treeNode.next
  }
  if (!test && treeNode.parent) {
    // No more child nodes, return to parent and check parent sibling on the right
    let parentNext: IsTreeNode | null = treeNode.parent.next
    let parent: IsTreeNode = treeNode.parent
    while (parent && !parentNext) {
      parentNext = parent.next
      // Keep checking parent next, until there are no more parents, or we find the parent sibling
      parent = parent.parent
    }
    // This may be the parent sibling, or it could be null indicating we are done
    test = parentNext
  }
  // Finally, either use the node we found, or it may be null
  return test
}

export default parseTreeNext
