/**
 * @file doubly linked list item.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
import IsDoubleLinker from '../../recipes/IsDoubleLinker'

/**
 * DoubleLinker represents a node in a DoublyLinkedList which is chained by next and prev.
 */
class DoubleLinker implements IsDoubleLinker {
  public readonly classType: typeof DoubleLinker
  public data: any = null
  public next: DoubleLinker | null = null
  public prev: DoubleLinker | null = null

  /**
   * Create the new DoubleLinker instance, provide the data and optionally the next and prev references.
   * @param {Object} [nodeData={}]
   * @param {*} [nodeData.data=null] The data to be stored in this linker
   * @param {DoubleLinker|null} [nodeData.next=null] The reference to the next linker if any
   * @param {DoubleLinker|null} [nodeData.prev=null] The reference to the previous linker if any
   */
  constructor ({ data = null, next = null, prev = null }: {
    data?: any,
    next?: DoubleLinker | null,
    prev?: DoubleLinker | null
  } = {}) {
    this.classType = DoubleLinker
    this.data = data
    this.next = next
    this.prev = prev
  }

  /**
   * Make a new DoubleLinker from the data given if it is not already a valid Linker.
   * @param {DoubleLinker|*} linker Return a valid Linker instance from given data, or even an already valid one.
   * @return {DoubleLinker}
   */
  public static make = (linker: DoubleLinker | any): IsDoubleLinker => {
    if (typeof linker !== 'object') {
      // It is not an object, so instantiate the DoubleLinker with element as the data
      return new DoubleLinker({ data: linker })
    }
    if (linker.classType) {
      // Already valid DoubleLinker, return as-is
      return linker
    }
    if (!linker.data) {
      linker = { data: linker }
    }
    // Create the new node as the configured #classType
    return new DoubleLinker(linker)
  }

  /**
   * Convert an array into DoubleLinker instances, return the head and tail DoubleLinkers.
   * @param {Array} [values=[]] Provide an array of data that will be converted to a chain of linkers.
   * @returns {{head: DoubleLinker, tail: DoubleLinker}}
   */
  public static fromArray = (values: Array<any> = []): {
    head: DoubleLinker;
    tail: DoubleLinker;
  } => values.reduce(
    (references, linker) => {
      const newLinker = DoubleLinker.make(linker)
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
}

export default DoubleLinker
