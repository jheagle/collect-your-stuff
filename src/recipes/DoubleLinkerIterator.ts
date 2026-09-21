import { IsDoubleLinker } from './IsDoubleLinker'

/**
 * Class DoubleLinkerIterator returns the next value when using linkers of linked type lists.
 */
export class DoubleLinkerIterator implements Iterator<IsDoubleLinker> {
  private current: IsDoubleLinker

  /**
   * Create an iterator starting at the given item.
   * @param {IsDoubleLinker} current The item to start from.
   */
  constructor (current: IsDoubleLinker) {
    this.current = current
  }

  /**
   * Get the current item and move on to the following one.
   * @param {*} [value] Not used, present to match the Iterator interface.
   * @return {IteratorResult<IsDoubleLinker>} The current item, or done when there are no more.
   */
  next (value?: any): IteratorResult<IsDoubleLinker> {
    const result = { value: this.current, done: !this.current }
    this.current = (this.current ? this.current.next : null)
    return result
  }
}
