# Collect your stuff (and go)!

Data allocation and manipulation - a set of classic collection types (linked lists, doubly-linked lists, tree lists,
queues, stacks, and the array-backed base they share) built on a common `Linker`/`Arrayable` foundation, plus the
recipe interfaces and services used to build and walk them.

## The modules

Each module of the documentation is a folder of `src/`:

* `collections`: the collection classes themselves - `Arrayable`/`ArrayElement`, `LinkedList`/`Linker`,
  `DoublyLinkedList`/`DoubleLinker`, `LinkedTreeList`/`TreeLinker`, `Queue`/`Queueable`/`TaskQueue`,
  `Stack`/`Stackable`/`TaskStack`, and `ScopedCollection` (a keyed collection partitioned by scope, held in a
  `WeakMap` so each scope's own keys are freed once nothing else references that scope).
* `recipes`: the `Is*` interfaces each collection implements (`IsArrayable`, `IsLinker`, `IsTree`, `IsQueue`,
  `IsScopedCollection`, `IsStack`, ...), their iterators, and `Runnable`.
* `services`: helpers for working with trees (`parseTree`, `parseTreeNext`) and other collection-agnostic utilities.

## Example

```js
const { LinkedList, Queue, Stack } = require('collect-your-stuff')

const list = LinkedList.fromArray(['a', 'b', 'c'])
list.length // 3

const queue = Queue.fromArray([1, 2, 3])
queue.dequeue() // 1

const stack = Stack.fromArray([1, 2, 3])
stack.pop() // 3
```
