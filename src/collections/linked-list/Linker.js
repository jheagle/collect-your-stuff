/**
 * @file linked list item.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import ArrayElement from '../arrayable/ArrayElement'

/**
 * Linker represents a node in a LinkedList.
 * @extends ArrayElement
 */
class Linker extends ArrayElement {
  next = null

  /**
   * Create the new Linker instance, provide the data and optionally configure the type of Linker.
   * @param {Object} [nodeData={}]
   * @param {*} [nodeData.data=null]
   * @param {Linker|null} [nodeData.next=null]
   * @param {Linker} [linkerClass=Linker]
   */
  constructor ({ data = null, next = null } = {}, linkerClass = Linker) {
    super(data, linkerClass)
    this.next = next
  }
}

/**
 * Make a new Linker from the data given if it is not already a valid Linker.
 * @methodof Linker
 * @param {Linker|*} linker
 * @param {Linker} [linkerClass=Linker]
 * @return {Linker}
 */
Linker.make = (linker, linkerClass = Linker) => {
  if (typeof linker !== 'object') {
    // It is not an object, so instantiate the Linker with linker as the data
    return new linkerClass({ data: linker })
  }
  if (linker.classType) {
    // Already valid Linker, return as-is
    return linker
  }
  if (!linker.data) {
    linker = { data: linker }
  }
  // Create the new node as the configured linkerClass
  return new linkerClass(linker, linkerClass)
}

/**
 * Convert an array into Linker instances, return the head and tail Linkers.
 * @methodof Linker
 * @param {Array} [values=[]]
 * @param {Linker} [linkerClass=Linker]
 * @returns {{head: Linker, tail: Linker}}
 */
Linker.fromArray = (values = [], linkerClass = Linker) => values.reduce(
  (references, linker) => {
    const newLinker = linkerClass.make(linker)
    if (references.head === null) {
      // Initialize the head and tail with the new node
      return { head: newLinker, tail: newLinker }
    }
    // Only update the tail once head has been set, tail is always the most recent node
    references.tail.next = newLinker
    references.tail = newLinker
    return references
  },
  { head: null, tail: null }
)

export default Linker
