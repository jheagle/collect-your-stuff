import { LinkedTreeList } from './LinkedTreeList'
import { TreeLinker } from './TreeLinker'

describe('LinkedTreeList', () => {
  test('can store linkers', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const someList = LinkedTreeList.fromArray(arrayData)
    expect(someList.length).toBe(4)
    expect(Array.from(someList).map(item => item.data)).toEqual(arrayData)
  })

  test('first contains the head value', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const someList = LinkedTreeList.fromArray(arrayData)
    expect(someList.first.data).toBe(arrayData[0])
  })

  test('last contains the tail value', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const someList = LinkedTreeList.fromArray(arrayData)
    expect(someList.last.data).toBe(arrayData[3])
  })

  test('can iterate with for-of loop', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const someList = LinkedTreeList.fromArray(arrayData)
    let count = -1
    for (const item of someList) {
      expect(item.data).toBe(arrayData[++count])
    }
    expect(count).toBe(3)
  })

  test('can iterate with forEach loop', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const someList = LinkedTreeList.fromArray(arrayData)
    let count = -1
    someList.forEach(item => {
      expect(item.data).toBe(arrayData[++count])
    })
    expect(count).toBe(3)
  })

  test('can fetch an linker by positive index from start', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const someList = LinkedTreeList.fromArray(arrayData)
    expect(someList.item(0).data).toBe(arrayData[0])
    expect(someList.item(1).data).toBe(arrayData[1])
    expect(someList.item(2).data).toBe(arrayData[2])
    expect(someList.item(3).data).toBe(arrayData[3])
    expect(someList.item(4)).toBeNull()
  })

  test('can fetch an linker by negative index from end', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const someList = LinkedTreeList.fromArray(arrayData)
    expect(someList.item(-1).data).toBe(arrayData[3])
    expect(someList.item(-2).data).toBe(arrayData[2])
    expect(someList.item(-3).data).toBe(arrayData[1])
    expect(someList.item(-4).data).toBe(arrayData[0])
    expect(someList.item(-5)).toBeNull()
  })

  test('can append with insertAfter', () => {
    const arrayData = ['one', 'two', 'three']
    const someLinkedList = LinkedTreeList.fromArray([arrayData[0]])
    someLinkedList.insertAfter(someLinkedList.first, arrayData[2])
    someLinkedList.insertAfter(someLinkedList.first, arrayData[1])
    expect(someLinkedList.item(0).data).toBe(arrayData[0])
    expect(someLinkedList.item(1).data).toBe(arrayData[1])
    expect(someLinkedList.item(2).data).toBe(arrayData[2])
  })

  test('can append with insertBefore', () => {
    const arrayData = ['one', 'two', 'three']
    const someLinkedList = LinkedTreeList.fromArray([arrayData[2]])
    someLinkedList.insertBefore(someLinkedList.last, arrayData[0])
    someLinkedList.insertBefore(someLinkedList.last, arrayData[1])
    expect(someLinkedList.item(0).data).toBe(arrayData[0])
    expect(someLinkedList.item(1).data).toBe(arrayData[1])
    expect(someLinkedList.item(2).data).toBe(arrayData[2])
  })

  test('can append to the array', () => {
    const someList = LinkedTreeList.fromArray(['one', 'two', 'three', 'four'])
    const newNode = new TreeLinker({ data: 'five' })
    someList.append(newNode)
    expect(someList.length).toBe(5)
    expect(someList.last.data).toBe('five')
    someList.append('six')
    expect(someList.length).toBe(6)
    expect(someList.last.data).toBe('six')
  })

  test('can prepend to the array', () => {
    const someList = LinkedTreeList.fromArray(['one', 'two', 'three', 'four'])
    const newNode = new TreeLinker({ data: 'zero' })
    someList.prepend(newNode)
    expect(someList.length).toBe(5)
    expect(someList.first.data).toBe('zero')
    someList.prepend('negative one')
    expect(someList.length).toBe(6)
    expect(someList.first.data).toBe('negative one')
  })

  test('can remove the given node from the list', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const someArray = LinkedTreeList.fromArray(arrayData)
    // Check that first can be removed
    const firstLinker = someArray.first
    expect(firstLinker.data).toBe(arrayData[0])
    const removedFirst = someArray.remove(firstLinker)
    expect(removedFirst.data).toBe(firstLinker.data)
    // The first linker is now 'two'
    expect(someArray.first.data).toBe(arrayData[1])
    // Check that last can be removed
    const lastLinker = someArray.last
    expect(lastLinker.data).toBe(arrayData[3])
    const removedLast = someArray.remove(lastLinker)
    expect(removedLast.data).toBe(lastLinker.data)
    // The last linker is now 'three'
    expect(someArray.last.data).toBe(arrayData[2])
  })

  test('can set the parent item, and parent children match this list', () => {
    const parentData = ['one']
    const parentList = LinkedTreeList.fromArray(parentData)
    const childData = ['two', 'three', 'four', 'five']
    const childList = LinkedTreeList.fromArray(childData)
    childList.parent = parentList.first
    const firstItem = parentList.first
    expect(firstItem.data).toBe(parentData[0])
    expect(firstItem.children.first.data).toBe(childData[0])
    expect(firstItem.children.parent.children.first.data).toBe(childData[0])
    expect(firstItem.children.item(1).data).toBe(childData[1])
    expect(firstItem.children.item(2).parent.data).toBe(parentData[0])
    expect(firstItem.children.item(2).parent.children.item(1).data).toBe(childData[1])
    expect(firstItem.children.item(2).data).toBe(childData[2])
    expect(firstItem.children.item(2).parent.data).toBe(parentData[0])
    expect(firstItem.children.item(2).parent.children.item(2).data).toBe(childData[2])
    expect(firstItem.children.item(3).data).toBe(childData[3])
    expect(firstItem.children.item(3).parent.data).toBe(parentData[0])
    expect(firstItem.children.item(3).parent.children.last.data).toBe(childData[3])
  })

  test('can set the children for a specified item', () => {
    const parentData = ['one']
    const parentList = LinkedTreeList.fromArray(parentData)
    const childData = ['two', 'three', 'four', 'five']
    parentList.setChildren(parentList.first, LinkedTreeList.fromArray(childData))
    const firstItemChildren = parentList.first.children
    const firstChildItem = firstItemChildren.first
    expect(firstChildItem.data).toBe(childData[0])
    expect(firstChildItem.parent.data).toBe(parentData[0])
    expect(firstChildItem.parent.children.first.data).toBe(childData[0])
    expect(firstChildItem.next.data).toBe(childData[1])
    expect(firstChildItem.next.parent.data).toBe(parentData[0])
    expect(firstChildItem.next.parent.children.item(1).data).toBe(childData[1])
    expect(firstChildItem.next.next.data).toBe(childData[2])
    expect(firstChildItem.next.next.parent.data).toBe(parentData[0])
    expect(firstChildItem.next.next.parent.children.item(2).data).toBe(childData[2])
    expect(firstChildItem.next.next.next.data).toBe(childData[3])
    expect(firstChildItem.next.next.next.parent.data).toBe(parentData[0])
    expect(firstChildItem.next.next.next.parent.children.last.data).toBe(childData[3])
  })

  test('can remove the given node from the list', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const someArray = LinkedTreeList.fromArray(arrayData)
    // Check that first can be removed
    const firstLinker = someArray.first
    expect(firstLinker.data).toBe(arrayData[0])
    const removedFirst = someArray.remove(firstLinker)
    expect(removedFirst.data).toBe(firstLinker.data)
    // The first linker is now 'two'
    expect(someArray.first.data).toBe(arrayData[1])
    // Check that last can be removed
    const lastLinker = someArray.last
    expect(lastLinker.data).toBe(arrayData[3])
    const removedLast = someArray.remove(lastLinker)
    expect(removedLast.data).toBe(lastLinker.data)
    // The last linker is now 'three'
    expect(someArray.last.data).toBe(arrayData[2])
  })

  test('can store head child only (not both head and tail)', () => {
    const multilayeredArray = [
      {
        data: 'one',
        children: [
          {
            data: 'four',
            children: []
          },
          {
            data: 'five',
            children: []
          }
        ]
      },
      {
        data: 'two',
        children: [
          {
            data: 'three',
            children: []
          }
        ]
      }
    ]
    const linkedTreeList = LinkedTreeList.fromArray(multilayeredArray)
    expect(linkedTreeList.first.data).toEqual('one')
    expect(linkedTreeList.first.next.data).toEqual('two')
    expect(linkedTreeList.first.next.children.first.data).toEqual('three')
    expect(linkedTreeList.first.children.first.data).toEqual('four')
    expect(linkedTreeList.first.children.last.data).toEqual('five')
  })

  test('can remove the only node, and every node in turn, leaving an empty list', () => {
    const single = LinkedTreeList.fromArray(['one'])
    const removedOnly = single.remove(single.first)
    expect(removedOnly.data).toBe('one')
    expect(single.length).toBe(0)
    expect(single.first).toBeNull()
    expect(single.last).toBeNull()

    const someArray = LinkedTreeList.fromArray(['one', 'two', 'three'])
    expect(someArray.remove(someArray.first.next).data).toBe('two')
    expect(someArray.remove(someArray.first).data).toBe('one')
    expect(someArray.length).toBe(1)
    expect(someArray.remove(someArray.first).data).toBe('three')
    expect(someArray.length).toBe(0)
    expect(someArray.first).toBeNull()
  })

  test('can add to a list after everything was removed from it', () => {
    const someArray = LinkedTreeList.fromArray(['one'])
    someArray.remove(someArray.first)
    someArray.append('two')
    expect(someArray.length).toBe(1)
    expect(someArray.first.data).toBe('two')
  })

  describe('with nodes which are not in the list, or no reference node', () => {
    const values = list => Array.from(list).map(node => node.data)

    test('inserting after null goes at the start, before null goes at the end', () => {
      const someList = LinkedTreeList.fromArray(['a', 'b'])
      someList.insertAfter(null, 'start')
      someList.insertBefore(null, 'end')
      expect(values(someList)).toEqual(['start', 'a', 'b', 'end'])
      expect(someList.first.data).toBe('start')
      expect(someList.last.data).toBe('end')
    })

    test('inserting relative to null works on an empty list', () => {
      const first = new LinkedTreeList()
      first.insertAfter(null, 'a')
      expect(values(first)).toEqual(['a'])
      const second = new LinkedTreeList()
      second.insertBefore(null, 'b')
      expect(values(second)).toEqual(['b'])
    })

    test('append and prepend work on an empty list', () => {
      const someList = new LinkedTreeList()
      someList.append('b')
      someList.prepend('a')
      expect(values(someList)).toEqual(['a', 'b'])
    })
  })
})
