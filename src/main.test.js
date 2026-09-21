import collectYourStuff, * as named from './main'
import { LinkedList } from './collections/linked-list/LinkedList'
import { Linker } from './collections/linked-list/Linker'

describe('main', () => {
  test('everything on the default export is also a named export', () => {
    const defaultNames = Object.keys(collectYourStuff)
    expect(defaultNames).toEqual(expect.arrayContaining(['Arrayable', 'DoublyLinkedList', 'LinkedList', 'LinkedTreeList', 'Queue', 'Stack', 'recipes', 'services']))
    defaultNames.forEach(name => {
      expect(named[name]).toBe(collectYourStuff[name])
    })
  })

  test('the only named exports are the ones on the default export (and the default)', () => {
    const names = Object.keys(named).filter(name => name !== 'default' && name !== '__esModule').sort()
    expect(names).toEqual(Object.keys(collectYourStuff).sort())
  })

  test('the collections and the linkers they are built from can be imported by name', () => {
    expect(named.LinkedList).toBe(LinkedList)
    expect(named.Linker).toBe(Linker)
    const list = named.LinkedList.fromArray(['a', 'b'])
    expect(list.length).toBe(2)
    expect(list.first).toBeInstanceOf(named.Linker)
    const tree = named.LinkedTreeList.fromArray(['a'], named.TreeLinker)
    expect(tree.first).toBeInstanceOf(named.TreeLinker)
  })

  test('the recipes and services are available by name', () => {
    expect(named.recipes.ArrayIterator).toBeInstanceOf(Function)
    expect(named.services.parseTree).toBeInstanceOf(Function)
  })
})
