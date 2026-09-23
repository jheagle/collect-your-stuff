# Collect your stuff (and go)!

Data allocation and manipulation.

## Modules

<dl>
<dt><a href="#module_collect-your-stuff">collect-your-stuff</a></dt>
<dd><p>All of the collections available.</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#TreeLinkerIterator">TreeLinkerIterator</a></dt>
<dd><p>Class TreeLinkerIterator returns the next value taking a left-first approach down a tree.</p>
</dd>
<dt><a href="#Runnable">Runnable</a></dt>
<dd><p>Identify a class that can be run.</p>
</dd>
<dt><a href="#LinkerIterator">LinkerIterator</a></dt>
<dd><p>Class LinkerIterator returns the next value when using linkers of linked type lists.</p>
</dd>
<dt><a href="#DoubleLinkerIterator">DoubleLinkerIterator</a></dt>
<dd><p>Class DoubleLinkerIterator returns the next value when using linkers of linked type lists.</p>
</dd>
<dt><a href="#ArrayIterator">ArrayIterator</a></dt>
<dd><p>Class ArrayIterator returns the next value when using elements of array type list.</p>
</dd>
<dt><a href="#TaskStack">TaskStack</a></dt>
<dd><p>Store a collection of tasks (Stackables) which can only be inserted and removed from the top: pop() takes the task from
the top and RUNS it. For a plain last-in-first-out collection of items use Stack.</p>
</dd>
<dt><a href="#Stackable">Stackable</a> ⇐ <code><a href="#Linker">Linker</a></code></dt>
<dd><p>Stackable represents a runnable entry in stack.</p>
</dd>
<dt><a href="#Stack">Stack</a></dt>
<dd><p>A last-in-first-out collection: items are added to the top with push and taken from the top with pop. Any value can
be stacked (it is stored as it is, whether it is a function, an object or null), and adding and taking are constant
time. To stack tasks which are run as they are taken use TaskStack.</p>
</dd>
<dt><a href="#TaskQueue">TaskQueue</a></dt>
<dd><p>Maintain a series of queued tasks (Queueables): dequeue() takes the next task from the front and RUNS it, giving each
task in turn a chance to run (a task which is not ready, or which has not finished, is placed at the back again).
This is a task scheduler, for a plain first-in-first-out collection of items use Queue.</p>
</dd>
<dt><a href="#Queueable">Queueable</a> ⇐ <code><a href="#Linker">Linker</a></code></dt>
<dd><p>Queueable represents a runnable entry in a queue.</p>
</dd>
<dt><a href="#Queue">Queue</a></dt>
<dd><p>A first-in-first-out collection: items are added to the back with enqueue and taken from the front with dequeue.
Any value can be queued (it is stored as it is, whether it is a function, an object or null), and adding and taking
are constant time. To queue tasks which are run as they are taken use TaskQueue.</p>
</dd>
<dt><a href="#TreeLinker">TreeLinker</a> ⇐ <code><a href="#DoubleLinker">DoubleLinker</a></code></dt>
<dd><p>TreeLinker represents a node in a LinkedTreeList having a parent (or root) and child nodes.</p>
</dd>
<dt><a href="#LinkedTreeList">LinkedTreeList</a> ⇐ <code><a href="#DoublyLinkedList">DoublyLinkedList</a></code></dt>
<dd><p>LinkedTreeList represents a collection stored with a root and spreading in branching (tree) formation.</p>
</dd>
<dt><a href="#Linker">Linker</a> ⇐ <code><a href="#ArrayElement">ArrayElement</a></code></dt>
<dd><p>Linker represents a node in a LinkedList.</p>
</dd>
<dt><a href="#LinkedList">LinkedList</a> ⇐ <code><a href="#Arrayable">Arrayable</a></code></dt>
<dd><p>LinkedList represents a collection stored as a LinkedList with next references.</p>
</dd>
<dt><a href="#DoublyLinkedList">DoublyLinkedList</a> ⇐ <code><a href="#LinkedList">LinkedList</a></code></dt>
<dd><p>DoublyLinkedList represents a collection stored as a LinkedList with prev and next references.</p>
</dd>
<dt><a href="#DoubleLinker">DoubleLinker</a> ⇐ <code><a href="#Linker">Linker</a></code></dt>
<dd><p>DoubleLinker represents a node in a DoublyLinkedList which is chained by next and prev.</p>
</dd>
<dt><a href="#Arrayable">Arrayable</a></dt>
<dd><p>Arrayable represents a collection stored as an array.</p>
</dd>
<dt><a href="#ArrayElement">ArrayElement</a></dt>
<dd><p>Element represents a node in an Arrayable.</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#TaskStack">TaskStack</a> ⇒ <code><a href="#TaskStack">TaskStack</a></code></dt>
<dd><p>Convert an array to a TaskStack.</p>
</dd>
<dt><a href="#Stackable">Stackable</a> ⇒ <code><a href="#Stackable">Stackable</a></code></dt>
<dd><p>Make a new Stackable from the data given if it is not already a valid Stackable.</p>
</dd>
<dt><a href="#Stack">Stack</a> ⇒ <code><a href="#Stack">Stack</a></code></dt>
<dd><p>Convert an array to a Stack by pushing each value in turn, so the last value is on the top.</p>
</dd>
<dt><a href="#TaskQueue">TaskQueue</a> ⇒ <code><a href="#TaskQueue">TaskQueue</a></code></dt>
<dd><p>Convert an array to a TaskQueue.</p>
</dd>
<dt><a href="#Queueable">Queueable</a> ⇒ <code><a href="#Queueable">Queueable</a></code></dt>
<dd><p>Make a new Queueable from the data given if it is not already a valid Queueable.</p>
</dd>
<dt><a href="#Queue">Queue</a> ⇒ <code><a href="#Queue">Queue</a></code></dt>
<dd><p>Convert an array to a Queue, the first value is at the front.</p>
</dd>
<dt><a href="#TreeLinker">TreeLinker</a> ⇒ <code><a href="#TreeLinker">TreeLinker</a></code></dt>
<dd><p>Make a new DoubleLinker from the data given if it is not already a valid Linker.</p>
</dd>
<dt><a href="#LinkedTreeList">LinkedTreeList</a> ⇒ <code><a href="#LinkedTreeList">LinkedTreeList</a></code></dt>
<dd><p>Convert an array into a LinkedTreeList instance, return the new instance.</p>
</dd>
<dt><a href="#Linker">Linker</a> ⇒ <code><a href="#Linker">Linker</a></code></dt>
<dd><p>Make a new Linker from the data given if it is not already a valid Linker.</p>
</dd>
<dt><a href="#LinkedList">LinkedList</a> ⇒ <code><a href="#LinkedList">LinkedList</a></code></dt>
<dd><p>Convert an array to a LinkedList.</p>
</dd>
<dt><a href="#DoublyLinkedList">DoublyLinkedList</a> ⇒ <code><a href="#DoublyLinkedList">DoublyLinkedList</a></code></dt>
<dd><p>Convert an array into a DoublyLinkedList instance, return the new instance.</p>
</dd>
<dt><a href="#DoubleLinker">DoubleLinker</a> ⇒ <code><a href="#DoubleLinker">DoubleLinker</a></code></dt>
<dd><p>Make a new DoubleLinker from the data given if it is not already a valid Linker.</p>
</dd>
<dt><a href="#Arrayable">Arrayable</a> ⇒ <code><a href="#Arrayable">Arrayable</a></code></dt>
<dd><p>Convert an array to an Arrayable.</p>
</dd>
<dt><a href="#ArrayElement">ArrayElement</a> ⇒ <code><a href="#ArrayElement">ArrayElement</a></code></dt>
<dd><p>Make a new Element from the data given if it is not already a valid Element.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#services">services</a></dt>
<dd><p>List helpful functions when dealing with collections.</p>
</dd>
<dt><a href="#recipes">recipes</a></dt>
<dd><p>List of class declarations that can be used to specify attributes for a style of object / class.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#parseTreeNext">parseTreeNext(treeNode, [boundaryParent])</a> ⇒ <code>IsTreeNode</code> | <code>null</code></dt>
<dd><p>Be able to parse over every node in a tree.</p>
<ol>
<li>Start at root (get root parent)</li>
<li>Get first child (repeat until no children)</li>
<li>Check next child</li>
<li>Repeat 2</li>
<li>Repeat 3</li>
<li>If no next child, return to parent and repeat 3</li>
<li>Stop at root (next is null and parent is null
A boundary can be given to parse only part of a tree: going back up to the parents stops at the boundary, so the
parsing stays within the nodes whose parent is the boundary (and everything below them).</li>
</ol>
</dd>
<dt><a href="#parseTree">parseTree(tree, callback)</a> ⇒ <code>IsArrayable.&lt;IsTreeNode&gt;</code></dt>
<dd><p>Loop over all the nodes in a tree starting from left and apply a callback for each</p>
</dd>
<dt><a href="#borrowedGetter">borrowedGetter(name, list)</a> ⇒ <code>*</code></dt>
<dd><p>Use one of the accessors of DoublyLinkedList (which keeps track of the head, tail and length) for a LinkedTreeList.</p>
</dd>
</dl>

<a name="module_collect-your-stuff"></a>

## collect-your-stuff
All of the collections available.

**Version**: 1.0.0  
**Author**: Joshua Heagle <joshuaheagle@gmail.com>  
<a name="module_collect-your-stuff..collectYourStuff"></a>

### collect-your-stuff~collectYourStuff
All methods exported from this module are encapsulated within collect-your-stuff (this default export is the same
set of classes as the named exports).

**Kind**: inner constant of [<code>collect-your-stuff</code>](#module_collect-your-stuff)  
<a name="TreeLinkerIterator"></a>

## TreeLinkerIterator
Class TreeLinkerIterator returns the next value taking a left-first approach down a tree.

**Kind**: global class  

* [TreeLinkerIterator](#TreeLinkerIterator)
    * [new TreeLinkerIterator(current, [boundaryParent])](#new_TreeLinkerIterator_new)
    * [.next([value])](#TreeLinkerIterator+next) ⇒ <code>IteratorResult.&lt;IsTreeNode&gt;</code>

<a name="new_TreeLinkerIterator_new"></a>

### new TreeLinkerIterator(current, [boundaryParent])
Create an iterator starting at the given item.


| Param | Type | Description |
| --- | --- | --- |
| current | <code>IsTreeNode</code> | The item to start from. |
| [boundaryParent] | <code>IsTreeNode</code> \| <code>null</code> | The parent of the nodes to stay within (null for the top of a tree), the whole tree when not given. |

<a name="TreeLinkerIterator+next"></a>

### treeLinkerIterator.next([value]) ⇒ <code>IteratorResult.&lt;IsTreeNode&gt;</code>
Get the current item and move on to the following one (left-first, down each branch).

**Kind**: instance method of [<code>TreeLinkerIterator</code>](#TreeLinkerIterator)  
**Returns**: <code>IteratorResult.&lt;IsTreeNode&gt;</code> - The current item, or done when there are no more.  

| Param | Type | Description |
| --- | --- | --- |
| [value] | <code>\*</code> | Not used, present to match the Iterator interface. |

<a name="Runnable"></a>

## Runnable
Identify a class that can be run.

**Kind**: global class  

* [Runnable](#Runnable)
    * [new Runnable([data])](#new_Runnable_new)
    * _instance_
        * [.data](#Runnable+data)
        * [.task](#Runnable+task) ⇒ <code>function</code>
        * [.run()](#Runnable+run) ⇒ <code>\*</code>
    * _static_
        * [.isRunnable(thing)](#Runnable.isRunnable) ⇒ <code>boolean</code>

<a name="new_Runnable_new"></a>

### new Runnable([data])
Instantiate a Runnable class.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [data] | <code>\*</code> | <code></code> | The task (a function) or the data which the task returns. |

<a name="Runnable+data"></a>

### runnable.data
The task (or data) this runnable holds.

**Kind**: instance property of [<code>Runnable</code>](#Runnable)  
<a name="Runnable+task"></a>

### runnable.task ⇒ <code>function</code>
Retrieve the data which should be formed as a task.

**Kind**: instance property of [<code>Runnable</code>](#Runnable)  
<a name="Runnable+run"></a>

### runnable.run() ⇒ <code>\*</code>
Run the runnable task.

**Kind**: instance method of [<code>Runnable</code>](#Runnable)  
<a name="Runnable.isRunnable"></a>

### Runnable.isRunnable(thing) ⇒ <code>boolean</code>
Check if a given thing is Runnable

**Kind**: static method of [<code>Runnable</code>](#Runnable)  

| Param | Type | Description |
| --- | --- | --- |
| thing | <code>\*</code> | The value to check, or nothing to check whether this class is Runnable. |

<a name="LinkerIterator"></a>

## LinkerIterator
Class LinkerIterator returns the next value when using linkers of linked type lists.

**Kind**: global class  

* [LinkerIterator](#LinkerIterator)
    * [new LinkerIterator(current)](#new_LinkerIterator_new)
    * [.next([value])](#LinkerIterator+next) ⇒ <code>IteratorResult.&lt;IsLinker&gt;</code>

<a name="new_LinkerIterator_new"></a>

### new LinkerIterator(current)
Create an iterator starting at the given item.


| Param | Type | Description |
| --- | --- | --- |
| current | <code>IsLinker</code> | The item to start from. |

<a name="LinkerIterator+next"></a>

### linkerIterator.next([value]) ⇒ <code>IteratorResult.&lt;IsLinker&gt;</code>
Get the current item and move on to the following one.

**Kind**: instance method of [<code>LinkerIterator</code>](#LinkerIterator)  
**Returns**: <code>IteratorResult.&lt;IsLinker&gt;</code> - The current item, or done when there are no more.  

| Param | Type | Description |
| --- | --- | --- |
| [value] | <code>\*</code> | Not used, present to match the Iterator interface. |

<a name="DoubleLinkerIterator"></a>

## DoubleLinkerIterator
Class DoubleLinkerIterator returns the next value when using linkers of linked type lists.

**Kind**: global class  

* [DoubleLinkerIterator](#DoubleLinkerIterator)
    * [new DoubleLinkerIterator(current)](#new_DoubleLinkerIterator_new)
    * [.next([value])](#DoubleLinkerIterator+next) ⇒ <code>IteratorResult.&lt;IsDoubleLinker&gt;</code>

<a name="new_DoubleLinkerIterator_new"></a>

### new DoubleLinkerIterator(current)
Create an iterator starting at the given item.


| Param | Type | Description |
| --- | --- | --- |
| current | <code>IsDoubleLinker</code> | The item to start from. |

<a name="DoubleLinkerIterator+next"></a>

### doubleLinkerIterator.next([value]) ⇒ <code>IteratorResult.&lt;IsDoubleLinker&gt;</code>
Get the current item and move on to the following one.

**Kind**: instance method of [<code>DoubleLinkerIterator</code>](#DoubleLinkerIterator)  
**Returns**: <code>IteratorResult.&lt;IsDoubleLinker&gt;</code> - The current item, or done when there are no more.  

| Param | Type | Description |
| --- | --- | --- |
| [value] | <code>\*</code> | Not used, present to match the Iterator interface. |

<a name="ArrayIterator"></a>

## ArrayIterator
Class ArrayIterator returns the next value when using elements of array type list.

**Kind**: global class  

* [ArrayIterator](#ArrayIterator)
    * [new ArrayIterator(innerList, [index])](#new_ArrayIterator_new)
    * [.next([value])](#ArrayIterator+next) ⇒ <code>IteratorResult.&lt;IsElement&gt;</code>

<a name="new_ArrayIterator_new"></a>

### new ArrayIterator(innerList, [index])
Create an iterator over the given array.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| innerList | <code>Array.&lt;IsElement&gt;</code> |  | The elements to iterate over. |
| [index] | <code>number</code> | <code>0</code> | The position to start from. |

<a name="ArrayIterator+next"></a>

### arrayIterator.next([value]) ⇒ <code>IteratorResult.&lt;IsElement&gt;</code>
Get the next element, moving the iterator forward.

**Kind**: instance method of [<code>ArrayIterator</code>](#ArrayIterator)  
**Returns**: <code>IteratorResult.&lt;IsElement&gt;</code> - The next element, or done when there are no more.  

| Param | Type | Description |
| --- | --- | --- |
| [value] | <code>\*</code> | Not used, present to match the Iterator interface. |

<a name="TaskStack"></a>

## TaskStack
Store a collection of tasks (Stackables) which can only be inserted and removed from the top: pop() takes the task from
the top and RUNS it. For a plain last-in-first-out collection of items use Stack.

**Kind**: global class  

* [TaskStack](#TaskStack)
    * [new TaskStack([stackedList], [listClass], [stackableClass])](#new_TaskStack_new)
    * [.empty()](#TaskStack+empty) ⇒ <code>boolean</code>
    * [.top()](#TaskStack+top) ⇒ [<code>Stackable</code>](#Stackable)
    * [.pop()](#TaskStack+pop) ⇒ [<code>Stackable</code>](#Stackable) \| <code>null</code>
    * [.push(stackable)](#TaskStack+push)
    * [.remove()](#TaskStack+remove) ⇒ [<code>Stackable</code>](#Stackable) \| <code>null</code>
    * [.size()](#TaskStack+size) ⇒ <code>number</code>

<a name="new_TaskStack_new"></a>

### new TaskStack([stackedList], [listClass], [stackableClass])
Instantiate the state with the starter stacked list.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [stackedList] | <code>Iterable</code> \| [<code>LinkedList</code>](#LinkedList) | <code></code> | The list of stackables to start in this stack. |
| [listClass] | <code>IsArrayable</code> | <code>LinkedList</code> | The type of list to create when no stacked list is given. |
| [stackableClass] | [<code>Stackable</code>](#Stackable) | <code>Stackable</code> | The class used to wrap stacked items. |

<a name="TaskStack+empty"></a>

### taskStack.empty() ⇒ <code>boolean</code>
Return true if the stack is empty (there are no tasks in the stacked list)

**Kind**: instance method of [<code>TaskStack</code>](#TaskStack)  
<a name="TaskStack+top"></a>

### taskStack.top() ⇒ [<code>Stackable</code>](#Stackable)
Take a look at the next stacked task

**Kind**: instance method of [<code>TaskStack</code>](#TaskStack)  
<a name="TaskStack+pop"></a>

### taskStack.pop() ⇒ [<code>Stackable</code>](#Stackable) \| <code>null</code>
Remove the next stacked task and return it.

**Kind**: instance method of [<code>TaskStack</code>](#TaskStack)  
<a name="TaskStack+push"></a>

### taskStack.push(stackable)
Push a stackable task to the top of the stack.

**Kind**: instance method of [<code>TaskStack</code>](#TaskStack)  

| Param | Type | Description |
| --- | --- | --- |
| stackable | [<code>Stackable</code>](#Stackable) \| <code>\*</code> | Add a new stackable to the top of the stack |

<a name="TaskStack+remove"></a>

### taskStack.remove() ⇒ [<code>Stackable</code>](#Stackable) \| <code>null</code>
Remove the next stacked task and return it.

**Kind**: instance method of [<code>TaskStack</code>](#TaskStack)  
<a name="TaskStack+size"></a>

### taskStack.size() ⇒ <code>number</code>
Get the size of the current stack.

**Kind**: instance method of [<code>TaskStack</code>](#TaskStack)  
<a name="Stackable"></a>

## Stackable ⇐ [<code>Linker</code>](#Linker)
Stackable represents a runnable entry in stack.

**Kind**: global class  
**Extends**: [<code>Linker</code>](#Linker)  

* [Stackable](#Stackable) ⇐ [<code>Linker</code>](#Linker)
    * [new Stackable([stackData])](#new_Stackable_new)
    * _instance_
        * [.data](#Stackable+data)
        * [.next](#Stackable+next)
        * [.task](#Stackable+task) ⇒ <code>\*</code>
        * [.classType](#Linker+classType)
        * [.run()](#Stackable+run) ⇒ <code>\*</code>
    * _static_
        * [.fromArray([values], [classType])](#Stackable.fromArray) ⇒ <code>Object</code>

<a name="new_Stackable_new"></a>

### new Stackable([stackData])
Create a stackable item that can be used in a stack.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [stackData] | <code>Object</code> | <code>{}</code> | The settings for the new stackable. |
| [stackData.task] | <code>\*</code> | <code></code> | The data to be stored in this stackable |
| [stackData.next] | [<code>Stackable</code>](#Stackable) \| <code>null</code> | <code></code> | The reference to the next stackable if any |
| [stackData.ready] | <code>boolean</code> \| <code>function</code> | <code>false</code> | Indicate if the stackable is ready to run |

<a name="Stackable+data"></a>

### stackable.data
The task (or data) this stackable holds.

**Kind**: instance property of [<code>Stackable</code>](#Stackable)  
**Overrides**: [<code>data</code>](#Linker+data)  
<a name="Stackable+next"></a>

### stackable.next
The stackable below this one, or null when this is the bottom.

**Kind**: instance property of [<code>Stackable</code>](#Stackable)  
**Overrides**: [<code>next</code>](#Linker+next)  
<a name="Stackable+task"></a>

### stackable.task ⇒ <code>\*</code>
Retrieve the data which should be formed as a task.

**Kind**: instance property of [<code>Stackable</code>](#Stackable)  
<a name="Linker+classType"></a>

### stackable.classType
The class used to create this instance, so that it can be recognized as valid without an instanceof check.

**Kind**: instance property of [<code>Stackable</code>](#Stackable)  
**Overrides**: [<code>classType</code>](#Linker+classType)  
<a name="Stackable+run"></a>

### stackable.run() ⇒ <code>\*</code>
Run the stacked task.

**Kind**: instance method of [<code>Stackable</code>](#Stackable)  
<a name="Stackable.fromArray"></a>

### Stackable.fromArray([values], [classType]) ⇒ <code>Object</code>
Convert an array into Stackable instances, return the head and tail Stackables.

**Kind**: static method of [<code>Stackable</code>](#Stackable)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [values] | <code>Array</code> | <code>[]</code> | Provide an array of data that will be converted to a chain of stackable linkers. |
| [classType] | <code>IsLinker</code> | <code>Stackable</code> | Provide the type of IsLinker to use. |

<a name="Stack"></a>

## Stack
A last-in-first-out collection: items are added to the top with push and taken from the top with pop. Any value can
be stacked (it is stored as it is, whether it is a function, an object or null), and adding and taking are constant
time. To stack tasks which are run as they are taken use TaskStack.

**Kind**: global class  

* [Stack](#Stack)
    * [new Stack([stackedList], [listClass], [linkerClass])](#new_Stack_new)
    * [.empty()](#Stack+empty) ⇒ <code>boolean</code>
    * [.peek()](#Stack+peek) ⇒ <code>\*</code> \| <code>null</code>
    * [.pop()](#Stack+pop) ⇒ <code>\*</code> \| <code>null</code>
    * [.push(data)](#Stack+push) ⇒ [<code>Stack</code>](#Stack)
    * [.size()](#Stack+size) ⇒ <code>number</code>
    * [.top()](#Stack+top) ⇒ <code>\*</code> \| <code>null</code>

<a name="new_Stack_new"></a>

### new Stack([stackedList], [listClass], [linkerClass])
Instantiate the stack, optionally with a list of items to start from.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [stackedList] | <code>IsArrayable</code> \| <code>null</code> | <code></code> | The list of linkers to start in this stack (the first is the top) |
| [listClass] | <code>IsArrayable</code> | <code>LinkedList</code> | The type of list to create when no stacked list is given |
| [linkerClass] | [<code>Linker</code>](#Linker) | <code>Linker</code> | The class used to hold each stacked item |

<a name="Stack+empty"></a>

### stack.empty() ⇒ <code>boolean</code>
Check whether the stack has no items.

**Kind**: instance method of [<code>Stack</code>](#Stack)  
<a name="Stack+peek"></a>

### stack.peek() ⇒ <code>\*</code> \| <code>null</code>
Look at the item on the top of the stack, without removing it.

**Kind**: instance method of [<code>Stack</code>](#Stack)  
**Returns**: <code>\*</code> \| <code>null</code> - The item, or null when the stack is empty  
<a name="Stack+pop"></a>

### stack.pop() ⇒ <code>\*</code> \| <code>null</code>
Take the item from the top of the stack.

**Kind**: instance method of [<code>Stack</code>](#Stack)  
**Returns**: <code>\*</code> \| <code>null</code> - The item, or null when the stack is empty  
<a name="Stack+push"></a>

### stack.push(data) ⇒ [<code>Stack</code>](#Stack)
Add an item to the top of the stack.

**Kind**: instance method of [<code>Stack</code>](#Stack)  
**Returns**: [<code>Stack</code>](#Stack) - This stack, so that adding can be chained  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | The item to add |

<a name="Stack+size"></a>

### stack.size() ⇒ <code>number</code>
Count the items in the stack.

**Kind**: instance method of [<code>Stack</code>](#Stack)  
<a name="Stack+top"></a>

### stack.top() ⇒ <code>\*</code> \| <code>null</code>
The item on the top of the stack (the same as peek).

**Kind**: instance method of [<code>Stack</code>](#Stack)  
**Returns**: <code>\*</code> \| <code>null</code> - The item, or null when the stack is empty  
<a name="TaskQueue"></a>

## TaskQueue
Maintain a series of queued tasks (Queueables): dequeue() takes the next task from the front and RUNS it, giving each
task in turn a chance to run (a task which is not ready, or which has not finished, is placed at the back again).
This is a task scheduler, for a plain first-in-first-out collection of items use Queue.

**Kind**: global class  

* [TaskQueue](#TaskQueue)
    * [new TaskQueue(queuedList, [listClass], [queueableClass])](#new_TaskQueue_new)
    * [.dequeue()](#TaskQueue+dequeue) ⇒ <code>completeResponse</code> \| <code>\*</code>
    * [.empty()](#TaskQueue+empty) ⇒ <code>boolean</code>
    * [.enqueue(queueable)](#TaskQueue+enqueue)
    * [.peek()](#TaskQueue+peek) ⇒ [<code>Queueable</code>](#Queueable)
    * [.remove()](#TaskQueue+remove) ⇒ [<code>Queueable</code>](#Queueable) \| <code>null</code>
    * [.size()](#TaskQueue+size) ⇒ <code>number</code>

<a name="new_TaskQueue_new"></a>

### new TaskQueue(queuedList, [listClass], [queueableClass])
Instantiate the queue with the given queue list.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| queuedList | <code>Iterable</code> \| [<code>LinkedList</code>](#LinkedList) | <code></code> | Give the list of queueables to start in this queue. |
| [listClass] | <code>IsArrayable</code> | <code>LinkedList</code> | The type of list to create when no queued list is given. |
| [queueableClass] | [<code>Queueable</code>](#Queueable) | <code>Queueable</code> | The class used to wrap queued items. |

<a name="TaskQueue+dequeue"></a>

### taskQueue.dequeue() ⇒ <code>completeResponse</code> \| <code>\*</code>
Take a queued task from the front of the queue and run it if ready. A task which is not ready yet is kept in the
queue (never dropped), a task which is still running is reported as blocking and left to finish on its own, and
completed tasks are discarded.

**Kind**: instance method of [<code>TaskQueue</code>](#TaskQueue)  
<a name="TaskQueue+empty"></a>

### taskQueue.empty() ⇒ <code>boolean</code>
Return true if the queue is empty (there are no tasks in the queue list)

**Kind**: instance method of [<code>TaskQueue</code>](#TaskQueue)  
<a name="TaskQueue+enqueue"></a>

### taskQueue.enqueue(queueable)
Add a queued task to the end of the queue

**Kind**: instance method of [<code>TaskQueue</code>](#TaskQueue)  

| Param | Type | Description |
| --- | --- | --- |
| queueable | [<code>Queueable</code>](#Queueable) | Add a new queueable to the end of the queue |

<a name="TaskQueue+peek"></a>

### taskQueue.peek() ⇒ [<code>Queueable</code>](#Queueable)
Take a look at the next queued task

**Kind**: instance method of [<code>TaskQueue</code>](#TaskQueue)  
<a name="TaskQueue+remove"></a>

### taskQueue.remove() ⇒ [<code>Queueable</code>](#Queueable) \| <code>null</code>
Remove the next queued item and return it.

**Kind**: instance method of [<code>TaskQueue</code>](#TaskQueue)  
<a name="TaskQueue+size"></a>

### taskQueue.size() ⇒ <code>number</code>
Get the length of the current queue.

**Kind**: instance method of [<code>TaskQueue</code>](#TaskQueue)  
<a name="Queueable"></a>

## Queueable ⇐ [<code>Linker</code>](#Linker)
Queueable represents a runnable entry in a queue.

**Kind**: global class  
**Extends**: [<code>Linker</code>](#Linker)  

* [Queueable](#Queueable) ⇐ [<code>Linker</code>](#Linker)
    * [new Queueable([queueableData])](#new_Queueable_new)
    * _instance_
        * [.data](#Queueable+data)
        * [.next](#Queueable+next)
        * [.complete](#Queueable+complete)
        * [.ready](#Queueable+ready)
        * [.running](#Queueable+running)
        * [.isReady](#Queueable+isReady) ⇒ <code>boolean</code>
        * [.task](#Queueable+task) ⇒ <code>\*</code>
        * [.classType](#Linker+classType)
        * [.markCompleted([completeResponse])](#Queueable+markCompleted) ⇒ <code>completeResponse</code>
        * [.run()](#Queueable+run) ⇒ <code>completeResponse</code>
    * _static_
        * [.fromArray(values, [classType])](#Queueable.fromArray) ⇒ <code>Object</code>

<a name="new_Queueable_new"></a>

### new Queueable([queueableData])
Create a queueable item that can be used in a queue.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [queueableData] | <code>Object</code> | <code>{}</code> | The settings for the new queueable. |
| [queueableData.task] | <code>\*</code> | <code></code> | The data to be stored in this queueable |
| [queueableData.next] | [<code>Queueable</code>](#Queueable) \| <code>null</code> | <code></code> | The reference to the next queueable if any |
| [queueableData.ready] | <code>boolean</code> \| <code>function</code> | <code>false</code> | Indicate if the queueable is ready to run |

<a name="Queueable+data"></a>

### queueable.data
The task (or data) this queueable holds.

**Kind**: instance property of [<code>Queueable</code>](#Queueable)  
**Overrides**: [<code>data</code>](#Linker+data)  
<a name="Queueable+next"></a>

### queueable.next
The queueable after this one, or null when this is the last.

**Kind**: instance property of [<code>Queueable</code>](#Queueable)  
**Overrides**: [<code>next</code>](#Linker+next)  
<a name="Queueable+complete"></a>

### queueable.complete
Whether this queueable has been run to completion.

**Kind**: instance property of [<code>Queueable</code>](#Queueable)  
<a name="Queueable+ready"></a>

### queueable.ready
Whether this queueable may run, or a function which answers that when asked.

**Kind**: instance property of [<code>Queueable</code>](#Queueable)  
<a name="Queueable+running"></a>

### queueable.running
Whether this queueable is running right now.

**Kind**: instance property of [<code>Queueable</code>](#Queueable)  
<a name="Queueable+isReady"></a>

### queueable.isReady ⇒ <code>boolean</code>
Check ready state.

**Kind**: instance property of [<code>Queueable</code>](#Queueable)  
<a name="Queueable+task"></a>

### queueable.task ⇒ <code>\*</code>
Retrieve the data which should be formed as a task.

**Kind**: instance property of [<code>Queueable</code>](#Queueable)  
<a name="Linker+classType"></a>

### queueable.classType
The class used to create this instance, so that it can be recognized as valid without an instanceof check.

**Kind**: instance property of [<code>Queueable</code>](#Queueable)  
**Overrides**: [<code>classType</code>](#Linker+classType)  
<a name="Queueable+markCompleted"></a>

### queueable.markCompleted([completeResponse]) ⇒ <code>completeResponse</code>
Set this queueable as completed.

**Kind**: instance method of [<code>Queueable</code>](#Queueable)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [completeResponse] | <code>Object</code> | <code>{}</code> | The result to report for the task. |
| [completeResponse.success] | <code>\*</code> | <code>true</code> | Indicate when the task failed (use false) or give a success message |
| [completeResponse.error] | <code>\*</code> | <code>false</code> | Indicate a task was error-free (use false) or give an error message |
| [completeResponse.context] | <code>\*</code> | <code></code> | Provide additional data in the response |

<a name="Queueable+run"></a>

### queueable.run() ⇒ <code>completeResponse</code>
Intend to run the queued task when it is ready. If ready, mark this task as running and run the task.

**Kind**: instance method of [<code>Queueable</code>](#Queueable)  
<a name="Queueable.fromArray"></a>

### Queueable.fromArray(values, [classType]) ⇒ <code>Object</code>
Convert an array into Queueable instances, return the head and tail Queueables.

**Kind**: static method of [<code>Queueable</code>](#Queueable)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| values | <code>Array</code> |  | Provide an array of data that will be converted to a chain of queueable linkers. |
| [classType] | <code>IsLinker</code> | <code>Queueable</code> | Provide the type of IsLinker to use. |

<a name="Queue"></a>

## Queue
A first-in-first-out collection: items are added to the back with enqueue and taken from the front with dequeue.
Any value can be queued (it is stored as it is, whether it is a function, an object or null), and adding and taking
are constant time. To queue tasks which are run as they are taken use TaskQueue.

**Kind**: global class  

* [Queue](#Queue)
    * [new Queue([queuedList], [listClass], [linkerClass])](#new_Queue_new)
    * [.dequeue()](#Queue+dequeue) ⇒ <code>\*</code> \| <code>null</code>
    * [.empty()](#Queue+empty) ⇒ <code>boolean</code>
    * [.enqueue(data)](#Queue+enqueue) ⇒ [<code>Queue</code>](#Queue)
    * [.peek()](#Queue+peek) ⇒ <code>\*</code> \| <code>null</code>
    * [.size()](#Queue+size) ⇒ <code>number</code>

<a name="new_Queue_new"></a>

### new Queue([queuedList], [listClass], [linkerClass])
Instantiate the queue, optionally with a list of items to start from.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [queuedList] | <code>IsArrayable</code> \| <code>null</code> | <code></code> | The list of linkers to start in this queue (the first is the front) |
| [listClass] | <code>IsArrayable</code> | <code>LinkedList</code> | The type of list to create when no queued list is given |
| [linkerClass] | [<code>Linker</code>](#Linker) | <code>Linker</code> | The class used to hold each queued item |

<a name="Queue+dequeue"></a>

### queue.dequeue() ⇒ <code>\*</code> \| <code>null</code>
Take the item from the front of the queue.

**Kind**: instance method of [<code>Queue</code>](#Queue)  
**Returns**: <code>\*</code> \| <code>null</code> - The item, or null when the queue is empty  
<a name="Queue+empty"></a>

### queue.empty() ⇒ <code>boolean</code>
Check whether the queue has no items.

**Kind**: instance method of [<code>Queue</code>](#Queue)  
<a name="Queue+enqueue"></a>

### queue.enqueue(data) ⇒ [<code>Queue</code>](#Queue)
Add an item to the back of the queue.

**Kind**: instance method of [<code>Queue</code>](#Queue)  
**Returns**: [<code>Queue</code>](#Queue) - This queue, so that adding can be chained  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | The item to add |

<a name="Queue+peek"></a>

### queue.peek() ⇒ <code>\*</code> \| <code>null</code>
Look at the item at the front of the queue, without removing it.

**Kind**: instance method of [<code>Queue</code>](#Queue)  
**Returns**: <code>\*</code> \| <code>null</code> - The item, or null when the queue is empty  
<a name="Queue+size"></a>

### queue.size() ⇒ <code>number</code>
Count the items in the queue.

**Kind**: instance method of [<code>Queue</code>](#Queue)  
<a name="TreeLinker"></a>

## TreeLinker ⇐ [<code>DoubleLinker</code>](#DoubleLinker)
TreeLinker represents a node in a LinkedTreeList having a parent (or root) and child nodes.

**Kind**: global class  
**Extends**: [<code>DoubleLinker</code>](#DoubleLinker)  

* [TreeLinker](#TreeLinker) ⇐ [<code>DoubleLinker</code>](#DoubleLinker)
    * [new TreeLinker([settings], listClass)](#new_TreeLinker_new)
    * _instance_
        * [.classType](#TreeLinker+classType)
        * [.data](#TreeLinker+data)
        * [.next](#TreeLinker+next)
        * [.prev](#TreeLinker+prev)
        * [.parent](#TreeLinker+parent)
        * [.children](#TreeLinker+children)
        * [.childrenFromArray(children, listClass)](#TreeLinker+childrenFromArray) ⇒ [<code>LinkedTreeList</code>](#LinkedTreeList) \| <code>null</code>
    * _static_
        * [.fromArray([values], [classType])](#TreeLinker.fromArray) ⇒ <code>Object</code>

<a name="new_TreeLinker_new"></a>

### new TreeLinker([settings], listClass)
Create the new TreeLinker instance, provide the data and optionally set references for next, prev, parent, or children.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [settings] | <code>Object</code> | <code>{}</code> | The settings for the new tree node. |
| [settings.data] | <code>\*</code> | <code></code> | The data to be stored in this tree node |
| [settings.next] | [<code>TreeLinker</code>](#TreeLinker) | <code></code> | The reference to the next linker if any |
| [settings.prev] | [<code>TreeLinker</code>](#TreeLinker) | <code></code> | The reference to the previous linker if any |
| [settings.children] | [<code>LinkedTreeList</code>](#LinkedTreeList) | <code></code> | The references to child linkers if any |
| [settings.parent] | [<code>TreeLinker</code>](#TreeLinker) | <code></code> | The reference to a parent linker if any |
| listClass | <code>IsArrayable.&lt;IsTreeNode&gt;</code> |  | Give the type of list to use for storing the children |

<a name="TreeLinker+classType"></a>

### treeLinker.classType
The class used to create this instance, so that it can be recognized as valid without an instanceof check.

**Kind**: instance property of [<code>TreeLinker</code>](#TreeLinker)  
**Overrides**: [<code>classType</code>](#DoubleLinker+classType)  
<a name="TreeLinker+data"></a>

### treeLinker.data
The data stored in this tree node.

**Kind**: instance property of [<code>TreeLinker</code>](#TreeLinker)  
**Overrides**: [<code>data</code>](#DoubleLinker+data)  
<a name="TreeLinker+next"></a>

### treeLinker.next
The sibling after this node, or null when this is the last child.

**Kind**: instance property of [<code>TreeLinker</code>](#TreeLinker)  
**Overrides**: [<code>next</code>](#DoubleLinker+next)  
<a name="TreeLinker+prev"></a>

### treeLinker.prev
The sibling before this node, or null when this is the first child.

**Kind**: instance property of [<code>TreeLinker</code>](#TreeLinker)  
**Overrides**: [<code>prev</code>](#DoubleLinker+prev)  
<a name="TreeLinker+parent"></a>

### treeLinker.parent
The node this node is a child of, or null for a root node.

**Kind**: instance property of [<code>TreeLinker</code>](#TreeLinker)  
<a name="TreeLinker+children"></a>

### treeLinker.children
The list of the children of this node, or null when it has none.

**Kind**: instance property of [<code>TreeLinker</code>](#TreeLinker)  
<a name="TreeLinker+childrenFromArray"></a>

### treeLinker.childrenFromArray(children, listClass) ⇒ [<code>LinkedTreeList</code>](#LinkedTreeList) \| <code>null</code>
Create the children for this tree from an array. Each child becomes a tree linker with this node as its parent: an
existing linker is kept as it is, an object with a data property gives the settings of the linker, and anything
else is the data of the linker.

**Kind**: instance method of [<code>TreeLinker</code>](#TreeLinker)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| children | <code>Array</code> \| <code>null</code> | <code></code> | Provide an array of data / linker references to be children of this tree node. |
| listClass | <code>IsArrayable.&lt;IsTreeNode&gt;</code> |  | Give the type of list to use for storing the children |

<a name="TreeLinker.fromArray"></a>

### TreeLinker.fromArray([values], [classType]) ⇒ <code>Object</code>
Convert an array into DoubleLinker instances, return the head and tail DoubleLinkers.

**Kind**: static method of [<code>TreeLinker</code>](#TreeLinker)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [values] | <code>Array</code> | <code>[]</code> | Provide an array of data that will be converted to a chain of tree-linkers. |
| [classType] | <code>IsTreeNode</code> | <code>TreeLinker</code> | Provide the type of IsTreeNode to use. |

<a name="LinkedTreeList"></a>

## LinkedTreeList ⇐ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
LinkedTreeList represents a collection stored with a root and spreading in branching (tree) formation.

**Kind**: global class  
**Extends**: [<code>DoublyLinkedList</code>](#DoublyLinkedList)  

* [LinkedTreeList](#LinkedTreeList) ⇐ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
    * [new LinkedTreeList([linkerClass])](#new_LinkedTreeList_new)
    * [.classType](#LinkedTreeList+classType)
    * [.innerList](#LinkedTreeList+innerList)
    * [.initialized](#LinkedTreeList+initialized)
    * [.tailCache](#LinkedTreeList+tailCache)
    * [.countCache](#LinkedTreeList+countCache)
    * [.ownerNode](#LinkedTreeList+ownerNode)
    * [.list](#LinkedTreeList+list) ⇒ [<code>TreeLinker</code>](#TreeLinker)
    * [.first](#LinkedTreeList+first) ⇒ [<code>TreeLinker</code>](#TreeLinker)
    * [.last](#LinkedTreeList+last) ⇒ [<code>TreeLinker</code>](#TreeLinker)
    * [.length](#LinkedTreeList+length) ⇒ <code>number</code>
    * [.parent](#LinkedTreeList+parent) ⇒ [<code>TreeLinker</code>](#TreeLinker) \| <code>null</code>
    * [.parent](#LinkedTreeList+parent)
    * [.rootParent](#LinkedTreeList+rootParent) ⇒ [<code>TreeLinker</code>](#TreeLinker)
    * [.initialize(initialList)](#LinkedTreeList+initialize) ⇒ [<code>LinkedTreeList</code>](#LinkedTreeList)
    * [.setChildren(item, [children])](#LinkedTreeList+setChildren)
    * [.adopt(newNode)](#LinkedTreeList+adopt) ⇒ [<code>TreeLinker</code>](#TreeLinker)
    * [.insertAfter(node, newNode)](#LinkedTreeList+insertAfter) ⇒ [<code>LinkedTreeList</code>](#LinkedTreeList)
    * [.insertBefore(node, newNode)](#LinkedTreeList+insertBefore) ⇒ [<code>LinkedTreeList</code>](#LinkedTreeList)
    * [.append(node, after)](#LinkedTreeList+append) ⇒ [<code>TreeLinker</code>](#TreeLinker)
    * [.prepend(node, before)](#LinkedTreeList+prepend) ⇒ [<code>TreeLinker</code>](#TreeLinker)
    * [.remove(node)](#LinkedTreeList+remove) ⇒ [<code>TreeLinker</code>](#TreeLinker) \| <code>null</code>
    * [.reset()](#LinkedTreeList+reset) ⇒ [<code>TreeLinker</code>](#TreeLinker)
    * [.item(index)](#LinkedTreeList+item) ⇒ [<code>TreeLinker</code>](#TreeLinker) \| <code>null</code>
    * [.forEach(callback, thisArg)](#LinkedTreeList+forEach) ⇒ [<code>LinkedTreeList</code>](#LinkedTreeList)
    * [.indexOfElement(node)](#Arrayable+indexOfElement) ⇒ <code>number</code>

<a name="new_LinkedTreeList_new"></a>

### new LinkedTreeList([linkerClass])
Create the new LinkedTreeList instance, configure the list class.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [linkerClass] | [<code>TreeLinker</code>](#TreeLinker) | <code>TreeLinker</code> | The class used to wrap given data as tree linkers. |

<a name="LinkedTreeList+classType"></a>

### linkedTreeList.classType
The class used to create this instance, so that it can be recognized as valid without an instanceof check.

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>classType</code>](#DoublyLinkedList+classType)  
<a name="LinkedTreeList+innerList"></a>

### linkedTreeList.innerList
A linker of the list (null when the list is empty); the head is found by walking back from it.

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>innerList</code>](#DoublyLinkedList+innerList)  
<a name="LinkedTreeList+initialized"></a>

### linkedTreeList.initialized
Whether the inner list has been initialized (it can only be initialized once).

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>initialized</code>](#DoublyLinkedList+initialized)  
<a name="LinkedTreeList+tailCache"></a>

### linkedTreeList.tailCache
The last linker, remembered so that adding to the end does not need to walk the whole list (null when not known yet).

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>tailCache</code>](#DoublyLinkedList+tailCache)  
<a name="LinkedTreeList+countCache"></a>

### linkedTreeList.countCache
The number of linkers, kept up to date by the list's own methods so that the length does not need to walk the whole list (null when not known yet).

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>countCache</code>](#DoublyLinkedList+countCache)  
<a name="LinkedTreeList+ownerNode"></a>

### linkedTreeList.ownerNode
The node these linkers are the children of, remembered so that it is known even while the list is empty (undefined until it is known).

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
<a name="LinkedTreeList+list"></a>

### linkedTreeList.list ⇒ [<code>TreeLinker</code>](#TreeLinker)
Retrieve the innerList used (the list itself, not a copy).

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>list</code>](#DoublyLinkedList+list)  
<a name="LinkedTreeList+first"></a>

### linkedTreeList.first ⇒ [<code>TreeLinker</code>](#TreeLinker)
Retrieve the first TreeLinker in the list.

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>first</code>](#DoublyLinkedList+first)  
<a name="LinkedTreeList+last"></a>

### linkedTreeList.last ⇒ [<code>TreeLinker</code>](#TreeLinker)
Retrieve the last TreeLinker in the list. The end is remembered, so this does not walk the list.

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>last</code>](#DoublyLinkedList+last)  
<a name="LinkedTreeList+length"></a>

### linkedTreeList.length ⇒ <code>number</code>
Return the length of the list. It is kept up to date by the list's own methods, so this does not walk the list
(call reset() after linkers were changed directly).

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>length</code>](#DoublyLinkedList+length)  
<a name="LinkedTreeList+parent"></a>

### linkedTreeList.parent ⇒ [<code>TreeLinker</code>](#TreeLinker) \| <code>null</code>
Get the parent of this tree list: the node these linkers are the children of (remembered even while the list is
empty), or null for the linkers at the top of a tree.

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
<a name="LinkedTreeList+parent"></a>

### linkedTreeList.parent
Set the parent of this tree list: every linker in it gets the node as its parent, and the node gets this list as its
children. Linkers added to the list later get this parent too.

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  

| Param | Type | Description |
| --- | --- | --- |
| parent | [<code>TreeLinker</code>](#TreeLinker) \| <code>null</code> | The new node to use as the parent for this group of children |

<a name="LinkedTreeList+rootParent"></a>

### linkedTreeList.rootParent ⇒ [<code>TreeLinker</code>](#TreeLinker)
Return the root parent of the entire tree.

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
<a name="LinkedTreeList+initialize"></a>

### linkedTreeList.initialize(initialList) ⇒ [<code>LinkedTreeList</code>](#LinkedTreeList)
Initialize the inner list, should only run once.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>initialize</code>](#DoublyLinkedList+initialize)  

| Param | Type | Description |
| --- | --- | --- |
| initialList | [<code>TreeLinker</code>](#TreeLinker) | Give the list of tree-linkers to start in this linked-tree-list. |

<a name="LinkedTreeList+setChildren"></a>

### linkedTreeList.setChildren(item, [children])
Set the children on a parent item.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Throws**:

- <code>Error</code> When the item is not one of the linkers of this list


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| item | [<code>TreeLinker</code>](#TreeLinker) |  | The TreeLinker node (one of the linkers of this list) that will be the parent of the children |
| [children] | [<code>LinkedTreeList</code>](#LinkedTreeList) \| <code>null</code> | <code></code> | The LinkedTreeList which has the child nodes to use, or null to remove the children of the item |

<a name="LinkedTreeList+adopt"></a>

### linkedTreeList.adopt(newNode) ⇒ [<code>TreeLinker</code>](#TreeLinker)
Make a linker of the given node (or data) and make this list's parent its parent.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  

| Param | Type | Description |
| --- | --- | --- |
| newNode | [<code>TreeLinker</code>](#TreeLinker) \| <code>\*</code> | The node (or data) which is being added to this list |

<a name="LinkedTreeList+insertAfter"></a>

### linkedTreeList.insertAfter(node, newNode) ⇒ [<code>LinkedTreeList</code>](#LinkedTreeList)
Insert a new node (or data) after a node. The new node gets the parent of this list.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>insertAfter</code>](#DoublyLinkedList+insertAfter)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>TreeLinker</code>](#TreeLinker) \| <code>\*</code> | The existing node as reference, or null to insert at the start of the list |
| newNode | [<code>TreeLinker</code>](#TreeLinker) \| <code>\*</code> | The new node to go after the existing node |

<a name="LinkedTreeList+insertBefore"></a>

### linkedTreeList.insertBefore(node, newNode) ⇒ [<code>LinkedTreeList</code>](#LinkedTreeList)
Insert a new node (or data) before a node. The new node gets the parent of this list.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>insertBefore</code>](#DoublyLinkedList+insertBefore)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>TreeLinker</code>](#TreeLinker) \| <code>\*</code> | The existing node as reference, or null to insert at the end of the list |
| newNode | [<code>TreeLinker</code>](#TreeLinker) \| <code>\*</code> | The new node to go before the existing node |

<a name="LinkedTreeList+append"></a>

### linkedTreeList.append(node, after) ⇒ [<code>TreeLinker</code>](#TreeLinker)
Add a node (or data) after the given (or last) node in the list.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>append</code>](#DoublyLinkedList+append)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>TreeLinker</code>](#TreeLinker) \| <code>\*</code> | The new node to add to the end of the list |
| after | [<code>TreeLinker</code>](#TreeLinker) | The existing last node |

<a name="LinkedTreeList+prepend"></a>

### linkedTreeList.prepend(node, before) ⇒ [<code>TreeLinker</code>](#TreeLinker)
Add a node (or data) before the given (or first) node in the list.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>prepend</code>](#DoublyLinkedList+prepend)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>TreeLinker</code>](#TreeLinker) \| <code>\*</code> | The new node to add to the start of the list |
| before | [<code>TreeLinker</code>](#TreeLinker) | The existing first node |

<a name="LinkedTreeList+remove"></a>

### linkedTreeList.remove(node) ⇒ [<code>TreeLinker</code>](#TreeLinker) \| <code>null</code>
Remove a linker from this linked list. The removed node no longer has a parent.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>remove</code>](#DoublyLinkedList+remove)  
**Returns**: [<code>TreeLinker</code>](#TreeLinker) \| <code>null</code> - The removed node, or null when there was nothing to remove  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>TreeLinker</code>](#TreeLinker) | The node we wish to remove (and it will be returned after removal) |

<a name="LinkedTreeList+reset"></a>

### linkedTreeList.reset() ⇒ [<code>TreeLinker</code>](#TreeLinker)
Refresh all references (the head, the end and the length) by walking the list once, and return the head. The
list's own methods keep these up to date, so this is only needed after linkers were changed directly.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>reset</code>](#DoublyLinkedList+reset)  
<a name="LinkedTreeList+item"></a>

### linkedTreeList.item(index) ⇒ [<code>TreeLinker</code>](#TreeLinker) \| <code>null</code>
Retrieve a TreeLinker item from this list by numeric index, otherwise return null.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>item</code>](#DoublyLinkedList+item)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The integer number for retrieving a node by position. |

<a name="LinkedTreeList+forEach"></a>

### linkedTreeList.forEach(callback, thisArg) ⇒ [<code>LinkedTreeList</code>](#LinkedTreeList)
Be able to run forEach on this LinkedTreeList to iterate over the TreeLinker Items.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>forEach</code>](#DoublyLinkedList+forEach)  
**Returns**: [<code>LinkedTreeList</code>](#LinkedTreeList) - The list which was iterated.  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>forEachCallback</code> | The function to call for-each tree node |
| thisArg | [<code>LinkedTreeList</code>](#LinkedTreeList) | Optional, 'this' reference |

<a name="Arrayable+indexOfElement"></a>

### linkedTreeList.indexOfElement(node) ⇒ <code>number</code>
Find the position of an element which must be in this list.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>indexOfElement</code>](#Arrayable+indexOfElement)  
**Throws**:

- <code>Error</code> When the element is not in this list


| Param | Type | Description |
| --- | --- | --- |
| node | [<code>ArrayElement</code>](#ArrayElement) | The element to find |

<a name="Linker"></a>

## Linker ⇐ [<code>ArrayElement</code>](#ArrayElement)
Linker represents a node in a LinkedList.

**Kind**: global class  
**Extends**: [<code>ArrayElement</code>](#ArrayElement)  

* [Linker](#Linker) ⇐ [<code>ArrayElement</code>](#ArrayElement)
    * [new Linker([nodeData])](#new_Linker_new)
    * _instance_
        * [.classType](#Linker+classType)
        * [.data](#Linker+data)
        * [.next](#Linker+next)
    * _static_
        * [.fromArray([values], [classType])](#Linker.fromArray) ⇒ <code>Object</code>

<a name="new_Linker_new"></a>

### new Linker([nodeData])
Create the new Linker instance, provide the data and optionally give the next Linker.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [nodeData] | <code>Object</code> | <code>{}</code> | The settings for the new linker. |
| [nodeData.data] | <code>\*</code> | <code></code> | The data to be stored in this linker |
| [nodeData.next] | [<code>Linker</code>](#Linker) \| <code>null</code> | <code></code> | The reference to the next linker if any |

<a name="Linker+classType"></a>

### linker.classType
The class used to create this instance, so that it can be recognized as valid without an instanceof check.

**Kind**: instance property of [<code>Linker</code>](#Linker)  
**Overrides**: [<code>classType</code>](#ArrayElement+classType)  
<a name="Linker+data"></a>

### linker.data
The data stored in this linker.

**Kind**: instance property of [<code>Linker</code>](#Linker)  
**Overrides**: [<code>data</code>](#ArrayElement+data)  
<a name="Linker+next"></a>

### linker.next
The linker after this one, or null when this is the last.

**Kind**: instance property of [<code>Linker</code>](#Linker)  
<a name="Linker.fromArray"></a>

### Linker.fromArray([values], [classType]) ⇒ <code>Object</code>
Convert an array into Linker instances, return the head and tail Linkers.

**Kind**: static method of [<code>Linker</code>](#Linker)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [values] | <code>Array</code> | <code>[]</code> | Provide an array of data that will be converted to a chain of linkers. |
| [classType] | <code>IsLinker</code> | <code>Linker</code> | Provide the type of IsLinker to use. |

<a name="LinkedList"></a>

## LinkedList ⇐ [<code>Arrayable</code>](#Arrayable)
LinkedList represents a collection stored as a LinkedList with next references.

**Kind**: global class  
**Extends**: [<code>Arrayable</code>](#Arrayable)  

* [LinkedList](#LinkedList) ⇐ [<code>Arrayable</code>](#Arrayable)
    * [new LinkedList([linkerClass])](#new_LinkedList_new)
    * [.classType](#LinkedList+classType)
    * [.innerList](#LinkedList+innerList)
    * [.initialized](#LinkedList+initialized)
    * [.tailCache](#LinkedList+tailCache)
    * [.countCache](#LinkedList+countCache)
    * [.list](#LinkedList+list) ⇒ [<code>Linker</code>](#Linker)
    * [.first](#LinkedList+first) ⇒ [<code>Linker</code>](#Linker)
    * [.last](#LinkedList+last) ⇒ [<code>Linker</code>](#Linker)
    * [.length](#LinkedList+length) ⇒ <code>number</code>
    * [.initialize(initialList)](#LinkedList+initialize) ⇒ [<code>LinkedList</code>](#LinkedList)
    * [.insertAfter(node, newNode)](#LinkedList+insertAfter) ⇒ [<code>LinkedList</code>](#LinkedList)
    * [.insertBefore(node, newNode)](#LinkedList+insertBefore) ⇒ [<code>LinkedList</code>](#LinkedList)
    * [.append(node, after)](#LinkedList+append) ⇒ [<code>Linker</code>](#Linker)
    * [.prepend(node, before)](#LinkedList+prepend) ⇒ [<code>Linker</code>](#Linker)
    * [.remove(node)](#LinkedList+remove) ⇒ [<code>Linker</code>](#Linker) \| <code>null</code>
    * [.reset()](#LinkedList+reset) ⇒ [<code>Linker</code>](#Linker) \| <code>null</code>
    * [.item(index)](#LinkedList+item) ⇒ [<code>Linker</code>](#Linker) \| <code>null</code>
    * [.forEach(callback, thisArg)](#LinkedList+forEach) ⇒ [<code>LinkedList</code>](#LinkedList)
    * [.indexOfElement(node)](#Arrayable+indexOfElement) ⇒ <code>number</code>

<a name="new_LinkedList_new"></a>

### new LinkedList([linkerClass])
Create the new LinkedList instance.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [linkerClass] | [<code>Linker</code>](#Linker) | <code>Linker</code> | The class used to wrap given data as linkers. |

<a name="LinkedList+classType"></a>

### linkedList.classType
The class used to create this instance, so that it can be recognized as valid without an instanceof check.

**Kind**: instance property of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>classType</code>](#Arrayable+classType)  
<a name="LinkedList+innerList"></a>

### linkedList.innerList
The first linker of the list (null when the list is empty), from which the whole list is reached.

**Kind**: instance property of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>innerList</code>](#Arrayable+innerList)  
<a name="LinkedList+initialized"></a>

### linkedList.initialized
Whether the inner list has been initialized (it can only be initialized once).

**Kind**: instance property of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>initialized</code>](#Arrayable+initialized)  
<a name="LinkedList+tailCache"></a>

### linkedList.tailCache
The last linker, remembered so that adding to the end does not need to walk the whole list (null when not known yet).

**Kind**: instance property of [<code>LinkedList</code>](#LinkedList)  
<a name="LinkedList+countCache"></a>

### linkedList.countCache
The number of linkers, kept up to date by the list's own methods so that the length does not need to walk the whole list (null when not known yet).

**Kind**: instance property of [<code>LinkedList</code>](#LinkedList)  
<a name="LinkedList+list"></a>

### linkedList.list ⇒ [<code>Linker</code>](#Linker)
Retrieve the innerList used (the list itself, not a copy).

**Kind**: instance property of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>list</code>](#Arrayable+list)  
<a name="LinkedList+first"></a>

### linkedList.first ⇒ [<code>Linker</code>](#Linker)
Retrieve the first Linker in the list.

**Kind**: instance property of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>first</code>](#Arrayable+first)  
<a name="LinkedList+last"></a>

### linkedList.last ⇒ [<code>Linker</code>](#Linker)
Retrieve the last Linker in the list. The end is remembered, so this does not walk the list.

**Kind**: instance property of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>last</code>](#Arrayable+last)  
<a name="LinkedList+length"></a>

### linkedList.length ⇒ <code>number</code>
Return the length of the list. It is kept up to date by the list's own methods, so this does not walk the list
(call reset() after linkers were changed directly).

**Kind**: instance property of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>length</code>](#Arrayable+length)  
<a name="LinkedList+initialize"></a>

### linkedList.initialize(initialList) ⇒ [<code>LinkedList</code>](#LinkedList)
Initialize the inner list, should only run once.

**Kind**: instance method of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>initialize</code>](#Arrayable+initialize)  

| Param | Type | Description |
| --- | --- | --- |
| initialList | [<code>Linker</code>](#Linker) \| <code>Array</code> | Give the list of linkers to start in this linked-list. |

<a name="LinkedList+insertAfter"></a>

### linkedList.insertAfter(node, newNode) ⇒ [<code>LinkedList</code>](#LinkedList)
Insert a new node (or data) after a node.

**Kind**: instance method of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>insertAfter</code>](#Arrayable+insertAfter)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>Linker</code>](#Linker) \| <code>\*</code> | The existing node as reference, or null to insert at the start of the list |
| newNode | [<code>Linker</code>](#Linker) \| <code>\*</code> | The new node to go after the existing node |

<a name="LinkedList+insertBefore"></a>

### linkedList.insertBefore(node, newNode) ⇒ [<code>LinkedList</code>](#LinkedList)
Insert a new node (or data) before a node.

**Kind**: instance method of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>insertBefore</code>](#Arrayable+insertBefore)  
**Throws**:

- <code>Error</code> When the reference node is not in this list


| Param | Type | Description |
| --- | --- | --- |
| node | [<code>Linker</code>](#Linker) \| <code>\*</code> | The existing node as reference, or null to insert at the end of the list |
| newNode | [<code>Linker</code>](#Linker) \| <code>\*</code> | The new node to go before the existing node |

<a name="LinkedList+append"></a>

### linkedList.append(node, after) ⇒ [<code>Linker</code>](#Linker)
Add a node (or data) after the given (or last) node in the list.

**Kind**: instance method of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>append</code>](#Arrayable+append)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>Linker</code>](#Linker) \| <code>\*</code> | The new node to add to the end of the list |
| after | [<code>Linker</code>](#Linker) | The existing last node |

<a name="LinkedList+prepend"></a>

### linkedList.prepend(node, before) ⇒ [<code>Linker</code>](#Linker)
Add a node (or data) before the given (or first) node in the list.

**Kind**: instance method of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>prepend</code>](#Arrayable+prepend)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>Linker</code>](#Linker) \| <code>\*</code> | The new node to add to the start of the list |
| before | [<code>Linker</code>](#Linker) | The existing first node |

<a name="LinkedList+remove"></a>

### linkedList.remove(node) ⇒ [<code>Linker</code>](#Linker) \| <code>null</code>
Remove a linker from this linked list.

**Kind**: instance method of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>remove</code>](#Arrayable+remove)  
**Returns**: [<code>Linker</code>](#Linker) \| <code>null</code> - The removed node, or null when it was not in this list (nothing is removed)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>Linker</code>](#Linker) | The node we wish to remove (and it will be returned after removal) |

<a name="LinkedList+reset"></a>

### linkedList.reset() ⇒ [<code>Linker</code>](#Linker) \| <code>null</code>
Refresh the remembered end and length of the list by walking it once. The list's own methods keep these up to date,
so this is only needed after linkers were changed directly (for example by setting next on a linker).

**Kind**: instance method of [<code>LinkedList</code>](#LinkedList)  
**Returns**: [<code>Linker</code>](#Linker) \| <code>null</code> - The first linker of the list  
<a name="LinkedList+item"></a>

### linkedList.item(index) ⇒ [<code>Linker</code>](#Linker) \| <code>null</code>
Retrieve a Linker item from this list by numeric index, otherwise return null.

**Kind**: instance method of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>item</code>](#Arrayable+item)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The integer number for retrieving a node by position. |

<a name="LinkedList+forEach"></a>

### linkedList.forEach(callback, thisArg) ⇒ [<code>LinkedList</code>](#LinkedList)
Be able to run forEach on this LinkedList to iterate over the linkers.

**Kind**: instance method of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>forEach</code>](#Arrayable+forEach)  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>forEachCallback</code> | The function to call for-each linker |
| thisArg | [<code>LinkedList</code>](#LinkedList) | Optional, 'this' reference |

<a name="Arrayable+indexOfElement"></a>

### linkedList.indexOfElement(node) ⇒ <code>number</code>
Find the position of an element which must be in this list.

**Kind**: instance method of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>indexOfElement</code>](#Arrayable+indexOfElement)  
**Throws**:

- <code>Error</code> When the element is not in this list


| Param | Type | Description |
| --- | --- | --- |
| node | [<code>ArrayElement</code>](#ArrayElement) | The element to find |

<a name="DoublyLinkedList"></a>

## DoublyLinkedList ⇐ [<code>LinkedList</code>](#LinkedList)
DoublyLinkedList represents a collection stored as a LinkedList with prev and next references.

**Kind**: global class  
**Extends**: [<code>LinkedList</code>](#LinkedList)  

* [DoublyLinkedList](#DoublyLinkedList) ⇐ [<code>LinkedList</code>](#LinkedList)
    * [new DoublyLinkedList([linkerClass])](#new_DoublyLinkedList_new)
    * [.classType](#DoublyLinkedList+classType)
    * [.innerList](#DoublyLinkedList+innerList)
    * [.initialized](#DoublyLinkedList+initialized)
    * [.tailCache](#DoublyLinkedList+tailCache)
    * [.countCache](#DoublyLinkedList+countCache)
    * [.list](#DoublyLinkedList+list) ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
    * [.first](#DoublyLinkedList+first) ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
    * [.last](#DoublyLinkedList+last) ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
    * [.length](#DoublyLinkedList+length) ⇒ <code>number</code>
    * [.initialize(initialList)](#DoublyLinkedList+initialize) ⇒ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
    * [.insertAfter(node, newNode)](#DoublyLinkedList+insertAfter) ⇒ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
    * [.insertBefore(node, newNode)](#DoublyLinkedList+insertBefore) ⇒ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
    * [.append(node, after)](#DoublyLinkedList+append) ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
    * [.prepend(node, before)](#DoublyLinkedList+prepend) ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
    * [.remove(node)](#DoublyLinkedList+remove) ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
    * [.reset()](#DoublyLinkedList+reset) ⇒ [<code>DoubleLinker</code>](#DoubleLinker) \| <code>null</code>
    * [.item(index)](#DoublyLinkedList+item) ⇒ [<code>DoubleLinker</code>](#DoubleLinker) \| <code>null</code>
    * [.forEach(callback, thisArg)](#DoublyLinkedList+forEach) ⇒ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
    * [.indexOfElement(node)](#Arrayable+indexOfElement) ⇒ <code>number</code>

<a name="new_DoublyLinkedList_new"></a>

### new DoublyLinkedList([linkerClass])
Create the new DoublyLinkedList instance.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [linkerClass] | [<code>DoubleLinker</code>](#DoubleLinker) | <code>DoubleLinker</code> | The class used to wrap given data as linkers. |

<a name="DoublyLinkedList+classType"></a>

### doublyLinkedList.classType
The class used to create this instance, so that it can be recognized as valid without an instanceof check.

**Kind**: instance property of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>classType</code>](#LinkedList+classType)  
<a name="DoublyLinkedList+innerList"></a>

### doublyLinkedList.innerList
A linker of the list (null when the list is empty); the head is found by walking back from it.

**Kind**: instance property of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>innerList</code>](#LinkedList+innerList)  
<a name="DoublyLinkedList+initialized"></a>

### doublyLinkedList.initialized
Whether the inner list has been initialized (it can only be initialized once).

**Kind**: instance property of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>initialized</code>](#LinkedList+initialized)  
<a name="DoublyLinkedList+tailCache"></a>

### doublyLinkedList.tailCache
The last linker, remembered so that adding to the end does not need to walk the whole list (null when not known yet).

**Kind**: instance property of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>tailCache</code>](#LinkedList+tailCache)  
<a name="DoublyLinkedList+countCache"></a>

### doublyLinkedList.countCache
The number of linkers, kept up to date by the list's own methods so that the length does not need to walk the whole list (null when not known yet).

**Kind**: instance property of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>countCache</code>](#LinkedList+countCache)  
<a name="DoublyLinkedList+list"></a>

### doublyLinkedList.list ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
Retrieve the innerList used (the list itself, not a copy).

**Kind**: instance property of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>list</code>](#LinkedList+list)  
<a name="DoublyLinkedList+first"></a>

### doublyLinkedList.first ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
Retrieve the first DoubleLinker in the list.

**Kind**: instance property of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>first</code>](#LinkedList+first)  
<a name="DoublyLinkedList+last"></a>

### doublyLinkedList.last ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
Retrieve the last DoubleLinker in the list. The end is remembered, so this does not walk the list.

**Kind**: instance property of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>last</code>](#LinkedList+last)  
<a name="DoublyLinkedList+length"></a>

### doublyLinkedList.length ⇒ <code>number</code>
Return the length of the list. It is kept up to date by the list's own methods, so this does not walk the list
(call reset() after linkers were changed directly).

**Kind**: instance property of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>length</code>](#LinkedList+length)  
<a name="DoublyLinkedList+initialize"></a>

### doublyLinkedList.initialize(initialList) ⇒ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
Initialize the inner list, should only run once.

**Kind**: instance method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>initialize</code>](#LinkedList+initialize)  

| Param | Type | Description |
| --- | --- | --- |
| initialList | [<code>DoubleLinker</code>](#DoubleLinker) | Give the list of double-linkers to start in this doubly linked-list. |

<a name="DoublyLinkedList+insertAfter"></a>

### doublyLinkedList.insertAfter(node, newNode) ⇒ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
Insert a new node (or data) after a node.

**Kind**: instance method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>insertAfter</code>](#LinkedList+insertAfter)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>\*</code> | The existing node as reference (which must be in this list, this is not checked), or null to insert at the start of the list |
| newNode | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>\*</code> | The new node to go after the existing node |

<a name="DoublyLinkedList+insertBefore"></a>

### doublyLinkedList.insertBefore(node, newNode) ⇒ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
Insert a new node (or data) before a node.

**Kind**: instance method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>insertBefore</code>](#LinkedList+insertBefore)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>\*</code> | The existing node as reference (which must be in this list, this is not checked), or null to insert at the end of the list |
| newNode | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>\*</code> | The new node to go before the existing node |

<a name="DoublyLinkedList+append"></a>

### doublyLinkedList.append(node, after) ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
Add a node (or data) after the given (or last) node in the list.

**Kind**: instance method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>append</code>](#LinkedList+append)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>\*</code> | The new node to add to the end of the list |
| after | [<code>DoubleLinker</code>](#DoubleLinker) | The existing last node |

<a name="DoublyLinkedList+prepend"></a>

### doublyLinkedList.prepend(node, before) ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
Add a node (or data) before the given (or first) node in the list.

**Kind**: instance method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>prepend</code>](#LinkedList+prepend)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>\*</code> | The new node to add to the start of the list |
| before | [<code>DoubleLinker</code>](#DoubleLinker) | The existing first node |

<a name="DoublyLinkedList+remove"></a>

### doublyLinkedList.remove(node) ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
Remove a linker from this linked list.

**Kind**: instance method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>remove</code>](#LinkedList+remove)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>DoubleLinker</code>](#DoubleLinker) | The node we wish to remove (and it will be returned after removal) |

<a name="DoublyLinkedList+reset"></a>

### doublyLinkedList.reset() ⇒ [<code>DoubleLinker</code>](#DoubleLinker) \| <code>null</code>
Refresh all references (the head, the end and the length) by walking the list once, and return the head. The list's
own methods keep these up to date, so this is only needed after linkers were changed directly.

**Kind**: instance method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>reset</code>](#LinkedList+reset)  
<a name="DoublyLinkedList+item"></a>

### doublyLinkedList.item(index) ⇒ [<code>DoubleLinker</code>](#DoubleLinker) \| <code>null</code>
Retrieve a DoubleLinker item from this list by numeric index, otherwise return null.

**Kind**: instance method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>item</code>](#LinkedList+item)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The integer number for retrieving a node by position. |

<a name="DoublyLinkedList+forEach"></a>

### doublyLinkedList.forEach(callback, thisArg) ⇒ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
Be able to run forEach on this DoublyLinkedList to iterate over the DoubleLinker Items.

**Kind**: instance method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>forEach</code>](#LinkedList+forEach)  
**Returns**: [<code>DoublyLinkedList</code>](#DoublyLinkedList) - The list which was iterated.  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>forEachCallback</code> | The function to call for-each double linker |
| thisArg | [<code>DoublyLinkedList</code>](#DoublyLinkedList) | Optional, 'this' reference |

<a name="Arrayable+indexOfElement"></a>

### doublyLinkedList.indexOfElement(node) ⇒ <code>number</code>
Find the position of an element which must be in this list.

**Kind**: instance method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>indexOfElement</code>](#Arrayable+indexOfElement)  
**Throws**:

- <code>Error</code> When the element is not in this list


| Param | Type | Description |
| --- | --- | --- |
| node | [<code>ArrayElement</code>](#ArrayElement) | The element to find |

<a name="DoubleLinker"></a>

## DoubleLinker ⇐ [<code>Linker</code>](#Linker)
DoubleLinker represents a node in a DoublyLinkedList which is chained by next and prev.

**Kind**: global class  
**Extends**: [<code>Linker</code>](#Linker)  

* [DoubleLinker](#DoubleLinker) ⇐ [<code>Linker</code>](#Linker)
    * [new DoubleLinker([nodeData])](#new_DoubleLinker_new)
    * _instance_
        * [.classType](#DoubleLinker+classType)
        * [.data](#DoubleLinker+data)
        * [.next](#DoubleLinker+next)
        * [.prev](#DoubleLinker+prev)
    * _static_
        * [.fromArray([values], [classType])](#DoubleLinker.fromArray) ⇒ <code>Object</code>

<a name="new_DoubleLinker_new"></a>

### new DoubleLinker([nodeData])
Create the new DoubleLinker instance, provide the data and optionally the next and prev references.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [nodeData] | <code>Object</code> | <code>{}</code> | The settings for the new linker. |
| [nodeData.data] | <code>\*</code> | <code></code> | The data to be stored in this linker |
| [nodeData.next] | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>null</code> | <code></code> | The reference to the next linker if any |
| [nodeData.prev] | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>null</code> | <code></code> | The reference to the previous linker if any |

<a name="DoubleLinker+classType"></a>

### doubleLinker.classType
The class used to create this instance, so that it can be recognized as valid without an instanceof check.

**Kind**: instance property of [<code>DoubleLinker</code>](#DoubleLinker)  
**Overrides**: [<code>classType</code>](#Linker+classType)  
<a name="DoubleLinker+data"></a>

### doubleLinker.data
The data stored in this linker.

**Kind**: instance property of [<code>DoubleLinker</code>](#DoubleLinker)  
**Overrides**: [<code>data</code>](#Linker+data)  
<a name="DoubleLinker+next"></a>

### doubleLinker.next
The linker after this one, or null when this is the last.

**Kind**: instance property of [<code>DoubleLinker</code>](#DoubleLinker)  
**Overrides**: [<code>next</code>](#Linker+next)  
<a name="DoubleLinker+prev"></a>

### doubleLinker.prev
The linker before this one, or null when this is the first.

**Kind**: instance property of [<code>DoubleLinker</code>](#DoubleLinker)  
<a name="DoubleLinker.fromArray"></a>

### DoubleLinker.fromArray([values], [classType]) ⇒ <code>Object</code>
Convert an array into DoubleLinker instances, return the head and tail DoubleLinkers.

**Kind**: static method of [<code>DoubleLinker</code>](#DoubleLinker)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [values] | <code>Array</code> | <code>[]</code> | Provide an array of data that will be converted to a chain of linkers. |
| [classType] | <code>IsDoubleLinker</code> | <code>DoubleLinker</code> | Provide the type of IsDoubleLinker to use. |

<a name="Arrayable"></a>

## Arrayable
Arrayable represents a collection stored as an array.

**Kind**: global class  

* [Arrayable](#Arrayable)
    * [new Arrayable([elementClass])](#new_Arrayable_new)
    * [.classType](#Arrayable+classType)
    * [.innerList](#Arrayable+innerList)
    * [.initialized](#Arrayable+initialized)
    * [.list](#Arrayable+list) ⇒ [<code>Array.&lt;ArrayElement&gt;</code>](#ArrayElement)
    * [.first](#Arrayable+first) ⇒ [<code>ArrayElement</code>](#ArrayElement) \| <code>null</code>
    * [.last](#Arrayable+last) ⇒ [<code>ArrayElement</code>](#ArrayElement) \| <code>null</code>
    * [.length](#Arrayable+length) ⇒ <code>number</code>
    * [.indexOfElement(node)](#Arrayable+indexOfElement) ⇒ <code>number</code>
    * [.initialize(initialList)](#Arrayable+initialize) ⇒ [<code>Arrayable</code>](#Arrayable)
    * [.insertAfter(node, newNode)](#Arrayable+insertAfter) ⇒ [<code>Arrayable</code>](#Arrayable)
    * [.insertBefore(node, newNode)](#Arrayable+insertBefore) ⇒ [<code>Arrayable</code>](#Arrayable)
    * [.append(node, after)](#Arrayable+append) ⇒ [<code>Arrayable</code>](#Arrayable)
    * [.prepend(node, before)](#Arrayable+prepend) ⇒ [<code>Arrayable</code>](#Arrayable)
    * [.remove(node)](#Arrayable+remove) ⇒ [<code>ArrayElement</code>](#ArrayElement) \| <code>null</code>
    * [.item(index)](#Arrayable+item) ⇒ [<code>ArrayElement</code>](#ArrayElement) \| <code>null</code>
    * [.forEach(callback, thisArg)](#Arrayable+forEach) ⇒ [<code>Arrayable</code>](#Arrayable)

<a name="new_Arrayable_new"></a>

### new Arrayable([elementClass])
Create the new Arrayable instance, configure the Arrayable class.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [elementClass] | [<code>ArrayElement</code>](#ArrayElement) | <code>ArrayElement</code> | The class used to wrap given data as elements. |

<a name="Arrayable+classType"></a>

### arrayable.classType
The class used to create this instance, so that it can be recognized as valid without an instanceof check.

**Kind**: instance property of [<code>Arrayable</code>](#Arrayable)  
<a name="Arrayable+innerList"></a>

### arrayable.innerList
The array which stores the elements of this Arrayable.

**Kind**: instance property of [<code>Arrayable</code>](#Arrayable)  
<a name="Arrayable+initialized"></a>

### arrayable.initialized
Whether the inner list has been initialized (it can only be initialized once).

**Kind**: instance property of [<code>Arrayable</code>](#Arrayable)  
<a name="Arrayable+list"></a>

### arrayable.list ⇒ [<code>Array.&lt;ArrayElement&gt;</code>](#ArrayElement)
Retrieve the innerList used (the list itself, not a copy).

**Kind**: instance property of [<code>Arrayable</code>](#Arrayable)  
<a name="Arrayable+first"></a>

### arrayable.first ⇒ [<code>ArrayElement</code>](#ArrayElement) \| <code>null</code>
Retrieve the first Element from the Arrayable

**Kind**: instance property of [<code>Arrayable</code>](#Arrayable)  
**Returns**: [<code>ArrayElement</code>](#ArrayElement) \| <code>null</code> - The first element, or null when the Arrayable is empty  
<a name="Arrayable+last"></a>

### arrayable.last ⇒ [<code>ArrayElement</code>](#ArrayElement) \| <code>null</code>
Retrieve the last Element from the Arrayable

**Kind**: instance property of [<code>Arrayable</code>](#Arrayable)  
**Returns**: [<code>ArrayElement</code>](#ArrayElement) \| <code>null</code> - The last element, or null when the Arrayable is empty  
<a name="Arrayable+length"></a>

### arrayable.length ⇒ <code>number</code>
Return the length of the list.

**Kind**: instance property of [<code>Arrayable</code>](#Arrayable)  
<a name="Arrayable+indexOfElement"></a>

### arrayable.indexOfElement(node) ⇒ <code>number</code>
Find the position of an element which must be in this list.

**Kind**: instance method of [<code>Arrayable</code>](#Arrayable)  
**Throws**:

- <code>Error</code> When the element is not in this list


| Param | Type | Description |
| --- | --- | --- |
| node | [<code>ArrayElement</code>](#ArrayElement) | The element to find |

<a name="Arrayable+initialize"></a>

### arrayable.initialize(initialList) ⇒ [<code>Arrayable</code>](#Arrayable)
Initialize the inner list, should only run once.

**Kind**: instance method of [<code>Arrayable</code>](#Arrayable)  

| Param | Type | Description |
| --- | --- | --- |
| initialList | [<code>Array.&lt;ArrayElement&gt;</code>](#ArrayElement) | Give the array of elements to start in this Arrayable. |

<a name="Arrayable+insertAfter"></a>

### arrayable.insertAfter(node, newNode) ⇒ [<code>Arrayable</code>](#Arrayable)
Insert a new node (or data) after a node.

**Kind**: instance method of [<code>Arrayable</code>](#Arrayable)  
**Throws**:

- <code>Error</code> When the reference node is not in this list


| Param | Type | Description |
| --- | --- | --- |
| node | [<code>ArrayElement</code>](#ArrayElement) \| <code>null</code> | The existing node as reference, or null to insert at the start of the list |
| newNode | [<code>ArrayElement</code>](#ArrayElement) \| <code>\*</code> | The new node to go after the existing node |

<a name="Arrayable+insertBefore"></a>

### arrayable.insertBefore(node, newNode) ⇒ [<code>Arrayable</code>](#Arrayable)
Insert a new node (or data) before a node.

**Kind**: instance method of [<code>Arrayable</code>](#Arrayable)  
**Throws**:

- <code>Error</code> When the reference node is not in this list


| Param | Type | Description |
| --- | --- | --- |
| node | [<code>ArrayElement</code>](#ArrayElement) \| <code>null</code> | The existing node as reference, or null to insert at the end of the list |
| newNode | [<code>ArrayElement</code>](#ArrayElement) \| <code>\*</code> | The new node to go before the existing node |

<a name="Arrayable+append"></a>

### arrayable.append(node, after) ⇒ [<code>Arrayable</code>](#Arrayable)
Add a node (or data) after the given (or last) node in the list.

**Kind**: instance method of [<code>Arrayable</code>](#Arrayable)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>ArrayElement</code>](#ArrayElement) \| <code>\*</code> | The new node to add to the end of the list |
| after | [<code>ArrayElement</code>](#ArrayElement) | The existing last node |

<a name="Arrayable+prepend"></a>

### arrayable.prepend(node, before) ⇒ [<code>Arrayable</code>](#Arrayable)
Add a node (or data) before the given (or first) node in the list.

**Kind**: instance method of [<code>Arrayable</code>](#Arrayable)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>ArrayElement</code>](#ArrayElement) \| <code>\*</code> | The new node to add to the start of the list |
| before | [<code>ArrayElement</code>](#ArrayElement) | The existing first node |

<a name="Arrayable+remove"></a>

### arrayable.remove(node) ⇒ [<code>ArrayElement</code>](#ArrayElement) \| <code>null</code>
Remove an element from this arrayable.

**Kind**: instance method of [<code>Arrayable</code>](#Arrayable)  
**Returns**: [<code>ArrayElement</code>](#ArrayElement) \| <code>null</code> - The removed node, or null when it was not in this list (nothing is removed)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>ArrayElement</code>](#ArrayElement) | The node we wish to remove (and it will be returned after removal) |

<a name="Arrayable+item"></a>

### arrayable.item(index) ⇒ [<code>ArrayElement</code>](#ArrayElement) \| <code>null</code>
Retrieve an ArrayElement item from this list by numeric index, otherwise return null.

**Kind**: instance method of [<code>Arrayable</code>](#Arrayable)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The integer number for retrieving a node by position. |

<a name="Arrayable+forEach"></a>

### arrayable.forEach(callback, thisArg) ⇒ [<code>Arrayable</code>](#Arrayable)
Be able to run forEach on this Arrayable to iterate over the elements.

**Kind**: instance method of [<code>Arrayable</code>](#Arrayable)  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>forEachCallback</code> | The function to call for-each element |
| thisArg | [<code>Arrayable</code>](#Arrayable) | Optional, 'this' reference |

<a name="ArrayElement"></a>

## ArrayElement
Element represents a node in an Arrayable.

**Kind**: global class  

* [ArrayElement](#ArrayElement)
    * [new ArrayElement([data])](#new_ArrayElement_new)
    * _instance_
        * [.classType](#ArrayElement+classType)
        * [.data](#ArrayElement+data)
    * _static_
        * [.fromArray([values], [classType])](#ArrayElement.fromArray) ⇒ <code>Object</code>

<a name="new_ArrayElement_new"></a>

### new ArrayElement([data])
Create the new Element instance, provide the data and optionally configure the type of Element.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [data] | <code>\*</code> | <code></code> | The data to be stored in this element. |

<a name="ArrayElement+classType"></a>

### arrayElement.classType
The class used to create this instance, so that it can be recognized as valid without an instanceof check.

**Kind**: instance property of [<code>ArrayElement</code>](#ArrayElement)  
<a name="ArrayElement+data"></a>

### arrayElement.data
The data stored in this element.

**Kind**: instance property of [<code>ArrayElement</code>](#ArrayElement)  
<a name="ArrayElement.fromArray"></a>

### ArrayElement.fromArray([values], [classType]) ⇒ <code>Object</code>
Convert an array into Element instances, return the head and tail Elements.

**Kind**: static method of [<code>ArrayElement</code>](#ArrayElement)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [values] | <code>Array.&lt;IsElement&gt;</code> | <code>[]</code> | Provide an array of data that will be converted to array of elements. |
| [classType] | <code>IsElement</code> | <code>ArrayElement</code> | Provide the type of IsElement to use. |

<a name="TaskStack"></a>

## TaskStack ⇒ [<code>TaskStack</code>](#TaskStack)
Convert an array to a TaskStack.

**Kind**: global variable  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>Array</code> | An array of values which will be converted to stackables in this queue |
| stackableClass | [<code>Stackable</code>](#Stackable) | The class to use for each stackable |
| listClass | [<code>TaskStack</code>](#TaskStack) \| <code>Iterable</code> | The class to use to manage the stackables |


* [TaskStack](#TaskStack) ⇒ [<code>TaskStack</code>](#TaskStack)
    * [new TaskStack([stackedList], [listClass], [stackableClass])](#new_TaskStack_new)
    * [.empty()](#TaskStack+empty) ⇒ <code>boolean</code>
    * [.top()](#TaskStack+top) ⇒ [<code>Stackable</code>](#Stackable)
    * [.pop()](#TaskStack+pop) ⇒ [<code>Stackable</code>](#Stackable) \| <code>null</code>
    * [.push(stackable)](#TaskStack+push)
    * [.remove()](#TaskStack+remove) ⇒ [<code>Stackable</code>](#Stackable) \| <code>null</code>
    * [.size()](#TaskStack+size) ⇒ <code>number</code>

<a name="new_TaskStack_new"></a>

### new TaskStack([stackedList], [listClass], [stackableClass])
Instantiate the state with the starter stacked list.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [stackedList] | <code>Iterable</code> \| [<code>LinkedList</code>](#LinkedList) | <code></code> | The list of stackables to start in this stack. |
| [listClass] | <code>IsArrayable</code> | <code>LinkedList</code> | The type of list to create when no stacked list is given. |
| [stackableClass] | [<code>Stackable</code>](#Stackable) | <code>Stackable</code> | The class used to wrap stacked items. |

<a name="TaskStack+empty"></a>

### taskStack.empty() ⇒ <code>boolean</code>
Return true if the stack is empty (there are no tasks in the stacked list)

**Kind**: instance method of [<code>TaskStack</code>](#TaskStack)  
<a name="TaskStack+top"></a>

### taskStack.top() ⇒ [<code>Stackable</code>](#Stackable)
Take a look at the next stacked task

**Kind**: instance method of [<code>TaskStack</code>](#TaskStack)  
<a name="TaskStack+pop"></a>

### taskStack.pop() ⇒ [<code>Stackable</code>](#Stackable) \| <code>null</code>
Remove the next stacked task and return it.

**Kind**: instance method of [<code>TaskStack</code>](#TaskStack)  
<a name="TaskStack+push"></a>

### taskStack.push(stackable)
Push a stackable task to the top of the stack.

**Kind**: instance method of [<code>TaskStack</code>](#TaskStack)  

| Param | Type | Description |
| --- | --- | --- |
| stackable | [<code>Stackable</code>](#Stackable) \| <code>\*</code> | Add a new stackable to the top of the stack |

<a name="TaskStack+remove"></a>

### taskStack.remove() ⇒ [<code>Stackable</code>](#Stackable) \| <code>null</code>
Remove the next stacked task and return it.

**Kind**: instance method of [<code>TaskStack</code>](#TaskStack)  
<a name="TaskStack+size"></a>

### taskStack.size() ⇒ <code>number</code>
Get the size of the current stack.

**Kind**: instance method of [<code>TaskStack</code>](#TaskStack)  
<a name="Stackable"></a>

## Stackable ⇒ [<code>Stackable</code>](#Stackable)
Make a new Stackable from the data given if it is not already a valid Stackable.

**Kind**: global variable  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| stackable | [<code>Stackable</code>](#Stackable) \| <code>\*</code> |  | Return a valid Stackable instance from given data, or even an already valid one. |
| [classType] | <code>IsLinker</code> | <code>Stackable</code> | Provide the type of IsLinker to use. |


* [Stackable](#Stackable) ⇒ [<code>Stackable</code>](#Stackable)
    * [new Stackable([stackData])](#new_Stackable_new)
    * _instance_
        * [.data](#Stackable+data)
        * [.next](#Stackable+next)
        * [.task](#Stackable+task) ⇒ <code>\*</code>
        * [.classType](#Linker+classType)
        * [.run()](#Stackable+run) ⇒ <code>\*</code>
    * _static_
        * [.fromArray([values], [classType])](#Stackable.fromArray) ⇒ <code>Object</code>

<a name="new_Stackable_new"></a>

### new Stackable([stackData])
Create a stackable item that can be used in a stack.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [stackData] | <code>Object</code> | <code>{}</code> | The settings for the new stackable. |
| [stackData.task] | <code>\*</code> | <code></code> | The data to be stored in this stackable |
| [stackData.next] | [<code>Stackable</code>](#Stackable) \| <code>null</code> | <code></code> | The reference to the next stackable if any |
| [stackData.ready] | <code>boolean</code> \| <code>function</code> | <code>false</code> | Indicate if the stackable is ready to run |

<a name="Stackable+data"></a>

### stackable.data
The task (or data) this stackable holds.

**Kind**: instance property of [<code>Stackable</code>](#Stackable)  
**Overrides**: [<code>data</code>](#Linker+data)  
<a name="Stackable+next"></a>

### stackable.next
The stackable below this one, or null when this is the bottom.

**Kind**: instance property of [<code>Stackable</code>](#Stackable)  
**Overrides**: [<code>next</code>](#Linker+next)  
<a name="Stackable+task"></a>

### stackable.task ⇒ <code>\*</code>
Retrieve the data which should be formed as a task.

**Kind**: instance property of [<code>Stackable</code>](#Stackable)  
<a name="Linker+classType"></a>

### stackable.classType
The class used to create this instance, so that it can be recognized as valid without an instanceof check.

**Kind**: instance property of [<code>Stackable</code>](#Stackable)  
**Overrides**: [<code>classType</code>](#Linker+classType)  
<a name="Stackable+run"></a>

### stackable.run() ⇒ <code>\*</code>
Run the stacked task.

**Kind**: instance method of [<code>Stackable</code>](#Stackable)  
<a name="Stackable.fromArray"></a>

### Stackable.fromArray([values], [classType]) ⇒ <code>Object</code>
Convert an array into Stackable instances, return the head and tail Stackables.

**Kind**: static method of [<code>Stackable</code>](#Stackable)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [values] | <code>Array</code> | <code>[]</code> | Provide an array of data that will be converted to a chain of stackable linkers. |
| [classType] | <code>IsLinker</code> | <code>Stackable</code> | Provide the type of IsLinker to use. |

<a name="Stack"></a>

## Stack ⇒ [<code>Stack</code>](#Stack)
Convert an array to a Stack by pushing each value in turn, so the last value is on the top.

**Kind**: global variable  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [values] | <code>Array</code> | <code>[]</code> | The items to stack |
| [listClass] | <code>IsArrayable</code> | <code>LinkedList</code> | The type of list used to store the items |
| [linkerClass] | [<code>Linker</code>](#Linker) | <code>Linker</code> | The class used to hold each stacked item |


* [Stack](#Stack) ⇒ [<code>Stack</code>](#Stack)
    * [new Stack([stackedList], [listClass], [linkerClass])](#new_Stack_new)
    * [.empty()](#Stack+empty) ⇒ <code>boolean</code>
    * [.peek()](#Stack+peek) ⇒ <code>\*</code> \| <code>null</code>
    * [.pop()](#Stack+pop) ⇒ <code>\*</code> \| <code>null</code>
    * [.push(data)](#Stack+push) ⇒ [<code>Stack</code>](#Stack)
    * [.size()](#Stack+size) ⇒ <code>number</code>
    * [.top()](#Stack+top) ⇒ <code>\*</code> \| <code>null</code>

<a name="new_Stack_new"></a>

### new Stack([stackedList], [listClass], [linkerClass])
Instantiate the stack, optionally with a list of items to start from.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [stackedList] | <code>IsArrayable</code> \| <code>null</code> | <code></code> | The list of linkers to start in this stack (the first is the top) |
| [listClass] | <code>IsArrayable</code> | <code>LinkedList</code> | The type of list to create when no stacked list is given |
| [linkerClass] | [<code>Linker</code>](#Linker) | <code>Linker</code> | The class used to hold each stacked item |

<a name="Stack+empty"></a>

### stack.empty() ⇒ <code>boolean</code>
Check whether the stack has no items.

**Kind**: instance method of [<code>Stack</code>](#Stack)  
<a name="Stack+peek"></a>

### stack.peek() ⇒ <code>\*</code> \| <code>null</code>
Look at the item on the top of the stack, without removing it.

**Kind**: instance method of [<code>Stack</code>](#Stack)  
**Returns**: <code>\*</code> \| <code>null</code> - The item, or null when the stack is empty  
<a name="Stack+pop"></a>

### stack.pop() ⇒ <code>\*</code> \| <code>null</code>
Take the item from the top of the stack.

**Kind**: instance method of [<code>Stack</code>](#Stack)  
**Returns**: <code>\*</code> \| <code>null</code> - The item, or null when the stack is empty  
<a name="Stack+push"></a>

### stack.push(data) ⇒ [<code>Stack</code>](#Stack)
Add an item to the top of the stack.

**Kind**: instance method of [<code>Stack</code>](#Stack)  
**Returns**: [<code>Stack</code>](#Stack) - This stack, so that adding can be chained  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | The item to add |

<a name="Stack+size"></a>

### stack.size() ⇒ <code>number</code>
Count the items in the stack.

**Kind**: instance method of [<code>Stack</code>](#Stack)  
<a name="Stack+top"></a>

### stack.top() ⇒ <code>\*</code> \| <code>null</code>
The item on the top of the stack (the same as peek).

**Kind**: instance method of [<code>Stack</code>](#Stack)  
**Returns**: <code>\*</code> \| <code>null</code> - The item, or null when the stack is empty  
<a name="TaskQueue"></a>

## TaskQueue ⇒ [<code>TaskQueue</code>](#TaskQueue)
Convert an array to a TaskQueue.

**Kind**: global variable  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>Array</code> | An array of values which will be converted to queueables in this queue |
| queueableClass | [<code>Queueable</code>](#Queueable) | The class to use for each queueable |
| listClass | [<code>TaskQueue</code>](#TaskQueue) \| <code>Iterable</code> | The class to use to manage the queueables |


* [TaskQueue](#TaskQueue) ⇒ [<code>TaskQueue</code>](#TaskQueue)
    * [new TaskQueue(queuedList, [listClass], [queueableClass])](#new_TaskQueue_new)
    * [.dequeue()](#TaskQueue+dequeue) ⇒ <code>completeResponse</code> \| <code>\*</code>
    * [.empty()](#TaskQueue+empty) ⇒ <code>boolean</code>
    * [.enqueue(queueable)](#TaskQueue+enqueue)
    * [.peek()](#TaskQueue+peek) ⇒ [<code>Queueable</code>](#Queueable)
    * [.remove()](#TaskQueue+remove) ⇒ [<code>Queueable</code>](#Queueable) \| <code>null</code>
    * [.size()](#TaskQueue+size) ⇒ <code>number</code>

<a name="new_TaskQueue_new"></a>

### new TaskQueue(queuedList, [listClass], [queueableClass])
Instantiate the queue with the given queue list.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| queuedList | <code>Iterable</code> \| [<code>LinkedList</code>](#LinkedList) | <code></code> | Give the list of queueables to start in this queue. |
| [listClass] | <code>IsArrayable</code> | <code>LinkedList</code> | The type of list to create when no queued list is given. |
| [queueableClass] | [<code>Queueable</code>](#Queueable) | <code>Queueable</code> | The class used to wrap queued items. |

<a name="TaskQueue+dequeue"></a>

### taskQueue.dequeue() ⇒ <code>completeResponse</code> \| <code>\*</code>
Take a queued task from the front of the queue and run it if ready. A task which is not ready yet is kept in the
queue (never dropped), a task which is still running is reported as blocking and left to finish on its own, and
completed tasks are discarded.

**Kind**: instance method of [<code>TaskQueue</code>](#TaskQueue)  
<a name="TaskQueue+empty"></a>

### taskQueue.empty() ⇒ <code>boolean</code>
Return true if the queue is empty (there are no tasks in the queue list)

**Kind**: instance method of [<code>TaskQueue</code>](#TaskQueue)  
<a name="TaskQueue+enqueue"></a>

### taskQueue.enqueue(queueable)
Add a queued task to the end of the queue

**Kind**: instance method of [<code>TaskQueue</code>](#TaskQueue)  

| Param | Type | Description |
| --- | --- | --- |
| queueable | [<code>Queueable</code>](#Queueable) | Add a new queueable to the end of the queue |

<a name="TaskQueue+peek"></a>

### taskQueue.peek() ⇒ [<code>Queueable</code>](#Queueable)
Take a look at the next queued task

**Kind**: instance method of [<code>TaskQueue</code>](#TaskQueue)  
<a name="TaskQueue+remove"></a>

### taskQueue.remove() ⇒ [<code>Queueable</code>](#Queueable) \| <code>null</code>
Remove the next queued item and return it.

**Kind**: instance method of [<code>TaskQueue</code>](#TaskQueue)  
<a name="TaskQueue+size"></a>

### taskQueue.size() ⇒ <code>number</code>
Get the length of the current queue.

**Kind**: instance method of [<code>TaskQueue</code>](#TaskQueue)  
<a name="Queueable"></a>

## Queueable ⇒ [<code>Queueable</code>](#Queueable)
Make a new Queueable from the data given if it is not already a valid Queueable.

**Kind**: global variable  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| queueable | [<code>Queueable</code>](#Queueable) \| <code>\*</code> |  | Return a valid Queueable instance from given data, or even an already valid one. |
| [classType] | <code>IsLinker</code> | <code>Queueable</code> | Provide the type of IsLinker to use. |


* [Queueable](#Queueable) ⇒ [<code>Queueable</code>](#Queueable)
    * [new Queueable([queueableData])](#new_Queueable_new)
    * _instance_
        * [.data](#Queueable+data)
        * [.next](#Queueable+next)
        * [.complete](#Queueable+complete)
        * [.ready](#Queueable+ready)
        * [.running](#Queueable+running)
        * [.isReady](#Queueable+isReady) ⇒ <code>boolean</code>
        * [.task](#Queueable+task) ⇒ <code>\*</code>
        * [.classType](#Linker+classType)
        * [.markCompleted([completeResponse])](#Queueable+markCompleted) ⇒ <code>completeResponse</code>
        * [.run()](#Queueable+run) ⇒ <code>completeResponse</code>
    * _static_
        * [.fromArray(values, [classType])](#Queueable.fromArray) ⇒ <code>Object</code>

<a name="new_Queueable_new"></a>

### new Queueable([queueableData])
Create a queueable item that can be used in a queue.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [queueableData] | <code>Object</code> | <code>{}</code> | The settings for the new queueable. |
| [queueableData.task] | <code>\*</code> | <code></code> | The data to be stored in this queueable |
| [queueableData.next] | [<code>Queueable</code>](#Queueable) \| <code>null</code> | <code></code> | The reference to the next queueable if any |
| [queueableData.ready] | <code>boolean</code> \| <code>function</code> | <code>false</code> | Indicate if the queueable is ready to run |

<a name="Queueable+data"></a>

### queueable.data
The task (or data) this queueable holds.

**Kind**: instance property of [<code>Queueable</code>](#Queueable)  
**Overrides**: [<code>data</code>](#Linker+data)  
<a name="Queueable+next"></a>

### queueable.next
The queueable after this one, or null when this is the last.

**Kind**: instance property of [<code>Queueable</code>](#Queueable)  
**Overrides**: [<code>next</code>](#Linker+next)  
<a name="Queueable+complete"></a>

### queueable.complete
Whether this queueable has been run to completion.

**Kind**: instance property of [<code>Queueable</code>](#Queueable)  
<a name="Queueable+ready"></a>

### queueable.ready
Whether this queueable may run, or a function which answers that when asked.

**Kind**: instance property of [<code>Queueable</code>](#Queueable)  
<a name="Queueable+running"></a>

### queueable.running
Whether this queueable is running right now.

**Kind**: instance property of [<code>Queueable</code>](#Queueable)  
<a name="Queueable+isReady"></a>

### queueable.isReady ⇒ <code>boolean</code>
Check ready state.

**Kind**: instance property of [<code>Queueable</code>](#Queueable)  
<a name="Queueable+task"></a>

### queueable.task ⇒ <code>\*</code>
Retrieve the data which should be formed as a task.

**Kind**: instance property of [<code>Queueable</code>](#Queueable)  
<a name="Linker+classType"></a>

### queueable.classType
The class used to create this instance, so that it can be recognized as valid without an instanceof check.

**Kind**: instance property of [<code>Queueable</code>](#Queueable)  
**Overrides**: [<code>classType</code>](#Linker+classType)  
<a name="Queueable+markCompleted"></a>

### queueable.markCompleted([completeResponse]) ⇒ <code>completeResponse</code>
Set this queueable as completed.

**Kind**: instance method of [<code>Queueable</code>](#Queueable)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [completeResponse] | <code>Object</code> | <code>{}</code> | The result to report for the task. |
| [completeResponse.success] | <code>\*</code> | <code>true</code> | Indicate when the task failed (use false) or give a success message |
| [completeResponse.error] | <code>\*</code> | <code>false</code> | Indicate a task was error-free (use false) or give an error message |
| [completeResponse.context] | <code>\*</code> | <code></code> | Provide additional data in the response |

<a name="Queueable+run"></a>

### queueable.run() ⇒ <code>completeResponse</code>
Intend to run the queued task when it is ready. If ready, mark this task as running and run the task.

**Kind**: instance method of [<code>Queueable</code>](#Queueable)  
<a name="Queueable.fromArray"></a>

### Queueable.fromArray(values, [classType]) ⇒ <code>Object</code>
Convert an array into Queueable instances, return the head and tail Queueables.

**Kind**: static method of [<code>Queueable</code>](#Queueable)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| values | <code>Array</code> |  | Provide an array of data that will be converted to a chain of queueable linkers. |
| [classType] | <code>IsLinker</code> | <code>Queueable</code> | Provide the type of IsLinker to use. |

<a name="Queue"></a>

## Queue ⇒ [<code>Queue</code>](#Queue)
Convert an array to a Queue, the first value is at the front.

**Kind**: global variable  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [values] | <code>Array</code> | <code>[]</code> | The items to queue |
| [listClass] | <code>IsArrayable</code> | <code>LinkedList</code> | The type of list used to store the items |
| [linkerClass] | [<code>Linker</code>](#Linker) | <code>Linker</code> | The class used to hold each queued item |


* [Queue](#Queue) ⇒ [<code>Queue</code>](#Queue)
    * [new Queue([queuedList], [listClass], [linkerClass])](#new_Queue_new)
    * [.dequeue()](#Queue+dequeue) ⇒ <code>\*</code> \| <code>null</code>
    * [.empty()](#Queue+empty) ⇒ <code>boolean</code>
    * [.enqueue(data)](#Queue+enqueue) ⇒ [<code>Queue</code>](#Queue)
    * [.peek()](#Queue+peek) ⇒ <code>\*</code> \| <code>null</code>
    * [.size()](#Queue+size) ⇒ <code>number</code>

<a name="new_Queue_new"></a>

### new Queue([queuedList], [listClass], [linkerClass])
Instantiate the queue, optionally with a list of items to start from.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [queuedList] | <code>IsArrayable</code> \| <code>null</code> | <code></code> | The list of linkers to start in this queue (the first is the front) |
| [listClass] | <code>IsArrayable</code> | <code>LinkedList</code> | The type of list to create when no queued list is given |
| [linkerClass] | [<code>Linker</code>](#Linker) | <code>Linker</code> | The class used to hold each queued item |

<a name="Queue+dequeue"></a>

### queue.dequeue() ⇒ <code>\*</code> \| <code>null</code>
Take the item from the front of the queue.

**Kind**: instance method of [<code>Queue</code>](#Queue)  
**Returns**: <code>\*</code> \| <code>null</code> - The item, or null when the queue is empty  
<a name="Queue+empty"></a>

### queue.empty() ⇒ <code>boolean</code>
Check whether the queue has no items.

**Kind**: instance method of [<code>Queue</code>](#Queue)  
<a name="Queue+enqueue"></a>

### queue.enqueue(data) ⇒ [<code>Queue</code>](#Queue)
Add an item to the back of the queue.

**Kind**: instance method of [<code>Queue</code>](#Queue)  
**Returns**: [<code>Queue</code>](#Queue) - This queue, so that adding can be chained  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>\*</code> | The item to add |

<a name="Queue+peek"></a>

### queue.peek() ⇒ <code>\*</code> \| <code>null</code>
Look at the item at the front of the queue, without removing it.

**Kind**: instance method of [<code>Queue</code>](#Queue)  
**Returns**: <code>\*</code> \| <code>null</code> - The item, or null when the queue is empty  
<a name="Queue+size"></a>

### queue.size() ⇒ <code>number</code>
Count the items in the queue.

**Kind**: instance method of [<code>Queue</code>](#Queue)  
<a name="TreeLinker"></a>

## TreeLinker ⇒ [<code>TreeLinker</code>](#TreeLinker)
Make a new DoubleLinker from the data given if it is not already a valid Linker.

**Kind**: global variable  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| linker | [<code>TreeLinker</code>](#TreeLinker) \| <code>\*</code> |  | Return a valid TreeLinker instance from given data, or even an already valid one. |
| [classType] | <code>IsTreeNode</code> | <code>TreeLinker</code> | Provide the type of IsTreeNode to use. |


* [TreeLinker](#TreeLinker) ⇒ [<code>TreeLinker</code>](#TreeLinker)
    * [new TreeLinker([settings], listClass)](#new_TreeLinker_new)
    * _instance_
        * [.classType](#TreeLinker+classType)
        * [.data](#TreeLinker+data)
        * [.next](#TreeLinker+next)
        * [.prev](#TreeLinker+prev)
        * [.parent](#TreeLinker+parent)
        * [.children](#TreeLinker+children)
        * [.childrenFromArray(children, listClass)](#TreeLinker+childrenFromArray) ⇒ [<code>LinkedTreeList</code>](#LinkedTreeList) \| <code>null</code>
    * _static_
        * [.fromArray([values], [classType])](#TreeLinker.fromArray) ⇒ <code>Object</code>

<a name="new_TreeLinker_new"></a>

### new TreeLinker([settings], listClass)
Create the new TreeLinker instance, provide the data and optionally set references for next, prev, parent, or children.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [settings] | <code>Object</code> | <code>{}</code> | The settings for the new tree node. |
| [settings.data] | <code>\*</code> | <code></code> | The data to be stored in this tree node |
| [settings.next] | [<code>TreeLinker</code>](#TreeLinker) | <code></code> | The reference to the next linker if any |
| [settings.prev] | [<code>TreeLinker</code>](#TreeLinker) | <code></code> | The reference to the previous linker if any |
| [settings.children] | [<code>LinkedTreeList</code>](#LinkedTreeList) | <code></code> | The references to child linkers if any |
| [settings.parent] | [<code>TreeLinker</code>](#TreeLinker) | <code></code> | The reference to a parent linker if any |
| listClass | <code>IsArrayable.&lt;IsTreeNode&gt;</code> |  | Give the type of list to use for storing the children |

<a name="TreeLinker+classType"></a>

### treeLinker.classType
The class used to create this instance, so that it can be recognized as valid without an instanceof check.

**Kind**: instance property of [<code>TreeLinker</code>](#TreeLinker)  
**Overrides**: [<code>classType</code>](#DoubleLinker+classType)  
<a name="TreeLinker+data"></a>

### treeLinker.data
The data stored in this tree node.

**Kind**: instance property of [<code>TreeLinker</code>](#TreeLinker)  
**Overrides**: [<code>data</code>](#DoubleLinker+data)  
<a name="TreeLinker+next"></a>

### treeLinker.next
The sibling after this node, or null when this is the last child.

**Kind**: instance property of [<code>TreeLinker</code>](#TreeLinker)  
**Overrides**: [<code>next</code>](#DoubleLinker+next)  
<a name="TreeLinker+prev"></a>

### treeLinker.prev
The sibling before this node, or null when this is the first child.

**Kind**: instance property of [<code>TreeLinker</code>](#TreeLinker)  
**Overrides**: [<code>prev</code>](#DoubleLinker+prev)  
<a name="TreeLinker+parent"></a>

### treeLinker.parent
The node this node is a child of, or null for a root node.

**Kind**: instance property of [<code>TreeLinker</code>](#TreeLinker)  
<a name="TreeLinker+children"></a>

### treeLinker.children
The list of the children of this node, or null when it has none.

**Kind**: instance property of [<code>TreeLinker</code>](#TreeLinker)  
<a name="TreeLinker+childrenFromArray"></a>

### treeLinker.childrenFromArray(children, listClass) ⇒ [<code>LinkedTreeList</code>](#LinkedTreeList) \| <code>null</code>
Create the children for this tree from an array. Each child becomes a tree linker with this node as its parent: an
existing linker is kept as it is, an object with a data property gives the settings of the linker, and anything
else is the data of the linker.

**Kind**: instance method of [<code>TreeLinker</code>](#TreeLinker)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| children | <code>Array</code> \| <code>null</code> | <code></code> | Provide an array of data / linker references to be children of this tree node. |
| listClass | <code>IsArrayable.&lt;IsTreeNode&gt;</code> |  | Give the type of list to use for storing the children |

<a name="TreeLinker.fromArray"></a>

### TreeLinker.fromArray([values], [classType]) ⇒ <code>Object</code>
Convert an array into DoubleLinker instances, return the head and tail DoubleLinkers.

**Kind**: static method of [<code>TreeLinker</code>](#TreeLinker)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [values] | <code>Array</code> | <code>[]</code> | Provide an array of data that will be converted to a chain of tree-linkers. |
| [classType] | <code>IsTreeNode</code> | <code>TreeLinker</code> | Provide the type of IsTreeNode to use. |

<a name="LinkedTreeList"></a>

## LinkedTreeList ⇒ [<code>LinkedTreeList</code>](#LinkedTreeList)
Convert an array into a LinkedTreeList instance, return the new instance.

**Kind**: global variable  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [values] | <code>Array</code> | <code>[]</code> | An array of values which will be converted to nodes in this tree-list |
| [linkerClass] | [<code>TreeLinker</code>](#TreeLinker) | <code>TreeLinker</code> | The class to use for each node |
| [classType] | [<code>IsArrayable.&lt;TreeLinker&gt;</code>](#TreeLinker) | <code>LinkedTreeList</code> | Provide the type of IsArrayable to use. |


* [LinkedTreeList](#LinkedTreeList) ⇒ [<code>LinkedTreeList</code>](#LinkedTreeList)
    * [new LinkedTreeList([linkerClass])](#new_LinkedTreeList_new)
    * [.classType](#LinkedTreeList+classType)
    * [.innerList](#LinkedTreeList+innerList)
    * [.initialized](#LinkedTreeList+initialized)
    * [.tailCache](#LinkedTreeList+tailCache)
    * [.countCache](#LinkedTreeList+countCache)
    * [.ownerNode](#LinkedTreeList+ownerNode)
    * [.list](#LinkedTreeList+list) ⇒ [<code>TreeLinker</code>](#TreeLinker)
    * [.first](#LinkedTreeList+first) ⇒ [<code>TreeLinker</code>](#TreeLinker)
    * [.last](#LinkedTreeList+last) ⇒ [<code>TreeLinker</code>](#TreeLinker)
    * [.length](#LinkedTreeList+length) ⇒ <code>number</code>
    * [.parent](#LinkedTreeList+parent) ⇒ [<code>TreeLinker</code>](#TreeLinker) \| <code>null</code>
    * [.parent](#LinkedTreeList+parent)
    * [.rootParent](#LinkedTreeList+rootParent) ⇒ [<code>TreeLinker</code>](#TreeLinker)
    * [.initialize(initialList)](#LinkedTreeList+initialize) ⇒ [<code>LinkedTreeList</code>](#LinkedTreeList)
    * [.setChildren(item, [children])](#LinkedTreeList+setChildren)
    * [.adopt(newNode)](#LinkedTreeList+adopt) ⇒ [<code>TreeLinker</code>](#TreeLinker)
    * [.insertAfter(node, newNode)](#LinkedTreeList+insertAfter) ⇒ [<code>LinkedTreeList</code>](#LinkedTreeList)
    * [.insertBefore(node, newNode)](#LinkedTreeList+insertBefore) ⇒ [<code>LinkedTreeList</code>](#LinkedTreeList)
    * [.append(node, after)](#LinkedTreeList+append) ⇒ [<code>TreeLinker</code>](#TreeLinker)
    * [.prepend(node, before)](#LinkedTreeList+prepend) ⇒ [<code>TreeLinker</code>](#TreeLinker)
    * [.remove(node)](#LinkedTreeList+remove) ⇒ [<code>TreeLinker</code>](#TreeLinker) \| <code>null</code>
    * [.reset()](#LinkedTreeList+reset) ⇒ [<code>TreeLinker</code>](#TreeLinker)
    * [.item(index)](#LinkedTreeList+item) ⇒ [<code>TreeLinker</code>](#TreeLinker) \| <code>null</code>
    * [.forEach(callback, thisArg)](#LinkedTreeList+forEach) ⇒ [<code>LinkedTreeList</code>](#LinkedTreeList)
    * [.indexOfElement(node)](#Arrayable+indexOfElement) ⇒ <code>number</code>

<a name="new_LinkedTreeList_new"></a>

### new LinkedTreeList([linkerClass])
Create the new LinkedTreeList instance, configure the list class.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [linkerClass] | [<code>TreeLinker</code>](#TreeLinker) | <code>TreeLinker</code> | The class used to wrap given data as tree linkers. |

<a name="LinkedTreeList+classType"></a>

### linkedTreeList.classType
The class used to create this instance, so that it can be recognized as valid without an instanceof check.

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>classType</code>](#DoublyLinkedList+classType)  
<a name="LinkedTreeList+innerList"></a>

### linkedTreeList.innerList
A linker of the list (null when the list is empty); the head is found by walking back from it.

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>innerList</code>](#DoublyLinkedList+innerList)  
<a name="LinkedTreeList+initialized"></a>

### linkedTreeList.initialized
Whether the inner list has been initialized (it can only be initialized once).

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>initialized</code>](#DoublyLinkedList+initialized)  
<a name="LinkedTreeList+tailCache"></a>

### linkedTreeList.tailCache
The last linker, remembered so that adding to the end does not need to walk the whole list (null when not known yet).

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>tailCache</code>](#DoublyLinkedList+tailCache)  
<a name="LinkedTreeList+countCache"></a>

### linkedTreeList.countCache
The number of linkers, kept up to date by the list's own methods so that the length does not need to walk the whole list (null when not known yet).

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>countCache</code>](#DoublyLinkedList+countCache)  
<a name="LinkedTreeList+ownerNode"></a>

### linkedTreeList.ownerNode
The node these linkers are the children of, remembered so that it is known even while the list is empty (undefined until it is known).

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
<a name="LinkedTreeList+list"></a>

### linkedTreeList.list ⇒ [<code>TreeLinker</code>](#TreeLinker)
Retrieve the innerList used (the list itself, not a copy).

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>list</code>](#DoublyLinkedList+list)  
<a name="LinkedTreeList+first"></a>

### linkedTreeList.first ⇒ [<code>TreeLinker</code>](#TreeLinker)
Retrieve the first TreeLinker in the list.

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>first</code>](#DoublyLinkedList+first)  
<a name="LinkedTreeList+last"></a>

### linkedTreeList.last ⇒ [<code>TreeLinker</code>](#TreeLinker)
Retrieve the last TreeLinker in the list. The end is remembered, so this does not walk the list.

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>last</code>](#DoublyLinkedList+last)  
<a name="LinkedTreeList+length"></a>

### linkedTreeList.length ⇒ <code>number</code>
Return the length of the list. It is kept up to date by the list's own methods, so this does not walk the list
(call reset() after linkers were changed directly).

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>length</code>](#DoublyLinkedList+length)  
<a name="LinkedTreeList+parent"></a>

### linkedTreeList.parent ⇒ [<code>TreeLinker</code>](#TreeLinker) \| <code>null</code>
Get the parent of this tree list: the node these linkers are the children of (remembered even while the list is
empty), or null for the linkers at the top of a tree.

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
<a name="LinkedTreeList+parent"></a>

### linkedTreeList.parent
Set the parent of this tree list: every linker in it gets the node as its parent, and the node gets this list as its
children. Linkers added to the list later get this parent too.

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  

| Param | Type | Description |
| --- | --- | --- |
| parent | [<code>TreeLinker</code>](#TreeLinker) \| <code>null</code> | The new node to use as the parent for this group of children |

<a name="LinkedTreeList+rootParent"></a>

### linkedTreeList.rootParent ⇒ [<code>TreeLinker</code>](#TreeLinker)
Return the root parent of the entire tree.

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
<a name="LinkedTreeList+initialize"></a>

### linkedTreeList.initialize(initialList) ⇒ [<code>LinkedTreeList</code>](#LinkedTreeList)
Initialize the inner list, should only run once.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>initialize</code>](#DoublyLinkedList+initialize)  

| Param | Type | Description |
| --- | --- | --- |
| initialList | [<code>TreeLinker</code>](#TreeLinker) | Give the list of tree-linkers to start in this linked-tree-list. |

<a name="LinkedTreeList+setChildren"></a>

### linkedTreeList.setChildren(item, [children])
Set the children on a parent item.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Throws**:

- <code>Error</code> When the item is not one of the linkers of this list


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| item | [<code>TreeLinker</code>](#TreeLinker) |  | The TreeLinker node (one of the linkers of this list) that will be the parent of the children |
| [children] | [<code>LinkedTreeList</code>](#LinkedTreeList) \| <code>null</code> | <code></code> | The LinkedTreeList which has the child nodes to use, or null to remove the children of the item |

<a name="LinkedTreeList+adopt"></a>

### linkedTreeList.adopt(newNode) ⇒ [<code>TreeLinker</code>](#TreeLinker)
Make a linker of the given node (or data) and make this list's parent its parent.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  

| Param | Type | Description |
| --- | --- | --- |
| newNode | [<code>TreeLinker</code>](#TreeLinker) \| <code>\*</code> | The node (or data) which is being added to this list |

<a name="LinkedTreeList+insertAfter"></a>

### linkedTreeList.insertAfter(node, newNode) ⇒ [<code>LinkedTreeList</code>](#LinkedTreeList)
Insert a new node (or data) after a node. The new node gets the parent of this list.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>insertAfter</code>](#DoublyLinkedList+insertAfter)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>TreeLinker</code>](#TreeLinker) \| <code>\*</code> | The existing node as reference, or null to insert at the start of the list |
| newNode | [<code>TreeLinker</code>](#TreeLinker) \| <code>\*</code> | The new node to go after the existing node |

<a name="LinkedTreeList+insertBefore"></a>

### linkedTreeList.insertBefore(node, newNode) ⇒ [<code>LinkedTreeList</code>](#LinkedTreeList)
Insert a new node (or data) before a node. The new node gets the parent of this list.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>insertBefore</code>](#DoublyLinkedList+insertBefore)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>TreeLinker</code>](#TreeLinker) \| <code>\*</code> | The existing node as reference, or null to insert at the end of the list |
| newNode | [<code>TreeLinker</code>](#TreeLinker) \| <code>\*</code> | The new node to go before the existing node |

<a name="LinkedTreeList+append"></a>

### linkedTreeList.append(node, after) ⇒ [<code>TreeLinker</code>](#TreeLinker)
Add a node (or data) after the given (or last) node in the list.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>append</code>](#DoublyLinkedList+append)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>TreeLinker</code>](#TreeLinker) \| <code>\*</code> | The new node to add to the end of the list |
| after | [<code>TreeLinker</code>](#TreeLinker) | The existing last node |

<a name="LinkedTreeList+prepend"></a>

### linkedTreeList.prepend(node, before) ⇒ [<code>TreeLinker</code>](#TreeLinker)
Add a node (or data) before the given (or first) node in the list.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>prepend</code>](#DoublyLinkedList+prepend)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>TreeLinker</code>](#TreeLinker) \| <code>\*</code> | The new node to add to the start of the list |
| before | [<code>TreeLinker</code>](#TreeLinker) | The existing first node |

<a name="LinkedTreeList+remove"></a>

### linkedTreeList.remove(node) ⇒ [<code>TreeLinker</code>](#TreeLinker) \| <code>null</code>
Remove a linker from this linked list. The removed node no longer has a parent.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>remove</code>](#DoublyLinkedList+remove)  
**Returns**: [<code>TreeLinker</code>](#TreeLinker) \| <code>null</code> - The removed node, or null when there was nothing to remove  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>TreeLinker</code>](#TreeLinker) | The node we wish to remove (and it will be returned after removal) |

<a name="LinkedTreeList+reset"></a>

### linkedTreeList.reset() ⇒ [<code>TreeLinker</code>](#TreeLinker)
Refresh all references (the head, the end and the length) by walking the list once, and return the head. The
list's own methods keep these up to date, so this is only needed after linkers were changed directly.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>reset</code>](#DoublyLinkedList+reset)  
<a name="LinkedTreeList+item"></a>

### linkedTreeList.item(index) ⇒ [<code>TreeLinker</code>](#TreeLinker) \| <code>null</code>
Retrieve a TreeLinker item from this list by numeric index, otherwise return null.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>item</code>](#DoublyLinkedList+item)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The integer number for retrieving a node by position. |

<a name="LinkedTreeList+forEach"></a>

### linkedTreeList.forEach(callback, thisArg) ⇒ [<code>LinkedTreeList</code>](#LinkedTreeList)
Be able to run forEach on this LinkedTreeList to iterate over the TreeLinker Items.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>forEach</code>](#DoublyLinkedList+forEach)  
**Returns**: [<code>LinkedTreeList</code>](#LinkedTreeList) - The list which was iterated.  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>forEachCallback</code> | The function to call for-each tree node |
| thisArg | [<code>LinkedTreeList</code>](#LinkedTreeList) | Optional, 'this' reference |

<a name="Arrayable+indexOfElement"></a>

### linkedTreeList.indexOfElement(node) ⇒ <code>number</code>
Find the position of an element which must be in this list.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>indexOfElement</code>](#Arrayable+indexOfElement)  
**Throws**:

- <code>Error</code> When the element is not in this list


| Param | Type | Description |
| --- | --- | --- |
| node | [<code>ArrayElement</code>](#ArrayElement) | The element to find |

<a name="Linker"></a>

## Linker ⇒ [<code>Linker</code>](#Linker)
Make a new Linker from the data given if it is not already a valid Linker.

**Kind**: global variable  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| linker | [<code>Linker</code>](#Linker) \| <code>\*</code> |  | Return a valid Linker instance from given data, or even an already valid one. |
| [classType] | <code>IsLinker</code> | <code>Linker</code> | Provide the type of IsLinker to use. |


* [Linker](#Linker) ⇒ [<code>Linker</code>](#Linker)
    * [new Linker([nodeData])](#new_Linker_new)
    * _instance_
        * [.classType](#Linker+classType)
        * [.data](#Linker+data)
        * [.next](#Linker+next)
    * _static_
        * [.fromArray([values], [classType])](#Linker.fromArray) ⇒ <code>Object</code>

<a name="new_Linker_new"></a>

### new Linker([nodeData])
Create the new Linker instance, provide the data and optionally give the next Linker.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [nodeData] | <code>Object</code> | <code>{}</code> | The settings for the new linker. |
| [nodeData.data] | <code>\*</code> | <code></code> | The data to be stored in this linker |
| [nodeData.next] | [<code>Linker</code>](#Linker) \| <code>null</code> | <code></code> | The reference to the next linker if any |

<a name="Linker+classType"></a>

### linker.classType
The class used to create this instance, so that it can be recognized as valid without an instanceof check.

**Kind**: instance property of [<code>Linker</code>](#Linker)  
**Overrides**: [<code>classType</code>](#ArrayElement+classType)  
<a name="Linker+data"></a>

### linker.data
The data stored in this linker.

**Kind**: instance property of [<code>Linker</code>](#Linker)  
**Overrides**: [<code>data</code>](#ArrayElement+data)  
<a name="Linker+next"></a>

### linker.next
The linker after this one, or null when this is the last.

**Kind**: instance property of [<code>Linker</code>](#Linker)  
<a name="Linker.fromArray"></a>

### Linker.fromArray([values], [classType]) ⇒ <code>Object</code>
Convert an array into Linker instances, return the head and tail Linkers.

**Kind**: static method of [<code>Linker</code>](#Linker)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [values] | <code>Array</code> | <code>[]</code> | Provide an array of data that will be converted to a chain of linkers. |
| [classType] | <code>IsLinker</code> | <code>Linker</code> | Provide the type of IsLinker to use. |

<a name="LinkedList"></a>

## LinkedList ⇒ [<code>LinkedList</code>](#LinkedList)
Convert an array to a LinkedList.

**Kind**: global variable  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| values | <code>Array</code> |  | An array of values which will be converted to linkers in this linked-list |
| linkerClass | <code>IsLinker</code> |  | The class to use for each linker |
| [classType] | [<code>IsArrayable.&lt;Linker&gt;</code>](#Linker) | <code>LinkedList</code> | Provide the type of IsArrayable to use. |


* [LinkedList](#LinkedList) ⇒ [<code>LinkedList</code>](#LinkedList)
    * [new LinkedList([linkerClass])](#new_LinkedList_new)
    * [.classType](#LinkedList+classType)
    * [.innerList](#LinkedList+innerList)
    * [.initialized](#LinkedList+initialized)
    * [.tailCache](#LinkedList+tailCache)
    * [.countCache](#LinkedList+countCache)
    * [.list](#LinkedList+list) ⇒ [<code>Linker</code>](#Linker)
    * [.first](#LinkedList+first) ⇒ [<code>Linker</code>](#Linker)
    * [.last](#LinkedList+last) ⇒ [<code>Linker</code>](#Linker)
    * [.length](#LinkedList+length) ⇒ <code>number</code>
    * [.initialize(initialList)](#LinkedList+initialize) ⇒ [<code>LinkedList</code>](#LinkedList)
    * [.insertAfter(node, newNode)](#LinkedList+insertAfter) ⇒ [<code>LinkedList</code>](#LinkedList)
    * [.insertBefore(node, newNode)](#LinkedList+insertBefore) ⇒ [<code>LinkedList</code>](#LinkedList)
    * [.append(node, after)](#LinkedList+append) ⇒ [<code>Linker</code>](#Linker)
    * [.prepend(node, before)](#LinkedList+prepend) ⇒ [<code>Linker</code>](#Linker)
    * [.remove(node)](#LinkedList+remove) ⇒ [<code>Linker</code>](#Linker) \| <code>null</code>
    * [.reset()](#LinkedList+reset) ⇒ [<code>Linker</code>](#Linker) \| <code>null</code>
    * [.item(index)](#LinkedList+item) ⇒ [<code>Linker</code>](#Linker) \| <code>null</code>
    * [.forEach(callback, thisArg)](#LinkedList+forEach) ⇒ [<code>LinkedList</code>](#LinkedList)
    * [.indexOfElement(node)](#Arrayable+indexOfElement) ⇒ <code>number</code>

<a name="new_LinkedList_new"></a>

### new LinkedList([linkerClass])
Create the new LinkedList instance.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [linkerClass] | [<code>Linker</code>](#Linker) | <code>Linker</code> | The class used to wrap given data as linkers. |

<a name="LinkedList+classType"></a>

### linkedList.classType
The class used to create this instance, so that it can be recognized as valid without an instanceof check.

**Kind**: instance property of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>classType</code>](#Arrayable+classType)  
<a name="LinkedList+innerList"></a>

### linkedList.innerList
The first linker of the list (null when the list is empty), from which the whole list is reached.

**Kind**: instance property of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>innerList</code>](#Arrayable+innerList)  
<a name="LinkedList+initialized"></a>

### linkedList.initialized
Whether the inner list has been initialized (it can only be initialized once).

**Kind**: instance property of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>initialized</code>](#Arrayable+initialized)  
<a name="LinkedList+tailCache"></a>

### linkedList.tailCache
The last linker, remembered so that adding to the end does not need to walk the whole list (null when not known yet).

**Kind**: instance property of [<code>LinkedList</code>](#LinkedList)  
<a name="LinkedList+countCache"></a>

### linkedList.countCache
The number of linkers, kept up to date by the list's own methods so that the length does not need to walk the whole list (null when not known yet).

**Kind**: instance property of [<code>LinkedList</code>](#LinkedList)  
<a name="LinkedList+list"></a>

### linkedList.list ⇒ [<code>Linker</code>](#Linker)
Retrieve the innerList used (the list itself, not a copy).

**Kind**: instance property of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>list</code>](#Arrayable+list)  
<a name="LinkedList+first"></a>

### linkedList.first ⇒ [<code>Linker</code>](#Linker)
Retrieve the first Linker in the list.

**Kind**: instance property of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>first</code>](#Arrayable+first)  
<a name="LinkedList+last"></a>

### linkedList.last ⇒ [<code>Linker</code>](#Linker)
Retrieve the last Linker in the list. The end is remembered, so this does not walk the list.

**Kind**: instance property of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>last</code>](#Arrayable+last)  
<a name="LinkedList+length"></a>

### linkedList.length ⇒ <code>number</code>
Return the length of the list. It is kept up to date by the list's own methods, so this does not walk the list
(call reset() after linkers were changed directly).

**Kind**: instance property of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>length</code>](#Arrayable+length)  
<a name="LinkedList+initialize"></a>

### linkedList.initialize(initialList) ⇒ [<code>LinkedList</code>](#LinkedList)
Initialize the inner list, should only run once.

**Kind**: instance method of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>initialize</code>](#Arrayable+initialize)  

| Param | Type | Description |
| --- | --- | --- |
| initialList | [<code>Linker</code>](#Linker) \| <code>Array</code> | Give the list of linkers to start in this linked-list. |

<a name="LinkedList+insertAfter"></a>

### linkedList.insertAfter(node, newNode) ⇒ [<code>LinkedList</code>](#LinkedList)
Insert a new node (or data) after a node.

**Kind**: instance method of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>insertAfter</code>](#Arrayable+insertAfter)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>Linker</code>](#Linker) \| <code>\*</code> | The existing node as reference, or null to insert at the start of the list |
| newNode | [<code>Linker</code>](#Linker) \| <code>\*</code> | The new node to go after the existing node |

<a name="LinkedList+insertBefore"></a>

### linkedList.insertBefore(node, newNode) ⇒ [<code>LinkedList</code>](#LinkedList)
Insert a new node (or data) before a node.

**Kind**: instance method of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>insertBefore</code>](#Arrayable+insertBefore)  
**Throws**:

- <code>Error</code> When the reference node is not in this list


| Param | Type | Description |
| --- | --- | --- |
| node | [<code>Linker</code>](#Linker) \| <code>\*</code> | The existing node as reference, or null to insert at the end of the list |
| newNode | [<code>Linker</code>](#Linker) \| <code>\*</code> | The new node to go before the existing node |

<a name="LinkedList+append"></a>

### linkedList.append(node, after) ⇒ [<code>Linker</code>](#Linker)
Add a node (or data) after the given (or last) node in the list.

**Kind**: instance method of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>append</code>](#Arrayable+append)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>Linker</code>](#Linker) \| <code>\*</code> | The new node to add to the end of the list |
| after | [<code>Linker</code>](#Linker) | The existing last node |

<a name="LinkedList+prepend"></a>

### linkedList.prepend(node, before) ⇒ [<code>Linker</code>](#Linker)
Add a node (or data) before the given (or first) node in the list.

**Kind**: instance method of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>prepend</code>](#Arrayable+prepend)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>Linker</code>](#Linker) \| <code>\*</code> | The new node to add to the start of the list |
| before | [<code>Linker</code>](#Linker) | The existing first node |

<a name="LinkedList+remove"></a>

### linkedList.remove(node) ⇒ [<code>Linker</code>](#Linker) \| <code>null</code>
Remove a linker from this linked list.

**Kind**: instance method of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>remove</code>](#Arrayable+remove)  
**Returns**: [<code>Linker</code>](#Linker) \| <code>null</code> - The removed node, or null when it was not in this list (nothing is removed)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>Linker</code>](#Linker) | The node we wish to remove (and it will be returned after removal) |

<a name="LinkedList+reset"></a>

### linkedList.reset() ⇒ [<code>Linker</code>](#Linker) \| <code>null</code>
Refresh the remembered end and length of the list by walking it once. The list's own methods keep these up to date,
so this is only needed after linkers were changed directly (for example by setting next on a linker).

**Kind**: instance method of [<code>LinkedList</code>](#LinkedList)  
**Returns**: [<code>Linker</code>](#Linker) \| <code>null</code> - The first linker of the list  
<a name="LinkedList+item"></a>

### linkedList.item(index) ⇒ [<code>Linker</code>](#Linker) \| <code>null</code>
Retrieve a Linker item from this list by numeric index, otherwise return null.

**Kind**: instance method of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>item</code>](#Arrayable+item)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The integer number for retrieving a node by position. |

<a name="LinkedList+forEach"></a>

### linkedList.forEach(callback, thisArg) ⇒ [<code>LinkedList</code>](#LinkedList)
Be able to run forEach on this LinkedList to iterate over the linkers.

**Kind**: instance method of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>forEach</code>](#Arrayable+forEach)  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>forEachCallback</code> | The function to call for-each linker |
| thisArg | [<code>LinkedList</code>](#LinkedList) | Optional, 'this' reference |

<a name="Arrayable+indexOfElement"></a>

### linkedList.indexOfElement(node) ⇒ <code>number</code>
Find the position of an element which must be in this list.

**Kind**: instance method of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>indexOfElement</code>](#Arrayable+indexOfElement)  
**Throws**:

- <code>Error</code> When the element is not in this list


| Param | Type | Description |
| --- | --- | --- |
| node | [<code>ArrayElement</code>](#ArrayElement) | The element to find |

<a name="DoublyLinkedList"></a>

## DoublyLinkedList ⇒ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
Convert an array into a DoublyLinkedList instance, return the new instance.

**Kind**: global variable  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [values] | <code>Array</code> | <code>[]</code> | An array of values which will be converted to linkers in this doubly-linked-list |
| [linkerClass] | <code>IsDoubleLinker</code> | <code>DoubleLinker</code> | The class to use for each linker |
| [classType] | <code>IsArrayable.&lt;IsDoubleLinker&gt;</code> | <code>LinkedList</code> | Provide the type of IsArrayable to use. |


* [DoublyLinkedList](#DoublyLinkedList) ⇒ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
    * [new DoublyLinkedList([linkerClass])](#new_DoublyLinkedList_new)
    * [.classType](#DoublyLinkedList+classType)
    * [.innerList](#DoublyLinkedList+innerList)
    * [.initialized](#DoublyLinkedList+initialized)
    * [.tailCache](#DoublyLinkedList+tailCache)
    * [.countCache](#DoublyLinkedList+countCache)
    * [.list](#DoublyLinkedList+list) ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
    * [.first](#DoublyLinkedList+first) ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
    * [.last](#DoublyLinkedList+last) ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
    * [.length](#DoublyLinkedList+length) ⇒ <code>number</code>
    * [.initialize(initialList)](#DoublyLinkedList+initialize) ⇒ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
    * [.insertAfter(node, newNode)](#DoublyLinkedList+insertAfter) ⇒ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
    * [.insertBefore(node, newNode)](#DoublyLinkedList+insertBefore) ⇒ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
    * [.append(node, after)](#DoublyLinkedList+append) ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
    * [.prepend(node, before)](#DoublyLinkedList+prepend) ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
    * [.remove(node)](#DoublyLinkedList+remove) ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
    * [.reset()](#DoublyLinkedList+reset) ⇒ [<code>DoubleLinker</code>](#DoubleLinker) \| <code>null</code>
    * [.item(index)](#DoublyLinkedList+item) ⇒ [<code>DoubleLinker</code>](#DoubleLinker) \| <code>null</code>
    * [.forEach(callback, thisArg)](#DoublyLinkedList+forEach) ⇒ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
    * [.indexOfElement(node)](#Arrayable+indexOfElement) ⇒ <code>number</code>

<a name="new_DoublyLinkedList_new"></a>

### new DoublyLinkedList([linkerClass])
Create the new DoublyLinkedList instance.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [linkerClass] | [<code>DoubleLinker</code>](#DoubleLinker) | <code>DoubleLinker</code> | The class used to wrap given data as linkers. |

<a name="DoublyLinkedList+classType"></a>

### doublyLinkedList.classType
The class used to create this instance, so that it can be recognized as valid without an instanceof check.

**Kind**: instance property of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>classType</code>](#LinkedList+classType)  
<a name="DoublyLinkedList+innerList"></a>

### doublyLinkedList.innerList
A linker of the list (null when the list is empty); the head is found by walking back from it.

**Kind**: instance property of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>innerList</code>](#LinkedList+innerList)  
<a name="DoublyLinkedList+initialized"></a>

### doublyLinkedList.initialized
Whether the inner list has been initialized (it can only be initialized once).

**Kind**: instance property of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>initialized</code>](#LinkedList+initialized)  
<a name="DoublyLinkedList+tailCache"></a>

### doublyLinkedList.tailCache
The last linker, remembered so that adding to the end does not need to walk the whole list (null when not known yet).

**Kind**: instance property of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>tailCache</code>](#LinkedList+tailCache)  
<a name="DoublyLinkedList+countCache"></a>

### doublyLinkedList.countCache
The number of linkers, kept up to date by the list's own methods so that the length does not need to walk the whole list (null when not known yet).

**Kind**: instance property of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>countCache</code>](#LinkedList+countCache)  
<a name="DoublyLinkedList+list"></a>

### doublyLinkedList.list ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
Retrieve the innerList used (the list itself, not a copy).

**Kind**: instance property of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>list</code>](#LinkedList+list)  
<a name="DoublyLinkedList+first"></a>

### doublyLinkedList.first ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
Retrieve the first DoubleLinker in the list.

**Kind**: instance property of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>first</code>](#LinkedList+first)  
<a name="DoublyLinkedList+last"></a>

### doublyLinkedList.last ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
Retrieve the last DoubleLinker in the list. The end is remembered, so this does not walk the list.

**Kind**: instance property of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>last</code>](#LinkedList+last)  
<a name="DoublyLinkedList+length"></a>

### doublyLinkedList.length ⇒ <code>number</code>
Return the length of the list. It is kept up to date by the list's own methods, so this does not walk the list
(call reset() after linkers were changed directly).

**Kind**: instance property of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>length</code>](#LinkedList+length)  
<a name="DoublyLinkedList+initialize"></a>

### doublyLinkedList.initialize(initialList) ⇒ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
Initialize the inner list, should only run once.

**Kind**: instance method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>initialize</code>](#LinkedList+initialize)  

| Param | Type | Description |
| --- | --- | --- |
| initialList | [<code>DoubleLinker</code>](#DoubleLinker) | Give the list of double-linkers to start in this doubly linked-list. |

<a name="DoublyLinkedList+insertAfter"></a>

### doublyLinkedList.insertAfter(node, newNode) ⇒ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
Insert a new node (or data) after a node.

**Kind**: instance method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>insertAfter</code>](#LinkedList+insertAfter)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>\*</code> | The existing node as reference (which must be in this list, this is not checked), or null to insert at the start of the list |
| newNode | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>\*</code> | The new node to go after the existing node |

<a name="DoublyLinkedList+insertBefore"></a>

### doublyLinkedList.insertBefore(node, newNode) ⇒ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
Insert a new node (or data) before a node.

**Kind**: instance method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>insertBefore</code>](#LinkedList+insertBefore)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>\*</code> | The existing node as reference (which must be in this list, this is not checked), or null to insert at the end of the list |
| newNode | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>\*</code> | The new node to go before the existing node |

<a name="DoublyLinkedList+append"></a>

### doublyLinkedList.append(node, after) ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
Add a node (or data) after the given (or last) node in the list.

**Kind**: instance method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>append</code>](#LinkedList+append)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>\*</code> | The new node to add to the end of the list |
| after | [<code>DoubleLinker</code>](#DoubleLinker) | The existing last node |

<a name="DoublyLinkedList+prepend"></a>

### doublyLinkedList.prepend(node, before) ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
Add a node (or data) before the given (or first) node in the list.

**Kind**: instance method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>prepend</code>](#LinkedList+prepend)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>\*</code> | The new node to add to the start of the list |
| before | [<code>DoubleLinker</code>](#DoubleLinker) | The existing first node |

<a name="DoublyLinkedList+remove"></a>

### doublyLinkedList.remove(node) ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
Remove a linker from this linked list.

**Kind**: instance method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>remove</code>](#LinkedList+remove)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>DoubleLinker</code>](#DoubleLinker) | The node we wish to remove (and it will be returned after removal) |

<a name="DoublyLinkedList+reset"></a>

### doublyLinkedList.reset() ⇒ [<code>DoubleLinker</code>](#DoubleLinker) \| <code>null</code>
Refresh all references (the head, the end and the length) by walking the list once, and return the head. The list's
own methods keep these up to date, so this is only needed after linkers were changed directly.

**Kind**: instance method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>reset</code>](#LinkedList+reset)  
<a name="DoublyLinkedList+item"></a>

### doublyLinkedList.item(index) ⇒ [<code>DoubleLinker</code>](#DoubleLinker) \| <code>null</code>
Retrieve a DoubleLinker item from this list by numeric index, otherwise return null.

**Kind**: instance method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>item</code>](#LinkedList+item)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The integer number for retrieving a node by position. |

<a name="DoublyLinkedList+forEach"></a>

### doublyLinkedList.forEach(callback, thisArg) ⇒ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
Be able to run forEach on this DoublyLinkedList to iterate over the DoubleLinker Items.

**Kind**: instance method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>forEach</code>](#LinkedList+forEach)  
**Returns**: [<code>DoublyLinkedList</code>](#DoublyLinkedList) - The list which was iterated.  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>forEachCallback</code> | The function to call for-each double linker |
| thisArg | [<code>DoublyLinkedList</code>](#DoublyLinkedList) | Optional, 'this' reference |

<a name="Arrayable+indexOfElement"></a>

### doublyLinkedList.indexOfElement(node) ⇒ <code>number</code>
Find the position of an element which must be in this list.

**Kind**: instance method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>indexOfElement</code>](#Arrayable+indexOfElement)  
**Throws**:

- <code>Error</code> When the element is not in this list


| Param | Type | Description |
| --- | --- | --- |
| node | [<code>ArrayElement</code>](#ArrayElement) | The element to find |

<a name="DoubleLinker"></a>

## DoubleLinker ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
Make a new DoubleLinker from the data given if it is not already a valid Linker.

**Kind**: global variable  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| linker | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>\*</code> |  | Return a valid Linker instance from given data, or even an already valid one. |
| [classType] | <code>IsDoubleLinker</code> | <code>DoubleLinker</code> | Provide the type of IsDoubleLinker to use. |


* [DoubleLinker](#DoubleLinker) ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
    * [new DoubleLinker([nodeData])](#new_DoubleLinker_new)
    * _instance_
        * [.classType](#DoubleLinker+classType)
        * [.data](#DoubleLinker+data)
        * [.next](#DoubleLinker+next)
        * [.prev](#DoubleLinker+prev)
    * _static_
        * [.fromArray([values], [classType])](#DoubleLinker.fromArray) ⇒ <code>Object</code>

<a name="new_DoubleLinker_new"></a>

### new DoubleLinker([nodeData])
Create the new DoubleLinker instance, provide the data and optionally the next and prev references.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [nodeData] | <code>Object</code> | <code>{}</code> | The settings for the new linker. |
| [nodeData.data] | <code>\*</code> | <code></code> | The data to be stored in this linker |
| [nodeData.next] | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>null</code> | <code></code> | The reference to the next linker if any |
| [nodeData.prev] | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>null</code> | <code></code> | The reference to the previous linker if any |

<a name="DoubleLinker+classType"></a>

### doubleLinker.classType
The class used to create this instance, so that it can be recognized as valid without an instanceof check.

**Kind**: instance property of [<code>DoubleLinker</code>](#DoubleLinker)  
**Overrides**: [<code>classType</code>](#Linker+classType)  
<a name="DoubleLinker+data"></a>

### doubleLinker.data
The data stored in this linker.

**Kind**: instance property of [<code>DoubleLinker</code>](#DoubleLinker)  
**Overrides**: [<code>data</code>](#Linker+data)  
<a name="DoubleLinker+next"></a>

### doubleLinker.next
The linker after this one, or null when this is the last.

**Kind**: instance property of [<code>DoubleLinker</code>](#DoubleLinker)  
**Overrides**: [<code>next</code>](#Linker+next)  
<a name="DoubleLinker+prev"></a>

### doubleLinker.prev
The linker before this one, or null when this is the first.

**Kind**: instance property of [<code>DoubleLinker</code>](#DoubleLinker)  
<a name="DoubleLinker.fromArray"></a>

### DoubleLinker.fromArray([values], [classType]) ⇒ <code>Object</code>
Convert an array into DoubleLinker instances, return the head and tail DoubleLinkers.

**Kind**: static method of [<code>DoubleLinker</code>](#DoubleLinker)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [values] | <code>Array</code> | <code>[]</code> | Provide an array of data that will be converted to a chain of linkers. |
| [classType] | <code>IsDoubleLinker</code> | <code>DoubleLinker</code> | Provide the type of IsDoubleLinker to use. |

<a name="Arrayable"></a>

## Arrayable ⇒ [<code>Arrayable</code>](#Arrayable)
Convert an array to an Arrayable.

**Kind**: global variable  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| values | <code>Array</code> |  | An array of values which will be converted to elements in this arrayable |
| [elementClass] | <code>IsElement</code> | <code>ArrayElement</code> | The class to use for each element |
| [classType] | [<code>IsArrayable.&lt;ArrayElement&gt;</code>](#ArrayElement) | <code>Arrayable</code> | Provide the type of IsArrayable to use. |


* [Arrayable](#Arrayable) ⇒ [<code>Arrayable</code>](#Arrayable)
    * [new Arrayable([elementClass])](#new_Arrayable_new)
    * [.classType](#Arrayable+classType)
    * [.innerList](#Arrayable+innerList)
    * [.initialized](#Arrayable+initialized)
    * [.list](#Arrayable+list) ⇒ [<code>Array.&lt;ArrayElement&gt;</code>](#ArrayElement)
    * [.first](#Arrayable+first) ⇒ [<code>ArrayElement</code>](#ArrayElement) \| <code>null</code>
    * [.last](#Arrayable+last) ⇒ [<code>ArrayElement</code>](#ArrayElement) \| <code>null</code>
    * [.length](#Arrayable+length) ⇒ <code>number</code>
    * [.indexOfElement(node)](#Arrayable+indexOfElement) ⇒ <code>number</code>
    * [.initialize(initialList)](#Arrayable+initialize) ⇒ [<code>Arrayable</code>](#Arrayable)
    * [.insertAfter(node, newNode)](#Arrayable+insertAfter) ⇒ [<code>Arrayable</code>](#Arrayable)
    * [.insertBefore(node, newNode)](#Arrayable+insertBefore) ⇒ [<code>Arrayable</code>](#Arrayable)
    * [.append(node, after)](#Arrayable+append) ⇒ [<code>Arrayable</code>](#Arrayable)
    * [.prepend(node, before)](#Arrayable+prepend) ⇒ [<code>Arrayable</code>](#Arrayable)
    * [.remove(node)](#Arrayable+remove) ⇒ [<code>ArrayElement</code>](#ArrayElement) \| <code>null</code>
    * [.item(index)](#Arrayable+item) ⇒ [<code>ArrayElement</code>](#ArrayElement) \| <code>null</code>
    * [.forEach(callback, thisArg)](#Arrayable+forEach) ⇒ [<code>Arrayable</code>](#Arrayable)

<a name="new_Arrayable_new"></a>

### new Arrayable([elementClass])
Create the new Arrayable instance, configure the Arrayable class.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [elementClass] | [<code>ArrayElement</code>](#ArrayElement) | <code>ArrayElement</code> | The class used to wrap given data as elements. |

<a name="Arrayable+classType"></a>

### arrayable.classType
The class used to create this instance, so that it can be recognized as valid without an instanceof check.

**Kind**: instance property of [<code>Arrayable</code>](#Arrayable)  
<a name="Arrayable+innerList"></a>

### arrayable.innerList
The array which stores the elements of this Arrayable.

**Kind**: instance property of [<code>Arrayable</code>](#Arrayable)  
<a name="Arrayable+initialized"></a>

### arrayable.initialized
Whether the inner list has been initialized (it can only be initialized once).

**Kind**: instance property of [<code>Arrayable</code>](#Arrayable)  
<a name="Arrayable+list"></a>

### arrayable.list ⇒ [<code>Array.&lt;ArrayElement&gt;</code>](#ArrayElement)
Retrieve the innerList used (the list itself, not a copy).

**Kind**: instance property of [<code>Arrayable</code>](#Arrayable)  
<a name="Arrayable+first"></a>

### arrayable.first ⇒ [<code>ArrayElement</code>](#ArrayElement) \| <code>null</code>
Retrieve the first Element from the Arrayable

**Kind**: instance property of [<code>Arrayable</code>](#Arrayable)  
**Returns**: [<code>ArrayElement</code>](#ArrayElement) \| <code>null</code> - The first element, or null when the Arrayable is empty  
<a name="Arrayable+last"></a>

### arrayable.last ⇒ [<code>ArrayElement</code>](#ArrayElement) \| <code>null</code>
Retrieve the last Element from the Arrayable

**Kind**: instance property of [<code>Arrayable</code>](#Arrayable)  
**Returns**: [<code>ArrayElement</code>](#ArrayElement) \| <code>null</code> - The last element, or null when the Arrayable is empty  
<a name="Arrayable+length"></a>

### arrayable.length ⇒ <code>number</code>
Return the length of the list.

**Kind**: instance property of [<code>Arrayable</code>](#Arrayable)  
<a name="Arrayable+indexOfElement"></a>

### arrayable.indexOfElement(node) ⇒ <code>number</code>
Find the position of an element which must be in this list.

**Kind**: instance method of [<code>Arrayable</code>](#Arrayable)  
**Throws**:

- <code>Error</code> When the element is not in this list


| Param | Type | Description |
| --- | --- | --- |
| node | [<code>ArrayElement</code>](#ArrayElement) | The element to find |

<a name="Arrayable+initialize"></a>

### arrayable.initialize(initialList) ⇒ [<code>Arrayable</code>](#Arrayable)
Initialize the inner list, should only run once.

**Kind**: instance method of [<code>Arrayable</code>](#Arrayable)  

| Param | Type | Description |
| --- | --- | --- |
| initialList | [<code>Array.&lt;ArrayElement&gt;</code>](#ArrayElement) | Give the array of elements to start in this Arrayable. |

<a name="Arrayable+insertAfter"></a>

### arrayable.insertAfter(node, newNode) ⇒ [<code>Arrayable</code>](#Arrayable)
Insert a new node (or data) after a node.

**Kind**: instance method of [<code>Arrayable</code>](#Arrayable)  
**Throws**:

- <code>Error</code> When the reference node is not in this list


| Param | Type | Description |
| --- | --- | --- |
| node | [<code>ArrayElement</code>](#ArrayElement) \| <code>null</code> | The existing node as reference, or null to insert at the start of the list |
| newNode | [<code>ArrayElement</code>](#ArrayElement) \| <code>\*</code> | The new node to go after the existing node |

<a name="Arrayable+insertBefore"></a>

### arrayable.insertBefore(node, newNode) ⇒ [<code>Arrayable</code>](#Arrayable)
Insert a new node (or data) before a node.

**Kind**: instance method of [<code>Arrayable</code>](#Arrayable)  
**Throws**:

- <code>Error</code> When the reference node is not in this list


| Param | Type | Description |
| --- | --- | --- |
| node | [<code>ArrayElement</code>](#ArrayElement) \| <code>null</code> | The existing node as reference, or null to insert at the end of the list |
| newNode | [<code>ArrayElement</code>](#ArrayElement) \| <code>\*</code> | The new node to go before the existing node |

<a name="Arrayable+append"></a>

### arrayable.append(node, after) ⇒ [<code>Arrayable</code>](#Arrayable)
Add a node (or data) after the given (or last) node in the list.

**Kind**: instance method of [<code>Arrayable</code>](#Arrayable)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>ArrayElement</code>](#ArrayElement) \| <code>\*</code> | The new node to add to the end of the list |
| after | [<code>ArrayElement</code>](#ArrayElement) | The existing last node |

<a name="Arrayable+prepend"></a>

### arrayable.prepend(node, before) ⇒ [<code>Arrayable</code>](#Arrayable)
Add a node (or data) before the given (or first) node in the list.

**Kind**: instance method of [<code>Arrayable</code>](#Arrayable)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>ArrayElement</code>](#ArrayElement) \| <code>\*</code> | The new node to add to the start of the list |
| before | [<code>ArrayElement</code>](#ArrayElement) | The existing first node |

<a name="Arrayable+remove"></a>

### arrayable.remove(node) ⇒ [<code>ArrayElement</code>](#ArrayElement) \| <code>null</code>
Remove an element from this arrayable.

**Kind**: instance method of [<code>Arrayable</code>](#Arrayable)  
**Returns**: [<code>ArrayElement</code>](#ArrayElement) \| <code>null</code> - The removed node, or null when it was not in this list (nothing is removed)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>ArrayElement</code>](#ArrayElement) | The node we wish to remove (and it will be returned after removal) |

<a name="Arrayable+item"></a>

### arrayable.item(index) ⇒ [<code>ArrayElement</code>](#ArrayElement) \| <code>null</code>
Retrieve an ArrayElement item from this list by numeric index, otherwise return null.

**Kind**: instance method of [<code>Arrayable</code>](#Arrayable)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The integer number for retrieving a node by position. |

<a name="Arrayable+forEach"></a>

### arrayable.forEach(callback, thisArg) ⇒ [<code>Arrayable</code>](#Arrayable)
Be able to run forEach on this Arrayable to iterate over the elements.

**Kind**: instance method of [<code>Arrayable</code>](#Arrayable)  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>forEachCallback</code> | The function to call for-each element |
| thisArg | [<code>Arrayable</code>](#Arrayable) | Optional, 'this' reference |

<a name="ArrayElement"></a>

## ArrayElement ⇒ [<code>ArrayElement</code>](#ArrayElement)
Make a new Element from the data given if it is not already a valid Element.

**Kind**: global variable  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| element | [<code>ArrayElement</code>](#ArrayElement) \| <code>\*</code> |  | Return a valid ArrayElement instance from given data, or even an already valid one. |
| [classType] | <code>IsElement</code> | <code>ArrayElement</code> | Provide the type of IsElement to use. |


* [ArrayElement](#ArrayElement) ⇒ [<code>ArrayElement</code>](#ArrayElement)
    * [new ArrayElement([data])](#new_ArrayElement_new)
    * _instance_
        * [.classType](#ArrayElement+classType)
        * [.data](#ArrayElement+data)
    * _static_
        * [.fromArray([values], [classType])](#ArrayElement.fromArray) ⇒ <code>Object</code>

<a name="new_ArrayElement_new"></a>

### new ArrayElement([data])
Create the new Element instance, provide the data and optionally configure the type of Element.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [data] | <code>\*</code> | <code></code> | The data to be stored in this element. |

<a name="ArrayElement+classType"></a>

### arrayElement.classType
The class used to create this instance, so that it can be recognized as valid without an instanceof check.

**Kind**: instance property of [<code>ArrayElement</code>](#ArrayElement)  
<a name="ArrayElement+data"></a>

### arrayElement.data
The data stored in this element.

**Kind**: instance property of [<code>ArrayElement</code>](#ArrayElement)  
<a name="ArrayElement.fromArray"></a>

### ArrayElement.fromArray([values], [classType]) ⇒ <code>Object</code>
Convert an array into Element instances, return the head and tail Elements.

**Kind**: static method of [<code>ArrayElement</code>](#ArrayElement)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [values] | <code>Array.&lt;IsElement&gt;</code> | <code>[]</code> | Provide an array of data that will be converted to array of elements. |
| [classType] | <code>IsElement</code> | <code>ArrayElement</code> | Provide the type of IsElement to use. |

<a name="services"></a>

## services
List helpful functions when dealing with collections.

**Kind**: global constant  
<a name="recipes"></a>

## recipes
List of class declarations that can be used to specify attributes for a style of object / class.

**Kind**: global constant  
<a name="parseTreeNext"></a>

## parseTreeNext(treeNode, [boundaryParent]) ⇒ <code>IsTreeNode</code> \| <code>null</code>
Be able to parse over every node in a tree.
1. Start at root (get root parent)
2. Get first child (repeat until no children)
3. Check next child
4. Repeat 2
5. Repeat 3
6. If no next child, return to parent and repeat 3
7. Stop at root (next is null and parent is null
A boundary can be given to parse only part of a tree: going back up to the parents stops at the boundary, so the
parsing stays within the nodes whose parent is the boundary (and everything below them).

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| treeNode | <code>IsTreeNode</code> | Provide a node in a tree and get the next node (left-first approach) |
| [boundaryParent] | <code>IsTreeNode</code> \| <code>null</code> | The parent of the nodes to stay within, null for the nodes at the top of a tree. When it is not given the whole tree is parsed. |

<a name="parseTree"></a>

## parseTree(tree, callback) ⇒ <code>IsArrayable.&lt;IsTreeNode&gt;</code>
Loop over all the nodes in a tree starting from left and apply a callback for each

**Kind**: global function  

| Param | Type |
| --- | --- |
| tree | <code>IsArrayable.&lt;IsTreeNode&gt;</code> | 
| callback | <code>forEachCallback</code> | 

<a name="borrowedGetter"></a>

## borrowedGetter(name, list) ⇒ <code>\*</code>
Use one of the accessors of DoublyLinkedList (which keeps track of the head, tail and length) for a LinkedTreeList.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The accessor to use |
| list | [<code>LinkedTreeList</code>](#LinkedTreeList) | The list to use it on |

