'use strict'

require('core-js/modules/es.symbol.js')

require('core-js/modules/es.symbol.description.js')

require('core-js/modules/es.object.to-string.js')

require('core-js/modules/es.symbol.iterator.js')

require('core-js/modules/es.array.iterator.js')

require('core-js/modules/es.string.iterator.js')

require('core-js/modules/web.dom-collections.iterator.js')

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.Linker = void 0

require('core-js/modules/es.array.reduce.js')

require('core-js/modules/es.object.assign.js')

function _typeof (obj) { '@babel/helpers - typeof'; if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof = function _typeof (obj) { return typeof obj } } else { _typeof = function _typeof (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj } } return _typeof(obj) }

function _classCallCheck (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function') } }

function _defineProperties (target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } }

function _createClass (Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor }

/**
 * @file doubly linked list item.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 */

/**
 *
 */
const Linker = /* #__PURE__ */(function () {
  /**
   *
   * @param data
   * @param prev
   * @param next
   * @param LinkerClass
   */
  function Linker () {
    const _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
    const _ref$data = _ref.data
    const data = _ref$data === void 0 ? null : _ref$data
    const _ref$prev = _ref.prev
    const prev = _ref$prev === void 0 ? null : _ref$prev
    const _ref$next = _ref.next
    const next = _ref$next === void 0 ? null : _ref$next

    const LinkerClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Linker

    _classCallCheck(this, Linker)

    this.LinkerClass = LinkerClass
    this.data = data
    this.prev = prev
    this.next = next
  }
  /**
   *
   * @param node
   * @returns {Linker}
   */

  _createClass(Linker, [{
    key: 'after',
    value: function after (node) {
      if (!node.LinkerClass) {
        if (_typeof(node) !== 'object') {
          node = {
            data: node
          }
        }

        node = new this.LinkerClass(node)
      }

      node.next = this.next
      node.prev = this
      this.next = node

      if (node.next) {
        node.next.prev = node
      }

      return node
    }
    /**
     *
     * @param node
     * @returns {Linker}
     */

  }, {
    key: 'before',
    value: function before (node) {
      if (!node.LinkerClass) {
        if (_typeof(node) !== 'object') {
          node = {
            data: node
          }
        }

        node = new this.LinkerClass(node)
      }

      node.prev = this.prev
      node.next = this
      this.prev = node

      if (node.prev) {
        node.prev.next = node
      }

      return node
    }
  }])

  return Linker
}())
/**
 *
 * @param values
 * @param LinkerClass
 * @returns {Linker}
 */

exports.Linker = Linker

Linker.fromArray = function () {
  const values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []
  const LinkerClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Linker
  return values.reduce(function (list, element) {
    if (list === null) {
      if (_typeof(element) !== 'object') {
        element = {
          data: element
        }
      }

      return new LinkerClass(Object.assign({}, element, {
        prev: list
      }))
    }

    return Linker.prototype.after.apply(list, [element])
  }, null)
}
