/**
 * @file linked list item.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
import { IsElement } from '../../recipes/IsElement'

/**
 * Element represents a node in an Arrayable.
 */
export class ArrayElement implements IsElement {
  public readonly classType: typeof ArrayElement = ArrayElement
  public data: any = null

  /**
   * Create the new Element instance, provide the data and optionally configure the type of Element.
   * @param {*} [data=null] The data to be stored in this element.
   */
  public constructor (data: any = null) {
    this.data = data
  }

  /**
   * Make a new Element from the data given if it is not already a valid Element.
   * @param {ArrayElement|*} element Return a valid ArrayElement instance from given data, or even an already valid one.
   * @param {IsElement} [classType=ArrayElement] Provide the type of IsElement to use.
   * @return {ArrayElement}
   */
  public static make = (element: ArrayElement | any, classType: any = ArrayElement): IsElement | any => {
    if (typeof element !== 'object') {
      // It is not an object, so instantiate the Element with element as the data
      return new classType(element)
    }
    if (element.classType) {
      // Already valid Element, return as-is
      return element
    }
    // Create the new node as the configured #classType
    return new classType(element)
  }

  /**
   * Convert an array into Element instances, return the head and tail Elements.
   * @param {Array<IsElement>} [values=[]] Provide an array of data that will be converted to array of elements.
   * @param {IsElement} [classType=ArrayElement] Provide the type of IsElement to use.
   * @returns {{head: ArrayElement[], tail: ArrayElement}}
   */
  public static fromArray = (values: Array<IsElement> = [], classType: any = ArrayElement): {
    head: Array<ArrayElement>;
    tail: ArrayElement
  } => values.reduce(
    (references, element) => {
      const newElement: ArrayElement = classType.make(element, classType)
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
