import { parseTree } from './parseTree'
import { LinkedTreeList } from '../collections/linked-tree-list/LinkedTreeList'

describe('parseTree', () => {
  const expectedResults = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen'
  ]
  test('will parse through the entire balanced tree', () => {
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
    parseTree(balancedTree, (node, i) => expect(node.data).toEqual(expectedResults[i]))
  })

  test('will parse through an awkward tree', () => {
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
    parseTree(awkwardTree, (node, i) => expect(node.data).toEqual(expectedResults[i]))
  })
})
