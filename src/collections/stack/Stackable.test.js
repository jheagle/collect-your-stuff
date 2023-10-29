import Stackable from './Stackable'

describe('Stackable', () => {
  test('can be generated using make', () => {
    const nonObjectData = 'stuff'
    const nonObjectMake = Stackable.make(nonObjectData)
    expect(nonObjectMake).toBeInstanceOf(Stackable)
    expect(nonObjectMake.data).toBe(nonObjectData)
    const objectData = { thing: 'stuff' }
    const objectMake = Stackable.make(objectData)
    expect(objectMake).toBeInstanceOf(Stackable)
    expect(objectMake.data).toBe(objectData)
    const stackable = new Stackable('stuff')
    const stackableMake = Stackable.make(stackable)
    expect(stackableMake).toBeInstanceOf(Stackable)
    expect(stackableMake.data).toBe(stackable.data)
  })

  test('can be generated from an array', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const stackableReferences = Stackable.fromArray(arrayData)
    const stackableHead = stackableReferences.head
    expect(stackableHead[0].data).toBe(arrayData[0])
    expect(stackableHead[1].data).toBe(arrayData[1])
    expect(stackableHead[2].data).toBe(arrayData[2])
    expect(stackableHead[3].data).toBe(arrayData[3])
    expect(stackableHead[4]).toBeUndefined()
    expect(stackableReferences.tail.data).toBe(arrayData[3])
  })

  test('can return a task', () => {
    const willRun = jest.fn()
    const stackableTask = new Stackable(willRun)
    expect(stackableTask.task).toBe(willRun)
    const someData = 'one'
    const stackableData = new Stackable(someData)
    expect(stackableData.task()).toBe(someData)
  })

  test('when using run, the task is run when ready', () => {
    const willRun = () => jest.fn()
    const stackableTask = new Stackable({ fn: willRun })
    expect(stackableTask.complete).toBeFalsy()
    expect(stackableTask.isReady).toBeFalsy()
    expect(stackableTask.running).toBeFalsy()
    expect(stackableTask.run()).toEqual({ fn: willRun })
  })
})
