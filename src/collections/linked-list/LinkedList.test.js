import { Linker } from './Linker'
import { LinkedList } from './LinkedList'

describe('LinkedList', () => {
  test('can store linkers', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const someList = LinkedList.fromArray(arrayData)
    expect(someList.length).toBe(4)
    expect(Array.from(someList).map(item => item.data)).toEqual(arrayData)
  })

  test('first contains the head value', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const someList = LinkedList.fromArray(arrayData)
    expect(someList.first.data).toBe(arrayData[0])
  })

  test('last contains the tail value', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const someList = LinkedList.fromArray(arrayData)
    expect(someList.last.data).toBe(arrayData[3])
  })

  test('can iterate with for-of loop', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const someList = LinkedList.fromArray(arrayData)
    let count = -1
    for (const item of someList) {
      expect(item.data).toBe(arrayData[++count])
    }
    expect(count).toBe(3)
  })

  test('can iterate with forEach loop', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const someList = LinkedList.fromArray(arrayData)
    let count = -1
    someList.forEach(item => {
      expect(item.data).toBe(arrayData[++count])
    })
    expect(count).toBe(3)
  })

  test('can fetch an linker by positive index from start', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const someList = LinkedList.fromArray(arrayData)
    expect(someList.item(0).data).toBe(arrayData[0])
    expect(someList.item(1).data).toBe(arrayData[1])
    expect(someList.item(2).data).toBe(arrayData[2])
    expect(someList.item(3).data).toBe(arrayData[3])
    expect(someList.item(4)).toBeNull()
  })

  test('can fetch an linker by negative index from end', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const someList = LinkedList.fromArray(arrayData)
    expect(someList.item(-1).data).toBe(arrayData[3])
    expect(someList.item(-2).data).toBe(arrayData[2])
    expect(someList.item(-3).data).toBe(arrayData[1])
    expect(someList.item(-4).data).toBe(arrayData[0])
    expect(someList.item(-5)).toBeNull()
  })

  test('can append with insertAfter', () => {
    const arrayData = ['one', 'two', 'three']
    const someLinkedList = LinkedList.fromArray([arrayData[0]])
    someLinkedList.insertAfter(someLinkedList.first, arrayData[2])
    someLinkedList.insertAfter(someLinkedList.first, arrayData[1])
    expect(someLinkedList.item(0).data).toBe(arrayData[0])
    expect(someLinkedList.item(1).data).toBe(arrayData[1])
    expect(someLinkedList.item(2).data).toBe(arrayData[2])
  })

  test('can append with insertBefore', () => {
    const arrayData = ['one', 'two', 'three']
    const someLinkedList = LinkedList.fromArray([arrayData[2]])
    someLinkedList.insertBefore(someLinkedList.last, arrayData[0])
    someLinkedList.insertBefore(someLinkedList.last, arrayData[1])
    expect(someLinkedList.item(0).data).toBe(arrayData[0])
    expect(someLinkedList.item(1).data).toBe(arrayData[1])
    expect(someLinkedList.item(2).data).toBe(arrayData[2])
  })

  test('can append to the array', () => {
    const someList = LinkedList.fromArray(['one', 'two', 'three', 'four'])
    const LinkerClass = someList.first.classType
    const newNode = new LinkerClass({ data: 'five' })
    someList.append(newNode)
    expect(someList.length).toBe(5)
    expect(someList.last.data).toBe('five')
    someList.append('six')
    expect(someList.length).toBe(6)
    expect(someList.last.data).toBe('six')
  })

  test('can prepend to the array', () => {
    const someList = LinkedList.fromArray(['one', 'two', 'three', 'four'])
    const LinkerClass = someList.first.classType
    const newNode = new LinkerClass({ data: 'zero' })
    someList.prepend(newNode)
    expect(someList.length).toBe(5)
    expect(someList.first.data).toBe('zero')
    someList.prepend('negative one')
    expect(someList.length).toBe(6)
    expect(someList.first.data).toBe('negative one')
  })

  test('can remove the given node from the list', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const someArray = LinkedList.fromArray(arrayData)
    // Check that first can be removed
    const firstLinker = someArray.first
    expect(firstLinker.data).toBe(arrayData[0])
    const removedFirst = someArray.remove(firstLinker)
    expect(removedFirst.data).toBe(firstLinker.data)
    // The first linker is now 'two'
    expect(someArray.first.data).toBe(arrayData[1])
    // Check that last can be removed
    const lastLinker = someArray.last
    expect(lastLinker.data).toBe(arrayData[3])
    const removedLast = someArray.remove(lastLinker)
    expect(removedLast.data).toBe(lastLinker.data)
    // The last linker is now 'three'
    expect(someArray.last.data).toBe(arrayData[2])
  })

  describe('with nodes which are not in the list, or no reference node', () => {
    const values = list => Array.from(list).map(node => node.data)

    test('inserting after null goes at the start, before null goes at the end', () => {
      const someList = LinkedList.fromArray(['a', 'b'])
      someList.insertAfter(null, 'start')
      someList.insertBefore(null, 'end')
      expect(values(someList)).toEqual(['start', 'a', 'b', 'end'])
      expect(someList.first.data).toBe('start')
      expect(someList.last.data).toBe('end')
    })

    test('inserting relative to null works on an empty list', () => {
      const first = new LinkedList()
      first.insertAfter(null, 'a')
      expect(values(first)).toEqual(['a'])
      const second = new LinkedList()
      second.insertBefore(null, 'b')
      expect(values(second)).toEqual(['b'])
    })

    test('append and prepend work on an empty list', () => {
      const someList = new LinkedList()
      someList.append('b')
      someList.prepend('a')
      expect(values(someList)).toEqual(['a', 'b'])
    })
  })

  describe('removing and inserting relative to nodes not in the list', () => {
    test('remove returns null (and changes nothing) for null or a node which is not in the list', () => {
      const someList = LinkedList.fromArray(['a', 'b'])
      expect(someList.remove(null)).toBeNull()
      expect(someList.remove(new Linker({ data: 'x' }))).toBeNull()
      expect(someList.length).toBe(2)
    })

    test('insertBefore throws for a reference node which is not in the list', () => {
      const someList = LinkedList.fromArray(['a'])
      expect(() => someList.insertBefore(new Linker({ data: 'x' }), 'y')).toThrow('not in this list')
      expect(someList.length).toBe(1)
    })

    test('the head, the middle and the only node can still be removed', () => {
      const someList = LinkedList.fromArray(['a', 'b', 'c'])
      expect(someList.remove(someList.first).data).toBe('a')
      expect(someList.remove(someList.first.next).data).toBe('c')
      expect(someList.remove(someList.first).data).toBe('b')
      expect(someList.length).toBe(0)
      expect(someList.first).toBeNull()
    })
  })

  test('nodes added to the list are made with the linker class the list was given', () => {
    class CustomLinker extends Linker {}
    const someList = new LinkedList(CustomLinker)
    someList.append('a')
    someList.prepend('b')
    someList.insertAfter(someList.first, 'c')
    expect(Array.from(someList).every(node => node instanceof CustomLinker)).toBe(true)
  })
})
