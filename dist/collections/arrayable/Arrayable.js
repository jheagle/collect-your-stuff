"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _ArrayElement = _interopRequireDefault(require("./ArrayElement"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * @file doubly linked list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */

/**
 * DoublyLinkedList represents a collection stored as a LinkedList with prev and next references.
 */
class Arrayable {
  classType = null;
  initialized = false;
  innerList = [];

  /**
   * Create the new Arrayable instance, configure the Arrayable class.
   * @param {Arrayable|Iterable} classType
   */
  constructor() {
    let classType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Arrayable;
    this.classType = classType;
    this.initialized = false;
  }

  /**
   * Initialize the inner list, should only run once.
   * @method
   * @param {ArrayElement|Array} initialList
   * @return {Arrayable}
   */
  initialize(initialList) {
    if (this.initialized) {
      console.warn('Attempt to initialize Arrayable which is not empty.');
      return this;
    }
    this.initialized = true;
    this.innerList = initialList;
    return this;
  }

  /**
   * Return the type of class used for Arrayable.
   
   * @returns {Arrayable}
   */
  get classType() {
    return this.classType;
  }

  /**
   * Detect if the inner list has been initialized.
   
   * @returns {boolean}
   */
  get initialized() {
    return this.initialized;
  }

  /**
   * Retrieve a copy of the innerList used.
   
   * @returns {Array}
   */
  get innerList() {
    return this.innerList;
  }

  /**
   * Retrieve the first Element from the Arrayable
   
   * @returns {ArrayElement}
   */
  get first() {
    return this.innerList[0];
  }

  /**
   * Retrieve the last Element from the Arrayable
   
   * @returns {ArrayElement}
   */
  get last() {
    return this.innerList[this.length - 1];
  }

  /**
   * Return the length of the list.
   
   * @returns {number}
   */
  get length() {
    return this.innerList.length;
  }

  /**
   * Insert a new node (or data) after a node.
   * @method
   * @param {ArrayElement|*} node
   * @param {ArrayElement|*} newNode
   * @returns {Arrayable}
   */
  insertAfter(node, newNode) {
    const insertAt = this.innerList.indexOf(node);
    this.innerList.splice(insertAt + 1, 0, node.classType.make(newNode));
    return this;
  }

  /**
   * Insert a new node (or data) before a node.
   * @method
   * @param {ArrayElement|*} node
   * @param {ArrayElement|*} newNode
   * @returns {Arrayable}
   */
  insertBefore(node, newNode) {
    const insertAt = this.innerList.indexOf(node);
    this.innerList.splice(insertAt, 0, node.classType.make(newNode));
    return this;
  }

  /**
   * Add a node (or data) after the given (or last) node in the list.
   * @method
   * @param {ArrayElement|*} node
   * @param {ArrayElement} after
   * @returns {Arrayable}
   */
  append(node) {
    let after = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.last;
    this.insertAfter(after, node);
    return this;
  }

  /**
   * Add a node (or data) before the given (or first) node in the list.
   * @method
   * @param {ArrayElement|*} node
   * @param {ArrayElement} before
   * @returns {Arrayable}
   */
  prepend(node) {
    let before = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.first;
    this.insertBefore(before, node);
    return this;
  }

  /**
   * Remove an element from this arrayable.
   * @method
   * @param {ArrayElement} node
   * @return {ArrayElement}
   */
  remove(node) {
    const deleteAt = this.innerList.indexOf(node);
    this.innerList.splice(deleteAt, 1);
    return node;
  }

  /**
   * Retrieve a DoubleLinker item from this list by numeric index, otherwise return null.
   * @method
   * @param {number} index
   * @return {ArrayElement|null}
   */
  item(index) {
    if (index >= this.innerList.length) {
      // index is beyond array limit
      return null;
    }
    if (index >= 0) {
      // use the positive index at nth position from the beginning of the array
      return this.innerList[index];
    }
    const calculatedIndex = this.length + index;
    if (calculatedIndex < 0) {
      // negative index is beyond array limit (minus direction)
      return null;
    }
    // Return the item at nth position from the end of the array
    return this.innerList[calculatedIndex];
  }

  /**
   * Run this function for each element in this arrayable.
   * @callback forEachCallback
   * @param {ArrayElement} element
   * @param {number} index
   * @param {Arrayable} thisArg
   * @returns void
   */

  /**
   * Be able to run forEach on this Arrayable to iterate over the elements.
   * @param {forEachCallback} callback
   * @param {Arrayable} thisArg
   * @returns {Arrayable}
   */
  forEach(callback) {
    let thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
    for (let i = 0; i < thisArg.length; ++i) {
      callback(thisArg.item(i), i, thisArg);
    }
    return thisArg;
  }

  /**
   * Be able to iterate over this class.
   * @method
   * @returns {Iterator}
   */
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.innerList.length) {
          return {
            value: this.innerList[index++],
            done: false
          };
        }
        return {
          done: true
        };
      }
    };
  }
}

/**
 * Convert an array to an Arrayable.
 * @methodof Arrayable
 * @param {Array} values
 * @param {ArrayElement} elementClass
 * @param {Arrayable|Iterable} classType
 * @returns {Arrayable}
 */
Arrayable.fromArray = function () {
  let values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  let elementClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _ArrayElement.default;
  let classType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Arrayable;
  const list = new classType(elementClass);
  return list.initialize(elementClass.fromArray(values, elementClass).head);
};
var _default = exports.default = Arrayable;