/**
 * @file doubly linked list item.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import IsElement from '../../recipes/IsElement'

/**
 * DoubleLinker represents a node in a DoublyLinkedList.
 */
class DoubleLinker implements IsElement<DoubleLinker> {
  public readonly classType: typeof DoubleLinker
  public data: any = null
  public next: DoubleLinker | null = null
  public prev: DoubleLinker | null = null

  /**
   * Create the new DoubleLinker instance, provide the data and optionally configure the type of Linker.
   * @param {Object} [nodeData={}]
   * @param {*} [nodeData.data=null]
   * @param {DoubleLinker|null} [nodeData.prev=null]
   * @param {DoubleLinker|null} [nodeData.next=null]
   */
  constructor ({ data = null, prev = null, next = null }: {
    data?: any,
    prev?: DoubleLinker | null,
    next?: DoubleLinker | null
  } = {}) {
    this.classType = DoubleLinker
    this.data = data
    this.next = next
    this.prev = prev
  }

  /**
   * Make a new DoubleLinker from the data given if it is not already a valid Linker.
   * @param {DoubleLinker|*} linker
   * @return {DoubleLinker}
   */
  public static make = (linker: DoubleLinker | any): IsElement<DoubleLinker> => {
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
   * @param {Array} [values=[]]
   * @param {DoubleLinker} [linkerClass=DoubleLinker]
   * @returns {{head: DoubleLinker, tail: DoubleLinker}}
   */
  public static fromArray = (values: Array<any> = [], linkerClass: typeof DoubleLinker = DoubleLinker): {
    head: DoubleLinker;
    tail: DoubleLinker;
  } => values.reduce(
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
}

export default DoubleLinker
