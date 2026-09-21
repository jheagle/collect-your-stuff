import { Linker } from './Linker'

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

  test('falsy data is kept as the data, and null can be stored', () => {
    expect(Linker.make({ data: 0 }).data).toBe(0)
    expect(Linker.make({ data: '' }).data).toBe('')
    expect(Linker.make({ data: false }).data).toBe(false)
    expect(Linker.make({ data: null }).data).toBeNull()
    expect(Linker.make(null).data).toBeNull()
    expect(Linker.make(0).data).toBe(0)
  })

  test('objects without data (or an existing linker) are handled', () => {
    expect(Linker.make({ name: 'x' }).data).toEqual({ name: 'x' })
    const existing = new Linker({ data: 'a' })
    expect(Linker.make(existing)).toBe(existing)
  })

  test('fromArray can be given nothing, or null values', () => {
    expect(Linker.fromArray()).toEqual({ head: null, tail: null })
    const { head, tail } = Linker.fromArray([null, 0, 'a'])
    expect(head.data).toBeNull()
    expect(head.next.data).toBe(0)
    expect(tail.data).toBe('a')
  })
})
