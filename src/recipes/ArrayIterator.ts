import { IsElement } from './IsElement'

/**
 * Class ArrayIterator returns the next value when using elements of array type list.
 */
export class ArrayIterator implements Iterator<IsElement> {
  private readonly innerList: Array<IsElement>
  private index: number

  /**
   * Create an iterator over the given array.
   * @param {Array<IsElement>} innerList The elements to iterate over.
   * @param {number} [index=0] The position to start from.
   */
  constructor (innerList: Array<IsElement>, index = 0) {
    this.innerList = innerList
    this.index = index
  }

  /**
   * Get the next element, moving the iterator forward.
   * @param {*} [value] Not used, present to match the Iterator interface.
   * @return {IteratorResult<IsElement>} The next element, or done when there are no more.
   */
  next (value?: any): IteratorResult<IsElement> {
    if (this.index < this.innerList.length) {
      return { value: this.innerList[this.index++], done: false }
    }
    return { value: undefined, done: true }
  }
}
