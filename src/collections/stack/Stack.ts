/**
 * @file stack.
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 2.0.0
 * @memberOf module:collect-your-stuff
 */
import { LinkedList } from '../linked-list/LinkedList'
import { Linker } from '../linked-list/Linker'
import { IsArrayable } from '../../recipes/IsArrayable'
import { IsStack } from '../../recipes/IsStack'

/**
 * A last-in-first-out collection: items are added to the top with push and taken from the top with pop. Any value can
 * be stacked (it is stored as it is, whether it is a function, an object or null), and adding and taking are constant
 * time. To stack tasks which are run as they are taken use TaskStack.
 */
export class Stack<T = any> implements IsStack<T>, Iterable<T> {
  /** The list which stores the stacked items, the first is the top of the stack. */
  public stackedList: IsArrayable<any>
  private readonly linkerClass: typeof Linker

  /**
   * Instantiate the stack, optionally with a list of items to start from.
   * @param {IsArrayable|null} [stackedList=null] The list of linkers to start in this stack (the first is the top)
   * @param {IsArrayable} [listClass=LinkedList] The type of list to create when no stacked list is given
   * @param {Linker} [linkerClass=Linker] The class used to hold each stacked item
   */
  public constructor (stackedList: IsArrayable<any> | null = null, listClass: any = LinkedList, linkerClass: typeof Linker = Linker) {
    this.linkerClass = linkerClass
    this.stackedList = stackedList === null ? new listClass(linkerClass) : stackedList
  }

  /**
   * Check whether the stack has no items.
   * @return {boolean}
   */
  public empty (): boolean {
    return this.size() <= 0
  }

  /**
   * Look at the item on the top of the stack, without removing it.
   * @return {*|null} The item, or null when the stack is empty
   */
  public peek (): T | null {
    const top = this.stackedList.first
    return top === null || typeof top === 'undefined' ? null : top.data
  }

  /**
   * Take the item from the top of the stack.
   * @return {*|null} The item, or null when the stack is empty
   */
  public pop (): T | null {
    const top = this.stackedList.first
    if (top === null || typeof top === 'undefined') {
      return null
    }
    this.stackedList.remove(top)
    return top.data
  }

  /**
   * Add an item to the top of the stack.
   * @param {*} data The item to add
   * @return {Stack} This stack, so that adding can be chained
   */
  public push (data: T): this {
    // The item is wrapped here rather than left to the list, since the list treats objects that look like a linker's
    // settings (they have a data property) as such, and a stack must give back exactly what it was given
    this.stackedList.prepend(new this.linkerClass({ data }))
    return this
  }

  /**
   * Count the items in the stack.
   * @return {number}
   */
  public size (): number {
    return this.stackedList.length
  }

  /**
   * The item on the top of the stack (the same as peek).
   * @return {*|null} The item, or null when the stack is empty
   */
  public top (): T | null {
    return this.peek()
  }

  /**
   * Iterate over the items from the top of the stack to the bottom, without removing them.
   * @return {Iterator}
   */
  public [Symbol.iterator] (): Iterator<T> {
    const linkers: Iterator<any> = this.stackedList[Symbol.iterator]()
    return {
      next: (): IteratorResult<T> => {
        const result = linkers.next()
        return result.done ? { done: true, value: undefined } : { done: false, value: result.value.data }
      }
    }
  }

  /**
   * Convert an array to a Stack by pushing each value in turn, so the last value is on the top.
   * @param {Array} [values=[]] The items to stack
   * @param {IsArrayable} [listClass=LinkedList] The type of list used to store the items
   * @param {Linker} [linkerClass=Linker] The class used to hold each stacked item
   * @returns {Stack}
   */
  public static fromArray = <T = any>(values: Array<T> = [], listClass: any = LinkedList, linkerClass: typeof Linker = Linker): Stack<T> => {
    const stack = new Stack<T>(null, listClass, linkerClass)
    values.forEach(value => stack.push(value))
    return stack
  }
}
