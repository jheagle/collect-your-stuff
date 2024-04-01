import { Stack } from './Stack'

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
    expect(someStack.top().data).toBe(arrayData[0])
    // Size didn't change
    expect(someStack.size()).toBe(4)
  })

  test('can add to the stack', () => {
    const someStack = Stack.fromArray(['two', 'three', 'four', 'five'])
    someStack.push('one')
    expect(someStack.size()).toBe(5)
    expect(someStack.stackedList.first.data).toBe('one')
    someStack.push('zero')
    expect(someStack.size()).toBe(6)
    expect(someStack.stackedList.first.data).toBe('zero')
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
    expect(result).toBe('one')
    // Reduced stack size
    expect(someStack.size()).toBe(3)
    expect(someStack.top().data).toBe('two')
    expect(someStack.stackedList.first.data).toBe('two')
  })

  test('returns assigned stack task', () => {
    const taskData = ['one', 'two', 'three', 'four']
    const someStack = Stack.fromArray(taskData)
    expect(someStack.size()).toBe(4)
    taskData.forEach((data, i) => {
      const result = someStack.pop()
      expect(result).toBe(taskData[i])
    })
    expect(someStack.size()).toBe(0)
  })
})
