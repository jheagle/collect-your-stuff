/**
 * task stack.
 */
import { Stackable } from './Stackable'
import { IsArrayable } from '../../recipes/IsArrayable'
import { LinkedList } from '../linked-list/LinkedList'
import { IsLinker } from '../../recipes/IsLinker'
import { completeResponse } from '../../recipes/Runnable'

/**
 * Store a collection of tasks (Stackables) which can only be inserted and removed from the top: pop() takes the task from
 * the top and RUNS it. For a plain last-in-first-out collection of items use Stack.
 */
export class TaskStack {
  /** The list which stores the stackables, the first is the top of the stack. */
  public stackedList: IsArrayable<any>
  private listClass: any
  private stackableClass: typeof Stackable

  /**
   * Instantiate the state with the starter stacked list.
   * @param stackedList The list of stackables to start in this stack.
   * @param listClass The type of list to create when no stacked list is given.
   * @param stackableClass The class used to wrap stacked items.
   */
  public constructor (stackedList: IsArrayable<any> = null, listClass: any = LinkedList, stackableClass: typeof Stackable = Stackable) {
    this.listClass = listClass
    this.stackableClass = stackableClass
    if (stackedList === null) {
      stackedList = new listClass(stackableClass)
    }
    this.stackedList = stackedList
  }

  /**
   * Return true if the stack is empty (there are no tasks in the stacked list)
   */
  public empty (): boolean {
    return this.size() <= 0
  }

  /**
   * Take a look at the next stacked task
   */
  public top (): IsLinker {
    return this.stackedList.first
  }

  /**
   * Remove the next stacked task and return it.
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
   * @param stackable Add a new stackable to the top of the stack
   */
  public push (stackable: any) {
    this.stackedList.prepend(stackable)
  }

  /**
   * Remove the next stacked task and return it.
   */
  public remove (): Stackable | null {
    if (this.empty()) {
      return null
    }
    return this.stackedList.remove(this.stackedList.first)
  }

  /**
   * Get the size of the current stack.
   */
  public size (): number {
    return this.stackedList.length
  }

  /**
   * Convert an array to a TaskStack.
   * @param values An array of values which will be converted to stackables in this queue
   * @param stackableClass The class to use for each stackable
   * @param listClass The class to use to manage the stackables
   */
  public static fromArray = (values: Array<any> = [], stackableClass: typeof Stackable = Stackable, listClass: any = LinkedList): TaskStack => {
    const list: IsArrayable<any> = new listClass(stackableClass)
    list.initialize(stackableClass.fromArray(values, stackableClass).head)
    return new TaskStack(list, listClass, stackableClass)
  }
}
