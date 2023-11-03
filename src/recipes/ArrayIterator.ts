import ArrayElement from '../collections/arrayable/ArrayElement'
import IsElement from './IsElement'

/**
 * Class ArrayIterator returns the next value for Iterable classes.
 */
class ArrayIterator implements Iterator<IsElement<ArrayElement>> {
  private readonly innerList: Array<IsElement<ArrayElement>>
  private index: number

  constructor (innerList: Array<IsElement<ArrayElement>>, index = 0) {
    this.innerList = innerList
    this.index = index
  }

  next (value?: any): IteratorResult<IsElement<ArrayElement>> {
    if (this.index < this.innerList.length) {
      return { value: this.innerList[this.index++], done: false }
    }
    return { value: undefined, done: true }
  }
}

export default ArrayIterator
