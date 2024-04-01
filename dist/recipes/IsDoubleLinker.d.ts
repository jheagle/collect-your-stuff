import { IsLinker } from './IsLinker';
/**
 * Define the common attributes of a DoubleLinker used in a linking structure chained with 'next' and sometimes 'prev'.
 */
export interface IsDoubleLinker extends IsLinker {
    /**
     * @property {IsDoubleLinker} [next=null]
     */
    next: IsDoubleLinker;
    /**
     * @property {IsDoubleLinker} [prev=null]
     */
    prev: IsDoubleLinker;
}
