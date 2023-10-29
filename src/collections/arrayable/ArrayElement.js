/**
 * @file linked list item.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */

/**
 * Element represents a node in an Arrayable.
 */
class ArrayElement {
  data = null
  classType

  /**
   * Create the new Element instance, provide the data and optionally configure the type of Element.
   * @param {*} [data=null]
   * @param {ArrayElement} [elementClass=Element]
   */
  constructor (data = null, elementClass = ArrayElement) {
    this.classType = elementClass
    this.data = data
  }

  /**
   * Return the type of class used for Element.
   
   * @return {ArrayElement}
   */
  get classType () {
    return this.classType
  }
}

/**
 * Make a new Element from the data given if it is not already a valid Element.
 * @methodof ArrayElement
 * @param {ArrayElement|*} element
 * @param {ArrayElement} [elementClass=Element]
 * @return {ArrayElement}
 */
ArrayElement.make = (element, elementClass = ArrayElement) => {
  if (typeof element !== 'object') {
    // It is not an object, so instantiate the Element with element as the data
    return new elementClass(element)
  }
  if (element.classType) {
    // Already valid Element, return as-is
    return element
  }
  // Create the new node as the configured #classType
  return new elementClass(element, elementClass)
}

/**
 * Convert an array into Element instances, return the head and tail Elements.
 * @methodof ArrayElement
 * @param {Array} [values=[]]
 * @param {ArrayElement} [elementClass=Element]
 * @returns {{head: ArrayElement, tail: ArrayElement}}
 */
ArrayElement.fromArray = (values = [], elementClass = ArrayElement) => values.reduce(
  (references, element) => {
    const newElement = elementClass.make(element)
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

export default ArrayElement
