/**
 * @file stack.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import Stackable from './Stackable'
import Arrayable from '../arrayable/Arrayable'
import IsArrayable from '../../recipes/IsArrayable'
import { completeResponse } from '../queue/Queueable'
import IsElement from '../../recipes/IsElement'

/**
 * Store a collection of items which can only be inserted and removed from the top.
 * @see [Java Stack Interface]{@link http://www.cs.williams.edu/~freund/cs136-073/javadoc/structure5/structure5/Stack.html}
 */
class Stack {
  public stackedList: IsArrayable<any>

  /**
   * Instantiate the state with the starter stacked list.
   * @param {Iterable|Arrayable} stackedList
   */
  constructor (stackedList: IsArrayable<any>) {
    this.stackedList = stackedList
  }

  /**
   * Add a stackable task to the top of the stack.
   * @param {Stackable|*} stackable
   */
  add (stackable: Stackable | any) {
    this.stackedList.append(stackable)
  }

  /**
   * Return true if the stack is empty (there are no tasks in the stacked list)
   * @return {boolean}
   */
  empty (): boolean {
    return this.size() <= 0
  }

  /**
   * Return a reference to the next stacked task.
   * @return {Stackable}
   */
  get (): IsElement<Stackable> {
    return this.stackedList.last
  }

  /**
   * Return a reference to the next stacked / first stacked task (alias for 'get()')
   * @return {Stackable}
   */
  getFirst (): IsElement<Stackable> {
    return this.get()
  }

  /**
   * Take a look at the next stacked task (alias for 'get()')
   * @return {Stackable}
   */
  peek (): IsElement<Stackable> {
    return this.get()
  }

  /**
   * Remove the next stacked task and return it.
   * @return {Stackable|null}
   */
  pop (): Stackable | completeResponse | null {
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
  push (stackable: any) {
    this.add(stackable)
  }

  /**
   * Remove the next stacked task and return it.
   * @return {Stackable|null}
   */
  remove (): Stackable | null {
    if (this.empty()) {
      return null
    }
    return this.stackedList.remove(this.stackedList.last)
  }

  /**
   * Get the size of the current stack.
   * @return {number}
   */
  size (): number {
    return this.stackedList.length
  }

  /**
   * Convert an array to a Stack.
   * @methodof Stack
   * @param {Array} values
   * @param {Stackable} stackableClass
   * @param {Stack|Iterable} listClass
   * @returns {Stack}
   */
  public static fromArray = (values: Array<any> = [], stackableClass: typeof Stackable = Stackable, listClass: any = Arrayable): Stack => {
    const list: IsArrayable<Arrayable> = new listClass(stackableClass)
    list.initialize(stackableClass.fromArray(values).head)
    return new Stack(list)
  }
}

export default Stack
