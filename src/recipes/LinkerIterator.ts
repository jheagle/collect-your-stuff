import IsElement from './IsElement'

/**
 * Class LinkerIterator returns the next value for Iterable classes.
 */
class LinkerIterator implements Iterator<IsElement<any>> {
  private current: IsElement<any>

  constructor (current: IsElement<any>) {
    this.current = current
  }

  next (value?: any): IteratorResult<IsElement<any>> {
    const result = { value: this.current, done: !this.current }
    this.current = (this.current ? this.current.next : null)
    return result
  }
}

export default LinkerIterator
