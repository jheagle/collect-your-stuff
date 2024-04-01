import { Queue } from './Queue'

describe('Queue', () => {
  test('can enqueue on empty list', () => {
    const testQueue = new Queue()
    expect(testQueue.size()).toBe(0)
    testQueue.enqueue('one')
    expect(testQueue.size()).toBe(1)
    expect(testQueue.peek().data).toBe('one')
    expect(testQueue.size()).toBe(1)
    expect(testQueue.dequeue()).toBe('one')
    expect(testQueue.size()).toBe(0)
  })

  test('can store elements', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const someQueue = Queue.fromArray(arrayData)
    expect(someQueue.size()).toBe(4)
    expect(Array.from(someQueue.queuedList).map(item => item.data)).toEqual(arrayData)
  })

  test('peek returns head of list', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const someQueue = Queue.fromArray(arrayData)
    expect(someQueue.peek().data).toBe(arrayData[0])
    // Size didn't change
    expect(someQueue.size()).toBe(4)
  })

  test('can add to the queue', () => {
    const someQueue = Queue.fromArray(['one', 'two', 'three', 'four'])
    someQueue.enqueue('five')
    expect(someQueue.size()).toBe(5)
    expect(someQueue.queuedList.last.data).toBe('five')
    someQueue.enqueue('six')
    expect(someQueue.size()).toBe(6)
    expect(someQueue.queuedList.last.data).toBe('six')
  })

  test('can remove from the queue', () => {
    const someQueue = Queue.fromArray(['one', 'two', 'three', 'four', 'five', 'six'])
    expect(someQueue.size()).toBe(6)
    someQueue.remove()
    expect(someQueue.size()).toBe(5)
    someQueue.remove()
    expect(someQueue.size()).toBe(4)
  })

  test('returns success when no queueable tasks', () => {
    const someQueue = Queue.fromArray([])
    expect(someQueue.size()).toBe(0)
    const result = someQueue.dequeue()
    expect(result.success).toEqual('No more queueable tasks in the queue')
    expect(result.error).toBeFalsy()
  })

  test('removes all completed tasks', () => {
    const someQueue = Queue.fromArray(['one', 'two', 'three', 'four'])
    expect(someQueue.size()).toBe(4)
    someQueue.queuedList.forEach(queueable => {
      queueable.complete = true
    })
    const result = someQueue.dequeue()
    expect(someQueue.size()).toBe(0)
    expect(result.success).toEqual('No more queueable tasks in the queue')
    expect(result.error).toBeFalsy()
  })

  test('bails when there is a task still running', () => {
    const someQueue = Queue.fromArray(['one', 'two', 'three', 'four'])
    expect(someQueue.size()).toBe(4)
    someQueue.peek().running = true
    const result = someQueue.dequeue()
    expect(someQueue.size()).toBe(3)
    expect(result.success).toBeFalsy()
    expect(result.error).toBe('The queue has been blocked by an unfinished task.')
    expect(result.context.data).toBe('one')
  })

  test('returns assigned queue data', () => {
    const someQueue = Queue.fromArray(['one', 'two', 'three', 'four'])
    expect(someQueue.size()).toBe(4)
    someQueue.peek().ready = true
    const result = someQueue.dequeue()
    expect(result).toBe('one')
    // Still 4, first got pushed to end
    expect(someQueue.size()).toBe(4)
    expect(someQueue.peek().data).toBe('two')
    expect(someQueue.queuedList.last.data).toBe('one')
    expect(someQueue.queuedList.last.complete).toBeTruthy()
  })

  test('returns assigned queue task', () => {
    const taskData = ['one', 'two', 'three', 'four']
    const willRunTasks = taskData
      .map(
        data => ({ task: complete => complete({ success: true, error: false, context: data }), ready: true })
      )
    const someQueue = Queue.fromArray(willRunTasks)
    expect(someQueue.size()).toBe(4)
    someQueue.peek().ready = true
    taskData.forEach(data => {
      const result = someQueue.dequeue()
      expect(result.success).toBeTruthy()
      expect(result.error).toBeFalsy()
      expect(result.context).toBe(data)
    })
    expect(someQueue.size()).toBe(4)
    someQueue.dequeue()
    expect(someQueue.size()).toBe(0)
  })

  test('returns error when dequeue has nothing ready', () => {
    const queueItems = ['one', 'two', 'three', 'four']
    const someQueue = Queue.fromArray(queueItems.map(item => ({ task: item, ready: false })))
    expect(someQueue.size()).toBe(4)
    const result = someQueue.dequeue()
    expect(result.success).toBeFalsy()
    expect(result.error).toEqual('Unable to find ready task.')
    expect(result.context.data).toBe('one')
    // Still 4, first got pushed to end
    expect(someQueue.size()).toBe(4)
    expect(someQueue.peek().data).toBe('two')
    expect(someQueue.queuedList.last.data).toBe('one')
  })
})
