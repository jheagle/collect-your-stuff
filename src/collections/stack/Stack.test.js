import Stack from './Stack'

describe('Stack', () => {
  test('can store elements', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const someStack = Stack.fromArray(arrayData)
    expect(someStack.size()).toBe(4)
    expect(Array.from(someStack.stackedList).map(item => item.data)).toEqual(arrayData)
  })

  test('peek returns tail of list', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const someStack = Stack.fromArray(arrayData)
    expect(someStack.peek().data).toBe(arrayData[3])
    // Size didn't change
    expect(someStack.size()).toBe(4)
  })

  test('can add to the stack', () => {
    const someStack = Stack.fromArray(['one', 'two', 'three', 'four'])
    someStack.add('five')
    expect(someStack.size()).toBe(5)
    expect(someStack.stackedList.last.data).toBe('five')
    someStack.add('six')
    expect(someStack.size()).toBe(6)
    expect(someStack.stackedList.last.data).toBe('six')
  })

  test('can remove from the stack', () => {
    const someStack = Stack.fromArray(['one', 'two', 'three', 'four', 'five', 'six'])
    expect(someStack.size()).toBe(6)
    someStack.remove()
    expect(someStack.size()).toBe(5)
    someStack.remove()
    expect(someStack.size()).toBe(4)
  })

  test('returns success when no stackable tasks', () => {
    const someStack = Stack.fromArray([])
    expect(someStack.size()).toBe(0)
    const result = someStack.pop()
    expect(result.success).toEqual('No more stackable tasks in the stack')
    expect(result.error).toBeFalsy()
  })

  test('returns assigned stack data', () => {
    const someStack = Stack.fromArray(['one', 'two', 'three', 'four'])
    expect(someStack.size()).toBe(4)
    const result = someStack.pop()
    expect(result).toBe('four')
    // Reduced stack size
    expect(someStack.size()).toBe(3)
    expect(someStack.getFirst().data).toBe('three')
    expect(someStack.stackedList.last.data).toBe('three')
  })

  test('returns assigned stack task', () => {
    const taskData = ['one', 'two', 'three', 'four']
    const someStack = Stack.fromArray(taskData)
    expect(someStack.size()).toBe(4)
    taskData.forEach((data, i) => {
      const result = someStack.pop()
      expect(result).toBe(taskData[taskData.length - 1 - i])
    })
    expect(someStack.size()).toBe(0)
  })
})
