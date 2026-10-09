import { ScopedCollection } from './ScopedCollection'

describe('ScopedCollection', () => {
  test('stores and retrieves a value by scope and key', () => {
    const scoped = new ScopedCollection()
    const scope = {}
    scoped.set(scope, 'a', 1)
    expect(scoped.get(scope, 'a')).toBe(1)
    expect(scoped.has(scope, 'a')).toBe(true)
  })

  test('get and has give undefined/false for an unknown scope', () => {
    const scoped = new ScopedCollection()
    expect(scoped.get({}, 'a')).toBeUndefined()
    expect(scoped.has({}, 'a')).toBe(false)
  })

  test('get and has give undefined/false for an unknown key within a known scope', () => {
    const scoped = new ScopedCollection()
    const scope = {}
    scoped.set(scope, 'a', 1)
    expect(scoped.get(scope, 'b')).toBeUndefined()
    expect(scoped.has(scope, 'b')).toBe(false)
  })

  test('two scopes never leak keys into each other', () => {
    const scoped = new ScopedCollection()
    const scopeOne = {}
    const scopeTwo = {}
    scoped.set(scopeOne, 'a', 'one')
    scoped.set(scopeTwo, 'a', 'two')
    expect(scoped.get(scopeOne, 'a')).toBe('one')
    expect(scoped.get(scopeTwo, 'a')).toBe('two')
  })

  test('delete removes a key, and reports whether it actually removed anything', () => {
    const scoped = new ScopedCollection()
    const scope = {}
    scoped.set(scope, 'a', 1)
    expect(scoped.delete(scope, 'a')).toBe(true)
    expect(scoped.has(scope, 'a')).toBe(false)
    expect(scoped.delete(scope, 'a')).toBe(false)
    expect(scoped.delete({}, 'a')).toBe(false)
  })

  test('set can be chained', () => {
    const scoped = new ScopedCollection()
    const scope = {}
    scoped.set(scope, 'a', 1).set(scope, 'b', 2)
    expect(scoped.get(scope, 'a')).toBe(1)
    expect(scoped.get(scope, 'b')).toBe(2)
  })

  test('overwriting a key replaces its value', () => {
    const scoped = new ScopedCollection()
    const scope = {}
    scoped.set(scope, 'a', 1)
    scoped.set(scope, 'a', 2)
    expect(scoped.get(scope, 'a')).toBe(2)
  })
})
