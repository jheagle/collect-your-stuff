import { LinkedList } from './linked-list/LinkedList'
import { DoublyLinkedList } from './doubly-linked-list/DoublyLinkedList'
import { LinkedTreeList } from './linked-tree-list/LinkedTreeList'

// A small seeded random number generator so that any failure can be reproduced
const makeRandom = seed => () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296
  return seed / 4294967296
}

const walk = list => {
  const linkers = []
  let current = list.first
  while (current !== null) {
    linkers.push(current)
    current = current.next
  }
  return linkers
}

const walkBack = list => {
  const linkers = []
  let current = list.last
  while (current !== null) {
    linkers.push(current)
    current = current.prev
  }
  return linkers
}

describe.each([
  ['LinkedList', LinkedList, false],
  ['DoublyLinkedList', DoublyLinkedList, true],
  ['LinkedTreeList', LinkedTreeList, true]
])('%s keeps its ends and length right', (name, ListClass, isDoubly) => {
  test('through a long random series of changes, compared with a plain array', () => {
    const random = makeRandom(20260922)
    const list = new ListClass()
    const model = []
    let counter = 0
    const check = step => {
      const linkers = walk(list)
      expect(linkers.map(linker => linker.data)).toEqual(model)
      expect(list.length).toBe(model.length)
      expect(list.first ? list.first.data : null).toBe(model.length ? model[0] : null)
      expect(list.last ? list.last.data : null).toBe(model.length ? model[model.length - 1] : null)
      if (isDoubly) {
        expect(walkBack(list).map(linker => linker.data)).toEqual(model.slice().reverse())
      }
      return step
    }
    for (let step = 0; step < 600; step++) {
      const choice = random()
      const index = Math.floor(random() * model.length)
      const value = `item-${counter++}`
      if (choice < 0.2) {
        list.append(value)
        model.push(value)
      } else if (choice < 0.4) {
        list.prepend(value)
        model.unshift(value)
      } else if (choice < 0.55 && model.length) {
        list.insertAfter(walk(list)[index], value)
        model.splice(index + 1, 0, value)
      } else if (choice < 0.7 && model.length) {
        list.insertBefore(walk(list)[index], value)
        model.splice(index, 0, value)
      } else if (choice < 0.8) {
        list.insertAfter(null, value)
        model.unshift(value)
      } else if (choice < 0.85) {
        list.insertBefore(null, value)
        model.push(value)
      } else if (model.length) {
        expect(list.remove(walk(list)[index]).data).toBe(model[index])
        model.splice(index, 1)
      }
      check(step)
    }
    // Then empty it completely, from both ends
    while (model.length) {
      const removeLast = random() < 0.5
      const removed = list.remove(removeLast ? list.last : list.first)
      expect(removed.data).toBe(removeLast ? model.pop() : model.shift())
      check()
    }
    expect(list.length).toBe(0)
    expect(list.first).toBeNull()
    expect(list.last).toBeNull()
  })

  test('a list built with fromArray knows its end and length', () => {
    const list = ListClass.fromArray(['a', 'b', 'c'])
    expect(list.length).toBe(3)
    expect(list.last.data).toBe('c')
    list.append('d')
    expect(list.length).toBe(4)
    expect(list.last.data).toBe('d')
  })

  test('an end which was linked on directly is found, and reset() refreshes the length', () => {
    const list = ListClass.fromArray(['a', 'b'])
    expect(list.length).toBe(2)
    const extra = list.linkerClass.make('c', list.linkerClass)
    const tail = list.last
    tail.next = extra
    if (isDoubly) {
      extra.prev = tail
    }
    expect(list.last.data).toBe('c')
    expect(list.length).toBe(2)
    list.reset()
    expect(list.length).toBe(3)
    expect(list.last.data).toBe('c')
  })

  test('adding to the end of a large list does not walk the whole list (linear, not quadratic)', () => {
    const size = 50000
    const list = new ListClass()
    const started = Date.now()
    for (let i = 0; i < size; i++) {
      list.append(i)
    }
    expect(list.length).toBe(size)
    expect(list.last.data).toBe(size - 1)
    while (list.length) {
      list.remove(list.first)
    }
    // Quadratic behaviour takes many seconds for this many items, this allows for a slow machine
    expect(Date.now() - started).toBeLessThan(3000)
  })
})
