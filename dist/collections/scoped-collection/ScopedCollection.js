'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.ScopedCollection = void 0
require('core-js/modules/esnext.map.delete-all.js')
require('core-js/modules/esnext.map.every.js')
require('core-js/modules/esnext.map.filter.js')
require('core-js/modules/esnext.map.find.js')
require('core-js/modules/esnext.map.find-key.js')
require('core-js/modules/esnext.map.includes.js')
require('core-js/modules/esnext.map.key-of.js')
require('core-js/modules/esnext.map.map-keys.js')
require('core-js/modules/esnext.map.map-values.js')
require('core-js/modules/esnext.map.merge.js')
require('core-js/modules/esnext.map.reduce.js')
require('core-js/modules/esnext.map.some.js')
require('core-js/modules/esnext.map.update.js')
require('core-js/modules/esnext.weak-map.delete-all.js')
/**
 * A keyed collection, partitioned by an arbitrary scope object: values are stored and looked up by key, with a
 * separate key space per scope. Scopes are held by a WeakMap, so a scope that nothing else references any more
 * takes its whole key space with it - useful anywhere state needs to be tracked per instance of something (a
 * tree's root, a session) without that something needing to hold the state itself.
 */
class ScopedCollection {
  constructor () {
    this.scopes = new WeakMap()
  }

  /**
   * Remove a key from a scope's key space.
   * @param scope The scope to remove the key from
   * @param key The key to remove
   * @returns Whether a value was actually removed
   */
  delete (scope, key) {
    const keyedValues = this.scopes.get(scope)
    return typeof keyedValues === 'undefined' ? false : keyedValues.delete(key)
  }

  /**
   * Look up a value by key within a scope.
   * @param scope The scope to look within
   * @param key The key to look up
   * @returns The value, or undefined when the scope or key is not present
   */
  get (scope, key) {
    let _a
    return (_a = this.scopes.get(scope)) === null || _a === void 0 ? void 0 : _a.get(key)
  }

  /**
   * Check whether a key exists within a scope.
   * @param scope The scope to look within
   * @param key The key to check
   */
  has (scope, key) {
    let _a, _b
    return (_b = (_a = this.scopes.get(scope)) === null || _a === void 0 ? void 0 : _a.has(key)) !== null && _b !== void 0 ? _b : false
  }

  /**
   * Store a value under a key within a scope.
   * @param scope The scope to store the key within
   * @param key The key to store the value under
   * @param value The value to store
   * @returns This collection, so that setting can be chained
   */
  set (scope, key, value) {
    let keyedValues = this.scopes.get(scope)
    if (typeof keyedValues === 'undefined') {
      keyedValues = new Map()
      this.scopes.set(scope, keyedValues)
    }
    keyedValues.set(key, value)
    return this
  }
}
exports.ScopedCollection = ScopedCollection
