import IsElement from './IsElement'

/**
 * Class ArrayIterator returns the next value when using elements of array type list.
 */
class ArrayIterator implements Iterator<IsElement> {
  private readonly innerList: Array<IsElement>
  private index: number

  constructor (innerList: Array<IsElement>, index = 0) {
    this.innerList = innerList
    this.index = index
  }

  next (value?: any): IteratorResult<IsElement> {
    if (this.index < this.innerList.length) {
      return { value: this.innerList[this.index++], done: false }
    }
    return { value: undefined, done: true }
  }
}

export default ArrayIterator
