import IsDoubleLinker from './IsDoubleLinker'

/**
 * Class DoubleLinkerIterator returns the next value when using linkers of linked type lists.
 */
class DoubleLinkerIterator implements Iterator<IsDoubleLinker> {
  private current: IsDoubleLinker

  constructor (current: IsDoubleLinker) {
    this.current = current
  }

  next (value?: any): IteratorResult<IsDoubleLinker> {
    const result = { value: this.current, done: !this.current }
    this.current = (this.current ? this.current.next : null)
    return result
  }
}

export default DoubleLinkerIterator
