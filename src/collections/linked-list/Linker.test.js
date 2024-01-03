import Linker from './Linker'

describe('Linker', () => {
  test('can store data and pointer to next and previous linkers', () => {
    const arrayData = ['one', 'two', 'three']
    const linkerHead = new Linker({ data: arrayData[0] })
    linkerHead.next = new Linker({ data: arrayData[1], prev: linkerHead })
    const linkerTail = linkerHead.next.next = new Linker({ data: arrayData[2], prev: linkerHead.next })
    expect(linkerHead.data).toBe(arrayData[0])
    expect(linkerHead.next.data).toBe(arrayData[1])
    expect(linkerHead.next.next.data).toBe(arrayData[2])
    expect(linkerHead.next.next.next).toBeNull()
    expect(linkerTail.data).toBe(arrayData[2])
  })

  test('can be generated using make', () => {
    const nonObjectData = 'stuff'
    const nonObjectMake = Linker.make(nonObjectData)
    expect(nonObjectMake).toBeInstanceOf(Linker)
    expect(nonObjectMake.data).toBe(nonObjectData)
    const objectData = { thing: 'stuff' }
    const objectMake = Linker.make(objectData)
    expect(objectMake).toBeInstanceOf(Linker)
    expect(objectMake.data).toBe(objectData)
    const linker = new Linker('stuff')
    const linkerMake = Linker.make(linker)
    expect(linkerMake).toBeInstanceOf(Linker)
    expect(linkerMake.data).toBe(linker.data)
  })

  test('can be generated from an array', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const linkerReferences = Linker.fromArray(arrayData)
    const linkerHead = linkerReferences.head
    expect(linkerHead.data).toBe(arrayData[0])
    expect(linkerHead.next.data).toBe(arrayData[1])
    expect(linkerHead.next.next.data).toBe(arrayData[2])
    expect(linkerHead.next.next.next.data).toBe(arrayData[3])
    expect(linkerHead.next.next.next.next).toBeNull()
    expect(linkerReferences.tail.data).toBe(arrayData[3])
  })
})
