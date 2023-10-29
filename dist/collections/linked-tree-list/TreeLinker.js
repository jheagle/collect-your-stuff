"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.async-iterator.map.js");
require("core-js/modules/esnext.iterator.map.js");
var _DoubleLinker = _interopRequireDefault(require("../doubly-linked-llist/DoubleLinker"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * @file doubly linked tree item.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */

/**
 * TreeLinker represents a node in a LinkedTreeList.
 * @extends DoubleLinker
 */
class TreeLinker extends _DoubleLinker.default {
  parent = null;
  children = null;

  /**
   * Create the new TreeLinker instance, provide the data and optionally configure the type of Linker.
   * @param {Object} [settings={}]
   * @param {*} [settings.data=null]
   * @param {TreeLinker} [settings.prev=null]
   * @param {TreeLinker} [settings.next=null]
   * @param {LinkedTreeList} [settings.children=null]
   * @param {TreeLinker} [settings.parent=null]
   * @param {TreeLinker} [linkerClass=TreeLinker]
   */
  constructor() {
    let {
      data = null,
      prev = null,
      next = null,
      children = null,
      parent = null
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let linkerClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TreeLinker;
    super({
      data,
      prev,
      next
    }, linkerClass);
    this.parent = parent;
    this.children = this.childrenFromArray(children, linkerClass);
  }

  /**
   * Return the parent of this Tree Linker.
   * @return {TreeLinker|null}
   */
  get parent() {
    return this.parent;
  }

  /**
   * Return the children of this Tree Linker.
   * @return {LinkedTreeList|null}
   */
  get children() {
    return this.children;
  }

  /**
   * Create the children for this tree from an array.
   * @param {Array|null} children
   * @param {TreeLinker} linkerClass
   * @return {DoubleLinker|null}
   */
  childrenFromArray() {
    let children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    let linkerClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TreeLinker;
    if (children === null) {
      return null;
    }
    return _DoubleLinker.default.fromArray.apply(this, [children.map(child => Object.assign({}, child, {
      parent: this
    })), linkerClass]).tail;
  }
}

/**
 * Make a new DoubleLinker from the data given if it is not already a valid Linker.
 * @methodof TreeLinker
 * @param {TreeLinker|*} linker
 * @param {TreeLinker} [linkerClass=TreeLinker]
 * @return {Linker}
 */
TreeLinker.make = function (linker) {
  let linkerClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TreeLinker;
  return _DoubleLinker.default.make(linker, linkerClass);
};

/**
 * Convert an array into DoubleLinker instances, return the head and tail DoubleLinkers.
 * @methodof TreeLinker
 * @param {Array} [values=[]]
 * @param {TreeLinker} [linkerClass=TreeLinker]
 * @returns {{head: TreeLinker, tail: TreeLinker}}
 */
TreeLinker.fromArray = function () {
  let values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  let linkerClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TreeLinker;
  return _DoubleLinker.default.fromArray(values, linkerClass);
};
var _default = exports.default = TreeLinker;