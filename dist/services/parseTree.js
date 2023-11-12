'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.default = void 0
var _parseTreeNext = _interopRequireDefault(require('./parseTreeNext'))
function _interopRequireDefault (obj) { return obj && obj.__esModule ? obj : { default: obj } }
/**
 * Loop over all the nodes in a tree starting from left and apply a callback for each
 * @param {IsArrayable<IsTreeNode>} tree
 * @param {forEachCallback} callback
 * @returns {IsArrayable<IsTreeNode>}
 */
const parseTree = (tree, callback) => {
  let index = 0
  let current = tree.rootParent
  while (current !== null) {
    callback(current, index, tree)
    current = (0, _parseTreeNext.default)(current)
    ++index
  }
  return tree
}
var _default = exports.default = parseTree
