import IsLinker from './IsLinker'

/**
 * Class LinkerIterator returns the next value when using linkers of linked type lists.
 */
class LinkerIterator implements Iterator<IsLinker> {
  private current: IsLinker

  constructor (current: IsLinker) {
    this.current = current
  }

  next (value?: any): IteratorResult<IsLinker> {
    const result = { value: this.current, done: !this.current }
    this.current = (this.current ? this.current.next : null)
    return result
  }
}

export default LinkerIterator
