"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Queueable = _interopRequireDefault(require("./Queueable"));
var _LinkedList = _interopRequireDefault(require("../linked-list/LinkedList"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * @file queue
 * @author Joshua Heagle <joshuaheagle@gmail.com>
 * @version 1.0.0
 * @memberOf module:collect-your-stuff
 */

/**
 * Maintain a series of queued items.
 * @see [Java Queue Interface]{@link http://www.cs.williams.edu/~freund/cs136-073/javadoc/structure5/structure5/Queue.html}
 */
class Queue {
  queuedList = [];

  /**
   * Instantiate the queue with the given queue list.
   * @param {Iterable|LinkedList} queuedList
   */
  constructor() {
    let queuedList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    this.queuedList = queuedList;
  }

  /**
   * Return the internal queued list.
   * @return {Iterable|LinkedList}
   */
  get queuedList() {
    return this.queuedList;
  }

  /**
   * Add a queued task to the end of the queue
   * @param {Queueable|*} queueable
   */
  add(queueable) {
    this.queuedList.append(queueable);
  }

  /**
   * Take a queued task from the front of the queue and run it if ready.
   * @return {completeResponse|*}
   */
  dequeue() {
    const next = this.remove();
    if (!next) {
      return {
        success: 'No more queueable tasks in the queue',
        error: false,
        context: this.queuedList
      };
    }
    if (next.complete) {
      // Previously ran queued, run next
      return this.dequeue();
    }
    if (next.running) {
      return {
        success: false,
        error: 'The queue has been blocked by an unfinished task.',
        context: next
      };
    }
    // Place back in queue to be checked once again next time
    this.enqueue(next);
    if (next.isReady) {
      return next.run.call(next);
    }
    // We could go check the next in queue here but if we end up in a state where nothing is ready it would infinite loop
    // Also, we want the loop handled externally
    return {
      success: false,
      error: 'Unable to find ready task.',
      context: next
    };
  }

  /**
   * Return true if the queue is empty (there are no tasks in the queue list)
   * @return {boolean}
   */
  empty() {
    return this.size() <= 0;
  }

  /**
   * Add a queued task to the end of the queue (alias for 'add()')
   * @param {Queueable} queueable
   */
  enqueue(queueable) {
    this.add(queueable);
  }

  /**
   * Return a reference to the next queued task.
   * @return {Queueable}
   */
  get() {
    return this.queuedList.first;
  }

  /**
   * Return a reference to the next queued / first queued task (alias for 'get()')
   * @return {Queueable}
   */
  getFirst() {
    return this.get();
  }

  /**
   * Take a look at the next queued task (alias for 'get()')
   * @return {Queueable}
   */
  peek() {
    return this.get();
  }

  /**
   * Remove the next queued item and return it.
   * @return {Queueable|null}
   */
  remove() {
    if (this.empty()) {
      return null;
    }
    return this.queuedList.remove(this.queuedList.first);
  }

  /**
   * Get the length of the current queue.
   * @return {number}
   */
  size() {
    return this.queuedList.length;
  }
}

/**
 * Convert an array to a Queue.
 * @methodof Queue
 * @param {Array} values
 * @param {Queueable} queueableClass
 * @param {Queue|Iterable} listClass
 * @returns {Queue}
 */
Queue.fromArray = function () {
  let values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  let queueableClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _Queueable.default;
  let listClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _LinkedList.default;
  const list = new listClass(queueableClass);
  list.initialize(queueableClass.fromArray(values, queueableClass).head);
  return new Queue(list);
};
var _default = exports.default = Queue;