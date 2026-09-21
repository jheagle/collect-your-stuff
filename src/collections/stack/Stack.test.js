import { Stack } from './Stack'
import { LinkedList } from '../linked-list/LinkedList'
import { DoublyLinkedList } from '../doubly-linked-list/DoublyLinkedList'
import { Arrayable } from '../arrayable/Arrayable'
import { Linker } from '../linked-list/Linker'

describe('Stack', () => {
  test('is last in, first out', () => {
    const someStack = new Stack()
    someStack.push('one').push('two').push('three')
    expect(someStack.size()).toBe(3)
    expect(someStack.pop()).toBe('three')
    expect(someStack.pop()).toBe('two')
    someStack.push('four')
    expect(someStack.pop()).toBe('four')
    expect(someStack.pop()).toBe('one')
    expect(someStack.empty()).toBe(true)
  })

  test('pop and peek give null when the stack is empty', () => {
    const someStack = new Stack()
    expect(someStack.pop()).toBeNull()
    expect(someStack.peek()).toBeNull()
    expect(someStack.top()).toBeNull()
    expect(someStack.empty()).toBe(true)
    expect(someStack.size()).toBe(0)
  })

  test('peek (and top) show the top without removing it', () => {
    const someStack = Stack.fromArray(['one', 'two'])
    expect(someStack.peek()).toBe('two')
    expect(someStack.top()).toBe('two')
    expect(someStack.size()).toBe(2)
  })

  test('fromArray pushes each value in turn, so the last value is on the top', () => {
    const someStack = Stack.fromArray([1, 2, 3])
    expect(someStack.pop()).toBe(3)
    expect(Array.from(Stack.fromArray([1, 2, 3]))).toEqual([3, 2, 1])
  })

  test('gives back exactly what was stacked: functions, objects (even ones with a data property), null and falsy values', () => {
    const fn = () => 'ran'
    const withData = { data: 5, other: 'kept' }
    const items = [fn, withData, null, 0, '', false, { task: 1 }, [1, 2]]
    const someStack = Stack.fromArray(items)
    expect(someStack.size()).toBe(items.length)
    items.slice().reverse().forEach(item => expect(someStack.pop()).toBe(item))
    expect(someStack.empty()).toBe(true)
  })

  test('can be built on another kind of list', () => {
    ;[LinkedList, DoublyLinkedList, Arrayable].forEach(ListClass => {
      const someStack = new Stack(null, ListClass)
      someStack.push(1).push(2)
      expect(someStack.pop()).toBe(2)
      expect(someStack.peek()).toBe(1)
      expect(someStack.size()).toBe(1)
    })
  })

  test('uses the linker class it was given', () => {
    class CustomLinker extends Linker {}
    const someStack = new Stack(null, LinkedList, CustomLinker)
    someStack.push('a')
    expect(someStack.stackedList.first).toBeInstanceOf(CustomLinker)
  })

  test('adding and taking many items is fast', () => {
    const someStack = new Stack()
    const started = Date.now()
    for (let i = 0; i < 50000; i++) {
      someStack.push(i)
    }
    expect(someStack.size()).toBe(50000)
    while (!someStack.empty()) {
      someStack.pop()
    }
    expect(Date.now() - started).toBeLessThan(3000)
  })
})
