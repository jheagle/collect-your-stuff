'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.LinkedList = void 0
var _Linker = require('./Linker')
/**
 * @file doubly linked list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 */

/**
 *
 */
class LinkedList {
  /**
   *
   * @param LinkerClass
   * @param ListClass
   */
  constructor () {
    const LinkerClass = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _Linker.Linker
    const ListClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : LinkedList
    this.LinkerClass = LinkerClass
    this.ListClass = ListClass
    this.innerList = new this.LinkerClass()
  }

  /**
   *
   * @returns {Linker}
   */
  get first () {
    let head = this.innerList
    let prev = head.prev
    while (prev !== null) {
      head = prev
      prev = head.prev
    }
    return head
  }

  /**
   *
   * @returns {Linker}
   */
  get last () {
    let tail = this.innerList
    let next = tail.next
    while (next !== null) {
      tail = next
      next = tail.next
    }
    return tail
  }

  /**
   *
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
   *
   * @param node
   */
  append (node) {
    this.last.after(node)
    return this.first
  }

  /**
   *
   * @param node
   */
  prepend (node) {
    return this.first.before(node)
  }

  /**
   *
   * @param index
   * @returns {null|*}
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
   *
   * @param callback
   */
  forEach (callback) {
    let current = this.first
    while (current !== null) {
      callback(current)
      current = current.next
    }
  }

  /**
   *
   * @returns {{next: (function(): {value: (*|null), done: boolean})}}
   */
  [Symbol.iterator] () {
    let current = this.first
    return {
      next: () => {
        const result = {
          value: current,
          done: !current
        }
        current = current ? current.next : null
        return result
      }
    }
  }
}

/**
 *
 * @param values
 * @param LinkerClass
 * @param ListClass
 * @returns {LinkedList}
 */
exports.LinkedList = LinkedList
LinkedList.fromArray = function () {
  const values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
  const LinkerClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Linker.Linker
  const ListClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : LinkedList
  const list = new ListClass(LinkerClass)
  list.innerList = list.LinkerClass.fromArray(values, LinkerClass)
  return list
}
