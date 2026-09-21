import { Queue } from './Queue'
import { LinkedList } from '../linked-list/LinkedList'
import { DoublyLinkedList } from '../doubly-linked-list/DoublyLinkedList'
import { Arrayable } from '../arrayable/Arrayable'
import { Linker } from '../linked-list/Linker'

describe('Queue', () => {
  test('is first in, first out', () => {
    const someQueue = new Queue()
    someQueue.enqueue('one').enqueue('two').enqueue('three')
    expect(someQueue.size()).toBe(3)
    expect(someQueue.dequeue()).toBe('one')
    expect(someQueue.dequeue()).toBe('two')
    someQueue.enqueue('four')
    expect(someQueue.dequeue()).toBe('three')
    expect(someQueue.dequeue()).toBe('four')
    expect(someQueue.empty()).toBe(true)
  })

  test('dequeue and peek give null when the queue is empty', () => {
    const someQueue = new Queue()
    expect(someQueue.dequeue()).toBeNull()
    expect(someQueue.peek()).toBeNull()
    expect(someQueue.empty()).toBe(true)
    expect(someQueue.size()).toBe(0)
  })

  test('peek shows the front without removing it', () => {
    const someQueue = Queue.fromArray(['one', 'two'])
    expect(someQueue.peek()).toBe('one')
    expect(someQueue.peek()).toBe('one')
    expect(someQueue.size()).toBe(2)
  })

  test('fromArray puts the first value at the front', () => {
    const someQueue = Queue.fromArray([1, 2, 3])
    expect(someQueue.dequeue()).toBe(1)
    expect(Array.from(Queue.fromArray([1, 2, 3]))).toEqual([1, 2, 3])
  })

  test('gives back exactly what was queued: functions, objects (even ones with a data property), null and falsy values', () => {
    const fn = () => 'ran'
    const withData = { data: 5, other: 'kept' }
    const items = [fn, withData, null, 0, '', false, { task: 1 }, [1, 2]]
    const someQueue = Queue.fromArray(items)
    expect(someQueue.size()).toBe(items.length)
    items.forEach(item => expect(someQueue.dequeue()).toBe(item))
    expect(someQueue.empty()).toBe(true)
  })

  test('can be iterated without removing anything', () => {
    const someQueue = Queue.fromArray(['a', 'b', 'c'])
    expect(Array.from(someQueue)).toEqual(['a', 'b', 'c'])
    expect(someQueue.size()).toBe(3)
  })

  test('can be built on another kind of list', () => {
    ;[LinkedList, DoublyLinkedList, Arrayable].forEach(ListClass => {
      const someQueue = new Queue(null, ListClass)
      someQueue.enqueue(1).enqueue(2)
      expect(someQueue.dequeue()).toBe(1)
      expect(someQueue.peek()).toBe(2)
      expect(someQueue.size()).toBe(1)
    })
  })

  test('can start from an existing list', () => {
    const someQueue = new Queue(LinkedList.fromArray(['a', 'b']))
    expect(someQueue.size()).toBe(2)
    expect(someQueue.dequeue()).toBe('a')
  })

  test('uses the linker class it was given', () => {
    class CustomLinker extends Linker {}
    const someQueue = new Queue(null, LinkedList, CustomLinker)
    someQueue.enqueue('a')
    expect(someQueue.queuedList.first).toBeInstanceOf(CustomLinker)
  })

  test('has the shape of the queue si-funciona expects (dequeue, empty, enqueue, peek, size)', () => {
    const someQueue = new Queue()
    ;['dequeue', 'empty', 'enqueue', 'peek', 'size'].forEach(name => expect(typeof someQueue[name]).toBe('function'))
  })

  test('adding and taking many items is fast', () => {
    const someQueue = new Queue()
    const started = Date.now()
    for (let i = 0; i < 50000; i++) {
      someQueue.enqueue(i)
    }
    expect(someQueue.size()).toBe(50000)
    let sum = 0
    while (!someQueue.empty()) {
      sum += someQueue.dequeue()
    }
    expect(sum).toBe(49999 * 50000 / 2)
    expect(Date.now() - started).toBeLessThan(3000)
  })
})
