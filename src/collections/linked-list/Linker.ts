/**
 * @file linked list item.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
import IsLinker from '../../recipes/IsLinker'
import ArrayElement from '../arrayable/ArrayElement'

/**
 * Linker represents a node in a LinkedList.
 * @extends ArrayElement
 */
class Linker implements IsLinker {
  public readonly classType: typeof Linker = Linker
  public data: any = null
  public next: Linker | null = null

  /**
   * Create the new Linker instance, provide the data and optionally give the next Linker.
   * @param {Object} [nodeData={}]
   * @param {*} [nodeData.data=null] The data to be stored in this linker
   * @param {Linker|null} [nodeData.next=null] The reference to the next linker if any
   */
  public constructor ({ data = null, next = null }: {
    data?: any;
    next?: Linker | null
  } = {}) {
    this.data = data
    this.next = next
  }

  /**
   * Make a new Linker from the data given if it is not already a valid Linker.
   * @param {Linker|*} linker Return a valid Linker instance from given data, or even an already valid one.
   * @param {IsLinker} [classType=Linker] Provide the type of IsLinker to use.
   * @return {Linker}
   */
  public static make = (linker: Linker | any, classType: any = Linker): IsLinker | any => {
    if (typeof linker !== 'object') {
      // It is not an object, so instantiate the Linker with element as the data
      return new classType({ data: linker })
    }
    if (linker.classType) {
      // Already valid Linker, return as-is
      return linker
    }
    if (!linker.data) {
      linker = { data: linker }
    }
    // Create the new node as the configured #classType
    return ArrayElement.make(linker, classType)
  }

  /**
   * Convert an array into Linker instances, return the head and tail Linkers.
   * @param {Array} [values=[]] Provide an array of data that will be converted to a chain of linkers.
   * @param {IsLinker} [classType=Linker] Provide the type of IsLinker to use.
   * @returns {{head: Linker, tail: Linker}}
   */
  public static fromArray = (values: Array<any>, classType: any = Linker): {
    head: IsLinker;
    tail: IsLinker;
  } => values.reduce(
    (references, linker) => {
      const newLinker = classType.make(linker, classType)
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
