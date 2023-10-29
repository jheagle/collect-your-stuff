"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.async-iterator.reduce.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.reduce.js");
var _Linker = _interopRequireDefault(require("../linked-list/Linker"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * @file doubly linked list item.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */

/**
 * DoubleLinker represents a node in a DoublyLinkedList.
 * @extends Linker
 */
class DoubleLinker extends _Linker.default {
  prev = null;

  /**
   * Create the new DoubleLinker instance, provide the data and optionally configure the type of Linker.
   * @param {Object} [nodeData={}]
   * @param {*} [nodeData.data=null]
   * @param {DoubleLinker|null} [nodeData.prev=null]
   * @param {DoubleLinker|null} [nodeData.next=null]
   * @param {DoubleLinker} [linkerClass=DoubleLinker]
   */
  constructor() {
    let {
      data = null,
      prev = null,
      next = null
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let linkerClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DoubleLinker;
    super({
      data: data,
      next: next
    }, linkerClass);
    this.prev = prev;
  }
}

/**
 * Make a new DoubleLinker from the data given if it is not already a valid Linker.
 * @methodof DoubleLinker
 * @param {DoubleLinker|*} linker
 * @param {DoubleLinker} [linkerClass=DoubleLinker]
 * @return {Linker}
 */
DoubleLinker.make = function (linker) {
  let linkerClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DoubleLinker;
  return _Linker.default.make(linker, linkerClass);
};

/**
 * Convert an array into DoubleLinker instances, return the head and tail DoubleLinkers.
 * @methodof DoubleLinker
 * @param {Array} [values=[]]
 * @param {DoubleLinker} [linkerClass=DoubleLinker]
 * @returns {{head: DoubleLinker, tail: DoubleLinker}}
 */
DoubleLinker.fromArray = function () {
  let values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  let linkerClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DoubleLinker;
  return values.reduce((references, linker) => {
    const newLinker = linkerClass.make(linker);
    if (references.head === null) {
      // Initialize the head and tail with the new node
      return {
        head: newLinker,
        tail: newLinker
      };
    }
    newLinker.prev = references.tail;
    // Only update the tail once head has been set, tail is always the most recent node
    references.tail.next = newLinker;
    references.tail = newLinker;
    return references;
  }, {
    head: null,
    tail: null
  });
};
var _default = exports.default = DoubleLinker;