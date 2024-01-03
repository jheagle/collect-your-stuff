import IsTreeNode from './IsTreeNode'
import parseTreeNext from '../services/parseTreeNext'

/**
 * Class TreeLinkerIterator returns the next value taking a left-first approach down a tree.
 */
class TreeLinkerIterator implements Iterator<IsTreeNode> {
  private current: IsTreeNode

  constructor (current: IsTreeNode) {
    this.current = current
  }

  next (value?: any): IteratorResult<IsTreeNode> {
    const result = { value: this.current, done: !this.current }
    this.current = parseTreeNext(this.current)
    return result
  }
}

export default TreeLinkerIterator
