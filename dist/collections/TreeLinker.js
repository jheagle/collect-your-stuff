'use strict'

function _typeof (obj) { '@babel/helpers - typeof'; if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof = function _typeof (obj) { return typeof obj } } else { _typeof = function _typeof (obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj } } return _typeof(obj) }

require('core-js/modules/es.reflect.construct.js')

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
exports.TreeLinker = void 0

require('core-js/modules/es.array.map.js')

require('core-js/modules/es.object.assign.js')

require('core-js/modules/es.object.set-prototype-of.js')

require('core-js/modules/es.object.get-prototype-of.js')

const _Linker2 = require('./Linker')

function _classCallCheck (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function') } }

function _defineProperties (target, props) { for (let i = 0; i < props.length; i++) { const descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor) } }

function _createClass (Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor }

function _inherits (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function') } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass) }

function _setPrototypeOf (o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf (o, p) { o.__proto__ = p; return o }; return _setPrototypeOf(o, p) }

function _createSuper (Derived) { const hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal () { const Super = _getPrototypeOf(Derived); let result; if (hasNativeReflectConstruct) { const NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget) } else { result = Super.apply(this, arguments) } return _possibleConstructorReturn(this, result) } }

function _possibleConstructorReturn (self, call) { if (call && (_typeof(call) === 'object' || typeof call === 'function')) { return call } return _assertThisInitialized(self) }

function _assertThisInitialized (self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called") } return self }

function _isNativeReflectConstruct () { if (typeof Reflect === 'undefined' || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === 'function') return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true } catch (e) { return false } }

function _getPrototypeOf (o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf (o) { return o.__proto__ || Object.getPrototypeOf(o) }; return _getPrototypeOf(o) }

const TreeLinker = /* #__PURE__ */(function (_Linker) {
  _inherits(TreeLinker, _Linker)

  const _super = _createSuper(TreeLinker)

  /**
   *
   * @param data
   * @param prev
   * @param next
   * @param children
   * @param parent
   * @param LinkerClass
   */
  function TreeLinker () {
    let _this

    const _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
    const _ref$data = _ref.data
    const data = _ref$data === void 0 ? null : _ref$data
    const _ref$prev = _ref.prev
    const prev = _ref$prev === void 0 ? null : _ref$prev
    const _ref$next = _ref.next
    const next = _ref$next === void 0 ? null : _ref$next
    const _ref$children = _ref.children
    const children = _ref$children === void 0 ? null : _ref$children
    const _ref$parent = _ref.parent
    const parent = _ref$parent === void 0 ? null : _ref$parent

    const LinkerClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TreeLinker

    _classCallCheck(this, TreeLinker)

    _this = _super.call(this, {
      data: data,
      prev: prev,
      next: next
    }, LinkerClass)
    _this.parent = parent
    _this.children = _this.childrenFromArray(children, LinkerClass)
    return _this
  }

  _createClass(TreeLinker, [{
    key: 'childrenFromArray',
    value: function childrenFromArray () {
      const _this2 = this

      const children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null
      const LinkerClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TreeLinker
      return children !== null
        ? _Linker2.Linker.fromArray.apply(this, [children.map(function (child) {
          return Object.assign({}, child, {
            parent: _this2
          })
        }), LinkerClass])
        : null
    }
  }])

  return TreeLinker
}(_Linker2.Linker))

exports.TreeLinker = TreeLinker
