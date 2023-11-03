import IsArrayable from './IsArrayable'

/**
 * Define the common attributes of an Element of a list.
 */
export default interface IsElement<T> {
  classType: T | any
  data: any
  next?: T
  prev?: T
  parent?: IsElement<any> | null,
  children?: IsArrayable<any> | null
}
