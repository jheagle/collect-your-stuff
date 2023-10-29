import Queueable from './Queueable'

describe('Queueable', () => {
  test('can store data and pointer to next and previous queueables', () => {
    const arrayData = ['one', 'two', 'three']
    const queueableHead = new Queueable({ task: arrayData[0] })
    queueableHead.next = new Queueable({ task: arrayData[1], prev: queueableHead })
    const queueableTail = queueableHead.next.next = new Queueable({ task: arrayData[2], prev: queueableHead.next })
    expect(queueableHead.data).toBe(arrayData[0])
    expect(queueableHead.next.data).toBe(arrayData[1])
    expect(queueableHead.next.next.data).toBe(arrayData[2])
    expect(queueableHead.next.next.next).toBeNull()
    expect(queueableTail.data).toBe(arrayData[2])
  })

  test('can be generated using make', () => {
    const nonObjectData = 'stuff'
    const nonObjectMake = Queueable.make(nonObjectData)
    expect(nonObjectMake).toBeInstanceOf(Queueable)
    expect(nonObjectMake.data).toBe(nonObjectData)
    const objectData = { thing: 'stuff' }
    const objectMake = Queueable.make(objectData)
    expect(objectMake).toBeInstanceOf(Queueable)
    expect(objectMake.data).toBe(objectData)
    const queueable = new Queueable('stuff')
    const queueableMake = Queueable.make(queueable)
    expect(queueableMake).toBeInstanceOf(Queueable)
    expect(queueableMake.data).toBe(queueable.data)
  })

  test('can be generated from an array', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const queueableReferences = Queueable.fromArray(arrayData)
    const queueableHead = queueableReferences.head
    expect(queueableHead.data).toBe(arrayData[0])
    expect(queueableHead.next.data).toBe(arrayData[1])
    expect(queueableHead.next.next.data).toBe(arrayData[2])
    expect(queueableHead.next.next.next.data).toBe(arrayData[3])
    expect(queueableHead.next.next.next.next).toBeNull()
    expect(queueableReferences.tail.data).toBe(arrayData[3])
  })

  test('can return a task', () => {
    const willRun = jest.fn()
    const queueableTask = new Queueable({ task: willRun })
    expect(queueableTask.task).toBe(willRun)
    const someData = 'one'
    const queueableData = new Queueable({ task: someData })
    expect(queueableData.task()).toBe(someData)
  })

  test('can markCompleted and return results', () => {
    const queueableDefault = new Queueable()
    expect(queueableDefault.complete).toBeFalsy()
    expect(queueableDefault.markCompleted()).toEqual({ success: true, error: false, context: null })
    expect(queueableDefault.complete).toBeTruthy()
  })

  test('when using run, the task is run when ready', () => {
    const willRun = complete => complete({ success: true, error: false, context: 'stuff' })
    let readyFlag = false
    const delayReady = () => readyFlag
    const queueableTask = new Queueable({ task: willRun, ready: delayReady })
    expect(queueableTask.complete).toBeFalsy()
    expect(queueableTask.isReady).toBeFalsy()
    expect(queueableTask.running).toBeFalsy()
    expect(queueableTask.run()).toEqual({ success: false, error: 'Task is not ready', context: willRun })
    readyFlag = true
    expect(queueableTask.complete).toBeFalsy()
    expect(queueableTask.isReady).toBeTruthy()
    expect(queueableTask.run()).toEqual({ success: true, error: false, context: 'stuff' })
    expect(queueableTask.complete).toBeTruthy()
    expect(queueableTask.isReady).toBeTruthy()
    expect(queueableTask.running).toBeFalsy()
  })

  test('when using run, check running state', () => {
    const willRun = () => ({ success: true, error: false, context: 'stuff' })
    const queueableTask = new Queueable({ task: willRun, ready: true })
    expect(queueableTask.complete).toBeFalsy()
    expect(queueableTask.running).toBeFalsy()
    expect(queueableTask.run()).toEqual({ success: true, error: false, context: 'stuff' })
    expect(queueableTask.complete).toBeFalsy()
    expect(queueableTask.running).toBeTruthy()
    expect(queueableTask.run()).toEqual({ success: false, error: "Queued task is already running, possible missing 'complete' callback", context: willRun })
    expect(queueableTask.complete).toBeFalsy()
  })
})
