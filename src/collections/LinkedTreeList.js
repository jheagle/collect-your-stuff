/**
 * @file doubly linked tree list.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 */
import { LinkedList } from './LinkedList'
import { TreeLinker } from './TreeLinker'

export class LinkedTreeList extends LinkedList {
  constructor (LinkerClass = TreeLinker, ListClass = LinkedTreeList) {
    super(LinkerClass, ListClass)
  }

  get parent () {
    return this.first.parent
  }

  set parent (parent) {
    let current = this.first
    while (current !== null) {
      current.parent = parent
      current = current.next
    }
    if (parent) {
      parent.children = this
    }
  }

  get rootParent () {
    let current = this.first
    let parent = this.first.parent
    while (parent !== null) {
      current = parent
      parent = current.parent
    }
    return current
  }

  setChildren (item, children = null) {
    if (Array.from(this).indexOf(item) < 0) {
      // noinspection JSForgottenDebugStatementInspection
      console.error('item is not a child of this')
    }
    children.parent = item
  }
}

/**
 *
 * @param values
 * @param LinkerClass
 * @param ListClass
 * @returns {LinkedList}
 */
LinkedTreeList.fromArray = (values = [], LinkerClass = TreeLinker, ListClass = LinkedTreeList) => {
  const list = new ListClass(LinkerClass)
  list.innerList = list.LinkerClass.fromArray(values, LinkerClass)
  return list
}
