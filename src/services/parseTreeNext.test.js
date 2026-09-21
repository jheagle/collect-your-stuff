import { parseTreeNext } from './parseTreeNext'
import { LinkedTreeList } from '../collections/linked-tree-list/LinkedTreeList'
import { TreeLinker } from '../collections/linked-tree-list/TreeLinker'

describe('parseTreeNext', () => {
  test('will parse next nodes in balanced tree', () => {
    const balancedTreeSample = [
      {
        data: 'one',
        children: [
          {
            data: 'two',
            children: [
              {
                data: 'three',
                children: [
                  {
                    data: 'four',
                    children: []
                  },
                  {
                    data: 'five',
                    children: []
                  }]
              },
              {
                data: 'six',
                children: [
                  {
                    data: 'seven',
                    children: []
                  },
                  {
                    data: 'eight',
                    children: []
                  }]
              }
            ]
          },
          {
            data: 'nine',
            children: [
              {
                data: 'ten',
                children: [
                  {
                    data: 'eleven',
                    children: []
                  },
                  {
                    data: 'twelve',
                    children: []
                  }]
              },
              {
                data: 'thirteen',
                children: [
                  {
                    data: 'fourteen',
                    children: []
                  },
                  {
                    data: 'fifteen',
                    children: []
                  }]
              }
            ]
          }
        ]
      }
    ]
    const balancedTree = LinkedTreeList.fromArray(balancedTreeSample)
    let next = balancedTree.rootParent
    expect(next.data).toEqual('one')
    next = parseTreeNext(balancedTree.rootParent)
    expect(next.data).toEqual('two')
    next = parseTreeNext(next)
    expect(next.data).toEqual('three')
    next = parseTreeNext(next)
    expect(next.data).toEqual('four')
    next = parseTreeNext(next)
    expect(next.data).toEqual('five')
    next = parseTreeNext(next)
    expect(next.data).toEqual('six')
    next = parseTreeNext(next)
    expect(next.data).toEqual('seven')
    next = parseTreeNext(next)
    expect(next.data).toEqual('eight')
    next = parseTreeNext(next)
    expect(next.data).toEqual('nine')
    next = parseTreeNext(next)
    expect(next.data).toEqual('ten')
    next = parseTreeNext(next)
    expect(next.data).toEqual('eleven')
    next = parseTreeNext(next)
    expect(next.data).toEqual('twelve')
    next = parseTreeNext(next)
    expect(next.data).toEqual('thirteen')
    next = parseTreeNext(next)
    expect(next.data).toEqual('fourteen')
    next = parseTreeNext(next)
    expect(next.data).toEqual('fifteen')
    next = parseTreeNext(next)
    expect(next).toBeNull()
  })

  test('will parse next nodes in awkward tree', () => {
    const awkwardTreeSample = [
      {
        data: 'one',
        children: [
          {
            data: 'two',
            children: [
              {
                data: 'three',
                children: []
              },
              {
                data: 'four',
                children: []
              },
              {
                data: 'five',
                children: []
              }
            ]
          }
        ]
      },
      {
        data: 'six',
        children: [
          {
            data: 'seven',
            children: []
          },
          {
            data: 'eight',
            children: []
          }
        ]
      },
      {
        data: 'nine',
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
    const awkwardTree = LinkedTreeList.fromArray(awkwardTreeSample)
    let next = awkwardTree.rootParent
    expect(next.data).toEqual('one')
    next = parseTreeNext(awkwardTree.rootParent)
    expect(next.data).toEqual('two')
    next = parseTreeNext(next)
    expect(next.data).toEqual('three')
    next = parseTreeNext(next)
    expect(next.data).toEqual('four')
    next = parseTreeNext(next)
    expect(next.data).toEqual('five')
    next = parseTreeNext(next)
    expect(next.data).toEqual('six')
    next = parseTreeNext(next)
    expect(next.data).toEqual('seven')
    next = parseTreeNext(next)
    expect(next.data).toEqual('eight')
    next = parseTreeNext(next)
    expect(next.data).toEqual('nine')
    next = parseTreeNext(next)
    expect(next.data).toEqual('ten')
    next = parseTreeNext(next)
    expect(next.data).toEqual('eleven')
    next = parseTreeNext(next)
    expect(next.data).toEqual('twelve')
    next = parseTreeNext(next)
    expect(next).toBeNull()
  })

  test('a boundary keeps the parsing to the nodes below it', () => {
    const tree = TreeLinker.fromArray([
      { data: 'one', children: [{ data: 'a', children: [{ data: 'a1' }] }, { data: 'b' }] },
      { data: 'two' }
    ]).head
    const visit = (start, boundary) => {
      const found = []
      let current = start
      while (current) {
        found.push(current.data)
        current = parseTreeNext(current, boundary)
      }
      return found
    }
    expect(visit(tree)).toEqual(['one', 'a', 'a1', 'b', 'two'])
    expect(visit(tree, null)).toEqual(['one', 'a', 'a1', 'b', 'two'])
    expect(visit(tree.children.first, tree)).toEqual(['a', 'a1', 'b'])
    expect(visit(tree.children.first.children.first, tree.children.first)).toEqual(['a1'])
  })
})
