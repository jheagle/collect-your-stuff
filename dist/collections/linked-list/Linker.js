"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/esnext.async-iterator.reduce.js");
require("core-js/modules/esnext.iterator.constructor.js");
require("core-js/modules/esnext.iterator.reduce.js");
var _ArrayElement = _interopRequireDefault(require("../arrayable/ArrayElement"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * @file linked list item.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */

/**
 * Linker represents a node in a LinkedList.
 * @extends ArrayElement
 */
class Linker extends _ArrayElement.default {
  next = null;

  /**
   * Create the new Linker instance, provide the data and optionally configure the type of Linker.
   * @param {Object} [nodeData={}]
   * @param {*} [nodeData.data=null]
   * @param {Linker|null} [nodeData.next=null]
   * @param {Linker} [linkerClass=Linker]
   */
  constructor() {
    let {
      data = null,
      next = null
    } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let linkerClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Linker;
    super(data, linkerClass);
    this.next = next;
  }
}

/**
 * Make a new Linker from the data given if it is not already a valid Linker.
 * @methodof Linker
 * @param {Linker|*} linker
 * @param {Linker} [linkerClass=Linker]
 * @return {Linker}
 */
Linker.make = function (linker) {
  let linkerClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Linker;
  if (typeof linker !== 'object') {
    // It is not an object, so instantiate the Linker with linker as the data
    return new linkerClass({
      data: linker
    });
  }
  if (linker.classType) {
    // Already valid Linker, return as-is
    return linker;
  }
  if (!linker.data) {
    linker = {
      data: linker
    };
  }
  // Create the new node as the configured linkerClass
  return new linkerClass(linker, linkerClass);
};

/**
 * Convert an array into Linker instances, return the head and tail Linkers.
 * @methodof Linker
 * @param {Array} [values=[]]
 * @param {Linker} [linkerClass=Linker]
 * @returns {{head: Linker, tail: Linker}}
 */
Linker.fromArray = function () {
  let values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  let linkerClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Linker;
  return values.reduce((references, linker) => {
    const newLinker = linkerClass.make(linker);
    if (references.head === null) {
      // Initialize the head and tail with the new node
      return {
        head: newLinker,
        tail: newLinker
      };
    }
    // Only update the tail once head has been set, tail is always the most recent node
    references.tail.next = newLinker;
    references.tail = newLinker;
    return references;
  }, {
    head: null,
    tail: null
  });
};
var _default = exports.default = Linker;