/**
 * linked list item.
 */
import { IsElement } from '../../recipes/IsElement';
/**
 * Element represents a node in an Arrayable.
 */
export declare class ArrayElement implements IsElement {
    /** The class used to create this instance, so that it can be recognized as valid without an instanceof check. */
    readonly classType: typeof ArrayElement;
    /** The data stored in this element. */
    data: any;
    /**
     * Create the new Element instance, provide the data and optionally configure the type of Element.
     * @param data The data to be stored in this element.
     */
    constructor(data?: any);
    /**
     * Make a new Element from the data given if it is not already a valid Element.
     * @param element Return a valid ArrayElement instance from given data, or even an already valid one.
     * @param classType Provide the type of IsElement to use.
     */
    static make: (element: ArrayElement | any, classType?: any) => IsElement | any;
    /**
     * Convert an array into Element instances, return the head and tail Elements.
     * @param values Provide an array of data that will be converted to array of elements.
     * @param classType Provide the type of IsElement to use.
     */
    static fromArray: (values?: Array<IsElement>, classType?: any) => {
        head: Array<ArrayElement>;
        tail: ArrayElement;
    };
}
