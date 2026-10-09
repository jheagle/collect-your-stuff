/**
 * ScopedCollection recipe.
 */

/**
 * Define a keyed collection partitioned by scope: every scope has its own independent key space, and a scope
 * that is no longer referenced anywhere else takes its whole key space with it.
 */
export interface IsScopedCollection<Scope extends object = object, Key = any, Value = any> {
  /**
   * Remove a key from a scope's key space.
   * @returns Whether a value was actually removed
   */
  delete: (scope: Scope, key: Key) => boolean

  /**
   * Look up a value by key within a scope.
   * @returns The value, or undefined when the scope or key is not present
   */
  get: (scope: Scope, key: Key) => Value | undefined

  /**
   * Check whether a key exists within a scope.
   */
  has: (scope: Scope, key: Key) => boolean

  /**
   * Store a value under a key within a scope.
   */
  set: (scope: Scope, key: Key, value: Value) => void
}
