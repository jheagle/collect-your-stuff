/**
 * @file linked list item.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import IsElement from '../../recipes/IsElement'

/**
 * Linker represents a node in a LinkedList.
 */
class Linker implements IsElement<Linker> {
  public readonly classType: typeof Linker
  public data: any = null
  public next: Linker | null = null

  /**
   * Create the new Linker instance, provide the data and optionally configure the type of Linker.
   * @param {Object} [nodeData={}]
   * @param {*} [nodeData.data=null]
   * @param {Linker|null} [nodeData.next=null]
   */
  constructor ({ data = null, next = null }: {
    data?: any;
    next?: Linker | null
  } = {}) {
    this.classType = Linker
    this.data = data
    this.next = next
  }

  /**
   * Make a new Linker from the data given if it is not already a valid Linker.
   * @param {Linker|*} linker
   * @return {Linker}
   */
  public static make = (linker: Linker | any): IsElement<Linker> => {
    if (typeof linker !== 'object') {
      // It is not an object, so instantiate the Linker with element as the data
      return new Linker({ data: linker })
    }
    if (linker.classType) {
      // Already valid Linker, return as-is
      return linker
    }
    if (!linker.data) {
      linker = { data: linker }
    }
    // Create the new node as the configured #classType
    return new Linker(linker)
  }

  /**
   * Convert an array into Linker instances, return the head and tail Linkers.
   * @param {Array} [values=[]]
   * @returns {{head: Linker, tail: Linker}}
   */
  public static fromArray = (values: Array<any>): { head: Linker; tail: Linker; } => values.reduce(
    (references, linker) => {
      const newLinker = Linker.make(linker)
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
}

export default Linker
