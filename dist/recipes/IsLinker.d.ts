import IsElement from './IsElement';
/**
 * Define the common attributes of a Linker used in a linking structure chained with 'next' (and sometimes 'prev').
 */
export default interface IsLinker extends IsElement {
    /**
     * @property {IsLinker} [next=null]
     */
    next: IsLinker;
}
