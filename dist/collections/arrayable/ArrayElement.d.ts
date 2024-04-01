/**
 * @file linked list item.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.1.0
 * @memberOf module:collect-your-stuff
 */
import { IsElement } from '../../recipes/IsElement';
/**
 * Element represents a node in an Arrayable.
 */
export declare class ArrayElement implements IsElement {
    readonly classType: typeof ArrayElement;
    data: any;
    /**
     * Create the new Element instance, provide the data and optionally configure the type of Element.
     * @param {*} [data=null] The data to be stored in this element.
     */
    constructor(data?: any);
    /**
     * Make a new Element from the data given if it is not already a valid Element.
     * @param {ArrayElement|*} element Return a valid ArrayElement instance from given data, or even an already valid one.
     * @param {IsElement} [classType=ArrayElement] Provide the type of IsElement to use.
     * @return {ArrayElement}
     */
    static make: (element: ArrayElement | any, classType?: any) => IsElement | any;
    /**
     * Convert an array into Element instances, return the head and tail Elements.
     * @param {Array<IsElement>} [values=[]] Provide an array of data that will be converted to array of elements.
     * @param {IsElement} [classType=ArrayElement] Provide the type of IsElement to use.
     * @returns {{head: ArrayElement[], tail: ArrayElement}}
     */
    static fromArray: (values?: Array<IsElement>, classType?: any) => {
        head: Array<ArrayElement>;
        tail: ArrayElement;
    };
}
