# Collect your stuff (and go)!

Data allocation and manipulation - a set of classic collection types (linked lists, doubly-linked lists, tree lists,
queues, stacks) built on a common `Linker`/`Arrayable` foundation.

## Install

```shell
npm install collect-your-stuff
```

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

## Documentation

The reference for every class is in [`docs/`](https://joshuaheagle.com/projects/collect-your-stuff/docs/index.html) (or open `docs/index.html` locally). It is generated from the TypeScript source, and each module is a folder of `src/`:

| Module | What it holds |
| --- | --- |
| `collections` | The collection classes: `Arrayable`/`ArrayElement`, `LinkedList`/`Linker`, `DoublyLinkedList`/`DoubleLinker`, `LinkedTreeList`/`TreeLinker`, `Queue`/`Queueable`/`TaskQueue`, `Stack`/`Stackable`/`TaskStack`, `ScopedCollection` |
| `recipes` | The `Is*` interfaces each collection implements (including `IsScopedCollection`), their iterators, and `Runnable` |
| `services` | Tree-walking helpers (`parseTree`, `parseTreeNext`) and other collection-agnostic utilities |

## Development

```shell
npm install
npm test          # the tests
npm run typecheck # the types
npm run build     # dist/, browser/ and docs/
npm run docs      # only the documentation
```
