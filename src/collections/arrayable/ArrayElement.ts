/**
 * @file linked list item.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
import IsElement from '../../recipes/IsElement'

/**
 * Element represents a node in an Arrayable.
 */
class ArrayElement implements IsElement {
  public readonly classType: typeof ArrayElement
  public data: any = null

  /**
   * Create the new Element instance, provide the data and optionally configure the type of Element.
   * @param {*} [data=null] The data to be stored in this element.
   */
  constructor (data: any = null) {
    this.classType = ArrayElement
    this.data = data
  }

  /**
   * Make a new Element from the data given if it is not already a valid Element.
   * @param {ArrayElement|*} element Return a valid ArrayElement instance from given data, or even an already valid one.
   * @return {ArrayElement}
   */
  public static make = (element: ArrayElement | any): ArrayElement => {
    if (typeof element !== 'object') {
      // It is not an object, so instantiate the Element with element as the data
      return new ArrayElement(element)
    }
    if (element.classType) {
      // Already valid Element, return as-is
      return element
    }
    // Create the new node as the configured #classType
    return new ArrayElement(element)
  }

  /**
   * Convert an array into Element instances, return the head and tail Elements.
   * @param {Array<IsElement>} [values=[]] Provide an array of data that will be converted to array of elements.
   * @returns {{head: ArrayElement[], tail: ArrayElement}}
   */
  public static fromArray = (values: Array<IsElement> = []): {
    head: Array<ArrayElement>;
    tail: ArrayElement
  } => values.reduce(
    (references, element) => {
      const newElement: ArrayElement = ArrayElement.make(element)
      if (!references.head.length) {
        // Initialize the head and tail with the new node
        return { head: [newElement], tail: newElement }
      }
      // Only update the tail once head has been set, tail is always the most recent node
      references.head.push(newElement)
      references.tail = newElement
      return references
    },
    { head: [], tail: null }
  )
}

export default ArrayElement
