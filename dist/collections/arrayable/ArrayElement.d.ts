/**
 * @file linked list item.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import IsElement from '../../recipes/IsElement';
/**
 * Element represents a node in an Arrayable.
 */
declare class ArrayElement implements IsElement<ArrayElement> {
    readonly classType: typeof ArrayElement;
    data: any;
    /**
     * Create the new Element instance, provide the data and optionally configure the type of Element.
     * @param {*} [data=null]
     */
    constructor(data?: any);
    /**
     * Make a new Element from the data given if it is not already a valid Element.
     * @param {ArrayElement|*} element
     * @return {ArrayElement}
     */
    static make: (element: typeof ArrayElement | any) => ArrayElement;
    /**
     * Convert an array into Element instances, return the head and tail Elements.
     * @param {Array} [values=[]]
     * @returns {{head: ArrayElement[], tail: ArrayElement}}
     */
    static fromArray: (values?: Array<IsElement<any>>) => {
        head: Array<ArrayElement>;
        tail: ArrayElement;
    };
}
export default ArrayElement;
