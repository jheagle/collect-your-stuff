'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.TreeLinker = void 0
require('core-js/modules/esnext.async-iterator.map.js')
require('core-js/modules/esnext.iterator.map.js')
var _Linker = require('./Linker')
/**
 * @file doubly linked tree item.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 */

class TreeLinker extends _Linker.Linker {
  /**
   *
   * @param data
   * @param prev
   * @param next
   * @param children
   * @param parent
   * @param LinkerClass
   */
  constructor () {
    const {
      data = null,
      prev = null,
      next = null,
      children = null,
      parent = null
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
    const LinkerClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TreeLinker
    super({
      data,
      prev,
      next
    }, LinkerClass)
    this.parent = parent
    this.children = this.childrenFromArray(children, LinkerClass)
  }

  childrenFromArray () {
    const children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null
    const LinkerClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TreeLinker
    return children !== null ? _Linker.Linker.fromArray.apply(this, [children.map(child => Object.assign({}, child, {
      parent: this
    })), LinkerClass]) : null
  }
}
exports.TreeLinker = TreeLinker
