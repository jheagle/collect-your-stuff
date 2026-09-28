'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.parseTree = void 0
const _parseTreeNext = require('./parseTreeNext')
/**
 * Loop over all the nodes in a tree starting from left and apply a callback for each
 * @param tree
 * @param callback
 */
const parseTree = (tree, callback) => {
  let index = 0
  let current = tree.rootParent
  while (current !== null) {
    callback(current, index, tree)
    current = (0, _parseTreeNext.parseTreeNext)(current)
    ++index
  }
  return tree
}
exports.parseTree = parseTree
