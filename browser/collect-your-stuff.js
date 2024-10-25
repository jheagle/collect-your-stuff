(function () { function r (e, n, t) { function o (i, f) { if (!n[i]) { if (!e[i]) { var c = typeof require === 'function' && require; if (!f && c) return c(i, !0); if (u) return u(i, !0); var a = new Error("Cannot find module '" + i + "'"); throw a.code = 'MODULE_NOT_FOUND', a } var p = n[i] = { exports: {} }; e[i][0].call(p.exports, function (r) { var n = e[i][1][r]; return o(n || r) }, p, p.exports, r, e, n, t) } return n[i].exports } for (var u = typeof require === 'function' && require, i = 0; i < t.length; i++)o(t[i]); return o } return r })()({
  1: [function (require, module, exports) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports.ArrayElement = void 0
    require('core-js/modules/esnext.async-iterator.reduce.js')
    require('core-js/modules/esnext.iterator.constructor.js')
    require('core-js/modules/esnext.iterator.reduce.js')
    /**
 * Element represents a node in an Arrayable.
 */
    class ArrayElement {
      /**
   * Create the new Element instance, provide the data and optionally configure the type of Element.
   * @param {*} [data=null] The data to be stored in this element.
   */
      constructor () {
        const data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null
        this.classType = ArrayElement
        this.data = null
        this.data = data
      }
    }
    /**
 * Make a new Element from the data given if it is not already a valid Element.
 * @param {ArrayElement|*} element Return a valid ArrayElement instance from given data, or even an already valid one.
 * @param {IsElement} [classType=ArrayElement] Provide the type of IsElement to use.
 * @return {ArrayElement}
 */
    exports.ArrayElement = ArrayElement
    ArrayElement.make = function (element) {
      const classType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ArrayElement
      if (typeof element !== 'object') {
        // It is not an object, so instantiate the Element with element as the data
        return new classType(element)
      }
      if (element.classType) {
        // Already valid Element, return as-is
        return element
      }
      // Create the new node as the configured #classType
      return new classType(element)
    }
    /**
 * Convert an array into Element instances, return the head and tail Elements.
 * @param {Array<IsElement>} [values=[]] Provide an array of data that will be converted to array of elements.
 * @param {IsElement} [classType=ArrayElement] Provide the type of IsElement to use.
 * @returns {{head: ArrayElement[], tail: ArrayElement}}
 */
    ArrayElement.fromArray = function () {
      const values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
      const classType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ArrayElement
      return values.reduce((references, element) => {
        const newElement = classType.make(element, classType)
        if (!references.head.length) {
          // Initialize the head and tail with the new node
          return {
            head: [newElement],
            tail: newElement
          }
        }
        // Only update the tail once head has been set, tail is always the most recent node
        references.head.push(newElement)
        references.tail = newElement
        return references
      }, {
        head: [],
        tail: null
      })
    }
  }, { 'core-js/modules/esnext.async-iterator.reduce.js': 562, 'core-js/modules/esnext.iterator.constructor.js': 563, 'core-js/modules/esnext.iterator.reduce.js': 565 }],
  2: [function (require, module, exports) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports.Arrayable = void 0
    var _ArrayElement = require('./ArrayElement')
    var _ArrayIterator = require('../../recipes/ArrayIterator')
    /**
 * @file arrayable list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */

    /**
 * Arrayable represents a collection stored as an array.
 */
    class Arrayable {
      /**
   * Create the new Arrayable instance, configure the Arrayable class.
   */
      constructor () {
        const elementClass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _ArrayElement.ArrayElement
        this.classType = Arrayable
        this.innerList = []
        this.initialized = false
        this.elementClass = elementClass
      }

      /**
   * Initialize the inner list, should only run once.
   * @param {Array<ArrayElement>} initialList Give the array of elements to start in this Arrayable.
   * @return {Arrayable}
   */
      initialize (initialList) {
        if (this.initialized) {
          console.warn('Attempt to initialize non-empty list.')
          return this
        }
        this.initialized = true
        this.innerList = initialList
        return this
      }

      /**
   * Retrieve a copy of the innerList used.
   * @returns {Array<ArrayElement>}
   */
      get list () {
        return this.innerList
      }

      /**
   * Retrieve the first Element from the Arrayable
   * @returns {ArrayElement}
   */
      get first () {
        return this.innerList[0]
      }

      /**
   * Retrieve the last Element from the Arrayable
   * @returns {ArrayElement}
   */
      get last () {
        return this.innerList[this.length - 1]
      }

      /**
   * Return the length of the list.
   * @returns {number}
   */
      get length () {
        return this.innerList.length
      }

      /**
   * Insert a new node (or data) after a node.
   * @param {ArrayElement|*} node The existing node as reference
   * @param {ArrayElement|*} newNode The new node to go after the existing node
   * @returns {Arrayable}
   */
      insertAfter (node, newNode) {
        const insertAt = this.innerList.indexOf(node)
        this.innerList.splice(insertAt + 1, 0, this.elementClass.make(newNode))
        return this
      }

      /**
   * Insert a new node (or data) before a node.
   * @param {ArrayElement|*} node The existing node as reference
   * @param {ArrayElement|*} newNode The new node to go before the existing node
   * @returns {Arrayable}
   */
      insertBefore (node, newNode) {
        const insertAt = this.innerList.indexOf(node)
        this.innerList.splice(insertAt, 0, this.elementClass.make(newNode))
        return this
      }

      /**
   * Add a node (or data) after the given (or last) node in the list.
   * @param {ArrayElement|*} node The new node to add to the end of the list
   * @param {ArrayElement} after The existing last node
   * @returns {Arrayable}
   */
      append (node) {
        const after = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.last
        return this.insertAfter(after, node)
      }

      /**
   * Add a node (or data) before the given (or first) node in the list.
   * @param {ArrayElement|*} node The new node to add to the start of the list
   * @param {ArrayElement} before The existing first node
   * @returns {Arrayable}
   */
      prepend (node) {
        const before = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.first
        return this.insertBefore(before, node)
      }

      /**
   * Remove an element from this arrayable.
   * @param {ArrayElement} node The node we wish to remove (and it will be returned after removal)
   * @return {ArrayElement}
   */
      remove (node) {
        const deleteAt = this.innerList.indexOf(node)
        this.innerList.splice(deleteAt, 1)
        return node
      }

      /**
   * Retrieve an ArrayElement item from this list by numeric index, otherwise return null.
   * @param {number} index The integer number for retrieving a node by position.
   * @return {ArrayElement|null}
   */
      item (index) {
        if (index >= this.length) {
          // index is beyond array limit
          return null
        }
        if (index >= 0) {
          // use the positive index at nth position from the beginning of the array
          return this.innerList[index]
        }
        const calculatedIndex = this.length + index
        if (calculatedIndex < 0) {
          // negative index is beyond array limit (minus direction)
          return null
        }
        // Return the item at nth position from the end of the array
        return this.innerList[calculatedIndex]
      }

      /**
   * Be able to run forEach on this Arrayable to iterate over the elements.
   * @param {forEachCallback} callback The function to call for-each element
   * @param {Arrayable} thisArg Optional, 'this' reference
   * @returns {Arrayable}
   */
      forEach (callback) {
        const thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this
        for (let i = 0; i < thisArg.length; ++i) {
          callback(thisArg.item(i), i, thisArg)
        }
        return thisArg
      }

      /**
   * Be able to iterate over this class.
   * @returns {Iterator}
   */
      [Symbol.iterator] () {
        const index = 0
        return new _ArrayIterator.ArrayIterator(this.innerList, index)
      }
    }
    /**
 * Convert an array to an Arrayable.
 * @param {Array} values An array of values which will be converted to elements in this arrayable
 * @param {IsElement} [elementClass=ArrayElement] The class to use for each element
 * @param {IsArrayable<ArrayElement>} [classType=Arrayable] Provide the type of IsArrayable to use.
 * @returns {Arrayable}
 */
    exports.Arrayable = Arrayable
    Arrayable.fromArray = function () {
      const values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
      const elementClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _ArrayElement.ArrayElement
      const classType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Arrayable
      const list = new classType(elementClass)
      return list.initialize(elementClass.fromArray(values).head)
    }
  }, { '../../recipes/ArrayIterator': 14, './ArrayElement': 1 }],
  3: [function (require, module, exports) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports.DoubleLinker = void 0
    require('core-js/modules/esnext.async-iterator.reduce.js')
    require('core-js/modules/esnext.iterator.constructor.js')
    require('core-js/modules/esnext.iterator.reduce.js')
    var _Linker = require('../linked-list/Linker')
    /**
 * DoubleLinker represents a node in a DoublyLinkedList which is chained by next and prev.
 * @extends Linker
 */
    class DoubleLinker {
      /**
   * Create the new DoubleLinker instance, provide the data and optionally the next and prev references.
   * @param {Object} [nodeData={}]
   * @param {*} [nodeData.data=null] The data to be stored in this linker
   * @param {DoubleLinker|null} [nodeData.next=null] The reference to the next linker if any
   * @param {DoubleLinker|null} [nodeData.prev=null] The reference to the previous linker if any
   */
      constructor () {
        const {
          data = null,
          next = null,
          prev = null
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
        this.classType = DoubleLinker
        this.data = null
        this.next = null
        this.prev = null
        this.data = data
        this.next = next
        this.prev = prev
      }
    }
    /**
 * Make a new DoubleLinker from the data given if it is not already a valid Linker.
 * @param {DoubleLinker|*} linker Return a valid Linker instance from given data, or even an already valid one.
 * @param {IsDoubleLinker} [classType=DoubleLinker] Provide the type of IsDoubleLinker to use.
 * @return {DoubleLinker}
 */
    exports.DoubleLinker = DoubleLinker
    DoubleLinker.make = function (linker) {
      const classType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DoubleLinker
      return _Linker.Linker.make(linker, classType)
    }
    /**
 * Convert an array into DoubleLinker instances, return the head and tail DoubleLinkers.
 * @param {Array} [values=[]] Provide an array of data that will be converted to a chain of linkers.
 * @param {IsDoubleLinker} [classType=DoubleLinker] Provide the type of IsDoubleLinker to use.
 * @returns {{head: DoubleLinker, tail: DoubleLinker}}
 */
    DoubleLinker.fromArray = function () {
      const values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
      const classType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DoubleLinker
      return values.reduce((references, linker) => {
        const newLinker = classType.make(linker, classType)
        if (references.head === null) {
          // Initialize the head and tail with the new node
          return {
            head: newLinker,
            tail: newLinker
          }
        }
        newLinker.prev = references.tail
        // Only update the tail once head has been set, tail is always the most recent node
        references.tail.next = newLinker
        references.tail = newLinker
        return references
      }, {
        head: null,
        tail: null
      })
    }
  }, { '../linked-list/Linker': 6, 'core-js/modules/esnext.async-iterator.reduce.js': 562, 'core-js/modules/esnext.iterator.constructor.js': 563, 'core-js/modules/esnext.iterator.reduce.js': 565 }],
  4: [function (require, module, exports) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports.DoublyLinkedList = void 0
    var _DoubleLinker = require('./DoubleLinker')
    var _DoubleLinkerIterator = require('../../recipes/DoubleLinkerIterator')
    var _LinkedList = require('../linked-list/LinkedList')
    /**
 * @file doubly linked list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */

    /**
 * DoublyLinkedList represents a collection stored as a LinkedList with prev and next references.
 * @extends LinkedList
 */
    class DoublyLinkedList {
      /**
   * Create the new DoublyLinkedList instance.
   */
      constructor () {
        const linkerClass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _DoubleLinker.DoubleLinker
        this.classType = DoublyLinkedList
        this.innerList = null
        this.initialized = false
        this.linkerClass = linkerClass
      }

      /**
   * Initialize the inner list, should only run once.
   * @param {DoubleLinker} initialList Give the list of double-linkers to start in this doubly linked-list.
   * @return {DoublyLinkedList}
   */
      initialize (initialList) {
        return _LinkedList.LinkedList.prototype.initialize.call(this, initialList)
      }

      /**
   * Retrieve a copy of the innerList used.
   * @returns {DoubleLinker}
   */
      get list () {
        return this.innerList
      }

      /**
   * Retrieve the first DoubleLinker in the list.
   * @returns {DoubleLinker}
   */
      get first () {
        return this.reset()
      }

      /**
   * Retrieve the last DoubleLinker in the list.
   * @returns {DoubleLinker}
   */
      get last () {
        let tail = this.innerList
        if (tail === null) {
          return null
        }
        let next = tail.next
        while (next !== null) {
          tail = next
          next = tail.next
        }
        return tail
      }

      /**
   * Return the length of the list.
   * @returns {number}
   */
      get length () {
        let current = this.first
        let length = 0
        while (current !== null) {
          ++length
          current = current.next
        }
        return length
      }

      /**
   * Insert a new node (or data) after a node.
   * @param {DoubleLinker|*} node The existing node as reference
   * @param {DoubleLinker|*} newNode The new node to go after the existing node
   * @returns {DoublyLinkedList}
   */
      insertAfter (node, newNode) {
        newNode = this.linkerClass.make(newNode)
        if (node !== null) {
          // Ensure the next reference of this node is assigned to the new node
          newNode.next = node.next
          // Ensure this node is assigned as the prev reference of the new node
          newNode.prev = node
          // Then set this node's next reference to the new node
          node.next = newNode
        }
        if (newNode.next) {
          // Update the next reference to ensure circular reference for prev points to the new node
          newNode.next.prev = newNode
        }
        if (!this.length) {
          this.innerList = newNode
        }
        this.reset()
        return this
      }

      /**
   * Insert a new node (or data) before a node.
   * @param {DoubleLinker|*} node The existing node as reference
   * @param {DoubleLinker|*} newNode The new node to go before the existing node
   * @returns {DoublyLinkedList}
   */
      insertBefore (node, newNode) {
        newNode = this.linkerClass.make(newNode)
        if (node !== null) {
          // The new node will reference this prev node as prev
          newNode.prev = node.prev
          // The new node will reference this node as next
          newNode.next = node
          // This prev will reference the new node
          node.prev = newNode
        }
        if (newNode.prev) {
          // Update the prev reference to ensure circular reference for next points to the new node
          newNode.prev.next = newNode
        }
        if (!this.length) {
          this.innerList = newNode
        }
        this.reset()
        return this
      }

      /**
   * Add a node (or data) after the given (or last) node in the list.
   * @param {DoubleLinker|*} node The new node to add to the end of the list
   * @param {DoubleLinker} after The existing last node
   * @returns {DoubleLinker}
   */
      append (node) {
        const after = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.last
        return this.insertAfter(after, node)
      }

      /**
   * Add a node (or data) before the given (or first) node in the list.
   * @param {DoubleLinker|*} node The new node to add to the start of the list
   * @param {DoubleLinker} before The existing first node
   * @returns {DoubleLinker}
   */
      prepend (node) {
        const before = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.first
        return this.insertBefore(before, node)
      }

      /**
   * Remove a linker from this linked list.
   * @param {DoubleLinker} node The node we wish to remove (and it will be returned after removal)
   * @return {DoubleLinker}
   */
      remove (node) {
        if (node === null) {
          return null
        }
        if (node.prev) {
          // The previous node will reference this next node
          node.prev.next = node.next
        }
        if (node.next) {
          // The next node will reference this previous node
          node.next.prev = node.prev
        }
        // Update head reference
        this.reset()
        return node
      }

      /**
   * Refresh all references and return head reference.
   * @return {DoubleLinker}
   */
      reset () {
        // Start at the pointer for the list
        let pointer = this.innerList
        if (pointer === null) {
          return null
        }
        let next = pointer.next
        // Follow references till the end
        while (next !== null) {
          pointer = next
          next = pointer.next
        }
        let prev = pointer.prev
        // From final reference, follow references back to the beginning
        while (prev !== null) {
          pointer = prev
          prev = pointer.prev
        }
        // All the live references should have been found, and we are pointing to the true head
        this.innerList = pointer
        return pointer
      }

      /**
   * Retrieve a DoubleLinker item from this list by numeric index, otherwise return null.
   * @param {number} index The integer number for retrieving a node by position.
   * @returns {DoubleLinker|null}
   */
      item (index) {
        if (index >= 0) {
          // For a positive index, start from the beginning of the list until the current item counter equals our index
          let current = this.first
          let currentIndex = -1
          while (++currentIndex < index && current !== null) {
            current = current.next
          }
          return currentIndex === index ? current : null
        }
        // For a negative index, get the delta of index and length, then go backwards until we reach that delta
        let current = this.last
        let currentIndex = this.length
        const calculatedIndex = this.length + index
        if (calculatedIndex < 0) {
          return null
        }
        while (--currentIndex > calculatedIndex && current !== null) {
          current = current.prev
        }
        return currentIndex === calculatedIndex ? current : null
      }

      /**
   * Be able to run forEach on this DoublyLinkedList to iterate over the DoubleLinker Items.
   * @param {forEachCallback} callback The function to call for-each double linker
   * @param {DoublyLinkedList} thisArg Optional, 'this' reference
   */
      forEach (callback) {
        const thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this
        return _LinkedList.LinkedList.prototype.forEach.call(this, callback, thisArg)
      }

      /**
   * Be able to iterate over this class.
   * @returns {Iterator}
   */
      [Symbol.iterator] () {
        const current = this.first
        return new _DoubleLinkerIterator.DoubleLinkerIterator(current)
      }
    }
    /**
 * Convert an array into a DoublyLinkedList instance, return the new instance.
 * @param {Array} [values=[]] An array of values which will be converted to linkers in this doubly-linked-list
 * @param {IsDoubleLinker} [linkerClass=DoubleLinker] The class to use for each linker
 * @param {IsArrayable<IsDoubleLinker>} [classType=LinkedList] Provide the type of IsArrayable to use.
 * @returns {DoublyLinkedList}
 */
    exports.DoublyLinkedList = DoublyLinkedList
    DoublyLinkedList.fromArray = function () {
      const values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
      const linkerClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _DoubleLinker.DoubleLinker
      const classType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DoublyLinkedList
      return _LinkedList.LinkedList.fromArray(values, linkerClass, classType)
    }
  }, { '../../recipes/DoubleLinkerIterator': 15, '../linked-list/LinkedList': 5, './DoubleLinker': 3 }],
  5: [function (require, module, exports) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports.LinkedList = void 0
    var _Linker = require('./Linker')
    var _LinkerIterator = require('../../recipes/LinkerIterator')
    var _Arrayable = require('../arrayable/Arrayable')
    /**
 * LinkedList represents a collection stored as a LinkedList with next references.
 * @extends Arrayable
 */
    class LinkedList {
      /**
   * Create the new LinkedList instance.
   */
      constructor () {
        const linkerClass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _Linker.Linker
        this.classType = LinkedList
        this.innerList = null
        this.initialized = false
        this.linkerClass = linkerClass
      }

      /**
   * Initialize the inner list, should only run once.
   * @param {Linker|Array} initialList Give the list of linkers to start in this linked-list.
   * @return {LinkedList}
   */
      initialize (initialList) {
        return _Arrayable.Arrayable.prototype.initialize.call(this, initialList)
      }

      /**
   * Retrieve a copy of the innerList used.
   * @returns {Linker}
   */
      get list () {
        return this.innerList
      }

      /**
   * Retrieve the first Linker in the list.
   * @returns {Linker}
   */
      get first () {
        return this.innerList
      }

      /**
   * Retrieve the last Linker in the list.
   * @returns {Linker}
   */
      get last () {
        let tail = this.innerList
        if (tail === null) {
          return null
        }
        let next = tail.next
        while (next !== null) {
          tail = next
          next = tail.next
        }
        return tail
      }

      /**
   * Return the length of the list.
   * @returns {number}
   */
      get length () {
        let current = this.first
        let length = 0
        while (current !== null) {
          ++length
          current = current.next
        }
        return length
      }

      /**
   * Insert a new node (or data) after a node.
   * @param {Linker|*} node The existing node as reference
   * @param {Linker|*} newNode The new node to go after the existing node
   * @returns {LinkedList}
   */
      insertAfter (node, newNode) {
        newNode = this.linkerClass.make(newNode)
        if (node !== null) {
          // Ensure the next reference of this node is assigned to the new node
          newNode.next = node.next
          // Then set this node's next reference to the new node
          node.next = newNode
        }
        if (!this.length) {
          this.innerList = newNode
        }
        return this
      }

      /**
   * Insert a new node (or data) before a node.
   * @param {Linker|*} node The existing node as reference
   * @param {Linker|*} newNode The new node to go before the existing node
   * @returns {LinkedList}
   */
      insertBefore (node, newNode) {
        newNode = this.linkerClass.make(newNode)
        let prevNode = null
        let currentNode = this.first
        while (currentNode !== node) {
          prevNode = currentNode
          currentNode = currentNode.next
        }
        // The new node will reference this node as next
        newNode.next = node
        if (prevNode) {
          // Ensure the next reference of the previous node is assigned to the new node
          prevNode.next = newNode
        }
        if (node === this.first || node === null) {
          this.innerList = newNode
        }
        return this
      }

      /**
   * Add a node (or data) after the given (or last) node in the list.
   * @param {Linker|*} node The new node to add to the end of the list
   * @param {Linker} after The existing last node
   * @returns {Linker}
   */
      append (node) {
        const after = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.last
        return this.insertAfter(after, node)
      }

      /**
   * Add a node (or data) before the given (or first) node in the list.
   * @param {Linker|*} node The new node to add to the start of the list
   * @param {Linker} before The existing first node
   * @returns {Linker}
   */
      prepend (node) {
        const before = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.first
        return this.insertBefore(before, node)
      }

      /**
   * Remove a linker from this linked list.
   * @param {Linker} node The node we wish to remove (and it will be returned after removal)
   * @return {Linker}
   */
      remove (node) {
        let prevNode = null
        let currentNode = this.first
        while (currentNode !== node) {
          prevNode = currentNode
          currentNode = currentNode.next
        }
        if (prevNode) {
          // Ensure the next reference of the previous node skips over the removed node
          prevNode.next = node.next
        }
        if (node === this.first && node !== null) {
          // Update list head to point to next if it was this node
          this.innerList = node.next
        }
        return node
      }

      /**
   * Retrieve a Linker item from this list by numeric index, otherwise return null.
   * @param {number} index The integer number for retrieving a node by position.
   * @returns {Linker|null}
   */
      item (index) {
        if (index >= 0) {
          let current = this.first
          let currentIndex = -1
          while (++currentIndex < index && current !== null) {
            current = current.next
          }
          return currentIndex === index ? current : null
        }
        let current = this.first
        let currentIndex = 0
        const calculatedIndex = this.length + index
        if (calculatedIndex < 0) {
          return null
        }
        while (currentIndex < calculatedIndex && current !== null) {
          current = current.next
          ++currentIndex
        }
        return currentIndex === calculatedIndex ? current : null
      }

      /**
   * Be able to run forEach on this LinkedList to iterate over the linkers.
   * @param {forEachCallback} callback The function to call for-each linker
   * @param {LinkedList} thisArg Optional, 'this' reference
   * @returns {LinkedList}
   */
      forEach (callback) {
        const thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this
        let index = 0
        let current = thisArg.first
        while (current !== null) {
          callback(current, index, thisArg)
          current = current.next
          ++index
        }
        return thisArg
      }

      /**
   * Be able to iterate over this class.
   * @returns {Iterator}
   */
      [Symbol.iterator] () {
        return new _LinkerIterator.LinkerIterator(this.first)
      }
    }
    /**
 * Convert an array to a LinkedList.
 * @param {Array} values An array of values which will be converted to linkers in this linked-list
 * @param {IsLinker} linkerClass The class to use for each linker
 * @param {IsArrayable<Linker>} [classType=LinkedList] Provide the type of IsArrayable to use.
 * @returns {LinkedList}
 */
    exports.LinkedList = LinkedList
    LinkedList.fromArray = function () {
      const values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
      const linkerClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Linker.Linker
      const classType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : LinkedList
      const list = new classType(linkerClass)
      return list.initialize(linkerClass.fromArray(values).head)
    }
  }, { '../../recipes/LinkerIterator': 16, '../arrayable/Arrayable': 2, './Linker': 6 }],
  6: [function (require, module, exports) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports.Linker = void 0
    require('core-js/modules/esnext.async-iterator.reduce.js')
    require('core-js/modules/esnext.iterator.constructor.js')
    require('core-js/modules/esnext.iterator.reduce.js')
    var _ArrayElement = require('../arrayable/ArrayElement')
    /**
 * Linker represents a node in a LinkedList.
 * @extends ArrayElement
 */
    class Linker {
      /**
   * Create the new Linker instance, provide the data and optionally give the next Linker.
   * @param {Object} [nodeData={}]
   * @param {*} [nodeData.data=null] The data to be stored in this linker
   * @param {Linker|null} [nodeData.next=null] The reference to the next linker if any
   */
      constructor () {
        const {
          data = null,
          next = null
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
        this.classType = Linker
        this.data = null
        this.next = null
        this.data = data
        this.next = next
      }
    }
    /**
 * Make a new Linker from the data given if it is not already a valid Linker.
 * @param {Linker|*} linker Return a valid Linker instance from given data, or even an already valid one.
 * @param {IsLinker} [classType=Linker] Provide the type of IsLinker to use.
 * @return {Linker}
 */
    exports.Linker = Linker
    Linker.make = function (linker) {
      const classType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Linker
      if (typeof linker !== 'object') {
        // It is not an object, so instantiate the Linker with element as the data
        return new classType({
          data: linker
        })
      }
      if (linker.classType) {
        // Already valid Linker, return as-is
        return linker
      }
      if (!linker.data) {
        linker = {
          data: linker
        }
      }
      // Create the new node as the configured #classType
      return _ArrayElement.ArrayElement.make(linker, classType)
    }
    /**
 * Convert an array into Linker instances, return the head and tail Linkers.
 * @param {Array} [values=[]] Provide an array of data that will be converted to a chain of linkers.
 * @param {IsLinker} [classType=Linker] Provide the type of IsLinker to use.
 * @returns {{head: Linker, tail: Linker}}
 */
    Linker.fromArray = function (values) {
      const classType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Linker
      return values.reduce((references, linker) => {
        const newLinker = classType.make(linker, classType)
        if (references.head === null) {
          // Initialize the head and tail with the new node
          return {
            head: newLinker,
            tail: newLinker
          }
        }
        // Only update the tail once head has been set, tail is always the most recent node
        references.tail.next = newLinker
        references.tail = newLinker
        return references
      }, {
        head: null,
        tail: null
      })
    }
  }, { '../arrayable/ArrayElement': 1, 'core-js/modules/esnext.async-iterator.reduce.js': 562, 'core-js/modules/esnext.iterator.constructor.js': 563, 'core-js/modules/esnext.iterator.reduce.js': 565 }],
  7: [function (require, module, exports) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports.LinkedTreeList = void 0
    var _TreeLinker = require('./TreeLinker')
    var _TreeLinkerIterator = require('../../recipes/TreeLinkerIterator')
    var _DoublyLinkedList = require('../doubly-linked-list/DoublyLinkedList')
    /**
 * @file doubly linked tree list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */

    /**
 * LinkedTreeList represents a collection stored with a root and spreading in branching (tree) formation.
 * @extends DoublyLinkedList
 */
    class LinkedTreeList {
      /**
   * Create the new LinkedTreeList instance, configure the list class.
   */
      constructor () {
        const linkerClass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _TreeLinker.TreeLinker
        this.classType = LinkedTreeList
        this.innerList = null
        this.initialized = false
        this.linkerClass = linkerClass
      }

      /**
   * Initialize the inner list, should only run once.
   * @param {TreeLinker} initialList Give the list of tree-linkers to start in this linked-tree-list.
   * @return {LinkedTreeList}
   */
      initialize (initialList) {
        if (this.initialized) {
          console.warn('Attempt to initialize LinkedTreeList which is not empty.')
          return this
        }
        this.initialized = true
        this.innerList = initialList
        return this
      }

      /**
   * Retrieve a copy of the innerList used.
   * @returns {TreeLinker}
   */
      get list () {
        return this.innerList
      }

      /**
   * Retrieve the first TreeLinker in the list.
   * @returns {TreeLinker}
   */
      get first () {
        return this.reset()
      }

      /**
   * Retrieve the last TreeLinker in the list.
   * @returns {TreeLinker}
   */
      get last () {
        let tail = this.innerList
        if (tail === null) {
          return null
        }
        let next = tail.next
        while (next !== null) {
          tail = next
          next = tail.next
        }
        return tail
      }

      /**
   * Return the length of the list.
   * @returns {number}
   */
      get length () {
        let current = this.first
        let length = 0
        while (current !== null) {
          ++length
          current = current.next
        }
        return length
      }

      /**
   * Get the parent of this tree list.
   * @return {TreeLinker}
   */
      get parent () {
        const first = this.first
        if (first === null) {
          return null
        }
        return this.first.parent
      }

      /**
   * Set the parent of this tree list
   * @param {TreeLinker} parent The new node to use as the parent for this group of children
   */
      set parent (parent) {
        let current = this.first
        while (current !== null) {
          current.parent = parent
          current = current.next
        }
        if (parent) {
          parent.children = this
        }
      }

      /**
   * Return the root parent of the entire tree.
   * @return {TreeLinker}
   */
      get rootParent () {
        let current = this.first
        if (!current) {
          return null
        }
        let parent = this.first.parent
        while (parent !== null) {
          current = parent
          parent = current.parent
        }
        return current
      }

      /**
   * Set the children on a parent item.
   * @param {TreeLinker} item The TreeLinker node that will be the parent of the children
   * @param {LinkedTreeList} children The LinkedTreeList which has the child nodes to use
   */
      setChildren (item) {
        const children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null
        if (Array.from(this).indexOf(item) < 0) {
          console.error('item is not a child of this')
        }
        children.parent = item
      }

      /**
   * Insert a new node (or data) after a node.
   * @param {TreeLinker|*} node The existing node as reference
   * @param {TreeLinker|*} newNode The new node to go after the existing node
   * @returns {LinkedTreeList}
   */
      insertAfter (node, newNode) {
        return _DoublyLinkedList.DoublyLinkedList.prototype.insertAfter.call(this, node, newNode)
      }

      /**
   * Insert a new node (or data) before a node.
   * @param {TreeLinker|*} node The existing node as reference
   * @param {TreeLinker|*} newNode The new node to go before the existing node
   * @returns {LinkedTreeList}
   */
      insertBefore (node, newNode) {
        return _DoublyLinkedList.DoublyLinkedList.prototype.insertBefore.call(this, node, newNode)
      }

      /**
   * Add a node (or data) after the given (or last) node in the list.
   * @param {TreeLinker|*} node The new node to add to the end of the list
   * @param {TreeLinker} after The existing last node
   * @returns {TreeLinker}
   */
      append (node) {
        const after = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.last
        return _DoublyLinkedList.DoublyLinkedList.prototype.append.call(this, node, after)
      }

      /**
   * Add a node (or data) before the given (or first) node in the list.
   * @param {TreeLinker|*} node The new node to add to the start of the list
   * @param {TreeLinker} before The existing first node
   * @returns {TreeLinker}
   */
      prepend (node) {
        const before = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.first
        return _DoublyLinkedList.DoublyLinkedList.prototype.prepend.call(this, node, before)
      }

      /**
   * Remove a linker from this linked list.
   * @param {TreeLinker} node The node we wish to remove (and it will be returned after removal)
   * @return {TreeLinker}
   */
      remove (node) {
        return _DoublyLinkedList.DoublyLinkedList.prototype.remove.call(this, node)
      }

      /**
   * Refresh all references and return head reference.
   * @return {TreeLinker}
   */
      reset () {
        return _DoublyLinkedList.DoublyLinkedList.prototype.reset.call(this)
      }

      /**
   * Retrieve a TreeLinker item from this list by numeric index, otherwise return null.
   * @param {number} index The integer number for retrieving a node by position.
   * @returns {TreeLinker|null}
   */
      item (index) {
        return _DoublyLinkedList.DoublyLinkedList.prototype.item.call(this, index)
      }

      /**
   * Be able to run forEach on this LinkedTreeList to iterate over the TreeLinker Items.
   * @param {forEachCallback} callback The function to call for-each tree node
   * @param {LinkedTreeList} thisArg Optional, 'this' reference
   */
      forEach (callback) {
        const thisArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this
        let index = 0
        let current = thisArg.first
        while (current !== null) {
          callback(current, index, thisArg)
          current = current.next
          ++index
        }
        return thisArg
      }

      /**
   * Be able to iterate over this class.
   * @returns {Iterator}
   */
      [Symbol.iterator] () {
        const root = this.rootParent
        return new _TreeLinkerIterator.TreeLinkerIterator(root)
      }
    }
    /**
 * Convert an array into a LinkedTreeList instance, return the new instance.
 * @param {Array} [values=[]] An array of values which will be converted to nodes in this tree-list
 * @param {TreeLinker} [linkerClass=TreeLinker] The class to use for each node
 * @param {IsArrayable<TreeLinker>} [classType=LinkedTreeList] Provide the type of IsArrayable to use.
 * @returns {LinkedTreeList}
 */
    exports.LinkedTreeList = LinkedTreeList
    LinkedTreeList.fromArray = function () {
      const values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
      const linkerClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _TreeLinker.TreeLinker
      const classType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : LinkedTreeList
      const list = new classType(linkerClass)
      return list.initialize(linkerClass.fromArray(values).head)
    }
  }, { '../../recipes/TreeLinkerIterator': 18, '../doubly-linked-list/DoublyLinkedList': 4, './TreeLinker': 8 }],
  8: [function (require, module, exports) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports.TreeLinker = void 0
    require('core-js/modules/esnext.async-iterator.map.js')
    require('core-js/modules/esnext.iterator.map.js')
    var _DoubleLinker = require('../doubly-linked-list/DoubleLinker')
    var _LinkedTreeList = require('./LinkedTreeList')
    /**
 * TreeLinker represents a node in a LinkedTreeList having a parent (or root) and child nodes.
 * @extends DoubleLinker
 */
    class TreeLinker {
      /**
   * Create the new TreeLinker instance, provide the data and optionally set references for next, prev, parent, or children.
   * @param {Object} [settings={}]
   * @param {*} [settings.data=null] The data to be stored in this tree node
   * @param {TreeLinker} [settings.next=null] The reference to the next linker if any
   * @param {TreeLinker} [settings.prev=null] The reference to the previous linker if any
   * @param {LinkedTreeList} [settings.children=null] The references to child linkers if any
   * @param {TreeLinker} [settings.parent=null] The reference to a parent linker if any
   * @param {IsArrayable<IsTreeNode>} listClass Give the type of list to use for storing the children
   */
      constructor () {
        const {
          data = null,
          next = null,
          prev = null,
          children = null,
          parent = null,
          listClass = _LinkedTreeList.LinkedTreeList
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
        this.classType = TreeLinker
        this.data = null
        this.next = null
        this.prev = null
        this.parent = null
        this.children = null
        this.data = data
        this.next = next
        this.prev = prev
        this.parent = parent
        this.children = this.childrenFromArray(children, listClass)
      }

      /**
   * Create the children for this tree from an array.
   * @param {Array|null} children Provide an array of data / linker references to be children of this tree node.
   * @param {IsArrayable<IsTreeNode>} listClass Give the type of list to use for storing the children
   * @return {LinkedTreeList|null}
   */
      childrenFromArray () {
        const children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null
        const listClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _LinkedTreeList.LinkedTreeList
        if (children === null) {
          return null
        }
        // Creates a linked-tree-list to store the children.
        return listClass.fromArray(children.map(child => Object.assign({}, child, {
          parent: this
        })), this.classType)
      }
    }
    /**
 * Make a new DoubleLinker from the data given if it is not already a valid Linker.
 * @param {TreeLinker|*} linker Return a valid TreeLinker instance from given data, or even an already valid one.
 * @param {IsTreeNode} [classType=TreeLinker] Provide the type of IsTreeNode to use.
 * @return {TreeLinker}
 */
    exports.TreeLinker = TreeLinker
    TreeLinker.make = function (linker) {
      const classType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TreeLinker
      return _DoubleLinker.DoubleLinker.make(linker, classType)
    }
    /**
 * Convert an array into DoubleLinker instances, return the head and tail DoubleLinkers.
 * @param {Array} [values=[]] Provide an array of data that will be converted to a chain of tree-linkers.
 * @param {IsTreeNode} [classType=TreeLinker] Provide the type of IsTreeNode to use.
 * @returns {{head: TreeLinker, tail: TreeLinker}}
 */
    TreeLinker.fromArray = function () {
      const values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
      const classType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TreeLinker
      return _DoubleLinker.DoubleLinker.fromArray(values, classType)
    }
  }, { '../doubly-linked-list/DoubleLinker': 3, './LinkedTreeList': 7, 'core-js/modules/esnext.async-iterator.map.js': 561, 'core-js/modules/esnext.iterator.map.js': 564 }],
  9: [function (require, module, exports) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports.Queue = void 0
    var _Queueable = require('./Queueable')
    var _LinkedList = require('../linked-list/LinkedList')
    /**
 * @file queue
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */

    /**
 * Maintain a series of queued items.
 */
    class Queue {
      /**
   * Instantiate the queue with the given queue list.
   * @param {Iterable|LinkedList} queuedList Give the list of queueables to start in this queue.
   * @param {IsArrayable} listClass
   * @param {Queueable} queueableClass
   */
      constructor () {
        let queuedList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null
        const listClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _LinkedList.LinkedList
        const queueableClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Queueable.Queueable
        this.listClass = listClass
        this.queueableClass = queueableClass
        if (queuedList === null) {
          queuedList = new listClass(queueableClass)
        }
        this.queuedList = queuedList
      }

      /**
   * Take a queued task from the front of the queue and run it if ready.
   * @return {completeResponse|*}
   */
      dequeue () {
        const next = this.remove()
        if (!next) {
          return {
            success: 'No more queueable tasks in the queue',
            error: false,
            context: this.queuedList
          }
        }
        if (next.complete) {
          // Previously ran queued, run next
          return this.dequeue()
        }
        if (next.running) {
          return {
            success: false,
            error: 'The queue has been blocked by an unfinished task.',
            context: next
          }
        }
        if (!this.empty()) {
          // Place back in queue to be checked once again next time, only if the queue will not be empty
          this.enqueue(next)
        }
        if (next.isReady) {
          return next.run.call(next)
        }
        // We could go check the next in queue here but if we end up in a state where nothing is ready it would infinite loop
        // Also, we want the loop handled externally
        return {
          success: false,
          error: 'Unable to find ready task.',
          context: next
        }
      }

      /**
   * Return true if the queue is empty (there are no tasks in the queue list)
   * @return {boolean}
   */
      empty () {
        return this.size() <= 0
      }

      /**
   * Add a queued task to the end of the queue
   * @param {Queueable} queueable Add a new queueable to the end of the queue
   */
      enqueue (queueable) {
        this.queuedList.append(queueable)
      }

      /**
   * Take a look at the next queued task
   * @return {Queueable}
   */
      peek () {
        return this.queuedList.first
      }

      /**
   * Remove the next queued item and return it.
   * @return {Queueable|null}
   */
      remove () {
        if (this.empty()) {
          return null
        }
        return this.queuedList.remove(this.queuedList.first)
      }

      /**
   * Get the length of the current queue.
   * @return {number}
   */
      size () {
        return this.queuedList.length
      }
    }
    /**
 * Convert an array to a Queue.
 * @param {Array} values An array of values which will be converted to queueables in this queue
 * @param {Queueable} queueableClass The class to use for each queueable
 * @param {Queue|Iterable} listClass The class to use to manage the queueables
 * @returns {Queue}
 */
    exports.Queue = Queue
    Queue.fromArray = function () {
      const values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
      const queueableClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Queueable.Queueable
      const listClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _LinkedList.LinkedList
      const list = new listClass(queueableClass)
      list.initialize(queueableClass.fromArray(values, queueableClass).head)
      return new Queue(list, listClass, queueableClass)
    }
  }, { '../linked-list/LinkedList': 5, './Queueable': 10 }],
  10: [function (require, module, exports) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports.Queueable = void 0
    var _Linker = require('../linked-list/Linker')
    /**
 * Queueable represents a runnable entry in a queue.
 * @extends Linker
 */
    class Queueable {
      /**
   * Create a queueable item that can be used in a queue.
   * @param {Object} [queueableData={}]
   * @param {*} [queueableData.task=null] The data to be stored in this queueable
   * @param {Queueable|null} [queueableData.next=null] The reference to the next queueable if any
   * @param {boolean|Function} [queueableData.ready=false] Indicate if the queueable is ready to run
   */
      constructor () {
        const {
          task = null,
          next = null,
          ready = false
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
        this.data = null
        this.next = null
        this.complete = false
        this.ready = false
        this.running = false
        this.classType = Queueable
        this.data = task
        this.next = next
        this.complete = false
        this.ready = ready
        this.running = false
      }

      /**
   * Check ready state.
   * @return {boolean}
   */
      get isReady () {
        return typeof this.ready === 'function' ? this.ready() : this.ready
      }

      /**
   * Retrieve the data which should be formed as a task.
   * @return {*}
   */
      get task () {
        if (typeof this.data === 'function') {
          return this.data
        }
        return complete => typeof complete === 'function' ? complete({
          context: this.data
        }).context : this.data
      }

      /**
   * Set this queueable as completed.
   * @param {Object} completeResponse
   * @param {*} [completeResponse.success=true] Indicate when the task failed (use false) or give a success message
   * @param {*} [completeResponse.error=false] Indicate a task was error-free (use false) or give an error message
   * @param {*} [completeResponse.context=null] Provide additional data in the response
   * @return {completeResponse}
   */
      markCompleted () {
        const {
          success = true,
          error = false,
          context = null
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
        this.complete = true
        this.running = false
        return {
          success: success,
          error: error,
          context: context
        }
      }

      /**
   * Intend to run the queued task when it is ready. If ready, mark this task as running and run the task.
   * @return {completeResponse}
   */
      run () {
        if (!this.isReady) {
          // Not yet ready, return with errors
          return {
            success: false,
            error: 'Task is not ready',
            context: this.data
          }
        }
        if (this.running) {
          // Already running, return error since we cannot run again
          return {
            success: false,
            error: 'Queued task is already running, possible missing \'complete\' callback',
            context: this.data
          }
        }
        this.running = true
        // Wrap the task in the markCompleted function, so we can set flags and format the response
        return this.task(this.markCompleted.bind(this))
      }
    }
    /**
 * Make a new Queueable from the data given if it is not already a valid Queueable.
 * @param {Queueable|*} queueable Return a valid Queueable instance from given data, or even an already valid one.
 * @param {IsLinker} [classType=Queueable] Provide the type of IsLinker to use.
 * @return {Queueable}
 */
    exports.Queueable = Queueable
    Queueable.make = function (queueable) {
      const classType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Queueable
      if (typeof queueable !== 'object') {
        // It is not an object, so instantiate the Queueable with an element as the data
        return new classType({
          task: queueable,
          ready: true
        })
      }
      if (queueable.classType) {
        // Already valid Queueable, return as-is
        return queueable
      }
      if (!queueable.task) {
        queueable = {
          task: queueable,
          ready: true
        }
      }
      // Create the new node as the configured #classType
      return new classType(queueable)
    }
    /**
 * Convert an array into Queueable instances, return the head and tail Queueables.
 * @param {Array} values Provide an array of data that will be converted to a chain of queueable linkers.
 * @param {IsLinker} [classType=Queueable] Provide the type of IsLinker to use.
 * @returns {{head: Queueable, tail: Queueable}}
 */
    Queueable.fromArray = function (values) {
      const classType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Queueable
      return _Linker.Linker.fromArray(values, classType)
    }
  }, { '../linked-list/Linker': 6 }],
  11: [function (require, module, exports) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports.Stack = void 0
    var _Stackable = require('./Stackable')
    var _LinkedList = require('../linked-list/LinkedList')
    /**
 * @file stack.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */

    /**
 * Store a collection of items which can only be inserted and removed from the top.
 */
    class Stack {
      /**
   * Instantiate the state with the starter stacked list.
   * @param {Iterable|LinkedList} stackedList
   * @param {IsArrayable} listClass
   * @param {Stackable} stackableClass
   */
      constructor () {
        let stackedList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null
        const listClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _LinkedList.LinkedList
        const stackableClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _Stackable.Stackable
        this.listClass = listClass
        this.stackableClass = stackableClass
        if (stackedList === null) {
          stackedList = new listClass(stackableClass)
        }
        this.stackedList = stackedList
      }

      /**
   * Return true if the stack is empty (there are no tasks in the stacked list)
   * @return {boolean}
   */
      empty () {
        return this.size() <= 0
      }

      /**
   * Take a look at the next stacked task
   * @return {Stackable}
   */
      top () {
        return this.stackedList.first
      }

      /**
   * Remove the next stacked task and return it.
   * @return {Stackable|null}
   */
      pop () {
        const next = this.remove()
        if (!next) {
          return {
            success: 'No more stackable tasks in the stack',
            error: false,
            context: this.stackedList
          }
        }
        return next.run()
      }

      /**
   * Push a stackable task to the top of the stack.
   * @param {Stackable|*} stackable Add a new stackable to the top of the stack
   */
      push (stackable) {
        this.stackedList.prepend(stackable)
      }

      /**
   * Remove the next stacked task and return it.
   * @return {Stackable|null}
   */
      remove () {
        if (this.empty()) {
          return null
        }
        return this.stackedList.remove(this.stackedList.first)
      }

      /**
   * Get the size of the current stack.
   * @return {number}
   */
      size () {
        return this.stackedList.length
      }
    }
    /**
 * Convert an array to a Stack.
 * @param {Array} values An array of values which will be converted to stackables in this queue
 * @param {Stackable} stackableClass The class to use for each stackable
 * @param {Stack|Iterable} listClass The class to use to manage the stackables
 * @returns {Stack}
 */
    exports.Stack = Stack
    Stack.fromArray = function () {
      const values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
      const stackableClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Stackable.Stackable
      const listClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _LinkedList.LinkedList
      const list = new listClass(stackableClass)
      list.initialize(stackableClass.fromArray(values, stackableClass).head)
      return new Stack(list)
    }
  }, { '../linked-list/LinkedList': 5, './Stackable': 12 }],
  12: [function (require, module, exports) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports.Stackable = void 0
    var _Linker = require('../linked-list/Linker')
    /**
 * Stackable represents a runnable entry in stack.
 * @extends Linker
 */
    class Stackable {
      /**
   * Create a stackable item that can be used in a stack.
   * @param {Object} [stackData={}]
   * @param {*} [stackData.task=null] The data to be stored in this stackable
   * @param {Stackable|null} [stackData.next=null] The reference to the next stackable if any
   * @param {boolean|Function} [stackData.ready=false] Indicate if the stackable is ready to run
   */
      constructor () {
        const {
          task = null,
          next = null,
          ready = false
        } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
        this.data = null
        this.next = null
        this.classType = Stackable
        this.data = task
        this.next = next
      }

      /**
   * Retrieve the data which should be formed as a task.
   * @return {*}
   */
      get task () {
        if (typeof this.data === 'function') {
          return this.data
        }
        return () => this.data
      }

      /**
   * Run the stacked task.
   * @return {*}
   */
      run () {
        return this.task()
      }
    }
    /**
 * Make a new Stackable from the data given if it is not already a valid Stackable.
 * @param {Stackable|*} stackable Return a valid Stackable instance from given data, or even an already valid one.
 * @param {IsLinker} [classType=Stackable] Provide the type of IsLinker to use.
 * @return {Stackable}
 */
    exports.Stackable = Stackable
    Stackable.make = function (stackable) {
      const classType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Stackable
      if (typeof stackable !== 'object') {
        // It is not an object, so instantiate the Stackable with stackable as the data
        return new classType({
          task: stackable
        })
      }
      if (stackable.classType) {
        // Already valid Stackable, return as-is
        return stackable
      }
      if (!stackable.task) {
        stackable = {
          task: stackable
        }
      }
      // Create the new node as the configured stackableClass
      return new Stackable(stackable)
    }
    /**
 * Convert an array into Stackable instances, return the head and tail Stackables.
 * @param {Array} [values=[]] Provide an array of data that will be converted to a chain of stackable linkers.
 * @param {IsLinker} [classType=Stackable] Provide the type of IsLinker to use.
 * @returns {{head: Stackable, tail: Stackable}}
 */
    Stackable.fromArray = function () {
      const values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
      const classType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Stackable
      return _Linker.Linker.fromArray(values, classType)
    }
  }, { '../linked-list/Linker': 6 }],
  13: [function (require, module, exports) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports.default = void 0
    require('core-js/stable')
    var _Arrayable = require('./collections/arrayable/Arrayable')
    var _DoublyLinkedList = require('./collections/doubly-linked-list/DoublyLinkedList')
    var _LinkedList = require('./collections/linked-list/LinkedList')
    var _LinkedTreeList = require('./collections/linked-tree-list/LinkedTreeList')
    var _Queue = require('./collections/queue/Queue')
    var _Stack = require('./collections/stack/Stack')
    var _recipes = require('./recipes/recipes')
    var _services = require('./services/services')
    /**
 * All of the collections available.
 * @file
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @module collect-your-stuff
 */

    /**
 * TODO:
 * 1. Create binary tree. Use the tree, but it has a limit of only two children per parent, and when adding / removing sort is applied. Add sort function in fromArray
 * 2. Create a heap (both min and max heap variants) which is similar to binary tree in structure, but tree having its min / max value as root. and it must insert on the left-most lowest level, and removes from root. Be able to easily swap nodes to ensure min / max ordering.
 * 3. Create a graph type which can have directional and undirectional variants for linking nodes
 */
    /**
 * All methods exported from this module are encapsulated within collect-your-stuff.
 */
    const collectYourStuff = {
      Arrayable: _Arrayable.Arrayable,
      DoublyLinkedList: _DoublyLinkedList.DoublyLinkedList,
      LinkedList: _LinkedList.LinkedList,
      LinkedTreeList: _LinkedTreeList.LinkedTreeList,
      Queue: _Queue.Queue,
      Stack: _Stack.Stack,
      recipes: _recipes.recipes,
      services: _services.services
    }
    var _default = exports.default = collectYourStuff
    if (void 0) {
      // @ts-ignore
      (void 0).collectYourStuff = collectYourStuff
    } else if (typeof window !== 'undefined') {
      // @ts-ignore
      window.collectYourStuff = collectYourStuff
    }
  }, { './collections/arrayable/Arrayable': 2, './collections/doubly-linked-list/DoublyLinkedList': 4, './collections/linked-list/LinkedList': 5, './collections/linked-tree-list/LinkedTreeList': 7, './collections/queue/Queue': 9, './collections/stack/Stack': 11, './recipes/recipes': 19, './services/services': 22, 'core-js/stable': 592 }],
  14: [function (require, module, exports) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports.ArrayIterator = void 0
    /**
 * Class ArrayIterator returns the next value when using elements of array type list.
 */
    class ArrayIterator {
      constructor (innerList) {
        const index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0
        this.innerList = innerList
        this.index = index
      }

      next (value) {
        if (this.index < this.innerList.length) {
          return {
            value: this.innerList[this.index++],
            done: false
          }
        }
        return {
          value: undefined,
          done: true
        }
      }
    }
    exports.ArrayIterator = ArrayIterator
  }, {}],
  15: [function (require, module, exports) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports.DoubleLinkerIterator = void 0
    /**
 * Class DoubleLinkerIterator returns the next value when using linkers of linked type lists.
 */
    class DoubleLinkerIterator {
      constructor (current) {
        this.current = current
      }

      next (value) {
        const result = {
          value: this.current,
          done: !this.current
        }
        this.current = this.current ? this.current.next : null
        return result
      }
    }
    exports.DoubleLinkerIterator = DoubleLinkerIterator
  }, {}],
  16: [function (require, module, exports) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports.LinkerIterator = void 0
    /**
 * Class LinkerIterator returns the next value when using linkers of linked type lists.
 */
    class LinkerIterator {
      constructor (current) {
        this.current = current
      }

      next (value) {
        const result = {
          value: this.current,
          done: !this.current
        }
        this.current = this.current ? this.current.next : null
        return result
      }
    }
    exports.LinkerIterator = LinkerIterator
  }, {}],
  17: [function (require, module, exports) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports.Runnable = void 0
    /**
 * @file Runnable class recipe.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
    /**
 * Identify a class that can be run.
 */
    class Runnable {
      /**
   * Instantiate a Runnable class.
   * @param {*} data
   */
      constructor () {
        const data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null
        this.data = null
        this.data = data
      }

      /**
   * Retrieve the data which should be formed as a task.
   * @return {Function}
   */
      get task () {
        if (typeof this.data === 'function') {
          return this.data
        }
        return () => this.data
      }

      /**
   * Run the runnable task.
   * @return {*}
   */
      run () {
        return this.task()
      }

      /**
   * Check if a given thing is Runnable
   * @memberof Runnable
   * @param {*} thing
   * @return {boolean}
   */
      static isRunnable (thing) {
        if (typeof thing === 'undefined') {
          // No argument past, this class is runnable
          return this instanceof Runnable
        }
        if (typeof thing !== 'object') {
          // It is not even an object, so cannot be a class instance
          return false
        }
        if (typeof thing.task !== 'function') {
          // It does not have a task getter that returns a function
          return false
        }
        // Finally, it has a runnable 'run' method. This method should return the result of running the task.
        return typeof thing.run === 'function'
      }
    }
    exports.Runnable = Runnable
  }, {}],
  18: [function (require, module, exports) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports.TreeLinkerIterator = void 0
    var _parseTreeNext = require('../services/parseTreeNext')
    /**
 * Class TreeLinkerIterator returns the next value taking a left-first approach down a tree.
 */
    class TreeLinkerIterator {
      constructor (current) {
        this.current = current
      }

      next (value) {
        const result = {
          value: this.current,
          done: !this.current
        }
        this.current = (0, _parseTreeNext.parseTreeNext)(this.current)
        return result
      }
    }
    exports.TreeLinkerIterator = TreeLinkerIterator
  }, { '../services/parseTreeNext': 21 }],
  19: [function (require, module, exports) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports.recipes = void 0
    var _ArrayIterator = require('./ArrayIterator')
    var _Runnable = require('./Runnable')
    /**
 * @file sample classes which follow a pattern (have certain members or methods).
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */

    /**
 * List of class declarations that can be used to specify attributes for a style of object / class.
 */
    const recipes = exports.recipes = {
      ArrayIterator: _ArrayIterator.ArrayIterator,
      Runnable: _Runnable.Runnable
    }
  }, { './ArrayIterator': 14, './Runnable': 17 }],
  20: [function (require, module, exports) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports.parseTree = void 0
    var _parseTreeNext = require('./parseTreeNext')
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
        current = (0, _parseTreeNext.parseTreeNext)(current)
        ++index
      }
      return tree
    }
    exports.parseTree = parseTree
  }, { './parseTreeNext': 21 }],
  21: [function (require, module, exports) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports.parseTreeNext = void 0
    /**
 * Be able to parse over every node in a tree.
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
    const parseTreeNext = treeNode => {
      if (!treeNode) {
        return null
      }
      let test = null
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
        let parentNext = treeNode.parent.next
        let parent = treeNode.parent
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
    exports.parseTreeNext = parseTreeNext
  }, {}],
  22: [function (require, module, exports) {
    'use strict'

    Object.defineProperty(exports, '__esModule', {
      value: true
    })
    exports.services = void 0
    var _parseTree = require('./parseTree')
    var _parseTreeNext = require('./parseTreeNext')
    /**
 * @file some useful resources when working with collections.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */

    /**
 * List helpful functions when dealing with collections.
 */
    const services = exports.services = {
      parseTree: _parseTree.parseTree,
      parseTreeNext: _parseTreeNext.parseTreeNext
    }
  }, { './parseTree': 20, './parseTreeNext': 21 }],
  23: [function (require, module, exports) {
    'use strict'
    var isCallable = require('../internals/is-callable')
    var tryToString = require('../internals/try-to-string')

    var $TypeError = TypeError

    // `Assert: IsCallable(argument) is true`
    module.exports = function (argument) {
      if (isCallable(argument)) return argument
      throw new $TypeError(tryToString(argument) + ' is not a function')
    }
  }, { '../internals/is-callable': 147, '../internals/try-to-string': 271 }],
  24: [function (require, module, exports) {
    'use strict'
    var isConstructor = require('../internals/is-constructor')
    var tryToString = require('../internals/try-to-string')

    var $TypeError = TypeError

    // `Assert: IsConstructor(argument) is true`
    module.exports = function (argument) {
      if (isConstructor(argument)) return argument
      throw new $TypeError(tryToString(argument) + ' is not a constructor')
    }
  }, { '../internals/is-constructor': 148, '../internals/try-to-string': 271 }],
  25: [function (require, module, exports) {
    'use strict'
    var isPossiblePrototype = require('../internals/is-possible-prototype')

    var $String = String
    var $TypeError = TypeError

    module.exports = function (argument) {
      if (isPossiblePrototype(argument)) return argument
      throw new $TypeError("Can't set " + $String(argument) + ' as a prototype')
    }
  }, { '../internals/is-possible-prototype': 154 }],
  26: [function (require, module, exports) {
    'use strict'
    var has = require('../internals/set-helpers').has

    // Perform ? RequireInternalSlot(M, [[SetData]])
    module.exports = function (it) {
      has(it)
      return it
    }
  }, { '../internals/set-helpers': 225 }],
  27: [function (require, module, exports) {
    'use strict'
    var wellKnownSymbol = require('../internals/well-known-symbol')
    var create = require('../internals/object-create')
    var defineProperty = require('../internals/object-define-property').f

    var UNSCOPABLES = wellKnownSymbol('unscopables')
    var ArrayPrototype = Array.prototype

    // Array.prototype[@@unscopables]
    // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
    if (ArrayPrototype[UNSCOPABLES] === undefined) {
      defineProperty(ArrayPrototype, UNSCOPABLES, {
        configurable: true,
        value: create(null)
      })
    }

    // add a key to Array.prototype[@@unscopables]
    module.exports = function (key) {
      ArrayPrototype[UNSCOPABLES][key] = true
    }
  }, { '../internals/object-create': 185, '../internals/object-define-property': 187, '../internals/well-known-symbol': 285 }],
  28: [function (require, module, exports) {
    'use strict'
    var charAt = require('../internals/string-multibyte').charAt

    // `AdvanceStringIndex` abstract operation
    // https://tc39.es/ecma262/#sec-advancestringindex
    module.exports = function (S, index, unicode) {
      return index + (unicode ? charAt(S, index).length : 1)
    }
  }, { '../internals/string-multibyte': 242 }],
  29: [function (require, module, exports) {
    'use strict'
    var isPrototypeOf = require('../internals/object-is-prototype-of')

    var $TypeError = TypeError

    module.exports = function (it, Prototype) {
      if (isPrototypeOf(Prototype, it)) return it
      throw new $TypeError('Incorrect invocation')
    }
  }, { '../internals/object-is-prototype-of': 194 }],
  30: [function (require, module, exports) {
    'use strict'
    var isObject = require('../internals/is-object')

    var $String = String
    var $TypeError = TypeError

    // `Assert: Type(argument) is Object`
    module.exports = function (argument) {
      if (isObject(argument)) return argument
      throw new $TypeError($String(argument) + ' is not an object')
    }
  }, { '../internals/is-object': 153 }],
  31: [function (require, module, exports) {
    'use strict'
    // eslint-disable-next-line es/no-typed-arrays -- safe
    module.exports = typeof ArrayBuffer !== 'undefined' && typeof DataView !== 'undefined'
  }, {}],
  32: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')
    var uncurryThisAccessor = require('../internals/function-uncurry-this-accessor')
    var classof = require('../internals/classof-raw')

    var ArrayBuffer = globalThis.ArrayBuffer
    var TypeError = globalThis.TypeError

    // Includes
    // - Perform ? RequireInternalSlot(O, [[ArrayBufferData]]).
    // - If IsSharedArrayBuffer(O) is true, throw a TypeError exception.
    module.exports = ArrayBuffer && uncurryThisAccessor(ArrayBuffer.prototype, 'byteLength', 'get') || function (O) {
      if (classof(O) !== 'ArrayBuffer') throw new TypeError('ArrayBuffer expected')
      return O.byteLength
    }
  }, { '../internals/classof-raw': 65, '../internals/function-uncurry-this-accessor': 118, '../internals/global-this': 131 }],
  33: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')
    var uncurryThis = require('../internals/function-uncurry-this-clause')
    var arrayBufferByteLength = require('../internals/array-buffer-byte-length')

    var ArrayBuffer = globalThis.ArrayBuffer
    var ArrayBufferPrototype = ArrayBuffer && ArrayBuffer.prototype
    var slice = ArrayBufferPrototype && uncurryThis(ArrayBufferPrototype.slice)

    module.exports = function (O) {
      if (arrayBufferByteLength(O) !== 0) return false
      if (!slice) return false
      try {
        slice(O, 0, 0)
        return false
      } catch (error) {
        return true
      }
    }
  }, { '../internals/array-buffer-byte-length': 32, '../internals/function-uncurry-this-clause': 119, '../internals/global-this': 131 }],
  34: [function (require, module, exports) {
    'use strict'
    // FF26- bug: ArrayBuffers are non-extensible, but Object.isExtensible does not report it
    var fails = require('../internals/fails')

    module.exports = fails(function () {
      if (typeof ArrayBuffer === 'function') {
        var buffer = new ArrayBuffer(8)
        // eslint-disable-next-line es/no-object-isextensible, es/no-object-defineproperty -- safe
        if (Object.isExtensible(buffer)) Object.defineProperty(buffer, 'a', { value: 8 })
      }
    })
  }, { '../internals/fails': 108 }],
  35: [function (require, module, exports) {
    'use strict'
    var isDetached = require('../internals/array-buffer-is-detached')

    var $TypeError = TypeError

    module.exports = function (it) {
      if (isDetached(it)) throw new $TypeError('ArrayBuffer is detached')
      return it
    }
  }, { '../internals/array-buffer-is-detached': 33 }],
  36: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')
    var uncurryThis = require('../internals/function-uncurry-this')
    var uncurryThisAccessor = require('../internals/function-uncurry-this-accessor')
    var toIndex = require('../internals/to-index')
    var notDetached = require('../internals/array-buffer-not-detached')
    var arrayBufferByteLength = require('../internals/array-buffer-byte-length')
    var detachTransferable = require('../internals/detach-transferable')
    var PROPER_STRUCTURED_CLONE_TRANSFER = require('../internals/structured-clone-proper-transfer')

    var structuredClone = globalThis.structuredClone
    var ArrayBuffer = globalThis.ArrayBuffer
    var DataView = globalThis.DataView
    var min = Math.min
    var ArrayBufferPrototype = ArrayBuffer.prototype
    var DataViewPrototype = DataView.prototype
    var slice = uncurryThis(ArrayBufferPrototype.slice)
    var isResizable = uncurryThisAccessor(ArrayBufferPrototype, 'resizable', 'get')
    var maxByteLength = uncurryThisAccessor(ArrayBufferPrototype, 'maxByteLength', 'get')
    var getInt8 = uncurryThis(DataViewPrototype.getInt8)
    var setInt8 = uncurryThis(DataViewPrototype.setInt8)

    module.exports = (PROPER_STRUCTURED_CLONE_TRANSFER || detachTransferable) && function (arrayBuffer, newLength, preserveResizability) {
      var byteLength = arrayBufferByteLength(arrayBuffer)
      var newByteLength = newLength === undefined ? byteLength : toIndex(newLength)
      var fixedLength = !isResizable || !isResizable(arrayBuffer)
      var newBuffer
      notDetached(arrayBuffer)
      if (PROPER_STRUCTURED_CLONE_TRANSFER) {
        arrayBuffer = structuredClone(arrayBuffer, { transfer: [arrayBuffer] })
        if (byteLength === newByteLength && (preserveResizability || fixedLength)) return arrayBuffer
      }
      if (byteLength >= newByteLength && (!preserveResizability || fixedLength)) {
        newBuffer = slice(arrayBuffer, 0, newByteLength)
      } else {
        var options = preserveResizability && !fixedLength && maxByteLength ? { maxByteLength: maxByteLength(arrayBuffer) } : undefined
        newBuffer = new ArrayBuffer(newByteLength, options)
        var a = new DataView(arrayBuffer)
        var b = new DataView(newBuffer)
        var copyLength = min(newByteLength, byteLength)
        for (var i = 0; i < copyLength; i++) setInt8(b, i, getInt8(a, i))
      }
      if (!PROPER_STRUCTURED_CLONE_TRANSFER) detachTransferable(arrayBuffer)
      return newBuffer
    }
  }, { '../internals/array-buffer-byte-length': 32, '../internals/array-buffer-not-detached': 35, '../internals/detach-transferable': 86, '../internals/function-uncurry-this': 120, '../internals/function-uncurry-this-accessor': 118, '../internals/global-this': 131, '../internals/structured-clone-proper-transfer': 251, '../internals/to-index': 259 }],
  37: [function (require, module, exports) {
    'use strict'
    var NATIVE_ARRAY_BUFFER = require('../internals/array-buffer-basic-detection')
    var DESCRIPTORS = require('../internals/descriptors')
    var globalThis = require('../internals/global-this')
    var isCallable = require('../internals/is-callable')
    var isObject = require('../internals/is-object')
    var hasOwn = require('../internals/has-own-property')
    var classof = require('../internals/classof')
    var tryToString = require('../internals/try-to-string')
    var createNonEnumerableProperty = require('../internals/create-non-enumerable-property')
    var defineBuiltIn = require('../internals/define-built-in')
    var defineBuiltInAccessor = require('../internals/define-built-in-accessor')
    var isPrototypeOf = require('../internals/object-is-prototype-of')
    var getPrototypeOf = require('../internals/object-get-prototype-of')
    var setPrototypeOf = require('../internals/object-set-prototype-of')
    var wellKnownSymbol = require('../internals/well-known-symbol')
    var uid = require('../internals/uid')
    var InternalStateModule = require('../internals/internal-state')

    var enforceInternalState = InternalStateModule.enforce
    var getInternalState = InternalStateModule.get
    var Int8Array = globalThis.Int8Array
    var Int8ArrayPrototype = Int8Array && Int8Array.prototype
    var Uint8ClampedArray = globalThis.Uint8ClampedArray
    var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype
    var TypedArray = Int8Array && getPrototypeOf(Int8Array)
    var TypedArrayPrototype = Int8ArrayPrototype && getPrototypeOf(Int8ArrayPrototype)
    var ObjectPrototype = Object.prototype
    var TypeError = globalThis.TypeError

    var TO_STRING_TAG = wellKnownSymbol('toStringTag')
    var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG')
    var TYPED_ARRAY_CONSTRUCTOR = 'TypedArrayConstructor'
    // Fixing native typed arrays in Opera Presto crashes the browser, see #595
    var NATIVE_ARRAY_BUFFER_VIEWS = NATIVE_ARRAY_BUFFER && !!setPrototypeOf && classof(globalThis.opera) !== 'Opera'
    var TYPED_ARRAY_TAG_REQUIRED = false
    var NAME, Constructor, Prototype

    var TypedArrayConstructorsList = {
      Int8Array: 1,
      Uint8Array: 1,
      Uint8ClampedArray: 1,
      Int16Array: 2,
      Uint16Array: 2,
      Int32Array: 4,
      Uint32Array: 4,
      Float32Array: 4,
      Float64Array: 8
    }

    var BigIntArrayConstructorsList = {
      BigInt64Array: 8,
      BigUint64Array: 8
    }

    var isView = function isView (it) {
      if (!isObject(it)) return false
      var klass = classof(it)
      return klass === 'DataView' ||
    hasOwn(TypedArrayConstructorsList, klass) ||
    hasOwn(BigIntArrayConstructorsList, klass)
    }

    var getTypedArrayConstructor = function (it) {
      var proto = getPrototypeOf(it)
      if (!isObject(proto)) return
      var state = getInternalState(proto)
      return (state && hasOwn(state, TYPED_ARRAY_CONSTRUCTOR)) ? state[TYPED_ARRAY_CONSTRUCTOR] : getTypedArrayConstructor(proto)
    }

    var isTypedArray = function (it) {
      if (!isObject(it)) return false
      var klass = classof(it)
      return hasOwn(TypedArrayConstructorsList, klass) ||
    hasOwn(BigIntArrayConstructorsList, klass)
    }

    var aTypedArray = function (it) {
      if (isTypedArray(it)) return it
      throw new TypeError('Target is not a typed array')
    }

    var aTypedArrayConstructor = function (C) {
      if (isCallable(C) && (!setPrototypeOf || isPrototypeOf(TypedArray, C))) return C
      throw new TypeError(tryToString(C) + ' is not a typed array constructor')
    }

    var exportTypedArrayMethod = function (KEY, property, forced, options) {
      if (!DESCRIPTORS) return
      if (forced) {
        for (var ARRAY in TypedArrayConstructorsList) {
          var TypedArrayConstructor = globalThis[ARRAY]
          if (TypedArrayConstructor && hasOwn(TypedArrayConstructor.prototype, KEY)) {
            try {
              delete TypedArrayConstructor.prototype[KEY]
            } catch (error) {
              // old WebKit bug - some methods are non-configurable
              try {
                TypedArrayConstructor.prototype[KEY] = property
              } catch (error2) { /* empty */ }
            }
          }
        }
      }
      if (!TypedArrayPrototype[KEY] || forced) {
        defineBuiltIn(TypedArrayPrototype, KEY, forced ? property
          : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property, options)
      }
    }

    var exportTypedArrayStaticMethod = function (KEY, property, forced) {
      var ARRAY, TypedArrayConstructor
      if (!DESCRIPTORS) return
      if (setPrototypeOf) {
        if (forced) {
          for (ARRAY in TypedArrayConstructorsList) {
            TypedArrayConstructor = globalThis[ARRAY]
            if (TypedArrayConstructor && hasOwn(TypedArrayConstructor, KEY)) {
              try {
                delete TypedArrayConstructor[KEY]
              } catch (error) { /* empty */ }
            }
          }
        }
        if (!TypedArray[KEY] || forced) {
          // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
          try {
            return defineBuiltIn(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && TypedArray[KEY] || property)
          } catch (error) { /* empty */ }
        } else return
      }
      for (ARRAY in TypedArrayConstructorsList) {
        TypedArrayConstructor = globalThis[ARRAY]
        if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
          defineBuiltIn(TypedArrayConstructor, KEY, property)
        }
      }
    }

    for (NAME in TypedArrayConstructorsList) {
      Constructor = globalThis[NAME]
      Prototype = Constructor && Constructor.prototype
      if (Prototype) enforceInternalState(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor
      else NATIVE_ARRAY_BUFFER_VIEWS = false
    }

    for (NAME in BigIntArrayConstructorsList) {
      Constructor = globalThis[NAME]
      Prototype = Constructor && Constructor.prototype
      if (Prototype) enforceInternalState(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor
    }

    // WebKit bug - typed arrays constructors prototype is Object.prototype
    if (!NATIVE_ARRAY_BUFFER_VIEWS || !isCallable(TypedArray) || TypedArray === Function.prototype) {
      // eslint-disable-next-line no-shadow -- safe
      TypedArray = function TypedArray () {
        throw new TypeError('Incorrect invocation')
      }
      if (NATIVE_ARRAY_BUFFER_VIEWS) {
        for (NAME in TypedArrayConstructorsList) {
          if (globalThis[NAME]) setPrototypeOf(globalThis[NAME], TypedArray)
        }
      }
    }

    if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype) {
      TypedArrayPrototype = TypedArray.prototype
      if (NATIVE_ARRAY_BUFFER_VIEWS) {
        for (NAME in TypedArrayConstructorsList) {
          if (globalThis[NAME]) setPrototypeOf(globalThis[NAME].prototype, TypedArrayPrototype)
        }
      }
    }

    // WebKit bug - one more object in Uint8ClampedArray prototype chain
    if (NATIVE_ARRAY_BUFFER_VIEWS && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
      setPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype)
    }

    if (DESCRIPTORS && !hasOwn(TypedArrayPrototype, TO_STRING_TAG)) {
      TYPED_ARRAY_TAG_REQUIRED = true
      defineBuiltInAccessor(TypedArrayPrototype, TO_STRING_TAG, {
        configurable: true,
        get: function () {
          return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined
        }
      })
      for (NAME in TypedArrayConstructorsList) {
        if (globalThis[NAME]) {
          createNonEnumerableProperty(globalThis[NAME], TYPED_ARRAY_TAG, NAME)
        }
      }
    }

    module.exports = {
      NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
      TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG,
      aTypedArray: aTypedArray,
      aTypedArrayConstructor: aTypedArrayConstructor,
      exportTypedArrayMethod: exportTypedArrayMethod,
      exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
      getTypedArrayConstructor: getTypedArrayConstructor,
      isView: isView,
      isTypedArray: isTypedArray,
      TypedArray: TypedArray,
      TypedArrayPrototype: TypedArrayPrototype
    }
  }, { '../internals/array-buffer-basic-detection': 31, '../internals/classof': 66, '../internals/create-non-enumerable-property': 75, '../internals/define-built-in': 81, '../internals/define-built-in-accessor': 80, '../internals/descriptors': 85, '../internals/global-this': 131, '../internals/has-own-property': 132, '../internals/internal-state': 143, '../internals/is-callable': 147, '../internals/is-object': 153, '../internals/object-get-prototype-of': 192, '../internals/object-is-prototype-of': 194, '../internals/object-set-prototype-of': 199, '../internals/try-to-string': 271, '../internals/uid': 277, '../internals/well-known-symbol': 285 }],
  38: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')
    var uncurryThis = require('../internals/function-uncurry-this')
    var DESCRIPTORS = require('../internals/descriptors')
    var NATIVE_ARRAY_BUFFER = require('../internals/array-buffer-basic-detection')
    var FunctionName = require('../internals/function-name')
    var createNonEnumerableProperty = require('../internals/create-non-enumerable-property')
    var defineBuiltInAccessor = require('../internals/define-built-in-accessor')
    var defineBuiltIns = require('../internals/define-built-ins')
    var fails = require('../internals/fails')
    var anInstance = require('../internals/an-instance')
    var toIntegerOrInfinity = require('../internals/to-integer-or-infinity')
    var toLength = require('../internals/to-length')
    var toIndex = require('../internals/to-index')
    var fround = require('../internals/math-fround')
    var IEEE754 = require('../internals/ieee754')
    var getPrototypeOf = require('../internals/object-get-prototype-of')
    var setPrototypeOf = require('../internals/object-set-prototype-of')
    var arrayFill = require('../internals/array-fill')
    var arraySlice = require('../internals/array-slice')
    var inheritIfRequired = require('../internals/inherit-if-required')
    var copyConstructorProperties = require('../internals/copy-constructor-properties')
    var setToStringTag = require('../internals/set-to-string-tag')
    var InternalStateModule = require('../internals/internal-state')

    var PROPER_FUNCTION_NAME = FunctionName.PROPER
    var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE
    var ARRAY_BUFFER = 'ArrayBuffer'
    var DATA_VIEW = 'DataView'
    var PROTOTYPE = 'prototype'
    var WRONG_LENGTH = 'Wrong length'
    var WRONG_INDEX = 'Wrong index'
    var getInternalArrayBufferState = InternalStateModule.getterFor(ARRAY_BUFFER)
    var getInternalDataViewState = InternalStateModule.getterFor(DATA_VIEW)
    var setInternalState = InternalStateModule.set
    var NativeArrayBuffer = globalThis[ARRAY_BUFFER]
    var $ArrayBuffer = NativeArrayBuffer
    var ArrayBufferPrototype = $ArrayBuffer && $ArrayBuffer[PROTOTYPE]
    var $DataView = globalThis[DATA_VIEW]
    var DataViewPrototype = $DataView && $DataView[PROTOTYPE]
    var ObjectPrototype = Object.prototype
    var Array = globalThis.Array
    var RangeError = globalThis.RangeError
    var fill = uncurryThis(arrayFill)
    var reverse = uncurryThis([].reverse)

    var packIEEE754 = IEEE754.pack
    var unpackIEEE754 = IEEE754.unpack

    var packInt8 = function (number) {
      return [number & 0xFF]
    }

    var packInt16 = function (number) {
      return [number & 0xFF, number >> 8 & 0xFF]
    }

    var packInt32 = function (number) {
      return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF]
    }

    var unpackInt32 = function (buffer) {
      return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0]
    }

    var packFloat32 = function (number) {
      return packIEEE754(fround(number), 23, 4)
    }

    var packFloat64 = function (number) {
      return packIEEE754(number, 52, 8)
    }

    var addGetter = function (Constructor, key, getInternalState) {
      defineBuiltInAccessor(Constructor[PROTOTYPE], key, {
        configurable: true,
        get: function () {
          return getInternalState(this)[key]
        }
      })
    }

    var get = function (view, count, index, isLittleEndian) {
      var store = getInternalDataViewState(view)
      var intIndex = toIndex(index)
      var boolIsLittleEndian = !!isLittleEndian
      if (intIndex + count > store.byteLength) throw new RangeError(WRONG_INDEX)
      var bytes = store.bytes
      var start = intIndex + store.byteOffset
      var pack = arraySlice(bytes, start, start + count)
      return boolIsLittleEndian ? pack : reverse(pack)
    }

    var set = function (view, count, index, conversion, value, isLittleEndian) {
      var store = getInternalDataViewState(view)
      var intIndex = toIndex(index)
      var pack = conversion(+value)
      var boolIsLittleEndian = !!isLittleEndian
      if (intIndex + count > store.byteLength) throw new RangeError(WRONG_INDEX)
      var bytes = store.bytes
      var start = intIndex + store.byteOffset
      for (var i = 0; i < count; i++) bytes[start + i] = pack[boolIsLittleEndian ? i : count - i - 1]
    }

    if (!NATIVE_ARRAY_BUFFER) {
      $ArrayBuffer = function ArrayBuffer (length) {
        anInstance(this, ArrayBufferPrototype)
        var byteLength = toIndex(length)
        setInternalState(this, {
          type: ARRAY_BUFFER,
          bytes: fill(Array(byteLength), 0),
          byteLength: byteLength
        })
        if (!DESCRIPTORS) {
          this.byteLength = byteLength
          this.detached = false
        }
      }

      ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE]

      $DataView = function DataView (buffer, byteOffset, byteLength) {
        anInstance(this, DataViewPrototype)
        anInstance(buffer, ArrayBufferPrototype)
        var bufferState = getInternalArrayBufferState(buffer)
        var bufferLength = bufferState.byteLength
        var offset = toIntegerOrInfinity(byteOffset)
        if (offset < 0 || offset > bufferLength) throw new RangeError('Wrong offset')
        byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength)
        if (offset + byteLength > bufferLength) throw new RangeError(WRONG_LENGTH)
        setInternalState(this, {
          type: DATA_VIEW,
          buffer: buffer,
          byteLength: byteLength,
          byteOffset: offset,
          bytes: bufferState.bytes
        })
        if (!DESCRIPTORS) {
          this.buffer = buffer
          this.byteLength = byteLength
          this.byteOffset = offset
        }
      }

      DataViewPrototype = $DataView[PROTOTYPE]

      if (DESCRIPTORS) {
        addGetter($ArrayBuffer, 'byteLength', getInternalArrayBufferState)
        addGetter($DataView, 'buffer', getInternalDataViewState)
        addGetter($DataView, 'byteLength', getInternalDataViewState)
        addGetter($DataView, 'byteOffset', getInternalDataViewState)
      }

      defineBuiltIns(DataViewPrototype, {
        getInt8: function getInt8 (byteOffset) {
          return get(this, 1, byteOffset)[0] << 24 >> 24
        },
        getUint8: function getUint8 (byteOffset) {
          return get(this, 1, byteOffset)[0]
        },
        getInt16: function getInt16 (byteOffset /* , littleEndian */) {
          var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : false)
          return (bytes[1] << 8 | bytes[0]) << 16 >> 16
        },
        getUint16: function getUint16 (byteOffset /* , littleEndian */) {
          var bytes = get(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : false)
          return bytes[1] << 8 | bytes[0]
        },
        getInt32: function getInt32 (byteOffset /* , littleEndian */) {
          return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : false))
        },
        getUint32: function getUint32 (byteOffset /* , littleEndian */) {
          return unpackInt32(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : false)) >>> 0
        },
        getFloat32: function getFloat32 (byteOffset /* , littleEndian */) {
          return unpackIEEE754(get(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : false), 23)
        },
        getFloat64: function getFloat64 (byteOffset /* , littleEndian */) {
          return unpackIEEE754(get(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : false), 52)
        },
        setInt8: function setInt8 (byteOffset, value) {
          set(this, 1, byteOffset, packInt8, value)
        },
        setUint8: function setUint8 (byteOffset, value) {
          set(this, 1, byteOffset, packInt8, value)
        },
        setInt16: function setInt16 (byteOffset, value /* , littleEndian */) {
          set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : false)
        },
        setUint16: function setUint16 (byteOffset, value /* , littleEndian */) {
          set(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : false)
        },
        setInt32: function setInt32 (byteOffset, value /* , littleEndian */) {
          set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : false)
        },
        setUint32: function setUint32 (byteOffset, value /* , littleEndian */) {
          set(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : false)
        },
        setFloat32: function setFloat32 (byteOffset, value /* , littleEndian */) {
          set(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : false)
        },
        setFloat64: function setFloat64 (byteOffset, value /* , littleEndian */) {
          set(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : false)
        }
      })
    } else {
      var INCORRECT_ARRAY_BUFFER_NAME = PROPER_FUNCTION_NAME && NativeArrayBuffer.name !== ARRAY_BUFFER
      /* eslint-disable no-new, sonar/inconsistent-function-call -- required for testing */
      if (!fails(function () {
        NativeArrayBuffer(1)
      }) || !fails(function () {
        new NativeArrayBuffer(-1)
      }) || fails(function () {
        new NativeArrayBuffer()
        new NativeArrayBuffer(1.5)
        new NativeArrayBuffer(NaN)
        return NativeArrayBuffer.length !== 1 || INCORRECT_ARRAY_BUFFER_NAME && !CONFIGURABLE_FUNCTION_NAME
      })) {
        /* eslint-enable no-new, sonar/inconsistent-function-call -- required for testing */
        $ArrayBuffer = function ArrayBuffer (length) {
          anInstance(this, ArrayBufferPrototype)
          return inheritIfRequired(new NativeArrayBuffer(toIndex(length)), this, $ArrayBuffer)
        }

        $ArrayBuffer[PROTOTYPE] = ArrayBufferPrototype

        ArrayBufferPrototype.constructor = $ArrayBuffer

        copyConstructorProperties($ArrayBuffer, NativeArrayBuffer)
      } else if (INCORRECT_ARRAY_BUFFER_NAME && CONFIGURABLE_FUNCTION_NAME) {
        createNonEnumerableProperty(NativeArrayBuffer, 'name', ARRAY_BUFFER)
      }

      // WebKit bug - the same parent prototype for typed arrays and data view
      if (setPrototypeOf && getPrototypeOf(DataViewPrototype) !== ObjectPrototype) {
        setPrototypeOf(DataViewPrototype, ObjectPrototype)
      }

      // iOS Safari 7.x bug
      var testView = new $DataView(new $ArrayBuffer(2))
      var $setInt8 = uncurryThis(DataViewPrototype.setInt8)
      testView.setInt8(0, 2147483648)
      testView.setInt8(1, 2147483649)
      if (testView.getInt8(0) || !testView.getInt8(1)) {
        defineBuiltIns(DataViewPrototype, {
          setInt8: function setInt8 (byteOffset, value) {
            $setInt8(this, byteOffset, value << 24 >> 24)
          },
          setUint8: function setUint8 (byteOffset, value) {
            $setInt8(this, byteOffset, value << 24 >> 24)
          }
        }, { unsafe: true })
      }
    }

    setToStringTag($ArrayBuffer, ARRAY_BUFFER)
    setToStringTag($DataView, DATA_VIEW)

    module.exports = {
      ArrayBuffer: $ArrayBuffer,
      DataView: $DataView
    }
  }, { '../internals/an-instance': 29, '../internals/array-buffer-basic-detection': 31, '../internals/array-fill': 40, '../internals/array-slice': 52, '../internals/copy-constructor-properties': 70, '../internals/create-non-enumerable-property': 75, '../internals/define-built-in-accessor': 80, '../internals/define-built-ins': 82, '../internals/descriptors': 85, '../internals/fails': 108, '../internals/function-name': 117, '../internals/function-uncurry-this': 120, '../internals/global-this': 131, '../internals/ieee754': 137, '../internals/inherit-if-required': 139, '../internals/internal-state': 143, '../internals/math-fround': 172, '../internals/object-get-prototype-of': 192, '../internals/object-set-prototype-of': 199, '../internals/set-to-string-tag': 235, '../internals/to-index': 259, '../internals/to-integer-or-infinity': 261, '../internals/to-length': 262 }],
  39: [function (require, module, exports) {
    'use strict'
    var toObject = require('../internals/to-object')
    var toAbsoluteIndex = require('../internals/to-absolute-index')
    var lengthOfArrayLike = require('../internals/length-of-array-like')
    var deletePropertyOrThrow = require('../internals/delete-property-or-throw')

    var min = Math.min

    // `Array.prototype.copyWithin` method implementation
    // https://tc39.es/ecma262/#sec-array.prototype.copywithin
    // eslint-disable-next-line es/no-array-prototype-copywithin -- safe
    module.exports = [].copyWithin || function copyWithin (target /* = 0 */, start /* = 0, end = @length */) {
      var O = toObject(this)
      var len = lengthOfArrayLike(O)
      var to = toAbsoluteIndex(target, len)
      var from = toAbsoluteIndex(start, len)
      var end = arguments.length > 2 ? arguments[2] : undefined
      var count = min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to)
      var inc = 1
      if (from < to && to < from + count) {
        inc = -1
        from += count - 1
        to += count - 1
      }
      while (count-- > 0) {
        if (from in O) O[to] = O[from]
        else deletePropertyOrThrow(O, to)
        to += inc
        from += inc
      } return O
    }
  }, { '../internals/delete-property-or-throw': 84, '../internals/length-of-array-like': 167, '../internals/to-absolute-index': 257, '../internals/to-object': 263 }],
  40: [function (require, module, exports) {
    'use strict'
    var toObject = require('../internals/to-object')
    var toAbsoluteIndex = require('../internals/to-absolute-index')
    var lengthOfArrayLike = require('../internals/length-of-array-like')

    // `Array.prototype.fill` method implementation
    // https://tc39.es/ecma262/#sec-array.prototype.fill
    module.exports = function fill (value /* , start = 0, end = @length */) {
      var O = toObject(this)
      var length = lengthOfArrayLike(O)
      var argumentsLength = arguments.length
      var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length)
      var end = argumentsLength > 2 ? arguments[2] : undefined
      var endPos = end === undefined ? length : toAbsoluteIndex(end, length)
      while (endPos > index) O[index++] = value
      return O
    }
  }, { '../internals/length-of-array-like': 167, '../internals/to-absolute-index': 257, '../internals/to-object': 263 }],
  41: [function (require, module, exports) {
    'use strict'
    var $forEach = require('../internals/array-iteration').forEach
    var arrayMethodIsStrict = require('../internals/array-method-is-strict')

    var STRICT_METHOD = arrayMethodIsStrict('forEach')

    // `Array.prototype.forEach` method implementation
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    module.exports = !STRICT_METHOD ? function forEach (callbackfn /* , thisArg */) {
      return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined)
      // eslint-disable-next-line es/no-array-prototype-foreach -- safe
    } : [].forEach
  }, { '../internals/array-iteration': 46, '../internals/array-method-is-strict': 49 }],
  42: [function (require, module, exports) {
    'use strict'
    var lengthOfArrayLike = require('../internals/length-of-array-like')

    module.exports = function (Constructor, list, $length) {
      var index = 0
      var length = arguments.length > 2 ? $length : lengthOfArrayLike(list)
      var result = new Constructor(length)
      while (length > index) result[index] = list[index++]
      return result
    }
  }, { '../internals/length-of-array-like': 167 }],
  43: [function (require, module, exports) {
    'use strict'
    var bind = require('../internals/function-bind-context')
    var call = require('../internals/function-call')
    var toObject = require('../internals/to-object')
    var callWithSafeIterationClosing = require('../internals/call-with-safe-iteration-closing')
    var isArrayIteratorMethod = require('../internals/is-array-iterator-method')
    var isConstructor = require('../internals/is-constructor')
    var lengthOfArrayLike = require('../internals/length-of-array-like')
    var createProperty = require('../internals/create-property')
    var getIterator = require('../internals/get-iterator')
    var getIteratorMethod = require('../internals/get-iterator-method')

    var $Array = Array

    // `Array.from` method implementation
    // https://tc39.es/ecma262/#sec-array.from
    module.exports = function from (arrayLike /* , mapfn = undefined, thisArg = undefined */) {
      var O = toObject(arrayLike)
      var IS_CONSTRUCTOR = isConstructor(this)
      var argumentsLength = arguments.length
      var mapfn = argumentsLength > 1 ? arguments[1] : undefined
      var mapping = mapfn !== undefined
      if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined)
      var iteratorMethod = getIteratorMethod(O)
      var index = 0
      var length, result, step, iterator, next, value
      // if the target is not iterable or it's an array with the default iterator - use a simple case
      if (iteratorMethod && !(this === $Array && isArrayIteratorMethod(iteratorMethod))) {
        result = IS_CONSTRUCTOR ? new this() : []
        iterator = getIterator(O, iteratorMethod)
        next = iterator.next
        for (;!(step = call(next, iterator)).done; index++) {
          value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value
          createProperty(result, index, value)
        }
      } else {
        length = lengthOfArrayLike(O)
        result = IS_CONSTRUCTOR ? new this(length) : $Array(length)
        for (;length > index; index++) {
          value = mapping ? mapfn(O[index], index) : O[index]
          createProperty(result, index, value)
        }
      }
      result.length = index
      return result
    }
  }, { '../internals/call-with-safe-iteration-closing': 63, '../internals/create-property': 77, '../internals/function-bind-context': 113, '../internals/function-call': 116, '../internals/get-iterator': 126, '../internals/get-iterator-method': 125, '../internals/is-array-iterator-method': 144, '../internals/is-constructor': 148, '../internals/length-of-array-like': 167, '../internals/to-object': 263 }],
  44: [function (require, module, exports) {
    'use strict'
    var toIndexedObject = require('../internals/to-indexed-object')
    var toAbsoluteIndex = require('../internals/to-absolute-index')
    var lengthOfArrayLike = require('../internals/length-of-array-like')

    // `Array.prototype.{ indexOf, includes }` methods implementation
    var createMethod = function (IS_INCLUDES) {
      return function ($this, el, fromIndex) {
        var O = toIndexedObject($this)
        var length = lengthOfArrayLike(O)
        if (length === 0) return !IS_INCLUDES && -1
        var index = toAbsoluteIndex(fromIndex, length)
        var value
        // Array#includes uses SameValueZero equality algorithm
        // eslint-disable-next-line no-self-compare -- NaN check
        if (IS_INCLUDES && el !== el) {
          while (length > index) {
            value = O[index++]
            // eslint-disable-next-line no-self-compare -- NaN check
            if (value !== value) return true
          // Array#indexOf ignores holes, Array#includes - not
          }
        } else {
          for (;length > index; index++) {
            if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0
          }
        } return !IS_INCLUDES && -1
      }
    }

    module.exports = {
      // `Array.prototype.includes` method
      // https://tc39.es/ecma262/#sec-array.prototype.includes
      includes: createMethod(true),
      // `Array.prototype.indexOf` method
      // https://tc39.es/ecma262/#sec-array.prototype.indexof
      indexOf: createMethod(false)
    }
  }, { '../internals/length-of-array-like': 167, '../internals/to-absolute-index': 257, '../internals/to-indexed-object': 260 }],
  45: [function (require, module, exports) {
    'use strict'
    var bind = require('../internals/function-bind-context')
    var IndexedObject = require('../internals/indexed-object')
    var toObject = require('../internals/to-object')
    var lengthOfArrayLike = require('../internals/length-of-array-like')

    // `Array.prototype.{ findLast, findLastIndex }` methods implementation
    var createMethod = function (TYPE) {
      var IS_FIND_LAST_INDEX = TYPE === 1
      return function ($this, callbackfn, that) {
        var O = toObject($this)
        var self = IndexedObject(O)
        var index = lengthOfArrayLike(self)
        var boundFunction = bind(callbackfn, that)
        var value, result
        while (index-- > 0) {
          value = self[index]
          result = boundFunction(value, index, O)
          if (result) {
            switch (TYPE) {
              case 0: return value // findLast
              case 1: return index // findLastIndex
            }
          }
        }
        return IS_FIND_LAST_INDEX ? -1 : undefined
      }
    }

    module.exports = {
      // `Array.prototype.findLast` method
      // https://github.com/tc39/proposal-array-find-from-last
      findLast: createMethod(0),
      // `Array.prototype.findLastIndex` method
      // https://github.com/tc39/proposal-array-find-from-last
      findLastIndex: createMethod(1)
    }
  }, { '../internals/function-bind-context': 113, '../internals/indexed-object': 138, '../internals/length-of-array-like': 167, '../internals/to-object': 263 }],
  46: [function (require, module, exports) {
    'use strict'
    var bind = require('../internals/function-bind-context')
    var uncurryThis = require('../internals/function-uncurry-this')
    var IndexedObject = require('../internals/indexed-object')
    var toObject = require('../internals/to-object')
    var lengthOfArrayLike = require('../internals/length-of-array-like')
    var arraySpeciesCreate = require('../internals/array-species-create')

    var push = uncurryThis([].push)

    // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterReject }` methods implementation
    var createMethod = function (TYPE) {
      var IS_MAP = TYPE === 1
      var IS_FILTER = TYPE === 2
      var IS_SOME = TYPE === 3
      var IS_EVERY = TYPE === 4
      var IS_FIND_INDEX = TYPE === 6
      var IS_FILTER_REJECT = TYPE === 7
      var NO_HOLES = TYPE === 5 || IS_FIND_INDEX
      return function ($this, callbackfn, that, specificCreate) {
        var O = toObject($this)
        var self = IndexedObject(O)
        var length = lengthOfArrayLike(self)
        var boundFunction = bind(callbackfn, that)
        var index = 0
        var create = specificCreate || arraySpeciesCreate
        var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_REJECT ? create($this, 0) : undefined
        var value, result
        for (;length > index; index++) {
          if (NO_HOLES || index in self) {
            value = self[index]
            result = boundFunction(value, index, O)
            if (TYPE) {
              if (IS_MAP) target[index] = result // map
              else if (result) {
                switch (TYPE) {
                  case 3: return true // some
                  case 5: return value // find
                  case 6: return index // findIndex
                  case 2: push(target, value) // filter
                }
              } else {
                switch (TYPE) {
                  case 4: return false // every
                  case 7: push(target, value) // filterReject
                }
              }
            }
          }
        }
        return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target
      }
    }

    module.exports = {
      // `Array.prototype.forEach` method
      // https://tc39.es/ecma262/#sec-array.prototype.foreach
      forEach: createMethod(0),
      // `Array.prototype.map` method
      // https://tc39.es/ecma262/#sec-array.prototype.map
      map: createMethod(1),
      // `Array.prototype.filter` method
      // https://tc39.es/ecma262/#sec-array.prototype.filter
      filter: createMethod(2),
      // `Array.prototype.some` method
      // https://tc39.es/ecma262/#sec-array.prototype.some
      some: createMethod(3),
      // `Array.prototype.every` method
      // https://tc39.es/ecma262/#sec-array.prototype.every
      every: createMethod(4),
      // `Array.prototype.find` method
      // https://tc39.es/ecma262/#sec-array.prototype.find
      find: createMethod(5),
      // `Array.prototype.findIndex` method
      // https://tc39.es/ecma262/#sec-array.prototype.findIndex
      findIndex: createMethod(6),
      // `Array.prototype.filterReject` method
      // https://github.com/tc39/proposal-array-filtering
      filterReject: createMethod(7)
    }
  }, { '../internals/array-species-create': 55, '../internals/function-bind-context': 113, '../internals/function-uncurry-this': 120, '../internals/indexed-object': 138, '../internals/length-of-array-like': 167, '../internals/to-object': 263 }],
  47: [function (require, module, exports) {
    'use strict'
    /* eslint-disable es/no-array-prototype-lastindexof -- safe */
    var apply = require('../internals/function-apply')
    var toIndexedObject = require('../internals/to-indexed-object')
    var toIntegerOrInfinity = require('../internals/to-integer-or-infinity')
    var lengthOfArrayLike = require('../internals/length-of-array-like')
    var arrayMethodIsStrict = require('../internals/array-method-is-strict')

    var min = Math.min
    var $lastIndexOf = [].lastIndexOf
    var NEGATIVE_ZERO = !!$lastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0
    var STRICT_METHOD = arrayMethodIsStrict('lastIndexOf')
    var FORCED = NEGATIVE_ZERO || !STRICT_METHOD

    // `Array.prototype.lastIndexOf` method implementation
    // https://tc39.es/ecma262/#sec-array.prototype.lastindexof
    module.exports = FORCED ? function lastIndexOf (searchElement /* , fromIndex = @[*-1] */) {
      // convert -0 to +0
      if (NEGATIVE_ZERO) return apply($lastIndexOf, this, arguments) || 0
      var O = toIndexedObject(this)
      var length = lengthOfArrayLike(O)
      if (length === 0) return -1
      var index = length - 1
      if (arguments.length > 1) index = min(index, toIntegerOrInfinity(arguments[1]))
      if (index < 0) index = length + index
      for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0
      return -1
    } : $lastIndexOf
  }, { '../internals/array-method-is-strict': 49, '../internals/function-apply': 112, '../internals/length-of-array-like': 167, '../internals/to-indexed-object': 260, '../internals/to-integer-or-infinity': 261 }],
  48: [function (require, module, exports) {
    'use strict'
    var fails = require('../internals/fails')
    var wellKnownSymbol = require('../internals/well-known-symbol')
    var V8_VERSION = require('../internals/environment-v8-version')

    var SPECIES = wellKnownSymbol('species')

    module.exports = function (METHOD_NAME) {
      // We can't use this feature detection in V8 since it causes
      // deoptimization and serious performance degradation
      // https://github.com/zloirock/core-js/issues/677
      return V8_VERSION >= 51 || !fails(function () {
        var array = []
        var constructor = array.constructor = {}
        constructor[SPECIES] = function () {
          return { foo: 1 }
        }
        return array[METHOD_NAME](Boolean).foo !== 1
      })
    }
  }, { '../internals/environment-v8-version': 100, '../internals/fails': 108, '../internals/well-known-symbol': 285 }],
  49: [function (require, module, exports) {
    'use strict'
    var fails = require('../internals/fails')

    module.exports = function (METHOD_NAME, argument) {
      var method = [][METHOD_NAME]
      return !!method && fails(function () {
        // eslint-disable-next-line no-useless-call -- required for testing
        method.call(null, argument || function () { return 1 }, 1)
      })
    }
  }, { '../internals/fails': 108 }],
  50: [function (require, module, exports) {
    'use strict'
    var aCallable = require('../internals/a-callable')
    var toObject = require('../internals/to-object')
    var IndexedObject = require('../internals/indexed-object')
    var lengthOfArrayLike = require('../internals/length-of-array-like')

    var $TypeError = TypeError

    var REDUCE_EMPTY = 'Reduce of empty array with no initial value'

    // `Array.prototype.{ reduce, reduceRight }` methods implementation
    var createMethod = function (IS_RIGHT) {
      return function (that, callbackfn, argumentsLength, memo) {
        var O = toObject(that)
        var self = IndexedObject(O)
        var length = lengthOfArrayLike(O)
        aCallable(callbackfn)
        if (length === 0 && argumentsLength < 2) throw new $TypeError(REDUCE_EMPTY)
        var index = IS_RIGHT ? length - 1 : 0
        var i = IS_RIGHT ? -1 : 1
        if (argumentsLength < 2) {
          while (true) {
            if (index in self) {
              memo = self[index]
              index += i
              break
            }
            index += i
            if (IS_RIGHT ? index < 0 : length <= index) {
              throw new $TypeError(REDUCE_EMPTY)
            }
          }
        }
        for (;IS_RIGHT ? index >= 0 : length > index; index += i) {
          if (index in self) {
            memo = callbackfn(memo, self[index], index, O)
          }
        }
        return memo
      }
    }

    module.exports = {
      // `Array.prototype.reduce` method
      // https://tc39.es/ecma262/#sec-array.prototype.reduce
      left: createMethod(false),
      // `Array.prototype.reduceRight` method
      // https://tc39.es/ecma262/#sec-array.prototype.reduceright
      right: createMethod(true)
    }
  }, { '../internals/a-callable': 23, '../internals/indexed-object': 138, '../internals/length-of-array-like': 167, '../internals/to-object': 263 }],
  51: [function (require, module, exports) {
    'use strict'
    var DESCRIPTORS = require('../internals/descriptors')
    var isArray = require('../internals/is-array')

    var $TypeError = TypeError
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor

    // Safari < 13 does not throw an error in this case
    var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !(function () {
      // makes no sense without proper strict mode support
      if (this !== undefined) return true
      try {
        // eslint-disable-next-line es/no-object-defineproperty -- safe
        Object.defineProperty([], 'length', { writable: false }).length = 1
      } catch (error) {
        return error instanceof TypeError
      }
    }())

    module.exports = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
      if (isArray(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
        throw new $TypeError('Cannot set read only .length')
      } return O.length = length
    } : function (O, length) {
      return O.length = length
    }
  }, { '../internals/descriptors': 85, '../internals/is-array': 145 }],
  52: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')

    module.exports = uncurryThis([].slice)
  }, { '../internals/function-uncurry-this': 120 }],
  53: [function (require, module, exports) {
    'use strict'
    var arraySlice = require('../internals/array-slice')

    var floor = Math.floor

    var sort = function (array, comparefn) {
      var length = array.length

      if (length < 8) {
        // insertion sort
        var i = 1
        var element, j

        while (i < length) {
          j = i
          element = array[i]
          while (j && comparefn(array[j - 1], element) > 0) {
            array[j] = array[--j]
          }
          if (j !== i++) array[j] = element
        }
      } else {
        // merge sort
        var middle = floor(length / 2)
        var left = sort(arraySlice(array, 0, middle), comparefn)
        var right = sort(arraySlice(array, middle), comparefn)
        var llength = left.length
        var rlength = right.length
        var lindex = 0
        var rindex = 0

        while (lindex < llength || rindex < rlength) {
          array[lindex + rindex] = (lindex < llength && rindex < rlength)
            ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
            : lindex < llength ? left[lindex++] : right[rindex++]
        }
      }

      return array
    }

    module.exports = sort
  }, { '../internals/array-slice': 52 }],
  54: [function (require, module, exports) {
    'use strict'
    var isArray = require('../internals/is-array')
    var isConstructor = require('../internals/is-constructor')
    var isObject = require('../internals/is-object')
    var wellKnownSymbol = require('../internals/well-known-symbol')

    var SPECIES = wellKnownSymbol('species')
    var $Array = Array

    // a part of `ArraySpeciesCreate` abstract operation
    // https://tc39.es/ecma262/#sec-arrayspeciescreate
    module.exports = function (originalArray) {
      var C
      if (isArray(originalArray)) {
        C = originalArray.constructor
        // cross-realm fallback
        if (isConstructor(C) && (C === $Array || isArray(C.prototype))) C = undefined
        else if (isObject(C)) {
          C = C[SPECIES]
          if (C === null) C = undefined
        }
      } return C === undefined ? $Array : C
    }
  }, { '../internals/is-array': 145, '../internals/is-constructor': 148, '../internals/is-object': 153, '../internals/well-known-symbol': 285 }],
  55: [function (require, module, exports) {
    'use strict'
    var arraySpeciesConstructor = require('../internals/array-species-constructor')

    // `ArraySpeciesCreate` abstract operation
    // https://tc39.es/ecma262/#sec-arrayspeciescreate
    module.exports = function (originalArray, length) {
      return new (arraySpeciesConstructor(originalArray))(length === 0 ? 0 : length)
    }
  }, { '../internals/array-species-constructor': 54 }],
  56: [function (require, module, exports) {
    'use strict'
    var lengthOfArrayLike = require('../internals/length-of-array-like')

    // https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.toReversed
    // https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.toReversed
    module.exports = function (O, C) {
      var len = lengthOfArrayLike(O)
      var A = new C(len)
      var k = 0
      for (; k < len; k++) A[k] = O[len - k - 1]
      return A
    }
  }, { '../internals/length-of-array-like': 167 }],
  57: [function (require, module, exports) {
    'use strict'
    var lengthOfArrayLike = require('../internals/length-of-array-like')
    var toIntegerOrInfinity = require('../internals/to-integer-or-infinity')

    var $RangeError = RangeError

    // https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.with
    // https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.with
    module.exports = function (O, C, index, value) {
      var len = lengthOfArrayLike(O)
      var relativeIndex = toIntegerOrInfinity(index)
      var actualIndex = relativeIndex < 0 ? len + relativeIndex : relativeIndex
      if (actualIndex >= len || actualIndex < 0) throw new $RangeError('Incorrect index')
      var A = new C(len)
      var k = 0
      for (; k < len; k++) A[k] = k === actualIndex ? value : O[k]
      return A
    }
  }, { '../internals/length-of-array-like': 167, '../internals/to-integer-or-infinity': 261 }],
  58: [function (require, module, exports) {
    'use strict'
    var call = require('../internals/function-call')
    var getBuiltIn = require('../internals/get-built-in')
    var getMethod = require('../internals/get-method')

    module.exports = function (iterator, method, argument, reject) {
      try {
        var returnMethod = getMethod(iterator, 'return')
        if (returnMethod) {
          return getBuiltIn('Promise').resolve(call(returnMethod, iterator)).then(function () {
            method(argument)
          }, function (error) {
            reject(error)
          })
        }
      } catch (error2) {
        return reject(error2)
      } method(argument)
    }
  }, { '../internals/function-call': 116, '../internals/get-built-in': 123, '../internals/get-method': 128 }],
  59: [function (require, module, exports) {
    'use strict'
    var call = require('../internals/function-call')
    var perform = require('../internals/perform')
    var anObject = require('../internals/an-object')
    var create = require('../internals/object-create')
    var createNonEnumerableProperty = require('../internals/create-non-enumerable-property')
    var defineBuiltIns = require('../internals/define-built-ins')
    var wellKnownSymbol = require('../internals/well-known-symbol')
    var InternalStateModule = require('../internals/internal-state')
    var getBuiltIn = require('../internals/get-built-in')
    var getMethod = require('../internals/get-method')
    var AsyncIteratorPrototype = require('../internals/async-iterator-prototype')
    var createIterResultObject = require('../internals/create-iter-result-object')
    var iteratorClose = require('../internals/iterator-close')

    var Promise = getBuiltIn('Promise')

    var TO_STRING_TAG = wellKnownSymbol('toStringTag')
    var ASYNC_ITERATOR_HELPER = 'AsyncIteratorHelper'
    var WRAP_FOR_VALID_ASYNC_ITERATOR = 'WrapForValidAsyncIterator'
    var setInternalState = InternalStateModule.set

    var createAsyncIteratorProxyPrototype = function (IS_ITERATOR) {
      var IS_GENERATOR = !IS_ITERATOR
      var getInternalState = InternalStateModule.getterFor(IS_ITERATOR ? WRAP_FOR_VALID_ASYNC_ITERATOR : ASYNC_ITERATOR_HELPER)

      var getStateOrEarlyExit = function (that) {
        var stateCompletion = perform(function () {
          return getInternalState(that)
        })

        var stateError = stateCompletion.error
        var state = stateCompletion.value

        if (stateError || (IS_GENERATOR && state.done)) {
          return { exit: true, value: stateError ? Promise.reject(state) : Promise.resolve(createIterResultObject(undefined, true)) }
        } return { exit: false, value: state }
      }

      return defineBuiltIns(create(AsyncIteratorPrototype), {
        next: function next () {
          var stateCompletion = getStateOrEarlyExit(this)
          var state = stateCompletion.value
          if (stateCompletion.exit) return state
          var handlerCompletion = perform(function () {
            return anObject(state.nextHandler(Promise))
          })
          var handlerError = handlerCompletion.error
          var value = handlerCompletion.value
          if (handlerError) state.done = true
          return handlerError ? Promise.reject(value) : Promise.resolve(value)
        },
        return: function () {
          var stateCompletion = getStateOrEarlyExit(this)
          var state = stateCompletion.value
          if (stateCompletion.exit) return state
          state.done = true
          var iterator = state.iterator
          var returnMethod, result
          var completion = perform(function () {
            if (state.inner) {
              try {
                iteratorClose(state.inner.iterator, 'normal')
              } catch (error) {
                return iteratorClose(iterator, 'throw', error)
              }
            }
            return getMethod(iterator, 'return')
          })
          returnMethod = result = completion.value
          if (completion.error) return Promise.reject(result)
          if (returnMethod === undefined) return Promise.resolve(createIterResultObject(undefined, true))
          completion = perform(function () {
            return call(returnMethod, iterator)
          })
          result = completion.value
          if (completion.error) return Promise.reject(result)
          return IS_ITERATOR ? Promise.resolve(result) : Promise.resolve(result).then(function (resolved) {
            anObject(resolved)
            return createIterResultObject(undefined, true)
          })
        }
      })
    }

    var WrapForValidAsyncIteratorPrototype = createAsyncIteratorProxyPrototype(true)
    var AsyncIteratorHelperPrototype = createAsyncIteratorProxyPrototype(false)

    createNonEnumerableProperty(AsyncIteratorHelperPrototype, TO_STRING_TAG, 'Async Iterator Helper')

    module.exports = function (nextHandler, IS_ITERATOR) {
      var AsyncIteratorProxy = function AsyncIterator (record, state) {
        if (state) {
          state.iterator = record.iterator
          state.next = record.next
        } else state = record
        state.type = IS_ITERATOR ? WRAP_FOR_VALID_ASYNC_ITERATOR : ASYNC_ITERATOR_HELPER
        state.nextHandler = nextHandler
        state.counter = 0
        state.done = false
        setInternalState(this, state)
      }

      AsyncIteratorProxy.prototype = IS_ITERATOR ? WrapForValidAsyncIteratorPrototype : AsyncIteratorHelperPrototype

      return AsyncIteratorProxy
    }
  }, { '../internals/an-object': 30, '../internals/async-iterator-prototype': 61, '../internals/create-iter-result-object': 74, '../internals/create-non-enumerable-property': 75, '../internals/define-built-ins': 82, '../internals/function-call': 116, '../internals/get-built-in': 123, '../internals/get-method': 128, '../internals/internal-state': 143, '../internals/iterator-close': 160, '../internals/object-create': 185, '../internals/perform': 205, '../internals/well-known-symbol': 285 }],
  60: [function (require, module, exports) {
    'use strict'
    var call = require('../internals/function-call')
    var aCallable = require('../internals/a-callable')
    var anObject = require('../internals/an-object')
    var isObject = require('../internals/is-object')
    var getIteratorDirect = require('../internals/get-iterator-direct')
    var createAsyncIteratorProxy = require('../internals/async-iterator-create-proxy')
    var createIterResultObject = require('../internals/create-iter-result-object')
    var closeAsyncIteration = require('../internals/async-iterator-close')

    var AsyncIteratorProxy = createAsyncIteratorProxy(function (Promise) {
      var state = this
      var iterator = state.iterator
      var mapper = state.mapper

      return new Promise(function (resolve, reject) {
        var doneAndReject = function (error) {
          state.done = true
          reject(error)
        }

        var ifAbruptCloseAsyncIterator = function (error) {
          closeAsyncIteration(iterator, doneAndReject, error, doneAndReject)
        }

        Promise.resolve(anObject(call(state.next, iterator))).then(function (step) {
          try {
            if (anObject(step).done) {
              state.done = true
              resolve(createIterResultObject(undefined, true))
            } else {
              var value = step.value
              try {
                var result = mapper(value, state.counter++)

                var handler = function (mapped) {
                  resolve(createIterResultObject(mapped, false))
                }

                if (isObject(result)) Promise.resolve(result).then(handler, ifAbruptCloseAsyncIterator)
                else handler(result)
              } catch (error2) { ifAbruptCloseAsyncIterator(error2) }
            }
          } catch (error) { doneAndReject(error) }
        }, doneAndReject)
      })
    })

    // `AsyncIterator.prototype.map` method
    // https://github.com/tc39/proposal-iterator-helpers
    module.exports = function map (mapper) {
      anObject(this)
      aCallable(mapper)
      return new AsyncIteratorProxy(getIteratorDirect(this), {
        mapper: mapper
      })
    }
  }, { '../internals/a-callable': 23, '../internals/an-object': 30, '../internals/async-iterator-close': 58, '../internals/async-iterator-create-proxy': 59, '../internals/create-iter-result-object': 74, '../internals/function-call': 116, '../internals/get-iterator-direct': 124, '../internals/is-object': 153 }],
  61: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')
    var shared = require('../internals/shared-store')
    var isCallable = require('../internals/is-callable')
    var create = require('../internals/object-create')
    var getPrototypeOf = require('../internals/object-get-prototype-of')
    var defineBuiltIn = require('../internals/define-built-in')
    var wellKnownSymbol = require('../internals/well-known-symbol')
    var IS_PURE = require('../internals/is-pure')

    var USE_FUNCTION_CONSTRUCTOR = 'USE_FUNCTION_CONSTRUCTOR'
    var ASYNC_ITERATOR = wellKnownSymbol('asyncIterator')
    var AsyncIterator = globalThis.AsyncIterator
    var PassedAsyncIteratorPrototype = shared.AsyncIteratorPrototype
    var AsyncIteratorPrototype, prototype

    if (PassedAsyncIteratorPrototype) {
      AsyncIteratorPrototype = PassedAsyncIteratorPrototype
    } else if (isCallable(AsyncIterator)) {
      AsyncIteratorPrototype = AsyncIterator.prototype
    } else if (shared[USE_FUNCTION_CONSTRUCTOR] || globalThis[USE_FUNCTION_CONSTRUCTOR]) {
      try {
        // eslint-disable-next-line no-new-func -- we have no alternatives without usage of modern syntax
        prototype = getPrototypeOf(getPrototypeOf(getPrototypeOf(Function('return async function*(){}()')())))
        if (getPrototypeOf(prototype) === Object.prototype) AsyncIteratorPrototype = prototype
      } catch (error) { /* empty */ }
    }

    if (!AsyncIteratorPrototype) AsyncIteratorPrototype = {}
    else if (IS_PURE) AsyncIteratorPrototype = create(AsyncIteratorPrototype)

    if (!isCallable(AsyncIteratorPrototype[ASYNC_ITERATOR])) {
      defineBuiltIn(AsyncIteratorPrototype, ASYNC_ITERATOR, function () {
        return this
      })
    }

    module.exports = AsyncIteratorPrototype
  }, { '../internals/define-built-in': 81, '../internals/global-this': 131, '../internals/is-callable': 147, '../internals/is-pure': 155, '../internals/object-create': 185, '../internals/object-get-prototype-of': 192, '../internals/shared-store': 238, '../internals/well-known-symbol': 285 }],
  62: [function (require, module, exports) {
    'use strict'
    var commonAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var base64Alphabet = commonAlphabet + '+/'
    var base64UrlAlphabet = commonAlphabet + '-_'

    var inverse = function (characters) {
      // TODO: use `Object.create(null)` in `core-js@4`
      var result = {}
      var index = 0
      for (; index < 64; index++) result[characters.charAt(index)] = index
      return result
    }

    module.exports = {
      i2c: base64Alphabet,
      c2i: inverse(base64Alphabet),
      i2cUrl: base64UrlAlphabet,
      c2iUrl: inverse(base64UrlAlphabet)
    }
  }, {}],
  63: [function (require, module, exports) {
    'use strict'
    var anObject = require('../internals/an-object')
    var iteratorClose = require('../internals/iterator-close')

    // call something on iterator step with safe closing on error
    module.exports = function (iterator, fn, value, ENTRIES) {
      try {
        return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value)
      } catch (error) {
        iteratorClose(iterator, 'throw', error)
      }
    }
  }, { '../internals/an-object': 30, '../internals/iterator-close': 160 }],
  64: [function (require, module, exports) {
    'use strict'
    var wellKnownSymbol = require('../internals/well-known-symbol')

    var ITERATOR = wellKnownSymbol('iterator')
    var SAFE_CLOSING = false

    try {
      var called = 0
      var iteratorWithReturn = {
        next: function () {
          return { done: !!called++ }
        },
        return: function () {
          SAFE_CLOSING = true
        }
      }
      iteratorWithReturn[ITERATOR] = function () {
        return this
      }
      // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
      Array.from(iteratorWithReturn, function () { throw 2 })
    } catch (error) { /* empty */ }

    module.exports = function (exec, SKIP_CLOSING) {
      try {
        if (!SKIP_CLOSING && !SAFE_CLOSING) return false
      } catch (error) { return false } // workaround of old WebKit + `eval` bug
      var ITERATION_SUPPORT = false
      try {
        var object = {}
        object[ITERATOR] = function () {
          return {
            next: function () {
              return { done: ITERATION_SUPPORT = true }
            }
          }
        }
        exec(object)
      } catch (error) { /* empty */ }
      return ITERATION_SUPPORT
    }
  }, { '../internals/well-known-symbol': 285 }],
  65: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')

    var toString = uncurryThis({}.toString)
    var stringSlice = uncurryThis(''.slice)

    module.exports = function (it) {
      return stringSlice(toString(it), 8, -1)
    }
  }, { '../internals/function-uncurry-this': 120 }],
  66: [function (require, module, exports) {
    'use strict'
    var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support')
    var isCallable = require('../internals/is-callable')
    var classofRaw = require('../internals/classof-raw')
    var wellKnownSymbol = require('../internals/well-known-symbol')

    var TO_STRING_TAG = wellKnownSymbol('toStringTag')
    var $Object = Object

    // ES3 wrong here
    var CORRECT_ARGUMENTS = classofRaw(function () { return arguments }()) === 'Arguments'

    // fallback for IE11 Script Access Denied error
    var tryGet = function (it, key) {
      try {
        return it[key]
      } catch (error) { /* empty */ }
    }

    // getting tag from ES6+ `Object.prototype.toString`
    module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
      var O, tag, result
      return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
        : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) === 'string' ? tag
        // builtinTag case
          : CORRECT_ARGUMENTS ? classofRaw(O)
          // ES3 arguments fallback
            : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result
    }
  }, { '../internals/classof-raw': 65, '../internals/is-callable': 147, '../internals/to-string-tag-support': 268, '../internals/well-known-symbol': 285 }],
  67: [function (require, module, exports) {
    'use strict'
    var create = require('../internals/object-create')
    var defineBuiltInAccessor = require('../internals/define-built-in-accessor')
    var defineBuiltIns = require('../internals/define-built-ins')
    var bind = require('../internals/function-bind-context')
    var anInstance = require('../internals/an-instance')
    var isNullOrUndefined = require('../internals/is-null-or-undefined')
    var iterate = require('../internals/iterate')
    var defineIterator = require('../internals/iterator-define')
    var createIterResultObject = require('../internals/create-iter-result-object')
    var setSpecies = require('../internals/set-species')
    var DESCRIPTORS = require('../internals/descriptors')
    var fastKey = require('../internals/internal-metadata').fastKey
    var InternalStateModule = require('../internals/internal-state')

    var setInternalState = InternalStateModule.set
    var internalStateGetterFor = InternalStateModule.getterFor

    module.exports = {
      getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
        var Constructor = wrapper(function (that, iterable) {
          anInstance(that, Prototype)
          setInternalState(that, {
            type: CONSTRUCTOR_NAME,
            index: create(null),
            first: null,
            last: null,
            size: 0
          })
          if (!DESCRIPTORS) that.size = 0
          if (!isNullOrUndefined(iterable)) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP })
        })

        var Prototype = Constructor.prototype

        var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME)

        var define = function (that, key, value) {
          var state = getInternalState(that)
          var entry = getEntry(that, key)
          var previous, index
          // change existing entry
          if (entry) {
            entry.value = value
            // create new entry
          } else {
            state.last = entry = {
              index: index = fastKey(key, true),
              key: key,
              value: value,
              previous: previous = state.last,
              next: null,
              removed: false
            }
            if (!state.first) state.first = entry
            if (previous) previous.next = entry
            if (DESCRIPTORS) state.size++
            else that.size++
            // add to index
            if (index !== 'F') state.index[index] = entry
          } return that
        }

        var getEntry = function (that, key) {
          var state = getInternalState(that)
          // fast case
          var index = fastKey(key)
          var entry
          if (index !== 'F') return state.index[index]
          // frozen object case
          for (entry = state.first; entry; entry = entry.next) {
            if (entry.key === key) return entry
          }
        }

        defineBuiltIns(Prototype, {
          // `{ Map, Set }.prototype.clear()` methods
          // https://tc39.es/ecma262/#sec-map.prototype.clear
          // https://tc39.es/ecma262/#sec-set.prototype.clear
          clear: function clear () {
            var that = this
            var state = getInternalState(that)
            var entry = state.first
            while (entry) {
              entry.removed = true
              if (entry.previous) entry.previous = entry.previous.next = null
              entry = entry.next
            }
            state.first = state.last = null
            state.index = create(null)
            if (DESCRIPTORS) state.size = 0
            else that.size = 0
          },
          // `{ Map, Set }.prototype.delete(key)` methods
          // https://tc39.es/ecma262/#sec-map.prototype.delete
          // https://tc39.es/ecma262/#sec-set.prototype.delete
          delete: function (key) {
            var that = this
            var state = getInternalState(that)
            var entry = getEntry(that, key)
            if (entry) {
              var next = entry.next
              var prev = entry.previous
              delete state.index[entry.index]
              entry.removed = true
              if (prev) prev.next = next
              if (next) next.previous = prev
              if (state.first === entry) state.first = next
              if (state.last === entry) state.last = prev
              if (DESCRIPTORS) state.size--
              else that.size--
            } return !!entry
          },
          // `{ Map, Set }.prototype.forEach(callbackfn, thisArg = undefined)` methods
          // https://tc39.es/ecma262/#sec-map.prototype.foreach
          // https://tc39.es/ecma262/#sec-set.prototype.foreach
          forEach: function forEach (callbackfn /* , that = undefined */) {
            var state = getInternalState(this)
            var boundFunction = bind(callbackfn, arguments.length > 1 ? arguments[1] : undefined)
            var entry
            while (entry = entry ? entry.next : state.first) {
              boundFunction(entry.value, entry.key, this)
              // revert to the last existing entry
              while (entry && entry.removed) entry = entry.previous
            }
          },
          // `{ Map, Set}.prototype.has(key)` methods
          // https://tc39.es/ecma262/#sec-map.prototype.has
          // https://tc39.es/ecma262/#sec-set.prototype.has
          has: function has (key) {
            return !!getEntry(this, key)
          }
        })

        defineBuiltIns(Prototype, IS_MAP ? {
          // `Map.prototype.get(key)` method
          // https://tc39.es/ecma262/#sec-map.prototype.get
          get: function get (key) {
            var entry = getEntry(this, key)
            return entry && entry.value
          },
          // `Map.prototype.set(key, value)` method
          // https://tc39.es/ecma262/#sec-map.prototype.set
          set: function set (key, value) {
            return define(this, key === 0 ? 0 : key, value)
          }
        } : {
          // `Set.prototype.add(value)` method
          // https://tc39.es/ecma262/#sec-set.prototype.add
          add: function add (value) {
            return define(this, value = value === 0 ? 0 : value, value)
          }
        })
        if (DESCRIPTORS) {
          defineBuiltInAccessor(Prototype, 'size', {
            configurable: true,
            get: function () {
              return getInternalState(this).size
            }
          })
        }
        return Constructor
      },
      setStrong: function (Constructor, CONSTRUCTOR_NAME, IS_MAP) {
        var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator'
        var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME)
        var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME)
        // `{ Map, Set }.prototype.{ keys, values, entries, @@iterator }()` methods
        // https://tc39.es/ecma262/#sec-map.prototype.entries
        // https://tc39.es/ecma262/#sec-map.prototype.keys
        // https://tc39.es/ecma262/#sec-map.prototype.values
        // https://tc39.es/ecma262/#sec-map.prototype-@@iterator
        // https://tc39.es/ecma262/#sec-set.prototype.entries
        // https://tc39.es/ecma262/#sec-set.prototype.keys
        // https://tc39.es/ecma262/#sec-set.prototype.values
        // https://tc39.es/ecma262/#sec-set.prototype-@@iterator
        defineIterator(Constructor, CONSTRUCTOR_NAME, function (iterated, kind) {
          setInternalState(this, {
            type: ITERATOR_NAME,
            target: iterated,
            state: getInternalCollectionState(iterated),
            kind: kind,
            last: null
          })
        }, function () {
          var state = getInternalIteratorState(this)
          var kind = state.kind
          var entry = state.last
          // revert to the last existing entry
          while (entry && entry.removed) entry = entry.previous
          // get next entry
          if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
            // or finish the iteration
            state.target = null
            return createIterResultObject(undefined, true)
          }
          // return step by kind
          if (kind === 'keys') return createIterResultObject(entry.key, false)
          if (kind === 'values') return createIterResultObject(entry.value, false)
          return createIterResultObject([entry.key, entry.value], false)
        }, IS_MAP ? 'entries' : 'values', !IS_MAP, true)

        // `{ Map, Set }.prototype[@@species]` accessors
        // https://tc39.es/ecma262/#sec-get-map-@@species
        // https://tc39.es/ecma262/#sec-get-set-@@species
        setSpecies(CONSTRUCTOR_NAME)
      }
    }
  }, { '../internals/an-instance': 29, '../internals/create-iter-result-object': 74, '../internals/define-built-in-accessor': 80, '../internals/define-built-ins': 82, '../internals/descriptors': 85, '../internals/function-bind-context': 113, '../internals/internal-metadata': 142, '../internals/internal-state': 143, '../internals/is-null-or-undefined': 152, '../internals/iterate': 159, '../internals/iterator-define': 163, '../internals/object-create': 185, '../internals/set-species': 233 }],
  68: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')
    var defineBuiltIns = require('../internals/define-built-ins')
    var getWeakData = require('../internals/internal-metadata').getWeakData
    var anInstance = require('../internals/an-instance')
    var anObject = require('../internals/an-object')
    var isNullOrUndefined = require('../internals/is-null-or-undefined')
    var isObject = require('../internals/is-object')
    var iterate = require('../internals/iterate')
    var ArrayIterationModule = require('../internals/array-iteration')
    var hasOwn = require('../internals/has-own-property')
    var InternalStateModule = require('../internals/internal-state')

    var setInternalState = InternalStateModule.set
    var internalStateGetterFor = InternalStateModule.getterFor
    var find = ArrayIterationModule.find
    var findIndex = ArrayIterationModule.findIndex
    var splice = uncurryThis([].splice)
    var id = 0

    // fallback for uncaught frozen keys
    var uncaughtFrozenStore = function (state) {
      return state.frozen || (state.frozen = new UncaughtFrozenStore())
    }

    var UncaughtFrozenStore = function () {
      this.entries = []
    }

    var findUncaughtFrozen = function (store, key) {
      return find(store.entries, function (it) {
        return it[0] === key
      })
    }

    UncaughtFrozenStore.prototype = {
      get: function (key) {
        var entry = findUncaughtFrozen(this, key)
        if (entry) return entry[1]
      },
      has: function (key) {
        return !!findUncaughtFrozen(this, key)
      },
      set: function (key, value) {
        var entry = findUncaughtFrozen(this, key)
        if (entry) entry[1] = value
        else this.entries.push([key, value])
      },
      delete: function (key) {
        var index = findIndex(this.entries, function (it) {
          return it[0] === key
        })
        if (~index) splice(this.entries, index, 1)
        return !!~index
      }
    }

    module.exports = {
      getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
        var Constructor = wrapper(function (that, iterable) {
          anInstance(that, Prototype)
          setInternalState(that, {
            type: CONSTRUCTOR_NAME,
            id: id++,
            frozen: null
          })
          if (!isNullOrUndefined(iterable)) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP })
        })

        var Prototype = Constructor.prototype

        var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME)

        var define = function (that, key, value) {
          var state = getInternalState(that)
          var data = getWeakData(anObject(key), true)
          if (data === true) uncaughtFrozenStore(state).set(key, value)
          else data[state.id] = value
          return that
        }

        defineBuiltIns(Prototype, {
          // `{ WeakMap, WeakSet }.prototype.delete(key)` methods
          // https://tc39.es/ecma262/#sec-weakmap.prototype.delete
          // https://tc39.es/ecma262/#sec-weakset.prototype.delete
          delete: function (key) {
            var state = getInternalState(this)
            if (!isObject(key)) return false
            var data = getWeakData(key)
            if (data === true) return uncaughtFrozenStore(state).delete(key)
            return data && hasOwn(data, state.id) && delete data[state.id]
          },
          // `{ WeakMap, WeakSet }.prototype.has(key)` methods
          // https://tc39.es/ecma262/#sec-weakmap.prototype.has
          // https://tc39.es/ecma262/#sec-weakset.prototype.has
          has: function has (key) {
            var state = getInternalState(this)
            if (!isObject(key)) return false
            var data = getWeakData(key)
            if (data === true) return uncaughtFrozenStore(state).has(key)
            return data && hasOwn(data, state.id)
          }
        })

        defineBuiltIns(Prototype, IS_MAP ? {
          // `WeakMap.prototype.get(key)` method
          // https://tc39.es/ecma262/#sec-weakmap.prototype.get
          get: function get (key) {
            var state = getInternalState(this)
            if (isObject(key)) {
              var data = getWeakData(key)
              if (data === true) return uncaughtFrozenStore(state).get(key)
              if (data) return data[state.id]
            }
          },
          // `WeakMap.prototype.set(key, value)` method
          // https://tc39.es/ecma262/#sec-weakmap.prototype.set
          set: function set (key, value) {
            return define(this, key, value)
          }
        } : {
          // `WeakSet.prototype.add(value)` method
          // https://tc39.es/ecma262/#sec-weakset.prototype.add
          add: function add (value) {
            return define(this, value, true)
          }
        })

        return Constructor
      }
    }
  }, { '../internals/an-instance': 29, '../internals/an-object': 30, '../internals/array-iteration': 46, '../internals/define-built-ins': 82, '../internals/function-uncurry-this': 120, '../internals/has-own-property': 132, '../internals/internal-metadata': 142, '../internals/internal-state': 143, '../internals/is-null-or-undefined': 152, '../internals/is-object': 153, '../internals/iterate': 159 }],
  69: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var globalThis = require('../internals/global-this')
    var uncurryThis = require('../internals/function-uncurry-this')
    var isForced = require('../internals/is-forced')
    var defineBuiltIn = require('../internals/define-built-in')
    var InternalMetadataModule = require('../internals/internal-metadata')
    var iterate = require('../internals/iterate')
    var anInstance = require('../internals/an-instance')
    var isCallable = require('../internals/is-callable')
    var isNullOrUndefined = require('../internals/is-null-or-undefined')
    var isObject = require('../internals/is-object')
    var fails = require('../internals/fails')
    var checkCorrectnessOfIteration = require('../internals/check-correctness-of-iteration')
    var setToStringTag = require('../internals/set-to-string-tag')
    var inheritIfRequired = require('../internals/inherit-if-required')

    module.exports = function (CONSTRUCTOR_NAME, wrapper, common) {
      var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1
      var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1
      var ADDER = IS_MAP ? 'set' : 'add'
      var NativeConstructor = globalThis[CONSTRUCTOR_NAME]
      var NativePrototype = NativeConstructor && NativeConstructor.prototype
      var Constructor = NativeConstructor
      var exported = {}

      var fixMethod = function (KEY) {
        var uncurriedNativeMethod = uncurryThis(NativePrototype[KEY])
        defineBuiltIn(NativePrototype, KEY,
          KEY === 'add' ? function add (value) {
            uncurriedNativeMethod(this, value === 0 ? 0 : value)
            return this
          } : KEY === 'delete' ? function (key) {
            return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key)
          } : KEY === 'get' ? function get (key) {
            return IS_WEAK && !isObject(key) ? undefined : uncurriedNativeMethod(this, key === 0 ? 0 : key)
          } : KEY === 'has' ? function has (key) {
            return IS_WEAK && !isObject(key) ? false : uncurriedNativeMethod(this, key === 0 ? 0 : key)
          } : function set (key, value) {
            uncurriedNativeMethod(this, key === 0 ? 0 : key, value)
            return this
          }
        )
      }

      var REPLACE = isForced(
        CONSTRUCTOR_NAME,
        !isCallable(NativeConstructor) || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
          new NativeConstructor().entries().next()
        }))
      )

      if (REPLACE) {
        // create collection constructor
        Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER)
        InternalMetadataModule.enable()
      } else if (isForced(CONSTRUCTOR_NAME, true)) {
        var instance = new Constructor()
        // early implementations not supports chaining
        var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) !== instance
        // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
        var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1) })
        // most early implementations doesn't supports iterables, most modern - not close it correctly
        // eslint-disable-next-line no-new -- required for testing
        var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable) })
        // for early implementations -0 and +0 not the same
        var BUGGY_ZERO = !IS_WEAK && fails(function () {
          // V8 ~ Chromium 42- fails only with 5+ elements
          var $instance = new NativeConstructor()
          var index = 5
          while (index--) $instance[ADDER](index, index)
          return !$instance.has(-0)
        })

        if (!ACCEPT_ITERABLES) {
          Constructor = wrapper(function (dummy, iterable) {
            anInstance(dummy, NativePrototype)
            var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor)
            if (!isNullOrUndefined(iterable)) iterate(iterable, that[ADDER], { that: that, AS_ENTRIES: IS_MAP })
            return that
          })
          Constructor.prototype = NativePrototype
          NativePrototype.constructor = Constructor
        }

        if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
          fixMethod('delete')
          fixMethod('has')
          IS_MAP && fixMethod('get')
        }

        if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER)

        // weak collections should not contains .clear method
        if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear
      }

      exported[CONSTRUCTOR_NAME] = Constructor
      $({ global: true, constructor: true, forced: Constructor !== NativeConstructor }, exported)

      setToStringTag(Constructor, CONSTRUCTOR_NAME)

      if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP)

      return Constructor
    }
  }, { '../internals/an-instance': 29, '../internals/check-correctness-of-iteration': 64, '../internals/define-built-in': 81, '../internals/export': 107, '../internals/fails': 108, '../internals/function-uncurry-this': 120, '../internals/global-this': 131, '../internals/inherit-if-required': 139, '../internals/internal-metadata': 142, '../internals/is-callable': 147, '../internals/is-forced': 150, '../internals/is-null-or-undefined': 152, '../internals/is-object': 153, '../internals/iterate': 159, '../internals/set-to-string-tag': 235 }],
  70: [function (require, module, exports) {
    'use strict'
    var hasOwn = require('../internals/has-own-property')
    var ownKeys = require('../internals/own-keys')
    var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor')
    var definePropertyModule = require('../internals/object-define-property')

    module.exports = function (target, source, exceptions) {
      var keys = ownKeys(source)
      var defineProperty = definePropertyModule.f
      var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i]
        if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
          defineProperty(target, key, getOwnPropertyDescriptor(source, key))
        }
      }
    }
  }, { '../internals/has-own-property': 132, '../internals/object-define-property': 187, '../internals/object-get-own-property-descriptor': 188, '../internals/own-keys': 203 }],
  71: [function (require, module, exports) {
    'use strict'
    var wellKnownSymbol = require('../internals/well-known-symbol')

    var MATCH = wellKnownSymbol('match')

    module.exports = function (METHOD_NAME) {
      var regexp = /./
      try {
        '/./'[METHOD_NAME](regexp)
      } catch (error1) {
        try {
          regexp[MATCH] = false
          return '/./'[METHOD_NAME](regexp)
        } catch (error2) { /* empty */ }
      } return false
    }
  }, { '../internals/well-known-symbol': 285 }],
  72: [function (require, module, exports) {
    'use strict'
    var fails = require('../internals/fails')

    module.exports = !fails(function () {
      function F () { /* empty */ }
      F.prototype.constructor = null
      // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
      return Object.getPrototypeOf(new F()) !== F.prototype
    })
  }, { '../internals/fails': 108 }],
  73: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')
    var requireObjectCoercible = require('../internals/require-object-coercible')
    var toString = require('../internals/to-string')

    var quot = /"/g
    var replace = uncurryThis(''.replace)

    // `CreateHTML` abstract operation
    // https://tc39.es/ecma262/#sec-createhtml
    module.exports = function (string, tag, attribute, value) {
      var S = toString(requireObjectCoercible(string))
      var p1 = '<' + tag
      if (attribute !== '') p1 += ' ' + attribute + '="' + replace(toString(value), quot, '&quot;') + '"'
      return p1 + '>' + S + '</' + tag + '>'
    }
  }, { '../internals/function-uncurry-this': 120, '../internals/require-object-coercible': 219, '../internals/to-string': 269 }],
  74: [function (require, module, exports) {
    'use strict'
    // `CreateIterResultObject` abstract operation
    // https://tc39.es/ecma262/#sec-createiterresultobject
    module.exports = function (value, done) {
      return { value: value, done: done }
    }
  }, {}],
  75: [function (require, module, exports) {
    'use strict'
    var DESCRIPTORS = require('../internals/descriptors')
    var definePropertyModule = require('../internals/object-define-property')
    var createPropertyDescriptor = require('../internals/create-property-descriptor')

    module.exports = DESCRIPTORS ? function (object, key, value) {
      return definePropertyModule.f(object, key, createPropertyDescriptor(1, value))
    } : function (object, key, value) {
      object[key] = value
      return object
    }
  }, { '../internals/create-property-descriptor': 76, '../internals/descriptors': 85, '../internals/object-define-property': 187 }],
  76: [function (require, module, exports) {
    'use strict'
    module.exports = function (bitmap, value) {
      return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value: value
      }
    }
  }, {}],
  77: [function (require, module, exports) {
    'use strict'
    var DESCRIPTORS = require('../internals/descriptors')
    var definePropertyModule = require('../internals/object-define-property')
    var createPropertyDescriptor = require('../internals/create-property-descriptor')

    module.exports = function (object, key, value) {
      if (DESCRIPTORS) definePropertyModule.f(object, key, createPropertyDescriptor(0, value))
      else object[key] = value
    }
  }, { '../internals/create-property-descriptor': 76, '../internals/descriptors': 85, '../internals/object-define-property': 187 }],
  78: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')
    var fails = require('../internals/fails')
    var padStart = require('../internals/string-pad').start

    var $RangeError = RangeError
    var $isFinite = isFinite
    var abs = Math.abs
    var DatePrototype = Date.prototype
    var nativeDateToISOString = DatePrototype.toISOString
    var thisTimeValue = uncurryThis(DatePrototype.getTime)
    var getUTCDate = uncurryThis(DatePrototype.getUTCDate)
    var getUTCFullYear = uncurryThis(DatePrototype.getUTCFullYear)
    var getUTCHours = uncurryThis(DatePrototype.getUTCHours)
    var getUTCMilliseconds = uncurryThis(DatePrototype.getUTCMilliseconds)
    var getUTCMinutes = uncurryThis(DatePrototype.getUTCMinutes)
    var getUTCMonth = uncurryThis(DatePrototype.getUTCMonth)
    var getUTCSeconds = uncurryThis(DatePrototype.getUTCSeconds)

    // `Date.prototype.toISOString` method implementation
    // https://tc39.es/ecma262/#sec-date.prototype.toisostring
    // PhantomJS / old WebKit fails here:
    module.exports = (fails(function () {
      return nativeDateToISOString.call(new Date(-5e13 - 1)) !== '0385-07-25T07:06:39.999Z'
    }) || !fails(function () {
      nativeDateToISOString.call(new Date(NaN))
    })) ? function toISOString () {
        if (!$isFinite(thisTimeValue(this))) throw new $RangeError('Invalid time value')
        var date = this
        var year = getUTCFullYear(date)
        var milliseconds = getUTCMilliseconds(date)
        var sign = year < 0 ? '-' : year > 9999 ? '+' : ''
        return sign + padStart(abs(year), sign ? 6 : 4, 0) +
    '-' + padStart(getUTCMonth(date) + 1, 2, 0) +
    '-' + padStart(getUTCDate(date), 2, 0) +
    'T' + padStart(getUTCHours(date), 2, 0) +
    ':' + padStart(getUTCMinutes(date), 2, 0) +
    ':' + padStart(getUTCSeconds(date), 2, 0) +
    '.' + padStart(milliseconds, 3, 0) +
    'Z'
      } : nativeDateToISOString
  }, { '../internals/fails': 108, '../internals/function-uncurry-this': 120, '../internals/string-pad': 244 }],
  79: [function (require, module, exports) {
    'use strict'
    var anObject = require('../internals/an-object')
    var ordinaryToPrimitive = require('../internals/ordinary-to-primitive')

    var $TypeError = TypeError

    // `Date.prototype[@@toPrimitive](hint)` method implementation
    // https://tc39.es/ecma262/#sec-date.prototype-@@toprimitive
    module.exports = function (hint) {
      anObject(this)
      if (hint === 'string' || hint === 'default') hint = 'string'
      else if (hint !== 'number') throw new $TypeError('Incorrect hint')
      return ordinaryToPrimitive(this, hint)
    }
  }, { '../internals/an-object': 30, '../internals/ordinary-to-primitive': 202 }],
  80: [function (require, module, exports) {
    'use strict'
    var makeBuiltIn = require('../internals/make-built-in')
    var defineProperty = require('../internals/object-define-property')

    module.exports = function (target, name, descriptor) {
      if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true })
      if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true })
      return defineProperty.f(target, name, descriptor)
    }
  }, { '../internals/make-built-in': 168, '../internals/object-define-property': 187 }],
  81: [function (require, module, exports) {
    'use strict'
    var isCallable = require('../internals/is-callable')
    var definePropertyModule = require('../internals/object-define-property')
    var makeBuiltIn = require('../internals/make-built-in')
    var defineGlobalProperty = require('../internals/define-global-property')

    module.exports = function (O, key, value, options) {
      if (!options) options = {}
      var simple = options.enumerable
      var name = options.name !== undefined ? options.name : key
      if (isCallable(value)) makeBuiltIn(value, name, options)
      if (options.global) {
        if (simple) O[key] = value
        else defineGlobalProperty(key, value)
      } else {
        try {
          if (!options.unsafe) delete O[key]
          else if (O[key]) simple = true
        } catch (error) { /* empty */ }
        if (simple) O[key] = value
        else {
          definePropertyModule.f(O, key, {
            value: value,
            enumerable: false,
            configurable: !options.nonConfigurable,
            writable: !options.nonWritable
          })
        }
      } return O
    }
  }, { '../internals/define-global-property': 83, '../internals/is-callable': 147, '../internals/make-built-in': 168, '../internals/object-define-property': 187 }],
  82: [function (require, module, exports) {
    'use strict'
    var defineBuiltIn = require('../internals/define-built-in')

    module.exports = function (target, src, options) {
      for (var key in src) defineBuiltIn(target, key, src[key], options)
      return target
    }
  }, { '../internals/define-built-in': 81 }],
  83: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')

    // eslint-disable-next-line es/no-object-defineproperty -- safe
    var defineProperty = Object.defineProperty

    module.exports = function (key, value) {
      try {
        defineProperty(globalThis, key, { value: value, configurable: true, writable: true })
      } catch (error) {
        globalThis[key] = value
      } return value
    }
  }, { '../internals/global-this': 131 }],
  84: [function (require, module, exports) {
    'use strict'
    var tryToString = require('../internals/try-to-string')

    var $TypeError = TypeError

    module.exports = function (O, P) {
      if (!delete O[P]) throw new $TypeError('Cannot delete property ' + tryToString(P) + ' of ' + tryToString(O))
    }
  }, { '../internals/try-to-string': 271 }],
  85: [function (require, module, exports) {
    'use strict'
    var fails = require('../internals/fails')

    // Detect IE8's incomplete defineProperty implementation
    module.exports = !fails(function () {
      // eslint-disable-next-line es/no-object-defineproperty -- required for testing
      return Object.defineProperty({}, 1, { get: function () { return 7 } })[1] !== 7
    })
  }, { '../internals/fails': 108 }],
  86: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')
    var getBuiltInNodeModule = require('../internals/get-built-in-node-module')
    var PROPER_STRUCTURED_CLONE_TRANSFER = require('../internals/structured-clone-proper-transfer')

    var structuredClone = globalThis.structuredClone
    var $ArrayBuffer = globalThis.ArrayBuffer
    var $MessageChannel = globalThis.MessageChannel
    var detach = false
    var WorkerThreads, channel, buffer, $detach

    if (PROPER_STRUCTURED_CLONE_TRANSFER) {
      detach = function (transferable) {
        structuredClone(transferable, { transfer: [transferable] })
      }
    } else if ($ArrayBuffer) {
      try {
        if (!$MessageChannel) {
          WorkerThreads = getBuiltInNodeModule('worker_threads')
          if (WorkerThreads) $MessageChannel = WorkerThreads.MessageChannel
        }

        if ($MessageChannel) {
          channel = new $MessageChannel()
          buffer = new $ArrayBuffer(2)

          $detach = function (transferable) {
            channel.port1.postMessage(null, [transferable])
          }

          if (buffer.byteLength === 2) {
            $detach(buffer)
            if (buffer.byteLength === 0) detach = $detach
          }
        }
      } catch (error) { /* empty */ }
    }

    module.exports = detach
  }, { '../internals/get-built-in-node-module': 121, '../internals/global-this': 131, '../internals/structured-clone-proper-transfer': 251 }],
  87: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')
    var isObject = require('../internals/is-object')

    var document = globalThis.document
    // typeof document.createElement is 'object' in old IE
    var EXISTS = isObject(document) && isObject(document.createElement)

    module.exports = function (it) {
      return EXISTS ? document.createElement(it) : {}
    }
  }, { '../internals/global-this': 131, '../internals/is-object': 153 }],
  88: [function (require, module, exports) {
    'use strict'
    var $TypeError = TypeError
    var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF // 2 ** 53 - 1 == 9007199254740991

    module.exports = function (it) {
      if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded')
      return it
    }
  }, {}],
  89: [function (require, module, exports) {
    'use strict'
    module.exports = {
      IndexSizeError: { s: 'INDEX_SIZE_ERR', c: 1, m: 1 },
      DOMStringSizeError: { s: 'DOMSTRING_SIZE_ERR', c: 2, m: 0 },
      HierarchyRequestError: { s: 'HIERARCHY_REQUEST_ERR', c: 3, m: 1 },
      WrongDocumentError: { s: 'WRONG_DOCUMENT_ERR', c: 4, m: 1 },
      InvalidCharacterError: { s: 'INVALID_CHARACTER_ERR', c: 5, m: 1 },
      NoDataAllowedError: { s: 'NO_DATA_ALLOWED_ERR', c: 6, m: 0 },
      NoModificationAllowedError: { s: 'NO_MODIFICATION_ALLOWED_ERR', c: 7, m: 1 },
      NotFoundError: { s: 'NOT_FOUND_ERR', c: 8, m: 1 },
      NotSupportedError: { s: 'NOT_SUPPORTED_ERR', c: 9, m: 1 },
      InUseAttributeError: { s: 'INUSE_ATTRIBUTE_ERR', c: 10, m: 1 },
      InvalidStateError: { s: 'INVALID_STATE_ERR', c: 11, m: 1 },
      SyntaxError: { s: 'SYNTAX_ERR', c: 12, m: 1 },
      InvalidModificationError: { s: 'INVALID_MODIFICATION_ERR', c: 13, m: 1 },
      NamespaceError: { s: 'NAMESPACE_ERR', c: 14, m: 1 },
      InvalidAccessError: { s: 'INVALID_ACCESS_ERR', c: 15, m: 1 },
      ValidationError: { s: 'VALIDATION_ERR', c: 16, m: 0 },
      TypeMismatchError: { s: 'TYPE_MISMATCH_ERR', c: 17, m: 1 },
      SecurityError: { s: 'SECURITY_ERR', c: 18, m: 1 },
      NetworkError: { s: 'NETWORK_ERR', c: 19, m: 1 },
      AbortError: { s: 'ABORT_ERR', c: 20, m: 1 },
      URLMismatchError: { s: 'URL_MISMATCH_ERR', c: 21, m: 1 },
      QuotaExceededError: { s: 'QUOTA_EXCEEDED_ERR', c: 22, m: 1 },
      TimeoutError: { s: 'TIMEOUT_ERR', c: 23, m: 1 },
      InvalidNodeTypeError: { s: 'INVALID_NODE_TYPE_ERR', c: 24, m: 1 },
      DataCloneError: { s: 'DATA_CLONE_ERR', c: 25, m: 1 }
    }
  }, {}],
  90: [function (require, module, exports) {
    'use strict'
    // iterable DOM collections
    // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
    module.exports = {
      CSSRuleList: 0,
      CSSStyleDeclaration: 0,
      CSSValueList: 0,
      ClientRectList: 0,
      DOMRectList: 0,
      DOMStringList: 0,
      DOMTokenList: 1,
      DataTransferItemList: 0,
      FileList: 0,
      HTMLAllCollection: 0,
      HTMLCollection: 0,
      HTMLFormElement: 0,
      HTMLSelectElement: 0,
      MediaList: 0,
      MimeTypeArray: 0,
      NamedNodeMap: 0,
      NodeList: 1,
      PaintRequestList: 0,
      Plugin: 0,
      PluginArray: 0,
      SVGLengthList: 0,
      SVGNumberList: 0,
      SVGPathSegList: 0,
      SVGPointList: 0,
      SVGStringList: 0,
      SVGTransformList: 0,
      SourceBufferList: 0,
      StyleSheetList: 0,
      TextTrackCueList: 0,
      TextTrackList: 0,
      TouchList: 0
    }
  }, {}],
  91: [function (require, module, exports) {
    'use strict'
    // in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
    var documentCreateElement = require('../internals/document-create-element')

    var classList = documentCreateElement('span').classList
    var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype

    module.exports = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype
  }, { '../internals/document-create-element': 87 }],
  92: [function (require, module, exports) {
    'use strict'
    // IE8- don't enum bug keys
    module.exports = [
      'constructor',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'toLocaleString',
      'toString',
      'valueOf'
    ]
  }, {}],
  93: [function (require, module, exports) {
    'use strict'
    var userAgent = require('../internals/environment-user-agent')

    var firefox = userAgent.match(/firefox\/(\d+)/i)

    module.exports = !!firefox && +firefox[1]
  }, { '../internals/environment-user-agent': 99 }],
  94: [function (require, module, exports) {
    'use strict'
    var UA = require('../internals/environment-user-agent')

    module.exports = /MSIE|Trident/.test(UA)
  }, { '../internals/environment-user-agent': 99 }],
  95: [function (require, module, exports) {
    'use strict'
    var userAgent = require('../internals/environment-user-agent')

    module.exports = /ipad|iphone|ipod/i.test(userAgent) && typeof Pebble !== 'undefined'
  }, { '../internals/environment-user-agent': 99 }],
  96: [function (require, module, exports) {
    'use strict'
    var userAgent = require('../internals/environment-user-agent')

    // eslint-disable-next-line redos/no-vulnerable -- safe
    module.exports = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent)
  }, { '../internals/environment-user-agent': 99 }],
  97: [function (require, module, exports) {
    'use strict'
    var ENVIRONMENT = require('../internals/environment')

    module.exports = ENVIRONMENT === 'NODE'
  }, { '../internals/environment': 102 }],
  98: [function (require, module, exports) {
    'use strict'
    var userAgent = require('../internals/environment-user-agent')

    module.exports = /web0s(?!.*chrome)/i.test(userAgent)
  }, { '../internals/environment-user-agent': 99 }],
  99: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')

    var navigator = globalThis.navigator
    var userAgent = navigator && navigator.userAgent

    module.exports = userAgent ? String(userAgent) : ''
  }, { '../internals/global-this': 131 }],
  100: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')
    var userAgent = require('../internals/environment-user-agent')

    var process = globalThis.process
    var Deno = globalThis.Deno
    var versions = process && process.versions || Deno && Deno.version
    var v8 = versions && versions.v8
    var match, version

    if (v8) {
      match = v8.split('.')
      // in old Chrome, versions of V8 isn't V8 = Chrome / 10
      // but their correct versions are not interesting for us
      version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1])
    }

    // BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
    // so check `userAgent` even if `.v8` exists, but 0
    if (!version && userAgent) {
      match = userAgent.match(/Edge\/(\d+)/)
      if (!match || match[1] >= 74) {
        match = userAgent.match(/Chrome\/(\d+)/)
        if (match) version = +match[1]
      }
    }

    module.exports = version
  }, { '../internals/environment-user-agent': 99, '../internals/global-this': 131 }],
  101: [function (require, module, exports) {
    'use strict'
    var userAgent = require('../internals/environment-user-agent')

    var webkit = userAgent.match(/AppleWebKit\/(\d+)\./)

    module.exports = !!webkit && +webkit[1]
  }, { '../internals/environment-user-agent': 99 }],
  102: [function (require, module, exports) {
    'use strict'
    /* global Bun, Deno -- detection */
    var globalThis = require('../internals/global-this')
    var userAgent = require('../internals/environment-user-agent')
    var classof = require('../internals/classof-raw')

    var userAgentStartsWith = function (string) {
      return userAgent.slice(0, string.length) === string
    }

    module.exports = (function () {
      if (userAgentStartsWith('Bun/')) return 'BUN'
      if (userAgentStartsWith('Cloudflare-Workers')) return 'CLOUDFLARE'
      if (userAgentStartsWith('Deno/')) return 'DENO'
      if (userAgentStartsWith('Node.js/')) return 'NODE'
      if (globalThis.Bun && typeof Bun.version === 'string') return 'BUN'
      if (globalThis.Deno && typeof Deno.version === 'object') return 'DENO'
      if (classof(globalThis.process) === 'process') return 'NODE'
      if (globalThis.window && globalThis.document) return 'BROWSER'
      return 'REST'
    })()
  }, { '../internals/classof-raw': 65, '../internals/environment-user-agent': 99, '../internals/global-this': 131 }],
  103: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')

    var $Error = Error
    var replace = uncurryThis(''.replace)

    var TEST = (function (arg) { return String(new $Error(arg).stack) })('zxcasd')
    // eslint-disable-next-line redos/no-vulnerable -- safe
    var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/
    var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST)

    module.exports = function (stack, dropEntries) {
      if (IS_V8_OR_CHAKRA_STACK && typeof stack === 'string' && !$Error.prepareStackTrace) {
        while (dropEntries--) stack = replace(stack, V8_OR_CHAKRA_STACK_ENTRY, '')
      } return stack
    }
  }, { '../internals/function-uncurry-this': 120 }],
  104: [function (require, module, exports) {
    'use strict'
    var createNonEnumerableProperty = require('../internals/create-non-enumerable-property')
    var clearErrorStack = require('../internals/error-stack-clear')
    var ERROR_STACK_INSTALLABLE = require('../internals/error-stack-installable')

    // non-standard V8
    var captureStackTrace = Error.captureStackTrace

    module.exports = function (error, C, stack, dropEntries) {
      if (ERROR_STACK_INSTALLABLE) {
        if (captureStackTrace) captureStackTrace(error, C)
        else createNonEnumerableProperty(error, 'stack', clearErrorStack(stack, dropEntries))
      }
    }
  }, { '../internals/create-non-enumerable-property': 75, '../internals/error-stack-clear': 103, '../internals/error-stack-installable': 105 }],
  105: [function (require, module, exports) {
    'use strict'
    var fails = require('../internals/fails')
    var createPropertyDescriptor = require('../internals/create-property-descriptor')

    module.exports = !fails(function () {
      var error = new Error('a')
      if (!('stack' in error)) return true
      // eslint-disable-next-line es/no-object-defineproperty -- safe
      Object.defineProperty(error, 'stack', createPropertyDescriptor(1, 7))
      return error.stack !== 7
    })
  }, { '../internals/create-property-descriptor': 76, '../internals/fails': 108 }],
  106: [function (require, module, exports) {
    'use strict'
    var DESCRIPTORS = require('../internals/descriptors')
    var fails = require('../internals/fails')
    var anObject = require('../internals/an-object')
    var normalizeStringArgument = require('../internals/normalize-string-argument')

    var nativeErrorToString = Error.prototype.toString

    var INCORRECT_TO_STRING = fails(function () {
      if (DESCRIPTORS) {
        // Chrome 32- incorrectly call accessor
        // eslint-disable-next-line es/no-object-create, es/no-object-defineproperty -- safe
        var object = Object.create(Object.defineProperty({}, 'name', {
          get: function () {
            return this === object
          }
        }))
        if (nativeErrorToString.call(object) !== 'true') return true
      }
      // FF10- does not properly handle non-strings
      return nativeErrorToString.call({ message: 1, name: 2 }) !== '2: 1' ||
    // IE8 does not properly handle defaults
    nativeErrorToString.call({}) !== 'Error'
    })

    module.exports = INCORRECT_TO_STRING ? function toString () {
      var O = anObject(this)
      var name = normalizeStringArgument(O.name, 'Error')
      var message = normalizeStringArgument(O.message)
      return !name ? message : !message ? name : name + ': ' + message
    } : nativeErrorToString
  }, { '../internals/an-object': 30, '../internals/descriptors': 85, '../internals/fails': 108, '../internals/normalize-string-argument': 179 }],
  107: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')
    var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f
    var createNonEnumerableProperty = require('../internals/create-non-enumerable-property')
    var defineBuiltIn = require('../internals/define-built-in')
    var defineGlobalProperty = require('../internals/define-global-property')
    var copyConstructorProperties = require('../internals/copy-constructor-properties')
    var isForced = require('../internals/is-forced')

    /*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
    module.exports = function (options, source) {
      var TARGET = options.target
      var GLOBAL = options.global
      var STATIC = options.stat
      var FORCED, target, key, targetProperty, sourceProperty, descriptor
      if (GLOBAL) {
        target = globalThis
      } else if (STATIC) {
        target = globalThis[TARGET] || defineGlobalProperty(TARGET, {})
      } else {
        target = globalThis[TARGET] && globalThis[TARGET].prototype
      }
      if (target) {
        for (key in source) {
          sourceProperty = source[key]
          if (options.dontCallGetSet) {
            descriptor = getOwnPropertyDescriptor(target, key)
            targetProperty = descriptor && descriptor.value
          } else targetProperty = target[key]
          FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced)
          // contained in target
          if (!FORCED && targetProperty !== undefined) {
            if (typeof sourceProperty === typeof targetProperty) continue
            copyConstructorProperties(sourceProperty, targetProperty)
          }
          // add a flag to not completely full polyfills
          if (options.sham || (targetProperty && targetProperty.sham)) {
            createNonEnumerableProperty(sourceProperty, 'sham', true)
          }
          defineBuiltIn(target, key, sourceProperty, options)
        }
      }
    }
  }, { '../internals/copy-constructor-properties': 70, '../internals/create-non-enumerable-property': 75, '../internals/define-built-in': 81, '../internals/define-global-property': 83, '../internals/global-this': 131, '../internals/is-forced': 150, '../internals/object-get-own-property-descriptor': 188 }],
  108: [function (require, module, exports) {
    'use strict'
    module.exports = function (exec) {
      try {
        return !!exec()
      } catch (error) {
        return true
      }
    }
  }, {}],
  109: [function (require, module, exports) {
    'use strict'
    // TODO: Remove from `core-js@4` since it's moved to entry points
    require('../modules/es.regexp.exec')
    var call = require('../internals/function-call')
    var defineBuiltIn = require('../internals/define-built-in')
    var regexpExec = require('../internals/regexp-exec')
    var fails = require('../internals/fails')
    var wellKnownSymbol = require('../internals/well-known-symbol')
    var createNonEnumerableProperty = require('../internals/create-non-enumerable-property')

    var SPECIES = wellKnownSymbol('species')
    var RegExpPrototype = RegExp.prototype

    module.exports = function (KEY, exec, FORCED, SHAM) {
      var SYMBOL = wellKnownSymbol(KEY)

      var DELEGATES_TO_SYMBOL = !fails(function () {
        // String methods call symbol-named RegExp methods
        var O = {}
        O[SYMBOL] = function () { return 7 }
        return ''[KEY](O) !== 7
      })

      var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
        // Symbol-named RegExp methods call .exec
        var execCalled = false
        var re = /a/

        if (KEY === 'split') {
          // We can't use real regex here since it causes deoptimization
          // and serious performance degradation in V8
          // https://github.com/zloirock/core-js/issues/306
          re = {}
          // RegExp[@@split] doesn't call the regex's exec method, but first creates
          // a new one. We need to return the patched regex when creating the new one.
          re.constructor = {}
          re.constructor[SPECIES] = function () { return re }
          re.flags = ''
          re[SYMBOL] = /./[SYMBOL]
        }

        re.exec = function () {
          execCalled = true
          return null
        }

        re[SYMBOL]('')
        return !execCalled
      })

      if (
        !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    FORCED
      ) {
        var nativeRegExpMethod = /./[SYMBOL]
        var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
          var $exec = regexp.exec
          if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
            if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
              // The native String method already delegates to @@method (this
              // polyfilled function), leasing to infinite recursion.
              // We avoid it by directly calling the native @@method method.
              return { done: true, value: call(nativeRegExpMethod, regexp, str, arg2) }
            }
            return { done: true, value: call(nativeMethod, str, regexp, arg2) }
          }
          return { done: false }
        })

        defineBuiltIn(String.prototype, KEY, methods[0])
        defineBuiltIn(RegExpPrototype, SYMBOL, methods[1])
      }

      if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true)
    }
  }, { '../internals/create-non-enumerable-property': 75, '../internals/define-built-in': 81, '../internals/fails': 108, '../internals/function-call': 116, '../internals/regexp-exec': 213, '../internals/well-known-symbol': 285, '../modules/es.regexp.exec': 446 }],
  110: [function (require, module, exports) {
    'use strict'
    var isArray = require('../internals/is-array')
    var lengthOfArrayLike = require('../internals/length-of-array-like')
    var doesNotExceedSafeInteger = require('../internals/does-not-exceed-safe-integer')
    var bind = require('../internals/function-bind-context')

    // `FlattenIntoArray` abstract operation
    // https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
    var flattenIntoArray = function (target, original, source, sourceLen, start, depth, mapper, thisArg) {
      var targetIndex = start
      var sourceIndex = 0
      var mapFn = mapper ? bind(mapper, thisArg) : false
      var element, elementLen

      while (sourceIndex < sourceLen) {
        if (sourceIndex in source) {
          element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex]

          if (depth > 0 && isArray(element)) {
            elementLen = lengthOfArrayLike(element)
            targetIndex = flattenIntoArray(target, original, element, elementLen, targetIndex, depth - 1) - 1
          } else {
            doesNotExceedSafeInteger(targetIndex + 1)
            target[targetIndex] = element
          }

          targetIndex++
        }
        sourceIndex++
      }
      return targetIndex
    }

    module.exports = flattenIntoArray
  }, { '../internals/does-not-exceed-safe-integer': 88, '../internals/function-bind-context': 113, '../internals/is-array': 145, '../internals/length-of-array-like': 167 }],
  111: [function (require, module, exports) {
    'use strict'
    var fails = require('../internals/fails')

    module.exports = !fails(function () {
      // eslint-disable-next-line es/no-object-isextensible, es/no-object-preventextensions -- required for testing
      return Object.isExtensible(Object.preventExtensions({}))
    })
  }, { '../internals/fails': 108 }],
  112: [function (require, module, exports) {
    'use strict'
    var NATIVE_BIND = require('../internals/function-bind-native')

    var FunctionPrototype = Function.prototype
    var apply = FunctionPrototype.apply
    var call = FunctionPrototype.call

    // eslint-disable-next-line es/no-reflect -- safe
    module.exports = typeof Reflect === 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
      return call.apply(apply, arguments)
    })
  }, { '../internals/function-bind-native': 114 }],
  113: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this-clause')
    var aCallable = require('../internals/a-callable')
    var NATIVE_BIND = require('../internals/function-bind-native')

    var bind = uncurryThis(uncurryThis.bind)

    // optional / simple context binding
    module.exports = function (fn, that) {
      aCallable(fn)
      return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
        return fn.apply(that, arguments)
      }
    }
  }, { '../internals/a-callable': 23, '../internals/function-bind-native': 114, '../internals/function-uncurry-this-clause': 119 }],
  114: [function (require, module, exports) {
    'use strict'
    var fails = require('../internals/fails')

    module.exports = !fails(function () {
      // eslint-disable-next-line es/no-function-prototype-bind -- safe
      var test = function () { /* empty */ }.bind()
      // eslint-disable-next-line no-prototype-builtins -- safe
      return typeof test !== 'function' || test.hasOwnProperty('prototype')
    })
  }, { '../internals/fails': 108 }],
  115: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')
    var aCallable = require('../internals/a-callable')
    var isObject = require('../internals/is-object')
    var hasOwn = require('../internals/has-own-property')
    var arraySlice = require('../internals/array-slice')
    var NATIVE_BIND = require('../internals/function-bind-native')

    var $Function = Function
    var concat = uncurryThis([].concat)
    var join = uncurryThis([].join)
    var factories = {}

    var construct = function (C, argsLength, args) {
      if (!hasOwn(factories, argsLength)) {
        var list = []
        var i = 0
        for (; i < argsLength; i++) list[i] = 'a[' + i + ']'
        factories[argsLength] = $Function('C,a', 'return new C(' + join(list, ',') + ')')
      } return factories[argsLength](C, args)
    }

    // `Function.prototype.bind` method implementation
    // https://tc39.es/ecma262/#sec-function.prototype.bind
    // eslint-disable-next-line es/no-function-prototype-bind -- detection
    module.exports = NATIVE_BIND ? $Function.bind : function bind (that /* , ...args */) {
      var F = aCallable(this)
      var Prototype = F.prototype
      var partArgs = arraySlice(arguments, 1)
      var boundFunction = function bound (/* args... */) {
        var args = concat(partArgs, arraySlice(arguments))
        return this instanceof boundFunction ? construct(F, args.length, args) : F.apply(that, args)
      }
      if (isObject(Prototype)) boundFunction.prototype = Prototype
      return boundFunction
    }
  }, { '../internals/a-callable': 23, '../internals/array-slice': 52, '../internals/function-bind-native': 114, '../internals/function-uncurry-this': 120, '../internals/has-own-property': 132, '../internals/is-object': 153 }],
  116: [function (require, module, exports) {
    'use strict'
    var NATIVE_BIND = require('../internals/function-bind-native')

    var call = Function.prototype.call

    module.exports = NATIVE_BIND ? call.bind(call) : function () {
      return call.apply(call, arguments)
    }
  }, { '../internals/function-bind-native': 114 }],
  117: [function (require, module, exports) {
    'use strict'
    var DESCRIPTORS = require('../internals/descriptors')
    var hasOwn = require('../internals/has-own-property')

    var FunctionPrototype = Function.prototype
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor

    var EXISTS = hasOwn(FunctionPrototype, 'name')
    // additional protection from minified / mangled / dropped function names
    var PROPER = EXISTS && function something () { /* empty */ }.name === 'something'
    var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable))

    module.exports = {
      EXISTS: EXISTS,
      PROPER: PROPER,
      CONFIGURABLE: CONFIGURABLE
    }
  }, { '../internals/descriptors': 85, '../internals/has-own-property': 132 }],
  118: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')
    var aCallable = require('../internals/a-callable')

    module.exports = function (object, key, method) {
      try {
        // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
        return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]))
      } catch (error) { /* empty */ }
    }
  }, { '../internals/a-callable': 23, '../internals/function-uncurry-this': 120 }],
  119: [function (require, module, exports) {
    'use strict'
    var classofRaw = require('../internals/classof-raw')
    var uncurryThis = require('../internals/function-uncurry-this')

    module.exports = function (fn) {
      // Nashorn bug:
      //   https://github.com/zloirock/core-js/issues/1128
      //   https://github.com/zloirock/core-js/issues/1130
      if (classofRaw(fn) === 'Function') return uncurryThis(fn)
    }
  }, { '../internals/classof-raw': 65, '../internals/function-uncurry-this': 120 }],
  120: [function (require, module, exports) {
    'use strict'
    var NATIVE_BIND = require('../internals/function-bind-native')

    var FunctionPrototype = Function.prototype
    var call = FunctionPrototype.call
    var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call)

    module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
      return function () {
        return call.apply(fn, arguments)
      }
    }
  }, { '../internals/function-bind-native': 114 }],
  121: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')
    var IS_NODE = require('../internals/environment-is-node')

    module.exports = function (name) {
      if (IS_NODE) {
        try {
          return globalThis.process.getBuiltinModule(name)
        } catch (error) { /* empty */ }
        try {
          // eslint-disable-next-line no-new-func -- safe
          return Function('return require("' + name + '")')()
        } catch (error) { /* empty */ }
      }
    }
  }, { '../internals/environment-is-node': 97, '../internals/global-this': 131 }],
  122: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')

    module.exports = function (CONSTRUCTOR, METHOD) {
      var Constructor = globalThis[CONSTRUCTOR]
      var Prototype = Constructor && Constructor.prototype
      return Prototype && Prototype[METHOD]
    }
  }, { '../internals/global-this': 131 }],
  123: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')
    var isCallable = require('../internals/is-callable')

    var aFunction = function (argument) {
      return isCallable(argument) ? argument : undefined
    }

    module.exports = function (namespace, method) {
      return arguments.length < 2 ? aFunction(globalThis[namespace]) : globalThis[namespace] && globalThis[namespace][method]
    }
  }, { '../internals/global-this': 131, '../internals/is-callable': 147 }],
  124: [function (require, module, exports) {
    'use strict'
    // `GetIteratorDirect(obj)` abstract operation
    // https://tc39.es/proposal-iterator-helpers/#sec-getiteratordirect
    module.exports = function (obj) {
      return {
        iterator: obj,
        next: obj.next,
        done: false
      }
    }
  }, {}],
  125: [function (require, module, exports) {
    'use strict'
    var classof = require('../internals/classof')
    var getMethod = require('../internals/get-method')
    var isNullOrUndefined = require('../internals/is-null-or-undefined')
    var Iterators = require('../internals/iterators')
    var wellKnownSymbol = require('../internals/well-known-symbol')

    var ITERATOR = wellKnownSymbol('iterator')

    module.exports = function (it) {
      if (!isNullOrUndefined(it)) {
        return getMethod(it, ITERATOR) ||
    getMethod(it, '@@iterator') ||
    Iterators[classof(it)]
      }
    }
  }, { '../internals/classof': 66, '../internals/get-method': 128, '../internals/is-null-or-undefined': 152, '../internals/iterators': 166, '../internals/well-known-symbol': 285 }],
  126: [function (require, module, exports) {
    'use strict'
    var call = require('../internals/function-call')
    var aCallable = require('../internals/a-callable')
    var anObject = require('../internals/an-object')
    var tryToString = require('../internals/try-to-string')
    var getIteratorMethod = require('../internals/get-iterator-method')

    var $TypeError = TypeError

    module.exports = function (argument, usingIterator) {
      var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator
      if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument))
      throw new $TypeError(tryToString(argument) + ' is not iterable')
    }
  }, { '../internals/a-callable': 23, '../internals/an-object': 30, '../internals/function-call': 116, '../internals/get-iterator-method': 125, '../internals/try-to-string': 271 }],
  127: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')
    var isArray = require('../internals/is-array')
    var isCallable = require('../internals/is-callable')
    var classof = require('../internals/classof-raw')
    var toString = require('../internals/to-string')

    var push = uncurryThis([].push)

    module.exports = function (replacer) {
      if (isCallable(replacer)) return replacer
      if (!isArray(replacer)) return
      var rawLength = replacer.length
      var keys = []
      for (var i = 0; i < rawLength; i++) {
        var element = replacer[i]
        if (typeof element === 'string') push(keys, element)
        else if (typeof element === 'number' || classof(element) === 'Number' || classof(element) === 'String') push(keys, toString(element))
      }
      var keysLength = keys.length
      var root = true
      return function (key, value) {
        if (root) {
          root = false
          return value
        }
        if (isArray(this)) return value
        for (var j = 0; j < keysLength; j++) if (keys[j] === key) return value
      }
    }
  }, { '../internals/classof-raw': 65, '../internals/function-uncurry-this': 120, '../internals/is-array': 145, '../internals/is-callable': 147, '../internals/to-string': 269 }],
  128: [function (require, module, exports) {
    'use strict'
    var aCallable = require('../internals/a-callable')
    var isNullOrUndefined = require('../internals/is-null-or-undefined')

    // `GetMethod` abstract operation
    // https://tc39.es/ecma262/#sec-getmethod
    module.exports = function (V, P) {
      var func = V[P]
      return isNullOrUndefined(func) ? undefined : aCallable(func)
    }
  }, { '../internals/a-callable': 23, '../internals/is-null-or-undefined': 152 }],
  129: [function (require, module, exports) {
    'use strict'
    var aCallable = require('../internals/a-callable')
    var anObject = require('../internals/an-object')
    var call = require('../internals/function-call')
    var toIntegerOrInfinity = require('../internals/to-integer-or-infinity')
    var getIteratorDirect = require('../internals/get-iterator-direct')

    var INVALID_SIZE = 'Invalid size'
    var $RangeError = RangeError
    var $TypeError = TypeError
    var max = Math.max

    var SetRecord = function (set, intSize) {
      this.set = set
      this.size = max(intSize, 0)
      this.has = aCallable(set.has)
      this.keys = aCallable(set.keys)
    }

    SetRecord.prototype = {
      getIterator: function () {
        return getIteratorDirect(anObject(call(this.keys, this.set)))
      },
      includes: function (it) {
        return call(this.has, this.set, it)
      }
    }

    // `GetSetRecord` abstract operation
    // https://tc39.es/proposal-set-methods/#sec-getsetrecord
    module.exports = function (obj) {
      anObject(obj)
      var numSize = +obj.size
      // NOTE: If size is undefined, then numSize will be NaN
      // eslint-disable-next-line no-self-compare -- NaN check
      if (numSize !== numSize) throw new $TypeError(INVALID_SIZE)
      var intSize = toIntegerOrInfinity(numSize)
      if (intSize < 0) throw new $RangeError(INVALID_SIZE)
      return new SetRecord(obj, intSize)
    }
  }, { '../internals/a-callable': 23, '../internals/an-object': 30, '../internals/function-call': 116, '../internals/get-iterator-direct': 124, '../internals/to-integer-or-infinity': 261 }],
  130: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')
    var toObject = require('../internals/to-object')

    var floor = Math.floor
    var charAt = uncurryThis(''.charAt)
    var replace = uncurryThis(''.replace)
    var stringSlice = uncurryThis(''.slice)
    // eslint-disable-next-line redos/no-vulnerable -- safe
    var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g
    var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g

    // `GetSubstitution` abstract operation
    // https://tc39.es/ecma262/#sec-getsubstitution
    module.exports = function (matched, str, position, captures, namedCaptures, replacement) {
      var tailPos = position + matched.length
      var m = captures.length
      var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED
      if (namedCaptures !== undefined) {
        namedCaptures = toObject(namedCaptures)
        symbols = SUBSTITUTION_SYMBOLS
      }
      return replace(replacement, symbols, function (match, ch) {
        var capture
        switch (charAt(ch, 0)) {
          case '$': return '$'
          case '&': return matched
          case '`': return stringSlice(str, 0, position)
          case "'": return stringSlice(str, tailPos)
          case '<':
            capture = namedCaptures[stringSlice(ch, 1, -1)]
            break
          default: // \d\d?
            var n = +ch
            if (n === 0) return match
            if (n > m) {
              var f = floor(n / 10)
              if (f === 0) return match
              if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1)
              return match
            }
            capture = captures[n - 1]
        }
        return capture === undefined ? '' : capture
      })
    }
  }, { '../internals/function-uncurry-this': 120, '../internals/to-object': 263 }],
  131: [function (require, module, exports) {
    (function (global) {
      (function () {
        'use strict'
        var check = function (it) {
          return it && it.Math === Math && it
        }

        // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
        module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis === 'object' && globalThis) ||
  check(typeof window === 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self === 'object' && self) ||
  check(typeof global === 'object' && global) ||
  check(typeof this === 'object' && this) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this })() || Function('return this')()
      }).call(this)
    }).call(this, typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {})
  }, {}],
  132: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')
    var toObject = require('../internals/to-object')

    var hasOwnProperty = uncurryThis({}.hasOwnProperty)

    // `HasOwnProperty` abstract operation
    // https://tc39.es/ecma262/#sec-hasownproperty
    // eslint-disable-next-line es/no-object-hasown -- safe
    module.exports = Object.hasOwn || function hasOwn (it, key) {
      return hasOwnProperty(toObject(it), key)
    }
  }, { '../internals/function-uncurry-this': 120, '../internals/to-object': 263 }],
  133: [function (require, module, exports) {
    'use strict'
    module.exports = {}
  }, {}],
  134: [function (require, module, exports) {
    'use strict'
    module.exports = function (a, b) {
      try {
        // eslint-disable-next-line no-console -- safe
        arguments.length === 1 ? console.error(a) : console.error(a, b)
      } catch (error) { /* empty */ }
    }
  }, {}],
  135: [function (require, module, exports) {
    'use strict'
    var getBuiltIn = require('../internals/get-built-in')

    module.exports = getBuiltIn('document', 'documentElement')
  }, { '../internals/get-built-in': 123 }],
  136: [function (require, module, exports) {
    'use strict'
    var DESCRIPTORS = require('../internals/descriptors')
    var fails = require('../internals/fails')
    var createElement = require('../internals/document-create-element')

    // Thanks to IE8 for its funny defineProperty
    module.exports = !DESCRIPTORS && !fails(function () {
      // eslint-disable-next-line es/no-object-defineproperty -- required for testing
      return Object.defineProperty(createElement('div'), 'a', {
        get: function () { return 7 }
      }).a !== 7
    })
  }, { '../internals/descriptors': 85, '../internals/document-create-element': 87, '../internals/fails': 108 }],
  137: [function (require, module, exports) {
    'use strict'
    // IEEE754 conversions based on https://github.com/feross/ieee754
    var $Array = Array
    var abs = Math.abs
    var pow = Math.pow
    var floor = Math.floor
    var log = Math.log
    var LN2 = Math.LN2

    var pack = function (number, mantissaLength, bytes) {
      var buffer = $Array(bytes)
      var exponentLength = bytes * 8 - mantissaLength - 1
      var eMax = (1 << exponentLength) - 1
      var eBias = eMax >> 1
      var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0
      var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0
      var index = 0
      var exponent, mantissa, c
      number = abs(number)
      // eslint-disable-next-line no-self-compare -- NaN check
      if (number !== number || number === Infinity) {
        // eslint-disable-next-line no-self-compare -- NaN check
        mantissa = number !== number ? 1 : 0
        exponent = eMax
      } else {
        exponent = floor(log(number) / LN2)
        c = pow(2, -exponent)
        if (number * c < 1) {
          exponent--
          c *= 2
        }
        if (exponent + eBias >= 1) {
          number += rt / c
        } else {
          number += rt * pow(2, 1 - eBias)
        }
        if (number * c >= 2) {
          exponent++
          c /= 2
        }
        if (exponent + eBias >= eMax) {
          mantissa = 0
          exponent = eMax
        } else if (exponent + eBias >= 1) {
          mantissa = (number * c - 1) * pow(2, mantissaLength)
          exponent += eBias
        } else {
          mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength)
          exponent = 0
        }
      }
      while (mantissaLength >= 8) {
        buffer[index++] = mantissa & 255
        mantissa /= 256
        mantissaLength -= 8
      }
      exponent = exponent << mantissaLength | mantissa
      exponentLength += mantissaLength
      while (exponentLength > 0) {
        buffer[index++] = exponent & 255
        exponent /= 256
        exponentLength -= 8
      }
      buffer[index - 1] |= sign * 128
      return buffer
    }

    var unpack = function (buffer, mantissaLength) {
      var bytes = buffer.length
      var exponentLength = bytes * 8 - mantissaLength - 1
      var eMax = (1 << exponentLength) - 1
      var eBias = eMax >> 1
      var nBits = exponentLength - 7
      var index = bytes - 1
      var sign = buffer[index--]
      var exponent = sign & 127
      var mantissa
      sign >>= 7
      while (nBits > 0) {
        exponent = exponent * 256 + buffer[index--]
        nBits -= 8
      }
      mantissa = exponent & (1 << -nBits) - 1
      exponent >>= -nBits
      nBits += mantissaLength
      while (nBits > 0) {
        mantissa = mantissa * 256 + buffer[index--]
        nBits -= 8
      }
      if (exponent === 0) {
        exponent = 1 - eBias
      } else if (exponent === eMax) {
        return mantissa ? NaN : sign ? -Infinity : Infinity
      } else {
        mantissa += pow(2, mantissaLength)
        exponent -= eBias
      } return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength)
    }

    module.exports = {
      pack: pack,
      unpack: unpack
    }
  }, {}],
  138: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')
    var fails = require('../internals/fails')
    var classof = require('../internals/classof-raw')

    var $Object = Object
    var split = uncurryThis(''.split)

    // fallback for non-array-like ES3 and non-enumerable old V8 strings
    module.exports = fails(function () {
      // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
      // eslint-disable-next-line no-prototype-builtins -- safe
      return !$Object('z').propertyIsEnumerable(0)
    }) ? function (it) {
        return classof(it) === 'String' ? split(it, '') : $Object(it)
      } : $Object
  }, { '../internals/classof-raw': 65, '../internals/fails': 108, '../internals/function-uncurry-this': 120 }],
  139: [function (require, module, exports) {
    'use strict'
    var isCallable = require('../internals/is-callable')
    var isObject = require('../internals/is-object')
    var setPrototypeOf = require('../internals/object-set-prototype-of')

    // makes subclassing work correct for wrapped built-ins
    module.exports = function ($this, dummy, Wrapper) {
      var NewTarget, NewTargetPrototype
      if (
      // it can work only with native `setPrototypeOf`
        setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
      ) setPrototypeOf($this, NewTargetPrototype)
      return $this
    }
  }, { '../internals/is-callable': 147, '../internals/is-object': 153, '../internals/object-set-prototype-of': 199 }],
  140: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')
    var isCallable = require('../internals/is-callable')
    var store = require('../internals/shared-store')

    var functionToString = uncurryThis(Function.toString)

    // this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
    if (!isCallable(store.inspectSource)) {
      store.inspectSource = function (it) {
        return functionToString(it)
      }
    }

    module.exports = store.inspectSource
  }, { '../internals/function-uncurry-this': 120, '../internals/is-callable': 147, '../internals/shared-store': 238 }],
  141: [function (require, module, exports) {
    'use strict'
    var isObject = require('../internals/is-object')
    var createNonEnumerableProperty = require('../internals/create-non-enumerable-property')

    // `InstallErrorCause` abstract operation
    // https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
    module.exports = function (O, options) {
      if (isObject(options) && 'cause' in options) {
        createNonEnumerableProperty(O, 'cause', options.cause)
      }
    }
  }, { '../internals/create-non-enumerable-property': 75, '../internals/is-object': 153 }],
  142: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var uncurryThis = require('../internals/function-uncurry-this')
    var hiddenKeys = require('../internals/hidden-keys')
    var isObject = require('../internals/is-object')
    var hasOwn = require('../internals/has-own-property')
    var defineProperty = require('../internals/object-define-property').f
    var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names')
    var getOwnPropertyNamesExternalModule = require('../internals/object-get-own-property-names-external')
    var isExtensible = require('../internals/object-is-extensible')
    var uid = require('../internals/uid')
    var FREEZING = require('../internals/freezing')

    var REQUIRED = false
    var METADATA = uid('meta')
    var id = 0

    var setMetadata = function (it) {
      defineProperty(it, METADATA, {
        value: {
          objectID: 'O' + id++, // object ID
          weakData: {} // weak collections IDs
        }
      })
    }

    var fastKey = function (it, create) {
      // return a primitive with prefix
      if (!isObject(it)) return typeof it === 'symbol' ? it : (typeof it === 'string' ? 'S' : 'P') + it
      if (!hasOwn(it, METADATA)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return 'F'
        // not necessary to add metadata
        if (!create) return 'E'
        // add missing metadata
        setMetadata(it)
        // return object ID
      } return it[METADATA].objectID
    }

    var getWeakData = function (it, create) {
      if (!hasOwn(it, METADATA)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) return true
        // not necessary to add metadata
        if (!create) return false
        // add missing metadata
        setMetadata(it)
        // return the store of weak collections IDs
      } return it[METADATA].weakData
    }

    // add metadata on freeze-family methods calling
    var onFreeze = function (it) {
      if (FREEZING && REQUIRED && isExtensible(it) && !hasOwn(it, METADATA)) setMetadata(it)
      return it
    }

    var enable = function () {
      meta.enable = function () { /* empty */ }
      REQUIRED = true
      var getOwnPropertyNames = getOwnPropertyNamesModule.f
      var splice = uncurryThis([].splice)
      var test = {}
      test[METADATA] = 1

      // prevent exposing of metadata key
      if (getOwnPropertyNames(test).length) {
        getOwnPropertyNamesModule.f = function (it) {
          var result = getOwnPropertyNames(it)
          for (var i = 0, length = result.length; i < length; i++) {
            if (result[i] === METADATA) {
              splice(result, i, 1)
              break
            }
          } return result
        }

        $({ target: 'Object', stat: true, forced: true }, {
          getOwnPropertyNames: getOwnPropertyNamesExternalModule.f
        })
      }
    }

    var meta = module.exports = {
      enable: enable,
      fastKey: fastKey,
      getWeakData: getWeakData,
      onFreeze: onFreeze
    }

    hiddenKeys[METADATA] = true
  }, { '../internals/export': 107, '../internals/freezing': 111, '../internals/function-uncurry-this': 120, '../internals/has-own-property': 132, '../internals/hidden-keys': 133, '../internals/is-object': 153, '../internals/object-define-property': 187, '../internals/object-get-own-property-names': 190, '../internals/object-get-own-property-names-external': 189, '../internals/object-is-extensible': 193, '../internals/uid': 277 }],
  143: [function (require, module, exports) {
    'use strict'
    var NATIVE_WEAK_MAP = require('../internals/weak-map-basic-detection')
    var globalThis = require('../internals/global-this')
    var isObject = require('../internals/is-object')
    var createNonEnumerableProperty = require('../internals/create-non-enumerable-property')
    var hasOwn = require('../internals/has-own-property')
    var shared = require('../internals/shared-store')
    var sharedKey = require('../internals/shared-key')
    var hiddenKeys = require('../internals/hidden-keys')

    var OBJECT_ALREADY_INITIALIZED = 'Object already initialized'
    var TypeError = globalThis.TypeError
    var WeakMap = globalThis.WeakMap
    var set, get, has

    var enforce = function (it) {
      return has(it) ? get(it) : set(it, {})
    }

    var getterFor = function (TYPE) {
      return function (it) {
        var state
        if (!isObject(it) || (state = get(it)).type !== TYPE) {
          throw new TypeError('Incompatible receiver, ' + TYPE + ' required')
        } return state
      }
    }

    if (NATIVE_WEAK_MAP || shared.state) {
      var store = shared.state || (shared.state = new WeakMap())
      /* eslint-disable no-self-assign -- prototype methods protection */
      store.get = store.get
      store.has = store.has
      store.set = store.set
      /* eslint-enable no-self-assign -- prototype methods protection */
      set = function (it, metadata) {
        if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED)
        metadata.facade = it
        store.set(it, metadata)
        return metadata
      }
      get = function (it) {
        return store.get(it) || {}
      }
      has = function (it) {
        return store.has(it)
      }
    } else {
      var STATE = sharedKey('state')
      hiddenKeys[STATE] = true
      set = function (it, metadata) {
        if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED)
        metadata.facade = it
        createNonEnumerableProperty(it, STATE, metadata)
        return metadata
      }
      get = function (it) {
        return hasOwn(it, STATE) ? it[STATE] : {}
      }
      has = function (it) {
        return hasOwn(it, STATE)
      }
    }

    module.exports = {
      set: set,
      get: get,
      has: has,
      enforce: enforce,
      getterFor: getterFor
    }
  }, { '../internals/create-non-enumerable-property': 75, '../internals/global-this': 131, '../internals/has-own-property': 132, '../internals/hidden-keys': 133, '../internals/is-object': 153, '../internals/shared-key': 237, '../internals/shared-store': 238, '../internals/weak-map-basic-detection': 282 }],
  144: [function (require, module, exports) {
    'use strict'
    var wellKnownSymbol = require('../internals/well-known-symbol')
    var Iterators = require('../internals/iterators')

    var ITERATOR = wellKnownSymbol('iterator')
    var ArrayPrototype = Array.prototype

    // check on default Array iterator
    module.exports = function (it) {
      return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it)
    }
  }, { '../internals/iterators': 166, '../internals/well-known-symbol': 285 }],
  145: [function (require, module, exports) {
    'use strict'
    var classof = require('../internals/classof-raw')

    // `IsArray` abstract operation
    // https://tc39.es/ecma262/#sec-isarray
    // eslint-disable-next-line es/no-array-isarray -- safe
    module.exports = Array.isArray || function isArray (argument) {
      return classof(argument) === 'Array'
    }
  }, { '../internals/classof-raw': 65 }],
  146: [function (require, module, exports) {
    'use strict'
    var classof = require('../internals/classof')

    module.exports = function (it) {
      var klass = classof(it)
      return klass === 'BigInt64Array' || klass === 'BigUint64Array'
    }
  }, { '../internals/classof': 66 }],
  147: [function (require, module, exports) {
    'use strict'
    // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
    var documentAll = typeof document === 'object' && document.all

    // `IsCallable` abstract operation
    // https://tc39.es/ecma262/#sec-iscallable
    // eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
    module.exports = typeof documentAll === 'undefined' && documentAll !== undefined ? function (argument) {
      return typeof argument === 'function' || argument === documentAll
    } : function (argument) {
      return typeof argument === 'function'
    }
  }, {}],
  148: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')
    var fails = require('../internals/fails')
    var isCallable = require('../internals/is-callable')
    var classof = require('../internals/classof')
    var getBuiltIn = require('../internals/get-built-in')
    var inspectSource = require('../internals/inspect-source')

    var noop = function () { /* empty */ }
    var construct = getBuiltIn('Reflect', 'construct')
    var constructorRegExp = /^\s*(?:class|function)\b/
    var exec = uncurryThis(constructorRegExp.exec)
    var INCORRECT_TO_STRING = !constructorRegExp.test(noop)

    var isConstructorModern = function isConstructor (argument) {
      if (!isCallable(argument)) return false
      try {
        construct(noop, [], argument)
        return true
      } catch (error) {
        return false
      }
    }

    var isConstructorLegacy = function isConstructor (argument) {
      if (!isCallable(argument)) return false
      switch (classof(argument)) {
        case 'AsyncFunction':
        case 'GeneratorFunction':
        case 'AsyncGeneratorFunction': return false
      }
      try {
        // we can't check .prototype since constructors produced by .bind haven't it
        // `Function#toString` throws on some built-it function in some legacy engines
        // (for example, `DOMQuad` and similar in FF41-)
        return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument))
      } catch (error) {
        return true
      }
    }

    isConstructorLegacy.sham = true

    // `IsConstructor` abstract operation
    // https://tc39.es/ecma262/#sec-isconstructor
    module.exports = !construct || fails(function () {
      var called
      return isConstructorModern(isConstructorModern.call) ||
    !isConstructorModern(Object) ||
    !isConstructorModern(function () { called = true }) ||
    called
    }) ? isConstructorLegacy : isConstructorModern
  }, { '../internals/classof': 66, '../internals/fails': 108, '../internals/function-uncurry-this': 120, '../internals/get-built-in': 123, '../internals/inspect-source': 140, '../internals/is-callable': 147 }],
  149: [function (require, module, exports) {
    'use strict'
    var hasOwn = require('../internals/has-own-property')

    module.exports = function (descriptor) {
      return descriptor !== undefined && (hasOwn(descriptor, 'value') || hasOwn(descriptor, 'writable'))
    }
  }, { '../internals/has-own-property': 132 }],
  150: [function (require, module, exports) {
    'use strict'
    var fails = require('../internals/fails')
    var isCallable = require('../internals/is-callable')

    var replacement = /#|\.prototype\./

    var isForced = function (feature, detection) {
      var value = data[normalize(feature)]
      return value === POLYFILL ? true
        : value === NATIVE ? false
          : isCallable(detection) ? fails(detection)
            : !!detection
    }

    var normalize = isForced.normalize = function (string) {
      return String(string).replace(replacement, '.').toLowerCase()
    }

    var data = isForced.data = {}
    var NATIVE = isForced.NATIVE = 'N'
    var POLYFILL = isForced.POLYFILL = 'P'

    module.exports = isForced
  }, { '../internals/fails': 108, '../internals/is-callable': 147 }],
  151: [function (require, module, exports) {
    'use strict'
    var isObject = require('../internals/is-object')

    var floor = Math.floor

    // `IsIntegralNumber` abstract operation
    // https://tc39.es/ecma262/#sec-isintegralnumber
    // eslint-disable-next-line es/no-number-isinteger -- safe
    module.exports = Number.isInteger || function isInteger (it) {
      return !isObject(it) && isFinite(it) && floor(it) === it
    }
  }, { '../internals/is-object': 153 }],
  152: [function (require, module, exports) {
    'use strict'
    // we can't use just `it == null` since of `document.all` special case
    // https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
    module.exports = function (it) {
      return it === null || it === undefined
    }
  }, {}],
  153: [function (require, module, exports) {
    'use strict'
    var isCallable = require('../internals/is-callable')

    module.exports = function (it) {
      return typeof it === 'object' ? it !== null : isCallable(it)
    }
  }, { '../internals/is-callable': 147 }],
  154: [function (require, module, exports) {
    'use strict'
    var isObject = require('../internals/is-object')

    module.exports = function (argument) {
      return isObject(argument) || argument === null
    }
  }, { '../internals/is-object': 153 }],
  155: [function (require, module, exports) {
    'use strict'
    module.exports = false
  }, {}],
  156: [function (require, module, exports) {
    'use strict'
    var isObject = require('../internals/is-object')
    var classof = require('../internals/classof-raw')
    var wellKnownSymbol = require('../internals/well-known-symbol')

    var MATCH = wellKnownSymbol('match')

    // `IsRegExp` abstract operation
    // https://tc39.es/ecma262/#sec-isregexp
    module.exports = function (it) {
      var isRegExp
      return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) === 'RegExp')
    }
  }, { '../internals/classof-raw': 65, '../internals/is-object': 153, '../internals/well-known-symbol': 285 }],
  157: [function (require, module, exports) {
    'use strict'
    var getBuiltIn = require('../internals/get-built-in')
    var isCallable = require('../internals/is-callable')
    var isPrototypeOf = require('../internals/object-is-prototype-of')
    var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid')

    var $Object = Object

    module.exports = USE_SYMBOL_AS_UID ? function (it) {
      return typeof it === 'symbol'
    } : function (it) {
      var $Symbol = getBuiltIn('Symbol')
      return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it))
    }
  }, { '../internals/get-built-in': 123, '../internals/is-callable': 147, '../internals/object-is-prototype-of': 194, '../internals/use-symbol-as-uid': 279 }],
  158: [function (require, module, exports) {
    'use strict'
    var call = require('../internals/function-call')

    module.exports = function (record, fn, ITERATOR_INSTEAD_OF_RECORD) {
      var iterator = ITERATOR_INSTEAD_OF_RECORD ? record : record.iterator
      var next = record.next
      var step, result
      while (!(step = call(next, iterator)).done) {
        result = fn(step.value)
        if (result !== undefined) return result
      }
    }
  }, { '../internals/function-call': 116 }],
  159: [function (require, module, exports) {
    'use strict'
    var bind = require('../internals/function-bind-context')
    var call = require('../internals/function-call')
    var anObject = require('../internals/an-object')
    var tryToString = require('../internals/try-to-string')
    var isArrayIteratorMethod = require('../internals/is-array-iterator-method')
    var lengthOfArrayLike = require('../internals/length-of-array-like')
    var isPrototypeOf = require('../internals/object-is-prototype-of')
    var getIterator = require('../internals/get-iterator')
    var getIteratorMethod = require('../internals/get-iterator-method')
    var iteratorClose = require('../internals/iterator-close')

    var $TypeError = TypeError

    var Result = function (stopped, result) {
      this.stopped = stopped
      this.result = result
    }

    var ResultPrototype = Result.prototype

    module.exports = function (iterable, unboundFunction, options) {
      var that = options && options.that
      var AS_ENTRIES = !!(options && options.AS_ENTRIES)
      var IS_RECORD = !!(options && options.IS_RECORD)
      var IS_ITERATOR = !!(options && options.IS_ITERATOR)
      var INTERRUPTED = !!(options && options.INTERRUPTED)
      var fn = bind(unboundFunction, that)
      var iterator, iterFn, index, length, result, next, step

      var stop = function (condition) {
        if (iterator) iteratorClose(iterator, 'normal', condition)
        return new Result(true, condition)
      }

      var callFn = function (value) {
        if (AS_ENTRIES) {
          anObject(value)
          return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1])
        } return INTERRUPTED ? fn(value, stop) : fn(value)
      }

      if (IS_RECORD) {
        iterator = iterable.iterator
      } else if (IS_ITERATOR) {
        iterator = iterable
      } else {
        iterFn = getIteratorMethod(iterable)
        if (!iterFn) throw new $TypeError(tryToString(iterable) + ' is not iterable')
        // optimisation for array iterators
        if (isArrayIteratorMethod(iterFn)) {
          for (index = 0, length = lengthOfArrayLike(iterable); length > index; index++) {
            result = callFn(iterable[index])
            if (result && isPrototypeOf(ResultPrototype, result)) return result
          } return new Result(false)
        }
        iterator = getIterator(iterable, iterFn)
      }

      next = IS_RECORD ? iterable.next : iterator.next
      while (!(step = call(next, iterator)).done) {
        try {
          result = callFn(step.value)
        } catch (error) {
          iteratorClose(iterator, 'throw', error)
        }
        if (typeof result === 'object' && result && isPrototypeOf(ResultPrototype, result)) return result
      } return new Result(false)
    }
  }, { '../internals/an-object': 30, '../internals/function-bind-context': 113, '../internals/function-call': 116, '../internals/get-iterator': 126, '../internals/get-iterator-method': 125, '../internals/is-array-iterator-method': 144, '../internals/iterator-close': 160, '../internals/length-of-array-like': 167, '../internals/object-is-prototype-of': 194, '../internals/try-to-string': 271 }],
  160: [function (require, module, exports) {
    'use strict'
    var call = require('../internals/function-call')
    var anObject = require('../internals/an-object')
    var getMethod = require('../internals/get-method')

    module.exports = function (iterator, kind, value) {
      var innerResult, innerError
      anObject(iterator)
      try {
        innerResult = getMethod(iterator, 'return')
        if (!innerResult) {
          if (kind === 'throw') throw value
          return value
        }
        innerResult = call(innerResult, iterator)
      } catch (error) {
        innerError = true
        innerResult = error
      }
      if (kind === 'throw') throw value
      if (innerError) throw innerResult
      anObject(innerResult)
      return value
    }
  }, { '../internals/an-object': 30, '../internals/function-call': 116, '../internals/get-method': 128 }],
  161: [function (require, module, exports) {
    'use strict'
    var IteratorPrototype = require('../internals/iterators-core').IteratorPrototype
    var create = require('../internals/object-create')
    var createPropertyDescriptor = require('../internals/create-property-descriptor')
    var setToStringTag = require('../internals/set-to-string-tag')
    var Iterators = require('../internals/iterators')

    var returnThis = function () { return this }

    module.exports = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
      var TO_STRING_TAG = NAME + ' Iterator'
      IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) })
      setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true)
      Iterators[TO_STRING_TAG] = returnThis
      return IteratorConstructor
    }
  }, { '../internals/create-property-descriptor': 76, '../internals/iterators': 166, '../internals/iterators-core': 165, '../internals/object-create': 185, '../internals/set-to-string-tag': 235 }],
  162: [function (require, module, exports) {
    'use strict'
    var call = require('../internals/function-call')
    var create = require('../internals/object-create')
    var createNonEnumerableProperty = require('../internals/create-non-enumerable-property')
    var defineBuiltIns = require('../internals/define-built-ins')
    var wellKnownSymbol = require('../internals/well-known-symbol')
    var InternalStateModule = require('../internals/internal-state')
    var getMethod = require('../internals/get-method')
    var IteratorPrototype = require('../internals/iterators-core').IteratorPrototype
    var createIterResultObject = require('../internals/create-iter-result-object')
    var iteratorClose = require('../internals/iterator-close')

    var TO_STRING_TAG = wellKnownSymbol('toStringTag')
    var ITERATOR_HELPER = 'IteratorHelper'
    var WRAP_FOR_VALID_ITERATOR = 'WrapForValidIterator'
    var setInternalState = InternalStateModule.set

    var createIteratorProxyPrototype = function (IS_ITERATOR) {
      var getInternalState = InternalStateModule.getterFor(IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER)

      return defineBuiltIns(create(IteratorPrototype), {
        next: function next () {
          var state = getInternalState(this)
          // for simplification:
          //   for `%WrapForValidIteratorPrototype%.next` our `nextHandler` returns `IterResultObject`
          //   for `%IteratorHelperPrototype%.next` - just a value
          if (IS_ITERATOR) return state.nextHandler()
          try {
            var result = state.done ? undefined : state.nextHandler()
            return createIterResultObject(result, state.done)
          } catch (error) {
            state.done = true
            throw error
          }
        },
        return: function () {
          var state = getInternalState(this)
          var iterator = state.iterator
          state.done = true
          if (IS_ITERATOR) {
            var returnMethod = getMethod(iterator, 'return')
            return returnMethod ? call(returnMethod, iterator) : createIterResultObject(undefined, true)
          }
          if (state.inner) {
            try {
              iteratorClose(state.inner.iterator, 'normal')
            } catch (error) {
              return iteratorClose(iterator, 'throw', error)
            }
          }
          iteratorClose(iterator, 'normal')
          return createIterResultObject(undefined, true)
        }
      })
    }

    var WrapForValidIteratorPrototype = createIteratorProxyPrototype(true)
    var IteratorHelperPrototype = createIteratorProxyPrototype(false)

    createNonEnumerableProperty(IteratorHelperPrototype, TO_STRING_TAG, 'Iterator Helper')

    module.exports = function (nextHandler, IS_ITERATOR) {
      var IteratorProxy = function Iterator (record, state) {
        if (state) {
          state.iterator = record.iterator
          state.next = record.next
        } else state = record
        state.type = IS_ITERATOR ? WRAP_FOR_VALID_ITERATOR : ITERATOR_HELPER
        state.nextHandler = nextHandler
        state.counter = 0
        state.done = false
        setInternalState(this, state)
      }

      IteratorProxy.prototype = IS_ITERATOR ? WrapForValidIteratorPrototype : IteratorHelperPrototype

      return IteratorProxy
    }
  }, { '../internals/create-iter-result-object': 74, '../internals/create-non-enumerable-property': 75, '../internals/define-built-ins': 82, '../internals/function-call': 116, '../internals/get-method': 128, '../internals/internal-state': 143, '../internals/iterator-close': 160, '../internals/iterators-core': 165, '../internals/object-create': 185, '../internals/well-known-symbol': 285 }],
  163: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var call = require('../internals/function-call')
    var IS_PURE = require('../internals/is-pure')
    var FunctionName = require('../internals/function-name')
    var isCallable = require('../internals/is-callable')
    var createIteratorConstructor = require('../internals/iterator-create-constructor')
    var getPrototypeOf = require('../internals/object-get-prototype-of')
    var setPrototypeOf = require('../internals/object-set-prototype-of')
    var setToStringTag = require('../internals/set-to-string-tag')
    var createNonEnumerableProperty = require('../internals/create-non-enumerable-property')
    var defineBuiltIn = require('../internals/define-built-in')
    var wellKnownSymbol = require('../internals/well-known-symbol')
    var Iterators = require('../internals/iterators')
    var IteratorsCore = require('../internals/iterators-core')

    var PROPER_FUNCTION_NAME = FunctionName.PROPER
    var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE
    var IteratorPrototype = IteratorsCore.IteratorPrototype
    var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS
    var ITERATOR = wellKnownSymbol('iterator')
    var KEYS = 'keys'
    var VALUES = 'values'
    var ENTRIES = 'entries'

    var returnThis = function () { return this }

    module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
      createIteratorConstructor(IteratorConstructor, NAME, next)

      var getIterationMethod = function (KIND) {
        if (KIND === DEFAULT && defaultIterator) return defaultIterator
        if (!BUGGY_SAFARI_ITERATORS && KIND && KIND in IterablePrototype) return IterablePrototype[KIND]

        switch (KIND) {
          case KEYS: return function keys () { return new IteratorConstructor(this, KIND) }
          case VALUES: return function values () { return new IteratorConstructor(this, KIND) }
          case ENTRIES: return function entries () { return new IteratorConstructor(this, KIND) }
        }

        return function () { return new IteratorConstructor(this) }
      }

      var TO_STRING_TAG = NAME + ' Iterator'
      var INCORRECT_VALUES_NAME = false
      var IterablePrototype = Iterable.prototype
      var nativeIterator = IterablePrototype[ITERATOR] ||
    IterablePrototype['@@iterator'] ||
    DEFAULT && IterablePrototype[DEFAULT]
      var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT)
      var anyNativeIterator = NAME === 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator
      var CurrentIteratorPrototype, methods, KEY

      // fix native
      if (anyNativeIterator) {
        CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()))
        if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
          if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
            if (setPrototypeOf) {
              setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype)
            } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
              defineBuiltIn(CurrentIteratorPrototype, ITERATOR, returnThis)
            }
          }
          // Set @@toStringTag to native iterators
          setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true)
          if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis
        }
      }

      // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
      if (PROPER_FUNCTION_NAME && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
        if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
          createNonEnumerableProperty(IterablePrototype, 'name', VALUES)
        } else {
          INCORRECT_VALUES_NAME = true
          defaultIterator = function values () { return call(nativeIterator, this) }
        }
      }

      // export additional methods
      if (DEFAULT) {
        methods = {
          values: getIterationMethod(VALUES),
          keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
          entries: getIterationMethod(ENTRIES)
        }
        if (FORCED) {
          for (KEY in methods) {
            if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
              defineBuiltIn(IterablePrototype, KEY, methods[KEY])
            }
          }
        } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods)
      }

      // define iterator
      if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
        defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT })
      }
      Iterators[NAME] = defaultIterator

      return methods
    }
  }, { '../internals/create-non-enumerable-property': 75, '../internals/define-built-in': 81, '../internals/export': 107, '../internals/function-call': 116, '../internals/function-name': 117, '../internals/is-callable': 147, '../internals/is-pure': 155, '../internals/iterator-create-constructor': 161, '../internals/iterators': 166, '../internals/iterators-core': 165, '../internals/object-get-prototype-of': 192, '../internals/object-set-prototype-of': 199, '../internals/set-to-string-tag': 235, '../internals/well-known-symbol': 285 }],
  164: [function (require, module, exports) {
    'use strict'
    var call = require('../internals/function-call')
    var aCallable = require('../internals/a-callable')
    var anObject = require('../internals/an-object')
    var getIteratorDirect = require('../internals/get-iterator-direct')
    var createIteratorProxy = require('../internals/iterator-create-proxy')
    var callWithSafeIterationClosing = require('../internals/call-with-safe-iteration-closing')

    var IteratorProxy = createIteratorProxy(function () {
      var iterator = this.iterator
      var result = anObject(call(this.next, iterator))
      var done = this.done = !!result.done
      if (!done) return callWithSafeIterationClosing(iterator, this.mapper, [result.value, this.counter++], true)
    })

    // `Iterator.prototype.map` method
    // https://github.com/tc39/proposal-iterator-helpers
    module.exports = function map (mapper) {
      anObject(this)
      aCallable(mapper)
      return new IteratorProxy(getIteratorDirect(this), {
        mapper: mapper
      })
    }
  }, { '../internals/a-callable': 23, '../internals/an-object': 30, '../internals/call-with-safe-iteration-closing': 63, '../internals/function-call': 116, '../internals/get-iterator-direct': 124, '../internals/iterator-create-proxy': 162 }],
  165: [function (require, module, exports) {
    'use strict'
    var fails = require('../internals/fails')
    var isCallable = require('../internals/is-callable')
    var isObject = require('../internals/is-object')
    var create = require('../internals/object-create')
    var getPrototypeOf = require('../internals/object-get-prototype-of')
    var defineBuiltIn = require('../internals/define-built-in')
    var wellKnownSymbol = require('../internals/well-known-symbol')
    var IS_PURE = require('../internals/is-pure')

    var ITERATOR = wellKnownSymbol('iterator')
    var BUGGY_SAFARI_ITERATORS = false

    // `%IteratorPrototype%` object
    // https://tc39.es/ecma262/#sec-%iteratorprototype%-object
    var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator

    /* eslint-disable es/no-array-prototype-keys -- safe */
    if ([].keys) {
      arrayIterator = [].keys()
      // Safari 8 has buggy iterators w/o `next`
      if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true
      else {
        PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator))
        if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype
      }
    }

    var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype) || fails(function () {
      var test = {}
      // FF44- legacy iterators case
      return IteratorPrototype[ITERATOR].call(test) !== test
    })

    if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {}
    else if (IS_PURE) IteratorPrototype = create(IteratorPrototype)

    // `%IteratorPrototype%[@@iterator]()` method
    // https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
    if (!isCallable(IteratorPrototype[ITERATOR])) {
      defineBuiltIn(IteratorPrototype, ITERATOR, function () {
        return this
      })
    }

    module.exports = {
      IteratorPrototype: IteratorPrototype,
      BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
    }
  }, { '../internals/define-built-in': 81, '../internals/fails': 108, '../internals/is-callable': 147, '../internals/is-object': 153, '../internals/is-pure': 155, '../internals/object-create': 185, '../internals/object-get-prototype-of': 192, '../internals/well-known-symbol': 285 }],
  166: [function (require, module, exports) {
    arguments[4][133][0].apply(exports, arguments)
  }, { dup: 133 }],
  167: [function (require, module, exports) {
    'use strict'
    var toLength = require('../internals/to-length')

    // `LengthOfArrayLike` abstract operation
    // https://tc39.es/ecma262/#sec-lengthofarraylike
    module.exports = function (obj) {
      return toLength(obj.length)
    }
  }, { '../internals/to-length': 262 }],
  168: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')
    var fails = require('../internals/fails')
    var isCallable = require('../internals/is-callable')
    var hasOwn = require('../internals/has-own-property')
    var DESCRIPTORS = require('../internals/descriptors')
    var CONFIGURABLE_FUNCTION_NAME = require('../internals/function-name').CONFIGURABLE
    var inspectSource = require('../internals/inspect-source')
    var InternalStateModule = require('../internals/internal-state')

    var enforceInternalState = InternalStateModule.enforce
    var getInternalState = InternalStateModule.get
    var $String = String
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    var defineProperty = Object.defineProperty
    var stringSlice = uncurryThis(''.slice)
    var replace = uncurryThis(''.replace)
    var join = uncurryThis([].join)

    var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
      return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8
    })

    var TEMPLATE = String(String).split('String')

    var makeBuiltIn = module.exports = function (value, name, options) {
      if (stringSlice($String(name), 0, 7) === 'Symbol(') {
        name = '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']'
      }
      if (options && options.getter) name = 'get ' + name
      if (options && options.setter) name = 'set ' + name
      if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
        if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true })
        else value.name = name
      }
      if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
        defineProperty(value, 'length', { value: options.arity })
      }
      try {
        if (options && hasOwn(options, 'constructor') && options.constructor) {
          if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false })
          // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
        } else if (value.prototype) value.prototype = undefined
      } catch (error) { /* empty */ }
      var state = enforceInternalState(value)
      if (!hasOwn(state, 'source')) {
        state.source = join(TEMPLATE, typeof name === 'string' ? name : '')
      } return value
    }

    // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
    // eslint-disable-next-line no-extend-native -- required
    Function.prototype.toString = makeBuiltIn(function toString () {
      return isCallable(this) && getInternalState(this).source || inspectSource(this)
    }, 'toString')
  }, { '../internals/descriptors': 85, '../internals/fails': 108, '../internals/function-name': 117, '../internals/function-uncurry-this': 120, '../internals/has-own-property': 132, '../internals/inspect-source': 140, '../internals/internal-state': 143, '../internals/is-callable': 147 }],
  169: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')

    // eslint-disable-next-line es/no-map -- safe
    var MapPrototype = Map.prototype

    module.exports = {
      // eslint-disable-next-line es/no-map -- safe
      Map: Map,
      set: uncurryThis(MapPrototype.set),
      get: uncurryThis(MapPrototype.get),
      has: uncurryThis(MapPrototype.has),
      remove: uncurryThis(MapPrototype.delete),
      proto: MapPrototype
    }
  }, { '../internals/function-uncurry-this': 120 }],
  170: [function (require, module, exports) {
    'use strict'
    // eslint-disable-next-line es/no-math-expm1 -- safe
    var $expm1 = Math.expm1
    var exp = Math.exp

    // `Math.expm1` method implementation
    // https://tc39.es/ecma262/#sec-math.expm1
    module.exports = (!$expm1 ||
  // Old FF bug
  // eslint-disable-next-line no-loss-of-precision -- required for old engines
  $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168 ||
  // Tor Browser bug
  $expm1(-2e-17) !== -2e-17
    ) ? function expm1 (x) {
        var n = +x
        return n === 0 ? n : n > -1e-6 && n < 1e-6 ? n + n * n / 2 : exp(n) - 1
      } : $expm1
  }, {}],
  171: [function (require, module, exports) {
    'use strict'
    var sign = require('../internals/math-sign')

    var abs = Math.abs

    var EPSILON = 2.220446049250313e-16 // Number.EPSILON
    var INVERSE_EPSILON = 1 / EPSILON

    var roundTiesToEven = function (n) {
      return n + INVERSE_EPSILON - INVERSE_EPSILON
    }

    module.exports = function (x, FLOAT_EPSILON, FLOAT_MAX_VALUE, FLOAT_MIN_VALUE) {
      var n = +x
      var absolute = abs(n)
      var s = sign(n)
      if (absolute < FLOAT_MIN_VALUE) return s * roundTiesToEven(absolute / FLOAT_MIN_VALUE / FLOAT_EPSILON) * FLOAT_MIN_VALUE * FLOAT_EPSILON
      var a = (1 + FLOAT_EPSILON / EPSILON) * absolute
      var result = a - (a - absolute)
      // eslint-disable-next-line no-self-compare -- NaN check
      if (result > FLOAT_MAX_VALUE || result !== result) return s * Infinity
      return s * result
    }
  }, { '../internals/math-sign': 175 }],
  172: [function (require, module, exports) {
    'use strict'
    var floatRound = require('../internals/math-float-round')

    var FLOAT32_EPSILON = 1.1920928955078125e-7 // 2 ** -23;
    var FLOAT32_MAX_VALUE = 3.4028234663852886e+38 // 2 ** 128 - 2 ** 104
    var FLOAT32_MIN_VALUE = 1.1754943508222875e-38 // 2 ** -126;

    // `Math.fround` method implementation
    // https://tc39.es/ecma262/#sec-math.fround
    // eslint-disable-next-line es/no-math-fround -- safe
    module.exports = Math.fround || function fround (x) {
      return floatRound(x, FLOAT32_EPSILON, FLOAT32_MAX_VALUE, FLOAT32_MIN_VALUE)
    }
  }, { '../internals/math-float-round': 171 }],
  173: [function (require, module, exports) {
    'use strict'
    var log = Math.log
    var LOG10E = Math.LOG10E

    // eslint-disable-next-line es/no-math-log10 -- safe
    module.exports = Math.log10 || function log10 (x) {
      return log(x) * LOG10E
    }
  }, {}],
  174: [function (require, module, exports) {
    'use strict'
    var log = Math.log

    // `Math.log1p` method implementation
    // https://tc39.es/ecma262/#sec-math.log1p
    // eslint-disable-next-line es/no-math-log1p -- safe
    module.exports = Math.log1p || function log1p (x) {
      var n = +x
      return n > -1e-8 && n < 1e-8 ? n - n * n / 2 : log(1 + n)
    }
  }, {}],
  175: [function (require, module, exports) {
    'use strict'
    // `Math.sign` method implementation
    // https://tc39.es/ecma262/#sec-math.sign
    // eslint-disable-next-line es/no-math-sign -- safe
    module.exports = Math.sign || function sign (x) {
      var n = +x
      // eslint-disable-next-line no-self-compare -- NaN check
      return n === 0 || n !== n ? n : n < 0 ? -1 : 1
    }
  }, {}],
  176: [function (require, module, exports) {
    'use strict'
    var ceil = Math.ceil
    var floor = Math.floor

    // `Math.trunc` method
    // https://tc39.es/ecma262/#sec-math.trunc
    // eslint-disable-next-line es/no-math-trunc -- safe
    module.exports = Math.trunc || function trunc (x) {
      var n = +x
      return (n > 0 ? floor : ceil)(n)
    }
  }, {}],
  177: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')
    var safeGetBuiltIn = require('../internals/safe-get-built-in')
    var bind = require('../internals/function-bind-context')
    var macrotask = require('../internals/task').set
    var Queue = require('../internals/queue')
    var IS_IOS = require('../internals/environment-is-ios')
    var IS_IOS_PEBBLE = require('../internals/environment-is-ios-pebble')
    var IS_WEBOS_WEBKIT = require('../internals/environment-is-webos-webkit')
    var IS_NODE = require('../internals/environment-is-node')

    var MutationObserver = globalThis.MutationObserver || globalThis.WebKitMutationObserver
    var document = globalThis.document
    var process = globalThis.process
    var Promise = globalThis.Promise
    var microtask = safeGetBuiltIn('queueMicrotask')
    var notify, toggle, node, promise, then

    // modern engines have queueMicrotask method
    if (!microtask) {
      var queue = new Queue()

      var flush = function () {
        var parent, fn
        if (IS_NODE && (parent = process.domain)) parent.exit()
        while (fn = queue.get()) {
          try {
            fn()
          } catch (error) {
            if (queue.head) notify()
            throw error
          }
        }
        if (parent) parent.enter()
      }

      // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
      // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
      if (!IS_IOS && !IS_NODE && !IS_WEBOS_WEBKIT && MutationObserver && document) {
        toggle = true
        node = document.createTextNode('')
        new MutationObserver(flush).observe(node, { characterData: true })
        notify = function () {
          node.data = toggle = !toggle
        }
      // environments with maybe non-completely correct, but existent Promise
      } else if (!IS_IOS_PEBBLE && Promise && Promise.resolve) {
        // Promise.resolve without an argument throws an error in LG WebOS 2
        promise = Promise.resolve(undefined)
        // workaround of WebKit ~ iOS Safari 10.1 bug
        promise.constructor = Promise
        then = bind(promise.then, promise)
        notify = function () {
          then(flush)
        }
      // Node.js without promises
      } else if (IS_NODE) {
        notify = function () {
          process.nextTick(flush)
        }
      // for other environments - macrotask based on:
      // - setImmediate
      // - MessageChannel
      // - window.postMessage
      // - onreadystatechange
      // - setTimeout
      } else {
        // `webpack` dev server bug on IE global methods - use bind(fn, global)
        macrotask = bind(macrotask, globalThis)
        notify = function () {
          macrotask(flush)
        }
      }

      microtask = function (fn) {
        if (!queue.head) notify()
        queue.add(fn)
      }
    }

    module.exports = microtask
  }, { '../internals/environment-is-ios': 96, '../internals/environment-is-ios-pebble': 95, '../internals/environment-is-node': 97, '../internals/environment-is-webos-webkit': 98, '../internals/function-bind-context': 113, '../internals/global-this': 131, '../internals/queue': 211, '../internals/safe-get-built-in': 220, '../internals/task': 255 }],
  178: [function (require, module, exports) {
    'use strict'
    var aCallable = require('../internals/a-callable')

    var $TypeError = TypeError

    var PromiseCapability = function (C) {
      var resolve, reject
      this.promise = new C(function ($$resolve, $$reject) {
        if (resolve !== undefined || reject !== undefined) throw new $TypeError('Bad Promise constructor')
        resolve = $$resolve
        reject = $$reject
      })
      this.resolve = aCallable(resolve)
      this.reject = aCallable(reject)
    }

    // `NewPromiseCapability` abstract operation
    // https://tc39.es/ecma262/#sec-newpromisecapability
    module.exports.f = function (C) {
      return new PromiseCapability(C)
    }
  }, { '../internals/a-callable': 23 }],
  179: [function (require, module, exports) {
    'use strict'
    var toString = require('../internals/to-string')

    module.exports = function (argument, $default) {
      return argument === undefined ? arguments.length < 2 ? '' : $default : toString(argument)
    }
  }, { '../internals/to-string': 269 }],
  180: [function (require, module, exports) {
    'use strict'
    var isRegExp = require('../internals/is-regexp')

    var $TypeError = TypeError

    module.exports = function (it) {
      if (isRegExp(it)) {
        throw new $TypeError("The method doesn't accept regular expressions")
      } return it
    }
  }, { '../internals/is-regexp': 156 }],
  181: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')

    var globalIsFinite = globalThis.isFinite

    // `Number.isFinite` method
    // https://tc39.es/ecma262/#sec-number.isfinite
    // eslint-disable-next-line es/no-number-isfinite -- safe
    module.exports = Number.isFinite || function isFinite (it) {
      return typeof it === 'number' && globalIsFinite(it)
    }
  }, { '../internals/global-this': 131 }],
  182: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')
    var fails = require('../internals/fails')
    var uncurryThis = require('../internals/function-uncurry-this')
    var toString = require('../internals/to-string')
    var trim = require('../internals/string-trim').trim
    var whitespaces = require('../internals/whitespaces')

    var charAt = uncurryThis(''.charAt)
    var $parseFloat = globalThis.parseFloat
    var Symbol = globalThis.Symbol
    var ITERATOR = Symbol && Symbol.iterator
    var FORCED = 1 / $parseFloat(whitespaces + '-0') !== -Infinity ||
  // MS Edge 18- broken with boxed symbols
  (ITERATOR && !fails(function () { $parseFloat(Object(ITERATOR)) }))

    // `parseFloat` method
    // https://tc39.es/ecma262/#sec-parsefloat-string
    module.exports = FORCED ? function parseFloat (string) {
      var trimmedString = trim(toString(string))
      var result = $parseFloat(trimmedString)
      return result === 0 && charAt(trimmedString, 0) === '-' ? -0 : result
    } : $parseFloat
  }, { '../internals/fails': 108, '../internals/function-uncurry-this': 120, '../internals/global-this': 131, '../internals/string-trim': 250, '../internals/to-string': 269, '../internals/whitespaces': 286 }],
  183: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')
    var fails = require('../internals/fails')
    var uncurryThis = require('../internals/function-uncurry-this')
    var toString = require('../internals/to-string')
    var trim = require('../internals/string-trim').trim
    var whitespaces = require('../internals/whitespaces')

    var $parseInt = globalThis.parseInt
    var Symbol = globalThis.Symbol
    var ITERATOR = Symbol && Symbol.iterator
    var hex = /^[+-]?0x/i
    var exec = uncurryThis(hex.exec)
    var FORCED = $parseInt(whitespaces + '08') !== 8 || $parseInt(whitespaces + '0x16') !== 22 ||
  // MS Edge 18- broken with boxed symbols
  (ITERATOR && !fails(function () { $parseInt(Object(ITERATOR)) }))

    // `parseInt` method
    // https://tc39.es/ecma262/#sec-parseint-string-radix
    module.exports = FORCED ? function parseInt (string, radix) {
      var S = trim(toString(string))
      return $parseInt(S, (radix >>> 0) || (exec(hex, S) ? 16 : 10))
    } : $parseInt
  }, { '../internals/fails': 108, '../internals/function-uncurry-this': 120, '../internals/global-this': 131, '../internals/string-trim': 250, '../internals/to-string': 269, '../internals/whitespaces': 286 }],
  184: [function (require, module, exports) {
    'use strict'
    var DESCRIPTORS = require('../internals/descriptors')
    var uncurryThis = require('../internals/function-uncurry-this')
    var call = require('../internals/function-call')
    var fails = require('../internals/fails')
    var objectKeys = require('../internals/object-keys')
    var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols')
    var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable')
    var toObject = require('../internals/to-object')
    var IndexedObject = require('../internals/indexed-object')

    // eslint-disable-next-line es/no-object-assign -- safe
    var $assign = Object.assign
    // eslint-disable-next-line es/no-object-defineproperty -- required for testing
    var defineProperty = Object.defineProperty
    var concat = uncurryThis([].concat)

    // `Object.assign` method
    // https://tc39.es/ecma262/#sec-object.assign
    module.exports = !$assign || fails(function () {
      // should have correct order of operations (Edge bug)
      if (DESCRIPTORS && $assign({ b: 1 }, $assign(defineProperty({}, 'a', {
        enumerable: true,
        get: function () {
          defineProperty(this, 'b', {
            value: 3,
            enumerable: false
          })
        }
      }), { b: 2 })).b !== 1) return true
      // should work with symbols and should have deterministic property order (V8 bug)
      var A = {}
      var B = {}
      // eslint-disable-next-line es/no-symbol -- safe
      var symbol = Symbol('assign detection')
      var alphabet = 'abcdefghijklmnopqrst'
      A[symbol] = 7
      alphabet.split('').forEach(function (chr) { B[chr] = chr })
      return $assign({}, A)[symbol] !== 7 || objectKeys($assign({}, B)).join('') !== alphabet
    }) ? function assign (target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
        var T = toObject(target)
        var argumentsLength = arguments.length
        var index = 1
        var getOwnPropertySymbols = getOwnPropertySymbolsModule.f
        var propertyIsEnumerable = propertyIsEnumerableModule.f
        while (argumentsLength > index) {
          var S = IndexedObject(arguments[index++])
          var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S)
          var length = keys.length
          var j = 0
          var key
          while (length > j) {
            key = keys[j++]
            if (!DESCRIPTORS || call(propertyIsEnumerable, S, key)) T[key] = S[key]
          }
        } return T
      } : $assign
  }, { '../internals/descriptors': 85, '../internals/fails': 108, '../internals/function-call': 116, '../internals/function-uncurry-this': 120, '../internals/indexed-object': 138, '../internals/object-get-own-property-symbols': 191, '../internals/object-keys': 196, '../internals/object-property-is-enumerable': 197, '../internals/to-object': 263 }],
  185: [function (require, module, exports) {
    'use strict'
    /* global ActiveXObject -- old IE, WSH */
    var anObject = require('../internals/an-object')
    var definePropertiesModule = require('../internals/object-define-properties')
    var enumBugKeys = require('../internals/enum-bug-keys')
    var hiddenKeys = require('../internals/hidden-keys')
    var html = require('../internals/html')
    var documentCreateElement = require('../internals/document-create-element')
    var sharedKey = require('../internals/shared-key')

    var GT = '>'
    var LT = '<'
    var PROTOTYPE = 'prototype'
    var SCRIPT = 'script'
    var IE_PROTO = sharedKey('IE_PROTO')

    var EmptyConstructor = function () { /* empty */ }

    var scriptTag = function (content) {
      return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT
    }

    // Create object with fake `null` prototype: use ActiveX Object with cleared prototype
    var NullProtoObjectViaActiveX = function (activeXDocument) {
      activeXDocument.write(scriptTag(''))
      activeXDocument.close()
      var temp = activeXDocument.parentWindow.Object
      // eslint-disable-next-line no-useless-assignment -- avoid memory leak
      activeXDocument = null
      return temp
    }

    // Create object with fake `null` prototype: use iframe Object with cleared prototype
    var NullProtoObjectViaIFrame = function () {
      // Thrash, waste and sodomy: IE GC bug
      var iframe = documentCreateElement('iframe')
      var JS = 'java' + SCRIPT + ':'
      var iframeDocument
      iframe.style.display = 'none'
      html.appendChild(iframe)
      // https://github.com/zloirock/core-js/issues/475
      iframe.src = String(JS)
      iframeDocument = iframe.contentWindow.document
      iframeDocument.open()
      iframeDocument.write(scriptTag('document.F=Object'))
      iframeDocument.close()
      return iframeDocument.F
    }

    // Check for document.domain and active x support
    // No need to use active x approach when document.domain is not set
    // see https://github.com/es-shims/es5-shim/issues/150
    // variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
    // avoid IE GC bug
    var activeXDocument
    var NullProtoObject = function () {
      try {
        activeXDocument = new ActiveXObject('htmlfile')
      } catch (error) { /* ignore */ }
      NullProtoObject = typeof document !== 'undefined'
        ? document.domain && activeXDocument
          ? NullProtoObjectViaActiveX(activeXDocument) // old IE
          : NullProtoObjectViaIFrame()
        : NullProtoObjectViaActiveX(activeXDocument) // WSH
      var length = enumBugKeys.length
      while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]]
      return NullProtoObject()
    }

    hiddenKeys[IE_PROTO] = true

    // `Object.create` method
    // https://tc39.es/ecma262/#sec-object.create
    // eslint-disable-next-line es/no-object-create -- safe
    module.exports = Object.create || function create (O, Properties) {
      var result
      if (O !== null) {
        EmptyConstructor[PROTOTYPE] = anObject(O)
        result = new EmptyConstructor()
        EmptyConstructor[PROTOTYPE] = null
        // add "__proto__" for Object.getPrototypeOf polyfill
        result[IE_PROTO] = O
      } else result = NullProtoObject()
      return Properties === undefined ? result : definePropertiesModule.f(result, Properties)
    }
  }, { '../internals/an-object': 30, '../internals/document-create-element': 87, '../internals/enum-bug-keys': 92, '../internals/hidden-keys': 133, '../internals/html': 135, '../internals/object-define-properties': 186, '../internals/shared-key': 237 }],
  186: [function (require, module, exports) {
    'use strict'
    var DESCRIPTORS = require('../internals/descriptors')
    var V8_PROTOTYPE_DEFINE_BUG = require('../internals/v8-prototype-define-bug')
    var definePropertyModule = require('../internals/object-define-property')
    var anObject = require('../internals/an-object')
    var toIndexedObject = require('../internals/to-indexed-object')
    var objectKeys = require('../internals/object-keys')

    // `Object.defineProperties` method
    // https://tc39.es/ecma262/#sec-object.defineproperties
    // eslint-disable-next-line es/no-object-defineproperties -- safe
    exports.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties (O, Properties) {
      anObject(O)
      var props = toIndexedObject(Properties)
      var keys = objectKeys(Properties)
      var length = keys.length
      var index = 0
      var key
      while (length > index) definePropertyModule.f(O, key = keys[index++], props[key])
      return O
    }
  }, { '../internals/an-object': 30, '../internals/descriptors': 85, '../internals/object-define-property': 187, '../internals/object-keys': 196, '../internals/to-indexed-object': 260, '../internals/v8-prototype-define-bug': 280 }],
  187: [function (require, module, exports) {
    'use strict'
    var DESCRIPTORS = require('../internals/descriptors')
    var IE8_DOM_DEFINE = require('../internals/ie8-dom-define')
    var V8_PROTOTYPE_DEFINE_BUG = require('../internals/v8-prototype-define-bug')
    var anObject = require('../internals/an-object')
    var toPropertyKey = require('../internals/to-property-key')

    var $TypeError = TypeError
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    var $defineProperty = Object.defineProperty
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor
    var ENUMERABLE = 'enumerable'
    var CONFIGURABLE = 'configurable'
    var WRITABLE = 'writable'

    // `Object.defineProperty` method
    // https://tc39.es/ecma262/#sec-object.defineproperty
    exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty (O, P, Attributes) {
      anObject(O)
      P = toPropertyKey(P)
      anObject(Attributes)
      if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
        var current = $getOwnPropertyDescriptor(O, P)
        if (current && current[WRITABLE]) {
          O[P] = Attributes.value
          Attributes = {
            configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
            enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
            writable: false
          }
        }
      } return $defineProperty(O, P, Attributes)
    } : $defineProperty : function defineProperty (O, P, Attributes) {
      anObject(O)
      P = toPropertyKey(P)
      anObject(Attributes)
      if (IE8_DOM_DEFINE) {
        try {
          return $defineProperty(O, P, Attributes)
        } catch (error) { /* empty */ }
      }
      if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported')
      if ('value' in Attributes) O[P] = Attributes.value
      return O
    }
  }, { '../internals/an-object': 30, '../internals/descriptors': 85, '../internals/ie8-dom-define': 136, '../internals/to-property-key': 267, '../internals/v8-prototype-define-bug': 280 }],
  188: [function (require, module, exports) {
    'use strict'
    var DESCRIPTORS = require('../internals/descriptors')
    var call = require('../internals/function-call')
    var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable')
    var createPropertyDescriptor = require('../internals/create-property-descriptor')
    var toIndexedObject = require('../internals/to-indexed-object')
    var toPropertyKey = require('../internals/to-property-key')
    var hasOwn = require('../internals/has-own-property')
    var IE8_DOM_DEFINE = require('../internals/ie8-dom-define')

    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor

    // `Object.getOwnPropertyDescriptor` method
    // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
    exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor (O, P) {
      O = toIndexedObject(O)
      P = toPropertyKey(P)
      if (IE8_DOM_DEFINE) {
        try {
          return $getOwnPropertyDescriptor(O, P)
        } catch (error) { /* empty */ }
      }
      if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P])
    }
  }, { '../internals/create-property-descriptor': 76, '../internals/descriptors': 85, '../internals/function-call': 116, '../internals/has-own-property': 132, '../internals/ie8-dom-define': 136, '../internals/object-property-is-enumerable': 197, '../internals/to-indexed-object': 260, '../internals/to-property-key': 267 }],
  189: [function (require, module, exports) {
    'use strict'
    /* eslint-disable es/no-object-getownpropertynames -- safe */
    var classof = require('../internals/classof-raw')
    var toIndexedObject = require('../internals/to-indexed-object')
    var $getOwnPropertyNames = require('../internals/object-get-own-property-names').f
    var arraySlice = require('../internals/array-slice')

    var windowNames = typeof window === 'object' && window && Object.getOwnPropertyNames
      ? Object.getOwnPropertyNames(window) : []

    var getWindowNames = function (it) {
      try {
        return $getOwnPropertyNames(it)
      } catch (error) {
        return arraySlice(windowNames)
      }
    }

    // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
    module.exports.f = function getOwnPropertyNames (it) {
      return windowNames && classof(it) === 'Window'
        ? getWindowNames(it)
        : $getOwnPropertyNames(toIndexedObject(it))
    }
  }, { '../internals/array-slice': 52, '../internals/classof-raw': 65, '../internals/object-get-own-property-names': 190, '../internals/to-indexed-object': 260 }],
  190: [function (require, module, exports) {
    'use strict'
    var internalObjectKeys = require('../internals/object-keys-internal')
    var enumBugKeys = require('../internals/enum-bug-keys')

    var hiddenKeys = enumBugKeys.concat('length', 'prototype')

    // `Object.getOwnPropertyNames` method
    // https://tc39.es/ecma262/#sec-object.getownpropertynames
    // eslint-disable-next-line es/no-object-getownpropertynames -- safe
    exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames (O) {
      return internalObjectKeys(O, hiddenKeys)
    }
  }, { '../internals/enum-bug-keys': 92, '../internals/object-keys-internal': 195 }],
  191: [function (require, module, exports) {
    'use strict'
    // eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
    exports.f = Object.getOwnPropertySymbols
  }, {}],
  192: [function (require, module, exports) {
    'use strict'
    var hasOwn = require('../internals/has-own-property')
    var isCallable = require('../internals/is-callable')
    var toObject = require('../internals/to-object')
    var sharedKey = require('../internals/shared-key')
    var CORRECT_PROTOTYPE_GETTER = require('../internals/correct-prototype-getter')

    var IE_PROTO = sharedKey('IE_PROTO')
    var $Object = Object
    var ObjectPrototype = $Object.prototype

    // `Object.getPrototypeOf` method
    // https://tc39.es/ecma262/#sec-object.getprototypeof
    // eslint-disable-next-line es/no-object-getprototypeof -- safe
    module.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
      var object = toObject(O)
      if (hasOwn(object, IE_PROTO)) return object[IE_PROTO]
      var constructor = object.constructor
      if (isCallable(constructor) && object instanceof constructor) {
        return constructor.prototype
      } return object instanceof $Object ? ObjectPrototype : null
    }
  }, { '../internals/correct-prototype-getter': 72, '../internals/has-own-property': 132, '../internals/is-callable': 147, '../internals/shared-key': 237, '../internals/to-object': 263 }],
  193: [function (require, module, exports) {
    'use strict'
    var fails = require('../internals/fails')
    var isObject = require('../internals/is-object')
    var classof = require('../internals/classof-raw')
    var ARRAY_BUFFER_NON_EXTENSIBLE = require('../internals/array-buffer-non-extensible')

    // eslint-disable-next-line es/no-object-isextensible -- safe
    var $isExtensible = Object.isExtensible
    var FAILS_ON_PRIMITIVES = fails(function () { $isExtensible(1) })

    // `Object.isExtensible` method
    // https://tc39.es/ecma262/#sec-object.isextensible
    module.exports = (FAILS_ON_PRIMITIVES || ARRAY_BUFFER_NON_EXTENSIBLE) ? function isExtensible (it) {
      if (!isObject(it)) return false
      if (ARRAY_BUFFER_NON_EXTENSIBLE && classof(it) === 'ArrayBuffer') return false
      return $isExtensible ? $isExtensible(it) : true
    } : $isExtensible
  }, { '../internals/array-buffer-non-extensible': 34, '../internals/classof-raw': 65, '../internals/fails': 108, '../internals/is-object': 153 }],
  194: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')

    module.exports = uncurryThis({}.isPrototypeOf)
  }, { '../internals/function-uncurry-this': 120 }],
  195: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')
    var hasOwn = require('../internals/has-own-property')
    var toIndexedObject = require('../internals/to-indexed-object')
    var indexOf = require('../internals/array-includes').indexOf
    var hiddenKeys = require('../internals/hidden-keys')

    var push = uncurryThis([].push)

    module.exports = function (object, names) {
      var O = toIndexedObject(object)
      var i = 0
      var result = []
      var key
      for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key)
      // Don't enum bug & hidden keys
      while (names.length > i) {
        if (hasOwn(O, key = names[i++])) {
          ~indexOf(result, key) || push(result, key)
        }
      }
      return result
    }
  }, { '../internals/array-includes': 44, '../internals/function-uncurry-this': 120, '../internals/has-own-property': 132, '../internals/hidden-keys': 133, '../internals/to-indexed-object': 260 }],
  196: [function (require, module, exports) {
    'use strict'
    var internalObjectKeys = require('../internals/object-keys-internal')
    var enumBugKeys = require('../internals/enum-bug-keys')

    // `Object.keys` method
    // https://tc39.es/ecma262/#sec-object.keys
    // eslint-disable-next-line es/no-object-keys -- safe
    module.exports = Object.keys || function keys (O) {
      return internalObjectKeys(O, enumBugKeys)
    }
  }, { '../internals/enum-bug-keys': 92, '../internals/object-keys-internal': 195 }],
  197: [function (require, module, exports) {
    'use strict'
    var $propertyIsEnumerable = {}.propertyIsEnumerable
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor

    // Nashorn ~ JDK8 bug
    var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1)

    // `Object.prototype.propertyIsEnumerable` method implementation
    // https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
    exports.f = NASHORN_BUG ? function propertyIsEnumerable (V) {
      var descriptor = getOwnPropertyDescriptor(this, V)
      return !!descriptor && descriptor.enumerable
    } : $propertyIsEnumerable
  }, {}],
  198: [function (require, module, exports) {
    'use strict'
    /* eslint-disable no-undef, no-useless-call, sonar/no-reference-error -- required for testing */
    /* eslint-disable es/no-legacy-object-prototype-accessor-methods -- required for testing */
    var IS_PURE = require('../internals/is-pure')
    var globalThis = require('../internals/global-this')
    var fails = require('../internals/fails')
    var WEBKIT = require('../internals/environment-webkit-version')

    // Forced replacement object prototype accessors methods
    module.exports = IS_PURE || !fails(function () {
      // This feature detection crashes old WebKit
      // https://github.com/zloirock/core-js/issues/232
      if (WEBKIT && WEBKIT < 535) return
      var key = Math.random()
      // In FF throws only define methods
      __defineSetter__.call(null, key, function () { /* empty */ })
      delete globalThis[key]
    })
  }, { '../internals/environment-webkit-version': 101, '../internals/fails': 108, '../internals/global-this': 131, '../internals/is-pure': 155 }],
  199: [function (require, module, exports) {
    'use strict'
    /* eslint-disable no-proto -- safe */
    var uncurryThisAccessor = require('../internals/function-uncurry-this-accessor')
    var isObject = require('../internals/is-object')
    var requireObjectCoercible = require('../internals/require-object-coercible')
    var aPossiblePrototype = require('../internals/a-possible-prototype')

    // `Object.setPrototypeOf` method
    // https://tc39.es/ecma262/#sec-object.setprototypeof
    // Works with __proto__ only. Old v8 can't work with null proto objects.
    // eslint-disable-next-line es/no-object-setprototypeof -- safe
    module.exports = Object.setPrototypeOf || ('__proto__' in {} ? (function () {
      var CORRECT_SETTER = false
      var test = {}
      var setter
      try {
        setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set')
        setter(test, [])
        CORRECT_SETTER = test instanceof Array
      } catch (error) { /* empty */ }
      return function setPrototypeOf (O, proto) {
        requireObjectCoercible(O)
        aPossiblePrototype(proto)
        if (!isObject(O)) return O
        if (CORRECT_SETTER) setter(O, proto)
        else O.__proto__ = proto
        return O
      }
    }()) : undefined)
  }, { '../internals/a-possible-prototype': 25, '../internals/function-uncurry-this-accessor': 118, '../internals/is-object': 153, '../internals/require-object-coercible': 219 }],
  200: [function (require, module, exports) {
    'use strict'
    var DESCRIPTORS = require('../internals/descriptors')
    var fails = require('../internals/fails')
    var uncurryThis = require('../internals/function-uncurry-this')
    var objectGetPrototypeOf = require('../internals/object-get-prototype-of')
    var objectKeys = require('../internals/object-keys')
    var toIndexedObject = require('../internals/to-indexed-object')
    var $propertyIsEnumerable = require('../internals/object-property-is-enumerable').f

    var propertyIsEnumerable = uncurryThis($propertyIsEnumerable)
    var push = uncurryThis([].push)

    // in some IE versions, `propertyIsEnumerable` returns incorrect result on integer keys
    // of `null` prototype objects
    var IE_BUG = DESCRIPTORS && fails(function () {
      // eslint-disable-next-line es/no-object-create -- safe
      var O = Object.create(null)
      O[2] = 2
      return !propertyIsEnumerable(O, 2)
    })

    // `Object.{ entries, values }` methods implementation
    var createMethod = function (TO_ENTRIES) {
      return function (it) {
        var O = toIndexedObject(it)
        var keys = objectKeys(O)
        var IE_WORKAROUND = IE_BUG && objectGetPrototypeOf(O) === null
        var length = keys.length
        var i = 0
        var result = []
        var key
        while (length > i) {
          key = keys[i++]
          if (!DESCRIPTORS || (IE_WORKAROUND ? key in O : propertyIsEnumerable(O, key))) {
            push(result, TO_ENTRIES ? [key, O[key]] : O[key])
          }
        }
        return result
      }
    }

    module.exports = {
      // `Object.entries` method
      // https://tc39.es/ecma262/#sec-object.entries
      entries: createMethod(true),
      // `Object.values` method
      // https://tc39.es/ecma262/#sec-object.values
      values: createMethod(false)
    }
  }, { '../internals/descriptors': 85, '../internals/fails': 108, '../internals/function-uncurry-this': 120, '../internals/object-get-prototype-of': 192, '../internals/object-keys': 196, '../internals/object-property-is-enumerable': 197, '../internals/to-indexed-object': 260 }],
  201: [function (require, module, exports) {
    'use strict'
    var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support')
    var classof = require('../internals/classof')

    // `Object.prototype.toString` method implementation
    // https://tc39.es/ecma262/#sec-object.prototype.tostring
    module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString () {
      return '[object ' + classof(this) + ']'
    }
  }, { '../internals/classof': 66, '../internals/to-string-tag-support': 268 }],
  202: [function (require, module, exports) {
    'use strict'
    var call = require('../internals/function-call')
    var isCallable = require('../internals/is-callable')
    var isObject = require('../internals/is-object')

    var $TypeError = TypeError

    // `OrdinaryToPrimitive` abstract operation
    // https://tc39.es/ecma262/#sec-ordinarytoprimitive
    module.exports = function (input, pref) {
      var fn, val
      if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val
      if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val
      if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val
      throw new $TypeError("Can't convert object to primitive value")
    }
  }, { '../internals/function-call': 116, '../internals/is-callable': 147, '../internals/is-object': 153 }],
  203: [function (require, module, exports) {
    'use strict'
    var getBuiltIn = require('../internals/get-built-in')
    var uncurryThis = require('../internals/function-uncurry-this')
    var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names')
    var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols')
    var anObject = require('../internals/an-object')

    var concat = uncurryThis([].concat)

    // all object keys, includes non-enumerable and symbols
    module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys (it) {
      var keys = getOwnPropertyNamesModule.f(anObject(it))
      var getOwnPropertySymbols = getOwnPropertySymbolsModule.f
      return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys
    }
  }, { '../internals/an-object': 30, '../internals/function-uncurry-this': 120, '../internals/get-built-in': 123, '../internals/object-get-own-property-names': 190, '../internals/object-get-own-property-symbols': 191 }],
  204: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')

    module.exports = globalThis
  }, { '../internals/global-this': 131 }],
  205: [function (require, module, exports) {
    'use strict'
    module.exports = function (exec) {
      try {
        return { error: false, value: exec() }
      } catch (error) {
        return { error: true, value: error }
      }
    }
  }, {}],
  206: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')
    var NativePromiseConstructor = require('../internals/promise-native-constructor')
    var isCallable = require('../internals/is-callable')
    var isForced = require('../internals/is-forced')
    var inspectSource = require('../internals/inspect-source')
    var wellKnownSymbol = require('../internals/well-known-symbol')
    var ENVIRONMENT = require('../internals/environment')
    var IS_PURE = require('../internals/is-pure')
    var V8_VERSION = require('../internals/environment-v8-version')

    var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype
    var SPECIES = wellKnownSymbol('species')
    var SUBCLASSING = false
    var NATIVE_PROMISE_REJECTION_EVENT = isCallable(globalThis.PromiseRejectionEvent)

    var FORCED_PROMISE_CONSTRUCTOR = isForced('Promise', function () {
      var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor)
      var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor)
      // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // We can't detect it synchronously, so just check versions
      if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true
      // We need Promise#{ catch, finally } in the pure version for preventing prototype pollution
      if (IS_PURE && !(NativePromisePrototype.catch && NativePromisePrototype.finally)) return true
      // We can't use @@species feature detection in V8 since it causes
      // deoptimization and performance degradation
      // https://github.com/zloirock/core-js/issues/679
      if (!V8_VERSION || V8_VERSION < 51 || !/native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) {
        // Detect correctness of subclassing with @@species support
        var promise = new NativePromiseConstructor(function (resolve) { resolve(1) })
        var FakePromise = function (exec) {
          exec(function () { /* empty */ }, function () { /* empty */ })
        }
        var constructor = promise.constructor = {}
        constructor[SPECIES] = FakePromise
        SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise
        if (!SUBCLASSING) return true
        // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
      } return !GLOBAL_CORE_JS_PROMISE && (ENVIRONMENT === 'BROWSER' || ENVIRONMENT === 'DENO') && !NATIVE_PROMISE_REJECTION_EVENT
    })

    module.exports = {
      CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR,
      REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT,
      SUBCLASSING: SUBCLASSING
    }
  }, { '../internals/environment': 102, '../internals/environment-v8-version': 100, '../internals/global-this': 131, '../internals/inspect-source': 140, '../internals/is-callable': 147, '../internals/is-forced': 150, '../internals/is-pure': 155, '../internals/promise-native-constructor': 207, '../internals/well-known-symbol': 285 }],
  207: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')

    module.exports = globalThis.Promise
  }, { '../internals/global-this': 131 }],
  208: [function (require, module, exports) {
    'use strict'
    var anObject = require('../internals/an-object')
    var isObject = require('../internals/is-object')
    var newPromiseCapability = require('../internals/new-promise-capability')

    module.exports = function (C, x) {
      anObject(C)
      if (isObject(x) && x.constructor === C) return x
      var promiseCapability = newPromiseCapability.f(C)
      var resolve = promiseCapability.resolve
      resolve(x)
      return promiseCapability.promise
    }
  }, { '../internals/an-object': 30, '../internals/is-object': 153, '../internals/new-promise-capability': 178 }],
  209: [function (require, module, exports) {
    'use strict'
    var NativePromiseConstructor = require('../internals/promise-native-constructor')
    var checkCorrectnessOfIteration = require('../internals/check-correctness-of-iteration')
    var FORCED_PROMISE_CONSTRUCTOR = require('../internals/promise-constructor-detection').CONSTRUCTOR

    module.exports = FORCED_PROMISE_CONSTRUCTOR || !checkCorrectnessOfIteration(function (iterable) {
      NativePromiseConstructor.all(iterable).then(undefined, function () { /* empty */ })
    })
  }, { '../internals/check-correctness-of-iteration': 64, '../internals/promise-constructor-detection': 206, '../internals/promise-native-constructor': 207 }],
  210: [function (require, module, exports) {
    'use strict'
    var defineProperty = require('../internals/object-define-property').f

    module.exports = function (Target, Source, key) {
      key in Target || defineProperty(Target, key, {
        configurable: true,
        get: function () { return Source[key] },
        set: function (it) { Source[key] = it }
      })
    }
  }, { '../internals/object-define-property': 187 }],
  211: [function (require, module, exports) {
    'use strict'
    var Queue = function () {
      this.head = null
      this.tail = null
    }

    Queue.prototype = {
      add: function (item) {
        var entry = { item: item, next: null }
        var tail = this.tail
        if (tail) tail.next = entry
        else this.head = entry
        this.tail = entry
      },
      get: function () {
        var entry = this.head
        if (entry) {
          var next = this.head = entry.next
          if (next === null) this.tail = null
          return entry.item
        }
      }
    }

    module.exports = Queue
  }, {}],
  212: [function (require, module, exports) {
    'use strict'
    var call = require('../internals/function-call')
    var anObject = require('../internals/an-object')
    var isCallable = require('../internals/is-callable')
    var classof = require('../internals/classof-raw')
    var regexpExec = require('../internals/regexp-exec')

    var $TypeError = TypeError

    // `RegExpExec` abstract operation
    // https://tc39.es/ecma262/#sec-regexpexec
    module.exports = function (R, S) {
      var exec = R.exec
      if (isCallable(exec)) {
        var result = call(exec, R, S)
        if (result !== null) anObject(result)
        return result
      }
      if (classof(R) === 'RegExp') return call(regexpExec, R, S)
      throw new $TypeError('RegExp#exec called on incompatible receiver')
    }
  }, { '../internals/an-object': 30, '../internals/classof-raw': 65, '../internals/function-call': 116, '../internals/is-callable': 147, '../internals/regexp-exec': 213 }],
  213: [function (require, module, exports) {
    'use strict'
    /* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
    /* eslint-disable regexp/no-useless-quantifier -- testing */
    var call = require('../internals/function-call')
    var uncurryThis = require('../internals/function-uncurry-this')
    var toString = require('../internals/to-string')
    var regexpFlags = require('../internals/regexp-flags')
    var stickyHelpers = require('../internals/regexp-sticky-helpers')
    var shared = require('../internals/shared')
    var create = require('../internals/object-create')
    var getInternalState = require('../internals/internal-state').get
    var UNSUPPORTED_DOT_ALL = require('../internals/regexp-unsupported-dot-all')
    var UNSUPPORTED_NCG = require('../internals/regexp-unsupported-ncg')

    var nativeReplace = shared('native-string-replace', String.prototype.replace)
    var nativeExec = RegExp.prototype.exec
    var patchedExec = nativeExec
    var charAt = uncurryThis(''.charAt)
    var indexOf = uncurryThis(''.indexOf)
    var replace = uncurryThis(''.replace)
    var stringSlice = uncurryThis(''.slice)

    var UPDATES_LAST_INDEX_WRONG = (function () {
      var re1 = /a/
      var re2 = /b*/g
      call(nativeExec, re1, 'a')
      call(nativeExec, re2, 'a')
      return re1.lastIndex !== 0 || re2.lastIndex !== 0
    })()

    var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET

    // nonparticipating capturing group, copied from es5-shim's String#split patch.
    var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined

    var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG

    if (PATCH) {
      patchedExec = function exec (string) {
        var re = this
        var state = getInternalState(re)
        var str = toString(string)
        var raw = state.raw
        var result, reCopy, lastIndex, match, i, object, group

        if (raw) {
          raw.lastIndex = re.lastIndex
          result = call(patchedExec, raw, str)
          re.lastIndex = raw.lastIndex
          return result
        }

        var groups = state.groups
        var sticky = UNSUPPORTED_Y && re.sticky
        var flags = call(regexpFlags, re)
        var source = re.source
        var charsAdded = 0
        var strCopy = str

        if (sticky) {
          flags = replace(flags, 'y', '')
          if (indexOf(flags, 'g') === -1) {
            flags += 'g'
          }

          strCopy = stringSlice(str, re.lastIndex)
          // Support anchored sticky behavior.
          if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt(str, re.lastIndex - 1) !== '\n')) {
            source = '(?: ' + source + ')'
            strCopy = ' ' + strCopy
            charsAdded++
          }
          // ^(? + rx + ) is needed, in combination with some str slicing, to
          // simulate the 'y' flag.
          reCopy = new RegExp('^(?:' + source + ')', flags)
        }

        if (NPCG_INCLUDED) {
          reCopy = new RegExp('^' + source + '$(?!\\s)', flags)
        }
        if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex

        match = call(nativeExec, sticky ? reCopy : re, strCopy)

        if (sticky) {
          if (match) {
            match.input = stringSlice(match.input, charsAdded)
            match[0] = stringSlice(match[0], charsAdded)
            match.index = re.lastIndex
            re.lastIndex += match[0].length
          } else re.lastIndex = 0
        } else if (UPDATES_LAST_INDEX_WRONG && match) {
          re.lastIndex = re.global ? match.index + match[0].length : lastIndex
        }
        if (NPCG_INCLUDED && match && match.length > 1) {
          // Fix browsers whose `exec` methods don't consistently return `undefined`
          // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
          call(nativeReplace, match[0], reCopy, function () {
            for (i = 1; i < arguments.length - 2; i++) {
              if (arguments[i] === undefined) match[i] = undefined
            }
          })
        }

        if (match && groups) {
          match.groups = object = create(null)
          for (i = 0; i < groups.length; i++) {
            group = groups[i]
            object[group[0]] = match[group[1]]
          }
        }

        return match
      }
    }

    module.exports = patchedExec
  }, { '../internals/function-call': 116, '../internals/function-uncurry-this': 120, '../internals/internal-state': 143, '../internals/object-create': 185, '../internals/regexp-flags': 214, '../internals/regexp-sticky-helpers': 216, '../internals/regexp-unsupported-dot-all': 217, '../internals/regexp-unsupported-ncg': 218, '../internals/shared': 239, '../internals/to-string': 269 }],
  214: [function (require, module, exports) {
    'use strict'
    var anObject = require('../internals/an-object')

    // `RegExp.prototype.flags` getter implementation
    // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
    module.exports = function () {
      var that = anObject(this)
      var result = ''
      if (that.hasIndices) result += 'd'
      if (that.global) result += 'g'
      if (that.ignoreCase) result += 'i'
      if (that.multiline) result += 'm'
      if (that.dotAll) result += 's'
      if (that.unicode) result += 'u'
      if (that.unicodeSets) result += 'v'
      if (that.sticky) result += 'y'
      return result
    }
  }, { '../internals/an-object': 30 }],
  215: [function (require, module, exports) {
    'use strict'
    var call = require('../internals/function-call')
    var hasOwn = require('../internals/has-own-property')
    var isPrototypeOf = require('../internals/object-is-prototype-of')
    var regExpFlags = require('../internals/regexp-flags')

    var RegExpPrototype = RegExp.prototype

    module.exports = function (R) {
      var flags = R.flags
      return flags === undefined && !('flags' in RegExpPrototype) && !hasOwn(R, 'flags') && isPrototypeOf(RegExpPrototype, R)
        ? call(regExpFlags, R) : flags
    }
  }, { '../internals/function-call': 116, '../internals/has-own-property': 132, '../internals/object-is-prototype-of': 194, '../internals/regexp-flags': 214 }],
  216: [function (require, module, exports) {
    'use strict'
    var fails = require('../internals/fails')
    var globalThis = require('../internals/global-this')

    // babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
    var $RegExp = globalThis.RegExp

    var UNSUPPORTED_Y = fails(function () {
      var re = $RegExp('a', 'y')
      re.lastIndex = 2
      return re.exec('abcd') !== null
    })

    // UC Browser bug
    // https://github.com/zloirock/core-js/issues/1008
    var MISSED_STICKY = UNSUPPORTED_Y || fails(function () {
      return !$RegExp('a', 'y').sticky
    })

    var BROKEN_CARET = UNSUPPORTED_Y || fails(function () {
      // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
      var re = $RegExp('^r', 'gy')
      re.lastIndex = 2
      return re.exec('str') !== null
    })

    module.exports = {
      BROKEN_CARET: BROKEN_CARET,
      MISSED_STICKY: MISSED_STICKY,
      UNSUPPORTED_Y: UNSUPPORTED_Y
    }
  }, { '../internals/fails': 108, '../internals/global-this': 131 }],
  217: [function (require, module, exports) {
    'use strict'
    var fails = require('../internals/fails')
    var globalThis = require('../internals/global-this')

    // babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
    var $RegExp = globalThis.RegExp

    module.exports = fails(function () {
      var re = $RegExp('.', 's')
      return !(re.dotAll && re.test('\n') && re.flags === 's')
    })
  }, { '../internals/fails': 108, '../internals/global-this': 131 }],
  218: [function (require, module, exports) {
    'use strict'
    var fails = require('../internals/fails')
    var globalThis = require('../internals/global-this')

    // babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
    var $RegExp = globalThis.RegExp

    module.exports = fails(function () {
      var re = $RegExp('(?<a>b)', 'g')
      return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc'
    })
  }, { '../internals/fails': 108, '../internals/global-this': 131 }],
  219: [function (require, module, exports) {
    'use strict'
    var isNullOrUndefined = require('../internals/is-null-or-undefined')

    var $TypeError = TypeError

    // `RequireObjectCoercible` abstract operation
    // https://tc39.es/ecma262/#sec-requireobjectcoercible
    module.exports = function (it) {
      if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it)
      return it
    }
  }, { '../internals/is-null-or-undefined': 152 }],
  220: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')
    var DESCRIPTORS = require('../internals/descriptors')

    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor

    // Avoid NodeJS experimental warning
    module.exports = function (name) {
      if (!DESCRIPTORS) return globalThis[name]
      var descriptor = getOwnPropertyDescriptor(globalThis, name)
      return descriptor && descriptor.value
    }
  }, { '../internals/descriptors': 85, '../internals/global-this': 131 }],
  221: [function (require, module, exports) {
    'use strict'
    // `SameValue` abstract operation
    // https://tc39.es/ecma262/#sec-samevalue
    // eslint-disable-next-line es/no-object-is -- safe
    module.exports = Object.is || function is (x, y) {
      // eslint-disable-next-line no-self-compare -- NaN check
      return x === y ? x !== 0 || 1 / x === 1 / y : x !== x && y !== y
    }
  }, {}],
  222: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')
    var apply = require('../internals/function-apply')
    var isCallable = require('../internals/is-callable')
    var ENVIRONMENT = require('../internals/environment')
    var USER_AGENT = require('../internals/environment-user-agent')
    var arraySlice = require('../internals/array-slice')
    var validateArgumentsLength = require('../internals/validate-arguments-length')

    var Function = globalThis.Function
    // dirty IE9- and Bun 0.3.0- checks
    var WRAP = /MSIE .\./.test(USER_AGENT) || ENVIRONMENT === 'BUN' && (function () {
      var version = globalThis.Bun.version.split('.')
      return version.length < 3 || version[0] === '0' && (version[1] < 3 || version[1] === '3' && version[2] === '0')
    })()

    // IE9- / Bun 0.3.0- setTimeout / setInterval / setImmediate additional parameters fix
    // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
    // https://github.com/oven-sh/bun/issues/1633
    module.exports = function (scheduler, hasTimeArg) {
      var firstParamIndex = hasTimeArg ? 2 : 1
      return WRAP ? function (handler, timeout /* , ...arguments */) {
        var boundArgs = validateArgumentsLength(arguments.length, 1) > firstParamIndex
        var fn = isCallable(handler) ? handler : Function(handler)
        var params = boundArgs ? arraySlice(arguments, firstParamIndex) : []
        var callback = boundArgs ? function () {
          apply(fn, this, params)
        } : fn
        return hasTimeArg ? scheduler(callback, timeout) : scheduler(callback)
      } : scheduler
    }
  }, { '../internals/array-slice': 52, '../internals/environment': 102, '../internals/environment-user-agent': 99, '../internals/function-apply': 112, '../internals/global-this': 131, '../internals/is-callable': 147, '../internals/validate-arguments-length': 281 }],
  223: [function (require, module, exports) {
    'use strict'
    var SetHelpers = require('../internals/set-helpers')
    var iterate = require('../internals/set-iterate')

    var Set = SetHelpers.Set
    var add = SetHelpers.add

    module.exports = function (set) {
      var result = new Set()
      iterate(set, function (it) {
        add(result, it)
      })
      return result
    }
  }, { '../internals/set-helpers': 225, '../internals/set-iterate': 230 }],
  224: [function (require, module, exports) {
    'use strict'
    var aSet = require('../internals/a-set')
    var SetHelpers = require('../internals/set-helpers')
    var clone = require('../internals/set-clone')
    var size = require('../internals/set-size')
    var getSetRecord = require('../internals/get-set-record')
    var iterateSet = require('../internals/set-iterate')
    var iterateSimple = require('../internals/iterate-simple')

    var has = SetHelpers.has
    var remove = SetHelpers.remove

    // `Set.prototype.difference` method
    // https://github.com/tc39/proposal-set-methods
    module.exports = function difference (other) {
      var O = aSet(this)
      var otherRec = getSetRecord(other)
      var result = clone(O)
      if (size(O) <= otherRec.size) {
        iterateSet(O, function (e) {
          if (otherRec.includes(e)) remove(result, e)
        })
      } else {
        iterateSimple(otherRec.getIterator(), function (e) {
          if (has(O, e)) remove(result, e)
        })
      }
      return result
    }
  }, { '../internals/a-set': 26, '../internals/get-set-record': 129, '../internals/iterate-simple': 158, '../internals/set-clone': 223, '../internals/set-helpers': 225, '../internals/set-iterate': 230, '../internals/set-size': 232 }],
  225: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')

    // eslint-disable-next-line es/no-set -- safe
    var SetPrototype = Set.prototype

    module.exports = {
      // eslint-disable-next-line es/no-set -- safe
      Set: Set,
      add: uncurryThis(SetPrototype.add),
      has: uncurryThis(SetPrototype.has),
      remove: uncurryThis(SetPrototype.delete),
      proto: SetPrototype
    }
  }, { '../internals/function-uncurry-this': 120 }],
  226: [function (require, module, exports) {
    'use strict'
    var aSet = require('../internals/a-set')
    var SetHelpers = require('../internals/set-helpers')
    var size = require('../internals/set-size')
    var getSetRecord = require('../internals/get-set-record')
    var iterateSet = require('../internals/set-iterate')
    var iterateSimple = require('../internals/iterate-simple')

    var Set = SetHelpers.Set
    var add = SetHelpers.add
    var has = SetHelpers.has

    // `Set.prototype.intersection` method
    // https://github.com/tc39/proposal-set-methods
    module.exports = function intersection (other) {
      var O = aSet(this)
      var otherRec = getSetRecord(other)
      var result = new Set()

      if (size(O) > otherRec.size) {
        iterateSimple(otherRec.getIterator(), function (e) {
          if (has(O, e)) add(result, e)
        })
      } else {
        iterateSet(O, function (e) {
          if (otherRec.includes(e)) add(result, e)
        })
      }

      return result
    }
  }, { '../internals/a-set': 26, '../internals/get-set-record': 129, '../internals/iterate-simple': 158, '../internals/set-helpers': 225, '../internals/set-iterate': 230, '../internals/set-size': 232 }],
  227: [function (require, module, exports) {
    'use strict'
    var aSet = require('../internals/a-set')
    var has = require('../internals/set-helpers').has
    var size = require('../internals/set-size')
    var getSetRecord = require('../internals/get-set-record')
    var iterateSet = require('../internals/set-iterate')
    var iterateSimple = require('../internals/iterate-simple')
    var iteratorClose = require('../internals/iterator-close')

    // `Set.prototype.isDisjointFrom` method
    // https://tc39.github.io/proposal-set-methods/#Set.prototype.isDisjointFrom
    module.exports = function isDisjointFrom (other) {
      var O = aSet(this)
      var otherRec = getSetRecord(other)
      if (size(O) <= otherRec.size) {
        return iterateSet(O, function (e) {
          if (otherRec.includes(e)) return false
        }, true) !== false
      }
      var iterator = otherRec.getIterator()
      return iterateSimple(iterator, function (e) {
        if (has(O, e)) return iteratorClose(iterator, 'normal', false)
      }) !== false
    }
  }, { '../internals/a-set': 26, '../internals/get-set-record': 129, '../internals/iterate-simple': 158, '../internals/iterator-close': 160, '../internals/set-helpers': 225, '../internals/set-iterate': 230, '../internals/set-size': 232 }],
  228: [function (require, module, exports) {
    'use strict'
    var aSet = require('../internals/a-set')
    var size = require('../internals/set-size')
    var iterate = require('../internals/set-iterate')
    var getSetRecord = require('../internals/get-set-record')

    // `Set.prototype.isSubsetOf` method
    // https://tc39.github.io/proposal-set-methods/#Set.prototype.isSubsetOf
    module.exports = function isSubsetOf (other) {
      var O = aSet(this)
      var otherRec = getSetRecord(other)
      if (size(O) > otherRec.size) return false
      return iterate(O, function (e) {
        if (!otherRec.includes(e)) return false
      }, true) !== false
    }
  }, { '../internals/a-set': 26, '../internals/get-set-record': 129, '../internals/set-iterate': 230, '../internals/set-size': 232 }],
  229: [function (require, module, exports) {
    'use strict'
    var aSet = require('../internals/a-set')
    var has = require('../internals/set-helpers').has
    var size = require('../internals/set-size')
    var getSetRecord = require('../internals/get-set-record')
    var iterateSimple = require('../internals/iterate-simple')
    var iteratorClose = require('../internals/iterator-close')

    // `Set.prototype.isSupersetOf` method
    // https://tc39.github.io/proposal-set-methods/#Set.prototype.isSupersetOf
    module.exports = function isSupersetOf (other) {
      var O = aSet(this)
      var otherRec = getSetRecord(other)
      if (size(O) < otherRec.size) return false
      var iterator = otherRec.getIterator()
      return iterateSimple(iterator, function (e) {
        if (!has(O, e)) return iteratorClose(iterator, 'normal', false)
      }) !== false
    }
  }, { '../internals/a-set': 26, '../internals/get-set-record': 129, '../internals/iterate-simple': 158, '../internals/iterator-close': 160, '../internals/set-helpers': 225, '../internals/set-size': 232 }],
  230: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')
    var iterateSimple = require('../internals/iterate-simple')
    var SetHelpers = require('../internals/set-helpers')

    var Set = SetHelpers.Set
    var SetPrototype = SetHelpers.proto
    var forEach = uncurryThis(SetPrototype.forEach)
    var keys = uncurryThis(SetPrototype.keys)
    var next = keys(new Set()).next

    module.exports = function (set, fn, interruptible) {
      return interruptible ? iterateSimple({ iterator: keys(set), next: next }, fn) : forEach(set, fn)
    }
  }, { '../internals/function-uncurry-this': 120, '../internals/iterate-simple': 158, '../internals/set-helpers': 225 }],
  231: [function (require, module, exports) {
    'use strict'
    var getBuiltIn = require('../internals/get-built-in')

    var createSetLike = function (size) {
      return {
        size: size,
        has: function () {
          return false
        },
        keys: function () {
          return {
            next: function () {
              return { done: true }
            }
          }
        }
      }
    }

    module.exports = function (name) {
      var Set = getBuiltIn('Set')
      try {
        new Set()[name](createSetLike(0))
        try {
          // late spec change, early WebKit ~ Safari 17.0 beta implementation does not pass it
          // https://github.com/tc39/proposal-set-methods/pull/88
          new Set()[name](createSetLike(-1))
          return false
        } catch (error2) {
          return true
        }
      } catch (error) {
        return false
      }
    }
  }, { '../internals/get-built-in': 123 }],
  232: [function (require, module, exports) {
    'use strict'
    var uncurryThisAccessor = require('../internals/function-uncurry-this-accessor')
    var SetHelpers = require('../internals/set-helpers')

    module.exports = uncurryThisAccessor(SetHelpers.proto, 'size', 'get') || function (set) {
      return set.size
    }
  }, { '../internals/function-uncurry-this-accessor': 118, '../internals/set-helpers': 225 }],
  233: [function (require, module, exports) {
    'use strict'
    var getBuiltIn = require('../internals/get-built-in')
    var defineBuiltInAccessor = require('../internals/define-built-in-accessor')
    var wellKnownSymbol = require('../internals/well-known-symbol')
    var DESCRIPTORS = require('../internals/descriptors')

    var SPECIES = wellKnownSymbol('species')

    module.exports = function (CONSTRUCTOR_NAME) {
      var Constructor = getBuiltIn(CONSTRUCTOR_NAME)

      if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
        defineBuiltInAccessor(Constructor, SPECIES, {
          configurable: true,
          get: function () { return this }
        })
      }
    }
  }, { '../internals/define-built-in-accessor': 80, '../internals/descriptors': 85, '../internals/get-built-in': 123, '../internals/well-known-symbol': 285 }],
  234: [function (require, module, exports) {
    'use strict'
    var aSet = require('../internals/a-set')
    var SetHelpers = require('../internals/set-helpers')
    var clone = require('../internals/set-clone')
    var getSetRecord = require('../internals/get-set-record')
    var iterateSimple = require('../internals/iterate-simple')

    var add = SetHelpers.add
    var has = SetHelpers.has
    var remove = SetHelpers.remove

    // `Set.prototype.symmetricDifference` method
    // https://github.com/tc39/proposal-set-methods
    module.exports = function symmetricDifference (other) {
      var O = aSet(this)
      var keysIter = getSetRecord(other).getIterator()
      var result = clone(O)
      iterateSimple(keysIter, function (e) {
        if (has(O, e)) remove(result, e)
        else add(result, e)
      })
      return result
    }
  }, { '../internals/a-set': 26, '../internals/get-set-record': 129, '../internals/iterate-simple': 158, '../internals/set-clone': 223, '../internals/set-helpers': 225 }],
  235: [function (require, module, exports) {
    'use strict'
    var defineProperty = require('../internals/object-define-property').f
    var hasOwn = require('../internals/has-own-property')
    var wellKnownSymbol = require('../internals/well-known-symbol')

    var TO_STRING_TAG = wellKnownSymbol('toStringTag')

    module.exports = function (target, TAG, STATIC) {
      if (target && !STATIC) target = target.prototype
      if (target && !hasOwn(target, TO_STRING_TAG)) {
        defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG })
      }
    }
  }, { '../internals/has-own-property': 132, '../internals/object-define-property': 187, '../internals/well-known-symbol': 285 }],
  236: [function (require, module, exports) {
    'use strict'
    var aSet = require('../internals/a-set')
    var add = require('../internals/set-helpers').add
    var clone = require('../internals/set-clone')
    var getSetRecord = require('../internals/get-set-record')
    var iterateSimple = require('../internals/iterate-simple')

    // `Set.prototype.union` method
    // https://github.com/tc39/proposal-set-methods
    module.exports = function union (other) {
      var O = aSet(this)
      var keysIter = getSetRecord(other).getIterator()
      var result = clone(O)
      iterateSimple(keysIter, function (it) {
        add(result, it)
      })
      return result
    }
  }, { '../internals/a-set': 26, '../internals/get-set-record': 129, '../internals/iterate-simple': 158, '../internals/set-clone': 223, '../internals/set-helpers': 225 }],
  237: [function (require, module, exports) {
    'use strict'
    var shared = require('../internals/shared')
    var uid = require('../internals/uid')

    var keys = shared('keys')

    module.exports = function (key) {
      return keys[key] || (keys[key] = uid(key))
    }
  }, { '../internals/shared': 239, '../internals/uid': 277 }],
  238: [function (require, module, exports) {
    'use strict'
    var IS_PURE = require('../internals/is-pure')
    var globalThis = require('../internals/global-this')
    var defineGlobalProperty = require('../internals/define-global-property')

    var SHARED = '__core-js_shared__'
    var store = module.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});

    (store.versions || (store.versions = [])).push({
      version: '3.38.1',
      mode: IS_PURE ? 'pure' : 'global',
      copyright: '© 2014-2024 Denis Pushkarev (zloirock.ru)',
      license: 'https://github.com/zloirock/core-js/blob/v3.38.1/LICENSE',
      source: 'https://github.com/zloirock/core-js'
    })
  }, { '../internals/define-global-property': 83, '../internals/global-this': 131, '../internals/is-pure': 155 }],
  239: [function (require, module, exports) {
    'use strict'
    var store = require('../internals/shared-store')

    module.exports = function (key, value) {
      return store[key] || (store[key] = value || {})
    }
  }, { '../internals/shared-store': 238 }],
  240: [function (require, module, exports) {
    'use strict'
    var anObject = require('../internals/an-object')
    var aConstructor = require('../internals/a-constructor')
    var isNullOrUndefined = require('../internals/is-null-or-undefined')
    var wellKnownSymbol = require('../internals/well-known-symbol')

    var SPECIES = wellKnownSymbol('species')

    // `SpeciesConstructor` abstract operation
    // https://tc39.es/ecma262/#sec-speciesconstructor
    module.exports = function (O, defaultConstructor) {
      var C = anObject(O).constructor
      var S
      return C === undefined || isNullOrUndefined(S = anObject(C)[SPECIES]) ? defaultConstructor : aConstructor(S)
    }
  }, { '../internals/a-constructor': 24, '../internals/an-object': 30, '../internals/is-null-or-undefined': 152, '../internals/well-known-symbol': 285 }],
  241: [function (require, module, exports) {
    'use strict'
    var fails = require('../internals/fails')

    // check the existence of a method, lowercase
    // of a tag and escaping quotes in arguments
    module.exports = function (METHOD_NAME) {
      return fails(function () {
        var test = ''[METHOD_NAME]('"')
        return test !== test.toLowerCase() || test.split('"').length > 3
      })
    }
  }, { '../internals/fails': 108 }],
  242: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')
    var toIntegerOrInfinity = require('../internals/to-integer-or-infinity')
    var toString = require('../internals/to-string')
    var requireObjectCoercible = require('../internals/require-object-coercible')

    var charAt = uncurryThis(''.charAt)
    var charCodeAt = uncurryThis(''.charCodeAt)
    var stringSlice = uncurryThis(''.slice)

    var createMethod = function (CONVERT_TO_STRING) {
      return function ($this, pos) {
        var S = toString(requireObjectCoercible($this))
        var position = toIntegerOrInfinity(pos)
        var size = S.length
        var first, second
        if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined
        first = charCodeAt(S, position)
        return first < 0xD800 || first > 0xDBFF || position + 1 === size ||
      (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
          ? CONVERT_TO_STRING
            ? charAt(S, position)
            : first
          : CONVERT_TO_STRING
            ? stringSlice(S, position, position + 2)
            : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000
      }
    }

    module.exports = {
      // `String.prototype.codePointAt` method
      // https://tc39.es/ecma262/#sec-string.prototype.codepointat
      codeAt: createMethod(false),
      // `String.prototype.at` method
      // https://github.com/mathiasbynens/String.prototype.at
      charAt: createMethod(true)
    }
  }, { '../internals/function-uncurry-this': 120, '../internals/require-object-coercible': 219, '../internals/to-integer-or-infinity': 261, '../internals/to-string': 269 }],
  243: [function (require, module, exports) {
    'use strict'
    // https://github.com/zloirock/core-js/issues/280
    var userAgent = require('../internals/environment-user-agent')

    module.exports = /Version\/10(?:\.\d+){1,2}(?: [\w./]+)?(?: Mobile\/\w+)? Safari\//.test(userAgent)
  }, { '../internals/environment-user-agent': 99 }],
  244: [function (require, module, exports) {
    'use strict'
    // https://github.com/tc39/proposal-string-pad-start-end
    var uncurryThis = require('../internals/function-uncurry-this')
    var toLength = require('../internals/to-length')
    var toString = require('../internals/to-string')
    var $repeat = require('../internals/string-repeat')
    var requireObjectCoercible = require('../internals/require-object-coercible')

    var repeat = uncurryThis($repeat)
    var stringSlice = uncurryThis(''.slice)
    var ceil = Math.ceil

    // `String.prototype.{ padStart, padEnd }` methods implementation
    var createMethod = function (IS_END) {
      return function ($this, maxLength, fillString) {
        var S = toString(requireObjectCoercible($this))
        var intMaxLength = toLength(maxLength)
        var stringLength = S.length
        var fillStr = fillString === undefined ? ' ' : toString(fillString)
        var fillLen, stringFiller
        if (intMaxLength <= stringLength || fillStr === '') return S
        fillLen = intMaxLength - stringLength
        stringFiller = repeat(fillStr, ceil(fillLen / fillStr.length))
        if (stringFiller.length > fillLen) stringFiller = stringSlice(stringFiller, 0, fillLen)
        return IS_END ? S + stringFiller : stringFiller + S
      }
    }

    module.exports = {
      // `String.prototype.padStart` method
      // https://tc39.es/ecma262/#sec-string.prototype.padstart
      start: createMethod(false),
      // `String.prototype.padEnd` method
      // https://tc39.es/ecma262/#sec-string.prototype.padend
      end: createMethod(true)
    }
  }, { '../internals/function-uncurry-this': 120, '../internals/require-object-coercible': 219, '../internals/string-repeat': 246, '../internals/to-length': 262, '../internals/to-string': 269 }],
  245: [function (require, module, exports) {
    'use strict'
    // based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
    var uncurryThis = require('../internals/function-uncurry-this')

    var maxInt = 2147483647 // aka. 0x7FFFFFFF or 2^31-1
    var base = 36
    var tMin = 1
    var tMax = 26
    var skew = 38
    var damp = 700
    var initialBias = 72
    var initialN = 128 // 0x80
    var delimiter = '-' // '\x2D'
    var regexNonASCII = /[^\0-\u007E]/ // non-ASCII chars
    var regexSeparators = /[.\u3002\uFF0E\uFF61]/g // RFC 3490 separators
    var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process'
    var baseMinusTMin = base - tMin

    var $RangeError = RangeError
    var exec = uncurryThis(regexSeparators.exec)
    var floor = Math.floor
    var fromCharCode = String.fromCharCode
    var charCodeAt = uncurryThis(''.charCodeAt)
    var join = uncurryThis([].join)
    var push = uncurryThis([].push)
    var replace = uncurryThis(''.replace)
    var split = uncurryThis(''.split)
    var toLowerCase = uncurryThis(''.toLowerCase)

    /**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 */
    var ucs2decode = function (string) {
      var output = []
      var counter = 0
      var length = string.length
      while (counter < length) {
        var value = charCodeAt(string, counter++)
        if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
          // It's a high surrogate, and there is a next character.
          var extra = charCodeAt(string, counter++)
          if ((extra & 0xFC00) === 0xDC00) { // Low surrogate.
            push(output, ((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000)
          } else {
            // It's an unmatched surrogate; only append this code unit, in case the
            // next code unit is the high surrogate of a surrogate pair.
            push(output, value)
            counter--
          }
        } else {
          push(output, value)
        }
      }
      return output
    }

    /**
 * Converts a digit/integer into a basic code point.
 */
    var digitToBasic = function (digit) {
      //  0..25 map to ASCII a..z or A..Z
      // 26..35 map to ASCII 0..9
      return digit + 22 + 75 * (digit < 26)
    }

    /**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 */
    var adapt = function (delta, numPoints, firstTime) {
      var k = 0
      delta = firstTime ? floor(delta / damp) : delta >> 1
      delta += floor(delta / numPoints)
      while (delta > baseMinusTMin * tMax >> 1) {
        delta = floor(delta / baseMinusTMin)
        k += base
      }
      return floor(k + (baseMinusTMin + 1) * delta / (delta + skew))
    }

    /**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 */
    var encode = function (input) {
      var output = []

      // Convert the input in UCS-2 to an array of Unicode code points.
      input = ucs2decode(input)

      // Cache the length.
      var inputLength = input.length

      // Initialize the state.
      var n = initialN
      var delta = 0
      var bias = initialBias
      var i, currentValue

      // Handle the basic code points.
      for (i = 0; i < input.length; i++) {
        currentValue = input[i]
        if (currentValue < 0x80) {
          push(output, fromCharCode(currentValue))
        }
      }

      var basicLength = output.length // number of basic code points.
      var handledCPCount = basicLength // number of code points that have been handled;

      // Finish the basic string with a delimiter unless it's empty.
      if (basicLength) {
        push(output, delimiter)
      }

      // Main encoding loop:
      while (handledCPCount < inputLength) {
        // All non-basic code points < n have been handled already. Find the next larger one:
        var m = maxInt
        for (i = 0; i < input.length; i++) {
          currentValue = input[i]
          if (currentValue >= n && currentValue < m) {
            m = currentValue
          }
        }

        // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
        var handledCPCountPlusOne = handledCPCount + 1
        if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
          throw new $RangeError(OVERFLOW_ERROR)
        }

        delta += (m - n) * handledCPCountPlusOne
        n = m

        for (i = 0; i < input.length; i++) {
          currentValue = input[i]
          if (currentValue < n && ++delta > maxInt) {
            throw new $RangeError(OVERFLOW_ERROR)
          }
          if (currentValue === n) {
            // Represent delta as a generalized variable-length integer.
            var q = delta
            var k = base
            while (true) {
              var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias
              if (q < t) break
              var qMinusT = q - t
              var baseMinusT = base - t
              push(output, fromCharCode(digitToBasic(t + qMinusT % baseMinusT)))
              q = floor(qMinusT / baseMinusT)
              k += base
            }

            push(output, fromCharCode(digitToBasic(q)))
            bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength)
            delta = 0
            handledCPCount++
          }
        }

        delta++
        n++
      }
      return join(output, '')
    }

    module.exports = function (input) {
      var encoded = []
      var labels = split(replace(toLowerCase(input), regexSeparators, '\u002E'), '.')
      var i, label
      for (i = 0; i < labels.length; i++) {
        label = labels[i]
        push(encoded, exec(regexNonASCII, label) ? 'xn--' + encode(label) : label)
      }
      return join(encoded, '.')
    }
  }, { '../internals/function-uncurry-this': 120 }],
  246: [function (require, module, exports) {
    'use strict'
    var toIntegerOrInfinity = require('../internals/to-integer-or-infinity')
    var toString = require('../internals/to-string')
    var requireObjectCoercible = require('../internals/require-object-coercible')

    var $RangeError = RangeError

    // `String.prototype.repeat` method implementation
    // https://tc39.es/ecma262/#sec-string.prototype.repeat
    module.exports = function repeat (count) {
      var str = toString(requireObjectCoercible(this))
      var result = ''
      var n = toIntegerOrInfinity(count)
      if (n < 0 || n === Infinity) throw new $RangeError('Wrong number of repetitions')
      for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) result += str
      return result
    }
  }, { '../internals/require-object-coercible': 219, '../internals/to-integer-or-infinity': 261, '../internals/to-string': 269 }],
  247: [function (require, module, exports) {
    'use strict'
    var $trimEnd = require('../internals/string-trim').end
    var forcedStringTrimMethod = require('../internals/string-trim-forced')

    // `String.prototype.{ trimEnd, trimRight }` method
    // https://tc39.es/ecma262/#sec-string.prototype.trimend
    // https://tc39.es/ecma262/#String.prototype.trimright
    module.exports = forcedStringTrimMethod('trimEnd') ? function trimEnd () {
      return $trimEnd(this)
      // eslint-disable-next-line es/no-string-prototype-trimstart-trimend -- safe
    } : ''.trimEnd
  }, { '../internals/string-trim': 250, '../internals/string-trim-forced': 248 }],
  248: [function (require, module, exports) {
    'use strict'
    var PROPER_FUNCTION_NAME = require('../internals/function-name').PROPER
    var fails = require('../internals/fails')
    var whitespaces = require('../internals/whitespaces')

    var non = '\u200B\u0085\u180E'

    // check that a method works with the correct list
    // of whitespaces and has a correct name
    module.exports = function (METHOD_NAME) {
      return fails(function () {
        return !!whitespaces[METHOD_NAME]() ||
      non[METHOD_NAME]() !== non ||
      (PROPER_FUNCTION_NAME && whitespaces[METHOD_NAME].name !== METHOD_NAME)
      })
    }
  }, { '../internals/fails': 108, '../internals/function-name': 117, '../internals/whitespaces': 286 }],
  249: [function (require, module, exports) {
    'use strict'
    var $trimStart = require('../internals/string-trim').start
    var forcedStringTrimMethod = require('../internals/string-trim-forced')

    // `String.prototype.{ trimStart, trimLeft }` method
    // https://tc39.es/ecma262/#sec-string.prototype.trimstart
    // https://tc39.es/ecma262/#String.prototype.trimleft
    module.exports = forcedStringTrimMethod('trimStart') ? function trimStart () {
      return $trimStart(this)
      // eslint-disable-next-line es/no-string-prototype-trimstart-trimend -- safe
    } : ''.trimStart
  }, { '../internals/string-trim': 250, '../internals/string-trim-forced': 248 }],
  250: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')
    var requireObjectCoercible = require('../internals/require-object-coercible')
    var toString = require('../internals/to-string')
    var whitespaces = require('../internals/whitespaces')

    var replace = uncurryThis(''.replace)
    var ltrim = RegExp('^[' + whitespaces + ']+')
    var rtrim = RegExp('(^|[^' + whitespaces + '])[' + whitespaces + ']+$')

    // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
    var createMethod = function (TYPE) {
      return function ($this) {
        var string = toString(requireObjectCoercible($this))
        if (TYPE & 1) string = replace(string, ltrim, '')
        if (TYPE & 2) string = replace(string, rtrim, '$1')
        return string
      }
    }

    module.exports = {
      // `String.prototype.{ trimLeft, trimStart }` methods
      // https://tc39.es/ecma262/#sec-string.prototype.trimstart
      start: createMethod(1),
      // `String.prototype.{ trimRight, trimEnd }` methods
      // https://tc39.es/ecma262/#sec-string.prototype.trimend
      end: createMethod(2),
      // `String.prototype.trim` method
      // https://tc39.es/ecma262/#sec-string.prototype.trim
      trim: createMethod(3)
    }
  }, { '../internals/function-uncurry-this': 120, '../internals/require-object-coercible': 219, '../internals/to-string': 269, '../internals/whitespaces': 286 }],
  251: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')
    var fails = require('../internals/fails')
    var V8 = require('../internals/environment-v8-version')
    var ENVIRONMENT = require('../internals/environment')

    var structuredClone = globalThis.structuredClone

    module.exports = !!structuredClone && !fails(function () {
      // prevent V8 ArrayBufferDetaching protector cell invalidation and performance degradation
      // https://github.com/zloirock/core-js/issues/679
      if ((ENVIRONMENT === 'DENO' && V8 > 92) || (ENVIRONMENT === 'NODE' && V8 > 94) || (ENVIRONMENT === 'BROWSER' && V8 > 97)) return false
      var buffer = new ArrayBuffer(8)
      var clone = structuredClone(buffer, { transfer: [buffer] })
      return buffer.byteLength !== 0 || clone.byteLength !== 8
    })
  }, { '../internals/environment': 102, '../internals/environment-v8-version': 100, '../internals/fails': 108, '../internals/global-this': 131 }],
  252: [function (require, module, exports) {
    'use strict'
    /* eslint-disable es/no-symbol -- required for testing */
    var V8_VERSION = require('../internals/environment-v8-version')
    var fails = require('../internals/fails')
    var globalThis = require('../internals/global-this')

    var $String = globalThis.String

    // eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
    module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
      var symbol = Symbol('symbol detection')
      // Chrome 38 Symbol has incorrect toString conversion
      // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
      // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
      // of course, fail.
      return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41
    })
  }, { '../internals/environment-v8-version': 100, '../internals/fails': 108, '../internals/global-this': 131 }],
  253: [function (require, module, exports) {
    'use strict'
    var call = require('../internals/function-call')
    var getBuiltIn = require('../internals/get-built-in')
    var wellKnownSymbol = require('../internals/well-known-symbol')
    var defineBuiltIn = require('../internals/define-built-in')

    module.exports = function () {
      var Symbol = getBuiltIn('Symbol')
      var SymbolPrototype = Symbol && Symbol.prototype
      var valueOf = SymbolPrototype && SymbolPrototype.valueOf
      var TO_PRIMITIVE = wellKnownSymbol('toPrimitive')

      if (SymbolPrototype && !SymbolPrototype[TO_PRIMITIVE]) {
        // `Symbol.prototype[@@toPrimitive]` method
        // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
        // eslint-disable-next-line no-unused-vars -- required for .length
        defineBuiltIn(SymbolPrototype, TO_PRIMITIVE, function (hint) {
          return call(valueOf, this)
        }, { arity: 1 })
      }
    }
  }, { '../internals/define-built-in': 81, '../internals/function-call': 116, '../internals/get-built-in': 123, '../internals/well-known-symbol': 285 }],
  254: [function (require, module, exports) {
    'use strict'
    var NATIVE_SYMBOL = require('../internals/symbol-constructor-detection')

    /* eslint-disable es/no-symbol -- safe */
    module.exports = NATIVE_SYMBOL && !!Symbol.for && !!Symbol.keyFor
  }, { '../internals/symbol-constructor-detection': 252 }],
  255: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')
    var apply = require('../internals/function-apply')
    var bind = require('../internals/function-bind-context')
    var isCallable = require('../internals/is-callable')
    var hasOwn = require('../internals/has-own-property')
    var fails = require('../internals/fails')
    var html = require('../internals/html')
    var arraySlice = require('../internals/array-slice')
    var createElement = require('../internals/document-create-element')
    var validateArgumentsLength = require('../internals/validate-arguments-length')
    var IS_IOS = require('../internals/environment-is-ios')
    var IS_NODE = require('../internals/environment-is-node')

    var set = globalThis.setImmediate
    var clear = globalThis.clearImmediate
    var process = globalThis.process
    var Dispatch = globalThis.Dispatch
    var Function = globalThis.Function
    var MessageChannel = globalThis.MessageChannel
    var String = globalThis.String
    var counter = 0
    var queue = {}
    var ONREADYSTATECHANGE = 'onreadystatechange'
    var $location, defer, channel, port

    fails(function () {
      // Deno throws a ReferenceError on `location` access without `--location` flag
      $location = globalThis.location
    })

    var run = function (id) {
      if (hasOwn(queue, id)) {
        var fn = queue[id]
        delete queue[id]
        fn()
      }
    }

    var runner = function (id) {
      return function () {
        run(id)
      }
    }

    var eventListener = function (event) {
      run(event.data)
    }

    var globalPostMessageDefer = function (id) {
      // old engines have not location.origin
      globalThis.postMessage(String(id), $location.protocol + '//' + $location.host)
    }

    // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
    if (!set || !clear) {
      set = function setImmediate (handler) {
        validateArgumentsLength(arguments.length, 1)
        var fn = isCallable(handler) ? handler : Function(handler)
        var args = arraySlice(arguments, 1)
        queue[++counter] = function () {
          apply(fn, undefined, args)
        }
        defer(counter)
        return counter
      }
      clear = function clearImmediate (id) {
        delete queue[id]
      }
      // Node.js 0.8-
      if (IS_NODE) {
        defer = function (id) {
          process.nextTick(runner(id))
        }
      // Sphere (JS game engine) Dispatch API
      } else if (Dispatch && Dispatch.now) {
        defer = function (id) {
          Dispatch.now(runner(id))
        }
      // Browsers with MessageChannel, includes WebWorkers
      // except iOS - https://github.com/zloirock/core-js/issues/624
      } else if (MessageChannel && !IS_IOS) {
        channel = new MessageChannel()
        port = channel.port2
        channel.port1.onmessage = eventListener
        defer = bind(port.postMessage, port)
        // Browsers with postMessage, skip WebWorkers
        // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
      } else if (
        globalThis.addEventListener &&
    isCallable(globalThis.postMessage) &&
    !globalThis.importScripts &&
    $location && $location.protocol !== 'file:' &&
    !fails(globalPostMessageDefer)
      ) {
        defer = globalPostMessageDefer
        globalThis.addEventListener('message', eventListener, false)
        // IE8-
      } else if (ONREADYSTATECHANGE in createElement('script')) {
        defer = function (id) {
          html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
            html.removeChild(this)
            run(id)
          }
        }
      // Rest old browsers
      } else {
        defer = function (id) {
          setTimeout(runner(id), 0)
        }
      }
    }

    module.exports = {
      set: set,
      clear: clear
    }
  }, { '../internals/array-slice': 52, '../internals/document-create-element': 87, '../internals/environment-is-ios': 96, '../internals/environment-is-node': 97, '../internals/fails': 108, '../internals/function-apply': 112, '../internals/function-bind-context': 113, '../internals/global-this': 131, '../internals/has-own-property': 132, '../internals/html': 135, '../internals/is-callable': 147, '../internals/validate-arguments-length': 281 }],
  256: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')

    // `thisNumberValue` abstract operation
    // https://tc39.es/ecma262/#sec-thisnumbervalue
    module.exports = uncurryThis(1.0.valueOf)
  }, { '../internals/function-uncurry-this': 120 }],
  257: [function (require, module, exports) {
    'use strict'
    var toIntegerOrInfinity = require('../internals/to-integer-or-infinity')

    var max = Math.max
    var min = Math.min

    // Helper for a popular repeating case of the spec:
    // Let integer be ? ToInteger(index).
    // If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
    module.exports = function (index, length) {
      var integer = toIntegerOrInfinity(index)
      return integer < 0 ? max(integer + length, 0) : min(integer, length)
    }
  }, { '../internals/to-integer-or-infinity': 261 }],
  258: [function (require, module, exports) {
    'use strict'
    var toPrimitive = require('../internals/to-primitive')

    var $TypeError = TypeError

    // `ToBigInt` abstract operation
    // https://tc39.es/ecma262/#sec-tobigint
    module.exports = function (argument) {
      var prim = toPrimitive(argument, 'number')
      if (typeof prim === 'number') throw new $TypeError("Can't convert number to bigint")
      // eslint-disable-next-line es/no-bigint -- safe
      return BigInt(prim)
    }
  }, { '../internals/to-primitive': 266 }],
  259: [function (require, module, exports) {
    'use strict'
    var toIntegerOrInfinity = require('../internals/to-integer-or-infinity')
    var toLength = require('../internals/to-length')

    var $RangeError = RangeError

    // `ToIndex` abstract operation
    // https://tc39.es/ecma262/#sec-toindex
    module.exports = function (it) {
      if (it === undefined) return 0
      var number = toIntegerOrInfinity(it)
      var length = toLength(number)
      if (number !== length) throw new $RangeError('Wrong length or index')
      return length
    }
  }, { '../internals/to-integer-or-infinity': 261, '../internals/to-length': 262 }],
  260: [function (require, module, exports) {
    'use strict'
    // toObject with fallback for non-array-like ES3 strings
    var IndexedObject = require('../internals/indexed-object')
    var requireObjectCoercible = require('../internals/require-object-coercible')

    module.exports = function (it) {
      return IndexedObject(requireObjectCoercible(it))
    }
  }, { '../internals/indexed-object': 138, '../internals/require-object-coercible': 219 }],
  261: [function (require, module, exports) {
    'use strict'
    var trunc = require('../internals/math-trunc')

    // `ToIntegerOrInfinity` abstract operation
    // https://tc39.es/ecma262/#sec-tointegerorinfinity
    module.exports = function (argument) {
      var number = +argument
      // eslint-disable-next-line no-self-compare -- NaN check
      return number !== number || number === 0 ? 0 : trunc(number)
    }
  }, { '../internals/math-trunc': 176 }],
  262: [function (require, module, exports) {
    'use strict'
    var toIntegerOrInfinity = require('../internals/to-integer-or-infinity')

    var min = Math.min

    // `ToLength` abstract operation
    // https://tc39.es/ecma262/#sec-tolength
    module.exports = function (argument) {
      var len = toIntegerOrInfinity(argument)
      return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0 // 2 ** 53 - 1 == 9007199254740991
    }
  }, { '../internals/to-integer-or-infinity': 261 }],
  263: [function (require, module, exports) {
    'use strict'
    var requireObjectCoercible = require('../internals/require-object-coercible')

    var $Object = Object

    // `ToObject` abstract operation
    // https://tc39.es/ecma262/#sec-toobject
    module.exports = function (argument) {
      return $Object(requireObjectCoercible(argument))
    }
  }, { '../internals/require-object-coercible': 219 }],
  264: [function (require, module, exports) {
    'use strict'
    var toPositiveInteger = require('../internals/to-positive-integer')

    var $RangeError = RangeError

    module.exports = function (it, BYTES) {
      var offset = toPositiveInteger(it)
      if (offset % BYTES) throw new $RangeError('Wrong offset')
      return offset
    }
  }, { '../internals/to-positive-integer': 265 }],
  265: [function (require, module, exports) {
    'use strict'
    var toIntegerOrInfinity = require('../internals/to-integer-or-infinity')

    var $RangeError = RangeError

    module.exports = function (it) {
      var result = toIntegerOrInfinity(it)
      if (result < 0) throw new $RangeError("The argument can't be less than 0")
      return result
    }
  }, { '../internals/to-integer-or-infinity': 261 }],
  266: [function (require, module, exports) {
    'use strict'
    var call = require('../internals/function-call')
    var isObject = require('../internals/is-object')
    var isSymbol = require('../internals/is-symbol')
    var getMethod = require('../internals/get-method')
    var ordinaryToPrimitive = require('../internals/ordinary-to-primitive')
    var wellKnownSymbol = require('../internals/well-known-symbol')

    var $TypeError = TypeError
    var TO_PRIMITIVE = wellKnownSymbol('toPrimitive')

    // `ToPrimitive` abstract operation
    // https://tc39.es/ecma262/#sec-toprimitive
    module.exports = function (input, pref) {
      if (!isObject(input) || isSymbol(input)) return input
      var exoticToPrim = getMethod(input, TO_PRIMITIVE)
      var result
      if (exoticToPrim) {
        if (pref === undefined) pref = 'default'
        result = call(exoticToPrim, input, pref)
        if (!isObject(result) || isSymbol(result)) return result
        throw new $TypeError("Can't convert object to primitive value")
      }
      if (pref === undefined) pref = 'number'
      return ordinaryToPrimitive(input, pref)
    }
  }, { '../internals/function-call': 116, '../internals/get-method': 128, '../internals/is-object': 153, '../internals/is-symbol': 157, '../internals/ordinary-to-primitive': 202, '../internals/well-known-symbol': 285 }],
  267: [function (require, module, exports) {
    'use strict'
    var toPrimitive = require('../internals/to-primitive')
    var isSymbol = require('../internals/is-symbol')

    // `ToPropertyKey` abstract operation
    // https://tc39.es/ecma262/#sec-topropertykey
    module.exports = function (argument) {
      var key = toPrimitive(argument, 'string')
      return isSymbol(key) ? key : key + ''
    }
  }, { '../internals/is-symbol': 157, '../internals/to-primitive': 266 }],
  268: [function (require, module, exports) {
    'use strict'
    var wellKnownSymbol = require('../internals/well-known-symbol')

    var TO_STRING_TAG = wellKnownSymbol('toStringTag')
    var test = {}

    test[TO_STRING_TAG] = 'z'

    module.exports = String(test) === '[object z]'
  }, { '../internals/well-known-symbol': 285 }],
  269: [function (require, module, exports) {
    'use strict'
    var classof = require('../internals/classof')

    var $String = String

    module.exports = function (argument) {
      if (classof(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string')
      return $String(argument)
    }
  }, { '../internals/classof': 66 }],
  270: [function (require, module, exports) {
    'use strict'
    var round = Math.round

    module.exports = function (it) {
      var value = round(it)
      return value < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF
    }
  }, {}],
  271: [function (require, module, exports) {
    'use strict'
    var $String = String

    module.exports = function (argument) {
      try {
        return $String(argument)
      } catch (error) {
        return 'Object'
      }
    }
  }, {}],
  272: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var globalThis = require('../internals/global-this')
    var call = require('../internals/function-call')
    var DESCRIPTORS = require('../internals/descriptors')
    var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = require('../internals/typed-array-constructors-require-wrappers')
    var ArrayBufferViewCore = require('../internals/array-buffer-view-core')
    var ArrayBufferModule = require('../internals/array-buffer')
    var anInstance = require('../internals/an-instance')
    var createPropertyDescriptor = require('../internals/create-property-descriptor')
    var createNonEnumerableProperty = require('../internals/create-non-enumerable-property')
    var isIntegralNumber = require('../internals/is-integral-number')
    var toLength = require('../internals/to-length')
    var toIndex = require('../internals/to-index')
    var toOffset = require('../internals/to-offset')
    var toUint8Clamped = require('../internals/to-uint8-clamped')
    var toPropertyKey = require('../internals/to-property-key')
    var hasOwn = require('../internals/has-own-property')
    var classof = require('../internals/classof')
    var isObject = require('../internals/is-object')
    var isSymbol = require('../internals/is-symbol')
    var create = require('../internals/object-create')
    var isPrototypeOf = require('../internals/object-is-prototype-of')
    var setPrototypeOf = require('../internals/object-set-prototype-of')
    var getOwnPropertyNames = require('../internals/object-get-own-property-names').f
    var typedArrayFrom = require('../internals/typed-array-from')
    var forEach = require('../internals/array-iteration').forEach
    var setSpecies = require('../internals/set-species')
    var defineBuiltInAccessor = require('../internals/define-built-in-accessor')
    var definePropertyModule = require('../internals/object-define-property')
    var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor')
    var arrayFromConstructorAndList = require('../internals/array-from-constructor-and-list')
    var InternalStateModule = require('../internals/internal-state')
    var inheritIfRequired = require('../internals/inherit-if-required')

    var getInternalState = InternalStateModule.get
    var setInternalState = InternalStateModule.set
    var enforceInternalState = InternalStateModule.enforce
    var nativeDefineProperty = definePropertyModule.f
    var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f
    var RangeError = globalThis.RangeError
    var ArrayBuffer = ArrayBufferModule.ArrayBuffer
    var ArrayBufferPrototype = ArrayBuffer.prototype
    var DataView = ArrayBufferModule.DataView
    var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS
    var TYPED_ARRAY_TAG = ArrayBufferViewCore.TYPED_ARRAY_TAG
    var TypedArray = ArrayBufferViewCore.TypedArray
    var TypedArrayPrototype = ArrayBufferViewCore.TypedArrayPrototype
    var isTypedArray = ArrayBufferViewCore.isTypedArray
    var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT'
    var WRONG_LENGTH = 'Wrong length'

    var addGetter = function (it, key) {
      defineBuiltInAccessor(it, key, {
        configurable: true,
        get: function () {
          return getInternalState(this)[key]
        }
      })
    }

    var isArrayBuffer = function (it) {
      var klass
      return isPrototypeOf(ArrayBufferPrototype, it) || (klass = classof(it)) === 'ArrayBuffer' || klass === 'SharedArrayBuffer'
    }

    var isTypedArrayIndex = function (target, key) {
      return isTypedArray(target) &&
    !isSymbol(key) &&
    key in target &&
    isIntegralNumber(+key) &&
    key >= 0
    }

    var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor (target, key) {
      key = toPropertyKey(key)
      return isTypedArrayIndex(target, key)
        ? createPropertyDescriptor(2, target[key])
        : nativeGetOwnPropertyDescriptor(target, key)
    }

    var wrappedDefineProperty = function defineProperty (target, key, descriptor) {
      key = toPropertyKey(key)
      if (isTypedArrayIndex(target, key) &&
    isObject(descriptor) &&
    hasOwn(descriptor, 'value') &&
    !hasOwn(descriptor, 'get') &&
    !hasOwn(descriptor, 'set') &&
    // TODO: add validation descriptor w/o calling accessors
    !descriptor.configurable &&
    (!hasOwn(descriptor, 'writable') || descriptor.writable) &&
    (!hasOwn(descriptor, 'enumerable') || descriptor.enumerable)
      ) {
        target[key] = descriptor.value
        return target
      } return nativeDefineProperty(target, key, descriptor)
    }

    if (DESCRIPTORS) {
      if (!NATIVE_ARRAY_BUFFER_VIEWS) {
        getOwnPropertyDescriptorModule.f = wrappedGetOwnPropertyDescriptor
        definePropertyModule.f = wrappedDefineProperty
        addGetter(TypedArrayPrototype, 'buffer')
        addGetter(TypedArrayPrototype, 'byteOffset')
        addGetter(TypedArrayPrototype, 'byteLength')
        addGetter(TypedArrayPrototype, 'length')
      }

      $({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
        getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
        defineProperty: wrappedDefineProperty
      })

      module.exports = function (TYPE, wrapper, CLAMPED) {
        var BYTES = TYPE.match(/\d+/)[0] / 8
        var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array'
        var GETTER = 'get' + TYPE
        var SETTER = 'set' + TYPE
        var NativeTypedArrayConstructor = globalThis[CONSTRUCTOR_NAME]
        var TypedArrayConstructor = NativeTypedArrayConstructor
        var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype
        var exported = {}

        var getter = function (that, index) {
          var data = getInternalState(that)
          return data.view[GETTER](index * BYTES + data.byteOffset, true)
        }

        var setter = function (that, index, value) {
          var data = getInternalState(that)
          data.view[SETTER](index * BYTES + data.byteOffset, CLAMPED ? toUint8Clamped(value) : value, true)
        }

        var addElement = function (that, index) {
          nativeDefineProperty(that, index, {
            get: function () {
              return getter(this, index)
            },
            set: function (value) {
              return setter(this, index, value)
            },
            enumerable: true
          })
        }

        if (!NATIVE_ARRAY_BUFFER_VIEWS) {
          TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
            anInstance(that, TypedArrayConstructorPrototype)
            var index = 0
            var byteOffset = 0
            var buffer, byteLength, length
            if (!isObject(data)) {
              length = toIndex(data)
              byteLength = length * BYTES
              buffer = new ArrayBuffer(byteLength)
            } else if (isArrayBuffer(data)) {
              buffer = data
              byteOffset = toOffset(offset, BYTES)
              var $len = data.byteLength
              if ($length === undefined) {
                if ($len % BYTES) throw new RangeError(WRONG_LENGTH)
                byteLength = $len - byteOffset
                if (byteLength < 0) throw new RangeError(WRONG_LENGTH)
              } else {
                byteLength = toLength($length) * BYTES
                if (byteLength + byteOffset > $len) throw new RangeError(WRONG_LENGTH)
              }
              length = byteLength / BYTES
            } else if (isTypedArray(data)) {
              return arrayFromConstructorAndList(TypedArrayConstructor, data)
            } else {
              return call(typedArrayFrom, TypedArrayConstructor, data)
            }
            setInternalState(that, {
              buffer: buffer,
              byteOffset: byteOffset,
              byteLength: byteLength,
              length: length,
              view: new DataView(buffer)
            })
            while (index < length) addElement(that, index++)
          })

          if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray)
          TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = create(TypedArrayPrototype)
        } else if (TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS) {
          TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
            anInstance(dummy, TypedArrayConstructorPrototype)
            return inheritIfRequired((function () {
              if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data))
              if (isArrayBuffer(data)) {
                return $length !== undefined
                  ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES), $length)
                  : typedArrayOffset !== undefined
                    ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES))
                    : new NativeTypedArrayConstructor(data)
              }
              if (isTypedArray(data)) return arrayFromConstructorAndList(TypedArrayConstructor, data)
              return call(typedArrayFrom, TypedArrayConstructor, data)
            }()), dummy, TypedArrayConstructor)
          })

          if (setPrototypeOf) setPrototypeOf(TypedArrayConstructor, TypedArray)
          forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
            if (!(key in TypedArrayConstructor)) {
              createNonEnumerableProperty(TypedArrayConstructor, key, NativeTypedArrayConstructor[key])
            }
          })
          TypedArrayConstructor.prototype = TypedArrayConstructorPrototype
        }

        if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
          createNonEnumerableProperty(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor)
        }

        enforceInternalState(TypedArrayConstructorPrototype).TypedArrayConstructor = TypedArrayConstructor

        if (TYPED_ARRAY_TAG) {
          createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME)
        }

        var FORCED = TypedArrayConstructor !== NativeTypedArrayConstructor

        exported[CONSTRUCTOR_NAME] = TypedArrayConstructor

        $({ global: true, constructor: true, forced: FORCED, sham: !NATIVE_ARRAY_BUFFER_VIEWS }, exported)

        if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
          createNonEnumerableProperty(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES)
        }

        if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
          createNonEnumerableProperty(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES)
        }

        setSpecies(CONSTRUCTOR_NAME)
      }
    } else module.exports = function () { /* empty */ }
  }, { '../internals/an-instance': 29, '../internals/array-buffer': 38, '../internals/array-buffer-view-core': 37, '../internals/array-from-constructor-and-list': 42, '../internals/array-iteration': 46, '../internals/classof': 66, '../internals/create-non-enumerable-property': 75, '../internals/create-property-descriptor': 76, '../internals/define-built-in-accessor': 80, '../internals/descriptors': 85, '../internals/export': 107, '../internals/function-call': 116, '../internals/global-this': 131, '../internals/has-own-property': 132, '../internals/inherit-if-required': 139, '../internals/internal-state': 143, '../internals/is-integral-number': 151, '../internals/is-object': 153, '../internals/is-symbol': 157, '../internals/object-create': 185, '../internals/object-define-property': 187, '../internals/object-get-own-property-descriptor': 188, '../internals/object-get-own-property-names': 190, '../internals/object-is-prototype-of': 194, '../internals/object-set-prototype-of': 199, '../internals/set-species': 233, '../internals/to-index': 259, '../internals/to-length': 262, '../internals/to-offset': 264, '../internals/to-property-key': 267, '../internals/to-uint8-clamped': 270, '../internals/typed-array-constructors-require-wrappers': 273, '../internals/typed-array-from': 275 }],
  273: [function (require, module, exports) {
    'use strict'
    /* eslint-disable no-new, sonar/inconsistent-function-call -- required for testing */
    var globalThis = require('../internals/global-this')
    var fails = require('../internals/fails')
    var checkCorrectnessOfIteration = require('../internals/check-correctness-of-iteration')
    var NATIVE_ARRAY_BUFFER_VIEWS = require('../internals/array-buffer-view-core').NATIVE_ARRAY_BUFFER_VIEWS

    var ArrayBuffer = globalThis.ArrayBuffer
    var Int8Array = globalThis.Int8Array

    module.exports = !NATIVE_ARRAY_BUFFER_VIEWS || !fails(function () {
      Int8Array(1)
    }) || !fails(function () {
      new Int8Array(-1)
    }) || !checkCorrectnessOfIteration(function (iterable) {
      new Int8Array()
      new Int8Array(null)
      new Int8Array(1.5)
      new Int8Array(iterable)
    }, true) || fails(function () {
      // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
      return new Int8Array(new ArrayBuffer(2), 1, undefined).length !== 1
    })
  }, { '../internals/array-buffer-view-core': 37, '../internals/check-correctness-of-iteration': 64, '../internals/fails': 108, '../internals/global-this': 131 }],
  274: [function (require, module, exports) {
    'use strict'
    var arrayFromConstructorAndList = require('../internals/array-from-constructor-and-list')
    var typedArraySpeciesConstructor = require('../internals/typed-array-species-constructor')

    module.exports = function (instance, list) {
      return arrayFromConstructorAndList(typedArraySpeciesConstructor(instance), list)
    }
  }, { '../internals/array-from-constructor-and-list': 42, '../internals/typed-array-species-constructor': 276 }],
  275: [function (require, module, exports) {
    'use strict'
    var bind = require('../internals/function-bind-context')
    var call = require('../internals/function-call')
    var aConstructor = require('../internals/a-constructor')
    var toObject = require('../internals/to-object')
    var lengthOfArrayLike = require('../internals/length-of-array-like')
    var getIterator = require('../internals/get-iterator')
    var getIteratorMethod = require('../internals/get-iterator-method')
    var isArrayIteratorMethod = require('../internals/is-array-iterator-method')
    var isBigIntArray = require('../internals/is-big-int-array')
    var aTypedArrayConstructor = require('../internals/array-buffer-view-core').aTypedArrayConstructor
    var toBigInt = require('../internals/to-big-int')

    module.exports = function from (source /* , mapfn, thisArg */) {
      var C = aConstructor(this)
      var O = toObject(source)
      var argumentsLength = arguments.length
      var mapfn = argumentsLength > 1 ? arguments[1] : undefined
      var mapping = mapfn !== undefined
      var iteratorMethod = getIteratorMethod(O)
      var i, length, result, thisIsBigIntArray, value, step, iterator, next
      if (iteratorMethod && !isArrayIteratorMethod(iteratorMethod)) {
        iterator = getIterator(O, iteratorMethod)
        next = iterator.next
        O = []
        while (!(step = call(next, iterator)).done) {
          O.push(step.value)
        }
      }
      if (mapping && argumentsLength > 2) {
        mapfn = bind(mapfn, arguments[2])
      }
      length = lengthOfArrayLike(O)
      result = new (aTypedArrayConstructor(C))(length)
      thisIsBigIntArray = isBigIntArray(result)
      for (i = 0; length > i; i++) {
        value = mapping ? mapfn(O[i], i) : O[i]
        // FF30- typed arrays doesn't properly convert objects to typed array values
        result[i] = thisIsBigIntArray ? toBigInt(value) : +value
      }
      return result
    }
  }, { '../internals/a-constructor': 24, '../internals/array-buffer-view-core': 37, '../internals/function-bind-context': 113, '../internals/function-call': 116, '../internals/get-iterator': 126, '../internals/get-iterator-method': 125, '../internals/is-array-iterator-method': 144, '../internals/is-big-int-array': 146, '../internals/length-of-array-like': 167, '../internals/to-big-int': 258, '../internals/to-object': 263 }],
  276: [function (require, module, exports) {
    'use strict'
    var ArrayBufferViewCore = require('../internals/array-buffer-view-core')
    var speciesConstructor = require('../internals/species-constructor')

    var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor
    var getTypedArrayConstructor = ArrayBufferViewCore.getTypedArrayConstructor

    // a part of `TypedArraySpeciesCreate` abstract operation
    // https://tc39.es/ecma262/#typedarray-species-create
    module.exports = function (originalArray) {
      return aTypedArrayConstructor(speciesConstructor(originalArray, getTypedArrayConstructor(originalArray)))
    }
  }, { '../internals/array-buffer-view-core': 37, '../internals/species-constructor': 240 }],
  277: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')

    var id = 0
    var postfix = Math.random()
    var toString = uncurryThis(1.0.toString)

    module.exports = function (key) {
      return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36)
    }
  }, { '../internals/function-uncurry-this': 120 }],
  278: [function (require, module, exports) {
    'use strict'
    var fails = require('../internals/fails')
    var wellKnownSymbol = require('../internals/well-known-symbol')
    var DESCRIPTORS = require('../internals/descriptors')
    var IS_PURE = require('../internals/is-pure')

    var ITERATOR = wellKnownSymbol('iterator')

    module.exports = !fails(function () {
      // eslint-disable-next-line unicorn/relative-url-style -- required for testing
      var url = new URL('b?a=1&b=2&c=3', 'https://a')
      var params = url.searchParams
      var params2 = new URLSearchParams('a=1&a=2&b=3')
      var result = ''
      url.pathname = 'c%20d'
      params.forEach(function (value, key) {
        params.delete('b')
        result += key + value
      })
      params2.delete('a', 2)
      // `undefined` case is a Chromium 117 bug
      // https://bugs.chromium.org/p/v8/issues/detail?id=14222
      params2.delete('b', undefined)
      return (IS_PURE && (!url.toJSON || !params2.has('a', 1) || params2.has('a', 2) || !params2.has('a', undefined) || params2.has('b'))) ||
    (!params.size && (IS_PURE || !DESCRIPTORS)) ||
    !params.sort ||
    url.href !== 'https://a/c%20d?a=1&c=3' ||
    params.get('c') !== '3' ||
    String(new URLSearchParams('?a=1')) !== 'a=1' ||
    !params[ITERATOR] ||
    // throws in Edge
    new URL('https://a@b').username !== 'a' ||
    new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b' ||
    // not punycoded in Edge
    new URL('https://тест').host !== 'xn--e1aybc' ||
    // not escaped in Chrome 62-
    new URL('https://a#б').hash !== '#%D0%B1' ||
    // fails in Chrome 66-
    result !== 'a1c3' ||
    // throws in Safari
    new URL('https://x', undefined).host !== 'x'
    })
  }, { '../internals/descriptors': 85, '../internals/fails': 108, '../internals/is-pure': 155, '../internals/well-known-symbol': 285 }],
  279: [function (require, module, exports) {
    'use strict'
    /* eslint-disable es/no-symbol -- required for testing */
    var NATIVE_SYMBOL = require('../internals/symbol-constructor-detection')

    module.exports = NATIVE_SYMBOL &&
  !Symbol.sham &&
  typeof Symbol.iterator === 'symbol'
  }, { '../internals/symbol-constructor-detection': 252 }],
  280: [function (require, module, exports) {
    'use strict'
    var DESCRIPTORS = require('../internals/descriptors')
    var fails = require('../internals/fails')

    // V8 ~ Chrome 36-
    // https://bugs.chromium.org/p/v8/issues/detail?id=3334
    module.exports = DESCRIPTORS && fails(function () {
      // eslint-disable-next-line es/no-object-defineproperty -- required for testing
      return Object.defineProperty(function () { /* empty */ }, 'prototype', {
        value: 42,
        writable: false
      }).prototype !== 42
    })
  }, { '../internals/descriptors': 85, '../internals/fails': 108 }],
  281: [function (require, module, exports) {
    'use strict'
    var $TypeError = TypeError

    module.exports = function (passed, required) {
      if (passed < required) throw new $TypeError('Not enough arguments')
      return passed
    }
  }, {}],
  282: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')
    var isCallable = require('../internals/is-callable')

    var WeakMap = globalThis.WeakMap

    module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap))
  }, { '../internals/global-this': 131, '../internals/is-callable': 147 }],
  283: [function (require, module, exports) {
    'use strict'
    var path = require('../internals/path')
    var hasOwn = require('../internals/has-own-property')
    var wrappedWellKnownSymbolModule = require('../internals/well-known-symbol-wrapped')
    var defineProperty = require('../internals/object-define-property').f

    module.exports = function (NAME) {
      var Symbol = path.Symbol || (path.Symbol = {})
      if (!hasOwn(Symbol, NAME)) {
        defineProperty(Symbol, NAME, {
          value: wrappedWellKnownSymbolModule.f(NAME)
        })
      }
    }
  }, { '../internals/has-own-property': 132, '../internals/object-define-property': 187, '../internals/path': 204, '../internals/well-known-symbol-wrapped': 284 }],
  284: [function (require, module, exports) {
    'use strict'
    var wellKnownSymbol = require('../internals/well-known-symbol')

    exports.f = wellKnownSymbol
  }, { '../internals/well-known-symbol': 285 }],
  285: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')
    var shared = require('../internals/shared')
    var hasOwn = require('../internals/has-own-property')
    var uid = require('../internals/uid')
    var NATIVE_SYMBOL = require('../internals/symbol-constructor-detection')
    var USE_SYMBOL_AS_UID = require('../internals/use-symbol-as-uid')

    var Symbol = globalThis.Symbol
    var WellKnownSymbolsStore = shared('wks')
    var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol.for || Symbol : Symbol && Symbol.withoutSetter || uid

    module.exports = function (name) {
      if (!hasOwn(WellKnownSymbolsStore, name)) {
        WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
          ? Symbol[name]
          : createWellKnownSymbol('Symbol.' + name)
      } return WellKnownSymbolsStore[name]
    }
  }, { '../internals/global-this': 131, '../internals/has-own-property': 132, '../internals/shared': 239, '../internals/symbol-constructor-detection': 252, '../internals/uid': 277, '../internals/use-symbol-as-uid': 279 }],
  286: [function (require, module, exports) {
    'use strict'
    // a string of all valid unicode whitespaces
    module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF'
  }, {}],
  287: [function (require, module, exports) {
    'use strict'
    var getBuiltIn = require('../internals/get-built-in')
    var hasOwn = require('../internals/has-own-property')
    var createNonEnumerableProperty = require('../internals/create-non-enumerable-property')
    var isPrototypeOf = require('../internals/object-is-prototype-of')
    var setPrototypeOf = require('../internals/object-set-prototype-of')
    var copyConstructorProperties = require('../internals/copy-constructor-properties')
    var proxyAccessor = require('../internals/proxy-accessor')
    var inheritIfRequired = require('../internals/inherit-if-required')
    var normalizeStringArgument = require('../internals/normalize-string-argument')
    var installErrorCause = require('../internals/install-error-cause')
    var installErrorStack = require('../internals/error-stack-install')
    var DESCRIPTORS = require('../internals/descriptors')
    var IS_PURE = require('../internals/is-pure')

    module.exports = function (FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {
      var STACK_TRACE_LIMIT = 'stackTraceLimit'
      var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1
      var path = FULL_NAME.split('.')
      var ERROR_NAME = path[path.length - 1]
      var OriginalError = getBuiltIn.apply(null, path)

      if (!OriginalError) return

      var OriginalErrorPrototype = OriginalError.prototype

      // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006
      if (!IS_PURE && hasOwn(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause

      if (!FORCED) return OriginalError

      var BaseError = getBuiltIn('Error')

      var WrappedError = wrapper(function (a, b) {
        var message = normalizeStringArgument(IS_AGGREGATE_ERROR ? b : a, undefined)
        var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError()
        if (message !== undefined) createNonEnumerableProperty(result, 'message', message)
        installErrorStack(result, WrappedError, result.stack, 2)
        if (this && isPrototypeOf(OriginalErrorPrototype, this)) inheritIfRequired(result, this, WrappedError)
        if (arguments.length > OPTIONS_POSITION) installErrorCause(result, arguments[OPTIONS_POSITION])
        return result
      })

      WrappedError.prototype = OriginalErrorPrototype

      if (ERROR_NAME !== 'Error') {
        if (setPrototypeOf) setPrototypeOf(WrappedError, BaseError)
        else copyConstructorProperties(WrappedError, BaseError, { name: true })
      } else if (DESCRIPTORS && STACK_TRACE_LIMIT in OriginalError) {
        proxyAccessor(WrappedError, OriginalError, STACK_TRACE_LIMIT)
        proxyAccessor(WrappedError, OriginalError, 'prepareStackTrace')
      }

      copyConstructorProperties(WrappedError, OriginalError)

      if (!IS_PURE) {
        try {
        // Safari 13- bug: WebAssembly errors does not have a proper `.name`
          if (OriginalErrorPrototype.name !== ERROR_NAME) {
            createNonEnumerableProperty(OriginalErrorPrototype, 'name', ERROR_NAME)
          }
          OriginalErrorPrototype.constructor = WrappedError
        } catch (error) { /* empty */ }
      }

      return WrappedError
    }
  }, { '../internals/copy-constructor-properties': 70, '../internals/create-non-enumerable-property': 75, '../internals/descriptors': 85, '../internals/error-stack-install': 104, '../internals/get-built-in': 123, '../internals/has-own-property': 132, '../internals/inherit-if-required': 139, '../internals/install-error-cause': 141, '../internals/is-pure': 155, '../internals/normalize-string-argument': 179, '../internals/object-is-prototype-of': 194, '../internals/object-set-prototype-of': 199, '../internals/proxy-accessor': 210 }],
  288: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var getBuiltIn = require('../internals/get-built-in')
    var apply = require('../internals/function-apply')
    var fails = require('../internals/fails')
    var wrapErrorConstructorWithCause = require('../internals/wrap-error-constructor-with-cause')

    var AGGREGATE_ERROR = 'AggregateError'
    var $AggregateError = getBuiltIn(AGGREGATE_ERROR)

    var FORCED = !fails(function () {
      return $AggregateError([1]).errors[0] !== 1
    }) && fails(function () {
      return $AggregateError([1], AGGREGATE_ERROR, { cause: 7 }).cause !== 7
    })

    // https://tc39.es/ecma262/#sec-aggregate-error
    $({ global: true, constructor: true, arity: 2, forced: FORCED }, {
      AggregateError: wrapErrorConstructorWithCause(AGGREGATE_ERROR, function (init) {
        // eslint-disable-next-line no-unused-vars -- required for functions `.length`
        return function AggregateError (errors, message) { return apply(init, this, arguments) }
      }, FORCED, true)
    })
  }, { '../internals/export': 107, '../internals/fails': 108, '../internals/function-apply': 112, '../internals/get-built-in': 123, '../internals/wrap-error-constructor-with-cause': 287 }],
  289: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var isPrototypeOf = require('../internals/object-is-prototype-of')
    var getPrototypeOf = require('../internals/object-get-prototype-of')
    var setPrototypeOf = require('../internals/object-set-prototype-of')
    var copyConstructorProperties = require('../internals/copy-constructor-properties')
    var create = require('../internals/object-create')
    var createNonEnumerableProperty = require('../internals/create-non-enumerable-property')
    var createPropertyDescriptor = require('../internals/create-property-descriptor')
    var installErrorCause = require('../internals/install-error-cause')
    var installErrorStack = require('../internals/error-stack-install')
    var iterate = require('../internals/iterate')
    var normalizeStringArgument = require('../internals/normalize-string-argument')
    var wellKnownSymbol = require('../internals/well-known-symbol')

    var TO_STRING_TAG = wellKnownSymbol('toStringTag')
    var $Error = Error
    var push = [].push

    var $AggregateError = function AggregateError (errors, message /* , options */) {
      var isInstance = isPrototypeOf(AggregateErrorPrototype, this)
      var that
      if (setPrototypeOf) {
        that = setPrototypeOf(new $Error(), isInstance ? getPrototypeOf(this) : AggregateErrorPrototype)
      } else {
        that = isInstance ? this : create(AggregateErrorPrototype)
        createNonEnumerableProperty(that, TO_STRING_TAG, 'Error')
      }
      if (message !== undefined) createNonEnumerableProperty(that, 'message', normalizeStringArgument(message))
      installErrorStack(that, $AggregateError, that.stack, 1)
      if (arguments.length > 2) installErrorCause(that, arguments[2])
      var errorsArray = []
      iterate(errors, push, { that: errorsArray })
      createNonEnumerableProperty(that, 'errors', errorsArray)
      return that
    }

    if (setPrototypeOf) setPrototypeOf($AggregateError, $Error)
    else copyConstructorProperties($AggregateError, $Error, { name: true })

    var AggregateErrorPrototype = $AggregateError.prototype = create($Error.prototype, {
      constructor: createPropertyDescriptor(1, $AggregateError),
      message: createPropertyDescriptor(1, ''),
      name: createPropertyDescriptor(1, 'AggregateError')
    })

    // `AggregateError` constructor
    // https://tc39.es/ecma262/#sec-aggregate-error-constructor
    $({ global: true, constructor: true, arity: 2 }, {
      AggregateError: $AggregateError
    })
  }, { '../internals/copy-constructor-properties': 70, '../internals/create-non-enumerable-property': 75, '../internals/create-property-descriptor': 76, '../internals/error-stack-install': 104, '../internals/export': 107, '../internals/install-error-cause': 141, '../internals/iterate': 159, '../internals/normalize-string-argument': 179, '../internals/object-create': 185, '../internals/object-get-prototype-of': 192, '../internals/object-is-prototype-of': 194, '../internals/object-set-prototype-of': 199, '../internals/well-known-symbol': 285 }],
  290: [function (require, module, exports) {
    'use strict'
    // TODO: Remove this module from `core-js@4` since it's replaced to module below
    require('../modules/es.aggregate-error.constructor')
  }, { '../modules/es.aggregate-error.constructor': 289 }],
  291: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var globalThis = require('../internals/global-this')
    var arrayBufferModule = require('../internals/array-buffer')
    var setSpecies = require('../internals/set-species')

    var ARRAY_BUFFER = 'ArrayBuffer'
    var ArrayBuffer = arrayBufferModule[ARRAY_BUFFER]
    var NativeArrayBuffer = globalThis[ARRAY_BUFFER]

    // `ArrayBuffer` constructor
    // https://tc39.es/ecma262/#sec-arraybuffer-constructor
    $({ global: true, constructor: true, forced: NativeArrayBuffer !== ArrayBuffer }, {
      ArrayBuffer: ArrayBuffer
    })

    setSpecies(ARRAY_BUFFER)
  }, { '../internals/array-buffer': 38, '../internals/export': 107, '../internals/global-this': 131, '../internals/set-species': 233 }],
  292: [function (require, module, exports) {
    'use strict'
    var DESCRIPTORS = require('../internals/descriptors')
    var defineBuiltInAccessor = require('../internals/define-built-in-accessor')
    var isDetached = require('../internals/array-buffer-is-detached')

    var ArrayBufferPrototype = ArrayBuffer.prototype

    if (DESCRIPTORS && !('detached' in ArrayBufferPrototype)) {
      defineBuiltInAccessor(ArrayBufferPrototype, 'detached', {
        configurable: true,
        get: function detached () {
          return isDetached(this)
        }
      })
    }
  }, { '../internals/array-buffer-is-detached': 33, '../internals/define-built-in-accessor': 80, '../internals/descriptors': 85 }],
  293: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var ArrayBufferViewCore = require('../internals/array-buffer-view-core')

    var NATIVE_ARRAY_BUFFER_VIEWS = ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS

    // `ArrayBuffer.isView` method
    // https://tc39.es/ecma262/#sec-arraybuffer.isview
    $({ target: 'ArrayBuffer', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
      isView: ArrayBufferViewCore.isView
    })
  }, { '../internals/array-buffer-view-core': 37, '../internals/export': 107 }],
  294: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var uncurryThis = require('../internals/function-uncurry-this-clause')
    var fails = require('../internals/fails')
    var ArrayBufferModule = require('../internals/array-buffer')
    var anObject = require('../internals/an-object')
    var toAbsoluteIndex = require('../internals/to-absolute-index')
    var toLength = require('../internals/to-length')
    var speciesConstructor = require('../internals/species-constructor')

    var ArrayBuffer = ArrayBufferModule.ArrayBuffer
    var DataView = ArrayBufferModule.DataView
    var DataViewPrototype = DataView.prototype
    var nativeArrayBufferSlice = uncurryThis(ArrayBuffer.prototype.slice)
    var getUint8 = uncurryThis(DataViewPrototype.getUint8)
    var setUint8 = uncurryThis(DataViewPrototype.setUint8)

    var INCORRECT_SLICE = fails(function () {
      return !new ArrayBuffer(2).slice(1, undefined).byteLength
    })

    // `ArrayBuffer.prototype.slice` method
    // https://tc39.es/ecma262/#sec-arraybuffer.prototype.slice
    $({ target: 'ArrayBuffer', proto: true, unsafe: true, forced: INCORRECT_SLICE }, {
      slice: function slice (start, end) {
        if (nativeArrayBufferSlice && end === undefined) {
          return nativeArrayBufferSlice(anObject(this), start) // FF fix
        }
        var length = anObject(this).byteLength
        var first = toAbsoluteIndex(start, length)
        var fin = toAbsoluteIndex(end === undefined ? length : end, length)
        var result = new (speciesConstructor(this, ArrayBuffer))(toLength(fin - first))
        var viewSource = new DataView(this)
        var viewTarget = new DataView(result)
        var index = 0
        while (first < fin) {
          setUint8(viewTarget, index++, getUint8(viewSource, first++))
        } return result
      }
    })
  }, { '../internals/an-object': 30, '../internals/array-buffer': 38, '../internals/export': 107, '../internals/fails': 108, '../internals/function-uncurry-this-clause': 119, '../internals/species-constructor': 240, '../internals/to-absolute-index': 257, '../internals/to-length': 262 }],
  295: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var $transfer = require('../internals/array-buffer-transfer')

    // `ArrayBuffer.prototype.transferToFixedLength` method
    // https://tc39.es/proposal-arraybuffer-transfer/#sec-arraybuffer.prototype.transfertofixedlength
    if ($transfer) {
      $({ target: 'ArrayBuffer', proto: true }, {
        transferToFixedLength: function transferToFixedLength () {
          return $transfer(this, arguments.length ? arguments[0] : undefined, false)
        }
      })
    }
  }, { '../internals/array-buffer-transfer': 36, '../internals/export': 107 }],
  296: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var $transfer = require('../internals/array-buffer-transfer')

    // `ArrayBuffer.prototype.transfer` method
    // https://tc39.es/proposal-arraybuffer-transfer/#sec-arraybuffer.prototype.transfer
    if ($transfer) {
      $({ target: 'ArrayBuffer', proto: true }, {
        transfer: function transfer () {
          return $transfer(this, arguments.length ? arguments[0] : undefined, true)
        }
      })
    }
  }, { '../internals/array-buffer-transfer': 36, '../internals/export': 107 }],
  297: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var toObject = require('../internals/to-object')
    var lengthOfArrayLike = require('../internals/length-of-array-like')
    var toIntegerOrInfinity = require('../internals/to-integer-or-infinity')
    var addToUnscopables = require('../internals/add-to-unscopables')

    // `Array.prototype.at` method
    // https://tc39.es/ecma262/#sec-array.prototype.at
    $({ target: 'Array', proto: true }, {
      at: function at (index) {
        var O = toObject(this)
        var len = lengthOfArrayLike(O)
        var relativeIndex = toIntegerOrInfinity(index)
        var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex
        return (k < 0 || k >= len) ? undefined : O[k]
      }
    })

    addToUnscopables('at')
  }, { '../internals/add-to-unscopables': 27, '../internals/export': 107, '../internals/length-of-array-like': 167, '../internals/to-integer-or-infinity': 261, '../internals/to-object': 263 }],
  298: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var fails = require('../internals/fails')
    var isArray = require('../internals/is-array')
    var isObject = require('../internals/is-object')
    var toObject = require('../internals/to-object')
    var lengthOfArrayLike = require('../internals/length-of-array-like')
    var doesNotExceedSafeInteger = require('../internals/does-not-exceed-safe-integer')
    var createProperty = require('../internals/create-property')
    var arraySpeciesCreate = require('../internals/array-species-create')
    var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support')
    var wellKnownSymbol = require('../internals/well-known-symbol')
    var V8_VERSION = require('../internals/environment-v8-version')

    var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable')

    // We can't use this feature detection in V8 since it causes
    // deoptimization and serious performance degradation
    // https://github.com/zloirock/core-js/issues/679
    var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
      var array = []
      array[IS_CONCAT_SPREADABLE] = false
      return array.concat()[0] !== array
    })

    var isConcatSpreadable = function (O) {
      if (!isObject(O)) return false
      var spreadable = O[IS_CONCAT_SPREADABLE]
      return spreadable !== undefined ? !!spreadable : isArray(O)
    }

    var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !arrayMethodHasSpeciesSupport('concat')

    // `Array.prototype.concat` method
    // https://tc39.es/ecma262/#sec-array.prototype.concat
    // with adding support of @@isConcatSpreadable and @@species
    $({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      concat: function concat (arg) {
        var O = toObject(this)
        var A = arraySpeciesCreate(O, 0)
        var n = 0
        var i, k, length, len, E
        for (i = -1, length = arguments.length; i < length; i++) {
          E = i === -1 ? O : arguments[i]
          if (isConcatSpreadable(E)) {
            len = lengthOfArrayLike(E)
            doesNotExceedSafeInteger(n + len)
            for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k])
          } else {
            doesNotExceedSafeInteger(n + 1)
            createProperty(A, n++, E)
          }
        }
        A.length = n
        return A
      }
    })
  }, { '../internals/array-method-has-species-support': 48, '../internals/array-species-create': 55, '../internals/create-property': 77, '../internals/does-not-exceed-safe-integer': 88, '../internals/environment-v8-version': 100, '../internals/export': 107, '../internals/fails': 108, '../internals/is-array': 145, '../internals/is-object': 153, '../internals/length-of-array-like': 167, '../internals/to-object': 263, '../internals/well-known-symbol': 285 }],
  299: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var copyWithin = require('../internals/array-copy-within')
    var addToUnscopables = require('../internals/add-to-unscopables')

    // `Array.prototype.copyWithin` method
    // https://tc39.es/ecma262/#sec-array.prototype.copywithin
    $({ target: 'Array', proto: true }, {
      copyWithin: copyWithin
    })

    // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
    addToUnscopables('copyWithin')
  }, { '../internals/add-to-unscopables': 27, '../internals/array-copy-within': 39, '../internals/export': 107 }],
  300: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var $every = require('../internals/array-iteration').every
    var arrayMethodIsStrict = require('../internals/array-method-is-strict')

    var STRICT_METHOD = arrayMethodIsStrict('every')

    // `Array.prototype.every` method
    // https://tc39.es/ecma262/#sec-array.prototype.every
    $({ target: 'Array', proto: true, forced: !STRICT_METHOD }, {
      every: function every (callbackfn /* , thisArg */) {
        return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined)
      }
    })
  }, { '../internals/array-iteration': 46, '../internals/array-method-is-strict': 49, '../internals/export': 107 }],
  301: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var fill = require('../internals/array-fill')
    var addToUnscopables = require('../internals/add-to-unscopables')

    // `Array.prototype.fill` method
    // https://tc39.es/ecma262/#sec-array.prototype.fill
    $({ target: 'Array', proto: true }, {
      fill: fill
    })

    // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
    addToUnscopables('fill')
  }, { '../internals/add-to-unscopables': 27, '../internals/array-fill': 40, '../internals/export': 107 }],
  302: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var $filter = require('../internals/array-iteration').filter
    var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support')

    var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter')

    // `Array.prototype.filter` method
    // https://tc39.es/ecma262/#sec-array.prototype.filter
    // with adding support of @@species
    $({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
      filter: function filter (callbackfn /* , thisArg */) {
        return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined)
      }
    })
  }, { '../internals/array-iteration': 46, '../internals/array-method-has-species-support': 48, '../internals/export': 107 }],
  303: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var $findIndex = require('../internals/array-iteration').findIndex
    var addToUnscopables = require('../internals/add-to-unscopables')

    var FIND_INDEX = 'findIndex'
    var SKIPS_HOLES = true

    // Shouldn't skip holes
    // eslint-disable-next-line es/no-array-prototype-findindex -- testing
    if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () { SKIPS_HOLES = false })

    // `Array.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findindex
    $({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
      findIndex: function findIndex (callbackfn /* , that = undefined */) {
        return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined)
      }
    })

    // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
    addToUnscopables(FIND_INDEX)
  }, { '../internals/add-to-unscopables': 27, '../internals/array-iteration': 46, '../internals/export': 107 }],
  304: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var $findLastIndex = require('../internals/array-iteration-from-last').findLastIndex
    var addToUnscopables = require('../internals/add-to-unscopables')

    // `Array.prototype.findLastIndex` method
    // https://tc39.es/ecma262/#sec-array.prototype.findlastindex
    $({ target: 'Array', proto: true }, {
      findLastIndex: function findLastIndex (callbackfn /* , that = undefined */) {
        return $findLastIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined)
      }
    })

    addToUnscopables('findLastIndex')
  }, { '../internals/add-to-unscopables': 27, '../internals/array-iteration-from-last': 45, '../internals/export': 107 }],
  305: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var $findLast = require('../internals/array-iteration-from-last').findLast
    var addToUnscopables = require('../internals/add-to-unscopables')

    // `Array.prototype.findLast` method
    // https://tc39.es/ecma262/#sec-array.prototype.findlast
    $({ target: 'Array', proto: true }, {
      findLast: function findLast (callbackfn /* , that = undefined */) {
        return $findLast(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined)
      }
    })

    addToUnscopables('findLast')
  }, { '../internals/add-to-unscopables': 27, '../internals/array-iteration-from-last': 45, '../internals/export': 107 }],
  306: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var $find = require('../internals/array-iteration').find
    var addToUnscopables = require('../internals/add-to-unscopables')

    var FIND = 'find'
    var SKIPS_HOLES = true

    // Shouldn't skip holes
    // eslint-disable-next-line es/no-array-prototype-find -- testing
    if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false })

    // `Array.prototype.find` method
    // https://tc39.es/ecma262/#sec-array.prototype.find
    $({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
      find: function find (callbackfn /* , that = undefined */) {
        return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined)
      }
    })

    // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
    addToUnscopables(FIND)
  }, { '../internals/add-to-unscopables': 27, '../internals/array-iteration': 46, '../internals/export': 107 }],
  307: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var flattenIntoArray = require('../internals/flatten-into-array')
    var aCallable = require('../internals/a-callable')
    var toObject = require('../internals/to-object')
    var lengthOfArrayLike = require('../internals/length-of-array-like')
    var arraySpeciesCreate = require('../internals/array-species-create')

    // `Array.prototype.flatMap` method
    // https://tc39.es/ecma262/#sec-array.prototype.flatmap
    $({ target: 'Array', proto: true }, {
      flatMap: function flatMap (callbackfn /* , thisArg */) {
        var O = toObject(this)
        var sourceLen = lengthOfArrayLike(O)
        var A
        aCallable(callbackfn)
        A = arraySpeciesCreate(O, 0)
        A.length = flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments.length > 1 ? arguments[1] : undefined)
        return A
      }
    })
  }, { '../internals/a-callable': 23, '../internals/array-species-create': 55, '../internals/export': 107, '../internals/flatten-into-array': 110, '../internals/length-of-array-like': 167, '../internals/to-object': 263 }],
  308: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var flattenIntoArray = require('../internals/flatten-into-array')
    var toObject = require('../internals/to-object')
    var lengthOfArrayLike = require('../internals/length-of-array-like')
    var toIntegerOrInfinity = require('../internals/to-integer-or-infinity')
    var arraySpeciesCreate = require('../internals/array-species-create')

    // `Array.prototype.flat` method
    // https://tc39.es/ecma262/#sec-array.prototype.flat
    $({ target: 'Array', proto: true }, {
      flat: function flat (/* depthArg = 1 */) {
        var depthArg = arguments.length ? arguments[0] : undefined
        var O = toObject(this)
        var sourceLen = lengthOfArrayLike(O)
        var A = arraySpeciesCreate(O, 0)
        A.length = flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toIntegerOrInfinity(depthArg))
        return A
      }
    })
  }, { '../internals/array-species-create': 55, '../internals/export': 107, '../internals/flatten-into-array': 110, '../internals/length-of-array-like': 167, '../internals/to-integer-or-infinity': 261, '../internals/to-object': 263 }],
  309: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var forEach = require('../internals/array-for-each')

    // `Array.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-array.prototype.foreach
    // eslint-disable-next-line es/no-array-prototype-foreach -- safe
    $({ target: 'Array', proto: true, forced: [].forEach !== forEach }, {
      forEach: forEach
    })
  }, { '../internals/array-for-each': 41, '../internals/export': 107 }],
  310: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var from = require('../internals/array-from')
    var checkCorrectnessOfIteration = require('../internals/check-correctness-of-iteration')

    var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
      // eslint-disable-next-line es/no-array-from -- required for testing
      Array.from(iterable)
    })

    // `Array.from` method
    // https://tc39.es/ecma262/#sec-array.from
    $({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
      from: from
    })
  }, { '../internals/array-from': 43, '../internals/check-correctness-of-iteration': 64, '../internals/export': 107 }],
  311: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var $includes = require('../internals/array-includes').includes
    var fails = require('../internals/fails')
    var addToUnscopables = require('../internals/add-to-unscopables')

    // FF99+ bug
    var BROKEN_ON_SPARSE = fails(function () {
      // eslint-disable-next-line es/no-array-prototype-includes -- detection
      return !Array(1).includes()
    })

    // `Array.prototype.includes` method
    // https://tc39.es/ecma262/#sec-array.prototype.includes
    $({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
      includes: function includes (el /* , fromIndex = 0 */) {
        return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined)
      }
    })

    // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
    addToUnscopables('includes')
  }, { '../internals/add-to-unscopables': 27, '../internals/array-includes': 44, '../internals/export': 107, '../internals/fails': 108 }],
  312: [function (require, module, exports) {
    'use strict'
    /* eslint-disable es/no-array-prototype-indexof -- required for testing */
    var $ = require('../internals/export')
    var uncurryThis = require('../internals/function-uncurry-this-clause')
    var $indexOf = require('../internals/array-includes').indexOf
    var arrayMethodIsStrict = require('../internals/array-method-is-strict')

    var nativeIndexOf = uncurryThis([].indexOf)

    var NEGATIVE_ZERO = !!nativeIndexOf && 1 / nativeIndexOf([1], 1, -0) < 0
    var FORCED = NEGATIVE_ZERO || !arrayMethodIsStrict('indexOf')

    // `Array.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.indexof
    $({ target: 'Array', proto: true, forced: FORCED }, {
      indexOf: function indexOf (searchElement /* , fromIndex = 0 */) {
        var fromIndex = arguments.length > 1 ? arguments[1] : undefined
        return NEGATIVE_ZERO
        // convert -0 to +0
          ? nativeIndexOf(this, searchElement, fromIndex) || 0
          : $indexOf(this, searchElement, fromIndex)
      }
    })
  }, { '../internals/array-includes': 44, '../internals/array-method-is-strict': 49, '../internals/export': 107, '../internals/function-uncurry-this-clause': 119 }],
  313: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var isArray = require('../internals/is-array')

    // `Array.isArray` method
    // https://tc39.es/ecma262/#sec-array.isarray
    $({ target: 'Array', stat: true }, {
      isArray: isArray
    })
  }, { '../internals/export': 107, '../internals/is-array': 145 }],
  314: [function (require, module, exports) {
    'use strict'
    var toIndexedObject = require('../internals/to-indexed-object')
    var addToUnscopables = require('../internals/add-to-unscopables')
    var Iterators = require('../internals/iterators')
    var InternalStateModule = require('../internals/internal-state')
    var defineProperty = require('../internals/object-define-property').f
    var defineIterator = require('../internals/iterator-define')
    var createIterResultObject = require('../internals/create-iter-result-object')
    var IS_PURE = require('../internals/is-pure')
    var DESCRIPTORS = require('../internals/descriptors')

    var ARRAY_ITERATOR = 'Array Iterator'
    var setInternalState = InternalStateModule.set
    var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR)

    // `Array.prototype.entries` method
    // https://tc39.es/ecma262/#sec-array.prototype.entries
    // `Array.prototype.keys` method
    // https://tc39.es/ecma262/#sec-array.prototype.keys
    // `Array.prototype.values` method
    // https://tc39.es/ecma262/#sec-array.prototype.values
    // `Array.prototype[@@iterator]` method
    // https://tc39.es/ecma262/#sec-array.prototype-@@iterator
    // `CreateArrayIterator` internal method
    // https://tc39.es/ecma262/#sec-createarrayiterator
    module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
      setInternalState(this, {
        type: ARRAY_ITERATOR,
        target: toIndexedObject(iterated), // target
        index: 0, // next index
        kind: kind // kind
      })
      // `%ArrayIteratorPrototype%.next` method
      // https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
    }, function () {
      var state = getInternalState(this)
      var target = state.target
      var index = state.index++
      if (!target || index >= target.length) {
        state.target = null
        return createIterResultObject(undefined, true)
      }
      switch (state.kind) {
        case 'keys': return createIterResultObject(index, false)
        case 'values': return createIterResultObject(target[index], false)
      } return createIterResultObject([index, target[index]], false)
    }, 'values')

    // argumentsList[@@iterator] is %ArrayProto_values%
    // https://tc39.es/ecma262/#sec-createunmappedargumentsobject
    // https://tc39.es/ecma262/#sec-createmappedargumentsobject
    var values = Iterators.Arguments = Iterators.Array

    // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
    addToUnscopables('keys')
    addToUnscopables('values')
    addToUnscopables('entries')

    // V8 ~ Chrome 45- bug
    if (!IS_PURE && DESCRIPTORS && values.name !== 'values') {
      try {
        defineProperty(values, 'name', { value: 'values' })
      } catch (error) { /* empty */ }
    }
  }, { '../internals/add-to-unscopables': 27, '../internals/create-iter-result-object': 74, '../internals/descriptors': 85, '../internals/internal-state': 143, '../internals/is-pure': 155, '../internals/iterator-define': 163, '../internals/iterators': 166, '../internals/object-define-property': 187, '../internals/to-indexed-object': 260 }],
  315: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var uncurryThis = require('../internals/function-uncurry-this')
    var IndexedObject = require('../internals/indexed-object')
    var toIndexedObject = require('../internals/to-indexed-object')
    var arrayMethodIsStrict = require('../internals/array-method-is-strict')

    var nativeJoin = uncurryThis([].join)

    var ES3_STRINGS = IndexedObject !== Object
    var FORCED = ES3_STRINGS || !arrayMethodIsStrict('join', ',')

    // `Array.prototype.join` method
    // https://tc39.es/ecma262/#sec-array.prototype.join
    $({ target: 'Array', proto: true, forced: FORCED }, {
      join: function join (separator) {
        return nativeJoin(toIndexedObject(this), separator === undefined ? ',' : separator)
      }
    })
  }, { '../internals/array-method-is-strict': 49, '../internals/export': 107, '../internals/function-uncurry-this': 120, '../internals/indexed-object': 138, '../internals/to-indexed-object': 260 }],
  316: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var lastIndexOf = require('../internals/array-last-index-of')

    // `Array.prototype.lastIndexOf` method
    // https://tc39.es/ecma262/#sec-array.prototype.lastindexof
    // eslint-disable-next-line es/no-array-prototype-lastindexof -- required for testing
    $({ target: 'Array', proto: true, forced: lastIndexOf !== [].lastIndexOf }, {
      lastIndexOf: lastIndexOf
    })
  }, { '../internals/array-last-index-of': 47, '../internals/export': 107 }],
  317: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var $map = require('../internals/array-iteration').map
    var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support')

    var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map')

    // `Array.prototype.map` method
    // https://tc39.es/ecma262/#sec-array.prototype.map
    // with adding support of @@species
    $({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
      map: function map (callbackfn /* , thisArg */) {
        return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined)
      }
    })
  }, { '../internals/array-iteration': 46, '../internals/array-method-has-species-support': 48, '../internals/export': 107 }],
  318: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var fails = require('../internals/fails')
    var isConstructor = require('../internals/is-constructor')
    var createProperty = require('../internals/create-property')

    var $Array = Array

    var ISNT_GENERIC = fails(function () {
      function F () { /* empty */ }
      // eslint-disable-next-line es/no-array-of -- safe
      return !($Array.of.call(F) instanceof F)
    })

    // `Array.of` method
    // https://tc39.es/ecma262/#sec-array.of
    // WebKit Array.of isn't generic
    $({ target: 'Array', stat: true, forced: ISNT_GENERIC }, {
      of: function of (/* ...args */) {
        var index = 0
        var argumentsLength = arguments.length
        var result = new (isConstructor(this) ? this : $Array)(argumentsLength)
        while (argumentsLength > index) createProperty(result, index, arguments[index++])
        result.length = argumentsLength
        return result
      }
    })
  }, { '../internals/create-property': 77, '../internals/export': 107, '../internals/fails': 108, '../internals/is-constructor': 148 }],
  319: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var toObject = require('../internals/to-object')
    var lengthOfArrayLike = require('../internals/length-of-array-like')
    var setArrayLength = require('../internals/array-set-length')
    var doesNotExceedSafeInteger = require('../internals/does-not-exceed-safe-integer')
    var fails = require('../internals/fails')

    var INCORRECT_TO_LENGTH = fails(function () {
      return [].push.call({ length: 0x100000000 }, 1) !== 4294967297
    })

    // V8 <= 121 and Safari <= 15.4; FF < 23 throws InternalError
    // https://bugs.chromium.org/p/v8/issues/detail?id=12681
    var properErrorOnNonWritableLength = function () {
      try {
        // eslint-disable-next-line es/no-object-defineproperty -- safe
        Object.defineProperty([], 'length', { writable: false }).push()
      } catch (error) {
        return error instanceof TypeError
      }
    }

    var FORCED = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength()

    // `Array.prototype.push` method
    // https://tc39.es/ecma262/#sec-array.prototype.push
    $({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      push: function push (item) {
        var O = toObject(this)
        var len = lengthOfArrayLike(O)
        var argCount = arguments.length
        doesNotExceedSafeInteger(len + argCount)
        for (var i = 0; i < argCount; i++) {
          O[len] = arguments[i]
          len++
        }
        setArrayLength(O, len)
        return len
      }
    })
  }, { '../internals/array-set-length': 51, '../internals/does-not-exceed-safe-integer': 88, '../internals/export': 107, '../internals/fails': 108, '../internals/length-of-array-like': 167, '../internals/to-object': 263 }],
  320: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var $reduceRight = require('../internals/array-reduce').right
    var arrayMethodIsStrict = require('../internals/array-method-is-strict')
    var CHROME_VERSION = require('../internals/environment-v8-version')
    var IS_NODE = require('../internals/environment-is-node')

    // Chrome 80-82 has a critical bug
    // https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
    var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83
    var FORCED = CHROME_BUG || !arrayMethodIsStrict('reduceRight')

    // `Array.prototype.reduceRight` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduceright
    $({ target: 'Array', proto: true, forced: FORCED }, {
      reduceRight: function reduceRight (callbackfn /* , initialValue */) {
        return $reduceRight(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined)
      }
    })
  }, { '../internals/array-method-is-strict': 49, '../internals/array-reduce': 50, '../internals/environment-is-node': 97, '../internals/environment-v8-version': 100, '../internals/export': 107 }],
  321: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var $reduce = require('../internals/array-reduce').left
    var arrayMethodIsStrict = require('../internals/array-method-is-strict')
    var CHROME_VERSION = require('../internals/environment-v8-version')
    var IS_NODE = require('../internals/environment-is-node')

    // Chrome 80-82 has a critical bug
    // https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
    var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83
    var FORCED = CHROME_BUG || !arrayMethodIsStrict('reduce')

    // `Array.prototype.reduce` method
    // https://tc39.es/ecma262/#sec-array.prototype.reduce
    $({ target: 'Array', proto: true, forced: FORCED }, {
      reduce: function reduce (callbackfn /* , initialValue */) {
        var length = arguments.length
        return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : undefined)
      }
    })
  }, { '../internals/array-method-is-strict': 49, '../internals/array-reduce': 50, '../internals/environment-is-node': 97, '../internals/environment-v8-version': 100, '../internals/export': 107 }],
  322: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var uncurryThis = require('../internals/function-uncurry-this')
    var isArray = require('../internals/is-array')

    var nativeReverse = uncurryThis([].reverse)
    var test = [1, 2]

    // `Array.prototype.reverse` method
    // https://tc39.es/ecma262/#sec-array.prototype.reverse
    // fix for Safari 12.0 bug
    // https://bugs.webkit.org/show_bug.cgi?id=188794
    $({ target: 'Array', proto: true, forced: String(test) === String(test.reverse()) }, {
      reverse: function reverse () {
        // eslint-disable-next-line no-self-assign -- dirty hack
        if (isArray(this)) this.length = this.length
        return nativeReverse(this)
      }
    })
  }, { '../internals/export': 107, '../internals/function-uncurry-this': 120, '../internals/is-array': 145 }],
  323: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var isArray = require('../internals/is-array')
    var isConstructor = require('../internals/is-constructor')
    var isObject = require('../internals/is-object')
    var toAbsoluteIndex = require('../internals/to-absolute-index')
    var lengthOfArrayLike = require('../internals/length-of-array-like')
    var toIndexedObject = require('../internals/to-indexed-object')
    var createProperty = require('../internals/create-property')
    var wellKnownSymbol = require('../internals/well-known-symbol')
    var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support')
    var nativeSlice = require('../internals/array-slice')

    var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice')

    var SPECIES = wellKnownSymbol('species')
    var $Array = Array
    var max = Math.max

    // `Array.prototype.slice` method
    // https://tc39.es/ecma262/#sec-array.prototype.slice
    // fallback for not array-like ES3 strings and DOM objects
    $({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
      slice: function slice (start, end) {
        var O = toIndexedObject(this)
        var length = lengthOfArrayLike(O)
        var k = toAbsoluteIndex(start, length)
        var fin = toAbsoluteIndex(end === undefined ? length : end, length)
        // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
        var Constructor, result, n
        if (isArray(O)) {
          Constructor = O.constructor
          // cross-realm fallback
          if (isConstructor(Constructor) && (Constructor === $Array || isArray(Constructor.prototype))) {
            Constructor = undefined
          } else if (isObject(Constructor)) {
            Constructor = Constructor[SPECIES]
            if (Constructor === null) Constructor = undefined
          }
          if (Constructor === $Array || Constructor === undefined) {
            return nativeSlice(O, k, fin)
          }
        }
        result = new (Constructor === undefined ? $Array : Constructor)(max(fin - k, 0))
        for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k])
        result.length = n
        return result
      }
    })
  }, { '../internals/array-method-has-species-support': 48, '../internals/array-slice': 52, '../internals/create-property': 77, '../internals/export': 107, '../internals/is-array': 145, '../internals/is-constructor': 148, '../internals/is-object': 153, '../internals/length-of-array-like': 167, '../internals/to-absolute-index': 257, '../internals/to-indexed-object': 260, '../internals/well-known-symbol': 285 }],
  324: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var $some = require('../internals/array-iteration').some
    var arrayMethodIsStrict = require('../internals/array-method-is-strict')

    var STRICT_METHOD = arrayMethodIsStrict('some')

    // `Array.prototype.some` method
    // https://tc39.es/ecma262/#sec-array.prototype.some
    $({ target: 'Array', proto: true, forced: !STRICT_METHOD }, {
      some: function some (callbackfn /* , thisArg */) {
        return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined)
      }
    })
  }, { '../internals/array-iteration': 46, '../internals/array-method-is-strict': 49, '../internals/export': 107 }],
  325: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var uncurryThis = require('../internals/function-uncurry-this')
    var aCallable = require('../internals/a-callable')
    var toObject = require('../internals/to-object')
    var lengthOfArrayLike = require('../internals/length-of-array-like')
    var deletePropertyOrThrow = require('../internals/delete-property-or-throw')
    var toString = require('../internals/to-string')
    var fails = require('../internals/fails')
    var internalSort = require('../internals/array-sort')
    var arrayMethodIsStrict = require('../internals/array-method-is-strict')
    var FF = require('../internals/environment-ff-version')
    var IE_OR_EDGE = require('../internals/environment-is-ie-or-edge')
    var V8 = require('../internals/environment-v8-version')
    var WEBKIT = require('../internals/environment-webkit-version')

    var test = []
    var nativeSort = uncurryThis(test.sort)
    var push = uncurryThis(test.push)

    // IE8-
    var FAILS_ON_UNDEFINED = fails(function () {
      test.sort(undefined)
    })
    // V8 bug
    var FAILS_ON_NULL = fails(function () {
      test.sort(null)
    })
    // Old WebKit
    var STRICT_METHOD = arrayMethodIsStrict('sort')

    var STABLE_SORT = !fails(function () {
      // feature detection can be too slow, so check engines versions
      if (V8) return V8 < 70
      if (FF && FF > 3) return
      if (IE_OR_EDGE) return true
      if (WEBKIT) return WEBKIT < 603

      var result = ''
      var code, chr, value, index

      // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
      for (code = 65; code < 76; code++) {
        chr = String.fromCharCode(code)

        switch (code) {
          case 66: case 69: case 70: case 72: value = 3; break
          case 68: case 71: value = 4; break
          default: value = 2
        }

        for (index = 0; index < 47; index++) {
          test.push({ k: chr + index, v: value })
        }
      }

      test.sort(function (a, b) { return b.v - a.v })

      for (index = 0; index < test.length; index++) {
        chr = test[index].k.charAt(0)
        if (result.charAt(result.length - 1) !== chr) result += chr
      }

      return result !== 'DGBEFHACIJK'
    })

    var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT

    var getSortCompare = function (comparefn) {
      return function (x, y) {
        if (y === undefined) return -1
        if (x === undefined) return 1
        if (comparefn !== undefined) return +comparefn(x, y) || 0
        return toString(x) > toString(y) ? 1 : -1
      }
    }

    // `Array.prototype.sort` method
    // https://tc39.es/ecma262/#sec-array.prototype.sort
    $({ target: 'Array', proto: true, forced: FORCED }, {
      sort: function sort (comparefn) {
        if (comparefn !== undefined) aCallable(comparefn)

        var array = toObject(this)

        if (STABLE_SORT) return comparefn === undefined ? nativeSort(array) : nativeSort(array, comparefn)

        var items = []
        var arrayLength = lengthOfArrayLike(array)
        var itemsLength, index

        for (index = 0; index < arrayLength; index++) {
          if (index in array) push(items, array[index])
        }

        internalSort(items, getSortCompare(comparefn))

        itemsLength = lengthOfArrayLike(items)
        index = 0

        while (index < itemsLength) array[index] = items[index++]
        while (index < arrayLength) deletePropertyOrThrow(array, index++)

        return array
      }
    })
  }, { '../internals/a-callable': 23, '../internals/array-method-is-strict': 49, '../internals/array-sort': 53, '../internals/delete-property-or-throw': 84, '../internals/environment-ff-version': 93, '../internals/environment-is-ie-or-edge': 94, '../internals/environment-v8-version': 100, '../internals/environment-webkit-version': 101, '../internals/export': 107, '../internals/fails': 108, '../internals/function-uncurry-this': 120, '../internals/length-of-array-like': 167, '../internals/to-object': 263, '../internals/to-string': 269 }],
  326: [function (require, module, exports) {
    'use strict'
    var setSpecies = require('../internals/set-species')

    // `Array[@@species]` getter
    // https://tc39.es/ecma262/#sec-get-array-@@species
    setSpecies('Array')
  }, { '../internals/set-species': 233 }],
  327: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var toObject = require('../internals/to-object')
    var toAbsoluteIndex = require('../internals/to-absolute-index')
    var toIntegerOrInfinity = require('../internals/to-integer-or-infinity')
    var lengthOfArrayLike = require('../internals/length-of-array-like')
    var setArrayLength = require('../internals/array-set-length')
    var doesNotExceedSafeInteger = require('../internals/does-not-exceed-safe-integer')
    var arraySpeciesCreate = require('../internals/array-species-create')
    var createProperty = require('../internals/create-property')
    var deletePropertyOrThrow = require('../internals/delete-property-or-throw')
    var arrayMethodHasSpeciesSupport = require('../internals/array-method-has-species-support')

    var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('splice')

    var max = Math.max
    var min = Math.min

    // `Array.prototype.splice` method
    // https://tc39.es/ecma262/#sec-array.prototype.splice
    // with adding support of @@species
    $({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT }, {
      splice: function splice (start, deleteCount /* , ...items */) {
        var O = toObject(this)
        var len = lengthOfArrayLike(O)
        var actualStart = toAbsoluteIndex(start, len)
        var argumentsLength = arguments.length
        var insertCount, actualDeleteCount, A, k, from, to
        if (argumentsLength === 0) {
          insertCount = actualDeleteCount = 0
        } else if (argumentsLength === 1) {
          insertCount = 0
          actualDeleteCount = len - actualStart
        } else {
          insertCount = argumentsLength - 2
          actualDeleteCount = min(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart)
        }
        doesNotExceedSafeInteger(len + insertCount - actualDeleteCount)
        A = arraySpeciesCreate(O, actualDeleteCount)
        for (k = 0; k < actualDeleteCount; k++) {
          from = actualStart + k
          if (from in O) createProperty(A, k, O[from])
        }
        A.length = actualDeleteCount
        if (insertCount < actualDeleteCount) {
          for (k = actualStart; k < len - actualDeleteCount; k++) {
            from = k + actualDeleteCount
            to = k + insertCount
            if (from in O) O[to] = O[from]
            else deletePropertyOrThrow(O, to)
          }
          for (k = len; k > len - actualDeleteCount + insertCount; k--) deletePropertyOrThrow(O, k - 1)
        } else if (insertCount > actualDeleteCount) {
          for (k = len - actualDeleteCount; k > actualStart; k--) {
            from = k + actualDeleteCount - 1
            to = k + insertCount - 1
            if (from in O) O[to] = O[from]
            else deletePropertyOrThrow(O, to)
          }
        }
        for (k = 0; k < insertCount; k++) {
          O[k + actualStart] = arguments[k + 2]
        }
        setArrayLength(O, len - actualDeleteCount + insertCount)
        return A
      }
    })
  }, { '../internals/array-method-has-species-support': 48, '../internals/array-set-length': 51, '../internals/array-species-create': 55, '../internals/create-property': 77, '../internals/delete-property-or-throw': 84, '../internals/does-not-exceed-safe-integer': 88, '../internals/export': 107, '../internals/length-of-array-like': 167, '../internals/to-absolute-index': 257, '../internals/to-integer-or-infinity': 261, '../internals/to-object': 263 }],
  328: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var arrayToReversed = require('../internals/array-to-reversed')
    var toIndexedObject = require('../internals/to-indexed-object')
    var addToUnscopables = require('../internals/add-to-unscopables')

    var $Array = Array

    // `Array.prototype.toReversed` method
    // https://tc39.es/ecma262/#sec-array.prototype.toreversed
    $({ target: 'Array', proto: true }, {
      toReversed: function toReversed () {
        return arrayToReversed(toIndexedObject(this), $Array)
      }
    })

    addToUnscopables('toReversed')
  }, { '../internals/add-to-unscopables': 27, '../internals/array-to-reversed': 56, '../internals/export': 107, '../internals/to-indexed-object': 260 }],
  329: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var uncurryThis = require('../internals/function-uncurry-this')
    var aCallable = require('../internals/a-callable')
    var toIndexedObject = require('../internals/to-indexed-object')
    var arrayFromConstructorAndList = require('../internals/array-from-constructor-and-list')
    var getBuiltInPrototypeMethod = require('../internals/get-built-in-prototype-method')
    var addToUnscopables = require('../internals/add-to-unscopables')

    var $Array = Array
    var sort = uncurryThis(getBuiltInPrototypeMethod('Array', 'sort'))

    // `Array.prototype.toSorted` method
    // https://tc39.es/ecma262/#sec-array.prototype.tosorted
    $({ target: 'Array', proto: true }, {
      toSorted: function toSorted (compareFn) {
        if (compareFn !== undefined) aCallable(compareFn)
        var O = toIndexedObject(this)
        var A = arrayFromConstructorAndList($Array, O)
        return sort(A, compareFn)
      }
    })

    addToUnscopables('toSorted')
  }, { '../internals/a-callable': 23, '../internals/add-to-unscopables': 27, '../internals/array-from-constructor-and-list': 42, '../internals/export': 107, '../internals/function-uncurry-this': 120, '../internals/get-built-in-prototype-method': 122, '../internals/to-indexed-object': 260 }],
  330: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var addToUnscopables = require('../internals/add-to-unscopables')
    var doesNotExceedSafeInteger = require('../internals/does-not-exceed-safe-integer')
    var lengthOfArrayLike = require('../internals/length-of-array-like')
    var toAbsoluteIndex = require('../internals/to-absolute-index')
    var toIndexedObject = require('../internals/to-indexed-object')
    var toIntegerOrInfinity = require('../internals/to-integer-or-infinity')

    var $Array = Array
    var max = Math.max
    var min = Math.min

    // `Array.prototype.toSpliced` method
    // https://tc39.es/ecma262/#sec-array.prototype.tospliced
    $({ target: 'Array', proto: true }, {
      toSpliced: function toSpliced (start, deleteCount /* , ...items */) {
        var O = toIndexedObject(this)
        var len = lengthOfArrayLike(O)
        var actualStart = toAbsoluteIndex(start, len)
        var argumentsLength = arguments.length
        var k = 0
        var insertCount, actualDeleteCount, newLen, A
        if (argumentsLength === 0) {
          insertCount = actualDeleteCount = 0
        } else if (argumentsLength === 1) {
          insertCount = 0
          actualDeleteCount = len - actualStart
        } else {
          insertCount = argumentsLength - 2
          actualDeleteCount = min(max(toIntegerOrInfinity(deleteCount), 0), len - actualStart)
        }
        newLen = doesNotExceedSafeInteger(len + insertCount - actualDeleteCount)
        A = $Array(newLen)

        for (; k < actualStart; k++) A[k] = O[k]
        for (; k < actualStart + insertCount; k++) A[k] = arguments[k - actualStart + 2]
        for (; k < newLen; k++) A[k] = O[k + actualDeleteCount - insertCount]

        return A
      }
    })

    addToUnscopables('toSpliced')
  }, { '../internals/add-to-unscopables': 27, '../internals/does-not-exceed-safe-integer': 88, '../internals/export': 107, '../internals/length-of-array-like': 167, '../internals/to-absolute-index': 257, '../internals/to-indexed-object': 260, '../internals/to-integer-or-infinity': 261 }],
  331: [function (require, module, exports) {
    'use strict'
    // this method was added to unscopables after implementation
    // in popular engines, so it's moved to a separate module
    var addToUnscopables = require('../internals/add-to-unscopables')

    // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
    addToUnscopables('flatMap')
  }, { '../internals/add-to-unscopables': 27 }],
  332: [function (require, module, exports) {
    'use strict'
    // this method was added to unscopables after implementation
    // in popular engines, so it's moved to a separate module
    var addToUnscopables = require('../internals/add-to-unscopables')

    // https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
    addToUnscopables('flat')
  }, { '../internals/add-to-unscopables': 27 }],
  333: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var toObject = require('../internals/to-object')
    var lengthOfArrayLike = require('../internals/length-of-array-like')
    var setArrayLength = require('../internals/array-set-length')
    var deletePropertyOrThrow = require('../internals/delete-property-or-throw')
    var doesNotExceedSafeInteger = require('../internals/does-not-exceed-safe-integer')

    // IE8-
    var INCORRECT_RESULT = [].unshift(0) !== 1

    // V8 ~ Chrome < 71 and Safari <= 15.4, FF < 23 throws InternalError
    var properErrorOnNonWritableLength = function () {
      try {
        // eslint-disable-next-line es/no-object-defineproperty -- safe
        Object.defineProperty([], 'length', { writable: false }).unshift()
      } catch (error) {
        return error instanceof TypeError
      }
    }

    var FORCED = INCORRECT_RESULT || !properErrorOnNonWritableLength()

    // `Array.prototype.unshift` method
    // https://tc39.es/ecma262/#sec-array.prototype.unshift
    $({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      unshift: function unshift (item) {
        var O = toObject(this)
        var len = lengthOfArrayLike(O)
        var argCount = arguments.length
        if (argCount) {
          doesNotExceedSafeInteger(len + argCount)
          var k = len
          while (k--) {
            var to = k + argCount
            if (k in O) O[to] = O[k]
            else deletePropertyOrThrow(O, to)
          }
          for (var j = 0; j < argCount; j++) {
            O[j] = arguments[j]
          }
        } return setArrayLength(O, len + argCount)
      }
    })
  }, { '../internals/array-set-length': 51, '../internals/delete-property-or-throw': 84, '../internals/does-not-exceed-safe-integer': 88, '../internals/export': 107, '../internals/length-of-array-like': 167, '../internals/to-object': 263 }],
  334: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var arrayWith = require('../internals/array-with')
    var toIndexedObject = require('../internals/to-indexed-object')

    var $Array = Array

    // `Array.prototype.with` method
    // https://tc39.es/ecma262/#sec-array.prototype.with
    $({ target: 'Array', proto: true }, {
      with: function (index, value) {
        return arrayWith(toIndexedObject(this), $Array, index, value)
      }
    })
  }, { '../internals/array-with': 57, '../internals/export': 107, '../internals/to-indexed-object': 260 }],
  335: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var ArrayBufferModule = require('../internals/array-buffer')
    var NATIVE_ARRAY_BUFFER = require('../internals/array-buffer-basic-detection')

    // `DataView` constructor
    // https://tc39.es/ecma262/#sec-dataview-constructor
    $({ global: true, constructor: true, forced: !NATIVE_ARRAY_BUFFER }, {
      DataView: ArrayBufferModule.DataView
    })
  }, { '../internals/array-buffer': 38, '../internals/array-buffer-basic-detection': 31, '../internals/export': 107 }],
  336: [function (require, module, exports) {
    'use strict'
    // TODO: Remove this module from `core-js@4` since it's replaced to module below
    require('../modules/es.data-view.constructor')
  }, { '../modules/es.data-view.constructor': 335 }],
  337: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var uncurryThis = require('../internals/function-uncurry-this')
    var fails = require('../internals/fails')

    // IE8- non-standard case
    var FORCED = fails(function () {
      // eslint-disable-next-line es/no-date-prototype-getyear-setyear -- detection
      return new Date(16e11).getYear() !== 120
    })

    var getFullYear = uncurryThis(Date.prototype.getFullYear)

    // `Date.prototype.getYear` method
    // https://tc39.es/ecma262/#sec-date.prototype.getyear
    $({ target: 'Date', proto: true, forced: FORCED }, {
      getYear: function getYear () {
        return getFullYear(this) - 1900
      }
    })
  }, { '../internals/export': 107, '../internals/fails': 108, '../internals/function-uncurry-this': 120 }],
  338: [function (require, module, exports) {
    'use strict'
    // TODO: Remove from `core-js@4`
    var $ = require('../internals/export')
    var uncurryThis = require('../internals/function-uncurry-this')

    var $Date = Date
    var thisTimeValue = uncurryThis($Date.prototype.getTime)

    // `Date.now` method
    // https://tc39.es/ecma262/#sec-date.now
    $({ target: 'Date', stat: true }, {
      now: function now () {
        return thisTimeValue(new $Date())
      }
    })
  }, { '../internals/export': 107, '../internals/function-uncurry-this': 120 }],
  339: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var uncurryThis = require('../internals/function-uncurry-this')
    var toIntegerOrInfinity = require('../internals/to-integer-or-infinity')

    var DatePrototype = Date.prototype
    var thisTimeValue = uncurryThis(DatePrototype.getTime)
    var setFullYear = uncurryThis(DatePrototype.setFullYear)

    // `Date.prototype.setYear` method
    // https://tc39.es/ecma262/#sec-date.prototype.setyear
    $({ target: 'Date', proto: true }, {
      setYear: function setYear (year) {
        // validate
        thisTimeValue(this)
        var yi = toIntegerOrInfinity(year)
        var yyyy = yi >= 0 && yi <= 99 ? yi + 1900 : yi
        return setFullYear(this, yyyy)
      }
    })
  }, { '../internals/export': 107, '../internals/function-uncurry-this': 120, '../internals/to-integer-or-infinity': 261 }],
  340: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')

    // `Date.prototype.toGMTString` method
    // https://tc39.es/ecma262/#sec-date.prototype.togmtstring
    $({ target: 'Date', proto: true }, {
      toGMTString: Date.prototype.toUTCString
    })
  }, { '../internals/export': 107 }],
  341: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var toISOString = require('../internals/date-to-iso-string')

    // `Date.prototype.toISOString` method
    // https://tc39.es/ecma262/#sec-date.prototype.toisostring
    // PhantomJS / old WebKit has a broken implementations
    $({ target: 'Date', proto: true, forced: Date.prototype.toISOString !== toISOString }, {
      toISOString: toISOString
    })
  }, { '../internals/date-to-iso-string': 78, '../internals/export': 107 }],
  342: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var fails = require('../internals/fails')
    var toObject = require('../internals/to-object')
    var toPrimitive = require('../internals/to-primitive')

    var FORCED = fails(function () {
      return new Date(NaN).toJSON() !== null ||
    Date.prototype.toJSON.call({ toISOString: function () { return 1 } }) !== 1
    })

    // `Date.prototype.toJSON` method
    // https://tc39.es/ecma262/#sec-date.prototype.tojson
    $({ target: 'Date', proto: true, arity: 1, forced: FORCED }, {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      toJSON: function toJSON (key) {
        var O = toObject(this)
        var pv = toPrimitive(O, 'number')
        return typeof pv === 'number' && !isFinite(pv) ? null : O.toISOString()
      }
    })
  }, { '../internals/export': 107, '../internals/fails': 108, '../internals/to-object': 263, '../internals/to-primitive': 266 }],
  343: [function (require, module, exports) {
    'use strict'
    var hasOwn = require('../internals/has-own-property')
    var defineBuiltIn = require('../internals/define-built-in')
    var dateToPrimitive = require('../internals/date-to-primitive')
    var wellKnownSymbol = require('../internals/well-known-symbol')

    var TO_PRIMITIVE = wellKnownSymbol('toPrimitive')
    var DatePrototype = Date.prototype

    // `Date.prototype[@@toPrimitive]` method
    // https://tc39.es/ecma262/#sec-date.prototype-@@toprimitive
    if (!hasOwn(DatePrototype, TO_PRIMITIVE)) {
      defineBuiltIn(DatePrototype, TO_PRIMITIVE, dateToPrimitive)
    }
  }, { '../internals/date-to-primitive': 79, '../internals/define-built-in': 81, '../internals/has-own-property': 132, '../internals/well-known-symbol': 285 }],
  344: [function (require, module, exports) {
    'use strict'
    // TODO: Remove from `core-js@4`
    var uncurryThis = require('../internals/function-uncurry-this')
    var defineBuiltIn = require('../internals/define-built-in')

    var DatePrototype = Date.prototype
    var INVALID_DATE = 'Invalid Date'
    var TO_STRING = 'toString'
    var nativeDateToString = uncurryThis(DatePrototype[TO_STRING])
    var thisTimeValue = uncurryThis(DatePrototype.getTime)

    // `Date.prototype.toString` method
    // https://tc39.es/ecma262/#sec-date.prototype.tostring
    if (String(new Date(NaN)) !== INVALID_DATE) {
      defineBuiltIn(DatePrototype, TO_STRING, function toString () {
        var value = thisTimeValue(this)
        // eslint-disable-next-line no-self-compare -- NaN check
        return value === value ? nativeDateToString(this) : INVALID_DATE
      })
    }
  }, { '../internals/define-built-in': 81, '../internals/function-uncurry-this': 120 }],
  345: [function (require, module, exports) {
    'use strict'
    /* eslint-disable no-unused-vars -- required for functions `.length` */
    var $ = require('../internals/export')
    var globalThis = require('../internals/global-this')
    var apply = require('../internals/function-apply')
    var wrapErrorConstructorWithCause = require('../internals/wrap-error-constructor-with-cause')

    var WEB_ASSEMBLY = 'WebAssembly'
    var WebAssembly = globalThis[WEB_ASSEMBLY]

    // eslint-disable-next-line es/no-error-cause -- feature detection
    var FORCED = new Error('e', { cause: 7 }).cause !== 7

    var exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {
      var O = {}
      O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED)
      $({ global: true, constructor: true, arity: 1, forced: FORCED }, O)
    }

    var exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {
      if (WebAssembly && WebAssembly[ERROR_NAME]) {
        var O = {}
        O[ERROR_NAME] = wrapErrorConstructorWithCause(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED)
        $({ target: WEB_ASSEMBLY, stat: true, constructor: true, arity: 1, forced: FORCED }, O)
      }
    }

    // https://tc39.es/ecma262/#sec-nativeerror
    exportGlobalErrorCauseWrapper('Error', function (init) {
      return function Error (message) { return apply(init, this, arguments) }
    })
    exportGlobalErrorCauseWrapper('EvalError', function (init) {
      return function EvalError (message) { return apply(init, this, arguments) }
    })
    exportGlobalErrorCauseWrapper('RangeError', function (init) {
      return function RangeError (message) { return apply(init, this, arguments) }
    })
    exportGlobalErrorCauseWrapper('ReferenceError', function (init) {
      return function ReferenceError (message) { return apply(init, this, arguments) }
    })
    exportGlobalErrorCauseWrapper('SyntaxError', function (init) {
      return function SyntaxError (message) { return apply(init, this, arguments) }
    })
    exportGlobalErrorCauseWrapper('TypeError', function (init) {
      return function TypeError (message) { return apply(init, this, arguments) }
    })
    exportGlobalErrorCauseWrapper('URIError', function (init) {
      return function URIError (message) { return apply(init, this, arguments) }
    })
    exportWebAssemblyErrorCauseWrapper('CompileError', function (init) {
      return function CompileError (message) { return apply(init, this, arguments) }
    })
    exportWebAssemblyErrorCauseWrapper('LinkError', function (init) {
      return function LinkError (message) { return apply(init, this, arguments) }
    })
    exportWebAssemblyErrorCauseWrapper('RuntimeError', function (init) {
      return function RuntimeError (message) { return apply(init, this, arguments) }
    })
  }, { '../internals/export': 107, '../internals/function-apply': 112, '../internals/global-this': 131, '../internals/wrap-error-constructor-with-cause': 287 }],
  346: [function (require, module, exports) {
    'use strict'
    var defineBuiltIn = require('../internals/define-built-in')
    var errorToString = require('../internals/error-to-string')

    var ErrorPrototype = Error.prototype

    // `Error.prototype.toString` method fix
    // https://tc39.es/ecma262/#sec-error.prototype.tostring
    if (ErrorPrototype.toString !== errorToString) {
      defineBuiltIn(ErrorPrototype, 'toString', errorToString)
    }
  }, { '../internals/define-built-in': 81, '../internals/error-to-string': 106 }],
  347: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var uncurryThis = require('../internals/function-uncurry-this')
    var toString = require('../internals/to-string')

    var charAt = uncurryThis(''.charAt)
    var charCodeAt = uncurryThis(''.charCodeAt)
    var exec = uncurryThis(/./.exec)
    var numberToString = uncurryThis(1.0.toString)
    var toUpperCase = uncurryThis(''.toUpperCase)

    var raw = /[\w*+\-./@]/

    var hex = function (code, length) {
      var result = numberToString(code, 16)
      while (result.length < length) result = '0' + result
      return result
    }

    // `escape` method
    // https://tc39.es/ecma262/#sec-escape-string
    $({ global: true }, {
      escape: function escape (string) {
        var str = toString(string)
        var result = ''
        var length = str.length
        var index = 0
        var chr, code
        while (index < length) {
          chr = charAt(str, index++)
          if (exec(raw, chr)) {
            result += chr
          } else {
            code = charCodeAt(chr, 0)
            if (code < 256) {
              result += '%' + hex(code, 2)
            } else {
              result += '%u' + toUpperCase(hex(code, 4))
            }
          }
        } return result
      }
    })
  }, { '../internals/export': 107, '../internals/function-uncurry-this': 120, '../internals/to-string': 269 }],
  348: [function (require, module, exports) {
    'use strict'
    // TODO: Remove from `core-js@4`
    var $ = require('../internals/export')
    var bind = require('../internals/function-bind')

    // `Function.prototype.bind` method
    // https://tc39.es/ecma262/#sec-function.prototype.bind
    // eslint-disable-next-line es/no-function-prototype-bind -- detection
    $({ target: 'Function', proto: true, forced: Function.bind !== bind }, {
      bind: bind
    })
  }, { '../internals/export': 107, '../internals/function-bind': 115 }],
  349: [function (require, module, exports) {
    'use strict'
    var isCallable = require('../internals/is-callable')
    var isObject = require('../internals/is-object')
    var definePropertyModule = require('../internals/object-define-property')
    var isPrototypeOf = require('../internals/object-is-prototype-of')
    var wellKnownSymbol = require('../internals/well-known-symbol')
    var makeBuiltIn = require('../internals/make-built-in')

    var HAS_INSTANCE = wellKnownSymbol('hasInstance')
    var FunctionPrototype = Function.prototype

    // `Function.prototype[@@hasInstance]` method
    // https://tc39.es/ecma262/#sec-function.prototype-@@hasinstance
    if (!(HAS_INSTANCE in FunctionPrototype)) {
      definePropertyModule.f(FunctionPrototype, HAS_INSTANCE, {
        value: makeBuiltIn(function (O) {
          if (!isCallable(this) || !isObject(O)) return false
          var P = this.prototype
          return isObject(P) ? isPrototypeOf(P, O) : O instanceof this
        }, HAS_INSTANCE)
      })
    }
  }, { '../internals/is-callable': 147, '../internals/is-object': 153, '../internals/make-built-in': 168, '../internals/object-define-property': 187, '../internals/object-is-prototype-of': 194, '../internals/well-known-symbol': 285 }],
  350: [function (require, module, exports) {
    'use strict'
    var DESCRIPTORS = require('../internals/descriptors')
    var FUNCTION_NAME_EXISTS = require('../internals/function-name').EXISTS
    var uncurryThis = require('../internals/function-uncurry-this')
    var defineBuiltInAccessor = require('../internals/define-built-in-accessor')

    var FunctionPrototype = Function.prototype
    var functionToString = uncurryThis(FunctionPrototype.toString)
    var nameRE = /function\b(?:\s|\/\*[\S\s]*?\*\/|\/\/[^\n\r]*[\n\r]+)*([^\s(/]*)/
    var regExpExec = uncurryThis(nameRE.exec)
    var NAME = 'name'

    // Function instances `.name` property
    // https://tc39.es/ecma262/#sec-function-instances-name
    if (DESCRIPTORS && !FUNCTION_NAME_EXISTS) {
      defineBuiltInAccessor(FunctionPrototype, NAME, {
        configurable: true,
        get: function () {
          try {
            return regExpExec(nameRE, functionToString(this))[1]
          } catch (error) {
            return ''
          }
        }
      })
    }
  }, { '../internals/define-built-in-accessor': 80, '../internals/descriptors': 85, '../internals/function-name': 117, '../internals/function-uncurry-this': 120 }],
  351: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var globalThis = require('../internals/global-this')

    // `globalThis` object
    // https://tc39.es/ecma262/#sec-globalthis
    $({ global: true, forced: globalThis.globalThis !== globalThis }, {
      globalThis: globalThis
    })
  }, { '../internals/export': 107, '../internals/global-this': 131 }],
  352: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var getBuiltIn = require('../internals/get-built-in')
    var apply = require('../internals/function-apply')
    var call = require('../internals/function-call')
    var uncurryThis = require('../internals/function-uncurry-this')
    var fails = require('../internals/fails')
    var isCallable = require('../internals/is-callable')
    var isSymbol = require('../internals/is-symbol')
    var arraySlice = require('../internals/array-slice')
    var getReplacerFunction = require('../internals/get-json-replacer-function')
    var NATIVE_SYMBOL = require('../internals/symbol-constructor-detection')

    var $String = String
    var $stringify = getBuiltIn('JSON', 'stringify')
    var exec = uncurryThis(/./.exec)
    var charAt = uncurryThis(''.charAt)
    var charCodeAt = uncurryThis(''.charCodeAt)
    var replace = uncurryThis(''.replace)
    var numberToString = uncurryThis(1.0.toString)

    var tester = /[\uD800-\uDFFF]/g
    var low = /^[\uD800-\uDBFF]$/
    var hi = /^[\uDC00-\uDFFF]$/

    var WRONG_SYMBOLS_CONVERSION = !NATIVE_SYMBOL || fails(function () {
      var symbol = getBuiltIn('Symbol')('stringify detection')
      // MS Edge converts symbol values to JSON as {}
      return $stringify([symbol]) !== '[null]' ||
    // WebKit converts symbol values to JSON as null
    $stringify({ a: symbol }) !== '{}' ||
    // V8 throws on boxed symbols
    $stringify(Object(symbol)) !== '{}'
    })

    // https://github.com/tc39/proposal-well-formed-stringify
    var ILL_FORMED_UNICODE = fails(function () {
      return $stringify('\uDF06\uD834') !== '"\\udf06\\ud834"' ||
    $stringify('\uDEAD') !== '"\\udead"'
    })

    var stringifyWithSymbolsFix = function (it, replacer) {
      var args = arraySlice(arguments)
      var $replacer = getReplacerFunction(replacer)
      if (!isCallable($replacer) && (it === undefined || isSymbol(it))) return // IE8 returns string on undefined
      args[1] = function (key, value) {
        // some old implementations (like WebKit) could pass numbers as keys
        if (isCallable($replacer)) value = call($replacer, this, $String(key), value)
        if (!isSymbol(value)) return value
      }
      return apply($stringify, null, args)
    }

    var fixIllFormed = function (match, offset, string) {
      var prev = charAt(string, offset - 1)
      var next = charAt(string, offset + 1)
      if ((exec(low, match) && !exec(hi, next)) || (exec(hi, match) && !exec(low, prev))) {
        return '\\u' + numberToString(charCodeAt(match, 0), 16)
      } return match
    }

    if ($stringify) {
      // `JSON.stringify` method
      // https://tc39.es/ecma262/#sec-json.stringify
      $({ target: 'JSON', stat: true, arity: 3, forced: WRONG_SYMBOLS_CONVERSION || ILL_FORMED_UNICODE }, {
        // eslint-disable-next-line no-unused-vars -- required for `.length`
        stringify: function stringify (it, replacer, space) {
          var args = arraySlice(arguments)
          var result = apply(WRONG_SYMBOLS_CONVERSION ? stringifyWithSymbolsFix : $stringify, null, args)
          return ILL_FORMED_UNICODE && typeof result === 'string' ? replace(result, tester, fixIllFormed) : result
        }
      })
    }
  }, { '../internals/array-slice': 52, '../internals/export': 107, '../internals/fails': 108, '../internals/function-apply': 112, '../internals/function-call': 116, '../internals/function-uncurry-this': 120, '../internals/get-built-in': 123, '../internals/get-json-replacer-function': 127, '../internals/is-callable': 147, '../internals/is-symbol': 157, '../internals/symbol-constructor-detection': 252 }],
  353: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')
    var setToStringTag = require('../internals/set-to-string-tag')

    // JSON[@@toStringTag] property
    // https://tc39.es/ecma262/#sec-json-@@tostringtag
    setToStringTag(globalThis.JSON, 'JSON', true)
  }, { '../internals/global-this': 131, '../internals/set-to-string-tag': 235 }],
  354: [function (require, module, exports) {
    'use strict'
    var collection = require('../internals/collection')
    var collectionStrong = require('../internals/collection-strong')

    // `Map` constructor
    // https://tc39.es/ecma262/#sec-map-objects
    collection('Map', function (init) {
      return function Map () { return init(this, arguments.length ? arguments[0] : undefined) }
    }, collectionStrong)
  }, { '../internals/collection': 69, '../internals/collection-strong': 67 }],
  355: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var uncurryThis = require('../internals/function-uncurry-this')
    var aCallable = require('../internals/a-callable')
    var requireObjectCoercible = require('../internals/require-object-coercible')
    var iterate = require('../internals/iterate')
    var MapHelpers = require('../internals/map-helpers')
    var IS_PURE = require('../internals/is-pure')
    var fails = require('../internals/fails')

    var Map = MapHelpers.Map
    var has = MapHelpers.has
    var get = MapHelpers.get
    var set = MapHelpers.set
    var push = uncurryThis([].push)

    var DOES_NOT_WORK_WITH_PRIMITIVES = IS_PURE || fails(function () {
      return Map.groupBy('ab', function (it) {
        return it
      }).get('a').length !== 1
    })

    // `Map.groupBy` method
    // https://github.com/tc39/proposal-array-grouping
    $({ target: 'Map', stat: true, forced: IS_PURE || DOES_NOT_WORK_WITH_PRIMITIVES }, {
      groupBy: function groupBy (items, callbackfn) {
        requireObjectCoercible(items)
        aCallable(callbackfn)
        var map = new Map()
        var k = 0
        iterate(items, function (value) {
          var key = callbackfn(value, k++)
          if (!has(map, key)) set(map, key, [value])
          else push(get(map, key), value)
        })
        return map
      }
    })
  }, { '../internals/a-callable': 23, '../internals/export': 107, '../internals/fails': 108, '../internals/function-uncurry-this': 120, '../internals/is-pure': 155, '../internals/iterate': 159, '../internals/map-helpers': 169, '../internals/require-object-coercible': 219 }],
  356: [function (require, module, exports) {
    'use strict'
    // TODO: Remove this module from `core-js@4` since it's replaced to module below
    require('../modules/es.map.constructor')
  }, { '../modules/es.map.constructor': 354 }],
  357: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var log1p = require('../internals/math-log1p')

    // eslint-disable-next-line es/no-math-acosh -- required for testing
    var $acosh = Math.acosh
    var log = Math.log
    var sqrt = Math.sqrt
    var LN2 = Math.LN2

    var FORCED = !$acosh ||
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  Math.floor($acosh(Number.MAX_VALUE)) !== 710 ||
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  $acosh(Infinity) !== Infinity

    // `Math.acosh` method
    // https://tc39.es/ecma262/#sec-math.acosh
    $({ target: 'Math', stat: true, forced: FORCED }, {
      acosh: function acosh (x) {
        var n = +x
        return n < 1 ? NaN : n > 94906265.62425156
          ? log(n) + LN2
          : log1p(n - 1 + sqrt(n - 1) * sqrt(n + 1))
      }
    })
  }, { '../internals/export': 107, '../internals/math-log1p': 174 }],
  358: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')

    // eslint-disable-next-line es/no-math-asinh -- required for testing
    var $asinh = Math.asinh
    var log = Math.log
    var sqrt = Math.sqrt

    function asinh (x) {
      var n = +x
      return !isFinite(n) || n === 0 ? n : n < 0 ? -asinh(-n) : log(n + sqrt(n * n + 1))
    }

    var FORCED = !($asinh && 1 / $asinh(0) > 0)

    // `Math.asinh` method
    // https://tc39.es/ecma262/#sec-math.asinh
    // Tor Browser bug: Math.asinh(0) -> -0
    $({ target: 'Math', stat: true, forced: FORCED }, {
      asinh: asinh
    })
  }, { '../internals/export': 107 }],
  359: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')

    // eslint-disable-next-line es/no-math-atanh -- required for testing
    var $atanh = Math.atanh
    var log = Math.log

    var FORCED = !($atanh && 1 / $atanh(-0) < 0)

    // `Math.atanh` method
    // https://tc39.es/ecma262/#sec-math.atanh
    // Tor Browser bug: Math.atanh(-0) -> 0
    $({ target: 'Math', stat: true, forced: FORCED }, {
      atanh: function atanh (x) {
        var n = +x
        return n === 0 ? n : log((1 + n) / (1 - n)) / 2
      }
    })
  }, { '../internals/export': 107 }],
  360: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var sign = require('../internals/math-sign')

    var abs = Math.abs
    var pow = Math.pow

    // `Math.cbrt` method
    // https://tc39.es/ecma262/#sec-math.cbrt
    $({ target: 'Math', stat: true }, {
      cbrt: function cbrt (x) {
        var n = +x
        return sign(n) * pow(abs(n), 1 / 3)
      }
    })
  }, { '../internals/export': 107, '../internals/math-sign': 175 }],
  361: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')

    var floor = Math.floor
    var log = Math.log
    var LOG2E = Math.LOG2E

    // `Math.clz32` method
    // https://tc39.es/ecma262/#sec-math.clz32
    $({ target: 'Math', stat: true }, {
      clz32: function clz32 (x) {
        var n = x >>> 0
        return n ? 31 - floor(log(n + 0.5) * LOG2E) : 32
      }
    })
  }, { '../internals/export': 107 }],
  362: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var expm1 = require('../internals/math-expm1')

    // eslint-disable-next-line es/no-math-cosh -- required for testing
    var $cosh = Math.cosh
    var abs = Math.abs
    var E = Math.E

    var FORCED = !$cosh || $cosh(710) === Infinity

    // `Math.cosh` method
    // https://tc39.es/ecma262/#sec-math.cosh
    $({ target: 'Math', stat: true, forced: FORCED }, {
      cosh: function cosh (x) {
        var t = expm1(abs(x) - 1) + 1
        return (t + 1 / (t * E * E)) * (E / 2)
      }
    })
  }, { '../internals/export': 107, '../internals/math-expm1': 170 }],
  363: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var expm1 = require('../internals/math-expm1')

    // `Math.expm1` method
    // https://tc39.es/ecma262/#sec-math.expm1
    // eslint-disable-next-line es/no-math-expm1 -- required for testing
    $({ target: 'Math', stat: true, forced: expm1 !== Math.expm1 }, { expm1: expm1 })
  }, { '../internals/export': 107, '../internals/math-expm1': 170 }],
  364: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var fround = require('../internals/math-fround')

    // `Math.fround` method
    // https://tc39.es/ecma262/#sec-math.fround
    $({ target: 'Math', stat: true }, { fround: fround })
  }, { '../internals/export': 107, '../internals/math-fround': 172 }],
  365: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')

    // eslint-disable-next-line es/no-math-hypot -- required for testing
    var $hypot = Math.hypot
    var abs = Math.abs
    var sqrt = Math.sqrt

    // Chrome 77 bug
    // https://bugs.chromium.org/p/v8/issues/detail?id=9546
    var FORCED = !!$hypot && $hypot(Infinity, NaN) !== Infinity

    // `Math.hypot` method
    // https://tc39.es/ecma262/#sec-math.hypot
    $({ target: 'Math', stat: true, arity: 2, forced: FORCED }, {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      hypot: function hypot (value1, value2) {
        var sum = 0
        var i = 0
        var aLen = arguments.length
        var larg = 0
        var arg, div
        while (i < aLen) {
          arg = abs(arguments[i++])
          if (larg < arg) {
            div = larg / arg
            sum = sum * div * div + 1
            larg = arg
          } else if (arg > 0) {
            div = arg / larg
            sum += div * div
          } else sum += arg
        }
        return larg === Infinity ? Infinity : larg * sqrt(sum)
      }
    })
  }, { '../internals/export': 107 }],
  366: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var fails = require('../internals/fails')

    // eslint-disable-next-line es/no-math-imul -- required for testing
    var $imul = Math.imul

    var FORCED = fails(function () {
      return $imul(0xFFFFFFFF, 5) !== -5 || $imul.length !== 2
    })

    // `Math.imul` method
    // https://tc39.es/ecma262/#sec-math.imul
    // some WebKit versions fails with big numbers, some has wrong arity
    $({ target: 'Math', stat: true, forced: FORCED }, {
      imul: function imul (x, y) {
        var UINT16 = 0xFFFF
        var xn = +x
        var yn = +y
        var xl = UINT16 & xn
        var yl = UINT16 & yn
        return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0)
      }
    })
  }, { '../internals/export': 107, '../internals/fails': 108 }],
  367: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var log10 = require('../internals/math-log10')

    // `Math.log10` method
    // https://tc39.es/ecma262/#sec-math.log10
    $({ target: 'Math', stat: true }, {
      log10: log10
    })
  }, { '../internals/export': 107, '../internals/math-log10': 173 }],
  368: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var log1p = require('../internals/math-log1p')

    // `Math.log1p` method
    // https://tc39.es/ecma262/#sec-math.log1p
    $({ target: 'Math', stat: true }, { log1p: log1p })
  }, { '../internals/export': 107, '../internals/math-log1p': 174 }],
  369: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')

    var log = Math.log
    var LN2 = Math.LN2

    // `Math.log2` method
    // https://tc39.es/ecma262/#sec-math.log2
    $({ target: 'Math', stat: true }, {
      log2: function log2 (x) {
        return log(x) / LN2
      }
    })
  }, { '../internals/export': 107 }],
  370: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var sign = require('../internals/math-sign')

    // `Math.sign` method
    // https://tc39.es/ecma262/#sec-math.sign
    $({ target: 'Math', stat: true }, {
      sign: sign
    })
  }, { '../internals/export': 107, '../internals/math-sign': 175 }],
  371: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var fails = require('../internals/fails')
    var expm1 = require('../internals/math-expm1')

    var abs = Math.abs
    var exp = Math.exp
    var E = Math.E

    var FORCED = fails(function () {
      // eslint-disable-next-line es/no-math-sinh -- required for testing
      return Math.sinh(-2e-17) !== -2e-17
    })

    // `Math.sinh` method
    // https://tc39.es/ecma262/#sec-math.sinh
    // V8 near Chromium 38 has a problem with very small numbers
    $({ target: 'Math', stat: true, forced: FORCED }, {
      sinh: function sinh (x) {
        var n = +x
        return abs(n) < 1 ? (expm1(n) - expm1(-n)) / 2 : (exp(n - 1) - exp(-n - 1)) * (E / 2)
      }
    })
  }, { '../internals/export': 107, '../internals/fails': 108, '../internals/math-expm1': 170 }],
  372: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var expm1 = require('../internals/math-expm1')

    var exp = Math.exp

    // `Math.tanh` method
    // https://tc39.es/ecma262/#sec-math.tanh
    $({ target: 'Math', stat: true }, {
      tanh: function tanh (x) {
        var n = +x
        var a = expm1(n)
        var b = expm1(-n)
        return a === Infinity ? 1 : b === Infinity ? -1 : (a - b) / (exp(n) + exp(-n))
      }
    })
  }, { '../internals/export': 107, '../internals/math-expm1': 170 }],
  373: [function (require, module, exports) {
    'use strict'
    var setToStringTag = require('../internals/set-to-string-tag')

    // Math[@@toStringTag] property
    // https://tc39.es/ecma262/#sec-math-@@tostringtag
    setToStringTag(Math, 'Math', true)
  }, { '../internals/set-to-string-tag': 235 }],
  374: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var trunc = require('../internals/math-trunc')

    // `Math.trunc` method
    // https://tc39.es/ecma262/#sec-math.trunc
    $({ target: 'Math', stat: true }, {
      trunc: trunc
    })
  }, { '../internals/export': 107, '../internals/math-trunc': 176 }],
  375: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var IS_PURE = require('../internals/is-pure')
    var DESCRIPTORS = require('../internals/descriptors')
    var globalThis = require('../internals/global-this')
    var path = require('../internals/path')
    var uncurryThis = require('../internals/function-uncurry-this')
    var isForced = require('../internals/is-forced')
    var hasOwn = require('../internals/has-own-property')
    var inheritIfRequired = require('../internals/inherit-if-required')
    var isPrototypeOf = require('../internals/object-is-prototype-of')
    var isSymbol = require('../internals/is-symbol')
    var toPrimitive = require('../internals/to-primitive')
    var fails = require('../internals/fails')
    var getOwnPropertyNames = require('../internals/object-get-own-property-names').f
    var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f
    var defineProperty = require('../internals/object-define-property').f
    var thisNumberValue = require('../internals/this-number-value')
    var trim = require('../internals/string-trim').trim

    var NUMBER = 'Number'
    var NativeNumber = globalThis[NUMBER]
    var PureNumberNamespace = path[NUMBER]
    var NumberPrototype = NativeNumber.prototype
    var TypeError = globalThis.TypeError
    var stringSlice = uncurryThis(''.slice)
    var charCodeAt = uncurryThis(''.charCodeAt)

    // `ToNumeric` abstract operation
    // https://tc39.es/ecma262/#sec-tonumeric
    var toNumeric = function (value) {
      var primValue = toPrimitive(value, 'number')
      return typeof primValue === 'bigint' ? primValue : toNumber(primValue)
    }

    // `ToNumber` abstract operation
    // https://tc39.es/ecma262/#sec-tonumber
    var toNumber = function (argument) {
      var it = toPrimitive(argument, 'number')
      var first, third, radix, maxCode, digits, length, index, code
      if (isSymbol(it)) throw new TypeError('Cannot convert a Symbol value to a number')
      if (typeof it === 'string' && it.length > 2) {
        it = trim(it)
        first = charCodeAt(it, 0)
        if (first === 43 || first === 45) {
          third = charCodeAt(it, 2)
          if (third === 88 || third === 120) return NaN // Number('+0x1') should be NaN, old V8 fix
        } else if (first === 48) {
          switch (charCodeAt(it, 1)) {
            // fast equal of /^0b[01]+$/i
            case 66:
            case 98:
              radix = 2
              maxCode = 49
              break
            // fast equal of /^0o[0-7]+$/i
            case 79:
            case 111:
              radix = 8
              maxCode = 55
              break
            default:
              return +it
          }
          digits = stringSlice(it, 2)
          length = digits.length
          for (index = 0; index < length; index++) {
            code = charCodeAt(digits, index)
            // parseInt parses a string to a first unavailable symbol
            // but ToNumber should return NaN if a string contains unavailable symbols
            if (code < 48 || code > maxCode) return NaN
          } return parseInt(digits, radix)
        }
      } return +it
    }

    var FORCED = isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))

    var calledWithNew = function (dummy) {
      // includes check on 1..constructor(foo) case
      return isPrototypeOf(NumberPrototype, dummy) && fails(function () { thisNumberValue(dummy) })
    }

    // `Number` constructor
    // https://tc39.es/ecma262/#sec-number-constructor
    var NumberWrapper = function Number (value) {
      var n = arguments.length < 1 ? 0 : NativeNumber(toNumeric(value))
      return calledWithNew(this) ? inheritIfRequired(Object(n), this, NumberWrapper) : n
    }

    NumberWrapper.prototype = NumberPrototype
    if (FORCED && !IS_PURE) NumberPrototype.constructor = NumberWrapper

    $({ global: true, constructor: true, wrap: true, forced: FORCED }, {
      Number: NumberWrapper
    })

    // Use `internal/copy-constructor-properties` helper in `core-js@4`
    var copyConstructorProperties = function (target, source) {
      for (var keys = DESCRIPTORS ? getOwnPropertyNames(source) : (
        // ES3:
          'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,' +
    // ESNext
    'fromString,range'
        ).split(','), j = 0, key; keys.length > j; j++) {
        if (hasOwn(source, key = keys[j]) && !hasOwn(target, key)) {
          defineProperty(target, key, getOwnPropertyDescriptor(source, key))
        }
      }
    }

    if (IS_PURE && PureNumberNamespace) copyConstructorProperties(path[NUMBER], PureNumberNamespace)
    if (FORCED || IS_PURE) copyConstructorProperties(path[NUMBER], NativeNumber)
  }, { '../internals/descriptors': 85, '../internals/export': 107, '../internals/fails': 108, '../internals/function-uncurry-this': 120, '../internals/global-this': 131, '../internals/has-own-property': 132, '../internals/inherit-if-required': 139, '../internals/is-forced': 150, '../internals/is-pure': 155, '../internals/is-symbol': 157, '../internals/object-define-property': 187, '../internals/object-get-own-property-descriptor': 188, '../internals/object-get-own-property-names': 190, '../internals/object-is-prototype-of': 194, '../internals/path': 204, '../internals/string-trim': 250, '../internals/this-number-value': 256, '../internals/to-primitive': 266 }],
  376: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')

    // `Number.EPSILON` constant
    // https://tc39.es/ecma262/#sec-number.epsilon
    $({ target: 'Number', stat: true, nonConfigurable: true, nonWritable: true }, {
      EPSILON: Math.pow(2, -52)
    })
  }, { '../internals/export': 107 }],
  377: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var numberIsFinite = require('../internals/number-is-finite')

    // `Number.isFinite` method
    // https://tc39.es/ecma262/#sec-number.isfinite
    $({ target: 'Number', stat: true }, { isFinite: numberIsFinite })
  }, { '../internals/export': 107, '../internals/number-is-finite': 181 }],
  378: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var isIntegralNumber = require('../internals/is-integral-number')

    // `Number.isInteger` method
    // https://tc39.es/ecma262/#sec-number.isinteger
    $({ target: 'Number', stat: true }, {
      isInteger: isIntegralNumber
    })
  }, { '../internals/export': 107, '../internals/is-integral-number': 151 }],
  379: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')

    // `Number.isNaN` method
    // https://tc39.es/ecma262/#sec-number.isnan
    $({ target: 'Number', stat: true }, {
      isNaN: function isNaN (number) {
        // eslint-disable-next-line no-self-compare -- NaN check
        return number !== number
      }
    })
  }, { '../internals/export': 107 }],
  380: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var isIntegralNumber = require('../internals/is-integral-number')

    var abs = Math.abs

    // `Number.isSafeInteger` method
    // https://tc39.es/ecma262/#sec-number.issafeinteger
    $({ target: 'Number', stat: true }, {
      isSafeInteger: function isSafeInteger (number) {
        return isIntegralNumber(number) && abs(number) <= 0x1FFFFFFFFFFFFF
      }
    })
  }, { '../internals/export': 107, '../internals/is-integral-number': 151 }],
  381: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')

    // `Number.MAX_SAFE_INTEGER` constant
    // https://tc39.es/ecma262/#sec-number.max_safe_integer
    $({ target: 'Number', stat: true, nonConfigurable: true, nonWritable: true }, {
      MAX_SAFE_INTEGER: 0x1FFFFFFFFFFFFF
    })
  }, { '../internals/export': 107 }],
  382: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')

    // `Number.MIN_SAFE_INTEGER` constant
    // https://tc39.es/ecma262/#sec-number.min_safe_integer
    $({ target: 'Number', stat: true, nonConfigurable: true, nonWritable: true }, {
      MIN_SAFE_INTEGER: -0x1FFFFFFFFFFFFF
    })
  }, { '../internals/export': 107 }],
  383: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var parseFloat = require('../internals/number-parse-float')

    // `Number.parseFloat` method
    // https://tc39.es/ecma262/#sec-number.parseFloat
    // eslint-disable-next-line es/no-number-parsefloat -- required for testing
    $({ target: 'Number', stat: true, forced: Number.parseFloat !== parseFloat }, {
      parseFloat: parseFloat
    })
  }, { '../internals/export': 107, '../internals/number-parse-float': 182 }],
  384: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var parseInt = require('../internals/number-parse-int')

    // `Number.parseInt` method
    // https://tc39.es/ecma262/#sec-number.parseint
    // eslint-disable-next-line es/no-number-parseint -- required for testing
    $({ target: 'Number', stat: true, forced: Number.parseInt !== parseInt }, {
      parseInt: parseInt
    })
  }, { '../internals/export': 107, '../internals/number-parse-int': 183 }],
  385: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var uncurryThis = require('../internals/function-uncurry-this')
    var toIntegerOrInfinity = require('../internals/to-integer-or-infinity')
    var thisNumberValue = require('../internals/this-number-value')
    var $repeat = require('../internals/string-repeat')
    var log10 = require('../internals/math-log10')
    var fails = require('../internals/fails')

    var $RangeError = RangeError
    var $String = String
    var $isFinite = isFinite
    var abs = Math.abs
    var floor = Math.floor
    var pow = Math.pow
    var round = Math.round
    var nativeToExponential = uncurryThis(1.0.toExponential)
    var repeat = uncurryThis($repeat)
    var stringSlice = uncurryThis(''.slice)

    // Edge 17-
    var ROUNDS_PROPERLY = nativeToExponential(-6.9e-11, 4) === '-6.9000e-11' &&
  // IE11- && Edge 14-
  nativeToExponential(1.255, 2) === '1.25e+0' &&
  // FF86-, V8 ~ Chrome 49-50
  nativeToExponential(12345, 3) === '1.235e+4' &&
  // FF86-, V8 ~ Chrome 49-50
  nativeToExponential(25, 0) === '3e+1'

    // IE8-
    var throwsOnInfinityFraction = function () {
      return fails(function () {
        nativeToExponential(1, Infinity)
      }) && fails(function () {
        nativeToExponential(1, -Infinity)
      })
    }

    // Safari <11 && FF <50
    var properNonFiniteThisCheck = function () {
      return !fails(function () {
        nativeToExponential(Infinity, Infinity)
        nativeToExponential(NaN, Infinity)
      })
    }

    var FORCED = !ROUNDS_PROPERLY || !throwsOnInfinityFraction() || !properNonFiniteThisCheck()

    // `Number.prototype.toExponential` method
    // https://tc39.es/ecma262/#sec-number.prototype.toexponential
    $({ target: 'Number', proto: true, forced: FORCED }, {
      toExponential: function toExponential (fractionDigits) {
        var x = thisNumberValue(this)
        if (fractionDigits === undefined) return nativeToExponential(x)
        var f = toIntegerOrInfinity(fractionDigits)
        if (!$isFinite(x)) return String(x)
        // TODO: ES2018 increased the maximum number of fraction digits to 100, need to improve the implementation
        if (f < 0 || f > 20) throw new $RangeError('Incorrect fraction digits')
        if (ROUNDS_PROPERLY) return nativeToExponential(x, f)
        var s = ''
        var m, e, c, d
        if (x < 0) {
          s = '-'
          x = -x
        }
        if (x === 0) {
          e = 0
          m = repeat('0', f + 1)
        } else {
          // this block is based on https://gist.github.com/SheetJSDev/1100ad56b9f856c95299ed0e068eea08
          // TODO: improve accuracy with big fraction digits
          var l = log10(x)
          e = floor(l)
          var w = pow(10, e - f)
          var n = round(x / w)
          if (2 * x >= (2 * n + 1) * w) {
            n += 1
          }
          if (n >= pow(10, f + 1)) {
            n /= 10
            e += 1
          }
          m = $String(n)
        }
        if (f !== 0) {
          m = stringSlice(m, 0, 1) + '.' + stringSlice(m, 1)
        }
        if (e === 0) {
          c = '+'
          d = '0'
        } else {
          c = e > 0 ? '+' : '-'
          d = $String(abs(e))
        }
        m += 'e' + c + d
        return s + m
      }
    })
  }, { '../internals/export': 107, '../internals/fails': 108, '../internals/function-uncurry-this': 120, '../internals/math-log10': 173, '../internals/string-repeat': 246, '../internals/this-number-value': 256, '../internals/to-integer-or-infinity': 261 }],
  386: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var uncurryThis = require('../internals/function-uncurry-this')
    var toIntegerOrInfinity = require('../internals/to-integer-or-infinity')
    var thisNumberValue = require('../internals/this-number-value')
    var $repeat = require('../internals/string-repeat')
    var fails = require('../internals/fails')

    var $RangeError = RangeError
    var $String = String
    var floor = Math.floor
    var repeat = uncurryThis($repeat)
    var stringSlice = uncurryThis(''.slice)
    var nativeToFixed = uncurryThis(1.0.toFixed)

    var pow = function (x, n, acc) {
      return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc)
    }

    var log = function (x) {
      var n = 0
      var x2 = x
      while (x2 >= 4096) {
        n += 12
        x2 /= 4096
      }
      while (x2 >= 2) {
        n += 1
        x2 /= 2
      } return n
    }

    var multiply = function (data, n, c) {
      var index = -1
      var c2 = c
      while (++index < 6) {
        c2 += n * data[index]
        data[index] = c2 % 1e7
        c2 = floor(c2 / 1e7)
      }
    }

    var divide = function (data, n) {
      var index = 6
      var c = 0
      while (--index >= 0) {
        c += data[index]
        data[index] = floor(c / n)
        c = (c % n) * 1e7
      }
    }

    var dataToString = function (data) {
      var index = 6
      var s = ''
      while (--index >= 0) {
        if (s !== '' || index === 0 || data[index] !== 0) {
          var t = $String(data[index])
          s = s === '' ? t : s + repeat('0', 7 - t.length) + t
        }
      } return s
    }

    var FORCED = fails(function () {
      return nativeToFixed(0.00008, 3) !== '0.000' ||
    nativeToFixed(0.9, 0) !== '1' ||
    nativeToFixed(1.255, 2) !== '1.25' ||
    nativeToFixed(1000000000000000128.0, 0) !== '1000000000000000128'
    }) || !fails(function () {
      // V8 ~ Android 4.3-
      nativeToFixed({})
    })

    // `Number.prototype.toFixed` method
    // https://tc39.es/ecma262/#sec-number.prototype.tofixed
    $({ target: 'Number', proto: true, forced: FORCED }, {
      toFixed: function toFixed (fractionDigits) {
        var number = thisNumberValue(this)
        var fractDigits = toIntegerOrInfinity(fractionDigits)
        var data = [0, 0, 0, 0, 0, 0]
        var sign = ''
        var result = '0'
        var e, z, j, k

        // TODO: ES2018 increased the maximum number of fraction digits to 100, need to improve the implementation
        if (fractDigits < 0 || fractDigits > 20) throw new $RangeError('Incorrect fraction digits')
        // eslint-disable-next-line no-self-compare -- NaN check
        if (number !== number) return 'NaN'
        if (number <= -1e21 || number >= 1e21) return $String(number)
        if (number < 0) {
          sign = '-'
          number = -number
        }
        if (number > 1e-21) {
          e = log(number * pow(2, 69, 1)) - 69
          z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1)
          z *= 0x10000000000000
          e = 52 - e
          if (e > 0) {
            multiply(data, 0, z)
            j = fractDigits
            while (j >= 7) {
              multiply(data, 1e7, 0)
              j -= 7
            }
            multiply(data, pow(10, j, 1), 0)
            j = e - 1
            while (j >= 23) {
              divide(data, 1 << 23)
              j -= 23
            }
            divide(data, 1 << j)
            multiply(data, 1, 1)
            divide(data, 2)
            result = dataToString(data)
          } else {
            multiply(data, 0, z)
            multiply(data, 1 << -e, 0)
            result = dataToString(data) + repeat('0', fractDigits)
          }
        }
        if (fractDigits > 0) {
          k = result.length
          result = sign + (k <= fractDigits
            ? '0.' + repeat('0', fractDigits - k) + result
            : stringSlice(result, 0, k - fractDigits) + '.' + stringSlice(result, k - fractDigits))
        } else {
          result = sign + result
        } return result
      }
    })
  }, { '../internals/export': 107, '../internals/fails': 108, '../internals/function-uncurry-this': 120, '../internals/string-repeat': 246, '../internals/this-number-value': 256, '../internals/to-integer-or-infinity': 261 }],
  387: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var uncurryThis = require('../internals/function-uncurry-this')
    var fails = require('../internals/fails')
    var thisNumberValue = require('../internals/this-number-value')

    var nativeToPrecision = uncurryThis(1.0.toPrecision)

    var FORCED = fails(function () {
      // IE7-
      return nativeToPrecision(1, undefined) !== '1'
    }) || !fails(function () {
      // V8 ~ Android 4.3-
      nativeToPrecision({})
    })

    // `Number.prototype.toPrecision` method
    // https://tc39.es/ecma262/#sec-number.prototype.toprecision
    $({ target: 'Number', proto: true, forced: FORCED }, {
      toPrecision: function toPrecision (precision) {
        return precision === undefined
          ? nativeToPrecision(thisNumberValue(this))
          : nativeToPrecision(thisNumberValue(this), precision)
      }
    })
  }, { '../internals/export': 107, '../internals/fails': 108, '../internals/function-uncurry-this': 120, '../internals/this-number-value': 256 }],
  388: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var assign = require('../internals/object-assign')

    // `Object.assign` method
    // https://tc39.es/ecma262/#sec-object.assign
    // eslint-disable-next-line es/no-object-assign -- required for testing
    $({ target: 'Object', stat: true, arity: 2, forced: Object.assign !== assign }, {
      assign: assign
    })
  }, { '../internals/export': 107, '../internals/object-assign': 184 }],
  389: [function (require, module, exports) {
    'use strict'
    // TODO: Remove from `core-js@4`
    var $ = require('../internals/export')
    var DESCRIPTORS = require('../internals/descriptors')
    var create = require('../internals/object-create')

    // `Object.create` method
    // https://tc39.es/ecma262/#sec-object.create
    $({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
      create: create
    })
  }, { '../internals/descriptors': 85, '../internals/export': 107, '../internals/object-create': 185 }],
  390: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var DESCRIPTORS = require('../internals/descriptors')
    var FORCED = require('../internals/object-prototype-accessors-forced')
    var aCallable = require('../internals/a-callable')
    var toObject = require('../internals/to-object')
    var definePropertyModule = require('../internals/object-define-property')

    // `Object.prototype.__defineGetter__` method
    // https://tc39.es/ecma262/#sec-object.prototype.__defineGetter__
    if (DESCRIPTORS) {
      $({ target: 'Object', proto: true, forced: FORCED }, {
        __defineGetter__: function __defineGetter__ (P, getter) {
          definePropertyModule.f(toObject(this), P, { get: aCallable(getter), enumerable: true, configurable: true })
        }
      })
    }
  }, { '../internals/a-callable': 23, '../internals/descriptors': 85, '../internals/export': 107, '../internals/object-define-property': 187, '../internals/object-prototype-accessors-forced': 198, '../internals/to-object': 263 }],
  391: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var DESCRIPTORS = require('../internals/descriptors')
    var defineProperties = require('../internals/object-define-properties').f

    // `Object.defineProperties` method
    // https://tc39.es/ecma262/#sec-object.defineproperties
    // eslint-disable-next-line es/no-object-defineproperties -- safe
    $({ target: 'Object', stat: true, forced: Object.defineProperties !== defineProperties, sham: !DESCRIPTORS }, {
      defineProperties: defineProperties
    })
  }, { '../internals/descriptors': 85, '../internals/export': 107, '../internals/object-define-properties': 186 }],
  392: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var DESCRIPTORS = require('../internals/descriptors')
    var defineProperty = require('../internals/object-define-property').f

    // `Object.defineProperty` method
    // https://tc39.es/ecma262/#sec-object.defineproperty
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    $({ target: 'Object', stat: true, forced: Object.defineProperty !== defineProperty, sham: !DESCRIPTORS }, {
      defineProperty: defineProperty
    })
  }, { '../internals/descriptors': 85, '../internals/export': 107, '../internals/object-define-property': 187 }],
  393: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var DESCRIPTORS = require('../internals/descriptors')
    var FORCED = require('../internals/object-prototype-accessors-forced')
    var aCallable = require('../internals/a-callable')
    var toObject = require('../internals/to-object')
    var definePropertyModule = require('../internals/object-define-property')

    // `Object.prototype.__defineSetter__` method
    // https://tc39.es/ecma262/#sec-object.prototype.__defineSetter__
    if (DESCRIPTORS) {
      $({ target: 'Object', proto: true, forced: FORCED }, {
        __defineSetter__: function __defineSetter__ (P, setter) {
          definePropertyModule.f(toObject(this), P, { set: aCallable(setter), enumerable: true, configurable: true })
        }
      })
    }
  }, { '../internals/a-callable': 23, '../internals/descriptors': 85, '../internals/export': 107, '../internals/object-define-property': 187, '../internals/object-prototype-accessors-forced': 198, '../internals/to-object': 263 }],
  394: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var $entries = require('../internals/object-to-array').entries

    // `Object.entries` method
    // https://tc39.es/ecma262/#sec-object.entries
    $({ target: 'Object', stat: true }, {
      entries: function entries (O) {
        return $entries(O)
      }
    })
  }, { '../internals/export': 107, '../internals/object-to-array': 200 }],
  395: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var FREEZING = require('../internals/freezing')
    var fails = require('../internals/fails')
    var isObject = require('../internals/is-object')
    var onFreeze = require('../internals/internal-metadata').onFreeze

    // eslint-disable-next-line es/no-object-freeze -- safe
    var $freeze = Object.freeze
    var FAILS_ON_PRIMITIVES = fails(function () { $freeze(1) })

    // `Object.freeze` method
    // https://tc39.es/ecma262/#sec-object.freeze
    $({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !FREEZING }, {
      freeze: function freeze (it) {
        return $freeze && isObject(it) ? $freeze(onFreeze(it)) : it
      }
    })
  }, { '../internals/export': 107, '../internals/fails': 108, '../internals/freezing': 111, '../internals/internal-metadata': 142, '../internals/is-object': 153 }],
  396: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var iterate = require('../internals/iterate')
    var createProperty = require('../internals/create-property')

    // `Object.fromEntries` method
    // https://github.com/tc39/proposal-object-from-entries
    $({ target: 'Object', stat: true }, {
      fromEntries: function fromEntries (iterable) {
        var obj = {}
        iterate(iterable, function (k, v) {
          createProperty(obj, k, v)
        }, { AS_ENTRIES: true })
        return obj
      }
    })
  }, { '../internals/create-property': 77, '../internals/export': 107, '../internals/iterate': 159 }],
  397: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var fails = require('../internals/fails')
    var toIndexedObject = require('../internals/to-indexed-object')
    var nativeGetOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f
    var DESCRIPTORS = require('../internals/descriptors')

    var FORCED = !DESCRIPTORS || fails(function () { nativeGetOwnPropertyDescriptor(1) })

    // `Object.getOwnPropertyDescriptor` method
    // https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
    $({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
      getOwnPropertyDescriptor: function getOwnPropertyDescriptor (it, key) {
        return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key)
      }
    })
  }, { '../internals/descriptors': 85, '../internals/export': 107, '../internals/fails': 108, '../internals/object-get-own-property-descriptor': 188, '../internals/to-indexed-object': 260 }],
  398: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var DESCRIPTORS = require('../internals/descriptors')
    var ownKeys = require('../internals/own-keys')
    var toIndexedObject = require('../internals/to-indexed-object')
    var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor')
    var createProperty = require('../internals/create-property')

    // `Object.getOwnPropertyDescriptors` method
    // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
    $({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
      getOwnPropertyDescriptors: function getOwnPropertyDescriptors (object) {
        var O = toIndexedObject(object)
        var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f
        var keys = ownKeys(O)
        var result = {}
        var index = 0
        var key, descriptor
        while (keys.length > index) {
          descriptor = getOwnPropertyDescriptor(O, key = keys[index++])
          if (descriptor !== undefined) createProperty(result, key, descriptor)
        }
        return result
      }
    })
  }, { '../internals/create-property': 77, '../internals/descriptors': 85, '../internals/export': 107, '../internals/object-get-own-property-descriptor': 188, '../internals/own-keys': 203, '../internals/to-indexed-object': 260 }],
  399: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var fails = require('../internals/fails')
    var getOwnPropertyNames = require('../internals/object-get-own-property-names-external').f

    // eslint-disable-next-line es/no-object-getownpropertynames -- required for testing
    var FAILS_ON_PRIMITIVES = fails(function () { return !Object.getOwnPropertyNames(1) })

    // `Object.getOwnPropertyNames` method
    // https://tc39.es/ecma262/#sec-object.getownpropertynames
    $({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
      getOwnPropertyNames: getOwnPropertyNames
    })
  }, { '../internals/export': 107, '../internals/fails': 108, '../internals/object-get-own-property-names-external': 189 }],
  400: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var NATIVE_SYMBOL = require('../internals/symbol-constructor-detection')
    var fails = require('../internals/fails')
    var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols')
    var toObject = require('../internals/to-object')

    // V8 ~ Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
    // https://bugs.chromium.org/p/v8/issues/detail?id=3443
    var FORCED = !NATIVE_SYMBOL || fails(function () { getOwnPropertySymbolsModule.f(1) })

    // `Object.getOwnPropertySymbols` method
    // https://tc39.es/ecma262/#sec-object.getownpropertysymbols
    $({ target: 'Object', stat: true, forced: FORCED }, {
      getOwnPropertySymbols: function getOwnPropertySymbols (it) {
        var $getOwnPropertySymbols = getOwnPropertySymbolsModule.f
        return $getOwnPropertySymbols ? $getOwnPropertySymbols(toObject(it)) : []
      }
    })
  }, { '../internals/export': 107, '../internals/fails': 108, '../internals/object-get-own-property-symbols': 191, '../internals/symbol-constructor-detection': 252, '../internals/to-object': 263 }],
  401: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var fails = require('../internals/fails')
    var toObject = require('../internals/to-object')
    var nativeGetPrototypeOf = require('../internals/object-get-prototype-of')
    var CORRECT_PROTOTYPE_GETTER = require('../internals/correct-prototype-getter')

    var FAILS_ON_PRIMITIVES = fails(function () { nativeGetPrototypeOf(1) })

    // `Object.getPrototypeOf` method
    // https://tc39.es/ecma262/#sec-object.getprototypeof
    $({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !CORRECT_PROTOTYPE_GETTER }, {
      getPrototypeOf: function getPrototypeOf (it) {
        return nativeGetPrototypeOf(toObject(it))
      }
    })
  }, { '../internals/correct-prototype-getter': 72, '../internals/export': 107, '../internals/fails': 108, '../internals/object-get-prototype-of': 192, '../internals/to-object': 263 }],
  402: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var getBuiltIn = require('../internals/get-built-in')
    var uncurryThis = require('../internals/function-uncurry-this')
    var aCallable = require('../internals/a-callable')
    var requireObjectCoercible = require('../internals/require-object-coercible')
    var toPropertyKey = require('../internals/to-property-key')
    var iterate = require('../internals/iterate')
    var fails = require('../internals/fails')

    // eslint-disable-next-line es/no-object-groupby -- testing
    var nativeGroupBy = Object.groupBy
    var create = getBuiltIn('Object', 'create')
    var push = uncurryThis([].push)

    var DOES_NOT_WORK_WITH_PRIMITIVES = !nativeGroupBy || fails(function () {
      return nativeGroupBy('ab', function (it) {
        return it
      }).a.length !== 1
    })

    // `Object.groupBy` method
    // https://github.com/tc39/proposal-array-grouping
    $({ target: 'Object', stat: true, forced: DOES_NOT_WORK_WITH_PRIMITIVES }, {
      groupBy: function groupBy (items, callbackfn) {
        requireObjectCoercible(items)
        aCallable(callbackfn)
        var obj = create(null)
        var k = 0
        iterate(items, function (value) {
          var key = toPropertyKey(callbackfn(value, k++))
          // in some IE versions, `hasOwnProperty` returns incorrect result on integer keys
          // but since it's a `null` prototype object, we can safely use `in`
          if (key in obj) push(obj[key], value)
          else obj[key] = [value]
        })
        return obj
      }
    })
  }, { '../internals/a-callable': 23, '../internals/export': 107, '../internals/fails': 108, '../internals/function-uncurry-this': 120, '../internals/get-built-in': 123, '../internals/iterate': 159, '../internals/require-object-coercible': 219, '../internals/to-property-key': 267 }],
  403: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var hasOwn = require('../internals/has-own-property')

    // `Object.hasOwn` method
    // https://tc39.es/ecma262/#sec-object.hasown
    $({ target: 'Object', stat: true }, {
      hasOwn: hasOwn
    })
  }, { '../internals/export': 107, '../internals/has-own-property': 132 }],
  404: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var $isExtensible = require('../internals/object-is-extensible')

    // `Object.isExtensible` method
    // https://tc39.es/ecma262/#sec-object.isextensible
    // eslint-disable-next-line es/no-object-isextensible -- safe
    $({ target: 'Object', stat: true, forced: Object.isExtensible !== $isExtensible }, {
      isExtensible: $isExtensible
    })
  }, { '../internals/export': 107, '../internals/object-is-extensible': 193 }],
  405: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var fails = require('../internals/fails')
    var isObject = require('../internals/is-object')
    var classof = require('../internals/classof-raw')
    var ARRAY_BUFFER_NON_EXTENSIBLE = require('../internals/array-buffer-non-extensible')

    // eslint-disable-next-line es/no-object-isfrozen -- safe
    var $isFrozen = Object.isFrozen

    var FORCED = ARRAY_BUFFER_NON_EXTENSIBLE || fails(function () { $isFrozen(1) })

    // `Object.isFrozen` method
    // https://tc39.es/ecma262/#sec-object.isfrozen
    $({ target: 'Object', stat: true, forced: FORCED }, {
      isFrozen: function isFrozen (it) {
        if (!isObject(it)) return true
        if (ARRAY_BUFFER_NON_EXTENSIBLE && classof(it) === 'ArrayBuffer') return true
        return $isFrozen ? $isFrozen(it) : false
      }
    })
  }, { '../internals/array-buffer-non-extensible': 34, '../internals/classof-raw': 65, '../internals/export': 107, '../internals/fails': 108, '../internals/is-object': 153 }],
  406: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var fails = require('../internals/fails')
    var isObject = require('../internals/is-object')
    var classof = require('../internals/classof-raw')
    var ARRAY_BUFFER_NON_EXTENSIBLE = require('../internals/array-buffer-non-extensible')

    // eslint-disable-next-line es/no-object-issealed -- safe
    var $isSealed = Object.isSealed

    var FORCED = ARRAY_BUFFER_NON_EXTENSIBLE || fails(function () { $isSealed(1) })

    // `Object.isSealed` method
    // https://tc39.es/ecma262/#sec-object.issealed
    $({ target: 'Object', stat: true, forced: FORCED }, {
      isSealed: function isSealed (it) {
        if (!isObject(it)) return true
        if (ARRAY_BUFFER_NON_EXTENSIBLE && classof(it) === 'ArrayBuffer') return true
        return $isSealed ? $isSealed(it) : false
      }
    })
  }, { '../internals/array-buffer-non-extensible': 34, '../internals/classof-raw': 65, '../internals/export': 107, '../internals/fails': 108, '../internals/is-object': 153 }],
  407: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var is = require('../internals/same-value')

    // `Object.is` method
    // https://tc39.es/ecma262/#sec-object.is
    $({ target: 'Object', stat: true }, {
      is: is
    })
  }, { '../internals/export': 107, '../internals/same-value': 221 }],
  408: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var toObject = require('../internals/to-object')
    var nativeKeys = require('../internals/object-keys')
    var fails = require('../internals/fails')

    var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1) })

    // `Object.keys` method
    // https://tc39.es/ecma262/#sec-object.keys
    $({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
      keys: function keys (it) {
        return nativeKeys(toObject(it))
      }
    })
  }, { '../internals/export': 107, '../internals/fails': 108, '../internals/object-keys': 196, '../internals/to-object': 263 }],
  409: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var DESCRIPTORS = require('../internals/descriptors')
    var FORCED = require('../internals/object-prototype-accessors-forced')
    var toObject = require('../internals/to-object')
    var toPropertyKey = require('../internals/to-property-key')
    var getPrototypeOf = require('../internals/object-get-prototype-of')
    var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f

    // `Object.prototype.__lookupGetter__` method
    // https://tc39.es/ecma262/#sec-object.prototype.__lookupGetter__
    if (DESCRIPTORS) {
      $({ target: 'Object', proto: true, forced: FORCED }, {
        __lookupGetter__: function __lookupGetter__ (P) {
          var O = toObject(this)
          var key = toPropertyKey(P)
          var desc
          do {
            if (desc = getOwnPropertyDescriptor(O, key)) return desc.get
          } while (O = getPrototypeOf(O))
        }
      })
    }
  }, { '../internals/descriptors': 85, '../internals/export': 107, '../internals/object-get-own-property-descriptor': 188, '../internals/object-get-prototype-of': 192, '../internals/object-prototype-accessors-forced': 198, '../internals/to-object': 263, '../internals/to-property-key': 267 }],
  410: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var DESCRIPTORS = require('../internals/descriptors')
    var FORCED = require('../internals/object-prototype-accessors-forced')
    var toObject = require('../internals/to-object')
    var toPropertyKey = require('../internals/to-property-key')
    var getPrototypeOf = require('../internals/object-get-prototype-of')
    var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f

    // `Object.prototype.__lookupSetter__` method
    // https://tc39.es/ecma262/#sec-object.prototype.__lookupSetter__
    if (DESCRIPTORS) {
      $({ target: 'Object', proto: true, forced: FORCED }, {
        __lookupSetter__: function __lookupSetter__ (P) {
          var O = toObject(this)
          var key = toPropertyKey(P)
          var desc
          do {
            if (desc = getOwnPropertyDescriptor(O, key)) return desc.set
          } while (O = getPrototypeOf(O))
        }
      })
    }
  }, { '../internals/descriptors': 85, '../internals/export': 107, '../internals/object-get-own-property-descriptor': 188, '../internals/object-get-prototype-of': 192, '../internals/object-prototype-accessors-forced': 198, '../internals/to-object': 263, '../internals/to-property-key': 267 }],
  411: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var isObject = require('../internals/is-object')
    var onFreeze = require('../internals/internal-metadata').onFreeze
    var FREEZING = require('../internals/freezing')
    var fails = require('../internals/fails')

    // eslint-disable-next-line es/no-object-preventextensions -- safe
    var $preventExtensions = Object.preventExtensions
    var FAILS_ON_PRIMITIVES = fails(function () { $preventExtensions(1) })

    // `Object.preventExtensions` method
    // https://tc39.es/ecma262/#sec-object.preventextensions
    $({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !FREEZING }, {
      preventExtensions: function preventExtensions (it) {
        return $preventExtensions && isObject(it) ? $preventExtensions(onFreeze(it)) : it
      }
    })
  }, { '../internals/export': 107, '../internals/fails': 108, '../internals/freezing': 111, '../internals/internal-metadata': 142, '../internals/is-object': 153 }],
  412: [function (require, module, exports) {
    'use strict'
    var DESCRIPTORS = require('../internals/descriptors')
    var defineBuiltInAccessor = require('../internals/define-built-in-accessor')
    var isObject = require('../internals/is-object')
    var isPossiblePrototype = require('../internals/is-possible-prototype')
    var toObject = require('../internals/to-object')
    var requireObjectCoercible = require('../internals/require-object-coercible')

    // eslint-disable-next-line es/no-object-getprototypeof -- safe
    var getPrototypeOf = Object.getPrototypeOf
    // eslint-disable-next-line es/no-object-setprototypeof -- safe
    var setPrototypeOf = Object.setPrototypeOf
    var ObjectPrototype = Object.prototype
    var PROTO = '__proto__'

    // `Object.prototype.__proto__` accessor
    // https://tc39.es/ecma262/#sec-object.prototype.__proto__
    if (DESCRIPTORS && getPrototypeOf && setPrototypeOf && !(PROTO in ObjectPrototype)) {
      try {
        defineBuiltInAccessor(ObjectPrototype, PROTO, {
          configurable: true,
          get: function __proto__ () {
            return getPrototypeOf(toObject(this))
          },
          set: function __proto__ (proto) {
            var O = requireObjectCoercible(this)
            if (isPossiblePrototype(proto) && isObject(O)) {
              setPrototypeOf(O, proto)
            }
          }
        })
      } catch (error) { /* empty */ }
    }
  }, { '../internals/define-built-in-accessor': 80, '../internals/descriptors': 85, '../internals/is-object': 153, '../internals/is-possible-prototype': 154, '../internals/require-object-coercible': 219, '../internals/to-object': 263 }],
  413: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var isObject = require('../internals/is-object')
    var onFreeze = require('../internals/internal-metadata').onFreeze
    var FREEZING = require('../internals/freezing')
    var fails = require('../internals/fails')

    // eslint-disable-next-line es/no-object-seal -- safe
    var $seal = Object.seal
    var FAILS_ON_PRIMITIVES = fails(function () { $seal(1) })

    // `Object.seal` method
    // https://tc39.es/ecma262/#sec-object.seal
    $({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !FREEZING }, {
      seal: function seal (it) {
        return $seal && isObject(it) ? $seal(onFreeze(it)) : it
      }
    })
  }, { '../internals/export': 107, '../internals/fails': 108, '../internals/freezing': 111, '../internals/internal-metadata': 142, '../internals/is-object': 153 }],
  414: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var setPrototypeOf = require('../internals/object-set-prototype-of')

    // `Object.setPrototypeOf` method
    // https://tc39.es/ecma262/#sec-object.setprototypeof
    $({ target: 'Object', stat: true }, {
      setPrototypeOf: setPrototypeOf
    })
  }, { '../internals/export': 107, '../internals/object-set-prototype-of': 199 }],
  415: [function (require, module, exports) {
    'use strict'
    var TO_STRING_TAG_SUPPORT = require('../internals/to-string-tag-support')
    var defineBuiltIn = require('../internals/define-built-in')
    var toString = require('../internals/object-to-string')

    // `Object.prototype.toString` method
    // https://tc39.es/ecma262/#sec-object.prototype.tostring
    if (!TO_STRING_TAG_SUPPORT) {
      defineBuiltIn(Object.prototype, 'toString', toString, { unsafe: true })
    }
  }, { '../internals/define-built-in': 81, '../internals/object-to-string': 201, '../internals/to-string-tag-support': 268 }],
  416: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var $values = require('../internals/object-to-array').values

    // `Object.values` method
    // https://tc39.es/ecma262/#sec-object.values
    $({ target: 'Object', stat: true }, {
      values: function values (O) {
        return $values(O)
      }
    })
  }, { '../internals/export': 107, '../internals/object-to-array': 200 }],
  417: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var $parseFloat = require('../internals/number-parse-float')

    // `parseFloat` method
    // https://tc39.es/ecma262/#sec-parsefloat-string
    $({ global: true, forced: parseFloat !== $parseFloat }, {
      parseFloat: $parseFloat
    })
  }, { '../internals/export': 107, '../internals/number-parse-float': 182 }],
  418: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var $parseInt = require('../internals/number-parse-int')

    // `parseInt` method
    // https://tc39.es/ecma262/#sec-parseint-string-radix
    $({ global: true, forced: parseInt !== $parseInt }, {
      parseInt: $parseInt
    })
  }, { '../internals/export': 107, '../internals/number-parse-int': 183 }],
  419: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var call = require('../internals/function-call')
    var aCallable = require('../internals/a-callable')
    var newPromiseCapabilityModule = require('../internals/new-promise-capability')
    var perform = require('../internals/perform')
    var iterate = require('../internals/iterate')
    var PROMISE_STATICS_INCORRECT_ITERATION = require('../internals/promise-statics-incorrect-iteration')

    // `Promise.allSettled` method
    // https://tc39.es/ecma262/#sec-promise.allsettled
    $({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
      allSettled: function allSettled (iterable) {
        var C = this
        var capability = newPromiseCapabilityModule.f(C)
        var resolve = capability.resolve
        var reject = capability.reject
        var result = perform(function () {
          var promiseResolve = aCallable(C.resolve)
          var values = []
          var counter = 0
          var remaining = 1
          iterate(iterable, function (promise) {
            var index = counter++
            var alreadyCalled = false
            remaining++
            call(promiseResolve, C, promise).then(function (value) {
              if (alreadyCalled) return
              alreadyCalled = true
              values[index] = { status: 'fulfilled', value: value }
              --remaining || resolve(values)
            }, function (error) {
              if (alreadyCalled) return
              alreadyCalled = true
              values[index] = { status: 'rejected', reason: error }
              --remaining || resolve(values)
            })
          })
          --remaining || resolve(values)
        })
        if (result.error) reject(result.value)
        return capability.promise
      }
    })
  }, { '../internals/a-callable': 23, '../internals/export': 107, '../internals/function-call': 116, '../internals/iterate': 159, '../internals/new-promise-capability': 178, '../internals/perform': 205, '../internals/promise-statics-incorrect-iteration': 209 }],
  420: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var call = require('../internals/function-call')
    var aCallable = require('../internals/a-callable')
    var newPromiseCapabilityModule = require('../internals/new-promise-capability')
    var perform = require('../internals/perform')
    var iterate = require('../internals/iterate')
    var PROMISE_STATICS_INCORRECT_ITERATION = require('../internals/promise-statics-incorrect-iteration')

    // `Promise.all` method
    // https://tc39.es/ecma262/#sec-promise.all
    $({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
      all: function all (iterable) {
        var C = this
        var capability = newPromiseCapabilityModule.f(C)
        var resolve = capability.resolve
        var reject = capability.reject
        var result = perform(function () {
          var $promiseResolve = aCallable(C.resolve)
          var values = []
          var counter = 0
          var remaining = 1
          iterate(iterable, function (promise) {
            var index = counter++
            var alreadyCalled = false
            remaining++
            call($promiseResolve, C, promise).then(function (value) {
              if (alreadyCalled) return
              alreadyCalled = true
              values[index] = value
              --remaining || resolve(values)
            }, reject)
          })
          --remaining || resolve(values)
        })
        if (result.error) reject(result.value)
        return capability.promise
      }
    })
  }, { '../internals/a-callable': 23, '../internals/export': 107, '../internals/function-call': 116, '../internals/iterate': 159, '../internals/new-promise-capability': 178, '../internals/perform': 205, '../internals/promise-statics-incorrect-iteration': 209 }],
  421: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var call = require('../internals/function-call')
    var aCallable = require('../internals/a-callable')
    var getBuiltIn = require('../internals/get-built-in')
    var newPromiseCapabilityModule = require('../internals/new-promise-capability')
    var perform = require('../internals/perform')
    var iterate = require('../internals/iterate')
    var PROMISE_STATICS_INCORRECT_ITERATION = require('../internals/promise-statics-incorrect-iteration')

    var PROMISE_ANY_ERROR = 'No one promise resolved'

    // `Promise.any` method
    // https://tc39.es/ecma262/#sec-promise.any
    $({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
      any: function any (iterable) {
        var C = this
        var AggregateError = getBuiltIn('AggregateError')
        var capability = newPromiseCapabilityModule.f(C)
        var resolve = capability.resolve
        var reject = capability.reject
        var result = perform(function () {
          var promiseResolve = aCallable(C.resolve)
          var errors = []
          var counter = 0
          var remaining = 1
          var alreadyResolved = false
          iterate(iterable, function (promise) {
            var index = counter++
            var alreadyRejected = false
            remaining++
            call(promiseResolve, C, promise).then(function (value) {
              if (alreadyRejected || alreadyResolved) return
              alreadyResolved = true
              resolve(value)
            }, function (error) {
              if (alreadyRejected || alreadyResolved) return
              alreadyRejected = true
              errors[index] = error
              --remaining || reject(new AggregateError(errors, PROMISE_ANY_ERROR))
            })
          })
          --remaining || reject(new AggregateError(errors, PROMISE_ANY_ERROR))
        })
        if (result.error) reject(result.value)
        return capability.promise
      }
    })
  }, { '../internals/a-callable': 23, '../internals/export': 107, '../internals/function-call': 116, '../internals/get-built-in': 123, '../internals/iterate': 159, '../internals/new-promise-capability': 178, '../internals/perform': 205, '../internals/promise-statics-incorrect-iteration': 209 }],
  422: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var IS_PURE = require('../internals/is-pure')
    var FORCED_PROMISE_CONSTRUCTOR = require('../internals/promise-constructor-detection').CONSTRUCTOR
    var NativePromiseConstructor = require('../internals/promise-native-constructor')
    var getBuiltIn = require('../internals/get-built-in')
    var isCallable = require('../internals/is-callable')
    var defineBuiltIn = require('../internals/define-built-in')

    var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype

    // `Promise.prototype.catch` method
    // https://tc39.es/ecma262/#sec-promise.prototype.catch
    $({ target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR, real: true }, {
      catch: function (onRejected) {
        return this.then(undefined, onRejected)
      }
    })

    // makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
    if (!IS_PURE && isCallable(NativePromiseConstructor)) {
      var method = getBuiltIn('Promise').prototype.catch
      if (NativePromisePrototype.catch !== method) {
        defineBuiltIn(NativePromisePrototype, 'catch', method, { unsafe: true })
      }
    }
  }, { '../internals/define-built-in': 81, '../internals/export': 107, '../internals/get-built-in': 123, '../internals/is-callable': 147, '../internals/is-pure': 155, '../internals/promise-constructor-detection': 206, '../internals/promise-native-constructor': 207 }],
  423: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var IS_PURE = require('../internals/is-pure')
    var IS_NODE = require('../internals/environment-is-node')
    var globalThis = require('../internals/global-this')
    var call = require('../internals/function-call')
    var defineBuiltIn = require('../internals/define-built-in')
    var setPrototypeOf = require('../internals/object-set-prototype-of')
    var setToStringTag = require('../internals/set-to-string-tag')
    var setSpecies = require('../internals/set-species')
    var aCallable = require('../internals/a-callable')
    var isCallable = require('../internals/is-callable')
    var isObject = require('../internals/is-object')
    var anInstance = require('../internals/an-instance')
    var speciesConstructor = require('../internals/species-constructor')
    var task = require('../internals/task').set
    var microtask = require('../internals/microtask')
    var hostReportErrors = require('../internals/host-report-errors')
    var perform = require('../internals/perform')
    var Queue = require('../internals/queue')
    var InternalStateModule = require('../internals/internal-state')
    var NativePromiseConstructor = require('../internals/promise-native-constructor')
    var PromiseConstructorDetection = require('../internals/promise-constructor-detection')
    var newPromiseCapabilityModule = require('../internals/new-promise-capability')

    var PROMISE = 'Promise'
    var FORCED_PROMISE_CONSTRUCTOR = PromiseConstructorDetection.CONSTRUCTOR
    var NATIVE_PROMISE_REJECTION_EVENT = PromiseConstructorDetection.REJECTION_EVENT
    var NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING
    var getInternalPromiseState = InternalStateModule.getterFor(PROMISE)
    var setInternalState = InternalStateModule.set
    var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype
    var PromiseConstructor = NativePromiseConstructor
    var PromisePrototype = NativePromisePrototype
    var TypeError = globalThis.TypeError
    var document = globalThis.document
    var process = globalThis.process
    var newPromiseCapability = newPromiseCapabilityModule.f
    var newGenericPromiseCapability = newPromiseCapability

    var DISPATCH_EVENT = !!(document && document.createEvent && globalThis.dispatchEvent)
    var UNHANDLED_REJECTION = 'unhandledrejection'
    var REJECTION_HANDLED = 'rejectionhandled'
    var PENDING = 0
    var FULFILLED = 1
    var REJECTED = 2
    var HANDLED = 1
    var UNHANDLED = 2

    var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen

    // helpers
    var isThenable = function (it) {
      var then
      return isObject(it) && isCallable(then = it.then) ? then : false
    }

    var callReaction = function (reaction, state) {
      var value = state.value
      var ok = state.state === FULFILLED
      var handler = ok ? reaction.ok : reaction.fail
      var resolve = reaction.resolve
      var reject = reaction.reject
      var domain = reaction.domain
      var result, then, exited
      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(state)
            state.rejection = HANDLED
          }
          if (handler === true) result = value
          else {
            if (domain) domain.enter()
            result = handler(value) // can throw
            if (domain) {
              domain.exit()
              exited = true
            }
          }
          if (result === reaction.promise) {
            reject(new TypeError('Promise-chain cycle'))
          } else if (then = isThenable(result)) {
            call(then, result, resolve, reject)
          } else resolve(result)
        } else reject(value)
      } catch (error) {
        if (domain && !exited) domain.exit()
        reject(error)
      }
    }

    var notify = function (state, isReject) {
      if (state.notified) return
      state.notified = true
      microtask(function () {
        var reactions = state.reactions
        var reaction
        while (reaction = reactions.get()) {
          callReaction(reaction, state)
        }
        state.notified = false
        if (isReject && !state.rejection) onUnhandled(state)
      })
    }

    var dispatchEvent = function (name, promise, reason) {
      var event, handler
      if (DISPATCH_EVENT) {
        event = document.createEvent('Event')
        event.promise = promise
        event.reason = reason
        event.initEvent(name, false, true)
        globalThis.dispatchEvent(event)
      } else event = { promise: promise, reason: reason }
      if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = globalThis['on' + name])) handler(event)
      else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason)
    }

    var onUnhandled = function (state) {
      call(task, globalThis, function () {
        var promise = state.facade
        var value = state.value
        var IS_UNHANDLED = isUnhandled(state)
        var result
        if (IS_UNHANDLED) {
          result = perform(function () {
            if (IS_NODE) {
              process.emit('unhandledRejection', value, promise)
            } else dispatchEvent(UNHANDLED_REJECTION, promise, value)
          })
          // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
          state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED
          if (result.error) throw result.value
        }
      })
    }

    var isUnhandled = function (state) {
      return state.rejection !== HANDLED && !state.parent
    }

    var onHandleUnhandled = function (state) {
      call(task, globalThis, function () {
        var promise = state.facade
        if (IS_NODE) {
          process.emit('rejectionHandled', promise)
        } else dispatchEvent(REJECTION_HANDLED, promise, state.value)
      })
    }

    var bind = function (fn, state, unwrap) {
      return function (value) {
        fn(state, value, unwrap)
      }
    }

    var internalReject = function (state, value, unwrap) {
      if (state.done) return
      state.done = true
      if (unwrap) state = unwrap
      state.value = value
      state.state = REJECTED
      notify(state, true)
    }

    var internalResolve = function (state, value, unwrap) {
      if (state.done) return
      state.done = true
      if (unwrap) state = unwrap
      try {
        if (state.facade === value) throw new TypeError("Promise can't be resolved itself")
        var then = isThenable(value)
        if (then) {
          microtask(function () {
            var wrapper = { done: false }
            try {
              call(then, value,
                bind(internalResolve, wrapper, state),
                bind(internalReject, wrapper, state)
              )
            } catch (error) {
              internalReject(wrapper, error, state)
            }
          })
        } else {
          state.value = value
          state.state = FULFILLED
          notify(state, false)
        }
      } catch (error) {
        internalReject({ done: false }, error, state)
      }
    }

    // constructor polyfill
    if (FORCED_PROMISE_CONSTRUCTOR) {
      // 25.4.3.1 Promise(executor)
      PromiseConstructor = function Promise (executor) {
        anInstance(this, PromisePrototype)
        aCallable(executor)
        call(Internal, this)
        var state = getInternalPromiseState(this)
        try {
          executor(bind(internalResolve, state), bind(internalReject, state))
        } catch (error) {
          internalReject(state, error)
        }
      }

      PromisePrototype = PromiseConstructor.prototype

      // eslint-disable-next-line no-unused-vars -- required for `.length`
      Internal = function Promise (executor) {
        setInternalState(this, {
          type: PROMISE,
          done: false,
          notified: false,
          parent: false,
          reactions: new Queue(),
          rejection: false,
          state: PENDING,
          value: null
        })
      }

      // `Promise.prototype.then` method
      // https://tc39.es/ecma262/#sec-promise.prototype.then
      Internal.prototype = defineBuiltIn(PromisePrototype, 'then', function then (onFulfilled, onRejected) {
        var state = getInternalPromiseState(this)
        var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor))
        state.parent = true
        reaction.ok = isCallable(onFulfilled) ? onFulfilled : true
        reaction.fail = isCallable(onRejected) && onRejected
        reaction.domain = IS_NODE ? process.domain : undefined
        if (state.state === PENDING) state.reactions.add(reaction)
        else {
          microtask(function () {
            callReaction(reaction, state)
          })
        }
        return reaction.promise
      })

      OwnPromiseCapability = function () {
        var promise = new Internal()
        var state = getInternalPromiseState(promise)
        this.promise = promise
        this.resolve = bind(internalResolve, state)
        this.reject = bind(internalReject, state)
      }

      newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
        return C === PromiseConstructor || C === PromiseWrapper
          ? new OwnPromiseCapability(C)
          : newGenericPromiseCapability(C)
      }

      if (!IS_PURE && isCallable(NativePromiseConstructor) && NativePromisePrototype !== Object.prototype) {
        nativeThen = NativePromisePrototype.then

        if (!NATIVE_PROMISE_SUBCLASSING) {
          // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
          defineBuiltIn(NativePromisePrototype, 'then', function then (onFulfilled, onRejected) {
            var that = this
            return new PromiseConstructor(function (resolve, reject) {
              call(nativeThen, that, resolve, reject)
            }).then(onFulfilled, onRejected)
            // https://github.com/zloirock/core-js/issues/640
          }, { unsafe: true })
        }

        // make `.constructor === Promise` work for native promise-based APIs
        try {
          delete NativePromisePrototype.constructor
        } catch (error) { /* empty */ }

        // make `instanceof Promise` work for native promise-based APIs
        if (setPrototypeOf) {
          setPrototypeOf(NativePromisePrototype, PromisePrototype)
        }
      }
    }

    $({ global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
      Promise: PromiseConstructor
    })

    setToStringTag(PromiseConstructor, PROMISE, false, true)
    setSpecies(PROMISE)
  }, { '../internals/a-callable': 23, '../internals/an-instance': 29, '../internals/define-built-in': 81, '../internals/environment-is-node': 97, '../internals/export': 107, '../internals/function-call': 116, '../internals/global-this': 131, '../internals/host-report-errors': 134, '../internals/internal-state': 143, '../internals/is-callable': 147, '../internals/is-object': 153, '../internals/is-pure': 155, '../internals/microtask': 177, '../internals/new-promise-capability': 178, '../internals/object-set-prototype-of': 199, '../internals/perform': 205, '../internals/promise-constructor-detection': 206, '../internals/promise-native-constructor': 207, '../internals/queue': 211, '../internals/set-species': 233, '../internals/set-to-string-tag': 235, '../internals/species-constructor': 240, '../internals/task': 255 }],
  424: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var IS_PURE = require('../internals/is-pure')
    var NativePromiseConstructor = require('../internals/promise-native-constructor')
    var fails = require('../internals/fails')
    var getBuiltIn = require('../internals/get-built-in')
    var isCallable = require('../internals/is-callable')
    var speciesConstructor = require('../internals/species-constructor')
    var promiseResolve = require('../internals/promise-resolve')
    var defineBuiltIn = require('../internals/define-built-in')

    var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype

    // Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829
    var NON_GENERIC = !!NativePromiseConstructor && fails(function () {
      // eslint-disable-next-line unicorn/no-thenable -- required for testing
      NativePromisePrototype.finally.call({ then: function () { /* empty */ } }, function () { /* empty */ })
    })

    // `Promise.prototype.finally` method
    // https://tc39.es/ecma262/#sec-promise.prototype.finally
    $({ target: 'Promise', proto: true, real: true, forced: NON_GENERIC }, {
      finally: function (onFinally) {
        var C = speciesConstructor(this, getBuiltIn('Promise'))
        var isFunction = isCallable(onFinally)
        return this.then(
          isFunction ? function (x) {
            return promiseResolve(C, onFinally()).then(function () { return x })
          } : onFinally,
          isFunction ? function (e) {
            return promiseResolve(C, onFinally()).then(function () { throw e })
          } : onFinally
        )
      }
    })

    // makes sure that native promise-based APIs `Promise#finally` properly works with patched `Promise#then`
    if (!IS_PURE && isCallable(NativePromiseConstructor)) {
      var method = getBuiltIn('Promise').prototype.finally
      if (NativePromisePrototype.finally !== method) {
        defineBuiltIn(NativePromisePrototype, 'finally', method, { unsafe: true })
      }
    }
  }, { '../internals/define-built-in': 81, '../internals/export': 107, '../internals/fails': 108, '../internals/get-built-in': 123, '../internals/is-callable': 147, '../internals/is-pure': 155, '../internals/promise-native-constructor': 207, '../internals/promise-resolve': 208, '../internals/species-constructor': 240 }],
  425: [function (require, module, exports) {
    'use strict'
    // TODO: Remove this module from `core-js@4` since it's split to modules listed below
    require('../modules/es.promise.constructor')
    require('../modules/es.promise.all')
    require('../modules/es.promise.catch')
    require('../modules/es.promise.race')
    require('../modules/es.promise.reject')
    require('../modules/es.promise.resolve')
  }, { '../modules/es.promise.all': 420, '../modules/es.promise.catch': 422, '../modules/es.promise.constructor': 423, '../modules/es.promise.race': 426, '../modules/es.promise.reject': 427, '../modules/es.promise.resolve': 428 }],
  426: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var call = require('../internals/function-call')
    var aCallable = require('../internals/a-callable')
    var newPromiseCapabilityModule = require('../internals/new-promise-capability')
    var perform = require('../internals/perform')
    var iterate = require('../internals/iterate')
    var PROMISE_STATICS_INCORRECT_ITERATION = require('../internals/promise-statics-incorrect-iteration')

    // `Promise.race` method
    // https://tc39.es/ecma262/#sec-promise.race
    $({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
      race: function race (iterable) {
        var C = this
        var capability = newPromiseCapabilityModule.f(C)
        var reject = capability.reject
        var result = perform(function () {
          var $promiseResolve = aCallable(C.resolve)
          iterate(iterable, function (promise) {
            call($promiseResolve, C, promise).then(capability.resolve, reject)
          })
        })
        if (result.error) reject(result.value)
        return capability.promise
      }
    })
  }, { '../internals/a-callable': 23, '../internals/export': 107, '../internals/function-call': 116, '../internals/iterate': 159, '../internals/new-promise-capability': 178, '../internals/perform': 205, '../internals/promise-statics-incorrect-iteration': 209 }],
  427: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var newPromiseCapabilityModule = require('../internals/new-promise-capability')
    var FORCED_PROMISE_CONSTRUCTOR = require('../internals/promise-constructor-detection').CONSTRUCTOR

    // `Promise.reject` method
    // https://tc39.es/ecma262/#sec-promise.reject
    $({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
      reject: function reject (r) {
        var capability = newPromiseCapabilityModule.f(this)
        var capabilityReject = capability.reject
        capabilityReject(r)
        return capability.promise
      }
    })
  }, { '../internals/export': 107, '../internals/new-promise-capability': 178, '../internals/promise-constructor-detection': 206 }],
  428: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var getBuiltIn = require('../internals/get-built-in')
    var IS_PURE = require('../internals/is-pure')
    var NativePromiseConstructor = require('../internals/promise-native-constructor')
    var FORCED_PROMISE_CONSTRUCTOR = require('../internals/promise-constructor-detection').CONSTRUCTOR
    var promiseResolve = require('../internals/promise-resolve')

    var PromiseConstructorWrapper = getBuiltIn('Promise')
    var CHECK_WRAPPER = IS_PURE && !FORCED_PROMISE_CONSTRUCTOR

    // `Promise.resolve` method
    // https://tc39.es/ecma262/#sec-promise.resolve
    $({ target: 'Promise', stat: true, forced: IS_PURE || FORCED_PROMISE_CONSTRUCTOR }, {
      resolve: function resolve (x) {
        return promiseResolve(CHECK_WRAPPER && this === PromiseConstructorWrapper ? NativePromiseConstructor : this, x)
      }
    })
  }, { '../internals/export': 107, '../internals/get-built-in': 123, '../internals/is-pure': 155, '../internals/promise-constructor-detection': 206, '../internals/promise-native-constructor': 207, '../internals/promise-resolve': 208 }],
  429: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var newPromiseCapabilityModule = require('../internals/new-promise-capability')

    // `Promise.withResolvers` method
    // https://github.com/tc39/proposal-promise-with-resolvers
    $({ target: 'Promise', stat: true }, {
      withResolvers: function withResolvers () {
        var promiseCapability = newPromiseCapabilityModule.f(this)
        return {
          promise: promiseCapability.promise,
          resolve: promiseCapability.resolve,
          reject: promiseCapability.reject
        }
      }
    })
  }, { '../internals/export': 107, '../internals/new-promise-capability': 178 }],
  430: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var functionApply = require('../internals/function-apply')
    var aCallable = require('../internals/a-callable')
    var anObject = require('../internals/an-object')
    var fails = require('../internals/fails')

    // MS Edge argumentsList argument is optional
    var OPTIONAL_ARGUMENTS_LIST = !fails(function () {
      // eslint-disable-next-line es/no-reflect -- required for testing
      Reflect.apply(function () { /* empty */ })
    })

    // `Reflect.apply` method
    // https://tc39.es/ecma262/#sec-reflect.apply
    $({ target: 'Reflect', stat: true, forced: OPTIONAL_ARGUMENTS_LIST }, {
      apply: function apply (target, thisArgument, argumentsList) {
        return functionApply(aCallable(target), thisArgument, anObject(argumentsList))
      }
    })
  }, { '../internals/a-callable': 23, '../internals/an-object': 30, '../internals/export': 107, '../internals/fails': 108, '../internals/function-apply': 112 }],
  431: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var getBuiltIn = require('../internals/get-built-in')
    var apply = require('../internals/function-apply')
    var bind = require('../internals/function-bind')
    var aConstructor = require('../internals/a-constructor')
    var anObject = require('../internals/an-object')
    var isObject = require('../internals/is-object')
    var create = require('../internals/object-create')
    var fails = require('../internals/fails')

    var nativeConstruct = getBuiltIn('Reflect', 'construct')
    var ObjectPrototype = Object.prototype
    var push = [].push

    // `Reflect.construct` method
    // https://tc39.es/ecma262/#sec-reflect.construct
    // MS Edge supports only 2 arguments and argumentsList argument is optional
    // FF Nightly sets third argument as `new.target`, but does not create `this` from it
    var NEW_TARGET_BUG = fails(function () {
      function F () { /* empty */ }
      return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F)
    })

    var ARGS_BUG = !fails(function () {
      nativeConstruct(function () { /* empty */ })
    })

    var FORCED = NEW_TARGET_BUG || ARGS_BUG

    $({ target: 'Reflect', stat: true, forced: FORCED, sham: FORCED }, {
      construct: function construct (Target, args /* , newTarget */) {
        aConstructor(Target)
        anObject(args)
        var newTarget = arguments.length < 3 ? Target : aConstructor(arguments[2])
        if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget)
        if (Target === newTarget) {
          // w/o altered newTarget, optimization for 0-4 arguments
          switch (args.length) {
            case 0: return new Target()
            case 1: return new Target(args[0])
            case 2: return new Target(args[0], args[1])
            case 3: return new Target(args[0], args[1], args[2])
            case 4: return new Target(args[0], args[1], args[2], args[3])
          }
          // w/o altered newTarget, lot of arguments case
          var $args = [null]
          apply(push, $args, args)
          return new (apply(bind, Target, $args))()
        }
        // with altered newTarget, not support built-in constructors
        var proto = newTarget.prototype
        var instance = create(isObject(proto) ? proto : ObjectPrototype)
        var result = apply(Target, instance, args)
        return isObject(result) ? result : instance
      }
    })
  }, { '../internals/a-constructor': 24, '../internals/an-object': 30, '../internals/export': 107, '../internals/fails': 108, '../internals/function-apply': 112, '../internals/function-bind': 115, '../internals/get-built-in': 123, '../internals/is-object': 153, '../internals/object-create': 185 }],
  432: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var DESCRIPTORS = require('../internals/descriptors')
    var anObject = require('../internals/an-object')
    var toPropertyKey = require('../internals/to-property-key')
    var definePropertyModule = require('../internals/object-define-property')
    var fails = require('../internals/fails')

    // MS Edge has broken Reflect.defineProperty - throwing instead of returning false
    var ERROR_INSTEAD_OF_FALSE = fails(function () {
      // eslint-disable-next-line es/no-reflect -- required for testing
      Reflect.defineProperty(definePropertyModule.f({}, 1, { value: 1 }), 1, { value: 2 })
    })

    // `Reflect.defineProperty` method
    // https://tc39.es/ecma262/#sec-reflect.defineproperty
    $({ target: 'Reflect', stat: true, forced: ERROR_INSTEAD_OF_FALSE, sham: !DESCRIPTORS }, {
      defineProperty: function defineProperty (target, propertyKey, attributes) {
        anObject(target)
        var key = toPropertyKey(propertyKey)
        anObject(attributes)
        try {
          definePropertyModule.f(target, key, attributes)
          return true
        } catch (error) {
          return false
        }
      }
    })
  }, { '../internals/an-object': 30, '../internals/descriptors': 85, '../internals/export': 107, '../internals/fails': 108, '../internals/object-define-property': 187, '../internals/to-property-key': 267 }],
  433: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var anObject = require('../internals/an-object')
    var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f

    // `Reflect.deleteProperty` method
    // https://tc39.es/ecma262/#sec-reflect.deleteproperty
    $({ target: 'Reflect', stat: true }, {
      deleteProperty: function deleteProperty (target, propertyKey) {
        var descriptor = getOwnPropertyDescriptor(anObject(target), propertyKey)
        return descriptor && !descriptor.configurable ? false : delete target[propertyKey]
      }
    })
  }, { '../internals/an-object': 30, '../internals/export': 107, '../internals/object-get-own-property-descriptor': 188 }],
  434: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var DESCRIPTORS = require('../internals/descriptors')
    var anObject = require('../internals/an-object')
    var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor')

    // `Reflect.getOwnPropertyDescriptor` method
    // https://tc39.es/ecma262/#sec-reflect.getownpropertydescriptor
    $({ target: 'Reflect', stat: true, sham: !DESCRIPTORS }, {
      getOwnPropertyDescriptor: function getOwnPropertyDescriptor (target, propertyKey) {
        return getOwnPropertyDescriptorModule.f(anObject(target), propertyKey)
      }
    })
  }, { '../internals/an-object': 30, '../internals/descriptors': 85, '../internals/export': 107, '../internals/object-get-own-property-descriptor': 188 }],
  435: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var anObject = require('../internals/an-object')
    var objectGetPrototypeOf = require('../internals/object-get-prototype-of')
    var CORRECT_PROTOTYPE_GETTER = require('../internals/correct-prototype-getter')

    // `Reflect.getPrototypeOf` method
    // https://tc39.es/ecma262/#sec-reflect.getprototypeof
    $({ target: 'Reflect', stat: true, sham: !CORRECT_PROTOTYPE_GETTER }, {
      getPrototypeOf: function getPrototypeOf (target) {
        return objectGetPrototypeOf(anObject(target))
      }
    })
  }, { '../internals/an-object': 30, '../internals/correct-prototype-getter': 72, '../internals/export': 107, '../internals/object-get-prototype-of': 192 }],
  436: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var call = require('../internals/function-call')
    var isObject = require('../internals/is-object')
    var anObject = require('../internals/an-object')
    var isDataDescriptor = require('../internals/is-data-descriptor')
    var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor')
    var getPrototypeOf = require('../internals/object-get-prototype-of')

    // `Reflect.get` method
    // https://tc39.es/ecma262/#sec-reflect.get
    function get (target, propertyKey /* , receiver */) {
      var receiver = arguments.length < 3 ? target : arguments[2]
      var descriptor, prototype
      if (anObject(target) === receiver) return target[propertyKey]
      descriptor = getOwnPropertyDescriptorModule.f(target, propertyKey)
      if (descriptor) {
        return isDataDescriptor(descriptor)
          ? descriptor.value
          : descriptor.get === undefined ? undefined : call(descriptor.get, receiver)
      }
      if (isObject(prototype = getPrototypeOf(target))) return get(prototype, propertyKey, receiver)
    }

    $({ target: 'Reflect', stat: true }, {
      get: get
    })
  }, { '../internals/an-object': 30, '../internals/export': 107, '../internals/function-call': 116, '../internals/is-data-descriptor': 149, '../internals/is-object': 153, '../internals/object-get-own-property-descriptor': 188, '../internals/object-get-prototype-of': 192 }],
  437: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')

    // `Reflect.has` method
    // https://tc39.es/ecma262/#sec-reflect.has
    $({ target: 'Reflect', stat: true }, {
      has: function has (target, propertyKey) {
        return propertyKey in target
      }
    })
  }, { '../internals/export': 107 }],
  438: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var anObject = require('../internals/an-object')
    var $isExtensible = require('../internals/object-is-extensible')

    // `Reflect.isExtensible` method
    // https://tc39.es/ecma262/#sec-reflect.isextensible
    $({ target: 'Reflect', stat: true }, {
      isExtensible: function isExtensible (target) {
        anObject(target)
        return $isExtensible(target)
      }
    })
  }, { '../internals/an-object': 30, '../internals/export': 107, '../internals/object-is-extensible': 193 }],
  439: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var ownKeys = require('../internals/own-keys')

    // `Reflect.ownKeys` method
    // https://tc39.es/ecma262/#sec-reflect.ownkeys
    $({ target: 'Reflect', stat: true }, {
      ownKeys: ownKeys
    })
  }, { '../internals/export': 107, '../internals/own-keys': 203 }],
  440: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var getBuiltIn = require('../internals/get-built-in')
    var anObject = require('../internals/an-object')
    var FREEZING = require('../internals/freezing')

    // `Reflect.preventExtensions` method
    // https://tc39.es/ecma262/#sec-reflect.preventextensions
    $({ target: 'Reflect', stat: true, sham: !FREEZING }, {
      preventExtensions: function preventExtensions (target) {
        anObject(target)
        try {
          var objectPreventExtensions = getBuiltIn('Object', 'preventExtensions')
          if (objectPreventExtensions) objectPreventExtensions(target)
          return true
        } catch (error) {
          return false
        }
      }
    })
  }, { '../internals/an-object': 30, '../internals/export': 107, '../internals/freezing': 111, '../internals/get-built-in': 123 }],
  441: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var anObject = require('../internals/an-object')
    var aPossiblePrototype = require('../internals/a-possible-prototype')
    var objectSetPrototypeOf = require('../internals/object-set-prototype-of')

    // `Reflect.setPrototypeOf` method
    // https://tc39.es/ecma262/#sec-reflect.setprototypeof
    if (objectSetPrototypeOf) {
      $({ target: 'Reflect', stat: true }, {
        setPrototypeOf: function setPrototypeOf (target, proto) {
          anObject(target)
          aPossiblePrototype(proto)
          try {
            objectSetPrototypeOf(target, proto)
            return true
          } catch (error) {
            return false
          }
        }
      })
    }
  }, { '../internals/a-possible-prototype': 25, '../internals/an-object': 30, '../internals/export': 107, '../internals/object-set-prototype-of': 199 }],
  442: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var call = require('../internals/function-call')
    var anObject = require('../internals/an-object')
    var isObject = require('../internals/is-object')
    var isDataDescriptor = require('../internals/is-data-descriptor')
    var fails = require('../internals/fails')
    var definePropertyModule = require('../internals/object-define-property')
    var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor')
    var getPrototypeOf = require('../internals/object-get-prototype-of')
    var createPropertyDescriptor = require('../internals/create-property-descriptor')

    // `Reflect.set` method
    // https://tc39.es/ecma262/#sec-reflect.set
    function set (target, propertyKey, V /* , receiver */) {
      var receiver = arguments.length < 4 ? target : arguments[3]
      var ownDescriptor = getOwnPropertyDescriptorModule.f(anObject(target), propertyKey)
      var existingDescriptor, prototype, setter
      if (!ownDescriptor) {
        if (isObject(prototype = getPrototypeOf(target))) {
          return set(prototype, propertyKey, V, receiver)
        }
        ownDescriptor = createPropertyDescriptor(0)
      }
      if (isDataDescriptor(ownDescriptor)) {
        if (ownDescriptor.writable === false || !isObject(receiver)) return false
        if (existingDescriptor = getOwnPropertyDescriptorModule.f(receiver, propertyKey)) {
          if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false
          existingDescriptor.value = V
          definePropertyModule.f(receiver, propertyKey, existingDescriptor)
        } else definePropertyModule.f(receiver, propertyKey, createPropertyDescriptor(0, V))
      } else {
        setter = ownDescriptor.set
        if (setter === undefined) return false
        call(setter, receiver, V)
      } return true
    }

    // MS Edge 17-18 Reflect.set allows setting the property to object
    // with non-writable property on the prototype
    var MS_EDGE_BUG = fails(function () {
      var Constructor = function () { /* empty */ }
      var object = definePropertyModule.f(new Constructor(), 'a', { configurable: true })
      // eslint-disable-next-line es/no-reflect -- required for testing
      return Reflect.set(Constructor.prototype, 'a', 1, object) !== false
    })

    $({ target: 'Reflect', stat: true, forced: MS_EDGE_BUG }, {
      set: set
    })
  }, { '../internals/an-object': 30, '../internals/create-property-descriptor': 76, '../internals/export': 107, '../internals/fails': 108, '../internals/function-call': 116, '../internals/is-data-descriptor': 149, '../internals/is-object': 153, '../internals/object-define-property': 187, '../internals/object-get-own-property-descriptor': 188, '../internals/object-get-prototype-of': 192 }],
  443: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var globalThis = require('../internals/global-this')
    var setToStringTag = require('../internals/set-to-string-tag')

    $({ global: true }, { Reflect: {} })

    // Reflect[@@toStringTag] property
    // https://tc39.es/ecma262/#sec-reflect-@@tostringtag
    setToStringTag(globalThis.Reflect, 'Reflect', true)
  }, { '../internals/export': 107, '../internals/global-this': 131, '../internals/set-to-string-tag': 235 }],
  444: [function (require, module, exports) {
    'use strict'
    var DESCRIPTORS = require('../internals/descriptors')
    var globalThis = require('../internals/global-this')
    var uncurryThis = require('../internals/function-uncurry-this')
    var isForced = require('../internals/is-forced')
    var inheritIfRequired = require('../internals/inherit-if-required')
    var createNonEnumerableProperty = require('../internals/create-non-enumerable-property')
    var create = require('../internals/object-create')
    var getOwnPropertyNames = require('../internals/object-get-own-property-names').f
    var isPrototypeOf = require('../internals/object-is-prototype-of')
    var isRegExp = require('../internals/is-regexp')
    var toString = require('../internals/to-string')
    var getRegExpFlags = require('../internals/regexp-get-flags')
    var stickyHelpers = require('../internals/regexp-sticky-helpers')
    var proxyAccessor = require('../internals/proxy-accessor')
    var defineBuiltIn = require('../internals/define-built-in')
    var fails = require('../internals/fails')
    var hasOwn = require('../internals/has-own-property')
    var enforceInternalState = require('../internals/internal-state').enforce
    var setSpecies = require('../internals/set-species')
    var wellKnownSymbol = require('../internals/well-known-symbol')
    var UNSUPPORTED_DOT_ALL = require('../internals/regexp-unsupported-dot-all')
    var UNSUPPORTED_NCG = require('../internals/regexp-unsupported-ncg')

    var MATCH = wellKnownSymbol('match')
    var NativeRegExp = globalThis.RegExp
    var RegExpPrototype = NativeRegExp.prototype
    var SyntaxError = globalThis.SyntaxError
    var exec = uncurryThis(RegExpPrototype.exec)
    var charAt = uncurryThis(''.charAt)
    var replace = uncurryThis(''.replace)
    var stringIndexOf = uncurryThis(''.indexOf)
    var stringSlice = uncurryThis(''.slice)
    // TODO: Use only proper RegExpIdentifierName
    var IS_NCG = /^\?<[^\s\d!#%&*+<=>@^][^\s!#%&*+<=>@^]*>/
    var re1 = /a/g
    var re2 = /a/g

    // "new" should create a new object, old webkit bug
    var CORRECT_NEW = new NativeRegExp(re1) !== re1

    var MISSED_STICKY = stickyHelpers.MISSED_STICKY
    var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y

    var BASE_FORCED = DESCRIPTORS &&
  (!CORRECT_NEW || MISSED_STICKY || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG || fails(function () {
    re2[MATCH] = false
    // RegExp constructor can alter flags and IsRegExp works correct with @@match
    // eslint-disable-next-line sonar/inconsistent-function-call -- required for testing
    return NativeRegExp(re1) !== re1 || NativeRegExp(re2) === re2 || String(NativeRegExp(re1, 'i')) !== '/a/i'
  }))

    var handleDotAll = function (string) {
      var length = string.length
      var index = 0
      var result = ''
      var brackets = false
      var chr
      for (; index <= length; index++) {
        chr = charAt(string, index)
        if (chr === '\\') {
          result += chr + charAt(string, ++index)
          continue
        }
        if (!brackets && chr === '.') {
          result += '[\\s\\S]'
        } else {
          if (chr === '[') {
            brackets = true
          } else if (chr === ']') {
            brackets = false
          } result += chr
        }
      } return result
    }

    var handleNCG = function (string) {
      var length = string.length
      var index = 0
      var result = ''
      var named = []
      var names = create(null)
      var brackets = false
      var ncg = false
      var groupid = 0
      var groupname = ''
      var chr
      for (; index <= length; index++) {
        chr = charAt(string, index)
        if (chr === '\\') {
          chr += charAt(string, ++index)
        } else if (chr === ']') {
          brackets = false
        } else if (!brackets) {
          switch (true) {
            case chr === '[':
              brackets = true
              break
            case chr === '(':
              result += chr
              // ignore non-capturing groups
              if (stringSlice(string, index + 1, index + 3) === '?:') {
                continue
              }
              if (exec(IS_NCG, stringSlice(string, index + 1))) {
                index += 2
                ncg = true
              }
              groupid++
              continue
            case chr === '>' && ncg:
              if (groupname === '' || hasOwn(names, groupname)) {
                throw new SyntaxError('Invalid capture group name')
              }
              names[groupname] = true
              named[named.length] = [groupname, groupid]
              ncg = false
              groupname = ''
              continue
          }
        }
        if (ncg) groupname += chr
        else result += chr
      } return [result, named]
    }

    // `RegExp` constructor
    // https://tc39.es/ecma262/#sec-regexp-constructor
    if (isForced('RegExp', BASE_FORCED)) {
      var RegExpWrapper = function RegExp (pattern, flags) {
        var thisIsRegExp = isPrototypeOf(RegExpPrototype, this)
        var patternIsRegExp = isRegExp(pattern)
        var flagsAreUndefined = flags === undefined
        var groups = []
        var rawPattern = pattern
        var rawFlags, dotAll, sticky, handled, result, state

        if (!thisIsRegExp && patternIsRegExp && flagsAreUndefined && pattern.constructor === RegExpWrapper) {
          return pattern
        }

        if (patternIsRegExp || isPrototypeOf(RegExpPrototype, pattern)) {
          pattern = pattern.source
          if (flagsAreUndefined) flags = getRegExpFlags(rawPattern)
        }

        pattern = pattern === undefined ? '' : toString(pattern)
        flags = flags === undefined ? '' : toString(flags)
        rawPattern = pattern

        if (UNSUPPORTED_DOT_ALL && 'dotAll' in re1) {
          dotAll = !!flags && stringIndexOf(flags, 's') > -1
          if (dotAll) flags = replace(flags, /s/g, '')
        }

        rawFlags = flags

        if (MISSED_STICKY && 'sticky' in re1) {
          sticky = !!flags && stringIndexOf(flags, 'y') > -1
          if (sticky && UNSUPPORTED_Y) flags = replace(flags, /y/g, '')
        }

        if (UNSUPPORTED_NCG) {
          handled = handleNCG(pattern)
          pattern = handled[0]
          groups = handled[1]
        }

        result = inheritIfRequired(NativeRegExp(pattern, flags), thisIsRegExp ? this : RegExpPrototype, RegExpWrapper)

        if (dotAll || sticky || groups.length) {
          state = enforceInternalState(result)
          if (dotAll) {
            state.dotAll = true
            state.raw = RegExpWrapper(handleDotAll(pattern), rawFlags)
          }
          if (sticky) state.sticky = true
          if (groups.length) state.groups = groups
        }

        if (pattern !== rawPattern) {
          try {
          // fails in old engines, but we have no alternatives for unsupported regex syntax
            createNonEnumerableProperty(result, 'source', rawPattern === '' ? '(?:)' : rawPattern)
          } catch (error) { /* empty */ }
        }

        return result
      }

      for (var keys = getOwnPropertyNames(NativeRegExp), index = 0; keys.length > index;) {
        proxyAccessor(RegExpWrapper, NativeRegExp, keys[index++])
      }

      RegExpPrototype.constructor = RegExpWrapper
      RegExpWrapper.prototype = RegExpPrototype
      defineBuiltIn(globalThis, 'RegExp', RegExpWrapper, { constructor: true })
    }

    // https://tc39.es/ecma262/#sec-get-regexp-@@species
    setSpecies('RegExp')
  }, { '../internals/create-non-enumerable-property': 75, '../internals/define-built-in': 81, '../internals/descriptors': 85, '../internals/fails': 108, '../internals/function-uncurry-this': 120, '../internals/global-this': 131, '../internals/has-own-property': 132, '../internals/inherit-if-required': 139, '../internals/internal-state': 143, '../internals/is-forced': 150, '../internals/is-regexp': 156, '../internals/object-create': 185, '../internals/object-get-own-property-names': 190, '../internals/object-is-prototype-of': 194, '../internals/proxy-accessor': 210, '../internals/regexp-get-flags': 215, '../internals/regexp-sticky-helpers': 216, '../internals/regexp-unsupported-dot-all': 217, '../internals/regexp-unsupported-ncg': 218, '../internals/set-species': 233, '../internals/to-string': 269, '../internals/well-known-symbol': 285 }],
  445: [function (require, module, exports) {
    'use strict'
    var DESCRIPTORS = require('../internals/descriptors')
    var UNSUPPORTED_DOT_ALL = require('../internals/regexp-unsupported-dot-all')
    var classof = require('../internals/classof-raw')
    var defineBuiltInAccessor = require('../internals/define-built-in-accessor')
    var getInternalState = require('../internals/internal-state').get

    var RegExpPrototype = RegExp.prototype
    var $TypeError = TypeError

    // `RegExp.prototype.dotAll` getter
    // https://tc39.es/ecma262/#sec-get-regexp.prototype.dotall
    if (DESCRIPTORS && UNSUPPORTED_DOT_ALL) {
      defineBuiltInAccessor(RegExpPrototype, 'dotAll', {
        configurable: true,
        get: function dotAll () {
          if (this === RegExpPrototype) return
          // We can't use InternalStateModule.getterFor because
          // we don't add metadata for regexps created by a literal.
          if (classof(this) === 'RegExp') {
            return !!getInternalState(this).dotAll
          }
          throw new $TypeError('Incompatible receiver, RegExp required')
        }
      })
    }
  }, { '../internals/classof-raw': 65, '../internals/define-built-in-accessor': 80, '../internals/descriptors': 85, '../internals/internal-state': 143, '../internals/regexp-unsupported-dot-all': 217 }],
  446: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var exec = require('../internals/regexp-exec')

    // `RegExp.prototype.exec` method
    // https://tc39.es/ecma262/#sec-regexp.prototype.exec
    $({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
      exec: exec
    })
  }, { '../internals/export': 107, '../internals/regexp-exec': 213 }],
  447: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')
    var DESCRIPTORS = require('../internals/descriptors')
    var defineBuiltInAccessor = require('../internals/define-built-in-accessor')
    var regExpFlags = require('../internals/regexp-flags')
    var fails = require('../internals/fails')

    // babel-minify and Closure Compiler transpiles RegExp('.', 'd') -> /./d and it causes SyntaxError
    var RegExp = globalThis.RegExp
    var RegExpPrototype = RegExp.prototype

    var FORCED = DESCRIPTORS && fails(function () {
      var INDICES_SUPPORT = true
      try {
        RegExp('.', 'd')
      } catch (error) {
        INDICES_SUPPORT = false
      }

      var O = {}
      // modern V8 bug
      var calls = ''
      var expected = INDICES_SUPPORT ? 'dgimsy' : 'gimsy'

      var addGetter = function (key, chr) {
        // eslint-disable-next-line es/no-object-defineproperty -- safe
        Object.defineProperty(O, key, {
          get: function () {
            calls += chr
            return true
          }
        })
      }

      var pairs = {
        dotAll: 's',
        global: 'g',
        ignoreCase: 'i',
        multiline: 'm',
        sticky: 'y'
      }

      if (INDICES_SUPPORT) pairs.hasIndices = 'd'

      for (var key in pairs) addGetter(key, pairs[key])

      // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
      var result = Object.getOwnPropertyDescriptor(RegExpPrototype, 'flags').get.call(O)

      return result !== expected || calls !== expected
    })

    // `RegExp.prototype.flags` getter
    // https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
    if (FORCED) {
      defineBuiltInAccessor(RegExpPrototype, 'flags', {
        configurable: true,
        get: regExpFlags
      })
    }
  }, { '../internals/define-built-in-accessor': 80, '../internals/descriptors': 85, '../internals/fails': 108, '../internals/global-this': 131, '../internals/regexp-flags': 214 }],
  448: [function (require, module, exports) {
    'use strict'
    var DESCRIPTORS = require('../internals/descriptors')
    var MISSED_STICKY = require('../internals/regexp-sticky-helpers').MISSED_STICKY
    var classof = require('../internals/classof-raw')
    var defineBuiltInAccessor = require('../internals/define-built-in-accessor')
    var getInternalState = require('../internals/internal-state').get

    var RegExpPrototype = RegExp.prototype
    var $TypeError = TypeError

    // `RegExp.prototype.sticky` getter
    // https://tc39.es/ecma262/#sec-get-regexp.prototype.sticky
    if (DESCRIPTORS && MISSED_STICKY) {
      defineBuiltInAccessor(RegExpPrototype, 'sticky', {
        configurable: true,
        get: function sticky () {
          if (this === RegExpPrototype) return
          // We can't use InternalStateModule.getterFor because
          // we don't add metadata for regexps created by a literal.
          if (classof(this) === 'RegExp') {
            return !!getInternalState(this).sticky
          }
          throw new $TypeError('Incompatible receiver, RegExp required')
        }
      })
    }
  }, { '../internals/classof-raw': 65, '../internals/define-built-in-accessor': 80, '../internals/descriptors': 85, '../internals/internal-state': 143, '../internals/regexp-sticky-helpers': 216 }],
  449: [function (require, module, exports) {
    'use strict'
    // TODO: Remove from `core-js@4` since it's moved to entry points
    require('../modules/es.regexp.exec')
    var $ = require('../internals/export')
    var call = require('../internals/function-call')
    var isCallable = require('../internals/is-callable')
    var anObject = require('../internals/an-object')
    var toString = require('../internals/to-string')

    var DELEGATES_TO_EXEC = (function () {
      var execCalled = false
      var re = /[ac]/
      re.exec = function () {
        execCalled = true
        return /./.exec.apply(this, arguments)
      }
      return re.test('abc') === true && execCalled
    }())

    var nativeTest = /./.test

    // `RegExp.prototype.test` method
    // https://tc39.es/ecma262/#sec-regexp.prototype.test
    $({ target: 'RegExp', proto: true, forced: !DELEGATES_TO_EXEC }, {
      test: function (S) {
        var R = anObject(this)
        var string = toString(S)
        var exec = R.exec
        if (!isCallable(exec)) return call(nativeTest, R, string)
        var result = call(exec, R, string)
        if (result === null) return false
        anObject(result)
        return true
      }
    })
  }, { '../internals/an-object': 30, '../internals/export': 107, '../internals/function-call': 116, '../internals/is-callable': 147, '../internals/to-string': 269, '../modules/es.regexp.exec': 446 }],
  450: [function (require, module, exports) {
    'use strict'
    var PROPER_FUNCTION_NAME = require('../internals/function-name').PROPER
    var defineBuiltIn = require('../internals/define-built-in')
    var anObject = require('../internals/an-object')
    var $toString = require('../internals/to-string')
    var fails = require('../internals/fails')
    var getRegExpFlags = require('../internals/regexp-get-flags')

    var TO_STRING = 'toString'
    var RegExpPrototype = RegExp.prototype
    var nativeToString = RegExpPrototype[TO_STRING]

    var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) !== '/a/b' })
    // FF44- RegExp#toString has a wrong name
    var INCORRECT_NAME = PROPER_FUNCTION_NAME && nativeToString.name !== TO_STRING

    // `RegExp.prototype.toString` method
    // https://tc39.es/ecma262/#sec-regexp.prototype.tostring
    if (NOT_GENERIC || INCORRECT_NAME) {
      defineBuiltIn(RegExpPrototype, TO_STRING, function toString () {
        var R = anObject(this)
        var pattern = $toString(R.source)
        var flags = $toString(getRegExpFlags(R))
        return '/' + pattern + '/' + flags
      }, { unsafe: true })
    }
  }, { '../internals/an-object': 30, '../internals/define-built-in': 81, '../internals/fails': 108, '../internals/function-name': 117, '../internals/regexp-get-flags': 215, '../internals/to-string': 269 }],
  451: [function (require, module, exports) {
    'use strict'
    var collection = require('../internals/collection')
    var collectionStrong = require('../internals/collection-strong')

    // `Set` constructor
    // https://tc39.es/ecma262/#sec-set-objects
    collection('Set', function (init) {
      return function Set () { return init(this, arguments.length ? arguments[0] : undefined) }
    }, collectionStrong)
  }, { '../internals/collection': 69, '../internals/collection-strong': 67 }],
  452: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var difference = require('../internals/set-difference')
    var setMethodAcceptSetLike = require('../internals/set-method-accept-set-like')

    // `Set.prototype.difference` method
    // https://github.com/tc39/proposal-set-methods
    $({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike('difference') }, {
      difference: difference
    })
  }, { '../internals/export': 107, '../internals/set-difference': 224, '../internals/set-method-accept-set-like': 231 }],
  453: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var fails = require('../internals/fails')
    var intersection = require('../internals/set-intersection')
    var setMethodAcceptSetLike = require('../internals/set-method-accept-set-like')

    var INCORRECT = !setMethodAcceptSetLike('intersection') || fails(function () {
      // eslint-disable-next-line es/no-array-from, es/no-set -- testing
      return String(Array.from(new Set([1, 2, 3]).intersection(new Set([3, 2])))) !== '3,2'
    })

    // `Set.prototype.intersection` method
    // https://github.com/tc39/proposal-set-methods
    $({ target: 'Set', proto: true, real: true, forced: INCORRECT }, {
      intersection: intersection
    })
  }, { '../internals/export': 107, '../internals/fails': 108, '../internals/set-intersection': 226, '../internals/set-method-accept-set-like': 231 }],
  454: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var isDisjointFrom = require('../internals/set-is-disjoint-from')
    var setMethodAcceptSetLike = require('../internals/set-method-accept-set-like')

    // `Set.prototype.isDisjointFrom` method
    // https://github.com/tc39/proposal-set-methods
    $({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike('isDisjointFrom') }, {
      isDisjointFrom: isDisjointFrom
    })
  }, { '../internals/export': 107, '../internals/set-is-disjoint-from': 227, '../internals/set-method-accept-set-like': 231 }],
  455: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var isSubsetOf = require('../internals/set-is-subset-of')
    var setMethodAcceptSetLike = require('../internals/set-method-accept-set-like')

    // `Set.prototype.isSubsetOf` method
    // https://github.com/tc39/proposal-set-methods
    $({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike('isSubsetOf') }, {
      isSubsetOf: isSubsetOf
    })
  }, { '../internals/export': 107, '../internals/set-is-subset-of': 228, '../internals/set-method-accept-set-like': 231 }],
  456: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var isSupersetOf = require('../internals/set-is-superset-of')
    var setMethodAcceptSetLike = require('../internals/set-method-accept-set-like')

    // `Set.prototype.isSupersetOf` method
    // https://github.com/tc39/proposal-set-methods
    $({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike('isSupersetOf') }, {
      isSupersetOf: isSupersetOf
    })
  }, { '../internals/export': 107, '../internals/set-is-superset-of': 229, '../internals/set-method-accept-set-like': 231 }],
  457: [function (require, module, exports) {
    'use strict'
    // TODO: Remove this module from `core-js@4` since it's replaced to module below
    require('../modules/es.set.constructor')
  }, { '../modules/es.set.constructor': 451 }],
  458: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var symmetricDifference = require('../internals/set-symmetric-difference')
    var setMethodAcceptSetLike = require('../internals/set-method-accept-set-like')

    // `Set.prototype.symmetricDifference` method
    // https://github.com/tc39/proposal-set-methods
    $({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike('symmetricDifference') }, {
      symmetricDifference: symmetricDifference
    })
  }, { '../internals/export': 107, '../internals/set-method-accept-set-like': 231, '../internals/set-symmetric-difference': 234 }],
  459: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var union = require('../internals/set-union')
    var setMethodAcceptSetLike = require('../internals/set-method-accept-set-like')

    // `Set.prototype.union` method
    // https://github.com/tc39/proposal-set-methods
    $({ target: 'Set', proto: true, real: true, forced: !setMethodAcceptSetLike('union') }, {
      union: union
    })
  }, { '../internals/export': 107, '../internals/set-method-accept-set-like': 231, '../internals/set-union': 236 }],
  460: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var createHTML = require('../internals/create-html')
    var forcedStringHTMLMethod = require('../internals/string-html-forced')

    // `String.prototype.anchor` method
    // https://tc39.es/ecma262/#sec-string.prototype.anchor
    $({ target: 'String', proto: true, forced: forcedStringHTMLMethod('anchor') }, {
      anchor: function anchor (name) {
        return createHTML(this, 'a', 'name', name)
      }
    })
  }, { '../internals/create-html': 73, '../internals/export': 107, '../internals/string-html-forced': 241 }],
  461: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var uncurryThis = require('../internals/function-uncurry-this')
    var requireObjectCoercible = require('../internals/require-object-coercible')
    var toIntegerOrInfinity = require('../internals/to-integer-or-infinity')
    var toString = require('../internals/to-string')
    var fails = require('../internals/fails')

    var charAt = uncurryThis(''.charAt)

    var FORCED = fails(function () {
      // eslint-disable-next-line es/no-string-prototype-at -- safe
      return '𠮷'.at(-2) !== '\uD842'
    })

    // `String.prototype.at` method
    // https://tc39.es/ecma262/#sec-string.prototype.at
    $({ target: 'String', proto: true, forced: FORCED }, {
      at: function at (index) {
        var S = toString(requireObjectCoercible(this))
        var len = S.length
        var relativeIndex = toIntegerOrInfinity(index)
        var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex
        return (k < 0 || k >= len) ? undefined : charAt(S, k)
      }
    })
  }, { '../internals/export': 107, '../internals/fails': 108, '../internals/function-uncurry-this': 120, '../internals/require-object-coercible': 219, '../internals/to-integer-or-infinity': 261, '../internals/to-string': 269 }],
  462: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var createHTML = require('../internals/create-html')
    var forcedStringHTMLMethod = require('../internals/string-html-forced')

    // `String.prototype.big` method
    // https://tc39.es/ecma262/#sec-string.prototype.big
    $({ target: 'String', proto: true, forced: forcedStringHTMLMethod('big') }, {
      big: function big () {
        return createHTML(this, 'big', '', '')
      }
    })
  }, { '../internals/create-html': 73, '../internals/export': 107, '../internals/string-html-forced': 241 }],
  463: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var createHTML = require('../internals/create-html')
    var forcedStringHTMLMethod = require('../internals/string-html-forced')

    // `String.prototype.blink` method
    // https://tc39.es/ecma262/#sec-string.prototype.blink
    $({ target: 'String', proto: true, forced: forcedStringHTMLMethod('blink') }, {
      blink: function blink () {
        return createHTML(this, 'blink', '', '')
      }
    })
  }, { '../internals/create-html': 73, '../internals/export': 107, '../internals/string-html-forced': 241 }],
  464: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var createHTML = require('../internals/create-html')
    var forcedStringHTMLMethod = require('../internals/string-html-forced')

    // `String.prototype.bold` method
    // https://tc39.es/ecma262/#sec-string.prototype.bold
    $({ target: 'String', proto: true, forced: forcedStringHTMLMethod('bold') }, {
      bold: function bold () {
        return createHTML(this, 'b', '', '')
      }
    })
  }, { '../internals/create-html': 73, '../internals/export': 107, '../internals/string-html-forced': 241 }],
  465: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var codeAt = require('../internals/string-multibyte').codeAt

    // `String.prototype.codePointAt` method
    // https://tc39.es/ecma262/#sec-string.prototype.codepointat
    $({ target: 'String', proto: true }, {
      codePointAt: function codePointAt (pos) {
        return codeAt(this, pos)
      }
    })
  }, { '../internals/export': 107, '../internals/string-multibyte': 242 }],
  466: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var uncurryThis = require('../internals/function-uncurry-this-clause')
    var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f
    var toLength = require('../internals/to-length')
    var toString = require('../internals/to-string')
    var notARegExp = require('../internals/not-a-regexp')
    var requireObjectCoercible = require('../internals/require-object-coercible')
    var correctIsRegExpLogic = require('../internals/correct-is-regexp-logic')
    var IS_PURE = require('../internals/is-pure')

    var slice = uncurryThis(''.slice)
    var min = Math.min

    var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('endsWith')
    // https://github.com/zloirock/core-js/pull/702
    var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!(function () {
      var descriptor = getOwnPropertyDescriptor(String.prototype, 'endsWith')
      return descriptor && !descriptor.writable
    }())

    // `String.prototype.endsWith` method
    // https://tc39.es/ecma262/#sec-string.prototype.endswith
    $({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
      endsWith: function endsWith (searchString /* , endPosition = @length */) {
        var that = toString(requireObjectCoercible(this))
        notARegExp(searchString)
        var endPosition = arguments.length > 1 ? arguments[1] : undefined
        var len = that.length
        var end = endPosition === undefined ? len : min(toLength(endPosition), len)
        var search = toString(searchString)
        return slice(that, end - search.length, end) === search
      }
    })
  }, { '../internals/correct-is-regexp-logic': 71, '../internals/export': 107, '../internals/function-uncurry-this-clause': 119, '../internals/is-pure': 155, '../internals/not-a-regexp': 180, '../internals/object-get-own-property-descriptor': 188, '../internals/require-object-coercible': 219, '../internals/to-length': 262, '../internals/to-string': 269 }],
  467: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var createHTML = require('../internals/create-html')
    var forcedStringHTMLMethod = require('../internals/string-html-forced')

    // `String.prototype.fixed` method
    // https://tc39.es/ecma262/#sec-string.prototype.fixed
    $({ target: 'String', proto: true, forced: forcedStringHTMLMethod('fixed') }, {
      fixed: function fixed () {
        return createHTML(this, 'tt', '', '')
      }
    })
  }, { '../internals/create-html': 73, '../internals/export': 107, '../internals/string-html-forced': 241 }],
  468: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var createHTML = require('../internals/create-html')
    var forcedStringHTMLMethod = require('../internals/string-html-forced')

    // `String.prototype.fontcolor` method
    // https://tc39.es/ecma262/#sec-string.prototype.fontcolor
    $({ target: 'String', proto: true, forced: forcedStringHTMLMethod('fontcolor') }, {
      fontcolor: function fontcolor (color) {
        return createHTML(this, 'font', 'color', color)
      }
    })
  }, { '../internals/create-html': 73, '../internals/export': 107, '../internals/string-html-forced': 241 }],
  469: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var createHTML = require('../internals/create-html')
    var forcedStringHTMLMethod = require('../internals/string-html-forced')

    // `String.prototype.fontsize` method
    // https://tc39.es/ecma262/#sec-string.prototype.fontsize
    $({ target: 'String', proto: true, forced: forcedStringHTMLMethod('fontsize') }, {
      fontsize: function fontsize (size) {
        return createHTML(this, 'font', 'size', size)
      }
    })
  }, { '../internals/create-html': 73, '../internals/export': 107, '../internals/string-html-forced': 241 }],
  470: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var uncurryThis = require('../internals/function-uncurry-this')
    var toAbsoluteIndex = require('../internals/to-absolute-index')

    var $RangeError = RangeError
    var fromCharCode = String.fromCharCode
    // eslint-disable-next-line es/no-string-fromcodepoint -- required for testing
    var $fromCodePoint = String.fromCodePoint
    var join = uncurryThis([].join)

    // length should be 1, old FF problem
    var INCORRECT_LENGTH = !!$fromCodePoint && $fromCodePoint.length !== 1

    // `String.fromCodePoint` method
    // https://tc39.es/ecma262/#sec-string.fromcodepoint
    $({ target: 'String', stat: true, arity: 1, forced: INCORRECT_LENGTH }, {
      // eslint-disable-next-line no-unused-vars -- required for `.length`
      fromCodePoint: function fromCodePoint (x) {
        var elements = []
        var length = arguments.length
        var i = 0
        var code
        while (length > i) {
          code = +arguments[i++]
          if (toAbsoluteIndex(code, 0x10FFFF) !== code) throw new $RangeError(code + ' is not a valid code point')
          elements[i] = code < 0x10000
            ? fromCharCode(code)
            : fromCharCode(((code -= 0x10000) >> 10) + 0xD800, code % 0x400 + 0xDC00)
        } return join(elements, '')
      }
    })
  }, { '../internals/export': 107, '../internals/function-uncurry-this': 120, '../internals/to-absolute-index': 257 }],
  471: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var uncurryThis = require('../internals/function-uncurry-this')
    var notARegExp = require('../internals/not-a-regexp')
    var requireObjectCoercible = require('../internals/require-object-coercible')
    var toString = require('../internals/to-string')
    var correctIsRegExpLogic = require('../internals/correct-is-regexp-logic')

    var stringIndexOf = uncurryThis(''.indexOf)

    // `String.prototype.includes` method
    // https://tc39.es/ecma262/#sec-string.prototype.includes
    $({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
      includes: function includes (searchString /* , position = 0 */) {
        return !!~stringIndexOf(
          toString(requireObjectCoercible(this)),
          toString(notARegExp(searchString)),
          arguments.length > 1 ? arguments[1] : undefined
        )
      }
    })
  }, { '../internals/correct-is-regexp-logic': 71, '../internals/export': 107, '../internals/function-uncurry-this': 120, '../internals/not-a-regexp': 180, '../internals/require-object-coercible': 219, '../internals/to-string': 269 }],
  472: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var uncurryThis = require('../internals/function-uncurry-this')
    var requireObjectCoercible = require('../internals/require-object-coercible')
    var toString = require('../internals/to-string')

    var charCodeAt = uncurryThis(''.charCodeAt)

    // `String.prototype.isWellFormed` method
    // https://github.com/tc39/proposal-is-usv-string
    $({ target: 'String', proto: true }, {
      isWellFormed: function isWellFormed () {
        var S = toString(requireObjectCoercible(this))
        var length = S.length
        for (var i = 0; i < length; i++) {
          var charCode = charCodeAt(S, i)
          // single UTF-16 code unit
          if ((charCode & 0xF800) !== 0xD800) continue
          // unpaired surrogate
          if (charCode >= 0xDC00 || ++i >= length || (charCodeAt(S, i) & 0xFC00) !== 0xDC00) return false
        } return true
      }
    })
  }, { '../internals/export': 107, '../internals/function-uncurry-this': 120, '../internals/require-object-coercible': 219, '../internals/to-string': 269 }],
  473: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var createHTML = require('../internals/create-html')
    var forcedStringHTMLMethod = require('../internals/string-html-forced')

    // `String.prototype.italics` method
    // https://tc39.es/ecma262/#sec-string.prototype.italics
    $({ target: 'String', proto: true, forced: forcedStringHTMLMethod('italics') }, {
      italics: function italics () {
        return createHTML(this, 'i', '', '')
      }
    })
  }, { '../internals/create-html': 73, '../internals/export': 107, '../internals/string-html-forced': 241 }],
  474: [function (require, module, exports) {
    'use strict'
    var charAt = require('../internals/string-multibyte').charAt
    var toString = require('../internals/to-string')
    var InternalStateModule = require('../internals/internal-state')
    var defineIterator = require('../internals/iterator-define')
    var createIterResultObject = require('../internals/create-iter-result-object')

    var STRING_ITERATOR = 'String Iterator'
    var setInternalState = InternalStateModule.set
    var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR)

    // `String.prototype[@@iterator]` method
    // https://tc39.es/ecma262/#sec-string.prototype-@@iterator
    defineIterator(String, 'String', function (iterated) {
      setInternalState(this, {
        type: STRING_ITERATOR,
        string: toString(iterated),
        index: 0
      })
      // `%StringIteratorPrototype%.next` method
      // https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
    }, function next () {
      var state = getInternalState(this)
      var string = state.string
      var index = state.index
      var point
      if (index >= string.length) return createIterResultObject(undefined, true)
      point = charAt(string, index)
      state.index += point.length
      return createIterResultObject(point, false)
    })
  }, { '../internals/create-iter-result-object': 74, '../internals/internal-state': 143, '../internals/iterator-define': 163, '../internals/string-multibyte': 242, '../internals/to-string': 269 }],
  475: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var createHTML = require('../internals/create-html')
    var forcedStringHTMLMethod = require('../internals/string-html-forced')

    // `String.prototype.link` method
    // https://tc39.es/ecma262/#sec-string.prototype.link
    $({ target: 'String', proto: true, forced: forcedStringHTMLMethod('link') }, {
      link: function link (url) {
        return createHTML(this, 'a', 'href', url)
      }
    })
  }, { '../internals/create-html': 73, '../internals/export': 107, '../internals/string-html-forced': 241 }],
  476: [function (require, module, exports) {
    'use strict'
    /* eslint-disable es/no-string-prototype-matchall -- safe */
    var $ = require('../internals/export')
    var call = require('../internals/function-call')
    var uncurryThis = require('../internals/function-uncurry-this-clause')
    var createIteratorConstructor = require('../internals/iterator-create-constructor')
    var createIterResultObject = require('../internals/create-iter-result-object')
    var requireObjectCoercible = require('../internals/require-object-coercible')
    var toLength = require('../internals/to-length')
    var toString = require('../internals/to-string')
    var anObject = require('../internals/an-object')
    var isNullOrUndefined = require('../internals/is-null-or-undefined')
    var classof = require('../internals/classof-raw')
    var isRegExp = require('../internals/is-regexp')
    var getRegExpFlags = require('../internals/regexp-get-flags')
    var getMethod = require('../internals/get-method')
    var defineBuiltIn = require('../internals/define-built-in')
    var fails = require('../internals/fails')
    var wellKnownSymbol = require('../internals/well-known-symbol')
    var speciesConstructor = require('../internals/species-constructor')
    var advanceStringIndex = require('../internals/advance-string-index')
    var regExpExec = require('../internals/regexp-exec-abstract')
    var InternalStateModule = require('../internals/internal-state')
    var IS_PURE = require('../internals/is-pure')

    var MATCH_ALL = wellKnownSymbol('matchAll')
    var REGEXP_STRING = 'RegExp String'
    var REGEXP_STRING_ITERATOR = REGEXP_STRING + ' Iterator'
    var setInternalState = InternalStateModule.set
    var getInternalState = InternalStateModule.getterFor(REGEXP_STRING_ITERATOR)
    var RegExpPrototype = RegExp.prototype
    var $TypeError = TypeError
    var stringIndexOf = uncurryThis(''.indexOf)
    var nativeMatchAll = uncurryThis(''.matchAll)

    var WORKS_WITH_NON_GLOBAL_REGEX = !!nativeMatchAll && !fails(function () {
      nativeMatchAll('a', /./)
    })

    var $RegExpStringIterator = createIteratorConstructor(function RegExpStringIterator (regexp, string, $global, fullUnicode) {
      setInternalState(this, {
        type: REGEXP_STRING_ITERATOR,
        regexp: regexp,
        string: string,
        global: $global,
        unicode: fullUnicode,
        done: false
      })
    }, REGEXP_STRING, function next () {
      var state = getInternalState(this)
      if (state.done) return createIterResultObject(undefined, true)
      var R = state.regexp
      var S = state.string
      var match = regExpExec(R, S)
      if (match === null) {
        state.done = true
        return createIterResultObject(undefined, true)
      }
      if (state.global) {
        if (toString(match[0]) === '') R.lastIndex = advanceStringIndex(S, toLength(R.lastIndex), state.unicode)
        return createIterResultObject(match, false)
      }
      state.done = true
      return createIterResultObject(match, false)
    })

    var $matchAll = function (string) {
      var R = anObject(this)
      var S = toString(string)
      var C = speciesConstructor(R, RegExp)
      var flags = toString(getRegExpFlags(R))
      var matcher, $global, fullUnicode
      matcher = new C(C === RegExp ? R.source : R, flags)
      $global = !!~stringIndexOf(flags, 'g')
      fullUnicode = !!~stringIndexOf(flags, 'u')
      matcher.lastIndex = toLength(R.lastIndex)
      return new $RegExpStringIterator(matcher, S, $global, fullUnicode)
    }

    // `String.prototype.matchAll` method
    // https://tc39.es/ecma262/#sec-string.prototype.matchall
    $({ target: 'String', proto: true, forced: WORKS_WITH_NON_GLOBAL_REGEX }, {
      matchAll: function matchAll (regexp) {
        var O = requireObjectCoercible(this)
        var flags, S, matcher, rx
        if (!isNullOrUndefined(regexp)) {
          if (isRegExp(regexp)) {
            flags = toString(requireObjectCoercible(getRegExpFlags(regexp)))
            if (!~stringIndexOf(flags, 'g')) throw new $TypeError('`.matchAll` does not allow non-global regexes')
          }
          if (WORKS_WITH_NON_GLOBAL_REGEX) return nativeMatchAll(O, regexp)
          matcher = getMethod(regexp, MATCH_ALL)
          if (matcher === undefined && IS_PURE && classof(regexp) === 'RegExp') matcher = $matchAll
          if (matcher) return call(matcher, regexp, O)
        } else if (WORKS_WITH_NON_GLOBAL_REGEX) return nativeMatchAll(O, regexp)
        S = toString(O)
        rx = new RegExp(regexp, 'g')
        return IS_PURE ? call($matchAll, rx, S) : rx[MATCH_ALL](S)
      }
    })

    IS_PURE || MATCH_ALL in RegExpPrototype || defineBuiltIn(RegExpPrototype, MATCH_ALL, $matchAll)
  }, { '../internals/advance-string-index': 28, '../internals/an-object': 30, '../internals/classof-raw': 65, '../internals/create-iter-result-object': 74, '../internals/define-built-in': 81, '../internals/export': 107, '../internals/fails': 108, '../internals/function-call': 116, '../internals/function-uncurry-this-clause': 119, '../internals/get-method': 128, '../internals/internal-state': 143, '../internals/is-null-or-undefined': 152, '../internals/is-pure': 155, '../internals/is-regexp': 156, '../internals/iterator-create-constructor': 161, '../internals/regexp-exec-abstract': 212, '../internals/regexp-get-flags': 215, '../internals/require-object-coercible': 219, '../internals/species-constructor': 240, '../internals/to-length': 262, '../internals/to-string': 269, '../internals/well-known-symbol': 285 }],
  477: [function (require, module, exports) {
    'use strict'
    var call = require('../internals/function-call')
    var fixRegExpWellKnownSymbolLogic = require('../internals/fix-regexp-well-known-symbol-logic')
    var anObject = require('../internals/an-object')
    var isNullOrUndefined = require('../internals/is-null-or-undefined')
    var toLength = require('../internals/to-length')
    var toString = require('../internals/to-string')
    var requireObjectCoercible = require('../internals/require-object-coercible')
    var getMethod = require('../internals/get-method')
    var advanceStringIndex = require('../internals/advance-string-index')
    var regExpExec = require('../internals/regexp-exec-abstract')

    // @@match logic
    fixRegExpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
      return [
        // `String.prototype.match` method
        // https://tc39.es/ecma262/#sec-string.prototype.match
        function match (regexp) {
          var O = requireObjectCoercible(this)
          var matcher = isNullOrUndefined(regexp) ? undefined : getMethod(regexp, MATCH)
          return matcher ? call(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString(O))
        },
        // `RegExp.prototype[@@match]` method
        // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
        function (string) {
          var rx = anObject(this)
          var S = toString(string)
          var res = maybeCallNative(nativeMatch, rx, S)

          if (res.done) return res.value

          if (!rx.global) return regExpExec(rx, S)

          var fullUnicode = rx.unicode
          rx.lastIndex = 0
          var A = []
          var n = 0
          var result
          while ((result = regExpExec(rx, S)) !== null) {
            var matchStr = toString(result[0])
            A[n] = matchStr
            if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode)
            n++
          }
          return n === 0 ? null : A
        }
      ]
    })
  }, { '../internals/advance-string-index': 28, '../internals/an-object': 30, '../internals/fix-regexp-well-known-symbol-logic': 109, '../internals/function-call': 116, '../internals/get-method': 128, '../internals/is-null-or-undefined': 152, '../internals/regexp-exec-abstract': 212, '../internals/require-object-coercible': 219, '../internals/to-length': 262, '../internals/to-string': 269 }],
  478: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var $padEnd = require('../internals/string-pad').end
    var WEBKIT_BUG = require('../internals/string-pad-webkit-bug')

    // `String.prototype.padEnd` method
    // https://tc39.es/ecma262/#sec-string.prototype.padend
    $({ target: 'String', proto: true, forced: WEBKIT_BUG }, {
      padEnd: function padEnd (maxLength /* , fillString = ' ' */) {
        return $padEnd(this, maxLength, arguments.length > 1 ? arguments[1] : undefined)
      }
    })
  }, { '../internals/export': 107, '../internals/string-pad': 244, '../internals/string-pad-webkit-bug': 243 }],
  479: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var $padStart = require('../internals/string-pad').start
    var WEBKIT_BUG = require('../internals/string-pad-webkit-bug')

    // `String.prototype.padStart` method
    // https://tc39.es/ecma262/#sec-string.prototype.padstart
    $({ target: 'String', proto: true, forced: WEBKIT_BUG }, {
      padStart: function padStart (maxLength /* , fillString = ' ' */) {
        return $padStart(this, maxLength, arguments.length > 1 ? arguments[1] : undefined)
      }
    })
  }, { '../internals/export': 107, '../internals/string-pad': 244, '../internals/string-pad-webkit-bug': 243 }],
  480: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var uncurryThis = require('../internals/function-uncurry-this')
    var toIndexedObject = require('../internals/to-indexed-object')
    var toObject = require('../internals/to-object')
    var toString = require('../internals/to-string')
    var lengthOfArrayLike = require('../internals/length-of-array-like')

    var push = uncurryThis([].push)
    var join = uncurryThis([].join)

    // `String.raw` method
    // https://tc39.es/ecma262/#sec-string.raw
    $({ target: 'String', stat: true }, {
      raw: function raw (template) {
        var rawTemplate = toIndexedObject(toObject(template).raw)
        var literalSegments = lengthOfArrayLike(rawTemplate)
        if (!literalSegments) return ''
        var argumentsLength = arguments.length
        var elements = []
        var i = 0
        while (true) {
          push(elements, toString(rawTemplate[i++]))
          if (i === literalSegments) return join(elements, '')
          if (i < argumentsLength) push(elements, toString(arguments[i]))
        }
      }
    })
  }, { '../internals/export': 107, '../internals/function-uncurry-this': 120, '../internals/length-of-array-like': 167, '../internals/to-indexed-object': 260, '../internals/to-object': 263, '../internals/to-string': 269 }],
  481: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var repeat = require('../internals/string-repeat')

    // `String.prototype.repeat` method
    // https://tc39.es/ecma262/#sec-string.prototype.repeat
    $({ target: 'String', proto: true }, {
      repeat: repeat
    })
  }, { '../internals/export': 107, '../internals/string-repeat': 246 }],
  482: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var call = require('../internals/function-call')
    var uncurryThis = require('../internals/function-uncurry-this')
    var requireObjectCoercible = require('../internals/require-object-coercible')
    var isCallable = require('../internals/is-callable')
    var isNullOrUndefined = require('../internals/is-null-or-undefined')
    var isRegExp = require('../internals/is-regexp')
    var toString = require('../internals/to-string')
    var getMethod = require('../internals/get-method')
    var getRegExpFlags = require('../internals/regexp-get-flags')
    var getSubstitution = require('../internals/get-substitution')
    var wellKnownSymbol = require('../internals/well-known-symbol')
    var IS_PURE = require('../internals/is-pure')

    var REPLACE = wellKnownSymbol('replace')
    var $TypeError = TypeError
    var indexOf = uncurryThis(''.indexOf)
    var replace = uncurryThis(''.replace)
    var stringSlice = uncurryThis(''.slice)
    var max = Math.max

    // `String.prototype.replaceAll` method
    // https://tc39.es/ecma262/#sec-string.prototype.replaceall
    $({ target: 'String', proto: true }, {
      replaceAll: function replaceAll (searchValue, replaceValue) {
        var O = requireObjectCoercible(this)
        var IS_REG_EXP, flags, replacer, string, searchString, functionalReplace, searchLength, advanceBy, position, replacement
        var endOfLastMatch = 0
        var result = ''
        if (!isNullOrUndefined(searchValue)) {
          IS_REG_EXP = isRegExp(searchValue)
          if (IS_REG_EXP) {
            flags = toString(requireObjectCoercible(getRegExpFlags(searchValue)))
            if (!~indexOf(flags, 'g')) throw new $TypeError('`.replaceAll` does not allow non-global regexes')
          }
          replacer = getMethod(searchValue, REPLACE)
          if (replacer) return call(replacer, searchValue, O, replaceValue)
          if (IS_PURE && IS_REG_EXP) return replace(toString(O), searchValue, replaceValue)
        }
        string = toString(O)
        searchString = toString(searchValue)
        functionalReplace = isCallable(replaceValue)
        if (!functionalReplace) replaceValue = toString(replaceValue)
        searchLength = searchString.length
        advanceBy = max(1, searchLength)
        position = indexOf(string, searchString)
        while (position !== -1) {
          replacement = functionalReplace
            ? toString(replaceValue(searchString, position, string))
            : getSubstitution(searchString, string, position, [], undefined, replaceValue)
          result += stringSlice(string, endOfLastMatch, position) + replacement
          endOfLastMatch = position + searchLength
          position = position + advanceBy > string.length ? -1 : indexOf(string, searchString, position + advanceBy)
        }
        if (endOfLastMatch < string.length) {
          result += stringSlice(string, endOfLastMatch)
        }
        return result
      }
    })
  }, { '../internals/export': 107, '../internals/function-call': 116, '../internals/function-uncurry-this': 120, '../internals/get-method': 128, '../internals/get-substitution': 130, '../internals/is-callable': 147, '../internals/is-null-or-undefined': 152, '../internals/is-pure': 155, '../internals/is-regexp': 156, '../internals/regexp-get-flags': 215, '../internals/require-object-coercible': 219, '../internals/to-string': 269, '../internals/well-known-symbol': 285 }],
  483: [function (require, module, exports) {
    'use strict'
    var apply = require('../internals/function-apply')
    var call = require('../internals/function-call')
    var uncurryThis = require('../internals/function-uncurry-this')
    var fixRegExpWellKnownSymbolLogic = require('../internals/fix-regexp-well-known-symbol-logic')
    var fails = require('../internals/fails')
    var anObject = require('../internals/an-object')
    var isCallable = require('../internals/is-callable')
    var isNullOrUndefined = require('../internals/is-null-or-undefined')
    var toIntegerOrInfinity = require('../internals/to-integer-or-infinity')
    var toLength = require('../internals/to-length')
    var toString = require('../internals/to-string')
    var requireObjectCoercible = require('../internals/require-object-coercible')
    var advanceStringIndex = require('../internals/advance-string-index')
    var getMethod = require('../internals/get-method')
    var getSubstitution = require('../internals/get-substitution')
    var regExpExec = require('../internals/regexp-exec-abstract')
    var wellKnownSymbol = require('../internals/well-known-symbol')

    var REPLACE = wellKnownSymbol('replace')
    var max = Math.max
    var min = Math.min
    var concat = uncurryThis([].concat)
    var push = uncurryThis([].push)
    var stringIndexOf = uncurryThis(''.indexOf)
    var stringSlice = uncurryThis(''.slice)

    var maybeToString = function (it) {
      return it === undefined ? it : String(it)
    }

    // IE <= 11 replaces $0 with the whole match, as if it was $&
    // https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
    var REPLACE_KEEPS_$0 = (function () {
      // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
      return 'a'.replace(/./, '$0') === '$0'
    })()

    // Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
    var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
      if (/./[REPLACE]) {
        return /./[REPLACE]('a', '$0') === ''
      }
      return false
    })()

    var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
      var re = /./
      re.exec = function () {
        var result = []
        result.groups = { a: '7' }
        return result
      }
      // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
      return ''.replace(re, '$<a>') !== '7'
    })

    // @@replace logic
    fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
      var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0'

      return [
        // `String.prototype.replace` method
        // https://tc39.es/ecma262/#sec-string.prototype.replace
        function replace (searchValue, replaceValue) {
          var O = requireObjectCoercible(this)
          var replacer = isNullOrUndefined(searchValue) ? undefined : getMethod(searchValue, REPLACE)
          return replacer
            ? call(replacer, searchValue, O, replaceValue)
            : call(nativeReplace, toString(O), searchValue, replaceValue)
        },
        // `RegExp.prototype[@@replace]` method
        // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
        function (string, replaceValue) {
          var rx = anObject(this)
          var S = toString(string)

          if (
            typeof replaceValue === 'string' &&
        stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
        stringIndexOf(replaceValue, '$<') === -1
          ) {
            var res = maybeCallNative(nativeReplace, rx, S, replaceValue)
            if (res.done) return res.value
          }

          var functionalReplace = isCallable(replaceValue)
          if (!functionalReplace) replaceValue = toString(replaceValue)

          var global = rx.global
          var fullUnicode
          if (global) {
            fullUnicode = rx.unicode
            rx.lastIndex = 0
          }

          var results = []
          var result
          while (true) {
            result = regExpExec(rx, S)
            if (result === null) break

            push(results, result)
            if (!global) break

            var matchStr = toString(result[0])
            if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode)
          }

          var accumulatedResult = ''
          var nextSourcePosition = 0
          for (var i = 0; i < results.length; i++) {
            result = results[i]

            var matched = toString(result[0])
            var position = max(min(toIntegerOrInfinity(result.index), S.length), 0)
            var captures = []
            var replacement
            // NOTE: This is equivalent to
            //   captures = result.slice(1).map(maybeToString)
            // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
            // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
            // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
            for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]))
            var namedCaptures = result.groups
            if (functionalReplace) {
              var replacerArgs = concat([matched], captures, position, S)
              if (namedCaptures !== undefined) push(replacerArgs, namedCaptures)
              replacement = toString(apply(replaceValue, undefined, replacerArgs))
            } else {
              replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue)
            }
            if (position >= nextSourcePosition) {
              accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement
              nextSourcePosition = position + matched.length
            }
          }

          return accumulatedResult + stringSlice(S, nextSourcePosition)
        }
      ]
    }, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE)
  }, { '../internals/advance-string-index': 28, '../internals/an-object': 30, '../internals/fails': 108, '../internals/fix-regexp-well-known-symbol-logic': 109, '../internals/function-apply': 112, '../internals/function-call': 116, '../internals/function-uncurry-this': 120, '../internals/get-method': 128, '../internals/get-substitution': 130, '../internals/is-callable': 147, '../internals/is-null-or-undefined': 152, '../internals/regexp-exec-abstract': 212, '../internals/require-object-coercible': 219, '../internals/to-integer-or-infinity': 261, '../internals/to-length': 262, '../internals/to-string': 269, '../internals/well-known-symbol': 285 }],
  484: [function (require, module, exports) {
    'use strict'
    var call = require('../internals/function-call')
    var fixRegExpWellKnownSymbolLogic = require('../internals/fix-regexp-well-known-symbol-logic')
    var anObject = require('../internals/an-object')
    var isNullOrUndefined = require('../internals/is-null-or-undefined')
    var requireObjectCoercible = require('../internals/require-object-coercible')
    var sameValue = require('../internals/same-value')
    var toString = require('../internals/to-string')
    var getMethod = require('../internals/get-method')
    var regExpExec = require('../internals/regexp-exec-abstract')

    // @@search logic
    fixRegExpWellKnownSymbolLogic('search', function (SEARCH, nativeSearch, maybeCallNative) {
      return [
        // `String.prototype.search` method
        // https://tc39.es/ecma262/#sec-string.prototype.search
        function search (regexp) {
          var O = requireObjectCoercible(this)
          var searcher = isNullOrUndefined(regexp) ? undefined : getMethod(regexp, SEARCH)
          return searcher ? call(searcher, regexp, O) : new RegExp(regexp)[SEARCH](toString(O))
        },
        // `RegExp.prototype[@@search]` method
        // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
        function (string) {
          var rx = anObject(this)
          var S = toString(string)
          var res = maybeCallNative(nativeSearch, rx, S)

          if (res.done) return res.value

          var previousLastIndex = rx.lastIndex
          if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0
          var result = regExpExec(rx, S)
          if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex
          return result === null ? -1 : result.index
        }
      ]
    })
  }, { '../internals/an-object': 30, '../internals/fix-regexp-well-known-symbol-logic': 109, '../internals/function-call': 116, '../internals/get-method': 128, '../internals/is-null-or-undefined': 152, '../internals/regexp-exec-abstract': 212, '../internals/require-object-coercible': 219, '../internals/same-value': 221, '../internals/to-string': 269 }],
  485: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var createHTML = require('../internals/create-html')
    var forcedStringHTMLMethod = require('../internals/string-html-forced')

    // `String.prototype.small` method
    // https://tc39.es/ecma262/#sec-string.prototype.small
    $({ target: 'String', proto: true, forced: forcedStringHTMLMethod('small') }, {
      small: function small () {
        return createHTML(this, 'small', '', '')
      }
    })
  }, { '../internals/create-html': 73, '../internals/export': 107, '../internals/string-html-forced': 241 }],
  486: [function (require, module, exports) {
    'use strict'
    var call = require('../internals/function-call')
    var uncurryThis = require('../internals/function-uncurry-this')
    var fixRegExpWellKnownSymbolLogic = require('../internals/fix-regexp-well-known-symbol-logic')
    var anObject = require('../internals/an-object')
    var isNullOrUndefined = require('../internals/is-null-or-undefined')
    var requireObjectCoercible = require('../internals/require-object-coercible')
    var speciesConstructor = require('../internals/species-constructor')
    var advanceStringIndex = require('../internals/advance-string-index')
    var toLength = require('../internals/to-length')
    var toString = require('../internals/to-string')
    var getMethod = require('../internals/get-method')
    var regExpExec = require('../internals/regexp-exec-abstract')
    var stickyHelpers = require('../internals/regexp-sticky-helpers')
    var fails = require('../internals/fails')

    var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y
    var MAX_UINT32 = 0xFFFFFFFF
    var min = Math.min
    var push = uncurryThis([].push)
    var stringSlice = uncurryThis(''.slice)

    // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
    // Weex JS has frozen built-in prototypes, so use try / catch wrapper
    var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
      // eslint-disable-next-line regexp/no-empty-group -- required for testing
      var re = /(?:)/
      var originalExec = re.exec
      re.exec = function () { return originalExec.apply(this, arguments) }
      var result = 'ab'.split(re)
      return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b'
    })

    var BUGGY = 'abbc'.split(/(b)*/)[1] === 'c' ||
  // eslint-disable-next-line regexp/no-empty-group -- required for testing
  'test'.split(/(?:)/, -1).length !== 4 ||
  'ab'.split(/(?:ab)*/).length !== 2 ||
  '.'.split(/(.?)(.?)/).length !== 4 ||
  // eslint-disable-next-line regexp/no-empty-capturing-group, regexp/no-empty-group -- required for testing
  '.'.split(/()()/).length > 1 ||
  ''.split(/.?/).length

    // @@split logic
    fixRegExpWellKnownSymbolLogic('split', function (SPLIT, nativeSplit, maybeCallNative) {
      var internalSplit = '0'.split(undefined, 0).length ? function (separator, limit) {
        return separator === undefined && limit === 0 ? [] : call(nativeSplit, this, separator, limit)
      } : nativeSplit

      return [
        // `String.prototype.split` method
        // https://tc39.es/ecma262/#sec-string.prototype.split
        function split (separator, limit) {
          var O = requireObjectCoercible(this)
          var splitter = isNullOrUndefined(separator) ? undefined : getMethod(separator, SPLIT)
          return splitter
            ? call(splitter, separator, O, limit)
            : call(internalSplit, toString(O), separator, limit)
        },
        // `RegExp.prototype[@@split]` method
        // https://tc39.es/ecma262/#sec-regexp.prototype-@@split
        //
        // NOTE: This cannot be properly polyfilled in engines that don't support
        // the 'y' flag.
        function (string, limit) {
          var rx = anObject(this)
          var S = toString(string)

          if (!BUGGY) {
            var res = maybeCallNative(internalSplit, rx, S, limit, internalSplit !== nativeSplit)
            if (res.done) return res.value
          }

          var C = speciesConstructor(rx, RegExp)
          var unicodeMatching = rx.unicode
          var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (UNSUPPORTED_Y ? 'g' : 'y')
          // ^(? + rx + ) is needed, in combination with some S slicing, to
          // simulate the 'y' flag.
          var splitter = new C(UNSUPPORTED_Y ? '^(?:' + rx.source + ')' : rx, flags)
          var lim = limit === undefined ? MAX_UINT32 : limit >>> 0
          if (lim === 0) return []
          if (S.length === 0) return regExpExec(splitter, S) === null ? [S] : []
          var p = 0
          var q = 0
          var A = []
          while (q < S.length) {
            splitter.lastIndex = UNSUPPORTED_Y ? 0 : q
            var z = regExpExec(splitter, UNSUPPORTED_Y ? stringSlice(S, q) : S)
            var e
            if (
              z === null ||
          (e = min(toLength(splitter.lastIndex + (UNSUPPORTED_Y ? q : 0)), S.length)) === p
            ) {
              q = advanceStringIndex(S, q, unicodeMatching)
            } else {
              push(A, stringSlice(S, p, q))
              if (A.length === lim) return A
              for (var i = 1; i <= z.length - 1; i++) {
                push(A, z[i])
                if (A.length === lim) return A
              }
              q = p = e
            }
          }
          push(A, stringSlice(S, p))
          return A
        }
      ]
    }, BUGGY || !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC, UNSUPPORTED_Y)
  }, { '../internals/advance-string-index': 28, '../internals/an-object': 30, '../internals/fails': 108, '../internals/fix-regexp-well-known-symbol-logic': 109, '../internals/function-call': 116, '../internals/function-uncurry-this': 120, '../internals/get-method': 128, '../internals/is-null-or-undefined': 152, '../internals/regexp-exec-abstract': 212, '../internals/regexp-sticky-helpers': 216, '../internals/require-object-coercible': 219, '../internals/species-constructor': 240, '../internals/to-length': 262, '../internals/to-string': 269 }],
  487: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var uncurryThis = require('../internals/function-uncurry-this-clause')
    var getOwnPropertyDescriptor = require('../internals/object-get-own-property-descriptor').f
    var toLength = require('../internals/to-length')
    var toString = require('../internals/to-string')
    var notARegExp = require('../internals/not-a-regexp')
    var requireObjectCoercible = require('../internals/require-object-coercible')
    var correctIsRegExpLogic = require('../internals/correct-is-regexp-logic')
    var IS_PURE = require('../internals/is-pure')

    var stringSlice = uncurryThis(''.slice)
    var min = Math.min

    var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('startsWith')
    // https://github.com/zloirock/core-js/pull/702
    var MDN_POLYFILL_BUG = !IS_PURE && !CORRECT_IS_REGEXP_LOGIC && !!(function () {
      var descriptor = getOwnPropertyDescriptor(String.prototype, 'startsWith')
      return descriptor && !descriptor.writable
    }())

    // `String.prototype.startsWith` method
    // https://tc39.es/ecma262/#sec-string.prototype.startswith
    $({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
      startsWith: function startsWith (searchString /* , position = 0 */) {
        var that = toString(requireObjectCoercible(this))
        notARegExp(searchString)
        var index = toLength(min(arguments.length > 1 ? arguments[1] : undefined, that.length))
        var search = toString(searchString)
        return stringSlice(that, index, index + search.length) === search
      }
    })
  }, { '../internals/correct-is-regexp-logic': 71, '../internals/export': 107, '../internals/function-uncurry-this-clause': 119, '../internals/is-pure': 155, '../internals/not-a-regexp': 180, '../internals/object-get-own-property-descriptor': 188, '../internals/require-object-coercible': 219, '../internals/to-length': 262, '../internals/to-string': 269 }],
  488: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var createHTML = require('../internals/create-html')
    var forcedStringHTMLMethod = require('../internals/string-html-forced')

    // `String.prototype.strike` method
    // https://tc39.es/ecma262/#sec-string.prototype.strike
    $({ target: 'String', proto: true, forced: forcedStringHTMLMethod('strike') }, {
      strike: function strike () {
        return createHTML(this, 'strike', '', '')
      }
    })
  }, { '../internals/create-html': 73, '../internals/export': 107, '../internals/string-html-forced': 241 }],
  489: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var createHTML = require('../internals/create-html')
    var forcedStringHTMLMethod = require('../internals/string-html-forced')

    // `String.prototype.sub` method
    // https://tc39.es/ecma262/#sec-string.prototype.sub
    $({ target: 'String', proto: true, forced: forcedStringHTMLMethod('sub') }, {
      sub: function sub () {
        return createHTML(this, 'sub', '', '')
      }
    })
  }, { '../internals/create-html': 73, '../internals/export': 107, '../internals/string-html-forced': 241 }],
  490: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var uncurryThis = require('../internals/function-uncurry-this')
    var requireObjectCoercible = require('../internals/require-object-coercible')
    var toIntegerOrInfinity = require('../internals/to-integer-or-infinity')
    var toString = require('../internals/to-string')

    var stringSlice = uncurryThis(''.slice)
    var max = Math.max
    var min = Math.min

    // eslint-disable-next-line unicorn/prefer-string-slice -- required for testing
    var FORCED = !''.substr || 'ab'.substr(-1) !== 'b'

    // `String.prototype.substr` method
    // https://tc39.es/ecma262/#sec-string.prototype.substr
    $({ target: 'String', proto: true, forced: FORCED }, {
      substr: function substr (start, length) {
        var that = toString(requireObjectCoercible(this))
        var size = that.length
        var intStart = toIntegerOrInfinity(start)
        var intLength, intEnd
        if (intStart === Infinity) intStart = 0
        if (intStart < 0) intStart = max(size + intStart, 0)
        intLength = length === undefined ? size : toIntegerOrInfinity(length)
        if (intLength <= 0 || intLength === Infinity) return ''
        intEnd = min(intStart + intLength, size)
        return intStart >= intEnd ? '' : stringSlice(that, intStart, intEnd)
      }
    })
  }, { '../internals/export': 107, '../internals/function-uncurry-this': 120, '../internals/require-object-coercible': 219, '../internals/to-integer-or-infinity': 261, '../internals/to-string': 269 }],
  491: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var createHTML = require('../internals/create-html')
    var forcedStringHTMLMethod = require('../internals/string-html-forced')

    // `String.prototype.sup` method
    // https://tc39.es/ecma262/#sec-string.prototype.sup
    $({ target: 'String', proto: true, forced: forcedStringHTMLMethod('sup') }, {
      sup: function sup () {
        return createHTML(this, 'sup', '', '')
      }
    })
  }, { '../internals/create-html': 73, '../internals/export': 107, '../internals/string-html-forced': 241 }],
  492: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var call = require('../internals/function-call')
    var uncurryThis = require('../internals/function-uncurry-this')
    var requireObjectCoercible = require('../internals/require-object-coercible')
    var toString = require('../internals/to-string')
    var fails = require('../internals/fails')

    var $Array = Array
    var charAt = uncurryThis(''.charAt)
    var charCodeAt = uncurryThis(''.charCodeAt)
    var join = uncurryThis([].join)
    // eslint-disable-next-line es/no-string-prototype-towellformed -- safe
    var $toWellFormed = ''.toWellFormed
    var REPLACEMENT_CHARACTER = '\uFFFD'

    // Safari bug
    var TO_STRING_CONVERSION_BUG = $toWellFormed && fails(function () {
      return call($toWellFormed, 1) !== '1'
    })

    // `String.prototype.toWellFormed` method
    // https://github.com/tc39/proposal-is-usv-string
    $({ target: 'String', proto: true, forced: TO_STRING_CONVERSION_BUG }, {
      toWellFormed: function toWellFormed () {
        var S = toString(requireObjectCoercible(this))
        if (TO_STRING_CONVERSION_BUG) return call($toWellFormed, S)
        var length = S.length
        var result = $Array(length)
        for (var i = 0; i < length; i++) {
          var charCode = charCodeAt(S, i)
          // single UTF-16 code unit
          if ((charCode & 0xF800) !== 0xD800) result[i] = charAt(S, i)
          // unpaired surrogate
          else if (charCode >= 0xDC00 || i + 1 >= length || (charCodeAt(S, i + 1) & 0xFC00) !== 0xDC00) result[i] = REPLACEMENT_CHARACTER
          // surrogate pair
          else {
            result[i] = charAt(S, i)
            result[++i] = charAt(S, i)
          }
        } return join(result, '')
      }
    })
  }, { '../internals/export': 107, '../internals/fails': 108, '../internals/function-call': 116, '../internals/function-uncurry-this': 120, '../internals/require-object-coercible': 219, '../internals/to-string': 269 }],
  493: [function (require, module, exports) {
    'use strict'
    // TODO: Remove this line from `core-js@4`
    require('../modules/es.string.trim-right')
    var $ = require('../internals/export')
    var trimEnd = require('../internals/string-trim-end')

    // `String.prototype.trimEnd` method
    // https://tc39.es/ecma262/#sec-string.prototype.trimend
    // eslint-disable-next-line es/no-string-prototype-trimstart-trimend -- safe
    $({ target: 'String', proto: true, name: 'trimEnd', forced: ''.trimEnd !== trimEnd }, {
      trimEnd: trimEnd
    })
  }, { '../internals/export': 107, '../internals/string-trim-end': 247, '../modules/es.string.trim-right': 495 }],
  494: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var trimStart = require('../internals/string-trim-start')

    // `String.prototype.trimLeft` method
    // https://tc39.es/ecma262/#sec-string.prototype.trimleft
    // eslint-disable-next-line es/no-string-prototype-trimleft-trimright -- safe
    $({ target: 'String', proto: true, name: 'trimStart', forced: ''.trimLeft !== trimStart }, {
      trimLeft: trimStart
    })
  }, { '../internals/export': 107, '../internals/string-trim-start': 249 }],
  495: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var trimEnd = require('../internals/string-trim-end')

    // `String.prototype.trimRight` method
    // https://tc39.es/ecma262/#sec-string.prototype.trimend
    // eslint-disable-next-line es/no-string-prototype-trimleft-trimright -- safe
    $({ target: 'String', proto: true, name: 'trimEnd', forced: ''.trimRight !== trimEnd }, {
      trimRight: trimEnd
    })
  }, { '../internals/export': 107, '../internals/string-trim-end': 247 }],
  496: [function (require, module, exports) {
    'use strict'
    // TODO: Remove this line from `core-js@4`
    require('../modules/es.string.trim-left')
    var $ = require('../internals/export')
    var trimStart = require('../internals/string-trim-start')

    // `String.prototype.trimStart` method
    // https://tc39.es/ecma262/#sec-string.prototype.trimstart
    // eslint-disable-next-line es/no-string-prototype-trimstart-trimend -- safe
    $({ target: 'String', proto: true, name: 'trimStart', forced: ''.trimStart !== trimStart }, {
      trimStart: trimStart
    })
  }, { '../internals/export': 107, '../internals/string-trim-start': 249, '../modules/es.string.trim-left': 494 }],
  497: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var $trim = require('../internals/string-trim').trim
    var forcedStringTrimMethod = require('../internals/string-trim-forced')

    // `String.prototype.trim` method
    // https://tc39.es/ecma262/#sec-string.prototype.trim
    $({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
      trim: function trim () {
        return $trim(this)
      }
    })
  }, { '../internals/export': 107, '../internals/string-trim': 250, '../internals/string-trim-forced': 248 }],
  498: [function (require, module, exports) {
    'use strict'
    var defineWellKnownSymbol = require('../internals/well-known-symbol-define')

    // `Symbol.asyncIterator` well-known symbol
    // https://tc39.es/ecma262/#sec-symbol.asynciterator
    defineWellKnownSymbol('asyncIterator')
  }, { '../internals/well-known-symbol-define': 283 }],
  499: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var globalThis = require('../internals/global-this')
    var call = require('../internals/function-call')
    var uncurryThis = require('../internals/function-uncurry-this')
    var IS_PURE = require('../internals/is-pure')
    var DESCRIPTORS = require('../internals/descriptors')
    var NATIVE_SYMBOL = require('../internals/symbol-constructor-detection')
    var fails = require('../internals/fails')
    var hasOwn = require('../internals/has-own-property')
    var isPrototypeOf = require('../internals/object-is-prototype-of')
    var anObject = require('../internals/an-object')
    var toIndexedObject = require('../internals/to-indexed-object')
    var toPropertyKey = require('../internals/to-property-key')
    var $toString = require('../internals/to-string')
    var createPropertyDescriptor = require('../internals/create-property-descriptor')
    var nativeObjectCreate = require('../internals/object-create')
    var objectKeys = require('../internals/object-keys')
    var getOwnPropertyNamesModule = require('../internals/object-get-own-property-names')
    var getOwnPropertyNamesExternal = require('../internals/object-get-own-property-names-external')
    var getOwnPropertySymbolsModule = require('../internals/object-get-own-property-symbols')
    var getOwnPropertyDescriptorModule = require('../internals/object-get-own-property-descriptor')
    var definePropertyModule = require('../internals/object-define-property')
    var definePropertiesModule = require('../internals/object-define-properties')
    var propertyIsEnumerableModule = require('../internals/object-property-is-enumerable')
    var defineBuiltIn = require('../internals/define-built-in')
    var defineBuiltInAccessor = require('../internals/define-built-in-accessor')
    var shared = require('../internals/shared')
    var sharedKey = require('../internals/shared-key')
    var hiddenKeys = require('../internals/hidden-keys')
    var uid = require('../internals/uid')
    var wellKnownSymbol = require('../internals/well-known-symbol')
    var wrappedWellKnownSymbolModule = require('../internals/well-known-symbol-wrapped')
    var defineWellKnownSymbol = require('../internals/well-known-symbol-define')
    var defineSymbolToPrimitive = require('../internals/symbol-define-to-primitive')
    var setToStringTag = require('../internals/set-to-string-tag')
    var InternalStateModule = require('../internals/internal-state')
    var $forEach = require('../internals/array-iteration').forEach

    var HIDDEN = sharedKey('hidden')
    var SYMBOL = 'Symbol'
    var PROTOTYPE = 'prototype'

    var setInternalState = InternalStateModule.set
    var getInternalState = InternalStateModule.getterFor(SYMBOL)

    var ObjectPrototype = Object[PROTOTYPE]
    var $Symbol = globalThis.Symbol
    var SymbolPrototype = $Symbol && $Symbol[PROTOTYPE]
    var RangeError = globalThis.RangeError
    var TypeError = globalThis.TypeError
    var QObject = globalThis.QObject
    var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f
    var nativeDefineProperty = definePropertyModule.f
    var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f
    var nativePropertyIsEnumerable = propertyIsEnumerableModule.f
    var push = uncurryThis([].push)

    var AllSymbols = shared('symbols')
    var ObjectPrototypeSymbols = shared('op-symbols')
    var WellKnownSymbolsStore = shared('wks')

    // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
    var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild

    // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
    var fallbackDefineProperty = function (O, P, Attributes) {
      var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P)
      if (ObjectPrototypeDescriptor) delete ObjectPrototype[P]
      nativeDefineProperty(O, P, Attributes)
      if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
        nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor)
      }
    }

    var setSymbolDescriptor = DESCRIPTORS && fails(function () {
      return nativeObjectCreate(nativeDefineProperty({}, 'a', {
        get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a }
      })).a !== 7
    }) ? fallbackDefineProperty : nativeDefineProperty

    var wrap = function (tag, description) {
      var symbol = AllSymbols[tag] = nativeObjectCreate(SymbolPrototype)
      setInternalState(symbol, {
        type: SYMBOL,
        tag: tag,
        description: description
      })
      if (!DESCRIPTORS) symbol.description = description
      return symbol
    }

    var $defineProperty = function defineProperty (O, P, Attributes) {
      if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes)
      anObject(O)
      var key = toPropertyKey(P)
      anObject(Attributes)
      if (hasOwn(AllSymbols, key)) {
        if (!Attributes.enumerable) {
          if (!hasOwn(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, nativeObjectCreate(null)))
          O[HIDDEN][key] = true
        } else {
          if (hasOwn(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false
          Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) })
        } return setSymbolDescriptor(O, key, Attributes)
      } return nativeDefineProperty(O, key, Attributes)
    }

    var $defineProperties = function defineProperties (O, Properties) {
      anObject(O)
      var properties = toIndexedObject(Properties)
      var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties))
      $forEach(keys, function (key) {
        if (!DESCRIPTORS || call($propertyIsEnumerable, properties, key)) $defineProperty(O, key, properties[key])
      })
      return O
    }

    var $create = function create (O, Properties) {
      return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties)
    }

    var $propertyIsEnumerable = function propertyIsEnumerable (V) {
      var P = toPropertyKey(V)
      var enumerable = call(nativePropertyIsEnumerable, this, P)
      if (this === ObjectPrototype && hasOwn(AllSymbols, P) && !hasOwn(ObjectPrototypeSymbols, P)) return false
      return enumerable || !hasOwn(this, P) || !hasOwn(AllSymbols, P) || hasOwn(this, HIDDEN) && this[HIDDEN][P]
        ? enumerable : true
    }

    var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor (O, P) {
      var it = toIndexedObject(O)
      var key = toPropertyKey(P)
      if (it === ObjectPrototype && hasOwn(AllSymbols, key) && !hasOwn(ObjectPrototypeSymbols, key)) return
      var descriptor = nativeGetOwnPropertyDescriptor(it, key)
      if (descriptor && hasOwn(AllSymbols, key) && !(hasOwn(it, HIDDEN) && it[HIDDEN][key])) {
        descriptor.enumerable = true
      }
      return descriptor
    }

    var $getOwnPropertyNames = function getOwnPropertyNames (O) {
      var names = nativeGetOwnPropertyNames(toIndexedObject(O))
      var result = []
      $forEach(names, function (key) {
        if (!hasOwn(AllSymbols, key) && !hasOwn(hiddenKeys, key)) push(result, key)
      })
      return result
    }

    var $getOwnPropertySymbols = function (O) {
      var IS_OBJECT_PROTOTYPE = O === ObjectPrototype
      var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O))
      var result = []
      $forEach(names, function (key) {
        if (hasOwn(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || hasOwn(ObjectPrototype, key))) {
          push(result, AllSymbols[key])
        }
      })
      return result
    }

    // `Symbol` constructor
    // https://tc39.es/ecma262/#sec-symbol-constructor
    if (!NATIVE_SYMBOL) {
      $Symbol = function Symbol () {
        if (isPrototypeOf(SymbolPrototype, this)) throw new TypeError('Symbol is not a constructor')
        var description = !arguments.length || arguments[0] === undefined ? undefined : $toString(arguments[0])
        var tag = uid(description)
        var setter = function (value) {
          var $this = this === undefined ? globalThis : this
          if ($this === ObjectPrototype) call(setter, ObjectPrototypeSymbols, value)
          if (hasOwn($this, HIDDEN) && hasOwn($this[HIDDEN], tag)) $this[HIDDEN][tag] = false
          var descriptor = createPropertyDescriptor(1, value)
          try {
            setSymbolDescriptor($this, tag, descriptor)
          } catch (error) {
            if (!(error instanceof RangeError)) throw error
            fallbackDefineProperty($this, tag, descriptor)
          }
        }
        if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter })
        return wrap(tag, description)
      }

      SymbolPrototype = $Symbol[PROTOTYPE]

      defineBuiltIn(SymbolPrototype, 'toString', function toString () {
        return getInternalState(this).tag
      })

      defineBuiltIn($Symbol, 'withoutSetter', function (description) {
        return wrap(uid(description), description)
      })

      propertyIsEnumerableModule.f = $propertyIsEnumerable
      definePropertyModule.f = $defineProperty
      definePropertiesModule.f = $defineProperties
      getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor
      getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames
      getOwnPropertySymbolsModule.f = $getOwnPropertySymbols

      wrappedWellKnownSymbolModule.f = function (name) {
        return wrap(wellKnownSymbol(name), name)
      }

      if (DESCRIPTORS) {
        // https://github.com/tc39/proposal-Symbol-description
        defineBuiltInAccessor(SymbolPrototype, 'description', {
          configurable: true,
          get: function description () {
            return getInternalState(this).description
          }
        })
        if (!IS_PURE) {
          defineBuiltIn(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true })
        }
      }
    }

    $({ global: true, constructor: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
      Symbol: $Symbol
    })

    $forEach(objectKeys(WellKnownSymbolsStore), function (name) {
      defineWellKnownSymbol(name)
    })

    $({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
      useSetter: function () { USE_SETTER = true },
      useSimple: function () { USE_SETTER = false }
    })

    $({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
      // `Object.create` method
      // https://tc39.es/ecma262/#sec-object.create
      create: $create,
      // `Object.defineProperty` method
      // https://tc39.es/ecma262/#sec-object.defineproperty
      defineProperty: $defineProperty,
      // `Object.defineProperties` method
      // https://tc39.es/ecma262/#sec-object.defineproperties
      defineProperties: $defineProperties,
      // `Object.getOwnPropertyDescriptor` method
      // https://tc39.es/ecma262/#sec-object.getownpropertydescriptors
      getOwnPropertyDescriptor: $getOwnPropertyDescriptor
    })

    $({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
      // `Object.getOwnPropertyNames` method
      // https://tc39.es/ecma262/#sec-object.getownpropertynames
      getOwnPropertyNames: $getOwnPropertyNames
    })

    // `Symbol.prototype[@@toPrimitive]` method
    // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
    defineSymbolToPrimitive()

    // `Symbol.prototype[@@toStringTag]` property
    // https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
    setToStringTag($Symbol, SYMBOL)

    hiddenKeys[HIDDEN] = true
  }, { '../internals/an-object': 30, '../internals/array-iteration': 46, '../internals/create-property-descriptor': 76, '../internals/define-built-in': 81, '../internals/define-built-in-accessor': 80, '../internals/descriptors': 85, '../internals/export': 107, '../internals/fails': 108, '../internals/function-call': 116, '../internals/function-uncurry-this': 120, '../internals/global-this': 131, '../internals/has-own-property': 132, '../internals/hidden-keys': 133, '../internals/internal-state': 143, '../internals/is-pure': 155, '../internals/object-create': 185, '../internals/object-define-properties': 186, '../internals/object-define-property': 187, '../internals/object-get-own-property-descriptor': 188, '../internals/object-get-own-property-names': 190, '../internals/object-get-own-property-names-external': 189, '../internals/object-get-own-property-symbols': 191, '../internals/object-is-prototype-of': 194, '../internals/object-keys': 196, '../internals/object-property-is-enumerable': 197, '../internals/set-to-string-tag': 235, '../internals/shared': 239, '../internals/shared-key': 237, '../internals/symbol-constructor-detection': 252, '../internals/symbol-define-to-primitive': 253, '../internals/to-indexed-object': 260, '../internals/to-property-key': 267, '../internals/to-string': 269, '../internals/uid': 277, '../internals/well-known-symbol': 285, '../internals/well-known-symbol-define': 283, '../internals/well-known-symbol-wrapped': 284 }],
  500: [function (require, module, exports) {
    // `Symbol.prototype.description` getter
    // https://tc39.es/ecma262/#sec-symbol.prototype.description
    'use strict'
    var $ = require('../internals/export')
    var DESCRIPTORS = require('../internals/descriptors')
    var globalThis = require('../internals/global-this')
    var uncurryThis = require('../internals/function-uncurry-this')
    var hasOwn = require('../internals/has-own-property')
    var isCallable = require('../internals/is-callable')
    var isPrototypeOf = require('../internals/object-is-prototype-of')
    var toString = require('../internals/to-string')
    var defineBuiltInAccessor = require('../internals/define-built-in-accessor')
    var copyConstructorProperties = require('../internals/copy-constructor-properties')

    var NativeSymbol = globalThis.Symbol
    var SymbolPrototype = NativeSymbol && NativeSymbol.prototype

    if (DESCRIPTORS && isCallable(NativeSymbol) && (!('description' in SymbolPrototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
    )) {
      var EmptyStringDescriptionStore = {}
      // wrap Symbol constructor for correct work with undefined description
      var SymbolWrapper = function Symbol () {
        var description = arguments.length < 1 || arguments[0] === undefined ? undefined : toString(arguments[0])
        var result = isPrototypeOf(SymbolPrototype, this)
        // eslint-disable-next-line sonar/inconsistent-function-call -- ok
          ? new NativeSymbol(description)
        // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
          : description === undefined ? NativeSymbol() : NativeSymbol(description)
        if (description === '') EmptyStringDescriptionStore[result] = true
        return result
      }

      copyConstructorProperties(SymbolWrapper, NativeSymbol)
      SymbolWrapper.prototype = SymbolPrototype
      SymbolPrototype.constructor = SymbolWrapper

      var NATIVE_SYMBOL = String(NativeSymbol('description detection')) === 'Symbol(description detection)'
      var thisSymbolValue = uncurryThis(SymbolPrototype.valueOf)
      var symbolDescriptiveString = uncurryThis(SymbolPrototype.toString)
      var regexp = /^Symbol\((.*)\)[^)]+$/
      var replace = uncurryThis(''.replace)
      var stringSlice = uncurryThis(''.slice)

      defineBuiltInAccessor(SymbolPrototype, 'description', {
        configurable: true,
        get: function description () {
          var symbol = thisSymbolValue(this)
          if (hasOwn(EmptyStringDescriptionStore, symbol)) return ''
          var string = symbolDescriptiveString(symbol)
          var desc = NATIVE_SYMBOL ? stringSlice(string, 7, -1) : replace(string, regexp, '$1')
          return desc === '' ? undefined : desc
        }
      })

      $({ global: true, constructor: true, forced: true }, {
        Symbol: SymbolWrapper
      })
    }
  }, { '../internals/copy-constructor-properties': 70, '../internals/define-built-in-accessor': 80, '../internals/descriptors': 85, '../internals/export': 107, '../internals/function-uncurry-this': 120, '../internals/global-this': 131, '../internals/has-own-property': 132, '../internals/is-callable': 147, '../internals/object-is-prototype-of': 194, '../internals/to-string': 269 }],
  501: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var getBuiltIn = require('../internals/get-built-in')
    var hasOwn = require('../internals/has-own-property')
    var toString = require('../internals/to-string')
    var shared = require('../internals/shared')
    var NATIVE_SYMBOL_REGISTRY = require('../internals/symbol-registry-detection')

    var StringToSymbolRegistry = shared('string-to-symbol-registry')
    var SymbolToStringRegistry = shared('symbol-to-string-registry')

    // `Symbol.for` method
    // https://tc39.es/ecma262/#sec-symbol.for
    $({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY }, {
      for: function (key) {
        var string = toString(key)
        if (hasOwn(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string]
        var symbol = getBuiltIn('Symbol')(string)
        StringToSymbolRegistry[string] = symbol
        SymbolToStringRegistry[symbol] = string
        return symbol
      }
    })
  }, { '../internals/export': 107, '../internals/get-built-in': 123, '../internals/has-own-property': 132, '../internals/shared': 239, '../internals/symbol-registry-detection': 254, '../internals/to-string': 269 }],
  502: [function (require, module, exports) {
    'use strict'
    var defineWellKnownSymbol = require('../internals/well-known-symbol-define')

    // `Symbol.hasInstance` well-known symbol
    // https://tc39.es/ecma262/#sec-symbol.hasinstance
    defineWellKnownSymbol('hasInstance')
  }, { '../internals/well-known-symbol-define': 283 }],
  503: [function (require, module, exports) {
    'use strict'
    var defineWellKnownSymbol = require('../internals/well-known-symbol-define')

    // `Symbol.isConcatSpreadable` well-known symbol
    // https://tc39.es/ecma262/#sec-symbol.isconcatspreadable
    defineWellKnownSymbol('isConcatSpreadable')
  }, { '../internals/well-known-symbol-define': 283 }],
  504: [function (require, module, exports) {
    'use strict'
    var defineWellKnownSymbol = require('../internals/well-known-symbol-define')

    // `Symbol.iterator` well-known symbol
    // https://tc39.es/ecma262/#sec-symbol.iterator
    defineWellKnownSymbol('iterator')
  }, { '../internals/well-known-symbol-define': 283 }],
  505: [function (require, module, exports) {
    'use strict'
    // TODO: Remove this module from `core-js@4` since it's split to modules listed below
    require('../modules/es.symbol.constructor')
    require('../modules/es.symbol.for')
    require('../modules/es.symbol.key-for')
    require('../modules/es.json.stringify')
    require('../modules/es.object.get-own-property-symbols')
  }, { '../modules/es.json.stringify': 352, '../modules/es.object.get-own-property-symbols': 400, '../modules/es.symbol.constructor': 499, '../modules/es.symbol.for': 501, '../modules/es.symbol.key-for': 506 }],
  506: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var hasOwn = require('../internals/has-own-property')
    var isSymbol = require('../internals/is-symbol')
    var tryToString = require('../internals/try-to-string')
    var shared = require('../internals/shared')
    var NATIVE_SYMBOL_REGISTRY = require('../internals/symbol-registry-detection')

    var SymbolToStringRegistry = shared('symbol-to-string-registry')

    // `Symbol.keyFor` method
    // https://tc39.es/ecma262/#sec-symbol.keyfor
    $({ target: 'Symbol', stat: true, forced: !NATIVE_SYMBOL_REGISTRY }, {
      keyFor: function keyFor (sym) {
        if (!isSymbol(sym)) throw new TypeError(tryToString(sym) + ' is not a symbol')
        if (hasOwn(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym]
      }
    })
  }, { '../internals/export': 107, '../internals/has-own-property': 132, '../internals/is-symbol': 157, '../internals/shared': 239, '../internals/symbol-registry-detection': 254, '../internals/try-to-string': 271 }],
  507: [function (require, module, exports) {
    'use strict'
    var defineWellKnownSymbol = require('../internals/well-known-symbol-define')

    // `Symbol.matchAll` well-known symbol
    // https://tc39.es/ecma262/#sec-symbol.matchall
    defineWellKnownSymbol('matchAll')
  }, { '../internals/well-known-symbol-define': 283 }],
  508: [function (require, module, exports) {
    'use strict'
    var defineWellKnownSymbol = require('../internals/well-known-symbol-define')

    // `Symbol.match` well-known symbol
    // https://tc39.es/ecma262/#sec-symbol.match
    defineWellKnownSymbol('match')
  }, { '../internals/well-known-symbol-define': 283 }],
  509: [function (require, module, exports) {
    'use strict'
    var defineWellKnownSymbol = require('../internals/well-known-symbol-define')

    // `Symbol.replace` well-known symbol
    // https://tc39.es/ecma262/#sec-symbol.replace
    defineWellKnownSymbol('replace')
  }, { '../internals/well-known-symbol-define': 283 }],
  510: [function (require, module, exports) {
    'use strict'
    var defineWellKnownSymbol = require('../internals/well-known-symbol-define')

    // `Symbol.search` well-known symbol
    // https://tc39.es/ecma262/#sec-symbol.search
    defineWellKnownSymbol('search')
  }, { '../internals/well-known-symbol-define': 283 }],
  511: [function (require, module, exports) {
    'use strict'
    var defineWellKnownSymbol = require('../internals/well-known-symbol-define')

    // `Symbol.species` well-known symbol
    // https://tc39.es/ecma262/#sec-symbol.species
    defineWellKnownSymbol('species')
  }, { '../internals/well-known-symbol-define': 283 }],
  512: [function (require, module, exports) {
    'use strict'
    var defineWellKnownSymbol = require('../internals/well-known-symbol-define')

    // `Symbol.split` well-known symbol
    // https://tc39.es/ecma262/#sec-symbol.split
    defineWellKnownSymbol('split')
  }, { '../internals/well-known-symbol-define': 283 }],
  513: [function (require, module, exports) {
    'use strict'
    var defineWellKnownSymbol = require('../internals/well-known-symbol-define')
    var defineSymbolToPrimitive = require('../internals/symbol-define-to-primitive')

    // `Symbol.toPrimitive` well-known symbol
    // https://tc39.es/ecma262/#sec-symbol.toprimitive
    defineWellKnownSymbol('toPrimitive')

    // `Symbol.prototype[@@toPrimitive]` method
    // https://tc39.es/ecma262/#sec-symbol.prototype-@@toprimitive
    defineSymbolToPrimitive()
  }, { '../internals/symbol-define-to-primitive': 253, '../internals/well-known-symbol-define': 283 }],
  514: [function (require, module, exports) {
    'use strict'
    var getBuiltIn = require('../internals/get-built-in')
    var defineWellKnownSymbol = require('../internals/well-known-symbol-define')
    var setToStringTag = require('../internals/set-to-string-tag')

    // `Symbol.toStringTag` well-known symbol
    // https://tc39.es/ecma262/#sec-symbol.tostringtag
    defineWellKnownSymbol('toStringTag')

    // `Symbol.prototype[@@toStringTag]` property
    // https://tc39.es/ecma262/#sec-symbol.prototype-@@tostringtag
    setToStringTag(getBuiltIn('Symbol'), 'Symbol')
  }, { '../internals/get-built-in': 123, '../internals/set-to-string-tag': 235, '../internals/well-known-symbol-define': 283 }],
  515: [function (require, module, exports) {
    'use strict'
    var defineWellKnownSymbol = require('../internals/well-known-symbol-define')

    // `Symbol.unscopables` well-known symbol
    // https://tc39.es/ecma262/#sec-symbol.unscopables
    defineWellKnownSymbol('unscopables')
  }, { '../internals/well-known-symbol-define': 283 }],
  516: [function (require, module, exports) {
    'use strict'
    var ArrayBufferViewCore = require('../internals/array-buffer-view-core')
    var lengthOfArrayLike = require('../internals/length-of-array-like')
    var toIntegerOrInfinity = require('../internals/to-integer-or-infinity')

    var aTypedArray = ArrayBufferViewCore.aTypedArray
    var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod

    // `%TypedArray%.prototype.at` method
    // https://tc39.es/ecma262/#sec-%typedarray%.prototype.at
    exportTypedArrayMethod('at', function at (index) {
      var O = aTypedArray(this)
      var len = lengthOfArrayLike(O)
      var relativeIndex = toIntegerOrInfinity(index)
      var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex
      return (k < 0 || k >= len) ? undefined : O[k]
    })
  }, { '../internals/array-buffer-view-core': 37, '../internals/length-of-array-like': 167, '../internals/to-integer-or-infinity': 261 }],
  517: [function (require, module, exports) {
    'use strict'
    var uncurryThis = require('../internals/function-uncurry-this')
    var ArrayBufferViewCore = require('../internals/array-buffer-view-core')
    var $ArrayCopyWithin = require('../internals/array-copy-within')

    var u$ArrayCopyWithin = uncurryThis($ArrayCopyWithin)
    var aTypedArray = ArrayBufferViewCore.aTypedArray
    var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod

    // `%TypedArray%.prototype.copyWithin` method
    // https://tc39.es/ecma262/#sec-%typedarray%.prototype.copywithin
    exportTypedArrayMethod('copyWithin', function copyWithin (target, start /* , end */) {
      return u$ArrayCopyWithin(aTypedArray(this), target, start, arguments.length > 2 ? arguments[2] : undefined)
    })
  }, { '../internals/array-buffer-view-core': 37, '../internals/array-copy-within': 39, '../internals/function-uncurry-this': 120 }],
  518: [function (require, module, exports) {
    'use strict'
    var ArrayBufferViewCore = require('../internals/array-buffer-view-core')
    var $every = require('../internals/array-iteration').every

    var aTypedArray = ArrayBufferViewCore.aTypedArray
    var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod

    // `%TypedArray%.prototype.every` method
    // https://tc39.es/ecma262/#sec-%typedarray%.prototype.every
    exportTypedArrayMethod('every', function every (callbackfn /* , thisArg */) {
      return $every(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined)
    })
  }, { '../internals/array-buffer-view-core': 37, '../internals/array-iteration': 46 }],
  519: [function (require, module, exports) {
    'use strict'
    var ArrayBufferViewCore = require('../internals/array-buffer-view-core')
    var $fill = require('../internals/array-fill')
    var toBigInt = require('../internals/to-big-int')
    var classof = require('../internals/classof')
    var call = require('../internals/function-call')
    var uncurryThis = require('../internals/function-uncurry-this')
    var fails = require('../internals/fails')

    var aTypedArray = ArrayBufferViewCore.aTypedArray
    var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod
    var slice = uncurryThis(''.slice)

    // V8 ~ Chrome < 59, Safari < 14.1, FF < 55, Edge <=18
    var CONVERSION_BUG = fails(function () {
      var count = 0
      // eslint-disable-next-line es/no-typed-arrays -- safe
      new Int8Array(2).fill({ valueOf: function () { return count++ } })
      return count !== 1
    })

    // `%TypedArray%.prototype.fill` method
    // https://tc39.es/ecma262/#sec-%typedarray%.prototype.fill
    exportTypedArrayMethod('fill', function fill (value /* , start, end */) {
      var length = arguments.length
      aTypedArray(this)
      var actualValue = slice(classof(this), 0, 3) === 'Big' ? toBigInt(value) : +value
      return call($fill, this, actualValue, length > 1 ? arguments[1] : undefined, length > 2 ? arguments[2] : undefined)
    }, CONVERSION_BUG)
  }, { '../internals/array-buffer-view-core': 37, '../internals/array-fill': 40, '../internals/classof': 66, '../internals/fails': 108, '../internals/function-call': 116, '../internals/function-uncurry-this': 120, '../internals/to-big-int': 258 }],
  520: [function (require, module, exports) {
    'use strict'
    var ArrayBufferViewCore = require('../internals/array-buffer-view-core')
    var $filter = require('../internals/array-iteration').filter
    var fromSpeciesAndList = require('../internals/typed-array-from-species-and-list')

    var aTypedArray = ArrayBufferViewCore.aTypedArray
    var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod

    // `%TypedArray%.prototype.filter` method
    // https://tc39.es/ecma262/#sec-%typedarray%.prototype.filter
    exportTypedArrayMethod('filter', function filter (callbackfn /* , thisArg */) {
      var list = $filter(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined)
      return fromSpeciesAndList(this, list)
    })
  }, { '../internals/array-buffer-view-core': 37, '../internals/array-iteration': 46, '../internals/typed-array-from-species-and-list': 274 }],
  521: [function (require, module, exports) {
    'use strict'
    var ArrayBufferViewCore = require('../internals/array-buffer-view-core')
    var $findIndex = require('../internals/array-iteration').findIndex

    var aTypedArray = ArrayBufferViewCore.aTypedArray
    var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod

    // `%TypedArray%.prototype.findIndex` method
    // https://tc39.es/ecma262/#sec-%typedarray%.prototype.findindex
    exportTypedArrayMethod('findIndex', function findIndex (predicate /* , thisArg */) {
      return $findIndex(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined)
    })
  }, { '../internals/array-buffer-view-core': 37, '../internals/array-iteration': 46 }],
  522: [function (require, module, exports) {
    'use strict'
    var ArrayBufferViewCore = require('../internals/array-buffer-view-core')
    var $findLastIndex = require('../internals/array-iteration-from-last').findLastIndex

    var aTypedArray = ArrayBufferViewCore.aTypedArray
    var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod

    // `%TypedArray%.prototype.findLastIndex` method
    // https://tc39.es/ecma262/#sec-%typedarray%.prototype.findlastindex
    exportTypedArrayMethod('findLastIndex', function findLastIndex (predicate /* , thisArg */) {
      return $findLastIndex(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined)
    })
  }, { '../internals/array-buffer-view-core': 37, '../internals/array-iteration-from-last': 45 }],
  523: [function (require, module, exports) {
    'use strict'
    var ArrayBufferViewCore = require('../internals/array-buffer-view-core')
    var $findLast = require('../internals/array-iteration-from-last').findLast

    var aTypedArray = ArrayBufferViewCore.aTypedArray
    var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod

    // `%TypedArray%.prototype.findLast` method
    // https://tc39.es/ecma262/#sec-%typedarray%.prototype.findlast
    exportTypedArrayMethod('findLast', function findLast (predicate /* , thisArg */) {
      return $findLast(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined)
    })
  }, { '../internals/array-buffer-view-core': 37, '../internals/array-iteration-from-last': 45 }],
  524: [function (require, module, exports) {
    'use strict'
    var ArrayBufferViewCore = require('../internals/array-buffer-view-core')
    var $find = require('../internals/array-iteration').find

    var aTypedArray = ArrayBufferViewCore.aTypedArray
    var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod

    // `%TypedArray%.prototype.find` method
    // https://tc39.es/ecma262/#sec-%typedarray%.prototype.find
    exportTypedArrayMethod('find', function find (predicate /* , thisArg */) {
      return $find(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined)
    })
  }, { '../internals/array-buffer-view-core': 37, '../internals/array-iteration': 46 }],
  525: [function (require, module, exports) {
    'use strict'
    var createTypedArrayConstructor = require('../internals/typed-array-constructor')

    // `Float32Array` constructor
    // https://tc39.es/ecma262/#sec-typedarray-objects
    createTypedArrayConstructor('Float32', function (init) {
      return function Float32Array (data, byteOffset, length) {
        return init(this, data, byteOffset, length)
      }
    })
  }, { '../internals/typed-array-constructor': 272 }],
  526: [function (require, module, exports) {
    'use strict'
    var createTypedArrayConstructor = require('../internals/typed-array-constructor')

    // `Float64Array` constructor
    // https://tc39.es/ecma262/#sec-typedarray-objects
    createTypedArrayConstructor('Float64', function (init) {
      return function Float64Array (data, byteOffset, length) {
        return init(this, data, byteOffset, length)
      }
    })
  }, { '../internals/typed-array-constructor': 272 }],
  527: [function (require, module, exports) {
    'use strict'
    var ArrayBufferViewCore = require('../internals/array-buffer-view-core')
    var $forEach = require('../internals/array-iteration').forEach

    var aTypedArray = ArrayBufferViewCore.aTypedArray
    var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod

    // `%TypedArray%.prototype.forEach` method
    // https://tc39.es/ecma262/#sec-%typedarray%.prototype.foreach
    exportTypedArrayMethod('forEach', function forEach (callbackfn /* , thisArg */) {
      $forEach(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined)
    })
  }, { '../internals/array-buffer-view-core': 37, '../internals/array-iteration': 46 }],
  528: [function (require, module, exports) {
    'use strict'
    var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = require('../internals/typed-array-constructors-require-wrappers')
    var exportTypedArrayStaticMethod = require('../internals/array-buffer-view-core').exportTypedArrayStaticMethod
    var typedArrayFrom = require('../internals/typed-array-from')

    // `%TypedArray%.from` method
    // https://tc39.es/ecma262/#sec-%typedarray%.from
    exportTypedArrayStaticMethod('from', typedArrayFrom, TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS)
  }, { '../internals/array-buffer-view-core': 37, '../internals/typed-array-constructors-require-wrappers': 273, '../internals/typed-array-from': 275 }],
  529: [function (require, module, exports) {
    'use strict'
    var ArrayBufferViewCore = require('../internals/array-buffer-view-core')
    var $includes = require('../internals/array-includes').includes

    var aTypedArray = ArrayBufferViewCore.aTypedArray
    var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod

    // `%TypedArray%.prototype.includes` method
    // https://tc39.es/ecma262/#sec-%typedarray%.prototype.includes
    exportTypedArrayMethod('includes', function includes (searchElement /* , fromIndex */) {
      return $includes(aTypedArray(this), searchElement, arguments.length > 1 ? arguments[1] : undefined)
    })
  }, { '../internals/array-buffer-view-core': 37, '../internals/array-includes': 44 }],
  530: [function (require, module, exports) {
    'use strict'
    var ArrayBufferViewCore = require('../internals/array-buffer-view-core')
    var $indexOf = require('../internals/array-includes').indexOf

    var aTypedArray = ArrayBufferViewCore.aTypedArray
    var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod

    // `%TypedArray%.prototype.indexOf` method
    // https://tc39.es/ecma262/#sec-%typedarray%.prototype.indexof
    exportTypedArrayMethod('indexOf', function indexOf (searchElement /* , fromIndex */) {
      return $indexOf(aTypedArray(this), searchElement, arguments.length > 1 ? arguments[1] : undefined)
    })
  }, { '../internals/array-buffer-view-core': 37, '../internals/array-includes': 44 }],
  531: [function (require, module, exports) {
    'use strict'
    var createTypedArrayConstructor = require('../internals/typed-array-constructor')

    // `Int16Array` constructor
    // https://tc39.es/ecma262/#sec-typedarray-objects
    createTypedArrayConstructor('Int16', function (init) {
      return function Int16Array (data, byteOffset, length) {
        return init(this, data, byteOffset, length)
      }
    })
  }, { '../internals/typed-array-constructor': 272 }],
  532: [function (require, module, exports) {
    'use strict'
    var createTypedArrayConstructor = require('../internals/typed-array-constructor')

    // `Int32Array` constructor
    // https://tc39.es/ecma262/#sec-typedarray-objects
    createTypedArrayConstructor('Int32', function (init) {
      return function Int32Array (data, byteOffset, length) {
        return init(this, data, byteOffset, length)
      }
    })
  }, { '../internals/typed-array-constructor': 272 }],
  533: [function (require, module, exports) {
    'use strict'
    var createTypedArrayConstructor = require('../internals/typed-array-constructor')

    // `Int8Array` constructor
    // https://tc39.es/ecma262/#sec-typedarray-objects
    createTypedArrayConstructor('Int8', function (init) {
      return function Int8Array (data, byteOffset, length) {
        return init(this, data, byteOffset, length)
      }
    })
  }, { '../internals/typed-array-constructor': 272 }],
  534: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')
    var fails = require('../internals/fails')
    var uncurryThis = require('../internals/function-uncurry-this')
    var ArrayBufferViewCore = require('../internals/array-buffer-view-core')
    var ArrayIterators = require('../modules/es.array.iterator')
    var wellKnownSymbol = require('../internals/well-known-symbol')

    var ITERATOR = wellKnownSymbol('iterator')
    var Uint8Array = globalThis.Uint8Array
    var arrayValues = uncurryThis(ArrayIterators.values)
    var arrayKeys = uncurryThis(ArrayIterators.keys)
    var arrayEntries = uncurryThis(ArrayIterators.entries)
    var aTypedArray = ArrayBufferViewCore.aTypedArray
    var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod
    var TypedArrayPrototype = Uint8Array && Uint8Array.prototype

    var GENERIC = !fails(function () {
      TypedArrayPrototype[ITERATOR].call([1])
    })

    var ITERATOR_IS_VALUES = !!TypedArrayPrototype &&
  TypedArrayPrototype.values &&
  TypedArrayPrototype[ITERATOR] === TypedArrayPrototype.values &&
  TypedArrayPrototype.values.name === 'values'

    var typedArrayValues = function values () {
      return arrayValues(aTypedArray(this))
    }

    // `%TypedArray%.prototype.entries` method
    // https://tc39.es/ecma262/#sec-%typedarray%.prototype.entries
    exportTypedArrayMethod('entries', function entries () {
      return arrayEntries(aTypedArray(this))
    }, GENERIC)
    // `%TypedArray%.prototype.keys` method
    // https://tc39.es/ecma262/#sec-%typedarray%.prototype.keys
    exportTypedArrayMethod('keys', function keys () {
      return arrayKeys(aTypedArray(this))
    }, GENERIC)
    // `%TypedArray%.prototype.values` method
    // https://tc39.es/ecma262/#sec-%typedarray%.prototype.values
    exportTypedArrayMethod('values', typedArrayValues, GENERIC || !ITERATOR_IS_VALUES, { name: 'values' })
    // `%TypedArray%.prototype[@@iterator]` method
    // https://tc39.es/ecma262/#sec-%typedarray%.prototype-@@iterator
    exportTypedArrayMethod(ITERATOR, typedArrayValues, GENERIC || !ITERATOR_IS_VALUES, { name: 'values' })
  }, { '../internals/array-buffer-view-core': 37, '../internals/fails': 108, '../internals/function-uncurry-this': 120, '../internals/global-this': 131, '../internals/well-known-symbol': 285, '../modules/es.array.iterator': 314 }],
  535: [function (require, module, exports) {
    'use strict'
    var ArrayBufferViewCore = require('../internals/array-buffer-view-core')
    var uncurryThis = require('../internals/function-uncurry-this')

    var aTypedArray = ArrayBufferViewCore.aTypedArray
    var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod
    var $join = uncurryThis([].join)

    // `%TypedArray%.prototype.join` method
    // https://tc39.es/ecma262/#sec-%typedarray%.prototype.join
    exportTypedArrayMethod('join', function join (separator) {
      return $join(aTypedArray(this), separator)
    })
  }, { '../internals/array-buffer-view-core': 37, '../internals/function-uncurry-this': 120 }],
  536: [function (require, module, exports) {
    'use strict'
    var ArrayBufferViewCore = require('../internals/array-buffer-view-core')
    var apply = require('../internals/function-apply')
    var $lastIndexOf = require('../internals/array-last-index-of')

    var aTypedArray = ArrayBufferViewCore.aTypedArray
    var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod

    // `%TypedArray%.prototype.lastIndexOf` method
    // https://tc39.es/ecma262/#sec-%typedarray%.prototype.lastindexof
    exportTypedArrayMethod('lastIndexOf', function lastIndexOf (searchElement /* , fromIndex */) {
      var length = arguments.length
      return apply($lastIndexOf, aTypedArray(this), length > 1 ? [searchElement, arguments[1]] : [searchElement])
    })
  }, { '../internals/array-buffer-view-core': 37, '../internals/array-last-index-of': 47, '../internals/function-apply': 112 }],
  537: [function (require, module, exports) {
    'use strict'
    var ArrayBufferViewCore = require('../internals/array-buffer-view-core')
    var $map = require('../internals/array-iteration').map
    var typedArraySpeciesConstructor = require('../internals/typed-array-species-constructor')

    var aTypedArray = ArrayBufferViewCore.aTypedArray
    var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod

    // `%TypedArray%.prototype.map` method
    // https://tc39.es/ecma262/#sec-%typedarray%.prototype.map
    exportTypedArrayMethod('map', function map (mapfn /* , thisArg */) {
      return $map(aTypedArray(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
        return new (typedArraySpeciesConstructor(O))(length)
      })
    })
  }, { '../internals/array-buffer-view-core': 37, '../internals/array-iteration': 46, '../internals/typed-array-species-constructor': 276 }],
  538: [function (require, module, exports) {
    'use strict'
    var ArrayBufferViewCore = require('../internals/array-buffer-view-core')
    var TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS = require('../internals/typed-array-constructors-require-wrappers')

    var aTypedArrayConstructor = ArrayBufferViewCore.aTypedArrayConstructor
    var exportTypedArrayStaticMethod = ArrayBufferViewCore.exportTypedArrayStaticMethod

    // `%TypedArray%.of` method
    // https://tc39.es/ecma262/#sec-%typedarray%.of
    exportTypedArrayStaticMethod('of', function of (/* ...items */) {
      var index = 0
      var length = arguments.length
      var result = new (aTypedArrayConstructor(this))(length)
      while (length > index) result[index] = arguments[index++]
      return result
    }, TYPED_ARRAYS_CONSTRUCTORS_REQUIRES_WRAPPERS)
  }, { '../internals/array-buffer-view-core': 37, '../internals/typed-array-constructors-require-wrappers': 273 }],
  539: [function (require, module, exports) {
    'use strict'
    var ArrayBufferViewCore = require('../internals/array-buffer-view-core')
    var $reduceRight = require('../internals/array-reduce').right

    var aTypedArray = ArrayBufferViewCore.aTypedArray
    var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod

    // `%TypedArray%.prototype.reduceRight` method
    // https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduceright
    exportTypedArrayMethod('reduceRight', function reduceRight (callbackfn /* , initialValue */) {
      var length = arguments.length
      return $reduceRight(aTypedArray(this), callbackfn, length, length > 1 ? arguments[1] : undefined)
    })
  }, { '../internals/array-buffer-view-core': 37, '../internals/array-reduce': 50 }],
  540: [function (require, module, exports) {
    'use strict'
    var ArrayBufferViewCore = require('../internals/array-buffer-view-core')
    var $reduce = require('../internals/array-reduce').left

    var aTypedArray = ArrayBufferViewCore.aTypedArray
    var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod

    // `%TypedArray%.prototype.reduce` method
    // https://tc39.es/ecma262/#sec-%typedarray%.prototype.reduce
    exportTypedArrayMethod('reduce', function reduce (callbackfn /* , initialValue */) {
      var length = arguments.length
      return $reduce(aTypedArray(this), callbackfn, length, length > 1 ? arguments[1] : undefined)
    })
  }, { '../internals/array-buffer-view-core': 37, '../internals/array-reduce': 50 }],
  541: [function (require, module, exports) {
    'use strict'
    var ArrayBufferViewCore = require('../internals/array-buffer-view-core')

    var aTypedArray = ArrayBufferViewCore.aTypedArray
    var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod
    var floor = Math.floor

    // `%TypedArray%.prototype.reverse` method
    // https://tc39.es/ecma262/#sec-%typedarray%.prototype.reverse
    exportTypedArrayMethod('reverse', function reverse () {
      var that = this
      var length = aTypedArray(that).length
      var middle = floor(length / 2)
      var index = 0
      var value
      while (index < middle) {
        value = that[index]
        that[index++] = that[--length]
        that[length] = value
      } return that
    })
  }, { '../internals/array-buffer-view-core': 37 }],
  542: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')
    var call = require('../internals/function-call')
    var ArrayBufferViewCore = require('../internals/array-buffer-view-core')
    var lengthOfArrayLike = require('../internals/length-of-array-like')
    var toOffset = require('../internals/to-offset')
    var toIndexedObject = require('../internals/to-object')
    var fails = require('../internals/fails')

    var RangeError = globalThis.RangeError
    var Int8Array = globalThis.Int8Array
    var Int8ArrayPrototype = Int8Array && Int8Array.prototype
    var $set = Int8ArrayPrototype && Int8ArrayPrototype.set
    var aTypedArray = ArrayBufferViewCore.aTypedArray
    var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod

    var WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS = !fails(function () {
      // eslint-disable-next-line es/no-typed-arrays -- required for testing
      var array = new Uint8ClampedArray(2)
      call($set, array, { length: 1, 0: 3 }, 1)
      return array[1] !== 3
    })

    // https://bugs.chromium.org/p/v8/issues/detail?id=11294 and other
    var TO_OBJECT_BUG = WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS && ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS && fails(function () {
      var array = new Int8Array(2)
      array.set(1)
      array.set('2', 1)
      return array[0] !== 0 || array[1] !== 2
    })

    // `%TypedArray%.prototype.set` method
    // https://tc39.es/ecma262/#sec-%typedarray%.prototype.set
    exportTypedArrayMethod('set', function set (arrayLike /* , offset */) {
      aTypedArray(this)
      var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1)
      var src = toIndexedObject(arrayLike)
      if (WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS) return call($set, this, src, offset)
      var length = this.length
      var len = lengthOfArrayLike(src)
      var index = 0
      if (len + offset > length) throw new RangeError('Wrong length')
      while (index < len) this[offset + index] = src[index++]
    }, !WORKS_WITH_OBJECTS_AND_GENERIC_ON_TYPED_ARRAYS || TO_OBJECT_BUG)
  }, { '../internals/array-buffer-view-core': 37, '../internals/fails': 108, '../internals/function-call': 116, '../internals/global-this': 131, '../internals/length-of-array-like': 167, '../internals/to-object': 263, '../internals/to-offset': 264 }],
  543: [function (require, module, exports) {
    'use strict'
    var ArrayBufferViewCore = require('../internals/array-buffer-view-core')
    var typedArraySpeciesConstructor = require('../internals/typed-array-species-constructor')
    var fails = require('../internals/fails')
    var arraySlice = require('../internals/array-slice')

    var aTypedArray = ArrayBufferViewCore.aTypedArray
    var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod

    var FORCED = fails(function () {
      // eslint-disable-next-line es/no-typed-arrays -- required for testing
      new Int8Array(1).slice()
    })

    // `%TypedArray%.prototype.slice` method
    // https://tc39.es/ecma262/#sec-%typedarray%.prototype.slice
    exportTypedArrayMethod('slice', function slice (start, end) {
      var list = arraySlice(aTypedArray(this), start, end)
      var C = typedArraySpeciesConstructor(this)
      var index = 0
      var length = list.length
      var result = new C(length)
      while (length > index) result[index] = list[index++]
      return result
    }, FORCED)
  }, { '../internals/array-buffer-view-core': 37, '../internals/array-slice': 52, '../internals/fails': 108, '../internals/typed-array-species-constructor': 276 }],
  544: [function (require, module, exports) {
    'use strict'
    var ArrayBufferViewCore = require('../internals/array-buffer-view-core')
    var $some = require('../internals/array-iteration').some

    var aTypedArray = ArrayBufferViewCore.aTypedArray
    var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod

    // `%TypedArray%.prototype.some` method
    // https://tc39.es/ecma262/#sec-%typedarray%.prototype.some
    exportTypedArrayMethod('some', function some (callbackfn /* , thisArg */) {
      return $some(aTypedArray(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined)
    })
  }, { '../internals/array-buffer-view-core': 37, '../internals/array-iteration': 46 }],
  545: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')
    var uncurryThis = require('../internals/function-uncurry-this-clause')
    var fails = require('../internals/fails')
    var aCallable = require('../internals/a-callable')
    var internalSort = require('../internals/array-sort')
    var ArrayBufferViewCore = require('../internals/array-buffer-view-core')
    var FF = require('../internals/environment-ff-version')
    var IE_OR_EDGE = require('../internals/environment-is-ie-or-edge')
    var V8 = require('../internals/environment-v8-version')
    var WEBKIT = require('../internals/environment-webkit-version')

    var aTypedArray = ArrayBufferViewCore.aTypedArray
    var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod
    var Uint16Array = globalThis.Uint16Array
    var nativeSort = Uint16Array && uncurryThis(Uint16Array.prototype.sort)

    // WebKit
    var ACCEPT_INCORRECT_ARGUMENTS = !!nativeSort && !(fails(function () {
      nativeSort(new Uint16Array(2), null)
    }) && fails(function () {
      nativeSort(new Uint16Array(2), {})
    }))

    var STABLE_SORT = !!nativeSort && !fails(function () {
      // feature detection can be too slow, so check engines versions
      if (V8) return V8 < 74
      if (FF) return FF < 67
      if (IE_OR_EDGE) return true
      if (WEBKIT) return WEBKIT < 602

      var array = new Uint16Array(516)
      var expected = Array(516)
      var index, mod

      for (index = 0; index < 516; index++) {
        mod = index % 4
        array[index] = 515 - index
        expected[index] = index - 2 * mod + 3
      }

      nativeSort(array, function (a, b) {
        return (a / 4 | 0) - (b / 4 | 0)
      })

      for (index = 0; index < 516; index++) {
        if (array[index] !== expected[index]) return true
      }
    })

    var getSortCompare = function (comparefn) {
      return function (x, y) {
        if (comparefn !== undefined) return +comparefn(x, y) || 0
        // eslint-disable-next-line no-self-compare -- NaN check
        if (y !== y) return -1
        // eslint-disable-next-line no-self-compare -- NaN check
        if (x !== x) return 1
        if (x === 0 && y === 0) return 1 / x > 0 && 1 / y < 0 ? 1 : -1
        return x > y
      }
    }

    // `%TypedArray%.prototype.sort` method
    // https://tc39.es/ecma262/#sec-%typedarray%.prototype.sort
    exportTypedArrayMethod('sort', function sort (comparefn) {
      if (comparefn !== undefined) aCallable(comparefn)
      if (STABLE_SORT) return nativeSort(this, comparefn)

      return internalSort(aTypedArray(this), getSortCompare(comparefn))
    }, !STABLE_SORT || ACCEPT_INCORRECT_ARGUMENTS)
  }, { '../internals/a-callable': 23, '../internals/array-buffer-view-core': 37, '../internals/array-sort': 53, '../internals/environment-ff-version': 93, '../internals/environment-is-ie-or-edge': 94, '../internals/environment-v8-version': 100, '../internals/environment-webkit-version': 101, '../internals/fails': 108, '../internals/function-uncurry-this-clause': 119, '../internals/global-this': 131 }],
  546: [function (require, module, exports) {
    'use strict'
    var ArrayBufferViewCore = require('../internals/array-buffer-view-core')
    var toLength = require('../internals/to-length')
    var toAbsoluteIndex = require('../internals/to-absolute-index')
    var typedArraySpeciesConstructor = require('../internals/typed-array-species-constructor')

    var aTypedArray = ArrayBufferViewCore.aTypedArray
    var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod

    // `%TypedArray%.prototype.subarray` method
    // https://tc39.es/ecma262/#sec-%typedarray%.prototype.subarray
    exportTypedArrayMethod('subarray', function subarray (begin, end) {
      var O = aTypedArray(this)
      var length = O.length
      var beginIndex = toAbsoluteIndex(begin, length)
      var C = typedArraySpeciesConstructor(O)
      return new C(
        O.buffer,
        O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - beginIndex)
      )
    })
  }, { '../internals/array-buffer-view-core': 37, '../internals/to-absolute-index': 257, '../internals/to-length': 262, '../internals/typed-array-species-constructor': 276 }],
  547: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')
    var apply = require('../internals/function-apply')
    var ArrayBufferViewCore = require('../internals/array-buffer-view-core')
    var fails = require('../internals/fails')
    var arraySlice = require('../internals/array-slice')

    var Int8Array = globalThis.Int8Array
    var aTypedArray = ArrayBufferViewCore.aTypedArray
    var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod
    var $toLocaleString = [].toLocaleString

    // iOS Safari 6.x fails here
    var TO_LOCALE_STRING_BUG = !!Int8Array && fails(function () {
      $toLocaleString.call(new Int8Array(1))
    })

    var FORCED = fails(function () {
      return [1, 2].toLocaleString() !== new Int8Array([1, 2]).toLocaleString()
    }) || !fails(function () {
      Int8Array.prototype.toLocaleString.call([1, 2])
    })

    // `%TypedArray%.prototype.toLocaleString` method
    // https://tc39.es/ecma262/#sec-%typedarray%.prototype.tolocalestring
    exportTypedArrayMethod('toLocaleString', function toLocaleString () {
      return apply(
        $toLocaleString,
        TO_LOCALE_STRING_BUG ? arraySlice(aTypedArray(this)) : aTypedArray(this),
        arraySlice(arguments)
      )
    }, FORCED)
  }, { '../internals/array-buffer-view-core': 37, '../internals/array-slice': 52, '../internals/fails': 108, '../internals/function-apply': 112, '../internals/global-this': 131 }],
  548: [function (require, module, exports) {
    'use strict'
    var arrayToReversed = require('../internals/array-to-reversed')
    var ArrayBufferViewCore = require('../internals/array-buffer-view-core')

    var aTypedArray = ArrayBufferViewCore.aTypedArray
    var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod
    var getTypedArrayConstructor = ArrayBufferViewCore.getTypedArrayConstructor

    // `%TypedArray%.prototype.toReversed` method
    // https://tc39.es/ecma262/#sec-%typedarray%.prototype.toreversed
    exportTypedArrayMethod('toReversed', function toReversed () {
      return arrayToReversed(aTypedArray(this), getTypedArrayConstructor(this))
    })
  }, { '../internals/array-buffer-view-core': 37, '../internals/array-to-reversed': 56 }],
  549: [function (require, module, exports) {
    'use strict'
    var ArrayBufferViewCore = require('../internals/array-buffer-view-core')
    var uncurryThis = require('../internals/function-uncurry-this')
    var aCallable = require('../internals/a-callable')
    var arrayFromConstructorAndList = require('../internals/array-from-constructor-and-list')

    var aTypedArray = ArrayBufferViewCore.aTypedArray
    var getTypedArrayConstructor = ArrayBufferViewCore.getTypedArrayConstructor
    var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod
    var sort = uncurryThis(ArrayBufferViewCore.TypedArrayPrototype.sort)

    // `%TypedArray%.prototype.toSorted` method
    // https://tc39.es/ecma262/#sec-%typedarray%.prototype.tosorted
    exportTypedArrayMethod('toSorted', function toSorted (compareFn) {
      if (compareFn !== undefined) aCallable(compareFn)
      var O = aTypedArray(this)
      var A = arrayFromConstructorAndList(getTypedArrayConstructor(O), O)
      return sort(A, compareFn)
    })
  }, { '../internals/a-callable': 23, '../internals/array-buffer-view-core': 37, '../internals/array-from-constructor-and-list': 42, '../internals/function-uncurry-this': 120 }],
  550: [function (require, module, exports) {
    'use strict'
    var exportTypedArrayMethod = require('../internals/array-buffer-view-core').exportTypedArrayMethod
    var fails = require('../internals/fails')
    var globalThis = require('../internals/global-this')
    var uncurryThis = require('../internals/function-uncurry-this')

    var Uint8Array = globalThis.Uint8Array
    var Uint8ArrayPrototype = Uint8Array && Uint8Array.prototype || {}
    var arrayToString = [].toString
    var join = uncurryThis([].join)

    if (fails(function () { arrayToString.call({}) })) {
      arrayToString = function toString () {
        return join(this)
      }
    }

    var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString !== arrayToString

    // `%TypedArray%.prototype.toString` method
    // https://tc39.es/ecma262/#sec-%typedarray%.prototype.tostring
    exportTypedArrayMethod('toString', arrayToString, IS_NOT_ARRAY_METHOD)
  }, { '../internals/array-buffer-view-core': 37, '../internals/fails': 108, '../internals/function-uncurry-this': 120, '../internals/global-this': 131 }],
  551: [function (require, module, exports) {
    'use strict'
    var createTypedArrayConstructor = require('../internals/typed-array-constructor')

    // `Uint16Array` constructor
    // https://tc39.es/ecma262/#sec-typedarray-objects
    createTypedArrayConstructor('Uint16', function (init) {
      return function Uint16Array (data, byteOffset, length) {
        return init(this, data, byteOffset, length)
      }
    })
  }, { '../internals/typed-array-constructor': 272 }],
  552: [function (require, module, exports) {
    'use strict'
    var createTypedArrayConstructor = require('../internals/typed-array-constructor')

    // `Uint32Array` constructor
    // https://tc39.es/ecma262/#sec-typedarray-objects
    createTypedArrayConstructor('Uint32', function (init) {
      return function Uint32Array (data, byteOffset, length) {
        return init(this, data, byteOffset, length)
      }
    })
  }, { '../internals/typed-array-constructor': 272 }],
  553: [function (require, module, exports) {
    'use strict'
    var createTypedArrayConstructor = require('../internals/typed-array-constructor')

    // `Uint8Array` constructor
    // https://tc39.es/ecma262/#sec-typedarray-objects
    createTypedArrayConstructor('Uint8', function (init) {
      return function Uint8Array (data, byteOffset, length) {
        return init(this, data, byteOffset, length)
      }
    })
  }, { '../internals/typed-array-constructor': 272 }],
  554: [function (require, module, exports) {
    'use strict'
    var createTypedArrayConstructor = require('../internals/typed-array-constructor')

    // `Uint8ClampedArray` constructor
    // https://tc39.es/ecma262/#sec-typedarray-objects
    createTypedArrayConstructor('Uint8', function (init) {
      return function Uint8ClampedArray (data, byteOffset, length) {
        return init(this, data, byteOffset, length)
      }
    }, true)
  }, { '../internals/typed-array-constructor': 272 }],
  555: [function (require, module, exports) {
    'use strict'
    var arrayWith = require('../internals/array-with')
    var ArrayBufferViewCore = require('../internals/array-buffer-view-core')
    var isBigIntArray = require('../internals/is-big-int-array')
    var toIntegerOrInfinity = require('../internals/to-integer-or-infinity')
    var toBigInt = require('../internals/to-big-int')

    var aTypedArray = ArrayBufferViewCore.aTypedArray
    var getTypedArrayConstructor = ArrayBufferViewCore.getTypedArrayConstructor
    var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod

    var PROPER_ORDER = !!(function () {
      try {
        // eslint-disable-next-line no-throw-literal, es/no-typed-arrays, es/no-array-prototype-with -- required for testing
        new Int8Array(1).with(2, { valueOf: function () { throw 8 } })
      } catch (error) {
        // some early implementations, like WebKit, does not follow the final semantic
        // https://github.com/tc39/proposal-change-array-by-copy/pull/86
        return error === 8
      }
    }())

    // `%TypedArray%.prototype.with` method
    // https://tc39.es/ecma262/#sec-%typedarray%.prototype.with
    exportTypedArrayMethod('with', {
      with: function (index, value) {
        var O = aTypedArray(this)
        var relativeIndex = toIntegerOrInfinity(index)
        var actualValue = isBigIntArray(O) ? toBigInt(value) : +value
        return arrayWith(O, getTypedArrayConstructor(O), relativeIndex, actualValue)
      }
    }.with, !PROPER_ORDER)
  }, { '../internals/array-buffer-view-core': 37, '../internals/array-with': 57, '../internals/is-big-int-array': 146, '../internals/to-big-int': 258, '../internals/to-integer-or-infinity': 261 }],
  556: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var uncurryThis = require('../internals/function-uncurry-this')
    var toString = require('../internals/to-string')

    var fromCharCode = String.fromCharCode
    var charAt = uncurryThis(''.charAt)
    var exec = uncurryThis(/./.exec)
    var stringSlice = uncurryThis(''.slice)

    var hex2 = /^[\da-f]{2}$/i
    var hex4 = /^[\da-f]{4}$/i

    // `unescape` method
    // https://tc39.es/ecma262/#sec-unescape-string
    $({ global: true }, {
      unescape: function unescape (string) {
        var str = toString(string)
        var result = ''
        var length = str.length
        var index = 0
        var chr, part
        while (index < length) {
          chr = charAt(str, index++)
          if (chr === '%') {
            if (charAt(str, index) === 'u') {
              part = stringSlice(str, index + 1, index + 5)
              if (exec(hex4, part)) {
                result += fromCharCode(parseInt(part, 16))
                index += 5
                continue
              }
            } else {
              part = stringSlice(str, index, index + 2)
              if (exec(hex2, part)) {
                result += fromCharCode(parseInt(part, 16))
                index += 2
                continue
              }
            }
          }
          result += chr
        } return result
      }
    })
  }, { '../internals/export': 107, '../internals/function-uncurry-this': 120, '../internals/to-string': 269 }],
  557: [function (require, module, exports) {
    'use strict'
    var FREEZING = require('../internals/freezing')
    var globalThis = require('../internals/global-this')
    var uncurryThis = require('../internals/function-uncurry-this')
    var defineBuiltIns = require('../internals/define-built-ins')
    var InternalMetadataModule = require('../internals/internal-metadata')
    var collection = require('../internals/collection')
    var collectionWeak = require('../internals/collection-weak')
    var isObject = require('../internals/is-object')
    var enforceInternalState = require('../internals/internal-state').enforce
    var fails = require('../internals/fails')
    var NATIVE_WEAK_MAP = require('../internals/weak-map-basic-detection')

    var $Object = Object
    // eslint-disable-next-line es/no-array-isarray -- safe
    var isArray = Array.isArray
    // eslint-disable-next-line es/no-object-isextensible -- safe
    var isExtensible = $Object.isExtensible
    // eslint-disable-next-line es/no-object-isfrozen -- safe
    var isFrozen = $Object.isFrozen
    // eslint-disable-next-line es/no-object-issealed -- safe
    var isSealed = $Object.isSealed
    // eslint-disable-next-line es/no-object-freeze -- safe
    var freeze = $Object.freeze
    // eslint-disable-next-line es/no-object-seal -- safe
    var seal = $Object.seal

    var IS_IE11 = !globalThis.ActiveXObject && 'ActiveXObject' in globalThis
    var InternalWeakMap

    var wrapper = function (init) {
      return function WeakMap () {
        return init(this, arguments.length ? arguments[0] : undefined)
      }
    }

    // `WeakMap` constructor
    // https://tc39.es/ecma262/#sec-weakmap-constructor
    var $WeakMap = collection('WeakMap', wrapper, collectionWeak)
    var WeakMapPrototype = $WeakMap.prototype
    var nativeSet = uncurryThis(WeakMapPrototype.set)

    // Chakra Edge bug: adding frozen arrays to WeakMap unfreeze them
    var hasMSEdgeFreezingBug = function () {
      return FREEZING && fails(function () {
        var frozenArray = freeze([])
        nativeSet(new $WeakMap(), frozenArray, 1)
        return !isFrozen(frozenArray)
      })
    }

    // IE11 WeakMap frozen keys fix
    // We can't use feature detection because it crash some old IE builds
    // https://github.com/zloirock/core-js/issues/485
    if (NATIVE_WEAK_MAP) {
      if (IS_IE11) {
        InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true)
        InternalMetadataModule.enable()
        var nativeDelete = uncurryThis(WeakMapPrototype.delete)
        var nativeHas = uncurryThis(WeakMapPrototype.has)
        var nativeGet = uncurryThis(WeakMapPrototype.get)
        defineBuiltIns(WeakMapPrototype, {
          delete: function (key) {
            if (isObject(key) && !isExtensible(key)) {
              var state = enforceInternalState(this)
              if (!state.frozen) state.frozen = new InternalWeakMap()
              return nativeDelete(this, key) || state.frozen.delete(key)
            } return nativeDelete(this, key)
          },
          has: function has (key) {
            if (isObject(key) && !isExtensible(key)) {
              var state = enforceInternalState(this)
              if (!state.frozen) state.frozen = new InternalWeakMap()
              return nativeHas(this, key) || state.frozen.has(key)
            } return nativeHas(this, key)
          },
          get: function get (key) {
            if (isObject(key) && !isExtensible(key)) {
              var state = enforceInternalState(this)
              if (!state.frozen) state.frozen = new InternalWeakMap()
              return nativeHas(this, key) ? nativeGet(this, key) : state.frozen.get(key)
            } return nativeGet(this, key)
          },
          set: function set (key, value) {
            if (isObject(key) && !isExtensible(key)) {
              var state = enforceInternalState(this)
              if (!state.frozen) state.frozen = new InternalWeakMap()
              nativeHas(this, key) ? nativeSet(this, key, value) : state.frozen.set(key, value)
            } else nativeSet(this, key, value)
            return this
          }
        })
      // Chakra Edge frozen keys fix
      } else if (hasMSEdgeFreezingBug()) {
        defineBuiltIns(WeakMapPrototype, {
          set: function set (key, value) {
            var arrayIntegrityLevel
            if (isArray(key)) {
              if (isFrozen(key)) arrayIntegrityLevel = freeze
              else if (isSealed(key)) arrayIntegrityLevel = seal
            }
            nativeSet(this, key, value)
            if (arrayIntegrityLevel) arrayIntegrityLevel(key)
            return this
          }
        })
      }
    }
  }, { '../internals/collection': 69, '../internals/collection-weak': 68, '../internals/define-built-ins': 82, '../internals/fails': 108, '../internals/freezing': 111, '../internals/function-uncurry-this': 120, '../internals/global-this': 131, '../internals/internal-metadata': 142, '../internals/internal-state': 143, '../internals/is-object': 153, '../internals/weak-map-basic-detection': 282 }],
  558: [function (require, module, exports) {
    'use strict'
    // TODO: Remove this module from `core-js@4` since it's replaced to module below
    require('../modules/es.weak-map.constructor')
  }, { '../modules/es.weak-map.constructor': 557 }],
  559: [function (require, module, exports) {
    'use strict'
    var collection = require('../internals/collection')
    var collectionWeak = require('../internals/collection-weak')

    // `WeakSet` constructor
    // https://tc39.es/ecma262/#sec-weakset-constructor
    collection('WeakSet', function (init) {
      return function WeakSet () { return init(this, arguments.length ? arguments[0] : undefined) }
    }, collectionWeak)
  }, { '../internals/collection': 69, '../internals/collection-weak': 68 }],
  560: [function (require, module, exports) {
    'use strict'
    // TODO: Remove this module from `core-js@4` since it's replaced to module below
    require('../modules/es.weak-set.constructor')
  }, { '../modules/es.weak-set.constructor': 559 }],
  561: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var map = require('../internals/async-iterator-map')
    var IS_PURE = require('../internals/is-pure')

    // `AsyncIterator.prototype.map` method
    // https://github.com/tc39/proposal-async-iterator-helpers
    $({ target: 'AsyncIterator', proto: true, real: true, forced: IS_PURE }, {
      map: map
    })
  }, { '../internals/async-iterator-map': 60, '../internals/export': 107, '../internals/is-pure': 155 }],
  562: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var call = require('../internals/function-call')
    var aCallable = require('../internals/a-callable')
    var anObject = require('../internals/an-object')
    var isObject = require('../internals/is-object')
    var getBuiltIn = require('../internals/get-built-in')
    var getIteratorDirect = require('../internals/get-iterator-direct')
    var closeAsyncIteration = require('../internals/async-iterator-close')

    var Promise = getBuiltIn('Promise')
    var $TypeError = TypeError

    // `AsyncIterator.prototype.reduce` method
    // https://github.com/tc39/proposal-async-iterator-helpers
    $({ target: 'AsyncIterator', proto: true, real: true }, {
      reduce: function reduce (reducer /* , initialValue */) {
        anObject(this)
        aCallable(reducer)
        var record = getIteratorDirect(this)
        var iterator = record.iterator
        var next = record.next
        var noInitial = arguments.length < 2
        var accumulator = noInitial ? undefined : arguments[1]
        var counter = 0

        return new Promise(function (resolve, reject) {
          var ifAbruptCloseAsyncIterator = function (error) {
            closeAsyncIteration(iterator, reject, error, reject)
          }

          var loop = function () {
            try {
              Promise.resolve(anObject(call(next, iterator))).then(function (step) {
                try {
                  if (anObject(step).done) {
                    noInitial ? reject(new $TypeError('Reduce of empty iterator with no initial value')) : resolve(accumulator)
                  } else {
                    var value = step.value
                    if (noInitial) {
                      noInitial = false
                      accumulator = value
                      loop()
                    } else {
                      try {
                        var result = reducer(accumulator, value, counter)

                        var handler = function ($result) {
                          accumulator = $result
                          loop()
                        }

                        if (isObject(result)) Promise.resolve(result).then(handler, ifAbruptCloseAsyncIterator)
                        else handler(result)
                      } catch (error3) { ifAbruptCloseAsyncIterator(error3) }
                    }
                  }
                  counter++
                } catch (error2) { reject(error2) }
              }, reject)
            } catch (error) { reject(error) }
          }

          loop()
        })
      }
    })
  }, { '../internals/a-callable': 23, '../internals/an-object': 30, '../internals/async-iterator-close': 58, '../internals/export': 107, '../internals/function-call': 116, '../internals/get-built-in': 123, '../internals/get-iterator-direct': 124, '../internals/is-object': 153 }],
  563: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var globalThis = require('../internals/global-this')
    var anInstance = require('../internals/an-instance')
    var anObject = require('../internals/an-object')
    var isCallable = require('../internals/is-callable')
    var getPrototypeOf = require('../internals/object-get-prototype-of')
    var defineBuiltInAccessor = require('../internals/define-built-in-accessor')
    var createProperty = require('../internals/create-property')
    var fails = require('../internals/fails')
    var hasOwn = require('../internals/has-own-property')
    var wellKnownSymbol = require('../internals/well-known-symbol')
    var IteratorPrototype = require('../internals/iterators-core').IteratorPrototype
    var DESCRIPTORS = require('../internals/descriptors')
    var IS_PURE = require('../internals/is-pure')

    var CONSTRUCTOR = 'constructor'
    var ITERATOR = 'Iterator'
    var TO_STRING_TAG = wellKnownSymbol('toStringTag')

    var $TypeError = TypeError
    var NativeIterator = globalThis[ITERATOR]

    // FF56- have non-standard global helper `Iterator`
    var FORCED = IS_PURE ||
  !isCallable(NativeIterator) ||
  NativeIterator.prototype !== IteratorPrototype ||
  // FF44- non-standard `Iterator` passes previous tests
  !fails(function () { NativeIterator({}) })

    var IteratorConstructor = function Iterator () {
      anInstance(this, IteratorPrototype)
      if (getPrototypeOf(this) === IteratorPrototype) throw new $TypeError('Abstract class Iterator not directly constructable')
    }

    var defineIteratorPrototypeAccessor = function (key, value) {
      if (DESCRIPTORS) {
        defineBuiltInAccessor(IteratorPrototype, key, {
          configurable: true,
          get: function () {
            return value
          },
          set: function (replacement) {
            anObject(this)
            if (this === IteratorPrototype) throw new $TypeError("You can't redefine this property")
            if (hasOwn(this, key)) this[key] = replacement
            else createProperty(this, key, replacement)
          }
        })
      } else IteratorPrototype[key] = value
    }

    if (!hasOwn(IteratorPrototype, TO_STRING_TAG)) defineIteratorPrototypeAccessor(TO_STRING_TAG, ITERATOR)

    if (FORCED || !hasOwn(IteratorPrototype, CONSTRUCTOR) || IteratorPrototype[CONSTRUCTOR] === Object) {
      defineIteratorPrototypeAccessor(CONSTRUCTOR, IteratorConstructor)
    }

    IteratorConstructor.prototype = IteratorPrototype

    // `Iterator` constructor
    // https://github.com/tc39/proposal-iterator-helpers
    $({ global: true, constructor: true, forced: FORCED }, {
      Iterator: IteratorConstructor
    })
  }, { '../internals/an-instance': 29, '../internals/an-object': 30, '../internals/create-property': 77, '../internals/define-built-in-accessor': 80, '../internals/descriptors': 85, '../internals/export': 107, '../internals/fails': 108, '../internals/global-this': 131, '../internals/has-own-property': 132, '../internals/is-callable': 147, '../internals/is-pure': 155, '../internals/iterators-core': 165, '../internals/object-get-prototype-of': 192, '../internals/well-known-symbol': 285 }],
  564: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var map = require('../internals/iterator-map')
    var IS_PURE = require('../internals/is-pure')

    // `Iterator.prototype.map` method
    // https://github.com/tc39/proposal-iterator-helpers
    $({ target: 'Iterator', proto: true, real: true, forced: IS_PURE }, {
      map: map
    })
  }, { '../internals/export': 107, '../internals/is-pure': 155, '../internals/iterator-map': 164 }],
  565: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var iterate = require('../internals/iterate')
    var aCallable = require('../internals/a-callable')
    var anObject = require('../internals/an-object')
    var getIteratorDirect = require('../internals/get-iterator-direct')

    var $TypeError = TypeError

    // `Iterator.prototype.reduce` method
    // https://github.com/tc39/proposal-iterator-helpers
    $({ target: 'Iterator', proto: true, real: true }, {
      reduce: function reduce (reducer /* , initialValue */) {
        anObject(this)
        aCallable(reducer)
        var record = getIteratorDirect(this)
        var noInitial = arguments.length < 2
        var accumulator = noInitial ? undefined : arguments[1]
        var counter = 0
        iterate(record, function (value) {
          if (noInitial) {
            noInitial = false
            accumulator = value
          } else {
            accumulator = reducer(accumulator, value, counter)
          }
          counter++
        }, { IS_RECORD: true })
        if (noInitial) throw new $TypeError('Reduce of empty iterator with no initial value')
        return accumulator
      }
    })
  }, { '../internals/a-callable': 23, '../internals/an-object': 30, '../internals/export': 107, '../internals/get-iterator-direct': 124, '../internals/iterate': 159 }],
  566: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var globalThis = require('../internals/global-this')
    var getBuiltIn = require('../internals/get-built-in')
    var uncurryThis = require('../internals/function-uncurry-this')
    var call = require('../internals/function-call')
    var fails = require('../internals/fails')
    var toString = require('../internals/to-string')
    var validateArgumentsLength = require('../internals/validate-arguments-length')
    var c2i = require('../internals/base64-map').c2i

    var disallowed = /[^\d+/a-z]/i
    var whitespaces = /[\t\n\f\r ]+/g
    var finalEq = /[=]{1,2}$/

    var $atob = getBuiltIn('atob')
    var fromCharCode = String.fromCharCode
    var charAt = uncurryThis(''.charAt)
    var replace = uncurryThis(''.replace)
    var exec = uncurryThis(disallowed.exec)

    var BASIC = !!$atob && !fails(function () {
      return $atob('aGk=') !== 'hi'
    })

    var NO_SPACES_IGNORE = BASIC && fails(function () {
      return $atob(' ') !== ''
    })

    var NO_ENCODING_CHECK = BASIC && !fails(function () {
      $atob('a')
    })

    var NO_ARG_RECEIVING_CHECK = BASIC && !fails(function () {
      $atob()
    })

    var WRONG_ARITY = BASIC && $atob.length !== 1

    var FORCED = !BASIC || NO_SPACES_IGNORE || NO_ENCODING_CHECK || NO_ARG_RECEIVING_CHECK || WRONG_ARITY

    // `atob` method
    // https://html.spec.whatwg.org/multipage/webappapis.html#dom-atob
    $({ global: true, bind: true, enumerable: true, forced: FORCED }, {
      atob: function atob (data) {
        validateArgumentsLength(arguments.length, 1)
        // `webpack` dev server bug on IE global methods - use call(fn, global, ...)
        if (BASIC && !NO_SPACES_IGNORE && !NO_ENCODING_CHECK) return call($atob, globalThis, data)
        var string = replace(toString(data), whitespaces, '')
        var output = ''
        var position = 0
        var bc = 0
        var length, chr, bs
        if (string.length % 4 === 0) {
          string = replace(string, finalEq, '')
        }
        length = string.length
        if (length % 4 === 1 || exec(disallowed, string)) {
          throw new (getBuiltIn('DOMException'))('The string is not correctly encoded', 'InvalidCharacterError')
        }
        while (position < length) {
          chr = charAt(string, position++)
          bs = bc % 4 ? bs * 64 + c2i[chr] : c2i[chr]
          if (bc++ % 4) output += fromCharCode(255 & bs >> (-2 * bc & 6))
        } return output
      }
    })
  }, { '../internals/base64-map': 62, '../internals/export': 107, '../internals/fails': 108, '../internals/function-call': 116, '../internals/function-uncurry-this': 120, '../internals/get-built-in': 123, '../internals/global-this': 131, '../internals/to-string': 269, '../internals/validate-arguments-length': 281 }],
  567: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var globalThis = require('../internals/global-this')
    var getBuiltIn = require('../internals/get-built-in')
    var uncurryThis = require('../internals/function-uncurry-this')
    var call = require('../internals/function-call')
    var fails = require('../internals/fails')
    var toString = require('../internals/to-string')
    var validateArgumentsLength = require('../internals/validate-arguments-length')
    var i2c = require('../internals/base64-map').i2c

    var $btoa = getBuiltIn('btoa')
    var charAt = uncurryThis(''.charAt)
    var charCodeAt = uncurryThis(''.charCodeAt)

    var BASIC = !!$btoa && !fails(function () {
      return $btoa('hi') !== 'aGk='
    })

    var NO_ARG_RECEIVING_CHECK = BASIC && !fails(function () {
      $btoa()
    })

    var WRONG_ARG_CONVERSION = BASIC && fails(function () {
      return $btoa(null) !== 'bnVsbA=='
    })

    var WRONG_ARITY = BASIC && $btoa.length !== 1

    // `btoa` method
    // https://html.spec.whatwg.org/multipage/webappapis.html#dom-btoa
    $({ global: true, bind: true, enumerable: true, forced: !BASIC || NO_ARG_RECEIVING_CHECK || WRONG_ARG_CONVERSION || WRONG_ARITY }, {
      btoa: function btoa (data) {
        validateArgumentsLength(arguments.length, 1)
        // `webpack` dev server bug on IE global methods - use call(fn, global, ...)
        if (BASIC) return call($btoa, globalThis, toString(data))
        var string = toString(data)
        var output = ''
        var position = 0
        var map = i2c
        var block, charCode
        while (charAt(string, position) || (map = '=', position % 1)) {
          charCode = charCodeAt(string, position += 3 / 4)
          if (charCode > 0xFF) {
            throw new (getBuiltIn('DOMException'))('The string contains characters outside of the Latin1 range', 'InvalidCharacterError')
          }
          block = block << 8 | charCode
          output += charAt(map, 63 & block >> 8 - position % 1 * 8)
        } return output
      }
    })
  }, { '../internals/base64-map': 62, '../internals/export': 107, '../internals/fails': 108, '../internals/function-call': 116, '../internals/function-uncurry-this': 120, '../internals/get-built-in': 123, '../internals/global-this': 131, '../internals/to-string': 269, '../internals/validate-arguments-length': 281 }],
  568: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var globalThis = require('../internals/global-this')
    var clearImmediate = require('../internals/task').clear

    // `clearImmediate` method
    // http://w3c.github.io/setImmediate/#si-clearImmediate
    $({ global: true, bind: true, enumerable: true, forced: globalThis.clearImmediate !== clearImmediate }, {
      clearImmediate: clearImmediate
    })
  }, { '../internals/export': 107, '../internals/global-this': 131, '../internals/task': 255 }],
  569: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')
    var DOMIterables = require('../internals/dom-iterables')
    var DOMTokenListPrototype = require('../internals/dom-token-list-prototype')
    var forEach = require('../internals/array-for-each')
    var createNonEnumerableProperty = require('../internals/create-non-enumerable-property')

    var handlePrototype = function (CollectionPrototype) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype && CollectionPrototype.forEach !== forEach) {
        try {
          createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach)
        } catch (error) {
          CollectionPrototype.forEach = forEach
        }
      }
    }

    for (var COLLECTION_NAME in DOMIterables) {
      if (DOMIterables[COLLECTION_NAME]) {
        handlePrototype(globalThis[COLLECTION_NAME] && globalThis[COLLECTION_NAME].prototype)
      }
    }

    handlePrototype(DOMTokenListPrototype)
  }, { '../internals/array-for-each': 41, '../internals/create-non-enumerable-property': 75, '../internals/dom-iterables': 90, '../internals/dom-token-list-prototype': 91, '../internals/global-this': 131 }],
  570: [function (require, module, exports) {
    'use strict'
    var globalThis = require('../internals/global-this')
    var DOMIterables = require('../internals/dom-iterables')
    var DOMTokenListPrototype = require('../internals/dom-token-list-prototype')
    var ArrayIteratorMethods = require('../modules/es.array.iterator')
    var createNonEnumerableProperty = require('../internals/create-non-enumerable-property')
    var setToStringTag = require('../internals/set-to-string-tag')
    var wellKnownSymbol = require('../internals/well-known-symbol')

    var ITERATOR = wellKnownSymbol('iterator')
    var ArrayValues = ArrayIteratorMethods.values

    var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
      if (CollectionPrototype) {
        // some Chrome versions have non-configurable methods on DOMTokenList
        if (CollectionPrototype[ITERATOR] !== ArrayValues) {
          try {
            createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues)
          } catch (error) {
            CollectionPrototype[ITERATOR] = ArrayValues
          }
        }
        setToStringTag(CollectionPrototype, COLLECTION_NAME, true)
        if (DOMIterables[COLLECTION_NAME]) {
          for (var METHOD_NAME in ArrayIteratorMethods) {
          // some Chrome versions have non-configurable methods on DOMTokenList
            if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) {
              try {
                createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME])
              } catch (error) {
                CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME]
              }
            }
          }
        }
      }
    }

    for (var COLLECTION_NAME in DOMIterables) {
      handlePrototype(globalThis[COLLECTION_NAME] && globalThis[COLLECTION_NAME].prototype, COLLECTION_NAME)
    }

    handlePrototype(DOMTokenListPrototype, 'DOMTokenList')
  }, { '../internals/create-non-enumerable-property': 75, '../internals/dom-iterables': 90, '../internals/dom-token-list-prototype': 91, '../internals/global-this': 131, '../internals/set-to-string-tag': 235, '../internals/well-known-symbol': 285, '../modules/es.array.iterator': 314 }],
  571: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var getBuiltIn = require('../internals/get-built-in')
    var getBuiltInNodeModule = require('../internals/get-built-in-node-module')
    var fails = require('../internals/fails')
    var create = require('../internals/object-create')
    var createPropertyDescriptor = require('../internals/create-property-descriptor')
    var defineProperty = require('../internals/object-define-property').f
    var defineBuiltIn = require('../internals/define-built-in')
    var defineBuiltInAccessor = require('../internals/define-built-in-accessor')
    var hasOwn = require('../internals/has-own-property')
    var anInstance = require('../internals/an-instance')
    var anObject = require('../internals/an-object')
    var errorToString = require('../internals/error-to-string')
    var normalizeStringArgument = require('../internals/normalize-string-argument')
    var DOMExceptionConstants = require('../internals/dom-exception-constants')
    var clearErrorStack = require('../internals/error-stack-clear')
    var InternalStateModule = require('../internals/internal-state')
    var DESCRIPTORS = require('../internals/descriptors')
    var IS_PURE = require('../internals/is-pure')

    var DOM_EXCEPTION = 'DOMException'
    var DATA_CLONE_ERR = 'DATA_CLONE_ERR'
    var Error = getBuiltIn('Error')
    // NodeJS < 17.0 does not expose `DOMException` to global
    var NativeDOMException = getBuiltIn(DOM_EXCEPTION) || (function () {
      try {
        // NodeJS < 15.0 does not expose `MessageChannel` to global
        var MessageChannel = getBuiltIn('MessageChannel') || getBuiltInNodeModule('worker_threads').MessageChannel
        // eslint-disable-next-line es/no-weak-map, unicorn/require-post-message-target-origin -- safe
        new MessageChannel().port1.postMessage(new WeakMap())
      } catch (error) {
        if (error.name === DATA_CLONE_ERR && error.code === 25) return error.constructor
      }
    })()
    var NativeDOMExceptionPrototype = NativeDOMException && NativeDOMException.prototype
    var ErrorPrototype = Error.prototype
    var setInternalState = InternalStateModule.set
    var getInternalState = InternalStateModule.getterFor(DOM_EXCEPTION)
    var HAS_STACK = 'stack' in new Error(DOM_EXCEPTION)

    var codeFor = function (name) {
      return hasOwn(DOMExceptionConstants, name) && DOMExceptionConstants[name].m ? DOMExceptionConstants[name].c : 0
    }

    var $DOMException = function DOMException () {
      anInstance(this, DOMExceptionPrototype)
      var argumentsLength = arguments.length
      var message = normalizeStringArgument(argumentsLength < 1 ? undefined : arguments[0])
      var name = normalizeStringArgument(argumentsLength < 2 ? undefined : arguments[1], 'Error')
      var code = codeFor(name)
      setInternalState(this, {
        type: DOM_EXCEPTION,
        name: name,
        message: message,
        code: code
      })
      if (!DESCRIPTORS) {
        this.name = name
        this.message = message
        this.code = code
      }
      if (HAS_STACK) {
        var error = new Error(message)
        error.name = DOM_EXCEPTION
        defineProperty(this, 'stack', createPropertyDescriptor(1, clearErrorStack(error.stack, 1)))
      }
    }

    var DOMExceptionPrototype = $DOMException.prototype = create(ErrorPrototype)

    var createGetterDescriptor = function (get) {
      return { enumerable: true, configurable: true, get: get }
    }

    var getterFor = function (key) {
      return createGetterDescriptor(function () {
        return getInternalState(this)[key]
      })
    }

    if (DESCRIPTORS) {
      // `DOMException.prototype.code` getter
      defineBuiltInAccessor(DOMExceptionPrototype, 'code', getterFor('code'))
      // `DOMException.prototype.message` getter
      defineBuiltInAccessor(DOMExceptionPrototype, 'message', getterFor('message'))
      // `DOMException.prototype.name` getter
      defineBuiltInAccessor(DOMExceptionPrototype, 'name', getterFor('name'))
    }

    defineProperty(DOMExceptionPrototype, 'constructor', createPropertyDescriptor(1, $DOMException))

    // FF36- DOMException is a function, but can't be constructed
    var INCORRECT_CONSTRUCTOR = fails(function () {
      return !(new NativeDOMException() instanceof Error)
    })

    // Safari 10.1 / Chrome 32- / IE8- DOMException.prototype.toString bugs
    var INCORRECT_TO_STRING = INCORRECT_CONSTRUCTOR || fails(function () {
      return ErrorPrototype.toString !== errorToString || String(new NativeDOMException(1, 2)) !== '2: 1'
    })

    // Deno 1.6.3- DOMException.prototype.code just missed
    var INCORRECT_CODE = INCORRECT_CONSTRUCTOR || fails(function () {
      return new NativeDOMException(1, 'DataCloneError').code !== 25
    })

    // Deno 1.6.3- DOMException constants just missed
    var MISSED_CONSTANTS = INCORRECT_CONSTRUCTOR ||
  NativeDOMException[DATA_CLONE_ERR] !== 25 ||
  NativeDOMExceptionPrototype[DATA_CLONE_ERR] !== 25

    var FORCED_CONSTRUCTOR = IS_PURE ? INCORRECT_TO_STRING || INCORRECT_CODE || MISSED_CONSTANTS : INCORRECT_CONSTRUCTOR

    // `DOMException` constructor
    // https://webidl.spec.whatwg.org/#idl-DOMException
    $({ global: true, constructor: true, forced: FORCED_CONSTRUCTOR }, {
      DOMException: FORCED_CONSTRUCTOR ? $DOMException : NativeDOMException
    })

    var PolyfilledDOMException = getBuiltIn(DOM_EXCEPTION)
    var PolyfilledDOMExceptionPrototype = PolyfilledDOMException.prototype

    if (INCORRECT_TO_STRING && (IS_PURE || NativeDOMException === PolyfilledDOMException)) {
      defineBuiltIn(PolyfilledDOMExceptionPrototype, 'toString', errorToString)
    }

    if (INCORRECT_CODE && DESCRIPTORS && NativeDOMException === PolyfilledDOMException) {
      defineBuiltInAccessor(PolyfilledDOMExceptionPrototype, 'code', createGetterDescriptor(function () {
        return codeFor(anObject(this).name)
      }))
    }

    // `DOMException` constants
    for (var key in DOMExceptionConstants) {
      if (hasOwn(DOMExceptionConstants, key)) {
        var constant = DOMExceptionConstants[key]
        var constantName = constant.s
        var descriptor = createPropertyDescriptor(6, constant.c)
        if (!hasOwn(PolyfilledDOMException, constantName)) {
          defineProperty(PolyfilledDOMException, constantName, descriptor)
        }
        if (!hasOwn(PolyfilledDOMExceptionPrototype, constantName)) {
          defineProperty(PolyfilledDOMExceptionPrototype, constantName, descriptor)
        }
      }
    }
  }, { '../internals/an-instance': 29, '../internals/an-object': 30, '../internals/create-property-descriptor': 76, '../internals/define-built-in': 81, '../internals/define-built-in-accessor': 80, '../internals/descriptors': 85, '../internals/dom-exception-constants': 89, '../internals/error-stack-clear': 103, '../internals/error-to-string': 106, '../internals/export': 107, '../internals/fails': 108, '../internals/get-built-in': 123, '../internals/get-built-in-node-module': 121, '../internals/has-own-property': 132, '../internals/internal-state': 143, '../internals/is-pure': 155, '../internals/normalize-string-argument': 179, '../internals/object-create': 185, '../internals/object-define-property': 187 }],
  572: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var globalThis = require('../internals/global-this')
    var getBuiltIn = require('../internals/get-built-in')
    var createPropertyDescriptor = require('../internals/create-property-descriptor')
    var defineProperty = require('../internals/object-define-property').f
    var hasOwn = require('../internals/has-own-property')
    var anInstance = require('../internals/an-instance')
    var inheritIfRequired = require('../internals/inherit-if-required')
    var normalizeStringArgument = require('../internals/normalize-string-argument')
    var DOMExceptionConstants = require('../internals/dom-exception-constants')
    var clearErrorStack = require('../internals/error-stack-clear')
    var DESCRIPTORS = require('../internals/descriptors')
    var IS_PURE = require('../internals/is-pure')

    var DOM_EXCEPTION = 'DOMException'
    var Error = getBuiltIn('Error')
    var NativeDOMException = getBuiltIn(DOM_EXCEPTION)

    var $DOMException = function DOMException () {
      anInstance(this, DOMExceptionPrototype)
      var argumentsLength = arguments.length
      var message = normalizeStringArgument(argumentsLength < 1 ? undefined : arguments[0])
      var name = normalizeStringArgument(argumentsLength < 2 ? undefined : arguments[1], 'Error')
      var that = new NativeDOMException(message, name)
      var error = new Error(message)
      error.name = DOM_EXCEPTION
      defineProperty(that, 'stack', createPropertyDescriptor(1, clearErrorStack(error.stack, 1)))
      inheritIfRequired(that, this, $DOMException)
      return that
    }

    var DOMExceptionPrototype = $DOMException.prototype = NativeDOMException.prototype

    var ERROR_HAS_STACK = 'stack' in new Error(DOM_EXCEPTION)
    var DOM_EXCEPTION_HAS_STACK = 'stack' in new NativeDOMException(1, 2)

    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    var descriptor = NativeDOMException && DESCRIPTORS && Object.getOwnPropertyDescriptor(globalThis, DOM_EXCEPTION)

    // Bun ~ 0.1.1 DOMException have incorrect descriptor and we can't redefine it
    // https://github.com/Jarred-Sumner/bun/issues/399
    var BUGGY_DESCRIPTOR = !!descriptor && !(descriptor.writable && descriptor.configurable)

    var FORCED_CONSTRUCTOR = ERROR_HAS_STACK && !BUGGY_DESCRIPTOR && !DOM_EXCEPTION_HAS_STACK

    // `DOMException` constructor patch for `.stack` where it's required
    // https://webidl.spec.whatwg.org/#es-DOMException-specialness
    $({ global: true, constructor: true, forced: IS_PURE || FORCED_CONSTRUCTOR }, { // TODO: fix export logic
      DOMException: FORCED_CONSTRUCTOR ? $DOMException : NativeDOMException
    })

    var PolyfilledDOMException = getBuiltIn(DOM_EXCEPTION)
    var PolyfilledDOMExceptionPrototype = PolyfilledDOMException.prototype

    if (PolyfilledDOMExceptionPrototype.constructor !== PolyfilledDOMException) {
      if (!IS_PURE) {
        defineProperty(PolyfilledDOMExceptionPrototype, 'constructor', createPropertyDescriptor(1, PolyfilledDOMException))
      }

      for (var key in DOMExceptionConstants) {
        if (hasOwn(DOMExceptionConstants, key)) {
          var constant = DOMExceptionConstants[key]
          var constantName = constant.s
          if (!hasOwn(PolyfilledDOMException, constantName)) {
            defineProperty(PolyfilledDOMException, constantName, createPropertyDescriptor(6, constant.c))
          }
        }
      }
    }
  }, { '../internals/an-instance': 29, '../internals/create-property-descriptor': 76, '../internals/descriptors': 85, '../internals/dom-exception-constants': 89, '../internals/error-stack-clear': 103, '../internals/export': 107, '../internals/get-built-in': 123, '../internals/global-this': 131, '../internals/has-own-property': 132, '../internals/inherit-if-required': 139, '../internals/is-pure': 155, '../internals/normalize-string-argument': 179, '../internals/object-define-property': 187 }],
  573: [function (require, module, exports) {
    'use strict'
    var getBuiltIn = require('../internals/get-built-in')
    var setToStringTag = require('../internals/set-to-string-tag')

    var DOM_EXCEPTION = 'DOMException'

    // `DOMException.prototype[@@toStringTag]` property
    setToStringTag(getBuiltIn(DOM_EXCEPTION), DOM_EXCEPTION)
  }, { '../internals/get-built-in': 123, '../internals/set-to-string-tag': 235 }],
  574: [function (require, module, exports) {
    'use strict'
    // TODO: Remove this module from `core-js@4` since it's split to modules listed below
    require('../modules/web.clear-immediate')
    require('../modules/web.set-immediate')
  }, { '../modules/web.clear-immediate': 568, '../modules/web.set-immediate': 577 }],
  575: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var globalThis = require('../internals/global-this')
    var microtask = require('../internals/microtask')
    var aCallable = require('../internals/a-callable')
    var validateArgumentsLength = require('../internals/validate-arguments-length')
    var fails = require('../internals/fails')
    var DESCRIPTORS = require('../internals/descriptors')

    // Bun ~ 1.0.30 bug
    // https://github.com/oven-sh/bun/issues/9249
    var WRONG_ARITY = fails(function () {
      // getOwnPropertyDescriptor for prevent experimental warning in Node 11
      // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
      return DESCRIPTORS && Object.getOwnPropertyDescriptor(globalThis, 'queueMicrotask').value.length !== 1
    })

    // `queueMicrotask` method
    // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-queuemicrotask
    $({ global: true, enumerable: true, dontCallGetSet: true, forced: WRONG_ARITY }, {
      queueMicrotask: function queueMicrotask (fn) {
        validateArgumentsLength(arguments.length, 1)
        microtask(aCallable(fn))
      }
    })
  }, { '../internals/a-callable': 23, '../internals/descriptors': 85, '../internals/export': 107, '../internals/fails': 108, '../internals/global-this': 131, '../internals/microtask': 177, '../internals/validate-arguments-length': 281 }],
  576: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var globalThis = require('../internals/global-this')
    var defineBuiltInAccessor = require('../internals/define-built-in-accessor')
    var DESCRIPTORS = require('../internals/descriptors')

    var $TypeError = TypeError
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    var defineProperty = Object.defineProperty
    var INCORRECT_VALUE = globalThis.self !== globalThis

    // `self` getter
    // https://html.spec.whatwg.org/multipage/window-object.html#dom-self
    try {
      if (DESCRIPTORS) {
        // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
        var descriptor = Object.getOwnPropertyDescriptor(globalThis, 'self')
        // some engines have `self`, but with incorrect descriptor
        // https://github.com/denoland/deno/issues/15765
        if (INCORRECT_VALUE || !descriptor || !descriptor.get || !descriptor.enumerable) {
          defineBuiltInAccessor(globalThis, 'self', {
            get: function self () {
              return globalThis
            },
            set: function self (value) {
              if (this !== globalThis) throw new $TypeError('Illegal invocation')
              defineProperty(globalThis, 'self', {
                value: value,
                writable: true,
                configurable: true,
                enumerable: true
              })
            },
            configurable: true,
            enumerable: true
          })
        }
      } else {
        $({ global: true, simple: true, forced: INCORRECT_VALUE }, {
          self: globalThis
        })
      }
    } catch (error) { /* empty */ }
  }, { '../internals/define-built-in-accessor': 80, '../internals/descriptors': 85, '../internals/export': 107, '../internals/global-this': 131 }],
  577: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var globalThis = require('../internals/global-this')
    var setTask = require('../internals/task').set
    var schedulersFix = require('../internals/schedulers-fix')

    // https://github.com/oven-sh/bun/issues/1633
    var setImmediate = globalThis.setImmediate ? schedulersFix(setTask, false) : setTask

    // `setImmediate` method
    // http://w3c.github.io/setImmediate/#si-setImmediate
    $({ global: true, bind: true, enumerable: true, forced: globalThis.setImmediate !== setImmediate }, {
      setImmediate: setImmediate
    })
  }, { '../internals/export': 107, '../internals/global-this': 131, '../internals/schedulers-fix': 222, '../internals/task': 255 }],
  578: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var globalThis = require('../internals/global-this')
    var schedulersFix = require('../internals/schedulers-fix')

    var setInterval = schedulersFix(globalThis.setInterval, true)

    // Bun / IE9- setInterval additional parameters fix
    // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
    $({ global: true, bind: true, forced: globalThis.setInterval !== setInterval }, {
      setInterval: setInterval
    })
  }, { '../internals/export': 107, '../internals/global-this': 131, '../internals/schedulers-fix': 222 }],
  579: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var globalThis = require('../internals/global-this')
    var schedulersFix = require('../internals/schedulers-fix')

    var setTimeout = schedulersFix(globalThis.setTimeout, true)

    // Bun / IE9- setTimeout additional parameters fix
    // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
    $({ global: true, bind: true, forced: globalThis.setTimeout !== setTimeout }, {
      setTimeout: setTimeout
    })
  }, { '../internals/export': 107, '../internals/global-this': 131, '../internals/schedulers-fix': 222 }],
  580: [function (require, module, exports) {
    'use strict'
    var IS_PURE = require('../internals/is-pure')
    var $ = require('../internals/export')
    var globalThis = require('../internals/global-this')
    var getBuiltIn = require('../internals/get-built-in')
    var uncurryThis = require('../internals/function-uncurry-this')
    var fails = require('../internals/fails')
    var uid = require('../internals/uid')
    var isCallable = require('../internals/is-callable')
    var isConstructor = require('../internals/is-constructor')
    var isNullOrUndefined = require('../internals/is-null-or-undefined')
    var isObject = require('../internals/is-object')
    var isSymbol = require('../internals/is-symbol')
    var iterate = require('../internals/iterate')
    var anObject = require('../internals/an-object')
    var classof = require('../internals/classof')
    var hasOwn = require('../internals/has-own-property')
    var createProperty = require('../internals/create-property')
    var createNonEnumerableProperty = require('../internals/create-non-enumerable-property')
    var lengthOfArrayLike = require('../internals/length-of-array-like')
    var validateArgumentsLength = require('../internals/validate-arguments-length')
    var getRegExpFlags = require('../internals/regexp-get-flags')
    var MapHelpers = require('../internals/map-helpers')
    var SetHelpers = require('../internals/set-helpers')
    var setIterate = require('../internals/set-iterate')
    var detachTransferable = require('../internals/detach-transferable')
    var ERROR_STACK_INSTALLABLE = require('../internals/error-stack-installable')
    var PROPER_STRUCTURED_CLONE_TRANSFER = require('../internals/structured-clone-proper-transfer')

    var Object = globalThis.Object
    var Array = globalThis.Array
    var Date = globalThis.Date
    var Error = globalThis.Error
    var TypeError = globalThis.TypeError
    var PerformanceMark = globalThis.PerformanceMark
    var DOMException = getBuiltIn('DOMException')
    var Map = MapHelpers.Map
    var mapHas = MapHelpers.has
    var mapGet = MapHelpers.get
    var mapSet = MapHelpers.set
    var Set = SetHelpers.Set
    var setAdd = SetHelpers.add
    var setHas = SetHelpers.has
    var objectKeys = getBuiltIn('Object', 'keys')
    var push = uncurryThis([].push)
    var thisBooleanValue = uncurryThis(true.valueOf)
    var thisNumberValue = uncurryThis(1.0.valueOf)
    var thisStringValue = uncurryThis(''.valueOf)
    var thisTimeValue = uncurryThis(Date.prototype.getTime)
    var PERFORMANCE_MARK = uid('structuredClone')
    var DATA_CLONE_ERROR = 'DataCloneError'
    var TRANSFERRING = 'Transferring'

    var checkBasicSemantic = function (structuredCloneImplementation) {
      return !fails(function () {
        var set1 = new globalThis.Set([7])
        var set2 = structuredCloneImplementation(set1)
        var number = structuredCloneImplementation(Object(7))
        return set2 === set1 || !set2.has(7) || !isObject(number) || +number !== 7
      }) && structuredCloneImplementation
    }

    var checkErrorsCloning = function (structuredCloneImplementation, $Error) {
      return !fails(function () {
        var error = new $Error()
        var test = structuredCloneImplementation({ a: error, b: error })
        return !(test && test.a === test.b && test.a instanceof $Error && test.a.stack === error.stack)
      })
    }

    // https://github.com/whatwg/html/pull/5749
    var checkNewErrorsCloningSemantic = function (structuredCloneImplementation) {
      return !fails(function () {
        var test = structuredCloneImplementation(new globalThis.AggregateError([1], PERFORMANCE_MARK, { cause: 3 }))
        return test.name !== 'AggregateError' || test.errors[0] !== 1 || test.message !== PERFORMANCE_MARK || test.cause !== 3
      })
    }

    // FF94+, Safari 15.4+, Chrome 98+, NodeJS 17.0+, Deno 1.13+
    // FF<103 and Safari implementations can't clone errors
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1556604
    // FF103 can clone errors, but `.stack` of clone is an empty string
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1778762
    // FF104+ fixed it on usual errors, but not on DOMExceptions
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1777321
    // Chrome <102 returns `null` if cloned object contains multiple references to one error
    // https://bugs.chromium.org/p/v8/issues/detail?id=12542
    // NodeJS implementation can't clone DOMExceptions
    // https://github.com/nodejs/node/issues/41038
    // only FF103+ supports new (html/5749) error cloning semantic
    var nativeStructuredClone = globalThis.structuredClone

    var FORCED_REPLACEMENT = IS_PURE ||
  !checkErrorsCloning(nativeStructuredClone, Error) ||
  !checkErrorsCloning(nativeStructuredClone, DOMException) ||
  !checkNewErrorsCloningSemantic(nativeStructuredClone)

    // Chrome 82+, Safari 14.1+, Deno 1.11+
    // Chrome 78-81 implementation swaps `.name` and `.message` of cloned `DOMException`
    // Chrome returns `null` if cloned object contains multiple references to one error
    // Safari 14.1 implementation doesn't clone some `RegExp` flags, so requires a workaround
    // Safari implementation can't clone errors
    // Deno 1.2-1.10 implementations too naive
    // NodeJS 16.0+ does not have `PerformanceMark` constructor
    // NodeJS <17.2 structured cloning implementation from `performance.mark` is too naive
    // and can't clone, for example, `RegExp` or some boxed primitives
    // https://github.com/nodejs/node/issues/40840
    // no one of those implementations supports new (html/5749) error cloning semantic
    var structuredCloneFromMark = !nativeStructuredClone && checkBasicSemantic(function (value) {
      return new PerformanceMark(PERFORMANCE_MARK, { detail: value }).detail
    })

    var nativeRestrictedStructuredClone = checkBasicSemantic(nativeStructuredClone) || structuredCloneFromMark

    var throwUncloneable = function (type) {
      throw new DOMException('Uncloneable type: ' + type, DATA_CLONE_ERROR)
    }

    var throwUnpolyfillable = function (type, action) {
      throw new DOMException((action || 'Cloning') + ' of ' + type + ' cannot be properly polyfilled in this engine', DATA_CLONE_ERROR)
    }

    var tryNativeRestrictedStructuredClone = function (value, type) {
      if (!nativeRestrictedStructuredClone) throwUnpolyfillable(type)
      return nativeRestrictedStructuredClone(value)
    }

    var createDataTransfer = function () {
      var dataTransfer
      try {
        dataTransfer = new globalThis.DataTransfer()
      } catch (error) {
        try {
          dataTransfer = new globalThis.ClipboardEvent('').clipboardData
        } catch (error2) { /* empty */ }
      }
      return dataTransfer && dataTransfer.items && dataTransfer.files ? dataTransfer : null
    }

    var cloneBuffer = function (value, map, $type) {
      if (mapHas(map, value)) return mapGet(map, value)

      var type = $type || classof(value)
      var clone, length, options, source, target, i

      if (type === 'SharedArrayBuffer') {
        if (nativeRestrictedStructuredClone) clone = nativeRestrictedStructuredClone(value)
        // SharedArrayBuffer should use shared memory, we can't polyfill it, so return the original
        else clone = value
      } else {
        var DataView = globalThis.DataView

        // `ArrayBuffer#slice` is not available in IE10
        // `ArrayBuffer#slice` and `DataView` are not available in old FF
        if (!DataView && !isCallable(value.slice)) throwUnpolyfillable('ArrayBuffer')
        // detached buffers throws in `DataView` and `.slice`
        try {
          if (isCallable(value.slice) && !value.resizable) {
            clone = value.slice(0)
          } else {
            length = value.byteLength
            options = 'maxByteLength' in value ? { maxByteLength: value.maxByteLength } : undefined
            // eslint-disable-next-line es/no-resizable-and-growable-arraybuffers -- safe
            clone = new ArrayBuffer(length, options)
            source = new DataView(value)
            target = new DataView(clone)
            for (i = 0; i < length; i++) {
              target.setUint8(i, source.getUint8(i))
            }
          }
        } catch (error) {
          throw new DOMException('ArrayBuffer is detached', DATA_CLONE_ERROR)
        }
      }

      mapSet(map, value, clone)

      return clone
    }

    var cloneView = function (value, type, offset, length, map) {
      var C = globalThis[type]
      // in some old engines like Safari 9, typeof C is 'object'
      // on Uint8ClampedArray or some other constructors
      if (!isObject(C)) throwUnpolyfillable(type)
      return new C(cloneBuffer(value.buffer, map), offset, length)
    }

    var structuredCloneInternal = function (value, map) {
      if (isSymbol(value)) throwUncloneable('Symbol')
      if (!isObject(value)) return value
      // effectively preserves circular references
      if (map) {
        if (mapHas(map, value)) return mapGet(map, value)
      } else map = new Map()

      var type = classof(value)
      var C, name, cloned, dataTransfer, i, length, keys, key

      switch (type) {
        case 'Array':
          cloned = Array(lengthOfArrayLike(value))
          break
        case 'Object':
          cloned = {}
          break
        case 'Map':
          cloned = new Map()
          break
        case 'Set':
          cloned = new Set()
          break
        case 'RegExp':
          // in this block because of a Safari 14.1 bug
          // old FF does not clone regexes passed to the constructor, so get the source and flags directly
          cloned = new RegExp(value.source, getRegExpFlags(value))
          break
        case 'Error':
          name = value.name
          switch (name) {
            case 'AggregateError':
              cloned = new (getBuiltIn(name))([])
              break
            case 'EvalError':
            case 'RangeError':
            case 'ReferenceError':
            case 'SuppressedError':
            case 'SyntaxError':
            case 'TypeError':
            case 'URIError':
              cloned = new (getBuiltIn(name))()
              break
            case 'CompileError':
            case 'LinkError':
            case 'RuntimeError':
              cloned = new (getBuiltIn('WebAssembly', name))()
              break
            default:
              cloned = new Error()
          }
          break
        case 'DOMException':
          cloned = new DOMException(value.message, value.name)
          break
        case 'ArrayBuffer':
        case 'SharedArrayBuffer':
          cloned = cloneBuffer(value, map, type)
          break
        case 'DataView':
        case 'Int8Array':
        case 'Uint8Array':
        case 'Uint8ClampedArray':
        case 'Int16Array':
        case 'Uint16Array':
        case 'Int32Array':
        case 'Uint32Array':
        case 'Float16Array':
        case 'Float32Array':
        case 'Float64Array':
        case 'BigInt64Array':
        case 'BigUint64Array':
          length = type === 'DataView' ? value.byteLength : value.length
          cloned = cloneView(value, type, value.byteOffset, length, map)
          break
        case 'DOMQuad':
          try {
            cloned = new DOMQuad(
              structuredCloneInternal(value.p1, map),
              structuredCloneInternal(value.p2, map),
              structuredCloneInternal(value.p3, map),
              structuredCloneInternal(value.p4, map)
            )
          } catch (error) {
            cloned = tryNativeRestrictedStructuredClone(value, type)
          }
          break
        case 'File':
          if (nativeRestrictedStructuredClone) {
            try {
              cloned = nativeRestrictedStructuredClone(value)
              // NodeJS 20.0.0 bug, https://github.com/nodejs/node/issues/47612
              if (classof(cloned) !== type) cloned = undefined
            } catch (error) { /* empty */ }
          }
          if (!cloned) {
            try {
              cloned = new File([value], value.name, value)
            } catch (error) { /* empty */ }
          }
          if (!cloned) throwUnpolyfillable(type)
          break
        case 'FileList':
          dataTransfer = createDataTransfer()
          if (dataTransfer) {
            for (i = 0, length = lengthOfArrayLike(value); i < length; i++) {
              dataTransfer.items.add(structuredCloneInternal(value[i], map))
            }
            cloned = dataTransfer.files
          } else cloned = tryNativeRestrictedStructuredClone(value, type)
          break
        case 'ImageData':
          // Safari 9 ImageData is a constructor, but typeof ImageData is 'object'
          try {
            cloned = new ImageData(
              structuredCloneInternal(value.data, map),
              value.width,
              value.height,
              { colorSpace: value.colorSpace }
            )
          } catch (error) {
            cloned = tryNativeRestrictedStructuredClone(value, type)
          } break
        default:
          if (nativeRestrictedStructuredClone) {
            cloned = nativeRestrictedStructuredClone(value)
          } else {
            switch (type) {
              case 'BigInt':
              // can be a 3rd party polyfill
                cloned = Object(value.valueOf())
                break
              case 'Boolean':
                cloned = Object(thisBooleanValue(value))
                break
              case 'Number':
                cloned = Object(thisNumberValue(value))
                break
              case 'String':
                cloned = Object(thisStringValue(value))
                break
              case 'Date':
                cloned = new Date(thisTimeValue(value))
                break
              case 'Blob':
                try {
                  cloned = value.slice(0, value.size, value.type)
                } catch (error) {
                  throwUnpolyfillable(type)
                } break
              case 'DOMPoint':
              case 'DOMPointReadOnly':
                C = globalThis[type]
                try {
                  cloned = C.fromPoint
                    ? C.fromPoint(value)
                    : new C(value.x, value.y, value.z, value.w)
                } catch (error) {
                  throwUnpolyfillable(type)
                } break
              case 'DOMRect':
              case 'DOMRectReadOnly':
                C = globalThis[type]
                try {
                  cloned = C.fromRect
                    ? C.fromRect(value)
                    : new C(value.x, value.y, value.width, value.height)
                } catch (error) {
                  throwUnpolyfillable(type)
                } break
              case 'DOMMatrix':
              case 'DOMMatrixReadOnly':
                C = globalThis[type]
                try {
                  cloned = C.fromMatrix
                    ? C.fromMatrix(value)
                    : new C(value)
                } catch (error) {
                  throwUnpolyfillable(type)
                } break
              case 'AudioData':
              case 'VideoFrame':
                if (!isCallable(value.clone)) throwUnpolyfillable(type)
                try {
                  cloned = value.clone()
                } catch (error) {
                  throwUncloneable(type)
                } break
              case 'CropTarget':
              case 'CryptoKey':
              case 'FileSystemDirectoryHandle':
              case 'FileSystemFileHandle':
              case 'FileSystemHandle':
              case 'GPUCompilationInfo':
              case 'GPUCompilationMessage':
              case 'ImageBitmap':
              case 'RTCCertificate':
              case 'WebAssembly.Module':
                throwUnpolyfillable(type)
              // break omitted
              default:
                throwUncloneable(type)
            }
          }
      }

      mapSet(map, value, cloned)

      switch (type) {
        case 'Array':
        case 'Object':
          keys = objectKeys(value)
          for (i = 0, length = lengthOfArrayLike(keys); i < length; i++) {
            key = keys[i]
            createProperty(cloned, key, structuredCloneInternal(value[key], map))
          } break
        case 'Map':
          value.forEach(function (v, k) {
            mapSet(cloned, structuredCloneInternal(k, map), structuredCloneInternal(v, map))
          })
          break
        case 'Set':
          value.forEach(function (v) {
            setAdd(cloned, structuredCloneInternal(v, map))
          })
          break
        case 'Error':
          createNonEnumerableProperty(cloned, 'message', structuredCloneInternal(value.message, map))
          if (hasOwn(value, 'cause')) {
            createNonEnumerableProperty(cloned, 'cause', structuredCloneInternal(value.cause, map))
          }
          if (name === 'AggregateError') {
            cloned.errors = structuredCloneInternal(value.errors, map)
          } else if (name === 'SuppressedError') {
            cloned.error = structuredCloneInternal(value.error, map)
            cloned.suppressed = structuredCloneInternal(value.suppressed, map)
          } // break omitted
        case 'DOMException':
          if (ERROR_STACK_INSTALLABLE) {
            createNonEnumerableProperty(cloned, 'stack', structuredCloneInternal(value.stack, map))
          }
      }

      return cloned
    }

    var tryToTransfer = function (rawTransfer, map) {
      if (!isObject(rawTransfer)) throw new TypeError('Transfer option cannot be converted to a sequence')

      var transfer = []

      iterate(rawTransfer, function (value) {
        push(transfer, anObject(value))
      })

      var i = 0
      var length = lengthOfArrayLike(transfer)
      var buffers = new Set()
      var value, type, C, transferred, canvas, context

      while (i < length) {
        value = transfer[i++]

        type = classof(value)

        if (type === 'ArrayBuffer' ? setHas(buffers, value) : mapHas(map, value)) {
          throw new DOMException('Duplicate transferable', DATA_CLONE_ERROR)
        }

        if (type === 'ArrayBuffer') {
          setAdd(buffers, value)
          continue
        }

        if (PROPER_STRUCTURED_CLONE_TRANSFER) {
          transferred = nativeStructuredClone(value, { transfer: [value] })
        } else {
          switch (type) {
            case 'ImageBitmap':
              C = globalThis.OffscreenCanvas
              if (!isConstructor(C)) throwUnpolyfillable(type, TRANSFERRING)
              try {
                canvas = new C(value.width, value.height)
                context = canvas.getContext('bitmaprenderer')
                context.transferFromImageBitmap(value)
                transferred = canvas.transferToImageBitmap()
              } catch (error) { /* empty */ }
              break
            case 'AudioData':
            case 'VideoFrame':
              if (!isCallable(value.clone) || !isCallable(value.close)) throwUnpolyfillable(type, TRANSFERRING)
              try {
                transferred = value.clone()
                value.close()
              } catch (error) { /* empty */ }
              break
            case 'MediaSourceHandle':
            case 'MessagePort':
            case 'OffscreenCanvas':
            case 'ReadableStream':
            case 'TransformStream':
            case 'WritableStream':
              throwUnpolyfillable(type, TRANSFERRING)
          }
        }

        if (transferred === undefined) throw new DOMException('This object cannot be transferred: ' + type, DATA_CLONE_ERROR)

        mapSet(map, value, transferred)
      }

      return buffers
    }

    var detachBuffers = function (buffers) {
      setIterate(buffers, function (buffer) {
        if (PROPER_STRUCTURED_CLONE_TRANSFER) {
          nativeRestrictedStructuredClone(buffer, { transfer: [buffer] })
        } else if (isCallable(buffer.transfer)) {
          buffer.transfer()
        } else if (detachTransferable) {
          detachTransferable(buffer)
        } else {
          throwUnpolyfillable('ArrayBuffer', TRANSFERRING)
        }
      })
    }

    // `structuredClone` method
    // https://html.spec.whatwg.org/multipage/structured-data.html#dom-structuredclone
    $({ global: true, enumerable: true, sham: !PROPER_STRUCTURED_CLONE_TRANSFER, forced: FORCED_REPLACEMENT }, {
      structuredClone: function structuredClone (value /* , { transfer } */) {
        var options = validateArgumentsLength(arguments.length, 1) > 1 && !isNullOrUndefined(arguments[1]) ? anObject(arguments[1]) : undefined
        var transfer = options ? options.transfer : undefined
        var map, buffers

        if (transfer !== undefined) {
          map = new Map()
          buffers = tryToTransfer(transfer, map)
        }

        var clone = structuredCloneInternal(value, map)

        // since of an issue with cloning views of transferred buffers, we a forced to detach them later
        // https://github.com/zloirock/core-js/issues/1265
        if (buffers) detachBuffers(buffers)

        return clone
      }
    })
  }, { '../internals/an-object': 30, '../internals/classof': 66, '../internals/create-non-enumerable-property': 75, '../internals/create-property': 77, '../internals/detach-transferable': 86, '../internals/error-stack-installable': 105, '../internals/export': 107, '../internals/fails': 108, '../internals/function-uncurry-this': 120, '../internals/get-built-in': 123, '../internals/global-this': 131, '../internals/has-own-property': 132, '../internals/is-callable': 147, '../internals/is-constructor': 148, '../internals/is-null-or-undefined': 152, '../internals/is-object': 153, '../internals/is-pure': 155, '../internals/is-symbol': 157, '../internals/iterate': 159, '../internals/length-of-array-like': 167, '../internals/map-helpers': 169, '../internals/regexp-get-flags': 215, '../internals/set-helpers': 225, '../internals/set-iterate': 230, '../internals/structured-clone-proper-transfer': 251, '../internals/uid': 277, '../internals/validate-arguments-length': 281 }],
  581: [function (require, module, exports) {
    'use strict'
    // TODO: Remove this module from `core-js@4` since it's split to modules listed below
    require('../modules/web.set-interval')
    require('../modules/web.set-timeout')
  }, { '../modules/web.set-interval': 578, '../modules/web.set-timeout': 579 }],
  582: [function (require, module, exports) {
    'use strict'
    // TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
    require('../modules/es.array.iterator')
    require('../modules/es.string.from-code-point')
    var $ = require('../internals/export')
    var globalThis = require('../internals/global-this')
    var safeGetBuiltIn = require('../internals/safe-get-built-in')
    var getBuiltIn = require('../internals/get-built-in')
    var call = require('../internals/function-call')
    var uncurryThis = require('../internals/function-uncurry-this')
    var DESCRIPTORS = require('../internals/descriptors')
    var USE_NATIVE_URL = require('../internals/url-constructor-detection')
    var defineBuiltIn = require('../internals/define-built-in')
    var defineBuiltInAccessor = require('../internals/define-built-in-accessor')
    var defineBuiltIns = require('../internals/define-built-ins')
    var setToStringTag = require('../internals/set-to-string-tag')
    var createIteratorConstructor = require('../internals/iterator-create-constructor')
    var InternalStateModule = require('../internals/internal-state')
    var anInstance = require('../internals/an-instance')
    var isCallable = require('../internals/is-callable')
    var hasOwn = require('../internals/has-own-property')
    var bind = require('../internals/function-bind-context')
    var classof = require('../internals/classof')
    var anObject = require('../internals/an-object')
    var isObject = require('../internals/is-object')
    var $toString = require('../internals/to-string')
    var create = require('../internals/object-create')
    var createPropertyDescriptor = require('../internals/create-property-descriptor')
    var getIterator = require('../internals/get-iterator')
    var getIteratorMethod = require('../internals/get-iterator-method')
    var createIterResultObject = require('../internals/create-iter-result-object')
    var validateArgumentsLength = require('../internals/validate-arguments-length')
    var wellKnownSymbol = require('../internals/well-known-symbol')
    var arraySort = require('../internals/array-sort')

    var ITERATOR = wellKnownSymbol('iterator')
    var URL_SEARCH_PARAMS = 'URLSearchParams'
    var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator'
    var setInternalState = InternalStateModule.set
    var getInternalParamsState = InternalStateModule.getterFor(URL_SEARCH_PARAMS)
    var getInternalIteratorState = InternalStateModule.getterFor(URL_SEARCH_PARAMS_ITERATOR)

    var nativeFetch = safeGetBuiltIn('fetch')
    var NativeRequest = safeGetBuiltIn('Request')
    var Headers = safeGetBuiltIn('Headers')
    var RequestPrototype = NativeRequest && NativeRequest.prototype
    var HeadersPrototype = Headers && Headers.prototype
    var TypeError = globalThis.TypeError
    var encodeURIComponent = globalThis.encodeURIComponent
    var fromCharCode = String.fromCharCode
    var fromCodePoint = getBuiltIn('String', 'fromCodePoint')
    var $parseInt = parseInt
    var charAt = uncurryThis(''.charAt)
    var join = uncurryThis([].join)
    var push = uncurryThis([].push)
    var replace = uncurryThis(''.replace)
    var shift = uncurryThis([].shift)
    var splice = uncurryThis([].splice)
    var split = uncurryThis(''.split)
    var stringSlice = uncurryThis(''.slice)
    var exec = uncurryThis(/./.exec)

    var plus = /\+/g
    var FALLBACK_REPLACER = '\uFFFD'
    var VALID_HEX = /^[0-9a-f]+$/i

    var parseHexOctet = function (string, start) {
      var substr = stringSlice(string, start, start + 2)
      if (!exec(VALID_HEX, substr)) return NaN

      return $parseInt(substr, 16)
    }

    var getLeadingOnes = function (octet) {
      var count = 0
      for (var mask = 0x80; mask > 0 && (octet & mask) !== 0; mask >>= 1) {
        count++
      }
      return count
    }

    var utf8Decode = function (octets) {
      var codePoint = null

      switch (octets.length) {
        case 1:
          codePoint = octets[0]
          break
        case 2:
          codePoint = (octets[0] & 0x1F) << 6 | (octets[1] & 0x3F)
          break
        case 3:
          codePoint = (octets[0] & 0x0F) << 12 | (octets[1] & 0x3F) << 6 | (octets[2] & 0x3F)
          break
        case 4:
          codePoint = (octets[0] & 0x07) << 18 | (octets[1] & 0x3F) << 12 | (octets[2] & 0x3F) << 6 | (octets[3] & 0x3F)
          break
      }

      return codePoint > 0x10FFFF ? null : codePoint
    }

    var decode = function (input) {
      input = replace(input, plus, ' ')
      var length = input.length
      var result = ''
      var i = 0

      while (i < length) {
        var decodedChar = charAt(input, i)

        if (decodedChar === '%') {
          if (charAt(input, i + 1) === '%' || i + 3 > length) {
            result += '%'
            i++
            continue
          }

          var octet = parseHexOctet(input, i + 1)

          // eslint-disable-next-line no-self-compare -- NaN check
          if (octet !== octet) {
            result += decodedChar
            i++
            continue
          }

          i += 2
          var byteSequenceLength = getLeadingOnes(octet)

          if (byteSequenceLength === 0) {
            decodedChar = fromCharCode(octet)
          } else {
            if (byteSequenceLength === 1 || byteSequenceLength > 4) {
              result += FALLBACK_REPLACER
              i++
              continue
            }

            var octets = [octet]
            var sequenceIndex = 1

            while (sequenceIndex < byteSequenceLength) {
              i++
              if (i + 3 > length || charAt(input, i) !== '%') break

              var nextByte = parseHexOctet(input, i + 1)

              // eslint-disable-next-line no-self-compare -- NaN check
              if (nextByte !== nextByte) {
                i += 3
                break
              }
              if (nextByte > 191 || nextByte < 128) break

              push(octets, nextByte)
              i += 2
              sequenceIndex++
            }

            if (octets.length !== byteSequenceLength) {
              result += FALLBACK_REPLACER
              continue
            }

            var codePoint = utf8Decode(octets)
            if (codePoint === null) {
              result += FALLBACK_REPLACER
            } else {
              decodedChar = fromCodePoint(codePoint)
            }
          }
        }

        result += decodedChar
        i++
      }

      return result
    }

    var find = /[!'()~]|%20/g

    var replacements = {
      '!': '%21',
      "'": '%27',
      '(': '%28',
      ')': '%29',
      '~': '%7E',
      '%20': '+'
    }

    var replacer = function (match) {
      return replacements[match]
    }

    var serialize = function (it) {
      return replace(encodeURIComponent(it), find, replacer)
    }

    var URLSearchParamsIterator = createIteratorConstructor(function Iterator (params, kind) {
      setInternalState(this, {
        type: URL_SEARCH_PARAMS_ITERATOR,
        target: getInternalParamsState(params).entries,
        index: 0,
        kind: kind
      })
    }, URL_SEARCH_PARAMS, function next () {
      var state = getInternalIteratorState(this)
      var target = state.target
      var index = state.index++
      if (!target || index >= target.length) {
        state.target = null
        return createIterResultObject(undefined, true)
      }
      var entry = target[index]
      switch (state.kind) {
        case 'keys': return createIterResultObject(entry.key, false)
        case 'values': return createIterResultObject(entry.value, false)
      } return createIterResultObject([entry.key, entry.value], false)
    }, true)

    var URLSearchParamsState = function (init) {
      this.entries = []
      this.url = null

      if (init !== undefined) {
        if (isObject(init)) this.parseObject(init)
        else this.parseQuery(typeof init === 'string' ? charAt(init, 0) === '?' ? stringSlice(init, 1) : init : $toString(init))
      }
    }

    URLSearchParamsState.prototype = {
      type: URL_SEARCH_PARAMS,
      bindURL: function (url) {
        this.url = url
        this.update()
      },
      parseObject: function (object) {
        var entries = this.entries
        var iteratorMethod = getIteratorMethod(object)
        var iterator, next, step, entryIterator, entryNext, first, second

        if (iteratorMethod) {
          iterator = getIterator(object, iteratorMethod)
          next = iterator.next
          while (!(step = call(next, iterator)).done) {
            entryIterator = getIterator(anObject(step.value))
            entryNext = entryIterator.next
            if (
              (first = call(entryNext, entryIterator)).done ||
          (second = call(entryNext, entryIterator)).done ||
          !call(entryNext, entryIterator).done
            ) throw new TypeError('Expected sequence with length 2')
            push(entries, { key: $toString(first.value), value: $toString(second.value) })
          }
        } else {
          for (var key in object) {
            if (hasOwn(object, key)) {
              push(entries, { key: key, value: $toString(object[key]) })
            }
          }
        }
      },
      parseQuery: function (query) {
        if (query) {
          var entries = this.entries
          var attributes = split(query, '&')
          var index = 0
          var attribute, entry
          while (index < attributes.length) {
            attribute = attributes[index++]
            if (attribute.length) {
              entry = split(attribute, '=')
              push(entries, {
                key: decode(shift(entry)),
                value: decode(join(entry, '='))
              })
            }
          }
        }
      },
      serialize: function () {
        var entries = this.entries
        var result = []
        var index = 0
        var entry
        while (index < entries.length) {
          entry = entries[index++]
          push(result, serialize(entry.key) + '=' + serialize(entry.value))
        } return join(result, '&')
      },
      update: function () {
        this.entries.length = 0
        this.parseQuery(this.url.query)
      },
      updateURL: function () {
        if (this.url) this.url.update()
      }
    }

    // `URLSearchParams` constructor
    // https://url.spec.whatwg.org/#interface-urlsearchparams
    var URLSearchParamsConstructor = function URLSearchParams (/* init */) {
      anInstance(this, URLSearchParamsPrototype)
      var init = arguments.length > 0 ? arguments[0] : undefined
      var state = setInternalState(this, new URLSearchParamsState(init))
      if (!DESCRIPTORS) this.size = state.entries.length
    }

    var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype

    defineBuiltIns(URLSearchParamsPrototype, {
      // `URLSearchParams.prototype.append` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-append
      append: function append (name, value) {
        var state = getInternalParamsState(this)
        validateArgumentsLength(arguments.length, 2)
        push(state.entries, { key: $toString(name), value: $toString(value) })
        if (!DESCRIPTORS) this.length++
        state.updateURL()
      },
      // `URLSearchParams.prototype.delete` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
      delete: function (name /* , value */) {
        var state = getInternalParamsState(this)
        var length = validateArgumentsLength(arguments.length, 1)
        var entries = state.entries
        var key = $toString(name)
        var $value = length < 2 ? undefined : arguments[1]
        var value = $value === undefined ? $value : $toString($value)
        var index = 0
        while (index < entries.length) {
          var entry = entries[index]
          if (entry.key === key && (value === undefined || entry.value === value)) {
            splice(entries, index, 1)
            if (value !== undefined) break
          } else index++
        }
        if (!DESCRIPTORS) this.size = entries.length
        state.updateURL()
      },
      // `URLSearchParams.prototype.get` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-get
      get: function get (name) {
        var entries = getInternalParamsState(this).entries
        validateArgumentsLength(arguments.length, 1)
        var key = $toString(name)
        var index = 0
        for (; index < entries.length; index++) {
          if (entries[index].key === key) return entries[index].value
        }
        return null
      },
      // `URLSearchParams.prototype.getAll` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
      getAll: function getAll (name) {
        var entries = getInternalParamsState(this).entries
        validateArgumentsLength(arguments.length, 1)
        var key = $toString(name)
        var result = []
        var index = 0
        for (; index < entries.length; index++) {
          if (entries[index].key === key) push(result, entries[index].value)
        }
        return result
      },
      // `URLSearchParams.prototype.has` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-has
      has: function has (name /* , value */) {
        var entries = getInternalParamsState(this).entries
        var length = validateArgumentsLength(arguments.length, 1)
        var key = $toString(name)
        var $value = length < 2 ? undefined : arguments[1]
        var value = $value === undefined ? $value : $toString($value)
        var index = 0
        while (index < entries.length) {
          var entry = entries[index++]
          if (entry.key === key && (value === undefined || entry.value === value)) return true
        }
        return false
      },
      // `URLSearchParams.prototype.set` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-set
      set: function set (name, value) {
        var state = getInternalParamsState(this)
        validateArgumentsLength(arguments.length, 1)
        var entries = state.entries
        var found = false
        var key = $toString(name)
        var val = $toString(value)
        var index = 0
        var entry
        for (; index < entries.length; index++) {
          entry = entries[index]
          if (entry.key === key) {
            if (found) splice(entries, index--, 1)
            else {
              found = true
              entry.value = val
            }
          }
        }
        if (!found) push(entries, { key: key, value: val })
        if (!DESCRIPTORS) this.size = entries.length
        state.updateURL()
      },
      // `URLSearchParams.prototype.sort` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
      sort: function sort () {
        var state = getInternalParamsState(this)
        arraySort(state.entries, function (a, b) {
          return a.key > b.key ? 1 : -1
        })
        state.updateURL()
      },
      // `URLSearchParams.prototype.forEach` method
      forEach: function forEach (callback /* , thisArg */) {
        var entries = getInternalParamsState(this).entries
        var boundFunction = bind(callback, arguments.length > 1 ? arguments[1] : undefined)
        var index = 0
        var entry
        while (index < entries.length) {
          entry = entries[index++]
          boundFunction(entry.value, entry.key, this)
        }
      },
      // `URLSearchParams.prototype.keys` method
      keys: function keys () {
        return new URLSearchParamsIterator(this, 'keys')
      },
      // `URLSearchParams.prototype.values` method
      values: function values () {
        return new URLSearchParamsIterator(this, 'values')
      },
      // `URLSearchParams.prototype.entries` method
      entries: function entries () {
        return new URLSearchParamsIterator(this, 'entries')
      }
    }, { enumerable: true })

    // `URLSearchParams.prototype[@@iterator]` method
    defineBuiltIn(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries, { name: 'entries' })

    // `URLSearchParams.prototype.toString` method
    // https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
    defineBuiltIn(URLSearchParamsPrototype, 'toString', function toString () {
      return getInternalParamsState(this).serialize()
    }, { enumerable: true })

    // `URLSearchParams.prototype.size` getter
    // https://github.com/whatwg/url/pull/734
    if (DESCRIPTORS) {
      defineBuiltInAccessor(URLSearchParamsPrototype, 'size', {
        get: function size () {
          return getInternalParamsState(this).entries.length
        },
        configurable: true,
        enumerable: true
      })
    }

    setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS)

    $({ global: true, constructor: true, forced: !USE_NATIVE_URL }, {
      URLSearchParams: URLSearchParamsConstructor
    })

    // Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`
    if (!USE_NATIVE_URL && isCallable(Headers)) {
      var headersHas = uncurryThis(HeadersPrototype.has)
      var headersSet = uncurryThis(HeadersPrototype.set)

      var wrapRequestOptions = function (init) {
        if (isObject(init)) {
          var body = init.body
          var headers
          if (classof(body) === URL_SEARCH_PARAMS) {
            headers = init.headers ? new Headers(init.headers) : new Headers()
            if (!headersHas(headers, 'content-type')) {
              headersSet(headers, 'content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
            }
            return create(init, {
              body: createPropertyDescriptor(0, $toString(body)),
              headers: createPropertyDescriptor(0, headers)
            })
          }
        } return init
      }

      if (isCallable(nativeFetch)) {
        $({ global: true, enumerable: true, dontCallGetSet: true, forced: true }, {
          fetch: function fetch (input /* , init */) {
            return nativeFetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {})
          }
        })
      }

      if (isCallable(NativeRequest)) {
        var RequestConstructor = function Request (input /* , init */) {
          anInstance(this, RequestPrototype)
          return new NativeRequest(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {})
        }

        RequestPrototype.constructor = RequestConstructor
        RequestConstructor.prototype = RequestPrototype

        $({ global: true, constructor: true, dontCallGetSet: true, forced: true }, {
          Request: RequestConstructor
        })
      }
    }

    module.exports = {
      URLSearchParams: URLSearchParamsConstructor,
      getState: getInternalParamsState
    }
  }, { '../internals/an-instance': 29, '../internals/an-object': 30, '../internals/array-sort': 53, '../internals/classof': 66, '../internals/create-iter-result-object': 74, '../internals/create-property-descriptor': 76, '../internals/define-built-in': 81, '../internals/define-built-in-accessor': 80, '../internals/define-built-ins': 82, '../internals/descriptors': 85, '../internals/export': 107, '../internals/function-bind-context': 113, '../internals/function-call': 116, '../internals/function-uncurry-this': 120, '../internals/get-built-in': 123, '../internals/get-iterator': 126, '../internals/get-iterator-method': 125, '../internals/global-this': 131, '../internals/has-own-property': 132, '../internals/internal-state': 143, '../internals/is-callable': 147, '../internals/is-object': 153, '../internals/iterator-create-constructor': 161, '../internals/object-create': 185, '../internals/safe-get-built-in': 220, '../internals/set-to-string-tag': 235, '../internals/to-string': 269, '../internals/url-constructor-detection': 278, '../internals/validate-arguments-length': 281, '../internals/well-known-symbol': 285, '../modules/es.array.iterator': 314, '../modules/es.string.from-code-point': 470 }],
  583: [function (require, module, exports) {
    'use strict'
    var defineBuiltIn = require('../internals/define-built-in')
    var uncurryThis = require('../internals/function-uncurry-this')
    var toString = require('../internals/to-string')
    var validateArgumentsLength = require('../internals/validate-arguments-length')

    var $URLSearchParams = URLSearchParams
    var URLSearchParamsPrototype = $URLSearchParams.prototype
    var append = uncurryThis(URLSearchParamsPrototype.append)
    var $delete = uncurryThis(URLSearchParamsPrototype.delete)
    var forEach = uncurryThis(URLSearchParamsPrototype.forEach)
    var push = uncurryThis([].push)
    var params = new $URLSearchParams('a=1&a=2&b=3')

    params.delete('a', 1)
    // `undefined` case is a Chromium 117 bug
    // https://bugs.chromium.org/p/v8/issues/detail?id=14222
    params.delete('b', undefined)

    if (params + '' !== 'a=2') {
      defineBuiltIn(URLSearchParamsPrototype, 'delete', function (name /* , value */) {
        var length = arguments.length
        var $value = length < 2 ? undefined : arguments[1]
        if (length && $value === undefined) return $delete(this, name)
        var entries = []
        forEach(this, function (v, k) { // also validates `this`
          push(entries, { key: k, value: v })
        })
        validateArgumentsLength(length, 1)
        var key = toString(name)
        var value = toString($value)
        var index = 0
        var dindex = 0
        var found = false
        var entriesLength = entries.length
        var entry
        while (index < entriesLength) {
          entry = entries[index++]
          if (found || entry.key === key) {
            found = true
            $delete(this, entry.key)
          } else dindex++
        }
        while (dindex < entriesLength) {
          entry = entries[dindex++]
          if (!(entry.key === key && entry.value === value)) append(this, entry.key, entry.value)
        }
      }, { enumerable: true, unsafe: true })
    }
  }, { '../internals/define-built-in': 81, '../internals/function-uncurry-this': 120, '../internals/to-string': 269, '../internals/validate-arguments-length': 281 }],
  584: [function (require, module, exports) {
    'use strict'
    var defineBuiltIn = require('../internals/define-built-in')
    var uncurryThis = require('../internals/function-uncurry-this')
    var toString = require('../internals/to-string')
    var validateArgumentsLength = require('../internals/validate-arguments-length')

    var $URLSearchParams = URLSearchParams
    var URLSearchParamsPrototype = $URLSearchParams.prototype
    var getAll = uncurryThis(URLSearchParamsPrototype.getAll)
    var $has = uncurryThis(URLSearchParamsPrototype.has)
    var params = new $URLSearchParams('a=1')

    // `undefined` case is a Chromium 117 bug
    // https://bugs.chromium.org/p/v8/issues/detail?id=14222
    if (params.has('a', 2) || !params.has('a', undefined)) {
      defineBuiltIn(URLSearchParamsPrototype, 'has', function has (name /* , value */) {
        var length = arguments.length
        var $value = length < 2 ? undefined : arguments[1]
        if (length && $value === undefined) return $has(this, name)
        var values = getAll(this, name) // also validates `this`
        validateArgumentsLength(length, 1)
        var value = toString($value)
        var index = 0
        while (index < values.length) {
          if (values[index++] === value) return true
        } return false
      }, { enumerable: true, unsafe: true })
    }
  }, { '../internals/define-built-in': 81, '../internals/function-uncurry-this': 120, '../internals/to-string': 269, '../internals/validate-arguments-length': 281 }],
  585: [function (require, module, exports) {
    'use strict'
    // TODO: Remove this module from `core-js@4` since it's replaced to module below
    require('../modules/web.url-search-params.constructor')
  }, { '../modules/web.url-search-params.constructor': 582 }],
  586: [function (require, module, exports) {
    'use strict'
    var DESCRIPTORS = require('../internals/descriptors')
    var uncurryThis = require('../internals/function-uncurry-this')
    var defineBuiltInAccessor = require('../internals/define-built-in-accessor')

    var URLSearchParamsPrototype = URLSearchParams.prototype
    var forEach = uncurryThis(URLSearchParamsPrototype.forEach)

    // `URLSearchParams.prototype.size` getter
    // https://github.com/whatwg/url/pull/734
    if (DESCRIPTORS && !('size' in URLSearchParamsPrototype)) {
      defineBuiltInAccessor(URLSearchParamsPrototype, 'size', {
        get: function size () {
          var count = 0
          forEach(this, function () { count++ })
          return count
        },
        configurable: true,
        enumerable: true
      })
    }
  }, { '../internals/define-built-in-accessor': 80, '../internals/descriptors': 85, '../internals/function-uncurry-this': 120 }],
  587: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var getBuiltIn = require('../internals/get-built-in')
    var fails = require('../internals/fails')
    var validateArgumentsLength = require('../internals/validate-arguments-length')
    var toString = require('../internals/to-string')
    var USE_NATIVE_URL = require('../internals/url-constructor-detection')

    var URL = getBuiltIn('URL')

    // https://github.com/nodejs/node/issues/47505
    // https://github.com/denoland/deno/issues/18893
    var THROWS_WITHOUT_ARGUMENTS = USE_NATIVE_URL && fails(function () {
      URL.canParse()
    })

    // Bun ~ 1.0.30 bug
    // https://github.com/oven-sh/bun/issues/9250
    var WRONG_ARITY = fails(function () {
      return URL.canParse.length !== 1
    })

    // `URL.canParse` method
    // https://url.spec.whatwg.org/#dom-url-canparse
    $({ target: 'URL', stat: true, forced: !THROWS_WITHOUT_ARGUMENTS || WRONG_ARITY }, {
      canParse: function canParse (url) {
        var length = validateArgumentsLength(arguments.length, 1)
        var urlString = toString(url)
        var base = length < 2 || arguments[1] === undefined ? undefined : toString(arguments[1])
        try {
          return !!new URL(urlString, base)
        } catch (error) {
          return false
        }
      }
    })
  }, { '../internals/export': 107, '../internals/fails': 108, '../internals/get-built-in': 123, '../internals/to-string': 269, '../internals/url-constructor-detection': 278, '../internals/validate-arguments-length': 281 }],
  588: [function (require, module, exports) {
    'use strict'
    // TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
    require('../modules/es.string.iterator')
    var $ = require('../internals/export')
    var DESCRIPTORS = require('../internals/descriptors')
    var USE_NATIVE_URL = require('../internals/url-constructor-detection')
    var globalThis = require('../internals/global-this')
    var bind = require('../internals/function-bind-context')
    var uncurryThis = require('../internals/function-uncurry-this')
    var defineBuiltIn = require('../internals/define-built-in')
    var defineBuiltInAccessor = require('../internals/define-built-in-accessor')
    var anInstance = require('../internals/an-instance')
    var hasOwn = require('../internals/has-own-property')
    var assign = require('../internals/object-assign')
    var arrayFrom = require('../internals/array-from')
    var arraySlice = require('../internals/array-slice')
    var codeAt = require('../internals/string-multibyte').codeAt
    var toASCII = require('../internals/string-punycode-to-ascii')
    var $toString = require('../internals/to-string')
    var setToStringTag = require('../internals/set-to-string-tag')
    var validateArgumentsLength = require('../internals/validate-arguments-length')
    var URLSearchParamsModule = require('../modules/web.url-search-params.constructor')
    var InternalStateModule = require('../internals/internal-state')

    var setInternalState = InternalStateModule.set
    var getInternalURLState = InternalStateModule.getterFor('URL')
    var URLSearchParams = URLSearchParamsModule.URLSearchParams
    var getInternalSearchParamsState = URLSearchParamsModule.getState

    var NativeURL = globalThis.URL
    var TypeError = globalThis.TypeError
    var parseInt = globalThis.parseInt
    var floor = Math.floor
    var pow = Math.pow
    var charAt = uncurryThis(''.charAt)
    var exec = uncurryThis(/./.exec)
    var join = uncurryThis([].join)
    var numberToString = uncurryThis(1.0.toString)
    var pop = uncurryThis([].pop)
    var push = uncurryThis([].push)
    var replace = uncurryThis(''.replace)
    var shift = uncurryThis([].shift)
    var split = uncurryThis(''.split)
    var stringSlice = uncurryThis(''.slice)
    var toLowerCase = uncurryThis(''.toLowerCase)
    var unshift = uncurryThis([].unshift)

    var INVALID_AUTHORITY = 'Invalid authority'
    var INVALID_SCHEME = 'Invalid scheme'
    var INVALID_HOST = 'Invalid host'
    var INVALID_PORT = 'Invalid port'

    var ALPHA = /[a-z]/i
    // eslint-disable-next-line regexp/no-obscure-range -- safe
    var ALPHANUMERIC = /[\d+-.a-z]/i
    var DIGIT = /\d/
    var HEX_START = /^0x/i
    var OCT = /^[0-7]+$/
    var DEC = /^\d+$/
    var HEX = /^[\da-f]+$/i
    /* eslint-disable regexp/no-control-character -- safe */
    var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:<>?@[\\\]^|]/
    var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:<>?@[\\\]^|]/
    var LEADING_C0_CONTROL_OR_SPACE = /^[\u0000-\u0020]+/
    var TRAILING_C0_CONTROL_OR_SPACE = /(^|[^\u0000-\u0020])[\u0000-\u0020]+$/
    var TAB_AND_NEW_LINE = /[\t\n\r]/g
    /* eslint-enable regexp/no-control-character -- safe */
    var EOF

    // https://url.spec.whatwg.org/#ipv4-number-parser
    var parseIPv4 = function (input) {
      var parts = split(input, '.')
      var partsLength, numbers, index, part, radix, number, ipv4
      if (parts.length && parts[parts.length - 1] === '') {
        parts.length--
      }
      partsLength = parts.length
      if (partsLength > 4) return input
      numbers = []
      for (index = 0; index < partsLength; index++) {
        part = parts[index]
        if (part === '') return input
        radix = 10
        if (part.length > 1 && charAt(part, 0) === '0') {
          radix = exec(HEX_START, part) ? 16 : 8
          part = stringSlice(part, radix === 8 ? 1 : 2)
        }
        if (part === '') {
          number = 0
        } else {
          if (!exec(radix === 10 ? DEC : radix === 8 ? OCT : HEX, part)) return input
          number = parseInt(part, radix)
        }
        push(numbers, number)
      }
      for (index = 0; index < partsLength; index++) {
        number = numbers[index]
        if (index === partsLength - 1) {
          if (number >= pow(256, 5 - partsLength)) return null
        } else if (number > 255) return null
      }
      ipv4 = pop(numbers)
      for (index = 0; index < numbers.length; index++) {
        ipv4 += numbers[index] * pow(256, 3 - index)
      }
      return ipv4
    }

    // https://url.spec.whatwg.org/#concept-ipv6-parser
    // eslint-disable-next-line max-statements -- TODO
    var parseIPv6 = function (input) {
      var address = [0, 0, 0, 0, 0, 0, 0, 0]
      var pieceIndex = 0
      var compress = null
      var pointer = 0
      var value, length, numbersSeen, ipv4Piece, number, swaps, swap

      var chr = function () {
        return charAt(input, pointer)
      }

      if (chr() === ':') {
        if (charAt(input, 1) !== ':') return
        pointer += 2
        pieceIndex++
        compress = pieceIndex
      }
      while (chr()) {
        if (pieceIndex === 8) return
        if (chr() === ':') {
          if (compress !== null) return
          pointer++
          pieceIndex++
          compress = pieceIndex
          continue
        }
        value = length = 0
        while (length < 4 && exec(HEX, chr())) {
          value = value * 16 + parseInt(chr(), 16)
          pointer++
          length++
        }
        if (chr() === '.') {
          if (length === 0) return
          pointer -= length
          if (pieceIndex > 6) return
          numbersSeen = 0
          while (chr()) {
            ipv4Piece = null
            if (numbersSeen > 0) {
              if (chr() === '.' && numbersSeen < 4) pointer++
              else return
            }
            if (!exec(DIGIT, chr())) return
            while (exec(DIGIT, chr())) {
              number = parseInt(chr(), 10)
              if (ipv4Piece === null) ipv4Piece = number
              else if (ipv4Piece === 0) return
              else ipv4Piece = ipv4Piece * 10 + number
              if (ipv4Piece > 255) return
              pointer++
            }
            address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece
            numbersSeen++
            if (numbersSeen === 2 || numbersSeen === 4) pieceIndex++
          }
          if (numbersSeen !== 4) return
          break
        } else if (chr() === ':') {
          pointer++
          if (!chr()) return
        } else if (chr()) return
        address[pieceIndex++] = value
      }
      if (compress !== null) {
        swaps = pieceIndex - compress
        pieceIndex = 7
        while (pieceIndex !== 0 && swaps > 0) {
          swap = address[pieceIndex]
          address[pieceIndex--] = address[compress + swaps - 1]
          address[compress + --swaps] = swap
        }
      } else if (pieceIndex !== 8) return
      return address
    }

    var findLongestZeroSequence = function (ipv6) {
      var maxIndex = null
      var maxLength = 1
      var currStart = null
      var currLength = 0
      var index = 0
      for (; index < 8; index++) {
        if (ipv6[index] !== 0) {
          if (currLength > maxLength) {
            maxIndex = currStart
            maxLength = currLength
          }
          currStart = null
          currLength = 0
        } else {
          if (currStart === null) currStart = index
          ++currLength
        }
      }
      return currLength > maxLength ? currStart : maxIndex
    }

    // https://url.spec.whatwg.org/#host-serializing
    var serializeHost = function (host) {
      var result, index, compress, ignore0

      // ipv4
      if (typeof host === 'number') {
        result = []
        for (index = 0; index < 4; index++) {
          unshift(result, host % 256)
          host = floor(host / 256)
        }
        return join(result, '.')
      }

      // ipv6
      if (typeof host === 'object') {
        result = ''
        compress = findLongestZeroSequence(host)
        for (index = 0; index < 8; index++) {
          if (ignore0 && host[index] === 0) continue
          if (ignore0) ignore0 = false
          if (compress === index) {
            result += index ? ':' : '::'
            ignore0 = true
          } else {
            result += numberToString(host[index], 16)
            if (index < 7) result += ':'
          }
        }
        return '[' + result + ']'
      }

      return host
    }

    var C0ControlPercentEncodeSet = {}
    var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
      ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
    })
    var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
      '#': 1, '?': 1, '{': 1, '}': 1
    })
    var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
      '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
    })

    var percentEncode = function (chr, set) {
      var code = codeAt(chr, 0)
      return code > 0x20 && code < 0x7F && !hasOwn(set, chr) ? chr : encodeURIComponent(chr)
    }

    // https://url.spec.whatwg.org/#special-scheme
    var specialSchemes = {
      ftp: 21,
      file: null,
      http: 80,
      https: 443,
      ws: 80,
      wss: 443
    }

    // https://url.spec.whatwg.org/#windows-drive-letter
    var isWindowsDriveLetter = function (string, normalized) {
      var second
      return string.length === 2 && exec(ALPHA, charAt(string, 0)) &&
    ((second = charAt(string, 1)) === ':' || (!normalized && second === '|'))
    }

    // https://url.spec.whatwg.org/#start-with-a-windows-drive-letter
    var startsWithWindowsDriveLetter = function (string) {
      var third
      return string.length > 1 && isWindowsDriveLetter(stringSlice(string, 0, 2)) && (
        string.length === 2 ||
    ((third = charAt(string, 2)) === '/' || third === '\\' || third === '?' || third === '#')
      )
    }

    // https://url.spec.whatwg.org/#single-dot-path-segment
    var isSingleDot = function (segment) {
      return segment === '.' || toLowerCase(segment) === '%2e'
    }

    // https://url.spec.whatwg.org/#double-dot-path-segment
    var isDoubleDot = function (segment) {
      segment = toLowerCase(segment)
      return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e'
    }

    // States:
    var SCHEME_START = {}
    var SCHEME = {}
    var NO_SCHEME = {}
    var SPECIAL_RELATIVE_OR_AUTHORITY = {}
    var PATH_OR_AUTHORITY = {}
    var RELATIVE = {}
    var RELATIVE_SLASH = {}
    var SPECIAL_AUTHORITY_SLASHES = {}
    var SPECIAL_AUTHORITY_IGNORE_SLASHES = {}
    var AUTHORITY = {}
    var HOST = {}
    var HOSTNAME = {}
    var PORT = {}
    var FILE = {}
    var FILE_SLASH = {}
    var FILE_HOST = {}
    var PATH_START = {}
    var PATH = {}
    var CANNOT_BE_A_BASE_URL_PATH = {}
    var QUERY = {}
    var FRAGMENT = {}

    var URLState = function (url, isBase, base) {
      var urlString = $toString(url)
      var baseState, failure, searchParams
      if (isBase) {
        failure = this.parse(urlString)
        if (failure) throw new TypeError(failure)
        this.searchParams = null
      } else {
        if (base !== undefined) baseState = new URLState(base, true)
        failure = this.parse(urlString, null, baseState)
        if (failure) throw new TypeError(failure)
        searchParams = getInternalSearchParamsState(new URLSearchParams())
        searchParams.bindURL(this)
        this.searchParams = searchParams
      }
    }

    URLState.prototype = {
      type: 'URL',
      // https://url.spec.whatwg.org/#url-parsing
      // eslint-disable-next-line max-statements -- TODO
      parse: function (input, stateOverride, base) {
        var url = this
        var state = stateOverride || SCHEME_START
        var pointer = 0
        var buffer = ''
        var seenAt = false
        var seenBracket = false
        var seenPasswordToken = false
        var codePoints, chr, bufferCodePoints, failure

        input = $toString(input)

        if (!stateOverride) {
          url.scheme = ''
          url.username = ''
          url.password = ''
          url.host = null
          url.port = null
          url.path = []
          url.query = null
          url.fragment = null
          url.cannotBeABaseURL = false
          input = replace(input, LEADING_C0_CONTROL_OR_SPACE, '')
          input = replace(input, TRAILING_C0_CONTROL_OR_SPACE, '$1')
        }

        input = replace(input, TAB_AND_NEW_LINE, '')

        codePoints = arrayFrom(input)

        while (pointer <= codePoints.length) {
          chr = codePoints[pointer]
          switch (state) {
            case SCHEME_START:
              if (chr && exec(ALPHA, chr)) {
                buffer += toLowerCase(chr)
                state = SCHEME
              } else if (!stateOverride) {
                state = NO_SCHEME
                continue
              } else return INVALID_SCHEME
              break

            case SCHEME:
              if (chr && (exec(ALPHANUMERIC, chr) || chr === '+' || chr === '-' || chr === '.')) {
                buffer += toLowerCase(chr)
              } else if (chr === ':') {
                if (stateOverride && (
                  (url.isSpecial() !== hasOwn(specialSchemes, buffer)) ||
              (buffer === 'file' && (url.includesCredentials() || url.port !== null)) ||
              (url.scheme === 'file' && !url.host)
                )) return
                url.scheme = buffer
                if (stateOverride) {
                  if (url.isSpecial() && specialSchemes[url.scheme] === url.port) url.port = null
                  return
                }
                buffer = ''
                if (url.scheme === 'file') {
                  state = FILE
                } else if (url.isSpecial() && base && base.scheme === url.scheme) {
                  state = SPECIAL_RELATIVE_OR_AUTHORITY
                } else if (url.isSpecial()) {
                  state = SPECIAL_AUTHORITY_SLASHES
                } else if (codePoints[pointer + 1] === '/') {
                  state = PATH_OR_AUTHORITY
                  pointer++
                } else {
                  url.cannotBeABaseURL = true
                  push(url.path, '')
                  state = CANNOT_BE_A_BASE_URL_PATH
                }
              } else if (!stateOverride) {
                buffer = ''
                state = NO_SCHEME
                pointer = 0
                continue
              } else return INVALID_SCHEME
              break

            case NO_SCHEME:
              if (!base || (base.cannotBeABaseURL && chr !== '#')) return INVALID_SCHEME
              if (base.cannotBeABaseURL && chr === '#') {
                url.scheme = base.scheme
                url.path = arraySlice(base.path)
                url.query = base.query
                url.fragment = ''
                url.cannotBeABaseURL = true
                state = FRAGMENT
                break
              }
              state = base.scheme === 'file' ? FILE : RELATIVE
              continue

            case SPECIAL_RELATIVE_OR_AUTHORITY:
              if (chr === '/' && codePoints[pointer + 1] === '/') {
                state = SPECIAL_AUTHORITY_IGNORE_SLASHES
                pointer++
              } else {
                state = RELATIVE
                continue
              } break

            case PATH_OR_AUTHORITY:
              if (chr === '/') {
                state = AUTHORITY
                break
              } else {
                state = PATH
                continue
              }

            case RELATIVE:
              url.scheme = base.scheme
              if (chr === EOF) {
                url.username = base.username
                url.password = base.password
                url.host = base.host
                url.port = base.port
                url.path = arraySlice(base.path)
                url.query = base.query
              } else if (chr === '/' || (chr === '\\' && url.isSpecial())) {
                state = RELATIVE_SLASH
              } else if (chr === '?') {
                url.username = base.username
                url.password = base.password
                url.host = base.host
                url.port = base.port
                url.path = arraySlice(base.path)
                url.query = ''
                state = QUERY
              } else if (chr === '#') {
                url.username = base.username
                url.password = base.password
                url.host = base.host
                url.port = base.port
                url.path = arraySlice(base.path)
                url.query = base.query
                url.fragment = ''
                state = FRAGMENT
              } else {
                url.username = base.username
                url.password = base.password
                url.host = base.host
                url.port = base.port
                url.path = arraySlice(base.path)
                url.path.length--
                state = PATH
                continue
              } break

            case RELATIVE_SLASH:
              if (url.isSpecial() && (chr === '/' || chr === '\\')) {
                state = SPECIAL_AUTHORITY_IGNORE_SLASHES
              } else if (chr === '/') {
                state = AUTHORITY
              } else {
                url.username = base.username
                url.password = base.password
                url.host = base.host
                url.port = base.port
                state = PATH
                continue
              } break

            case SPECIAL_AUTHORITY_SLASHES:
              state = SPECIAL_AUTHORITY_IGNORE_SLASHES
              if (chr !== '/' || charAt(buffer, pointer + 1) !== '/') continue
              pointer++
              break

            case SPECIAL_AUTHORITY_IGNORE_SLASHES:
              if (chr !== '/' && chr !== '\\') {
                state = AUTHORITY
                continue
              } break

            case AUTHORITY:
              if (chr === '@') {
                if (seenAt) buffer = '%40' + buffer
                seenAt = true
                bufferCodePoints = arrayFrom(buffer)
                for (var i = 0; i < bufferCodePoints.length; i++) {
                  var codePoint = bufferCodePoints[i]
                  if (codePoint === ':' && !seenPasswordToken) {
                    seenPasswordToken = true
                    continue
                  }
                  var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet)
                  if (seenPasswordToken) url.password += encodedCodePoints
                  else url.username += encodedCodePoints
                }
                buffer = ''
              } else if (
                chr === EOF || chr === '/' || chr === '?' || chr === '#' ||
            (chr === '\\' && url.isSpecial())
              ) {
                if (seenAt && buffer === '') return INVALID_AUTHORITY
                pointer -= arrayFrom(buffer).length + 1
                buffer = ''
                state = HOST
              } else buffer += chr
              break

            case HOST:
            case HOSTNAME:
              if (stateOverride && url.scheme === 'file') {
                state = FILE_HOST
                continue
              } else if (chr === ':' && !seenBracket) {
                if (buffer === '') return INVALID_HOST
                failure = url.parseHost(buffer)
                if (failure) return failure
                buffer = ''
                state = PORT
                if (stateOverride === HOSTNAME) return
              } else if (
                chr === EOF || chr === '/' || chr === '?' || chr === '#' ||
            (chr === '\\' && url.isSpecial())
              ) {
                if (url.isSpecial() && buffer === '') return INVALID_HOST
                if (stateOverride && buffer === '' && (url.includesCredentials() || url.port !== null)) return
                failure = url.parseHost(buffer)
                if (failure) return failure
                buffer = ''
                state = PATH_START
                if (stateOverride) return
                continue
              } else {
                if (chr === '[') seenBracket = true
                else if (chr === ']') seenBracket = false
                buffer += chr
              } break

            case PORT:
              if (exec(DIGIT, chr)) {
                buffer += chr
              } else if (
                chr === EOF || chr === '/' || chr === '?' || chr === '#' ||
            (chr === '\\' && url.isSpecial()) ||
            stateOverride
              ) {
                if (buffer !== '') {
                  var port = parseInt(buffer, 10)
                  if (port > 0xFFFF) return INVALID_PORT
                  url.port = (url.isSpecial() && port === specialSchemes[url.scheme]) ? null : port
                  buffer = ''
                }
                if (stateOverride) return
                state = PATH_START
                continue
              } else return INVALID_PORT
              break

            case FILE:
              url.scheme = 'file'
              if (chr === '/' || chr === '\\') state = FILE_SLASH
              else if (base && base.scheme === 'file') {
                switch (chr) {
                  case EOF:
                    url.host = base.host
                    url.path = arraySlice(base.path)
                    url.query = base.query
                    break
                  case '?':
                    url.host = base.host
                    url.path = arraySlice(base.path)
                    url.query = ''
                    state = QUERY
                    break
                  case '#':
                    url.host = base.host
                    url.path = arraySlice(base.path)
                    url.query = base.query
                    url.fragment = ''
                    state = FRAGMENT
                    break
                  default:
                    if (!startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ''))) {
                      url.host = base.host
                      url.path = arraySlice(base.path)
                      url.shortenPath()
                    }
                    state = PATH
                    continue
                }
              } else {
                state = PATH
                continue
              } break

            case FILE_SLASH:
              if (chr === '/' || chr === '\\') {
                state = FILE_HOST
                break
              }
              if (base && base.scheme === 'file' && !startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ''))) {
                if (isWindowsDriveLetter(base.path[0], true)) push(url.path, base.path[0])
                else url.host = base.host
              }
              state = PATH
              continue

            case FILE_HOST:
              if (chr === EOF || chr === '/' || chr === '\\' || chr === '?' || chr === '#') {
                if (!stateOverride && isWindowsDriveLetter(buffer)) {
                  state = PATH
                } else if (buffer === '') {
                  url.host = ''
                  if (stateOverride) return
                  state = PATH_START
                } else {
                  failure = url.parseHost(buffer)
                  if (failure) return failure
                  if (url.host === 'localhost') url.host = ''
                  if (stateOverride) return
                  buffer = ''
                  state = PATH_START
                } continue
              } else buffer += chr
              break

            case PATH_START:
              if (url.isSpecial()) {
                state = PATH
                if (chr !== '/' && chr !== '\\') continue
              } else if (!stateOverride && chr === '?') {
                url.query = ''
                state = QUERY
              } else if (!stateOverride && chr === '#') {
                url.fragment = ''
                state = FRAGMENT
              } else if (chr !== EOF) {
                state = PATH
                if (chr !== '/') continue
              } break

            case PATH:
              if (
                chr === EOF || chr === '/' ||
            (chr === '\\' && url.isSpecial()) ||
            (!stateOverride && (chr === '?' || chr === '#'))
              ) {
                if (isDoubleDot(buffer)) {
                  url.shortenPath()
                  if (chr !== '/' && !(chr === '\\' && url.isSpecial())) {
                    push(url.path, '')
                  }
                } else if (isSingleDot(buffer)) {
                  if (chr !== '/' && !(chr === '\\' && url.isSpecial())) {
                    push(url.path, '')
                  }
                } else {
                  if (url.scheme === 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
                    if (url.host) url.host = ''
                    buffer = charAt(buffer, 0) + ':' // normalize windows drive letter
                  }
                  push(url.path, buffer)
                }
                buffer = ''
                if (url.scheme === 'file' && (chr === EOF || chr === '?' || chr === '#')) {
                  while (url.path.length > 1 && url.path[0] === '') {
                    shift(url.path)
                  }
                }
                if (chr === '?') {
                  url.query = ''
                  state = QUERY
                } else if (chr === '#') {
                  url.fragment = ''
                  state = FRAGMENT
                }
              } else {
                buffer += percentEncode(chr, pathPercentEncodeSet)
              } break

            case CANNOT_BE_A_BASE_URL_PATH:
              if (chr === '?') {
                url.query = ''
                state = QUERY
              } else if (chr === '#') {
                url.fragment = ''
                state = FRAGMENT
              } else if (chr !== EOF) {
                url.path[0] += percentEncode(chr, C0ControlPercentEncodeSet)
              } break

            case QUERY:
              if (!stateOverride && chr === '#') {
                url.fragment = ''
                state = FRAGMENT
              } else if (chr !== EOF) {
                if (chr === "'" && url.isSpecial()) url.query += '%27'
                else if (chr === '#') url.query += '%23'
                else url.query += percentEncode(chr, C0ControlPercentEncodeSet)
              } break

            case FRAGMENT:
              if (chr !== EOF) url.fragment += percentEncode(chr, fragmentPercentEncodeSet)
              break
          }

          pointer++
        }
      },
      // https://url.spec.whatwg.org/#host-parsing
      parseHost: function (input) {
        var result, codePoints, index
        if (charAt(input, 0) === '[') {
          if (charAt(input, input.length - 1) !== ']') return INVALID_HOST
          result = parseIPv6(stringSlice(input, 1, -1))
          if (!result) return INVALID_HOST
          this.host = result
          // opaque host
        } else if (!this.isSpecial()) {
          if (exec(FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT, input)) return INVALID_HOST
          result = ''
          codePoints = arrayFrom(input)
          for (index = 0; index < codePoints.length; index++) {
            result += percentEncode(codePoints[index], C0ControlPercentEncodeSet)
          }
          this.host = result
        } else {
          input = toASCII(input)
          if (exec(FORBIDDEN_HOST_CODE_POINT, input)) return INVALID_HOST
          result = parseIPv4(input)
          if (result === null) return INVALID_HOST
          this.host = result
        }
      },
      // https://url.spec.whatwg.org/#cannot-have-a-username-password-port
      cannotHaveUsernamePasswordPort: function () {
        return !this.host || this.cannotBeABaseURL || this.scheme === 'file'
      },
      // https://url.spec.whatwg.org/#include-credentials
      includesCredentials: function () {
        return this.username !== '' || this.password !== ''
      },
      // https://url.spec.whatwg.org/#is-special
      isSpecial: function () {
        return hasOwn(specialSchemes, this.scheme)
      },
      // https://url.spec.whatwg.org/#shorten-a-urls-path
      shortenPath: function () {
        var path = this.path
        var pathSize = path.length
        if (pathSize && (this.scheme !== 'file' || pathSize !== 1 || !isWindowsDriveLetter(path[0], true))) {
          path.length--
        }
      },
      // https://url.spec.whatwg.org/#concept-url-serializer
      serialize: function () {
        var url = this
        var scheme = url.scheme
        var username = url.username
        var password = url.password
        var host = url.host
        var port = url.port
        var path = url.path
        var query = url.query
        var fragment = url.fragment
        var output = scheme + ':'
        if (host !== null) {
          output += '//'
          if (url.includesCredentials()) {
            output += username + (password ? ':' + password : '') + '@'
          }
          output += serializeHost(host)
          if (port !== null) output += ':' + port
        } else if (scheme === 'file') output += '//'
        output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : ''
        if (query !== null) output += '?' + query
        if (fragment !== null) output += '#' + fragment
        return output
      },
      // https://url.spec.whatwg.org/#dom-url-href
      setHref: function (href) {
        var failure = this.parse(href)
        if (failure) throw new TypeError(failure)
        this.searchParams.update()
      },
      // https://url.spec.whatwg.org/#dom-url-origin
      getOrigin: function () {
        var scheme = this.scheme
        var port = this.port
        if (scheme === 'blob') {
          try {
            return new URLConstructor(scheme.path[0]).origin
          } catch (error) {
            return 'null'
          }
        }
        if (scheme === 'file' || !this.isSpecial()) return 'null'
        return scheme + '://' + serializeHost(this.host) + (port !== null ? ':' + port : '')
      },
      // https://url.spec.whatwg.org/#dom-url-protocol
      getProtocol: function () {
        return this.scheme + ':'
      },
      setProtocol: function (protocol) {
        this.parse($toString(protocol) + ':', SCHEME_START)
      },
      // https://url.spec.whatwg.org/#dom-url-username
      getUsername: function () {
        return this.username
      },
      setUsername: function (username) {
        var codePoints = arrayFrom($toString(username))
        if (this.cannotHaveUsernamePasswordPort()) return
        this.username = ''
        for (var i = 0; i < codePoints.length; i++) {
          this.username += percentEncode(codePoints[i], userinfoPercentEncodeSet)
        }
      },
      // https://url.spec.whatwg.org/#dom-url-password
      getPassword: function () {
        return this.password
      },
      setPassword: function (password) {
        var codePoints = arrayFrom($toString(password))
        if (this.cannotHaveUsernamePasswordPort()) return
        this.password = ''
        for (var i = 0; i < codePoints.length; i++) {
          this.password += percentEncode(codePoints[i], userinfoPercentEncodeSet)
        }
      },
      // https://url.spec.whatwg.org/#dom-url-host
      getHost: function () {
        var host = this.host
        var port = this.port
        return host === null ? ''
          : port === null ? serializeHost(host)
            : serializeHost(host) + ':' + port
      },
      setHost: function (host) {
        if (this.cannotBeABaseURL) return
        this.parse(host, HOST)
      },
      // https://url.spec.whatwg.org/#dom-url-hostname
      getHostname: function () {
        var host = this.host
        return host === null ? '' : serializeHost(host)
      },
      setHostname: function (hostname) {
        if (this.cannotBeABaseURL) return
        this.parse(hostname, HOSTNAME)
      },
      // https://url.spec.whatwg.org/#dom-url-port
      getPort: function () {
        var port = this.port
        return port === null ? '' : $toString(port)
      },
      setPort: function (port) {
        if (this.cannotHaveUsernamePasswordPort()) return
        port = $toString(port)
        if (port === '') this.port = null
        else this.parse(port, PORT)
      },
      // https://url.spec.whatwg.org/#dom-url-pathname
      getPathname: function () {
        var path = this.path
        return this.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : ''
      },
      setPathname: function (pathname) {
        if (this.cannotBeABaseURL) return
        this.path = []
        this.parse(pathname, PATH_START)
      },
      // https://url.spec.whatwg.org/#dom-url-search
      getSearch: function () {
        var query = this.query
        return query ? '?' + query : ''
      },
      setSearch: function (search) {
        search = $toString(search)
        if (search === '') {
          this.query = null
        } else {
          if (charAt(search, 0) === '?') search = stringSlice(search, 1)
          this.query = ''
          this.parse(search, QUERY)
        }
        this.searchParams.update()
      },
      // https://url.spec.whatwg.org/#dom-url-searchparams
      getSearchParams: function () {
        return this.searchParams.facade
      },
      // https://url.spec.whatwg.org/#dom-url-hash
      getHash: function () {
        var fragment = this.fragment
        return fragment ? '#' + fragment : ''
      },
      setHash: function (hash) {
        hash = $toString(hash)
        if (hash === '') {
          this.fragment = null
          return
        }
        if (charAt(hash, 0) === '#') hash = stringSlice(hash, 1)
        this.fragment = ''
        this.parse(hash, FRAGMENT)
      },
      update: function () {
        this.query = this.searchParams.serialize() || null
      }
    }

    // `URL` constructor
    // https://url.spec.whatwg.org/#url-class
    var URLConstructor = function URL (url /* , base */) {
      var that = anInstance(this, URLPrototype)
      var base = validateArgumentsLength(arguments.length, 1) > 1 ? arguments[1] : undefined
      var state = setInternalState(that, new URLState(url, false, base))
      if (!DESCRIPTORS) {
        that.href = state.serialize()
        that.origin = state.getOrigin()
        that.protocol = state.getProtocol()
        that.username = state.getUsername()
        that.password = state.getPassword()
        that.host = state.getHost()
        that.hostname = state.getHostname()
        that.port = state.getPort()
        that.pathname = state.getPathname()
        that.search = state.getSearch()
        that.searchParams = state.getSearchParams()
        that.hash = state.getHash()
      }
    }

    var URLPrototype = URLConstructor.prototype

    var accessorDescriptor = function (getter, setter) {
      return {
        get: function () {
          return getInternalURLState(this)[getter]()
        },
        set: setter && function (value) {
          return getInternalURLState(this)[setter](value)
        },
        configurable: true,
        enumerable: true
      }
    }

    if (DESCRIPTORS) {
      // `URL.prototype.href` accessors pair
      // https://url.spec.whatwg.org/#dom-url-href
      defineBuiltInAccessor(URLPrototype, 'href', accessorDescriptor('serialize', 'setHref'))
      // `URL.prototype.origin` getter
      // https://url.spec.whatwg.org/#dom-url-origin
      defineBuiltInAccessor(URLPrototype, 'origin', accessorDescriptor('getOrigin'))
      // `URL.prototype.protocol` accessors pair
      // https://url.spec.whatwg.org/#dom-url-protocol
      defineBuiltInAccessor(URLPrototype, 'protocol', accessorDescriptor('getProtocol', 'setProtocol'))
      // `URL.prototype.username` accessors pair
      // https://url.spec.whatwg.org/#dom-url-username
      defineBuiltInAccessor(URLPrototype, 'username', accessorDescriptor('getUsername', 'setUsername'))
      // `URL.prototype.password` accessors pair
      // https://url.spec.whatwg.org/#dom-url-password
      defineBuiltInAccessor(URLPrototype, 'password', accessorDescriptor('getPassword', 'setPassword'))
      // `URL.prototype.host` accessors pair
      // https://url.spec.whatwg.org/#dom-url-host
      defineBuiltInAccessor(URLPrototype, 'host', accessorDescriptor('getHost', 'setHost'))
      // `URL.prototype.hostname` accessors pair
      // https://url.spec.whatwg.org/#dom-url-hostname
      defineBuiltInAccessor(URLPrototype, 'hostname', accessorDescriptor('getHostname', 'setHostname'))
      // `URL.prototype.port` accessors pair
      // https://url.spec.whatwg.org/#dom-url-port
      defineBuiltInAccessor(URLPrototype, 'port', accessorDescriptor('getPort', 'setPort'))
      // `URL.prototype.pathname` accessors pair
      // https://url.spec.whatwg.org/#dom-url-pathname
      defineBuiltInAccessor(URLPrototype, 'pathname', accessorDescriptor('getPathname', 'setPathname'))
      // `URL.prototype.search` accessors pair
      // https://url.spec.whatwg.org/#dom-url-search
      defineBuiltInAccessor(URLPrototype, 'search', accessorDescriptor('getSearch', 'setSearch'))
      // `URL.prototype.searchParams` getter
      // https://url.spec.whatwg.org/#dom-url-searchparams
      defineBuiltInAccessor(URLPrototype, 'searchParams', accessorDescriptor('getSearchParams'))
      // `URL.prototype.hash` accessors pair
      // https://url.spec.whatwg.org/#dom-url-hash
      defineBuiltInAccessor(URLPrototype, 'hash', accessorDescriptor('getHash', 'setHash'))
    }

    // `URL.prototype.toJSON` method
    // https://url.spec.whatwg.org/#dom-url-tojson
    defineBuiltIn(URLPrototype, 'toJSON', function toJSON () {
      return getInternalURLState(this).serialize()
    }, { enumerable: true })

    // `URL.prototype.toString` method
    // https://url.spec.whatwg.org/#URL-stringification-behavior
    defineBuiltIn(URLPrototype, 'toString', function toString () {
      return getInternalURLState(this).serialize()
    }, { enumerable: true })

    if (NativeURL) {
      var nativeCreateObjectURL = NativeURL.createObjectURL
      var nativeRevokeObjectURL = NativeURL.revokeObjectURL
      // `URL.createObjectURL` method
      // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
      if (nativeCreateObjectURL) defineBuiltIn(URLConstructor, 'createObjectURL', bind(nativeCreateObjectURL, NativeURL))
      // `URL.revokeObjectURL` method
      // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
      if (nativeRevokeObjectURL) defineBuiltIn(URLConstructor, 'revokeObjectURL', bind(nativeRevokeObjectURL, NativeURL))
    }

    setToStringTag(URLConstructor, 'URL')

    $({ global: true, constructor: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS }, {
      URL: URLConstructor
    })
  }, { '../internals/an-instance': 29, '../internals/array-from': 43, '../internals/array-slice': 52, '../internals/define-built-in': 81, '../internals/define-built-in-accessor': 80, '../internals/descriptors': 85, '../internals/export': 107, '../internals/function-bind-context': 113, '../internals/function-uncurry-this': 120, '../internals/global-this': 131, '../internals/has-own-property': 132, '../internals/internal-state': 143, '../internals/object-assign': 184, '../internals/set-to-string-tag': 235, '../internals/string-multibyte': 242, '../internals/string-punycode-to-ascii': 245, '../internals/to-string': 269, '../internals/url-constructor-detection': 278, '../internals/validate-arguments-length': 281, '../modules/es.string.iterator': 474, '../modules/web.url-search-params.constructor': 582 }],
  589: [function (require, module, exports) {
    'use strict'
    // TODO: Remove this module from `core-js@4` since it's replaced to module below
    require('../modules/web.url.constructor')
  }, { '../modules/web.url.constructor': 588 }],
  590: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var getBuiltIn = require('../internals/get-built-in')
    var validateArgumentsLength = require('../internals/validate-arguments-length')
    var toString = require('../internals/to-string')
    var USE_NATIVE_URL = require('../internals/url-constructor-detection')

    var URL = getBuiltIn('URL')

    // `URL.parse` method
    // https://url.spec.whatwg.org/#dom-url-canparse
    $({ target: 'URL', stat: true, forced: !USE_NATIVE_URL }, {
      parse: function parse (url) {
        var length = validateArgumentsLength(arguments.length, 1)
        var urlString = toString(url)
        var base = length < 2 || arguments[1] === undefined ? undefined : toString(arguments[1])
        try {
          return new URL(urlString, base)
        } catch (error) {
          return null
        }
      }
    })
  }, { '../internals/export': 107, '../internals/get-built-in': 123, '../internals/to-string': 269, '../internals/url-constructor-detection': 278, '../internals/validate-arguments-length': 281 }],
  591: [function (require, module, exports) {
    'use strict'
    var $ = require('../internals/export')
    var call = require('../internals/function-call')

    // `URL.prototype.toJSON` method
    // https://url.spec.whatwg.org/#dom-url-tojson
    $({ target: 'URL', proto: true, enumerable: true }, {
      toJSON: function toJSON () {
        return call(URL.prototype.toString, this)
      }
    })
  }, { '../internals/export': 107, '../internals/function-call': 116 }],
  592: [function (require, module, exports) {
    'use strict'
    require('../modules/es.symbol')
    require('../modules/es.symbol.description')
    require('../modules/es.symbol.async-iterator')
    require('../modules/es.symbol.has-instance')
    require('../modules/es.symbol.is-concat-spreadable')
    require('../modules/es.symbol.iterator')
    require('../modules/es.symbol.match')
    require('../modules/es.symbol.match-all')
    require('../modules/es.symbol.replace')
    require('../modules/es.symbol.search')
    require('../modules/es.symbol.species')
    require('../modules/es.symbol.split')
    require('../modules/es.symbol.to-primitive')
    require('../modules/es.symbol.to-string-tag')
    require('../modules/es.symbol.unscopables')
    require('../modules/es.error.cause')
    require('../modules/es.error.to-string')
    require('../modules/es.aggregate-error')
    require('../modules/es.aggregate-error.cause')
    require('../modules/es.array.at')
    require('../modules/es.array.concat')
    require('../modules/es.array.copy-within')
    require('../modules/es.array.every')
    require('../modules/es.array.fill')
    require('../modules/es.array.filter')
    require('../modules/es.array.find')
    require('../modules/es.array.find-index')
    require('../modules/es.array.find-last')
    require('../modules/es.array.find-last-index')
    require('../modules/es.array.flat')
    require('../modules/es.array.flat-map')
    require('../modules/es.array.for-each')
    require('../modules/es.array.from')
    require('../modules/es.array.includes')
    require('../modules/es.array.index-of')
    require('../modules/es.array.is-array')
    require('../modules/es.array.iterator')
    require('../modules/es.array.join')
    require('../modules/es.array.last-index-of')
    require('../modules/es.array.map')
    require('../modules/es.array.of')
    require('../modules/es.array.push')
    require('../modules/es.array.reduce')
    require('../modules/es.array.reduce-right')
    require('../modules/es.array.reverse')
    require('../modules/es.array.slice')
    require('../modules/es.array.some')
    require('../modules/es.array.sort')
    require('../modules/es.array.species')
    require('../modules/es.array.splice')
    require('../modules/es.array.to-reversed')
    require('../modules/es.array.to-sorted')
    require('../modules/es.array.to-spliced')
    require('../modules/es.array.unscopables.flat')
    require('../modules/es.array.unscopables.flat-map')
    require('../modules/es.array.unshift')
    require('../modules/es.array.with')
    require('../modules/es.array-buffer.constructor')
    require('../modules/es.array-buffer.is-view')
    require('../modules/es.array-buffer.slice')
    require('../modules/es.data-view')
    require('../modules/es.array-buffer.detached')
    require('../modules/es.array-buffer.transfer')
    require('../modules/es.array-buffer.transfer-to-fixed-length')
    require('../modules/es.date.get-year')
    require('../modules/es.date.now')
    require('../modules/es.date.set-year')
    require('../modules/es.date.to-gmt-string')
    require('../modules/es.date.to-iso-string')
    require('../modules/es.date.to-json')
    require('../modules/es.date.to-primitive')
    require('../modules/es.date.to-string')
    require('../modules/es.escape')
    require('../modules/es.function.bind')
    require('../modules/es.function.has-instance')
    require('../modules/es.function.name')
    require('../modules/es.global-this')
    require('../modules/es.json.stringify')
    require('../modules/es.json.to-string-tag')
    require('../modules/es.map')
    require('../modules/es.map.group-by')
    require('../modules/es.math.acosh')
    require('../modules/es.math.asinh')
    require('../modules/es.math.atanh')
    require('../modules/es.math.cbrt')
    require('../modules/es.math.clz32')
    require('../modules/es.math.cosh')
    require('../modules/es.math.expm1')
    require('../modules/es.math.fround')
    require('../modules/es.math.hypot')
    require('../modules/es.math.imul')
    require('../modules/es.math.log10')
    require('../modules/es.math.log1p')
    require('../modules/es.math.log2')
    require('../modules/es.math.sign')
    require('../modules/es.math.sinh')
    require('../modules/es.math.tanh')
    require('../modules/es.math.to-string-tag')
    require('../modules/es.math.trunc')
    require('../modules/es.number.constructor')
    require('../modules/es.number.epsilon')
    require('../modules/es.number.is-finite')
    require('../modules/es.number.is-integer')
    require('../modules/es.number.is-nan')
    require('../modules/es.number.is-safe-integer')
    require('../modules/es.number.max-safe-integer')
    require('../modules/es.number.min-safe-integer')
    require('../modules/es.number.parse-float')
    require('../modules/es.number.parse-int')
    require('../modules/es.number.to-exponential')
    require('../modules/es.number.to-fixed')
    require('../modules/es.number.to-precision')
    require('../modules/es.object.assign')
    require('../modules/es.object.create')
    require('../modules/es.object.define-getter')
    require('../modules/es.object.define-properties')
    require('../modules/es.object.define-property')
    require('../modules/es.object.define-setter')
    require('../modules/es.object.entries')
    require('../modules/es.object.freeze')
    require('../modules/es.object.from-entries')
    require('../modules/es.object.get-own-property-descriptor')
    require('../modules/es.object.get-own-property-descriptors')
    require('../modules/es.object.get-own-property-names')
    require('../modules/es.object.get-prototype-of')
    require('../modules/es.object.group-by')
    require('../modules/es.object.has-own')
    require('../modules/es.object.is')
    require('../modules/es.object.is-extensible')
    require('../modules/es.object.is-frozen')
    require('../modules/es.object.is-sealed')
    require('../modules/es.object.keys')
    require('../modules/es.object.lookup-getter')
    require('../modules/es.object.lookup-setter')
    require('../modules/es.object.prevent-extensions')
    require('../modules/es.object.proto')
    require('../modules/es.object.seal')
    require('../modules/es.object.set-prototype-of')
    require('../modules/es.object.to-string')
    require('../modules/es.object.values')
    require('../modules/es.parse-float')
    require('../modules/es.parse-int')
    require('../modules/es.promise')
    require('../modules/es.promise.all-settled')
    require('../modules/es.promise.any')
    require('../modules/es.promise.finally')
    require('../modules/es.promise.with-resolvers')
    require('../modules/es.reflect.apply')
    require('../modules/es.reflect.construct')
    require('../modules/es.reflect.define-property')
    require('../modules/es.reflect.delete-property')
    require('../modules/es.reflect.get')
    require('../modules/es.reflect.get-own-property-descriptor')
    require('../modules/es.reflect.get-prototype-of')
    require('../modules/es.reflect.has')
    require('../modules/es.reflect.is-extensible')
    require('../modules/es.reflect.own-keys')
    require('../modules/es.reflect.prevent-extensions')
    require('../modules/es.reflect.set')
    require('../modules/es.reflect.set-prototype-of')
    require('../modules/es.reflect.to-string-tag')
    require('../modules/es.regexp.constructor')
    require('../modules/es.regexp.dot-all')
    require('../modules/es.regexp.exec')
    require('../modules/es.regexp.flags')
    require('../modules/es.regexp.sticky')
    require('../modules/es.regexp.test')
    require('../modules/es.regexp.to-string')
    require('../modules/es.set')
    require('../modules/es.set.difference.v2')
    require('../modules/es.set.intersection.v2')
    require('../modules/es.set.is-disjoint-from.v2')
    require('../modules/es.set.is-subset-of.v2')
    require('../modules/es.set.is-superset-of.v2')
    require('../modules/es.set.symmetric-difference.v2')
    require('../modules/es.set.union.v2')
    require('../modules/es.string.at-alternative')
    require('../modules/es.string.code-point-at')
    require('../modules/es.string.ends-with')
    require('../modules/es.string.from-code-point')
    require('../modules/es.string.includes')
    require('../modules/es.string.is-well-formed')
    require('../modules/es.string.iterator')
    require('../modules/es.string.match')
    require('../modules/es.string.match-all')
    require('../modules/es.string.pad-end')
    require('../modules/es.string.pad-start')
    require('../modules/es.string.raw')
    require('../modules/es.string.repeat')
    require('../modules/es.string.replace')
    require('../modules/es.string.replace-all')
    require('../modules/es.string.search')
    require('../modules/es.string.split')
    require('../modules/es.string.starts-with')
    require('../modules/es.string.substr')
    require('../modules/es.string.to-well-formed')
    require('../modules/es.string.trim')
    require('../modules/es.string.trim-end')
    require('../modules/es.string.trim-start')
    require('../modules/es.string.anchor')
    require('../modules/es.string.big')
    require('../modules/es.string.blink')
    require('../modules/es.string.bold')
    require('../modules/es.string.fixed')
    require('../modules/es.string.fontcolor')
    require('../modules/es.string.fontsize')
    require('../modules/es.string.italics')
    require('../modules/es.string.link')
    require('../modules/es.string.small')
    require('../modules/es.string.strike')
    require('../modules/es.string.sub')
    require('../modules/es.string.sup')
    require('../modules/es.typed-array.float32-array')
    require('../modules/es.typed-array.float64-array')
    require('../modules/es.typed-array.int8-array')
    require('../modules/es.typed-array.int16-array')
    require('../modules/es.typed-array.int32-array')
    require('../modules/es.typed-array.uint8-array')
    require('../modules/es.typed-array.uint8-clamped-array')
    require('../modules/es.typed-array.uint16-array')
    require('../modules/es.typed-array.uint32-array')
    require('../modules/es.typed-array.at')
    require('../modules/es.typed-array.copy-within')
    require('../modules/es.typed-array.every')
    require('../modules/es.typed-array.fill')
    require('../modules/es.typed-array.filter')
    require('../modules/es.typed-array.find')
    require('../modules/es.typed-array.find-index')
    require('../modules/es.typed-array.find-last')
    require('../modules/es.typed-array.find-last-index')
    require('../modules/es.typed-array.for-each')
    require('../modules/es.typed-array.from')
    require('../modules/es.typed-array.includes')
    require('../modules/es.typed-array.index-of')
    require('../modules/es.typed-array.iterator')
    require('../modules/es.typed-array.join')
    require('../modules/es.typed-array.last-index-of')
    require('../modules/es.typed-array.map')
    require('../modules/es.typed-array.of')
    require('../modules/es.typed-array.reduce')
    require('../modules/es.typed-array.reduce-right')
    require('../modules/es.typed-array.reverse')
    require('../modules/es.typed-array.set')
    require('../modules/es.typed-array.slice')
    require('../modules/es.typed-array.some')
    require('../modules/es.typed-array.sort')
    require('../modules/es.typed-array.subarray')
    require('../modules/es.typed-array.to-locale-string')
    require('../modules/es.typed-array.to-reversed')
    require('../modules/es.typed-array.to-sorted')
    require('../modules/es.typed-array.to-string')
    require('../modules/es.typed-array.with')
    require('../modules/es.unescape')
    require('../modules/es.weak-map')
    require('../modules/es.weak-set')
    require('../modules/web.atob')
    require('../modules/web.btoa')
    require('../modules/web.dom-collections.for-each')
    require('../modules/web.dom-collections.iterator')
    require('../modules/web.dom-exception.constructor')
    require('../modules/web.dom-exception.stack')
    require('../modules/web.dom-exception.to-string-tag')
    require('../modules/web.immediate')
    require('../modules/web.queue-microtask')
    require('../modules/web.self')
    require('../modules/web.structured-clone')
    require('../modules/web.timers')
    require('../modules/web.url')
    require('../modules/web.url.can-parse')
    require('../modules/web.url.parse')
    require('../modules/web.url.to-json')
    require('../modules/web.url-search-params')
    require('../modules/web.url-search-params.delete')
    require('../modules/web.url-search-params.has')
    require('../modules/web.url-search-params.size')

    module.exports = require('../internals/path')
  }, { '../internals/path': 204, '../modules/es.aggregate-error': 290, '../modules/es.aggregate-error.cause': 288, '../modules/es.array-buffer.constructor': 291, '../modules/es.array-buffer.detached': 292, '../modules/es.array-buffer.is-view': 293, '../modules/es.array-buffer.slice': 294, '../modules/es.array-buffer.transfer': 296, '../modules/es.array-buffer.transfer-to-fixed-length': 295, '../modules/es.array.at': 297, '../modules/es.array.concat': 298, '../modules/es.array.copy-within': 299, '../modules/es.array.every': 300, '../modules/es.array.fill': 301, '../modules/es.array.filter': 302, '../modules/es.array.find': 306, '../modules/es.array.find-index': 303, '../modules/es.array.find-last': 305, '../modules/es.array.find-last-index': 304, '../modules/es.array.flat': 308, '../modules/es.array.flat-map': 307, '../modules/es.array.for-each': 309, '../modules/es.array.from': 310, '../modules/es.array.includes': 311, '../modules/es.array.index-of': 312, '../modules/es.array.is-array': 313, '../modules/es.array.iterator': 314, '../modules/es.array.join': 315, '../modules/es.array.last-index-of': 316, '../modules/es.array.map': 317, '../modules/es.array.of': 318, '../modules/es.array.push': 319, '../modules/es.array.reduce': 321, '../modules/es.array.reduce-right': 320, '../modules/es.array.reverse': 322, '../modules/es.array.slice': 323, '../modules/es.array.some': 324, '../modules/es.array.sort': 325, '../modules/es.array.species': 326, '../modules/es.array.splice': 327, '../modules/es.array.to-reversed': 328, '../modules/es.array.to-sorted': 329, '../modules/es.array.to-spliced': 330, '../modules/es.array.unscopables.flat': 332, '../modules/es.array.unscopables.flat-map': 331, '../modules/es.array.unshift': 333, '../modules/es.array.with': 334, '../modules/es.data-view': 336, '../modules/es.date.get-year': 337, '../modules/es.date.now': 338, '../modules/es.date.set-year': 339, '../modules/es.date.to-gmt-string': 340, '../modules/es.date.to-iso-string': 341, '../modules/es.date.to-json': 342, '../modules/es.date.to-primitive': 343, '../modules/es.date.to-string': 344, '../modules/es.error.cause': 345, '../modules/es.error.to-string': 346, '../modules/es.escape': 347, '../modules/es.function.bind': 348, '../modules/es.function.has-instance': 349, '../modules/es.function.name': 350, '../modules/es.global-this': 351, '../modules/es.json.stringify': 352, '../modules/es.json.to-string-tag': 353, '../modules/es.map': 356, '../modules/es.map.group-by': 355, '../modules/es.math.acosh': 357, '../modules/es.math.asinh': 358, '../modules/es.math.atanh': 359, '../modules/es.math.cbrt': 360, '../modules/es.math.clz32': 361, '../modules/es.math.cosh': 362, '../modules/es.math.expm1': 363, '../modules/es.math.fround': 364, '../modules/es.math.hypot': 365, '../modules/es.math.imul': 366, '../modules/es.math.log10': 367, '../modules/es.math.log1p': 368, '../modules/es.math.log2': 369, '../modules/es.math.sign': 370, '../modules/es.math.sinh': 371, '../modules/es.math.tanh': 372, '../modules/es.math.to-string-tag': 373, '../modules/es.math.trunc': 374, '../modules/es.number.constructor': 375, '../modules/es.number.epsilon': 376, '../modules/es.number.is-finite': 377, '../modules/es.number.is-integer': 378, '../modules/es.number.is-nan': 379, '../modules/es.number.is-safe-integer': 380, '../modules/es.number.max-safe-integer': 381, '../modules/es.number.min-safe-integer': 382, '../modules/es.number.parse-float': 383, '../modules/es.number.parse-int': 384, '../modules/es.number.to-exponential': 385, '../modules/es.number.to-fixed': 386, '../modules/es.number.to-precision': 387, '../modules/es.object.assign': 388, '../modules/es.object.create': 389, '../modules/es.object.define-getter': 390, '../modules/es.object.define-properties': 391, '../modules/es.object.define-property': 392, '../modules/es.object.define-setter': 393, '../modules/es.object.entries': 394, '../modules/es.object.freeze': 395, '../modules/es.object.from-entries': 396, '../modules/es.object.get-own-property-descriptor': 397, '../modules/es.object.get-own-property-descriptors': 398, '../modules/es.object.get-own-property-names': 399, '../modules/es.object.get-prototype-of': 401, '../modules/es.object.group-by': 402, '../modules/es.object.has-own': 403, '../modules/es.object.is': 407, '../modules/es.object.is-extensible': 404, '../modules/es.object.is-frozen': 405, '../modules/es.object.is-sealed': 406, '../modules/es.object.keys': 408, '../modules/es.object.lookup-getter': 409, '../modules/es.object.lookup-setter': 410, '../modules/es.object.prevent-extensions': 411, '../modules/es.object.proto': 412, '../modules/es.object.seal': 413, '../modules/es.object.set-prototype-of': 414, '../modules/es.object.to-string': 415, '../modules/es.object.values': 416, '../modules/es.parse-float': 417, '../modules/es.parse-int': 418, '../modules/es.promise': 425, '../modules/es.promise.all-settled': 419, '../modules/es.promise.any': 421, '../modules/es.promise.finally': 424, '../modules/es.promise.with-resolvers': 429, '../modules/es.reflect.apply': 430, '../modules/es.reflect.construct': 431, '../modules/es.reflect.define-property': 432, '../modules/es.reflect.delete-property': 433, '../modules/es.reflect.get': 436, '../modules/es.reflect.get-own-property-descriptor': 434, '../modules/es.reflect.get-prototype-of': 435, '../modules/es.reflect.has': 437, '../modules/es.reflect.is-extensible': 438, '../modules/es.reflect.own-keys': 439, '../modules/es.reflect.prevent-extensions': 440, '../modules/es.reflect.set': 442, '../modules/es.reflect.set-prototype-of': 441, '../modules/es.reflect.to-string-tag': 443, '../modules/es.regexp.constructor': 444, '../modules/es.regexp.dot-all': 445, '../modules/es.regexp.exec': 446, '../modules/es.regexp.flags': 447, '../modules/es.regexp.sticky': 448, '../modules/es.regexp.test': 449, '../modules/es.regexp.to-string': 450, '../modules/es.set': 457, '../modules/es.set.difference.v2': 452, '../modules/es.set.intersection.v2': 453, '../modules/es.set.is-disjoint-from.v2': 454, '../modules/es.set.is-subset-of.v2': 455, '../modules/es.set.is-superset-of.v2': 456, '../modules/es.set.symmetric-difference.v2': 458, '../modules/es.set.union.v2': 459, '../modules/es.string.anchor': 460, '../modules/es.string.at-alternative': 461, '../modules/es.string.big': 462, '../modules/es.string.blink': 463, '../modules/es.string.bold': 464, '../modules/es.string.code-point-at': 465, '../modules/es.string.ends-with': 466, '../modules/es.string.fixed': 467, '../modules/es.string.fontcolor': 468, '../modules/es.string.fontsize': 469, '../modules/es.string.from-code-point': 470, '../modules/es.string.includes': 471, '../modules/es.string.is-well-formed': 472, '../modules/es.string.italics': 473, '../modules/es.string.iterator': 474, '../modules/es.string.link': 475, '../modules/es.string.match': 477, '../modules/es.string.match-all': 476, '../modules/es.string.pad-end': 478, '../modules/es.string.pad-start': 479, '../modules/es.string.raw': 480, '../modules/es.string.repeat': 481, '../modules/es.string.replace': 483, '../modules/es.string.replace-all': 482, '../modules/es.string.search': 484, '../modules/es.string.small': 485, '../modules/es.string.split': 486, '../modules/es.string.starts-with': 487, '../modules/es.string.strike': 488, '../modules/es.string.sub': 489, '../modules/es.string.substr': 490, '../modules/es.string.sup': 491, '../modules/es.string.to-well-formed': 492, '../modules/es.string.trim': 497, '../modules/es.string.trim-end': 493, '../modules/es.string.trim-start': 496, '../modules/es.symbol': 505, '../modules/es.symbol.async-iterator': 498, '../modules/es.symbol.description': 500, '../modules/es.symbol.has-instance': 502, '../modules/es.symbol.is-concat-spreadable': 503, '../modules/es.symbol.iterator': 504, '../modules/es.symbol.match': 508, '../modules/es.symbol.match-all': 507, '../modules/es.symbol.replace': 509, '../modules/es.symbol.search': 510, '../modules/es.symbol.species': 511, '../modules/es.symbol.split': 512, '../modules/es.symbol.to-primitive': 513, '../modules/es.symbol.to-string-tag': 514, '../modules/es.symbol.unscopables': 515, '../modules/es.typed-array.at': 516, '../modules/es.typed-array.copy-within': 517, '../modules/es.typed-array.every': 518, '../modules/es.typed-array.fill': 519, '../modules/es.typed-array.filter': 520, '../modules/es.typed-array.find': 524, '../modules/es.typed-array.find-index': 521, '../modules/es.typed-array.find-last': 523, '../modules/es.typed-array.find-last-index': 522, '../modules/es.typed-array.float32-array': 525, '../modules/es.typed-array.float64-array': 526, '../modules/es.typed-array.for-each': 527, '../modules/es.typed-array.from': 528, '../modules/es.typed-array.includes': 529, '../modules/es.typed-array.index-of': 530, '../modules/es.typed-array.int16-array': 531, '../modules/es.typed-array.int32-array': 532, '../modules/es.typed-array.int8-array': 533, '../modules/es.typed-array.iterator': 534, '../modules/es.typed-array.join': 535, '../modules/es.typed-array.last-index-of': 536, '../modules/es.typed-array.map': 537, '../modules/es.typed-array.of': 538, '../modules/es.typed-array.reduce': 540, '../modules/es.typed-array.reduce-right': 539, '../modules/es.typed-array.reverse': 541, '../modules/es.typed-array.set': 542, '../modules/es.typed-array.slice': 543, '../modules/es.typed-array.some': 544, '../modules/es.typed-array.sort': 545, '../modules/es.typed-array.subarray': 546, '../modules/es.typed-array.to-locale-string': 547, '../modules/es.typed-array.to-reversed': 548, '../modules/es.typed-array.to-sorted': 549, '../modules/es.typed-array.to-string': 550, '../modules/es.typed-array.uint16-array': 551, '../modules/es.typed-array.uint32-array': 552, '../modules/es.typed-array.uint8-array': 553, '../modules/es.typed-array.uint8-clamped-array': 554, '../modules/es.typed-array.with': 555, '../modules/es.unescape': 556, '../modules/es.weak-map': 558, '../modules/es.weak-set': 560, '../modules/web.atob': 566, '../modules/web.btoa': 567, '../modules/web.dom-collections.for-each': 569, '../modules/web.dom-collections.iterator': 570, '../modules/web.dom-exception.constructor': 571, '../modules/web.dom-exception.stack': 572, '../modules/web.dom-exception.to-string-tag': 573, '../modules/web.immediate': 574, '../modules/web.queue-microtask': 575, '../modules/web.self': 576, '../modules/web.structured-clone': 580, '../modules/web.timers': 581, '../modules/web.url': 589, '../modules/web.url-search-params': 585, '../modules/web.url-search-params.delete': 583, '../modules/web.url-search-params.has': 584, '../modules/web.url-search-params.size': 586, '../modules/web.url.can-parse': 587, '../modules/web.url.parse': 590, '../modules/web.url.to-json': 591 }]
}, {}, [13])
