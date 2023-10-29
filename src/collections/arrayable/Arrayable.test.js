import Arrayable from './Arrayable'

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
    const ElementClass = someArray.classType
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
    const ElementClass = someArray.classType
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
})
