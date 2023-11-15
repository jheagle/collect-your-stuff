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
<dt><a href="#Stackable">Stackable</a> ⇐ <code><a href="#Linker">Linker</a></code></dt>
<dd><p>Stackable represents a runnable entry in stack.</p>
</dd>
<dt><a href="#Stack">Stack</a></dt>
<dd><p>Store a collection of items which can only be inserted and removed from the top.</p>
</dd>
<dt><a href="#Queueable">Queueable</a> ⇐ <code><a href="#Linker">Linker</a></code></dt>
<dd><p>Queueable represents a runnable entry in a queue.</p>
</dd>
<dt><a href="#Queue">Queue</a></dt>
<dd><p>Maintain a series of queued items.</p>
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
<dt><a href="#parseTreeNext">parseTreeNext(treeNode)</a> ⇒ <code>IsTreeNode</code> | <code>null</code></dt>
<dd><p>Be able to parse over every node in a tree.</p>
<ol>
<li>Start at root (get root parent)</li>
<li>Get first child (repeat until no children)</li>
<li>Check next child</li>
<li>Repeat 2</li>
<li>Repeat 3</li>
<li>If no next child, return to parent and repeat 3</li>
<li>Stop at root (next is null and parent is null</li>
</ol>
</dd>
<dt><a href="#parseTree">parseTree(tree, callback)</a> ⇒ <code>IsArrayable.&lt;IsTreeNode&gt;</code></dt>
<dd><p>Loop over all the nodes in a tree starting from left and apply a callback for each</p>
</dd>
</dl>

<a name="module_collect-your-stuff"></a>

## collect-your-stuff
All of the collections available.

**Version**: 1.0.0  
**Author**: Joshua Heagle <joshuaheagle@gmail.com>  
<a name="module_collect-your-stuff..collectYourStuff"></a>

### collect-your-stuff~collectYourStuff
All methods exported from this module are encapsulated within collect-your-stuff.

**Kind**: inner constant of [<code>collect-your-stuff</code>](#module_collect-your-stuff)  
<a name="TreeLinkerIterator"></a>

## TreeLinkerIterator
Class TreeLinkerIterator returns the next value taking a left-first approach down a tree.

**Kind**: global class  
<a name="Runnable"></a>

## Runnable
Identify a class that can be run.

**Kind**: global class  

* [Runnable](#Runnable)
    * [new Runnable(data)](#new_Runnable_new)
    * _instance_
        * [.task](#Runnable+task) ⇒ <code>function</code>
        * [.run()](#Runnable+run) ⇒ <code>\*</code>
    * _static_
        * [.isRunnable(thing)](#Runnable.isRunnable) ⇒ <code>boolean</code>

<a name="new_Runnable_new"></a>

### new Runnable(data)
Instantiate a Runnable class.


| Param | Type |
| --- | --- |
| data | <code>\*</code> | 

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

| Param | Type |
| --- | --- |
| thing | <code>\*</code> | 

<a name="LinkerIterator"></a>

## LinkerIterator
Class LinkerIterator returns the next value when using linkers of linked type lists.

**Kind**: global class  
<a name="DoubleLinkerIterator"></a>

## DoubleLinkerIterator
Class DoubleLinkerIterator returns the next value when using linkers of linked type lists.

**Kind**: global class  
<a name="ArrayIterator"></a>

## ArrayIterator
Class ArrayIterator returns the next value when using elements of array type list.

**Kind**: global class  
<a name="Stackable"></a>

## Stackable ⇐ [<code>Linker</code>](#Linker)
Stackable represents a runnable entry in stack.

**Kind**: global class  
**Extends**: [<code>Linker</code>](#Linker)  

* [Stackable](#Stackable) ⇐ [<code>Linker</code>](#Linker)
    * [new Stackable([stackData])](#new_Stackable_new)
    * _instance_
        * [.task](#Stackable+task) ⇒ <code>\*</code>
        * [.run()](#Stackable+run) ⇒ <code>\*</code>
    * _static_
        * [.make(stackable, [classType])](#Stackable.make) ⇒ [<code>Stackable</code>](#Stackable)
        * [.fromArray([values], [classType])](#Stackable.fromArray) ⇒ <code>Object</code>

<a name="new_Stackable_new"></a>

### new Stackable([stackData])
Create a stackable item that can be used in a stack.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [stackData] | <code>Object</code> | <code>{}</code> |  |
| [stackData.task] | <code>\*</code> | <code></code> | The data to be stored in this stackable |
| [stackData.next] | [<code>Stackable</code>](#Stackable) \| <code>null</code> | <code></code> | The reference to the next stackable if any |
| [stackData.ready] | <code>boolean</code> \| <code>function</code> | <code>false</code> | Indicate if the stackable is ready to run |

<a name="Stackable+task"></a>

### stackable.task ⇒ <code>\*</code>
Retrieve the data which should be formed as a task.

**Kind**: instance property of [<code>Stackable</code>](#Stackable)  
<a name="Stackable+run"></a>

### stackable.run() ⇒ <code>\*</code>
Run the stacked task.

**Kind**: instance method of [<code>Stackable</code>](#Stackable)  
<a name="Stackable.make"></a>

### Stackable.make(stackable, [classType]) ⇒ [<code>Stackable</code>](#Stackable)
Make a new Stackable from the data given if it is not already a valid Stackable.

**Kind**: static method of [<code>Stackable</code>](#Stackable)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| stackable | [<code>Stackable</code>](#Stackable) \| <code>\*</code> |  | Return a valid Stackable instance from given data, or even an already valid one. |
| [classType] | <code>IsLinker</code> | <code>Stackable</code> | Provide the type of IsLinker to use. |

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
Store a collection of items which can only be inserted and removed from the top.

**Kind**: global class  

* [Stack](#Stack)
    * [new Stack(stackedList, listClass, stackableClass)](#new_Stack_new)
    * _instance_
        * [.empty()](#Stack+empty) ⇒ <code>boolean</code>
        * [.top()](#Stack+top) ⇒ [<code>Stackable</code>](#Stackable)
        * [.pop()](#Stack+pop) ⇒ [<code>Stackable</code>](#Stackable) \| <code>null</code>
        * [.push(stackable)](#Stack+push)
        * [.remove()](#Stack+remove) ⇒ [<code>Stackable</code>](#Stackable) \| <code>null</code>
        * [.size()](#Stack+size) ⇒ <code>number</code>
    * _static_
        * [.fromArray(values, stackableClass, listClass)](#Stack.fromArray) ⇒ [<code>Stack</code>](#Stack)

<a name="new_Stack_new"></a>

### new Stack(stackedList, listClass, stackableClass)
Instantiate the state with the starter stacked list.


| Param | Type |
| --- | --- |
| stackedList | <code>Iterable</code> \| [<code>LinkedList</code>](#LinkedList) | 
| listClass | <code>IsArrayable</code> | 
| stackableClass | [<code>Stackable</code>](#Stackable) | 

<a name="Stack+empty"></a>

### stack.empty() ⇒ <code>boolean</code>
Return true if the stack is empty (there are no tasks in the stacked list)

**Kind**: instance method of [<code>Stack</code>](#Stack)  
<a name="Stack+top"></a>

### stack.top() ⇒ [<code>Stackable</code>](#Stackable)
Take a look at the next stacked task

**Kind**: instance method of [<code>Stack</code>](#Stack)  
<a name="Stack+pop"></a>

### stack.pop() ⇒ [<code>Stackable</code>](#Stackable) \| <code>null</code>
Remove the next stacked task and return it.

**Kind**: instance method of [<code>Stack</code>](#Stack)  
<a name="Stack+push"></a>

### stack.push(stackable)
Push a stackable task to the top of the stack.

**Kind**: instance method of [<code>Stack</code>](#Stack)  

| Param | Type | Description |
| --- | --- | --- |
| stackable | [<code>Stackable</code>](#Stackable) \| <code>\*</code> | Add a new stackable to the top of the stack |

<a name="Stack+remove"></a>

### stack.remove() ⇒ [<code>Stackable</code>](#Stackable) \| <code>null</code>
Remove the next stacked task and return it.

**Kind**: instance method of [<code>Stack</code>](#Stack)  
<a name="Stack+size"></a>

### stack.size() ⇒ <code>number</code>
Get the size of the current stack.

**Kind**: instance method of [<code>Stack</code>](#Stack)  
<a name="Stack.fromArray"></a>

### Stack.fromArray(values, stackableClass, listClass) ⇒ [<code>Stack</code>](#Stack)
Convert an array to a Stack.

**Kind**: static method of [<code>Stack</code>](#Stack)  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>Array</code> | An array of values which will be converted to stackables in this queue |
| stackableClass | [<code>Stackable</code>](#Stackable) | The class to use for each stackable |
| listClass | [<code>Stack</code>](#Stack) \| <code>Iterable</code> | The class to use to manage the stackables |

<a name="Queueable"></a>

## Queueable ⇐ [<code>Linker</code>](#Linker)
Queueable represents a runnable entry in a queue.

**Kind**: global class  
**Extends**: [<code>Linker</code>](#Linker)  

* [Queueable](#Queueable) ⇐ [<code>Linker</code>](#Linker)
    * [new Queueable([queueableData])](#new_Queueable_new)
    * _instance_
        * [.isReady](#Queueable+isReady) ⇒ <code>boolean</code>
        * [.task](#Queueable+task) ⇒ <code>\*</code>
        * [.markCompleted(completeResponse)](#Queueable+markCompleted) ⇒ <code>completeResponse</code>
        * [.run()](#Queueable+run) ⇒ <code>completeResponse</code>
    * _static_
        * [.make(queueable, [classType])](#Queueable.make) ⇒ [<code>Queueable</code>](#Queueable)
        * [.fromArray(values, [classType])](#Queueable.fromArray) ⇒ <code>Object</code>

<a name="new_Queueable_new"></a>

### new Queueable([queueableData])
Create a queueable item that can be used in a queue.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [queueableData] | <code>Object</code> | <code>{}</code> |  |
| [queueableData.task] | <code>\*</code> | <code></code> | The data to be stored in this queueable |
| [queueableData.next] | [<code>Queueable</code>](#Queueable) \| <code>null</code> | <code></code> | The reference to the next queueable if any |
| [queueableData.ready] | <code>boolean</code> \| <code>function</code> | <code>false</code> | Indicate if the queueable is ready to run |

<a name="Queueable+isReady"></a>

### queueable.isReady ⇒ <code>boolean</code>
Check ready state.

**Kind**: instance property of [<code>Queueable</code>](#Queueable)  
<a name="Queueable+task"></a>

### queueable.task ⇒ <code>\*</code>
Retrieve the data which should be formed as a task.

**Kind**: instance property of [<code>Queueable</code>](#Queueable)  
<a name="Queueable+markCompleted"></a>

### queueable.markCompleted(completeResponse) ⇒ <code>completeResponse</code>
Set this queueable as completed.

**Kind**: instance method of [<code>Queueable</code>](#Queueable)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| completeResponse | <code>Object</code> |  |  |
| [completeResponse.success] | <code>\*</code> | <code>true</code> | Indicate when the task failed (use false) or give a success message |
| [completeResponse.error] | <code>\*</code> | <code>false</code> | Indicate a task was error-free (use false) or give an error message |
| [completeResponse.context] | <code>\*</code> | <code></code> | Provide additional data in the response |

<a name="Queueable+run"></a>

### queueable.run() ⇒ <code>completeResponse</code>
Intend to run the queued task when it is ready. If ready, mark this task as running and run the task.

**Kind**: instance method of [<code>Queueable</code>](#Queueable)  
<a name="Queueable.make"></a>

### Queueable.make(queueable, [classType]) ⇒ [<code>Queueable</code>](#Queueable)
Make a new Queueable from the data given if it is not already a valid Queueable.

**Kind**: static method of [<code>Queueable</code>](#Queueable)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| queueable | [<code>Queueable</code>](#Queueable) \| <code>\*</code> |  | Return a valid Queueable instance from given data, or even an already valid one. |
| [classType] | <code>IsLinker</code> | <code>Queueable</code> | Provide the type of IsLinker to use. |

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
Maintain a series of queued items.

**Kind**: global class  

* [Queue](#Queue)
    * [new Queue(queuedList, listClass, queueableClass)](#new_Queue_new)
    * _instance_
        * [.dequeue()](#Queue+dequeue) ⇒ <code>completeResponse</code> \| <code>\*</code>
        * [.empty()](#Queue+empty) ⇒ <code>boolean</code>
        * [.enqueue(queueable)](#Queue+enqueue)
        * [.peek()](#Queue+peek) ⇒ [<code>Queueable</code>](#Queueable)
        * [.remove()](#Queue+remove) ⇒ [<code>Queueable</code>](#Queueable) \| <code>null</code>
        * [.size()](#Queue+size) ⇒ <code>number</code>
    * _static_
        * [.fromArray(values, queueableClass, listClass)](#Queue.fromArray) ⇒ [<code>Queue</code>](#Queue)

<a name="new_Queue_new"></a>

### new Queue(queuedList, listClass, queueableClass)
Instantiate the queue with the given queue list.


| Param | Type | Description |
| --- | --- | --- |
| queuedList | <code>Iterable</code> \| [<code>LinkedList</code>](#LinkedList) | Give the list of queueables to start in this queue. |
| listClass | <code>IsArrayable</code> |  |
| queueableClass | [<code>Queueable</code>](#Queueable) |  |

<a name="Queue+dequeue"></a>

### queue.dequeue() ⇒ <code>completeResponse</code> \| <code>\*</code>
Take a queued task from the front of the queue and run it if ready.

**Kind**: instance method of [<code>Queue</code>](#Queue)  
<a name="Queue+empty"></a>

### queue.empty() ⇒ <code>boolean</code>
Return true if the queue is empty (there are no tasks in the queue list)

**Kind**: instance method of [<code>Queue</code>](#Queue)  
<a name="Queue+enqueue"></a>

### queue.enqueue(queueable)
Add a queued task to the end of the queue

**Kind**: instance method of [<code>Queue</code>](#Queue)  

| Param | Type | Description |
| --- | --- | --- |
| queueable | [<code>Queueable</code>](#Queueable) | Add a new queueable to the end of the queue |

<a name="Queue+peek"></a>

### queue.peek() ⇒ [<code>Queueable</code>](#Queueable)
Take a look at the next queued task

**Kind**: instance method of [<code>Queue</code>](#Queue)  
<a name="Queue+remove"></a>

### queue.remove() ⇒ [<code>Queueable</code>](#Queueable) \| <code>null</code>
Remove the next queued item and return it.

**Kind**: instance method of [<code>Queue</code>](#Queue)  
<a name="Queue+size"></a>

### queue.size() ⇒ <code>number</code>
Get the length of the current queue.

**Kind**: instance method of [<code>Queue</code>](#Queue)  
<a name="Queue.fromArray"></a>

### Queue.fromArray(values, queueableClass, listClass) ⇒ [<code>Queue</code>](#Queue)
Convert an array to a Queue.

**Kind**: static method of [<code>Queue</code>](#Queue)  

| Param | Type | Description |
| --- | --- | --- |
| values | <code>Array</code> | An array of values which will be converted to queueables in this queue |
| queueableClass | [<code>Queueable</code>](#Queueable) | The class to use for each queueable |
| listClass | [<code>Queue</code>](#Queue) \| <code>Iterable</code> | The class to use to manage the queueables |

<a name="TreeLinker"></a>

## TreeLinker ⇐ [<code>DoubleLinker</code>](#DoubleLinker)
TreeLinker represents a node in a LinkedTreeList having a parent (or root) and child nodes.

**Kind**: global class  
**Extends**: [<code>DoubleLinker</code>](#DoubleLinker)  

* [TreeLinker](#TreeLinker) ⇐ [<code>DoubleLinker</code>](#DoubleLinker)
    * [new TreeLinker([settings])](#new_TreeLinker_new)
    * _instance_
        * [.childrenFromArray(children, classType)](#TreeLinker+childrenFromArray) ⇒ [<code>LinkedTreeList</code>](#LinkedTreeList) \| <code>null</code>
    * _static_
        * [.make(linker, [classType])](#TreeLinker.make) ⇒ [<code>TreeLinker</code>](#TreeLinker)
        * [.fromArray([values], [classType])](#TreeLinker.fromArray) ⇒ <code>Object</code>

<a name="new_TreeLinker_new"></a>

### new TreeLinker([settings])
Create the new TreeLinker instance, provide the data and optionally set references for next, prev, parent, or children.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [settings] | <code>Object</code> | <code>{}</code> |  |
| [settings.data] | <code>\*</code> | <code></code> | The data to be stored in this tree node |
| [settings.next] | [<code>TreeLinker</code>](#TreeLinker) | <code></code> | The reference to the next linker if any |
| [settings.prev] | [<code>TreeLinker</code>](#TreeLinker) | <code></code> | The reference to the previous linker if any |
| [settings.children] | [<code>LinkedTreeList</code>](#LinkedTreeList) | <code></code> | The references to child linkers if any |
| [settings.parent] | [<code>TreeLinker</code>](#TreeLinker) | <code></code> | The reference to a parent linker if any |

<a name="TreeLinker+childrenFromArray"></a>

### treeLinker.childrenFromArray(children, classType) ⇒ [<code>LinkedTreeList</code>](#LinkedTreeList) \| <code>null</code>
Create the children for this tree from an array.

**Kind**: instance method of [<code>TreeLinker</code>](#TreeLinker)  

| Param | Type | Description |
| --- | --- | --- |
| children | <code>Array</code> \| <code>null</code> | Provide an array of data / linker references to be children of this tree node. |
| classType | <code>IsTree</code> | Provide the type of IsElement to use. |

<a name="TreeLinker.make"></a>

### TreeLinker.make(linker, [classType]) ⇒ [<code>TreeLinker</code>](#TreeLinker)
Make a new DoubleLinker from the data given if it is not already a valid Linker.

**Kind**: static method of [<code>TreeLinker</code>](#TreeLinker)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| linker | [<code>TreeLinker</code>](#TreeLinker) \| <code>\*</code> |  | Return a valid TreeLinker instance from given data, or even an already valid one. |
| [classType] | <code>IsTreeNode</code> | <code>TreeLinker</code> | Provide the type of IsTreeNode to use. |

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
    * [new LinkedTreeList()](#new_LinkedTreeList_new)
    * _instance_
        * [.list](#LinkedTreeList+list) ⇒ [<code>TreeLinker</code>](#TreeLinker)
        * [.first](#LinkedTreeList+first) ⇒ [<code>TreeLinker</code>](#TreeLinker)
        * [.last](#LinkedTreeList+last) ⇒ [<code>TreeLinker</code>](#TreeLinker)
        * [.length](#LinkedTreeList+length) ⇒ <code>number</code>
        * [.parent](#LinkedTreeList+parent) ⇒ [<code>TreeLinker</code>](#TreeLinker)
        * [.parent](#LinkedTreeList+parent)
        * [.rootParent](#LinkedTreeList+rootParent) ⇒ [<code>TreeLinker</code>](#TreeLinker)
        * [.initialize(initialList)](#LinkedTreeList+initialize) ⇒ [<code>LinkedTreeList</code>](#LinkedTreeList)
        * [.setChildren(item, children)](#LinkedTreeList+setChildren)
        * [.insertAfter(node, newNode)](#LinkedTreeList+insertAfter) ⇒ [<code>LinkedTreeList</code>](#LinkedTreeList)
        * [.insertBefore(node, newNode)](#LinkedTreeList+insertBefore) ⇒ [<code>LinkedTreeList</code>](#LinkedTreeList)
        * [.append(node, after)](#LinkedTreeList+append) ⇒ [<code>TreeLinker</code>](#TreeLinker)
        * [.prepend(node, before)](#LinkedTreeList+prepend) ⇒ [<code>TreeLinker</code>](#TreeLinker)
        * [.remove(node)](#LinkedTreeList+remove) ⇒ [<code>TreeLinker</code>](#TreeLinker)
        * [.reset()](#LinkedTreeList+reset) ⇒ [<code>TreeLinker</code>](#TreeLinker)
        * [.item(index)](#LinkedTreeList+item) ⇒ [<code>TreeLinker</code>](#TreeLinker) \| <code>null</code>
        * [.forEach(callback, thisArg)](#LinkedTreeList+forEach)
    * _static_
        * [.fromArray([values], [linkerClass], [classType])](#LinkedTreeList.fromArray) ⇒ [<code>LinkedTreeList</code>](#LinkedTreeList)

<a name="new_LinkedTreeList_new"></a>

### new LinkedTreeList()
Create the new LinkedTreeList instance, configure the list class.

<a name="LinkedTreeList+list"></a>

### linkedTreeList.list ⇒ [<code>TreeLinker</code>](#TreeLinker)
Retrieve a copy of the innerList used.

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>list</code>](#DoublyLinkedList+list)  
<a name="LinkedTreeList+first"></a>

### linkedTreeList.first ⇒ [<code>TreeLinker</code>](#TreeLinker)
Retrieve the first TreeLinker in the list.

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>first</code>](#DoublyLinkedList+first)  
<a name="LinkedTreeList+last"></a>

### linkedTreeList.last ⇒ [<code>TreeLinker</code>](#TreeLinker)
Retrieve the last TreeLinker in the list.

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>last</code>](#DoublyLinkedList+last)  
<a name="LinkedTreeList+length"></a>

### linkedTreeList.length ⇒ <code>number</code>
Return the length of the list.

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>length</code>](#DoublyLinkedList+length)  
<a name="LinkedTreeList+parent"></a>

### linkedTreeList.parent ⇒ [<code>TreeLinker</code>](#TreeLinker)
Get the parent of this tree list.

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
<a name="LinkedTreeList+parent"></a>

### linkedTreeList.parent
Set the parent of this tree list

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  

| Param | Type | Description |
| --- | --- | --- |
| parent | [<code>TreeLinker</code>](#TreeLinker) | The new node to use as the parent for this group of children |

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

### linkedTreeList.setChildren(item, children)
Set the children on a parent item.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  

| Param | Type | Description |
| --- | --- | --- |
| item | [<code>TreeLinker</code>](#TreeLinker) | The TreeLinker node that will be the parent of the children |
| children | [<code>LinkedTreeList</code>](#LinkedTreeList) | The LinkedTreeList which has the child nodes to use |

<a name="LinkedTreeList+insertAfter"></a>

### linkedTreeList.insertAfter(node, newNode) ⇒ [<code>LinkedTreeList</code>](#LinkedTreeList)
Insert a new node (or data) after a node.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>insertAfter</code>](#DoublyLinkedList+insertAfter)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>TreeLinker</code>](#TreeLinker) \| <code>\*</code> | The existing node as reference |
| newNode | [<code>TreeLinker</code>](#TreeLinker) \| <code>\*</code> | The new node to go after the existing node |

<a name="LinkedTreeList+insertBefore"></a>

### linkedTreeList.insertBefore(node, newNode) ⇒ [<code>LinkedTreeList</code>](#LinkedTreeList)
Insert a new node (or data) before a node.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>insertBefore</code>](#DoublyLinkedList+insertBefore)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>TreeLinker</code>](#TreeLinker) \| <code>\*</code> | The existing node as reference |
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

### linkedTreeList.remove(node) ⇒ [<code>TreeLinker</code>](#TreeLinker)
Remove a linker from this linked list.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>remove</code>](#DoublyLinkedList+remove)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>TreeLinker</code>](#TreeLinker) | The node we wish to remove (and it will be returned after removal) |

<a name="LinkedTreeList+reset"></a>

### linkedTreeList.reset() ⇒ [<code>TreeLinker</code>](#TreeLinker)
Refresh all references and return head reference.

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

### linkedTreeList.forEach(callback, thisArg)
Be able to run forEach on this LinkedTreeList to iterate over the TreeLinker Items.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>forEach</code>](#DoublyLinkedList+forEach)  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>forEachCallback</code> | The function to call for-each tree node |
| thisArg | [<code>LinkedTreeList</code>](#LinkedTreeList) | Optional, 'this' reference |

<a name="LinkedTreeList.fromArray"></a>

### LinkedTreeList.fromArray([values], [linkerClass], [classType]) ⇒ [<code>LinkedTreeList</code>](#LinkedTreeList)
Convert an array into a LinkedTreeList instance, return the new instance.

**Kind**: static method of [<code>LinkedTreeList</code>](#LinkedTreeList)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [values] | <code>Array</code> | <code>[]</code> | An array of values which will be converted to nodes in this tree-list |
| [linkerClass] | [<code>TreeLinker</code>](#TreeLinker) | <code>TreeLinker</code> | The class to use for each node |
| [classType] | [<code>IsArrayable.&lt;TreeLinker&gt;</code>](#TreeLinker) | <code>LinkedTreeList</code> | Provide the type of IsArrayable to use. |

<a name="Linker"></a>

## Linker ⇐ [<code>ArrayElement</code>](#ArrayElement)
Linker represents a node in a LinkedList.

**Kind**: global class  
**Extends**: [<code>ArrayElement</code>](#ArrayElement)  

* [Linker](#Linker) ⇐ [<code>ArrayElement</code>](#ArrayElement)
    * [new Linker([nodeData])](#new_Linker_new)
    * [.make(linker, [classType])](#Linker.make) ⇒ [<code>Linker</code>](#Linker)
    * [.fromArray([values], [classType])](#Linker.fromArray) ⇒ <code>Object</code>

<a name="new_Linker_new"></a>

### new Linker([nodeData])
Create the new Linker instance, provide the data and optionally give the next Linker.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [nodeData] | <code>Object</code> | <code>{}</code> |  |
| [nodeData.data] | <code>\*</code> | <code></code> | The data to be stored in this linker |
| [nodeData.next] | [<code>Linker</code>](#Linker) \| <code>null</code> | <code></code> | The reference to the next linker if any |

<a name="Linker.make"></a>

### Linker.make(linker, [classType]) ⇒ [<code>Linker</code>](#Linker)
Make a new Linker from the data given if it is not already a valid Linker.

**Kind**: static method of [<code>Linker</code>](#Linker)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| linker | [<code>Linker</code>](#Linker) \| <code>\*</code> |  | Return a valid Linker instance from given data, or even an already valid one. |
| [classType] | <code>IsLinker</code> | <code>Linker</code> | Provide the type of IsLinker to use. |

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
    * [new LinkedList()](#new_LinkedList_new)
    * _instance_
        * [.list](#LinkedList+list) ⇒ [<code>Linker</code>](#Linker)
        * [.first](#LinkedList+first) ⇒ [<code>Linker</code>](#Linker)
        * [.last](#LinkedList+last) ⇒ [<code>Linker</code>](#Linker)
        * [.length](#LinkedList+length) ⇒ <code>number</code>
        * [.initialize(initialList)](#LinkedList+initialize) ⇒ [<code>LinkedList</code>](#LinkedList)
        * [.insertAfter(node, newNode)](#LinkedList+insertAfter) ⇒ [<code>LinkedList</code>](#LinkedList)
        * [.insertBefore(node, newNode)](#LinkedList+insertBefore) ⇒ [<code>LinkedList</code>](#LinkedList)
        * [.append(node, after)](#LinkedList+append) ⇒ [<code>Linker</code>](#Linker)
        * [.prepend(node, before)](#LinkedList+prepend) ⇒ [<code>Linker</code>](#Linker)
        * [.remove(node)](#LinkedList+remove) ⇒ [<code>Linker</code>](#Linker)
        * [.item(index)](#LinkedList+item) ⇒ [<code>Linker</code>](#Linker) \| <code>null</code>
        * [.forEach(callback, thisArg)](#LinkedList+forEach) ⇒ [<code>LinkedList</code>](#LinkedList)
    * _static_
        * [.fromArray(values, linkerClass, [classType])](#LinkedList.fromArray) ⇒ [<code>LinkedList</code>](#LinkedList)

<a name="new_LinkedList_new"></a>

### new LinkedList()
Create the new LinkedList instance.

<a name="LinkedList+list"></a>

### linkedList.list ⇒ [<code>Linker</code>](#Linker)
Retrieve a copy of the innerList used.

**Kind**: instance property of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>list</code>](#Arrayable+list)  
<a name="LinkedList+first"></a>

### linkedList.first ⇒ [<code>Linker</code>](#Linker)
Retrieve the first Linker in the list.

**Kind**: instance property of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>first</code>](#Arrayable+first)  
<a name="LinkedList+last"></a>

### linkedList.last ⇒ [<code>Linker</code>](#Linker)
Retrieve the last Linker in the list.

**Kind**: instance property of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>last</code>](#Arrayable+last)  
<a name="LinkedList+length"></a>

### linkedList.length ⇒ <code>number</code>
Return the length of the list.

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
| node | [<code>Linker</code>](#Linker) \| <code>\*</code> | The existing node as reference |
| newNode | [<code>Linker</code>](#Linker) \| <code>\*</code> | The new node to go after the existing node |

<a name="LinkedList+insertBefore"></a>

### linkedList.insertBefore(node, newNode) ⇒ [<code>LinkedList</code>](#LinkedList)
Insert a new node (or data) before a node.

**Kind**: instance method of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>insertBefore</code>](#Arrayable+insertBefore)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>Linker</code>](#Linker) \| <code>\*</code> | The existing node as reference |
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

### linkedList.remove(node) ⇒ [<code>Linker</code>](#Linker)
Remove a linker from this linked list.

**Kind**: instance method of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>remove</code>](#Arrayable+remove)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>Linker</code>](#Linker) | The node we wish to remove (and it will be returned after removal) |

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

<a name="LinkedList.fromArray"></a>

### LinkedList.fromArray(values, linkerClass, [classType]) ⇒ [<code>LinkedList</code>](#LinkedList)
Convert an array to a LinkedList.

**Kind**: static method of [<code>LinkedList</code>](#LinkedList)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| values | <code>Array</code> |  | An array of values which will be converted to linkers in this linked-list |
| linkerClass | <code>IsLinker</code> |  | The class to use for each linker |
| [classType] | [<code>IsArrayable.&lt;Linker&gt;</code>](#Linker) | <code>LinkedList</code> | Provide the type of IsArrayable to use. |

<a name="DoublyLinkedList"></a>

## DoublyLinkedList ⇐ [<code>LinkedList</code>](#LinkedList)
DoublyLinkedList represents a collection stored as a LinkedList with prev and next references.

**Kind**: global class  
**Extends**: [<code>LinkedList</code>](#LinkedList)  

* [DoublyLinkedList](#DoublyLinkedList) ⇐ [<code>LinkedList</code>](#LinkedList)
    * [new DoublyLinkedList()](#new_DoublyLinkedList_new)
    * _instance_
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
        * [.reset()](#DoublyLinkedList+reset) ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
        * [.item(index)](#DoublyLinkedList+item) ⇒ [<code>DoubleLinker</code>](#DoubleLinker) \| <code>null</code>
        * [.forEach(callback, thisArg)](#DoublyLinkedList+forEach)
    * _static_
        * [.fromArray([values], [linkerClass], [classType])](#DoublyLinkedList.fromArray) ⇒ [<code>DoublyLinkedList</code>](#DoublyLinkedList)

<a name="new_DoublyLinkedList_new"></a>

### new DoublyLinkedList()
Create the new DoublyLinkedList instance.

<a name="DoublyLinkedList+list"></a>

### doublyLinkedList.list ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
Retrieve a copy of the innerList used.

**Kind**: instance property of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>list</code>](#LinkedList+list)  
<a name="DoublyLinkedList+first"></a>

### doublyLinkedList.first ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
Retrieve the first DoubleLinker in the list.

**Kind**: instance property of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>first</code>](#LinkedList+first)  
<a name="DoublyLinkedList+last"></a>

### doublyLinkedList.last ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
Retrieve the last DoubleLinker in the list.

**Kind**: instance property of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>last</code>](#LinkedList+last)  
<a name="DoublyLinkedList+length"></a>

### doublyLinkedList.length ⇒ <code>number</code>
Return the length of the list.

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
| node | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>\*</code> | The existing node as reference |
| newNode | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>\*</code> | The new node to go after the existing node |

<a name="DoublyLinkedList+insertBefore"></a>

### doublyLinkedList.insertBefore(node, newNode) ⇒ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
Insert a new node (or data) before a node.

**Kind**: instance method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>insertBefore</code>](#LinkedList+insertBefore)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>\*</code> | The existing node as reference |
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

### doublyLinkedList.reset() ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
Refresh all references and return head reference.

**Kind**: instance method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
<a name="DoublyLinkedList+item"></a>

### doublyLinkedList.item(index) ⇒ [<code>DoubleLinker</code>](#DoubleLinker) \| <code>null</code>
Retrieve a DoubleLinker item from this list by numeric index, otherwise return null.

**Kind**: instance method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>item</code>](#LinkedList+item)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | The integer number for retrieving a node by position. |

<a name="DoublyLinkedList+forEach"></a>

### doublyLinkedList.forEach(callback, thisArg)
Be able to run forEach on this DoublyLinkedList to iterate over the DoubleLinker Items.

**Kind**: instance method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>forEach</code>](#LinkedList+forEach)  

| Param | Type | Description |
| --- | --- | --- |
| callback | <code>forEachCallback</code> | The function to call for-each double linker |
| thisArg | [<code>DoublyLinkedList</code>](#DoublyLinkedList) | Optional, 'this' reference |

<a name="DoublyLinkedList.fromArray"></a>

### DoublyLinkedList.fromArray([values], [linkerClass], [classType]) ⇒ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
Convert an array into a DoublyLinkedList instance, return the new instance.

**Kind**: static method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [values] | <code>Array</code> | <code>[]</code> | An array of values which will be converted to linkers in this doubly-linked-list |
| [linkerClass] | <code>IsDoubleLinker</code> | <code>DoubleLinker</code> | The class to use for each linker |
| [classType] | <code>IsArrayable.&lt;IsDoubleLinker&gt;</code> | <code>LinkedList</code> | Provide the type of IsArrayable to use. |

<a name="DoubleLinker"></a>

## DoubleLinker ⇐ [<code>Linker</code>](#Linker)
DoubleLinker represents a node in a DoublyLinkedList which is chained by next and prev.

**Kind**: global class  
**Extends**: [<code>Linker</code>](#Linker)  

* [DoubleLinker](#DoubleLinker) ⇐ [<code>Linker</code>](#Linker)
    * [new DoubleLinker([nodeData])](#new_DoubleLinker_new)
    * [.make(linker, [classType])](#DoubleLinker.make) ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
    * [.fromArray([values], [classType])](#DoubleLinker.fromArray) ⇒ <code>Object</code>

<a name="new_DoubleLinker_new"></a>

### new DoubleLinker([nodeData])
Create the new DoubleLinker instance, provide the data and optionally the next and prev references.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [nodeData] | <code>Object</code> | <code>{}</code> |  |
| [nodeData.data] | <code>\*</code> | <code></code> | The data to be stored in this linker |
| [nodeData.next] | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>null</code> | <code></code> | The reference to the next linker if any |
| [nodeData.prev] | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>null</code> | <code></code> | The reference to the previous linker if any |

<a name="DoubleLinker.make"></a>

### DoubleLinker.make(linker, [classType]) ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
Make a new DoubleLinker from the data given if it is not already a valid Linker.

**Kind**: static method of [<code>DoubleLinker</code>](#DoubleLinker)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| linker | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>\*</code> |  | Return a valid Linker instance from given data, or even an already valid one. |
| [classType] | <code>IsDoubleLinker</code> | <code>DoubleLinker</code> | Provide the type of IsDoubleLinker to use. |

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
    * [new Arrayable()](#new_Arrayable_new)
    * _instance_
        * [.list](#Arrayable+list) ⇒ [<code>Array.&lt;ArrayElement&gt;</code>](#ArrayElement)
        * [.first](#Arrayable+first) ⇒ [<code>ArrayElement</code>](#ArrayElement)
        * [.last](#Arrayable+last) ⇒ [<code>ArrayElement</code>](#ArrayElement)
        * [.length](#Arrayable+length) ⇒ <code>number</code>
        * [.initialize(initialList)](#Arrayable+initialize) ⇒ [<code>Arrayable</code>](#Arrayable)
        * [.insertAfter(node, newNode)](#Arrayable+insertAfter) ⇒ [<code>Arrayable</code>](#Arrayable)
        * [.insertBefore(node, newNode)](#Arrayable+insertBefore) ⇒ [<code>Arrayable</code>](#Arrayable)
        * [.append(node, after)](#Arrayable+append) ⇒ [<code>Arrayable</code>](#Arrayable)
        * [.prepend(node, before)](#Arrayable+prepend) ⇒ [<code>Arrayable</code>](#Arrayable)
        * [.remove(node)](#Arrayable+remove) ⇒ [<code>ArrayElement</code>](#ArrayElement)
        * [.item(index)](#Arrayable+item) ⇒ [<code>ArrayElement</code>](#ArrayElement) \| <code>null</code>
        * [.forEach(callback, thisArg)](#Arrayable+forEach) ⇒ [<code>Arrayable</code>](#Arrayable)
    * _static_
        * [.fromArray(values, [elementClass], [classType])](#Arrayable.fromArray) ⇒ [<code>Arrayable</code>](#Arrayable)

<a name="new_Arrayable_new"></a>

### new Arrayable()
Create the new Arrayable instance, configure the Arrayable class.

<a name="Arrayable+list"></a>

### arrayable.list ⇒ [<code>Array.&lt;ArrayElement&gt;</code>](#ArrayElement)
Retrieve a copy of the innerList used.

**Kind**: instance property of [<code>Arrayable</code>](#Arrayable)  
<a name="Arrayable+first"></a>

### arrayable.first ⇒ [<code>ArrayElement</code>](#ArrayElement)
Retrieve the first Element from the Arrayable

**Kind**: instance property of [<code>Arrayable</code>](#Arrayable)  
<a name="Arrayable+last"></a>

### arrayable.last ⇒ [<code>ArrayElement</code>](#ArrayElement)
Retrieve the last Element from the Arrayable

**Kind**: instance property of [<code>Arrayable</code>](#Arrayable)  
<a name="Arrayable+length"></a>

### arrayable.length ⇒ <code>number</code>
Return the length of the list.

**Kind**: instance property of [<code>Arrayable</code>](#Arrayable)  
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

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>ArrayElement</code>](#ArrayElement) \| <code>\*</code> | The existing node as reference |
| newNode | [<code>ArrayElement</code>](#ArrayElement) \| <code>\*</code> | The new node to go after the existing node |

<a name="Arrayable+insertBefore"></a>

### arrayable.insertBefore(node, newNode) ⇒ [<code>Arrayable</code>](#Arrayable)
Insert a new node (or data) before a node.

**Kind**: instance method of [<code>Arrayable</code>](#Arrayable)  

| Param | Type | Description |
| --- | --- | --- |
| node | [<code>ArrayElement</code>](#ArrayElement) \| <code>\*</code> | The existing node as reference |
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

### arrayable.remove(node) ⇒ [<code>ArrayElement</code>](#ArrayElement)
Remove an element from this arrayable.

**Kind**: instance method of [<code>Arrayable</code>](#Arrayable)  

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

<a name="Arrayable.fromArray"></a>

### Arrayable.fromArray(values, [elementClass], [classType]) ⇒ [<code>Arrayable</code>](#Arrayable)
Convert an array to an Arrayable.

**Kind**: static method of [<code>Arrayable</code>](#Arrayable)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| values | <code>Array</code> |  | An array of values which will be converted to elements in this arrayable |
| [elementClass] | <code>IsElement</code> | <code>ArrayElement</code> | The class to use for each element |
| [classType] | [<code>IsArrayable.&lt;ArrayElement&gt;</code>](#ArrayElement) | <code>Arrayable</code> | Provide the type of IsArrayable to use. |

<a name="ArrayElement"></a>

## ArrayElement
Element represents a node in an Arrayable.

**Kind**: global class  

* [ArrayElement](#ArrayElement)
    * [new ArrayElement([data])](#new_ArrayElement_new)
    * [.make(element, [classType])](#ArrayElement.make) ⇒ [<code>ArrayElement</code>](#ArrayElement)
    * [.fromArray([values], [classType])](#ArrayElement.fromArray) ⇒ <code>Object</code>

<a name="new_ArrayElement_new"></a>

### new ArrayElement([data])
Create the new Element instance, provide the data and optionally configure the type of Element.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [data] | <code>\*</code> | <code></code> | The data to be stored in this element. |

<a name="ArrayElement.make"></a>

### ArrayElement.make(element, [classType]) ⇒ [<code>ArrayElement</code>](#ArrayElement)
Make a new Element from the data given if it is not already a valid Element.

**Kind**: static method of [<code>ArrayElement</code>](#ArrayElement)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| element | [<code>ArrayElement</code>](#ArrayElement) \| <code>\*</code> |  | Return a valid ArrayElement instance from given data, or even an already valid one. |
| [classType] | <code>IsElement</code> | <code>ArrayElement</code> | Provide the type of IsElement to use. |

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

## parseTreeNext(treeNode) ⇒ <code>IsTreeNode</code> \| <code>null</code>
Be able to parse over every node in a tree.
1. Start at root (get root parent)
2. Get first child (repeat until no children)
3. Check next child
4. Repeat 2
5. Repeat 3
6. If no next child, return to parent and repeat 3
7. Stop at root (next is null and parent is null

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| treeNode | <code>IsTreeNode</code> | Provide a node in a tree and get the next node (left-first approach) |

<a name="parseTree"></a>

## parseTree(tree, callback) ⇒ <code>IsArrayable.&lt;IsTreeNode&gt;</code>
Loop over all the nodes in a tree starting from left and apply a callback for each

**Kind**: global function  

| Param | Type |
| --- | --- |
| tree | <code>IsArrayable.&lt;IsTreeNode&gt;</code> | 
| callback | <code>forEachCallback</code> | 

