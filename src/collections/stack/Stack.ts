/**
 * @file stack.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */
import Stackable from './Stackable'
import IsArrayable from '../../recipes/IsArrayable'
import LinkedList from '../linked-list/LinkedList'
import IsLinker from '../../recipes/IsLinker'
import { completeResponse } from '../../recipes/Runnable'

/**
 * Store a collection of items which can only be inserted and removed from the top.
 */
class Stack {
  public stackedList: IsArrayable<any>

  /**
   * Instantiate the state with the starter stacked list.
   * @param {Iterable|LinkedList} stackedList
   */
  public constructor (stackedList: IsArrayable<any>) {
    this.stackedList = stackedList
  }

  /**
   * Return true if the stack is empty (there are no tasks in the stacked list)
   * @return {boolean}
   */
  public empty (): boolean {
    return this.size() <= 0
  }

  /**
   * Take a look at the next stacked task
   * @return {Stackable}
   */
  public top (): IsLinker {
    return this.stackedList.first
  }

  /**
   * Remove the next stacked task and return it.
   * @return {Stackable|null}
   */
  public pop (): Stackable | completeResponse | null {
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
   * @param {Stackable|*} stackable Add a new stackable to the top of the stack
   */
  public push (stackable: any) {
    this.stackedList.prepend(stackable)
  }

  /**
   * Remove the next stacked task and return it.
   * @return {Stackable|null}
   */
  public remove (): Stackable | null {
    if (this.empty()) {
      return null
    }
    return this.stackedList.remove(this.stackedList.first)
  }

  /**
   * Get the size of the current stack.
   * @return {number}
   */
  public size (): number {
    return this.stackedList.length
  }

  /**
   * Convert an array to a Stack.
   * @param {Array} values An array of values which will be converted to stackables in this queue
   * @param {Stackable} stackableClass The class to use for each stackable
   * @param {Stack|Iterable} listClass The class to use to manage the stackables
   * @returns {Stack}
   */
  public static fromArray = (values: Array<any> = [], stackableClass: typeof Stackable = Stackable, listClass: any = LinkedList): Stack => {
    const list: IsArrayable<any> = new listClass(stackableClass)
    list.initialize(stackableClass.fromArray(values, stackableClass).head)
    return new Stack(list)
  }
}

export default Stack
