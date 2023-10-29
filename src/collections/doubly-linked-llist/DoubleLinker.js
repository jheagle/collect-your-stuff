/**
 * @file doubly linked list item.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import Linker from '../linked-list/Linker'

/**
 * DoubleLinker represents a node in a DoublyLinkedList.
 * @extends Linker
 */
class DoubleLinker extends Linker {
  prev = null

  /**
   * Create the new DoubleLinker instance, provide the data and optionally configure the type of Linker.
   * @param {Object} [nodeData={}]
   * @param {*} [nodeData.data=null]
   * @param {DoubleLinker|null} [nodeData.prev=null]
   * @param {DoubleLinker|null} [nodeData.next=null]
   * @param {DoubleLinker} [linkerClass=DoubleLinker]
   */
  constructor ({ data = null, prev = null, next = null } = {}, linkerClass = DoubleLinker) {
    super({ data: data, next: next }, linkerClass)
    this.prev = prev
  }
}

/**
 * Make a new DoubleLinker from the data given if it is not already a valid Linker.
 * @methodof DoubleLinker
 * @param {DoubleLinker|*} linker
 * @param {DoubleLinker} [linkerClass=DoubleLinker]
 * @return {Linker}
 */
DoubleLinker.make = (linker, linkerClass = DoubleLinker) => Linker.make(linker, linkerClass)

/**
 * Convert an array into DoubleLinker instances, return the head and tail DoubleLinkers.
 * @methodof DoubleLinker
 * @param {Array} [values=[]]
 * @param {DoubleLinker} [linkerClass=DoubleLinker]
 * @returns {{head: DoubleLinker, tail: DoubleLinker}}
 */
DoubleLinker.fromArray = (values = [], linkerClass = DoubleLinker) => values.reduce(
  (references, linker) => {
    const newLinker = linkerClass.make(linker)
    if (references.head === null) {
      // Initialize the head and tail with the new node
      return { head: newLinker, tail: newLinker }
    }
    newLinker.prev = references.tail
    // Only update the tail once head has been set, tail is always the most recent node
    references.tail.next = newLinker
    references.tail = newLinker
    return references
  },
  { head: null, tail: null }
)

export default DoubleLinker
