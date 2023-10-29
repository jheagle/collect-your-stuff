/**
 * @file stack.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import Stackable from './Stackable'
import Arrayable from '../arrayable/Arrayable'

/**
 * Store a collection of items which can only be inserted and removed from the top.
 * @see [Java Stack Interface]{@link http://www.cs.williams.edu/~freund/cs136-073/javadoc/structure5/structure5/Stack.html}
 */
class Stack {
  stackedList = []

  /**
   * Instantiate the state with the starter stacked list.
   * @param {Iterable|Arrayable} stackedList
   */
  constructor (stackedList = []) {
    this.stackedList = stackedList
  }

  /**
   * Return the internal stacked list.
   * @return {Iterable|LinkedList}
   */
  get stackedList () {
    return this.stackedList
  }

  /**
   * Add a stackable task to the top of the stack.
   * @param {Stackable|*} stackable
   */
  add (stackable) {
    this.stackedList.append(stackable)
  }

  /**
   * Return true if the stack is empty (there are no tasks in the stacked list)
   * @return {boolean}
   */
  empty () {
    return this.size() <= 0
  }

  /**
   * Return a reference to the next stacked task.
   * @return {Stackable}
   */
  get () {
    return this.stackedList.last
  }

  /**
   * Return a reference to the next stacked / first stacked task (alias for 'get()')
   * @return {Stackable}
   */
  getFirst () {
    return this.get()
  }

  /**
   * Take a look at the next stacked task (alias for 'get()')
   * @return {Stackable}
   */
  peek () {
    return this.get()
  }

  /**
   * Remove the next stacked task and return it.
   * @return {Stackable|null}
   */
  pop () {
    const next = this.remove()
    if (!next) {
      return {
        success: 'No more stackable tasks in the stack',
        error: false,
        context: this.stackedList,
      }
    }
    return next.run()
  }

  /**
   * Push a stackable task to the top of the stack.
   * @param {Stackable|*} stackable
   */
  push (stackable) {
    this.add(stackable)
  }

  /**
   * Remove the next stacked task and return it.
   * @return {Stackable|null}
   */
  remove () {
    if (this.empty()) {
      return null
    }
    return this.stackedList.remove(this.stackedList.last)
  }

  /**
   * Get the size of the current stack.
   * @return {number}
   */
  size () {
    return this.stackedList.length
  }
}

/**
 * Convert an array to a Stack.
 * @methodof Stack
 * @param {Array} values
 * @param {Stackable} stackableClass
 * @param {Stack|Iterable} listClass
 * @returns {Stack}
 */
Stack.fromArray = (values = [], stackableClass = Stackable, listClass = Arrayable) => {
  const list = new listClass(stackableClass)
  list.initialize(stackableClass.fromArray(values, stackableClass).head)
  return new Stack(list)
}

export default Stack
