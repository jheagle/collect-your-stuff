import { ArrayElement } from './ArrayElement'

describe('Element', () => {
  test('can store data', () => {
    const arrayData = ['one', 'two', 'three']
    const elementHead = new ArrayElement(arrayData[0])
    expect(elementHead.data).toBe(arrayData[0])
  })

  test('can be generated using make', () => {
    const nonObjectData = 'stuff'
    const nonObjectMake = ArrayElement.make(nonObjectData)
    expect(nonObjectMake).toBeInstanceOf(ArrayElement)
    expect(nonObjectMake.data).toBe(nonObjectData)
    const objectData = { thing: 'stuff' }
    const objectMake = ArrayElement.make(objectData)
    expect(objectMake).toBeInstanceOf(ArrayElement)
    expect(objectMake.data).toBe(objectData)
    const element = new ArrayElement('stuff')
    const elementMake = ArrayElement.make(element)
    expect(elementMake).toBeInstanceOf(ArrayElement)
    expect(elementMake.data).toBe(element.data)
  })

  test('can be generated from an array', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const elementReferences = ArrayElement.fromArray(arrayData)
    const elementHead = elementReferences.head[0]
    const elementTail = elementReferences.tail
    expect(elementHead.data).toBe(arrayData[0])
    expect(elementTail.data).toBe(arrayData[3])
  })
})
