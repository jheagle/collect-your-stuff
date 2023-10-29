/**
 * @file doubly linked tree item.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import DoubleLinker from '../doubly-linked-llist/DoubleLinker'

/**
 * TreeLinker represents a node in a LinkedTreeList.
 * @extends DoubleLinker
 */
class TreeLinker extends DoubleLinker {
  parent = null
  children = null

  /**
   * Create the new TreeLinker instance, provide the data and optionally configure the type of Linker.
   * @param {Object} [settings={}]
   * @param {*} [settings.data=null]
   * @param {TreeLinker} [settings.prev=null]
   * @param {TreeLinker} [settings.next=null]
   * @param {LinkedTreeList} [settings.children=null]
   * @param {TreeLinker} [settings.parent=null]
   * @param {TreeLinker} [linkerClass=TreeLinker]
   */
  constructor ({
    data = null,
    prev = null,
    next = null,
    children = null,
    parent = null
  } = {}, linkerClass = TreeLinker) {
    super({ data, prev, next }, linkerClass)
    this.parent = parent
    this.children = this.childrenFromArray(children, linkerClass)
  }

  /**
   * Return the parent of this Tree Linker.
   * @return {TreeLinker|null}
   */
  get parent () {
    return this.parent
  }

  /**
   * Return the children of this Tree Linker.
   * @return {LinkedTreeList|null}
   */
  get children () {
    return this.children
  }

  /**
   * Create the children for this tree from an array.
   * @param {Array|null} children
   * @param {TreeLinker} linkerClass
   * @return {DoubleLinker|null}
   */
  childrenFromArray (children = null, linkerClass = TreeLinker) {
    if (children === null) {
      return null
    }
    return DoubleLinker.fromArray.apply(this, [
      children.map(child => Object.assign({}, child, { parent: this })),
      linkerClass
    ]).tail
  }
}

/**
 * Make a new DoubleLinker from the data given if it is not already a valid Linker.
 * @methodof TreeLinker
 * @param {TreeLinker|*} linker
 * @param {TreeLinker} [linkerClass=TreeLinker]
 * @return {Linker}
 */
TreeLinker.make = (linker, linkerClass = TreeLinker) => DoubleLinker.make(linker, linkerClass)

/**
 * Convert an array into DoubleLinker instances, return the head and tail DoubleLinkers.
 * @methodof TreeLinker
 * @param {Array} [values=[]]
 * @param {TreeLinker} [linkerClass=TreeLinker]
 * @returns {{head: TreeLinker, tail: TreeLinker}}
 */
TreeLinker.fromArray = (values = [], linkerClass = TreeLinker) => DoubleLinker.fromArray(values, linkerClass)

export default TreeLinker
