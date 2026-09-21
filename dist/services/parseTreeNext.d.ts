import { IsTreeNode } from '../recipes/IsTreeNode';
/**
 * Be able to parse over every node in a tree.
 * 1. Start at root (get root parent)
 * 2. Get first child (repeat until no children)
 * 3. Check next child
 * 4. Repeat 2
 * 5. Repeat 3
 * 6. If no next child, return to parent and repeat 3
 * 7. Stop at root (next is null and parent is null
 * A boundary can be given to parse only part of a tree: going back up to the parents stops at the boundary, so the
 * parsing stays within the nodes whose parent is the boundary (and everything below them).
 * @param {IsTreeNode} treeNode Provide a node in a tree and get the next node (left-first approach)
 * @param {IsTreeNode|null} [boundaryParent] The parent of the nodes to stay within, null for the nodes at the top of a tree. When it is not given the whole tree is parsed.
 * @returns {IsTreeNode|null}
 */
export declare const parseTreeNext: (treeNode: IsTreeNode, boundaryParent?: IsTreeNode | null) => IsTreeNode | null;
