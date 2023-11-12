import DoubleLinker from './DoubleLinker'

describe('DoubleLinker', () => {
  test('can store data and pointer to next and previous linkers', () => {
    const arrayData = ['one', 'two', 'three']
    const linkerHead = new DoubleLinker({ data: arrayData[0] })
    linkerHead.next = new DoubleLinker({ data: arrayData[1], prev: linkerHead })
    const linkerTail = linkerHead.next.next = new DoubleLinker({ data: arrayData[2], prev: linkerHead.next })
    expect(linkerHead.data).toBe(arrayData[0])
    expect(linkerHead.next.data).toBe(arrayData[1])
    expect(linkerHead.next.next.data).toBe(arrayData[2])
    expect(linkerHead.next.next.next).toBeNull()
    expect(linkerTail.data).toBe(arrayData[2])
    expect(linkerTail.prev.data).toBe(arrayData[1])
    expect(linkerTail.prev.prev.data).toBe(arrayData[0])
    expect(linkerTail.prev.prev.prev).toBeNull()
  })

  test('can be generated using make', () => {
    const nonObjectData = 'stuff'
    const nonObjectMake = DoubleLinker.make(nonObjectData)
    expect(nonObjectMake).toBeInstanceOf(DoubleLinker)
    expect(nonObjectMake.data).toBe(nonObjectData)
    const objectData = { thing: 'stuff' }
    const objectMake = DoubleLinker.make(objectData)
    expect(objectMake).toBeInstanceOf(DoubleLinker)
    expect(objectMake.data).toBe(objectData)
    const linker = new DoubleLinker('stuff')
    const linkerMake = DoubleLinker.make(linker)
    expect(linkerMake).toBeInstanceOf(DoubleLinker)
    expect(linkerMake.data).toBe(linker.data)
  })

  test('can be generated from an array', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const linkerReferences = DoubleLinker.fromArray(arrayData)
    const linkerHead = linkerReferences.head
    const linkerTail = linkerReferences.tail
    expect(linkerHead.data).toBe(arrayData[0])
    expect(linkerHead.next.data).toBe(arrayData[1])
    expect(linkerHead.next.next.data).toBe(arrayData[2])
    expect(linkerHead.next.next.next.data).toBe(arrayData[3])
    expect(linkerHead.next.next.next.next).toBeNull()
    expect(linkerTail.data).toBe(arrayData[3])
    expect(linkerTail.prev.data).toBe(arrayData[2])
    expect(linkerTail.prev.prev.data).toBe(arrayData[1])
    expect(linkerTail.prev.prev.prev.data).toBe(arrayData[0])
    expect(linkerTail.prev.prev.prev.prev).toBeNull()
  })
})
