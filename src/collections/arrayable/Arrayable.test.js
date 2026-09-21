import { ArrayElement } from './ArrayElement'
import { Arrayable } from './Arrayable'

describe('Arrayable', () => {
  test('can store elements', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const someArray = Arrayable.fromArray(arrayData)
    expect(someArray.length).toBe(4)
    expect(Array.from(someArray).map(item => item.data)).toEqual(arrayData)
  })

  test('first contains the head value', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const someArray = Arrayable.fromArray(arrayData)
    expect(someArray.first.data).toBe(arrayData[0])
  })

  test('last contains the tail value', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const someArray = Arrayable.fromArray(arrayData)
    expect(someArray.last.data).toBe(arrayData[3])
  })

  test('can append with insertAfter', () => {
    const arrayData = ['one', 'two', 'three']
    const someArrayable = Arrayable.fromArray([arrayData[0]])
    someArrayable.insertAfter(someArrayable.first, arrayData[2])
    someArrayable.insertAfter(someArrayable.first, arrayData[1])
    expect(someArrayable.item(0).data).toBe(arrayData[0])
    expect(someArrayable.item(1).data).toBe(arrayData[1])
    expect(someArrayable.item(2).data).toBe(arrayData[2])
  })

  test('can append with insertBefore', () => {
    const arrayData = ['one', 'two', 'three']
    const someArrayable = Arrayable.fromArray([arrayData[2]])
    someArrayable.insertBefore(someArrayable.last, arrayData[0])
    someArrayable.insertBefore(someArrayable.last, arrayData[1])
    expect(someArrayable.item(0).data).toBe(arrayData[0])
    expect(someArrayable.item(1).data).toBe(arrayData[1])
    expect(someArrayable.item(2).data).toBe(arrayData[2])
  })

  test('can append to the array', () => {
    const someArray = Arrayable.fromArray(['one', 'two', 'three', 'four'])
    const ElementClass = someArray.first.classType
    const newNode = new ElementClass('five')
    let updatedArrayable = someArray.append(newNode)
    expect(someArray.length).toBe(5)
    expect(someArray.last.data).toBe('five')
    expect(updatedArrayable.last.data).toBe('five')
    updatedArrayable = someArray.append('six')
    expect(someArray.length).toBe(6)
    expect(someArray.last.data).toBe('six')
    expect(updatedArrayable.last.data).toBe('six')
  })

  test('can prepend to the array', () => {
    const someArray = Arrayable.fromArray(['one', 'two', 'three', 'four'])
    const ElementClass = someArray.first.classType
    const newNode = new ElementClass('zero')
    let updatedArrayable = someArray.prepend(newNode)
    expect(someArray.length).toBe(5)
    expect(someArray.first.data).toBe('zero')
    expect(updatedArrayable.first.data).toBe('zero')
    updatedArrayable = someArray.prepend('negative one')
    expect(someArray.length).toBe(6)
    expect(someArray.first.data).toBe('negative one')
    expect(updatedArrayable.first.data).toBe('negative one')
  })

  test('can remove the given node from the array', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const someArray = Arrayable.fromArray(arrayData)
    // Check that first can be removed
    const firstElement = someArray.first
    expect(firstElement.data).toBe(arrayData[0])
    const removedFirst = someArray.remove(firstElement)
    expect(removedFirst.data).toBe(firstElement.data)
    // The first element is now 'two'
    expect(someArray.first.data).toBe(arrayData[1])
    // Check that last can be removed
    const lastElement = someArray.last
    expect(lastElement.data).toBe(arrayData[3])
    const removedLast = someArray.remove(lastElement)
    expect(removedLast.data).toBe(lastElement.data)
    // The last element is now 'three'
    expect(someArray.last.data).toBe(arrayData[2])
  })

  test('can iterate with for-of loop', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const someArray = Arrayable.fromArray(arrayData)
    let count = -1
    for (const item of someArray) {
      expect(item.data).toBe(arrayData[++count])
    }
    expect(count).toBe(3)
  })

  test('can iterate with forEach loop', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const someArray = Arrayable.fromArray(arrayData)
    let count = -1
    someArray.forEach(item => {
      expect(item.data).toBe(arrayData[++count])
    })
    expect(count).toBe(3)
  })

  test('can fetch an element by positive index from start', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const someArray = Arrayable.fromArray(arrayData)
    expect(someArray.item(0).data).toBe(arrayData[0])
    expect(someArray.item(1).data).toBe(arrayData[1])
    expect(someArray.item(2).data).toBe(arrayData[2])
    expect(someArray.item(3).data).toBe(arrayData[3])
    expect(someArray.item(4)).toBeNull()
  })

  test('can fetch an element by negative index from end', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const someArray = Arrayable.fromArray(arrayData)
    expect(someArray.item(-1).data).toBe(arrayData[3])
    expect(someArray.item(-2).data).toBe(arrayData[2])
    expect(someArray.item(-3).data).toBe(arrayData[1])
    expect(someArray.item(-4).data).toBe(arrayData[0])
    expect(someArray.item(-5)).toBeNull()
  })

  describe('with elements which are not in the list, or no reference element', () => {
    const values = list => Array.from(list).map(element => element.data)

    test('remove returns null and leaves the list alone for an element which is not in it', () => {
      const someArray = Arrayable.fromArray(['a', 'b', 'c'])
      expect(someArray.remove(new ArrayElement('x'))).toBeNull()
      expect(values(someArray)).toEqual(['a', 'b', 'c'])
    })

    test('insertBefore and insertAfter throw for a reference element which is not in the list', () => {
      const someArray = Arrayable.fromArray(['a', 'b', 'c'])
      expect(() => someArray.insertBefore(new ArrayElement('x'), 'y')).toThrow('not in this list')
      expect(() => someArray.insertAfter(new ArrayElement('x'), 'y')).toThrow('not in this list')
      expect(values(someArray)).toEqual(['a', 'b', 'c'])
    })

    test('inserting after null goes at the start, before null goes at the end', () => {
      const someArray = Arrayable.fromArray(['a', 'b'])
      someArray.insertAfter(null, 'start')
      someArray.insertBefore(null, 'end')
      expect(values(someArray)).toEqual(['start', 'a', 'b', 'end'])
    })

    test('first and last are null when the list is empty', () => {
      const emptyArray = new Arrayable()
      expect(emptyArray.first).toBeNull()
      expect(emptyArray.last).toBeNull()
      emptyArray.append('only')
      expect(emptyArray.first.data).toBe('only')
      expect(emptyArray.last.data).toBe('only')
    })

    test('append and prepend work on an empty list', () => {
      const emptyArray = new Arrayable()
      emptyArray.append('b')
      emptyArray.prepend('a')
      expect(values(emptyArray)).toEqual(['a', 'b'])
    })
  })

  test('elements added to the list are made with the element class the list was given', () => {
    class CustomElement extends ArrayElement {}
    const someArray = new Arrayable(CustomElement)
    someArray.append('a')
    someArray.prepend('b')
    expect(Array.from(someArray).every(element => element instanceof CustomElement)).toBe(true)
  })
})
