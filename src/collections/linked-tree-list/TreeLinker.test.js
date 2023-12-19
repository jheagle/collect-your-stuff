import TreeLinker from './TreeLinker'

const sampleArrayData = () => ([
  {
    data: 'one',
    children: [
      {
        data: 'four',
        children: [
          {
            data: 'ten',
            children: []
          },
          {
            data: 'eleven',
            children: []
          },
          {
            data: 'twelve',
            children: []
          }
        ]
      }
    ]
  },
  {
    data: 'two',
    children: [
      {
        data: 'five',
        children: []
      },
      {
        data: 'six',
        children: []
      }
    ]
  },
  {
    data: 'three',
    children: [
      {
        data: 'seven',
        children: []
      },
      {
        data: 'eight',
        children: []
      },
      {
        data: 'nine',
        children: []
      }
    ]
  }
])

describe('TreeLinker', () => {
  test('can store data and pointer to next and previous linkers', () => {
    const arrayData = ['one', 'two', 'three']
    const linkerHead = new TreeLinker({ data: arrayData[0] })
    linkerHead.next = new TreeLinker({ data: arrayData[1], prev: linkerHead })
    const linkerTail = linkerHead.next.next = new TreeLinker({ data: arrayData[2], prev: linkerHead.next })
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
    const nonObjectMake = TreeLinker.make(nonObjectData)
    expect(nonObjectMake).toBeInstanceOf(TreeLinker)
    expect(nonObjectMake.data).toBe(nonObjectData)
    const objectData = { thing: 'stuff' }
    const objectMake = TreeLinker.make(objectData)
    expect(objectMake).toBeInstanceOf(TreeLinker)
    expect(objectMake.data).toBe(objectData)
    const linker = new TreeLinker({ data: 'stuff' })
    const linkerMake = TreeLinker.make(linker)
    expect(linkerMake).toBeInstanceOf(TreeLinker)
    expect(linkerMake.data).toBe(linker.data)
  })

  test('can be generated from an array', () => {
    const arrayData = ['one', 'two', 'three', 'four']
    const linkerReferences = TreeLinker.fromArray(arrayData)
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

  test('prev and next values contain correct data', () => {
    const arrayData = ['one', 'two', 'three']
    const treeReferences = TreeLinker.fromArray(arrayData, TreeLinker)
    const linkerHead = treeReferences.head
    const linkerTail = treeReferences.tail
    expect(linkerHead.data).toBe(arrayData[0])
    expect(linkerHead.next.data).toBe(arrayData[1])
    expect(linkerHead.next.next.data).toBe(arrayData[2])
    expect(linkerHead.next.next.next).toBeNull()
    expect(linkerTail.data).toBe(arrayData[2])
    expect(linkerTail.prev.data).toBe(arrayData[1])
    expect(linkerTail.prev.prev.data).toBe(arrayData[0])
    expect(linkerTail.prev.prev.prev).toBeNull()
  })

  test('prev and next data set from objects', () => {
    const arrayData = sampleArrayData()
    const treeReferences = TreeLinker.fromArray(arrayData, TreeLinker)
    const linkerHead = treeReferences.head
    const linkerTail = treeReferences.tail
    expect(linkerHead.data).toBe(arrayData[0].data)
    expect(linkerHead.next.data).toBe(arrayData[1].data)
    expect(linkerHead.next.next.data).toBe(arrayData[2].data)
    expect(linkerHead.next.next.next).toBeNull()
    expect(linkerTail.data).toBe(arrayData[2].data)
    expect(linkerTail.prev.data).toBe(arrayData[1].data)
    expect(linkerTail.prev.prev.data).toBe(arrayData[0].data)
    expect(linkerTail.prev.prev.prev).toBeNull()
  })

  test('has children set for each of the Linkers', () => {
    const arrayData = sampleArrayData()
    const treeReferences = TreeLinker.fromArray(arrayData, TreeLinker)
    const linkerHead = treeReferences.head

    expect(linkerHead.data).toBe(arrayData[0].data)
    expect(linkerHead.children.parent).toBe(linkerHead)
    expect(linkerHead.children.first.data).toBe(arrayData[0].children[0].data)
    expect(linkerHead.children.item(1)).toBeNull()

    expect(linkerHead.children.first.children.parent).toBe(linkerHead.children.first)
    expect(linkerHead.children.first.children.first.data).toBe(arrayData[0].children[0].children[0].data)
    expect(linkerHead.children.first.children.item(1).data).toBe(arrayData[0].children[0].children[1].data)
    expect(linkerHead.children.first.children.last.data).toBe(arrayData[0].children[0].children[2].data)

    expect(linkerHead.next.data).toBe(arrayData[1].data)
    expect(linkerHead.next.children.parent).toBe(linkerHead.next)
    expect(linkerHead.next.children.first.data).toBe(arrayData[1].children[0].data)
    expect(linkerHead.next.children.item(1).data).toBe(arrayData[1].children[1].data)
    expect(linkerHead.next.children.first.children.first).toBeNull()

    expect(linkerHead.next.next.data).toBe(arrayData[2].data)
    expect(linkerHead.next.next.children.parent).toBe(linkerHead.next.next)
    expect(linkerHead.next.next.children.first.data).toBe(arrayData[2].children[0].data)
    expect(linkerHead.next.next.children.item(1).data).toBe(arrayData[2].children[1].data)
    expect(linkerHead.next.next.children.last.data).toBe(arrayData[2].children[2].data)
    expect(linkerHead.next.next.children.first.children.first).toBeNull()

    expect(linkerHead.next.next.next).toBeNull()
  })

  test('children can be added from array', () => {
    const arrayData = ['one', 'two', 'three']
    const treeReferences = TreeLinker.fromArray(arrayData, TreeLinker)
    const linkerHead = treeReferences.head
    const arrayChildData = sampleArrayData()
    linkerHead.children = linkerHead.childrenFromArray(arrayChildData[0].children)
    linkerHead.next.children = linkerHead.next.childrenFromArray(arrayChildData[1].children)
    linkerHead.next.next.children = linkerHead.next.next.childrenFromArray(arrayChildData[2].children)

    expect(linkerHead.data).toBe(arrayData[0])
    expect(linkerHead.children.parent).toBe(linkerHead)
    expect(linkerHead.children.first.data).toBe(arrayChildData[0].children[0].data)
    expect(linkerHead.children.item(1)).toBeNull()

    expect(linkerHead.children.first.children.parent).toBe(linkerHead.children.first)
    expect(linkerHead.children.first.children.first.data).toBe(arrayChildData[0].children[0].children[0].data)
    expect(linkerHead.children.first.children.item(1).data).toBe(arrayChildData[0].children[0].children[1].data)
    expect(linkerHead.children.first.children.last.data).toBe(arrayChildData[0].children[0].children[2].data)

    expect(linkerHead.next.data).toBe(arrayData[1])
    expect(linkerHead.next.children.parent).toBe(linkerHead.next)
    expect(linkerHead.next.children.first.data).toBe(arrayChildData[1].children[0].data)
    expect(linkerHead.next.children.item(1).data).toBe(arrayChildData[1].children[1].data)
    expect(linkerHead.next.children.first.children.first).toBeNull()

    expect(linkerHead.next.next.data).toBe(arrayData[2])
    expect(linkerHead.next.next.children.parent).toBe(linkerHead.next.next)
    expect(linkerHead.next.next.children.first.data).toBe(arrayChildData[2].children[0].data)
    expect(linkerHead.next.next.children.item(1).data).toBe(arrayChildData[2].children[1].data)
    expect(linkerHead.next.next.children.last.data).toBe(arrayChildData[2].children[2].data)
    expect(linkerHead.next.next.children.first.children.first).toBeNull()

    expect(linkerHead.next.next.next).toBeNull()
  })

  test('can build properly formed children', () => {
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
    const linkedTree = TreeLinker.fromArray(multilayeredArray).head
    expect(linkedTree.data).toEqual('one')
    expect(linkedTree.next.data).toEqual('two')
    expect(linkedTree.next.children.first.data).toEqual('three')
    expect(linkedTree.children.first.data).toEqual('four')
    expect(linkedTree.children.last.data).toEqual('five')
  })
})
