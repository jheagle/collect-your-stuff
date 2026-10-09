/**
 * scoped collection
 */
import { IsScopedCollection } from '../../recipes/IsScopedCollection';
/**
 * A keyed collection, partitioned by an arbitrary scope object: values are stored and looked up by key, with a
 * separate key space per scope. Scopes are held by a WeakMap, so a scope that nothing else references any more
 * takes its whole key space with it - useful anywhere state needs to be tracked per instance of something (a
 * tree's root, a session) without that something needing to hold the state itself.
 */
export declare class ScopedCollection<Scope extends object = object, Key = any, Value = any> implements IsScopedCollection<Scope, Key, Value> {
    private readonly scopes;
    constructor();
    /**
     * Remove a key from a scope's key space.
     * @param scope The scope to remove the key from
     * @param key The key to remove
     * @returns Whether a value was actually removed
     */
    delete(scope: Scope, key: Key): boolean;
    /**
     * Look up a value by key within a scope.
     * @param scope The scope to look within
     * @param key The key to look up
     * @returns The value, or undefined when the scope or key is not present
     */
    get(scope: Scope, key: Key): Value | undefined;
    /**
     * Check whether a key exists within a scope.
     * @param scope The scope to look within
     * @param key The key to check
     */
    has(scope: Scope, key: Key): boolean;
    /**
     * Store a value under a key within a scope.
     * @param scope The scope to store the key within
     * @param key The key to store the value under
     * @param value The value to store
     * @returns This collection, so that setting can be chained
     */
    set(scope: Scope, key: Key, value: Value): this;
}
