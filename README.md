# Collect your stuff (and go)

Data allocation and manipulation.

## Modules

<dl>
<dt><a href="#module_collect-your-stuff">collect-your-stuff</a></dt>
<dd><p>All of the collections available.</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#Runnable">Runnable</a></dt>
<dd><p>Identify a class that can be run.</p>
</dd>
<dt><a href="#Stackable">Stackable</a> ⇐ <code><a href="#ArrayElement">ArrayElement</a></code></dt>
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
<dd><p>TreeLinker represents a node in a LinkedTreeList.</p>
</dd>
<dt><a href="#LinkedTreeList">LinkedTreeList</a> ⇐ <code><a href="#DoublyLinkedList">DoublyLinkedList</a></code></dt>
<dd><p>LinkedTreeList represents a collection stored with a root and spreading in branching (tree) formation..</p>
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
<dd><p>DoubleLinker represents a node in a DoublyLinkedList.</p>
</dd>
<dt><a href="#Arrayable">Arrayable</a></dt>
<dd><p>DoublyLinkedList represents a collection stored as a LinkedList with prev and next references.</p>
</dd>
<dt><a href="#ArrayElement">ArrayElement</a></dt>
<dd><p>Element represents a node in an Arrayable.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#recipes">recipes</a> : <code>Object</code></dt>
<dd><p>List of class declarations that can be used to specify attributes for a style of object / class.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#completeResponse">completeResponse</a> : <code>Object</code></dt>
<dd><p>Return results of the task.</p>
</dd>
<dt><a href="#forEachCallback">forEachCallback</a> ⇒</dt>
<dd><p>Run this function for each element in this arrayable.</p>
</dd>
</dl>

<a name="module_collect-your-stuff"></a>

## collect-your-stuff
All of the collections available.

**Version**: 1.0.0  
**Author**: Joshua Heagle <joshuaheagle@gmail.com>  
<a name="module_collect-your-stuff..collectYourStuff"></a>

### collect-your-stuff~collectYourStuff : [<code>collect-your-stuff</code>](#module_collect-your-stuff)
All methods exported from this module are encapsulated within collect-your-stuff.

**Kind**: inner typedef of [<code>collect-your-stuff</code>](#module_collect-your-stuff)  
<a name="Runnable"></a>

## Runnable
Identify a class that can be run.

**Kind**: global class  

* [Runnable](#Runnable)
    * _instance_
        * [.task](#Runnable+task) ⇒ <code>function</code>
        * [.run()](#Runnable+run) ⇒ <code>\*</code>
    * _static_
        * [.isRunnable(thing)](#Runnable.isRunnable) ⇒ <code>boolean</code>

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

<a name="Stackable"></a>

## Stackable ⇐ [<code>ArrayElement</code>](#ArrayElement)
Stackable represents a runnable entry in stack.

**Kind**: global class  
**Extends**: [<code>ArrayElement</code>](#ArrayElement), [<code>Runnable</code>](#Runnable)  

* [Stackable](#Stackable) ⇐ [<code>ArrayElement</code>](#ArrayElement)
    * [new Stackable([stack], stackableClass)](#new_Stackable_new)
    * _instance_
        * [.task](#Stackable+task) ⇒ <code>\*</code>
        * [.classType](#ArrayElement+classType) ⇒ [<code>ArrayElement</code>](#ArrayElement)
        * [.run()](#Stackable+run) ⇒ <code>\*</code>
    * _static_
        * [.make(stackable, [stackableClass])](#Stackable.make) ⇒ [<code>Stackable</code>](#Stackable)
        * [.fromArray([values], [stackableClass])](#Stackable.fromArray) ⇒ <code>Object</code>

<a name="new_Stackable_new"></a>

### new Stackable([stack], stackableClass)
Instantiate the Stackable which is used in a stack.


| Param | Type | Default |
| --- | --- | --- |
| [stack] | <code>\*</code> | <code></code> | 
| stackableClass |  |  | 

<a name="Stackable+task"></a>

### stackable.task ⇒ <code>\*</code>
Retrieve the data which should be formed as a task.

**Kind**: instance property of [<code>Stackable</code>](#Stackable)  
**Overrides**: [<code>task</code>](#Runnable+task)  
<a name="ArrayElement+classType"></a>

### stackable.classType ⇒ [<code>ArrayElement</code>](#ArrayElement)
Return the type of class used for Element.

**Kind**: instance property of [<code>Stackable</code>](#Stackable)  
**Overrides**: [<code>classType</code>](#ArrayElement+classType)  
<a name="Stackable+run"></a>

### stackable.run() ⇒ <code>\*</code>
Run the stacked task.

**Kind**: instance method of [<code>Stackable</code>](#Stackable)  
**Overrides**: [<code>run</code>](#Runnable+run)  
<a name="Stackable.make"></a>

### Stackable.make(stackable, [stackableClass]) ⇒ [<code>Stackable</code>](#Stackable)
Make a new Stackable from the data given if it is not already a valid Stackable.

**Kind**: static method of [<code>Stackable</code>](#Stackable)  
**Methodof**: Stackable  

| Param | Type | Default |
| --- | --- | --- |
| stackable | [<code>Stackable</code>](#Stackable) \| <code>\*</code> |  | 
| [stackableClass] | [<code>Stackable</code>](#Stackable) | <code>Stackable</code> | 

<a name="Stackable.fromArray"></a>

### Stackable.fromArray([values], [stackableClass]) ⇒ <code>Object</code>
Convert an array into Stackable instances, return the head and tail Stackables.

**Kind**: static method of [<code>Stackable</code>](#Stackable)  

| Param | Type | Default |
| --- | --- | --- |
| [values] | <code>Array</code> | <code>[]</code> | 
| [stackableClass] | [<code>Stackable</code>](#Stackable) | <code>Stackable</code> | 

<a name="Stack"></a>

## Stack
Store a collection of items which can only be inserted and removed from the top.

**Kind**: global class  
**See**: [Java Stack Interface](http://www.cs.williams.edu/~freund/cs136-073/javadoc/structure5/structure5/Stack.html)  

* [Stack](#Stack)
    * [new Stack(stackedList)](#new_Stack_new)
    * _instance_
        * [.stackedList](#Stack+stackedList) ⇒ <code>Iterable</code> \| [<code>LinkedList</code>](#LinkedList)
        * [.add(stackable)](#Stack+add)
        * [.empty()](#Stack+empty) ⇒ <code>boolean</code>
        * [.get()](#Stack+get) ⇒ [<code>Stackable</code>](#Stackable)
        * [.getFirst()](#Stack+getFirst) ⇒ [<code>Stackable</code>](#Stackable)
        * [.peek()](#Stack+peek) ⇒ [<code>Stackable</code>](#Stackable)
        * [.pop()](#Stack+pop) ⇒ [<code>Stackable</code>](#Stackable) \| <code>null</code>
        * [.push(stackable)](#Stack+push)
        * [.remove()](#Stack+remove) ⇒ [<code>Stackable</code>](#Stackable) \| <code>null</code>
        * [.size()](#Stack+size) ⇒ <code>number</code>
    * _static_
        * [.fromArray(values, stackableClass, listClass)](#Stack.fromArray) ⇒ [<code>Stack</code>](#Stack)

<a name="new_Stack_new"></a>

### new Stack(stackedList)
Instantiate the state with the starter stacked list.


| Param | Type |
| --- | --- |
| stackedList | <code>Iterable</code> \| [<code>Arrayable</code>](#Arrayable) | 

<a name="Stack+stackedList"></a>

### stack.stackedList ⇒ <code>Iterable</code> \| [<code>LinkedList</code>](#LinkedList)
Return the internal stacked list.

**Kind**: instance property of [<code>Stack</code>](#Stack)  
<a name="Stack+add"></a>

### stack.add(stackable)
Add a stackable task to the top of the stack.

**Kind**: instance method of [<code>Stack</code>](#Stack)  

| Param | Type |
| --- | --- |
| stackable | [<code>Stackable</code>](#Stackable) \| <code>\*</code> | 

<a name="Stack+empty"></a>

### stack.empty() ⇒ <code>boolean</code>
Return true if the stack is empty (there are no tasks in the stacked list)

**Kind**: instance method of [<code>Stack</code>](#Stack)  
<a name="Stack+get"></a>

### stack.get() ⇒ [<code>Stackable</code>](#Stackable)
Return a reference to the next stacked task.

**Kind**: instance method of [<code>Stack</code>](#Stack)  
<a name="Stack+getFirst"></a>

### stack.getFirst() ⇒ [<code>Stackable</code>](#Stackable)
Return a reference to the next stacked / first stacked task (alias for 'get()')

**Kind**: instance method of [<code>Stack</code>](#Stack)  
<a name="Stack+peek"></a>

### stack.peek() ⇒ [<code>Stackable</code>](#Stackable)
Take a look at the next stacked task (alias for 'get()')

**Kind**: instance method of [<code>Stack</code>](#Stack)  
<a name="Stack+pop"></a>

### stack.pop() ⇒ [<code>Stackable</code>](#Stackable) \| <code>null</code>
Remove the next stacked task and return it.

**Kind**: instance method of [<code>Stack</code>](#Stack)  
<a name="Stack+push"></a>

### stack.push(stackable)
Push a stackable task to the top of the stack.

**Kind**: instance method of [<code>Stack</code>](#Stack)  

| Param | Type |
| --- | --- |
| stackable | [<code>Stackable</code>](#Stackable) \| <code>\*</code> | 

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
**Methodof**: Stack  

| Param | Type |
| --- | --- |
| values | <code>Array</code> | 
| stackableClass | [<code>Stackable</code>](#Stackable) | 
| listClass | [<code>Stack</code>](#Stack) \| <code>Iterable</code> | 

<a name="Queueable"></a>

## Queueable ⇐ [<code>Linker</code>](#Linker)
Queueable represents a runnable entry in a queue.

**Kind**: global class  
**Extends**: [<code>Linker</code>](#Linker), [<code>Runnable</code>](#Runnable)  

* [Queueable](#Queueable) ⇐ [<code>Linker</code>](#Linker)
    * [new Queueable([queueableData], [queueableClass])](#new_Queueable_new)
    * _instance_
        * [.complete](#Queueable+complete) ⇒ <code>boolean</code>
        * [.isReady](#Queueable+isReady) ⇒ <code>boolean</code>
        * [.running](#Queueable+running) ⇒ <code>boolean</code>
        * [.task](#Queueable+task) ⇒ <code>\*</code>
        * [.classType](#ArrayElement+classType) ⇒ [<code>ArrayElement</code>](#ArrayElement)
        * [.markCompleted(completeResponse)](#Queueable+markCompleted) ⇒ [<code>completeResponse</code>](#completeResponse)
        * [.run()](#Queueable+run) ⇒ [<code>completeResponse</code>](#completeResponse)
    * _static_
        * [.make(queueable, [queueableClass])](#Queueable.make) ⇒ [<code>Queueable</code>](#Queueable)
        * [.fromArray(values, queueableClass)](#Queueable.fromArray) ⇒ <code>Object</code>

<a name="new_Queueable_new"></a>

### new Queueable([queueableData], [queueableClass])
Create a queueable item that can be used in a queue.


| Param | Type | Default |
| --- | --- | --- |
| [queueableData] | <code>Object</code> | <code>{}</code> | 
| [queueableData.task] | <code>\*</code> | <code></code> | 
| [queueableData.ready] | <code>boolean</code> \| <code>function</code> | <code>false</code> | 
| [queueableClass] | [<code>Queueable</code>](#Queueable) | <code>Queueable</code> | 

<a name="Queueable+complete"></a>

### queueable.complete ⇒ <code>boolean</code>
Check complete state.

**Kind**: instance property of [<code>Queueable</code>](#Queueable)  
<a name="Queueable+isReady"></a>

### queueable.isReady ⇒ <code>boolean</code>
Check ready state.

**Kind**: instance property of [<code>Queueable</code>](#Queueable)  
<a name="Queueable+running"></a>

### queueable.running ⇒ <code>boolean</code>
Check running state.

**Kind**: instance property of [<code>Queueable</code>](#Queueable)  
<a name="Queueable+task"></a>

### queueable.task ⇒ <code>\*</code>
Retrieve the data which should be formed as a task.

**Kind**: instance property of [<code>Queueable</code>](#Queueable)  
**Overrides**: [<code>task</code>](#Runnable+task)  
<a name="ArrayElement+classType"></a>

### queueable.classType ⇒ [<code>ArrayElement</code>](#ArrayElement)
Return the type of class used for Element.

**Kind**: instance property of [<code>Queueable</code>](#Queueable)  
**Overrides**: [<code>classType</code>](#ArrayElement+classType)  
<a name="Queueable+markCompleted"></a>

### queueable.markCompleted(completeResponse) ⇒ [<code>completeResponse</code>](#completeResponse)
Set this queueable as completed.

**Kind**: instance method of [<code>Queueable</code>](#Queueable)  

| Param | Type | Default |
| --- | --- | --- |
| completeResponse | <code>Object</code> |  | 
| [completeResponse.success] | <code>\*</code> | <code>true</code> | 
| [completeResponse.error] | <code>\*</code> | <code>false</code> | 
| [completeResponse.context] | <code>\*</code> | <code></code> | 

<a name="Queueable+run"></a>

### queueable.run() ⇒ [<code>completeResponse</code>](#completeResponse)
Intend to run the queued task when it is ready. If ready, mark this task as running and run the task.

**Kind**: instance method of [<code>Queueable</code>](#Queueable)  
**Overrides**: [<code>run</code>](#Runnable+run)  
<a name="Queueable.make"></a>

### Queueable.make(queueable, [queueableClass]) ⇒ [<code>Queueable</code>](#Queueable)
Make a new Queueable from the data given if it is not already a valid Queueable.

**Kind**: static method of [<code>Queueable</code>](#Queueable)  
**Methodof**: Queueable  

| Param | Type | Default |
| --- | --- | --- |
| queueable | [<code>Queueable</code>](#Queueable) \| <code>\*</code> |  | 
| [queueableClass] | [<code>Queueable</code>](#Queueable) | <code>Queueable</code> | 

<a name="Queueable.fromArray"></a>

### Queueable.fromArray(values, queueableClass) ⇒ <code>Object</code>
Convert an array into Queueable instances, return the head and tail Queueables.

**Kind**: static method of [<code>Queueable</code>](#Queueable)  

| Param | Type |
| --- | --- |
| values | <code>Array</code> | 
| queueableClass | [<code>Queueable</code>](#Queueable) | 

<a name="Queue"></a>

## Queue
Maintain a series of queued items.

**Kind**: global class  
**See**: [Java Queue Interface](http://www.cs.williams.edu/~freund/cs136-073/javadoc/structure5/structure5/Queue.html)  

* [Queue](#Queue)
    * [new Queue(queuedList)](#new_Queue_new)
    * _instance_
        * [.queuedList](#Queue+queuedList) ⇒ <code>Iterable</code> \| [<code>LinkedList</code>](#LinkedList)
        * [.add(queueable)](#Queue+add)
        * [.dequeue()](#Queue+dequeue) ⇒ [<code>completeResponse</code>](#completeResponse) \| <code>\*</code>
        * [.empty()](#Queue+empty) ⇒ <code>boolean</code>
        * [.enqueue(queueable)](#Queue+enqueue)
        * [.get()](#Queue+get) ⇒ [<code>Queueable</code>](#Queueable)
        * [.getFirst()](#Queue+getFirst) ⇒ [<code>Queueable</code>](#Queueable)
        * [.peek()](#Queue+peek) ⇒ [<code>Queueable</code>](#Queueable)
        * [.remove()](#Queue+remove) ⇒ [<code>Queueable</code>](#Queueable) \| <code>null</code>
        * [.size()](#Queue+size) ⇒ <code>number</code>
    * _static_
        * [.fromArray(values, queueableClass, listClass)](#Queue.fromArray) ⇒ [<code>Queue</code>](#Queue)

<a name="new_Queue_new"></a>

### new Queue(queuedList)
Instantiate the queue with the given queue list.


| Param | Type |
| --- | --- |
| queuedList | <code>Iterable</code> \| [<code>LinkedList</code>](#LinkedList) | 

<a name="Queue+queuedList"></a>

### queue.queuedList ⇒ <code>Iterable</code> \| [<code>LinkedList</code>](#LinkedList)
Return the internal queued list.

**Kind**: instance property of [<code>Queue</code>](#Queue)  
<a name="Queue+add"></a>

### queue.add(queueable)
Add a queued task to the end of the queue

**Kind**: instance method of [<code>Queue</code>](#Queue)  

| Param | Type |
| --- | --- |
| queueable | [<code>Queueable</code>](#Queueable) \| <code>\*</code> | 

<a name="Queue+dequeue"></a>

### queue.dequeue() ⇒ [<code>completeResponse</code>](#completeResponse) \| <code>\*</code>
Take a queued task from the front of the queue and run it if ready.

**Kind**: instance method of [<code>Queue</code>](#Queue)  
<a name="Queue+empty"></a>

### queue.empty() ⇒ <code>boolean</code>
Return true if the queue is empty (there are no tasks in the queue list)

**Kind**: instance method of [<code>Queue</code>](#Queue)  
<a name="Queue+enqueue"></a>

### queue.enqueue(queueable)
Add a queued task to the end of the queue (alias for 'add()')

**Kind**: instance method of [<code>Queue</code>](#Queue)  

| Param | Type |
| --- | --- |
| queueable | [<code>Queueable</code>](#Queueable) | 

<a name="Queue+get"></a>

### queue.get() ⇒ [<code>Queueable</code>](#Queueable)
Return a reference to the next queued task.

**Kind**: instance method of [<code>Queue</code>](#Queue)  
<a name="Queue+getFirst"></a>

### queue.getFirst() ⇒ [<code>Queueable</code>](#Queueable)
Return a reference to the next queued / first queued task (alias for 'get()')

**Kind**: instance method of [<code>Queue</code>](#Queue)  
<a name="Queue+peek"></a>

### queue.peek() ⇒ [<code>Queueable</code>](#Queueable)
Take a look at the next queued task (alias for 'get()')

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
**Methodof**: Queue  

| Param | Type |
| --- | --- |
| values | <code>Array</code> | 
| queueableClass | [<code>Queueable</code>](#Queueable) | 
| listClass | [<code>Queue</code>](#Queue) \| <code>Iterable</code> | 

<a name="TreeLinker"></a>

## TreeLinker ⇐ [<code>DoubleLinker</code>](#DoubleLinker)
TreeLinker represents a node in a LinkedTreeList.

**Kind**: global class  
**Extends**: [<code>DoubleLinker</code>](#DoubleLinker)  

* [TreeLinker](#TreeLinker) ⇐ [<code>DoubleLinker</code>](#DoubleLinker)
    * [new TreeLinker([settings], [linkerClass])](#new_TreeLinker_new)
    * _instance_
        * [.parent](#TreeLinker+parent) ⇒ [<code>TreeLinker</code>](#TreeLinker) \| <code>null</code>
        * [.children](#TreeLinker+children) ⇒ [<code>LinkedTreeList</code>](#LinkedTreeList) \| <code>null</code>
        * [.classType](#ArrayElement+classType) ⇒ [<code>ArrayElement</code>](#ArrayElement)
        * [.childrenFromArray(children, linkerClass)](#TreeLinker+childrenFromArray) ⇒ [<code>DoubleLinker</code>](#DoubleLinker) \| <code>null</code>
    * _static_
        * [.make(linker, [linkerClass])](#TreeLinker.make) ⇒ [<code>Linker</code>](#Linker)
        * [.fromArray([values], [linkerClass])](#TreeLinker.fromArray) ⇒ <code>Object</code>

<a name="new_TreeLinker_new"></a>

### new TreeLinker([settings], [linkerClass])
Create the new TreeLinker instance, provide the data and optionally configure the type of Linker.


| Param | Type | Default |
| --- | --- | --- |
| [settings] | <code>Object</code> | <code>{}</code> | 
| [settings.data] | <code>\*</code> | <code></code> | 
| [settings.prev] | [<code>TreeLinker</code>](#TreeLinker) | <code></code> | 
| [settings.next] | [<code>TreeLinker</code>](#TreeLinker) | <code></code> | 
| [settings.children] | [<code>LinkedTreeList</code>](#LinkedTreeList) | <code></code> | 
| [settings.parent] | [<code>TreeLinker</code>](#TreeLinker) | <code></code> | 
| [linkerClass] | [<code>TreeLinker</code>](#TreeLinker) | <code>TreeLinker</code> | 

<a name="TreeLinker+parent"></a>

### treeLinker.parent ⇒ [<code>TreeLinker</code>](#TreeLinker) \| <code>null</code>
Return the parent of this Tree Linker.

**Kind**: instance property of [<code>TreeLinker</code>](#TreeLinker)  
<a name="TreeLinker+children"></a>

### treeLinker.children ⇒ [<code>LinkedTreeList</code>](#LinkedTreeList) \| <code>null</code>
Return the children of this Tree Linker.

**Kind**: instance property of [<code>TreeLinker</code>](#TreeLinker)  
<a name="ArrayElement+classType"></a>

### treeLinker.classType ⇒ [<code>ArrayElement</code>](#ArrayElement)
Return the type of class used for Element.

**Kind**: instance property of [<code>TreeLinker</code>](#TreeLinker)  
**Overrides**: [<code>classType</code>](#ArrayElement+classType)  
<a name="TreeLinker+childrenFromArray"></a>

### treeLinker.childrenFromArray(children, linkerClass) ⇒ [<code>DoubleLinker</code>](#DoubleLinker) \| <code>null</code>
Create the children for this tree from an array.

**Kind**: instance method of [<code>TreeLinker</code>](#TreeLinker)  

| Param | Type | Default |
| --- | --- | --- |
| children | <code>Array</code> \| <code>null</code> | <code></code> | 
| linkerClass | [<code>TreeLinker</code>](#TreeLinker) |  | 

<a name="TreeLinker.make"></a>

### TreeLinker.make(linker, [linkerClass]) ⇒ [<code>Linker</code>](#Linker)
Make a new DoubleLinker from the data given if it is not already a valid Linker.

**Kind**: static method of [<code>TreeLinker</code>](#TreeLinker)  
**Methodof**: TreeLinker  

| Param | Type | Default |
| --- | --- | --- |
| linker | [<code>TreeLinker</code>](#TreeLinker) \| <code>\*</code> |  | 
| [linkerClass] | [<code>TreeLinker</code>](#TreeLinker) | <code>TreeLinker</code> | 

<a name="TreeLinker.fromArray"></a>

### TreeLinker.fromArray([values], [linkerClass]) ⇒ <code>Object</code>
Convert an array into DoubleLinker instances, return the head and tail DoubleLinkers.

**Kind**: static method of [<code>TreeLinker</code>](#TreeLinker)  
**Methodof**: TreeLinker  

| Param | Type | Default |
| --- | --- | --- |
| [values] | <code>Array</code> | <code>[]</code> | 
| [linkerClass] | [<code>TreeLinker</code>](#TreeLinker) | <code>TreeLinker</code> | 

<a name="LinkedTreeList"></a>

## LinkedTreeList ⇐ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
LinkedTreeList represents a collection stored with a root and spreading in branching (tree) formation..

**Kind**: global class  
**Extends**: [<code>DoublyLinkedList</code>](#DoublyLinkedList)  

* [LinkedTreeList](#LinkedTreeList) ⇐ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
    * [new LinkedTreeList([listClass])](#new_LinkedTreeList_new)
    * _instance_
        * [.parent](#LinkedTreeList+parent) ⇒ [<code>TreeLinker</code>](#TreeLinker)
        * [.parent](#LinkedTreeList+parent)
        * [.rootParent](#LinkedTreeList+rootParent) ⇒ [<code>TreeLinker</code>](#TreeLinker)
        * [.first](#DoublyLinkedList+first) ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
        * [.last](#DoublyLinkedList+last) ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
        * [.length](#DoublyLinkedList+length) ⇒ <code>number</code>
        * [.classType](#Arrayable+classType) ⇒ [<code>Arrayable</code>](#Arrayable)
        * [.initialized](#Arrayable+initialized) ⇒ <code>boolean</code>
        * [.innerList](#Arrayable+innerList) ⇒ <code>Array</code>
        * [.setChildren(item, children)](#LinkedTreeList+setChildren)
        * [.insertAfter(node, newNode)](#DoublyLinkedList+insertAfter) ⇒ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
        * [.insertBefore(node, newNode)](#DoublyLinkedList+insertBefore) ⇒ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
        * [.remove(node)](#DoublyLinkedList+remove) ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
        * [.reset()](#DoublyLinkedList+reset) ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
        * [.item(index)](#DoublyLinkedList+item) ⇒ [<code>DoubleLinker</code>](#DoubleLinker) \| <code>null</code>
        * [.forEach(callback, thisArg)](#DoublyLinkedList+forEach)
        * [.initialize(initialList)](#LinkedList+initialize) ⇒ [<code>LinkedList</code>](#LinkedList)
        * [.append(node, after)](#LinkedList+append) ⇒ [<code>Linker</code>](#Linker)
        * [.prepend(node, before)](#LinkedList+prepend) ⇒ [<code>Linker</code>](#Linker)
    * _static_
        * [.fromArray([values], [linkerClass], [listClass])](#LinkedTreeList.fromArray) ⇒ [<code>DoublyLinkedList</code>](#DoublyLinkedList)

<a name="new_LinkedTreeList_new"></a>

### new LinkedTreeList([listClass])
Create the new LinkedTreeList instance, configure the list class.


| Param | Type | Default |
| --- | --- | --- |
| [listClass] | [<code>LinkedTreeList</code>](#LinkedTreeList) \| <code>Iterable</code> | <code>LinkedTreeList</code> | 

<a name="LinkedTreeList+parent"></a>

### linkedTreeList.parent ⇒ [<code>TreeLinker</code>](#TreeLinker)
Get the parent of this tree list.

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
<a name="LinkedTreeList+parent"></a>

### linkedTreeList.parent
Set the parent of this tree list

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  

| Param | Type |
| --- | --- |
| parent | [<code>TreeLinker</code>](#TreeLinker) | 

<a name="LinkedTreeList+rootParent"></a>

### linkedTreeList.rootParent ⇒ [<code>TreeLinker</code>](#TreeLinker)
Return the root parent of the entire tree.

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
<a name="DoublyLinkedList+first"></a>

### linkedTreeList.first ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
Retrieve the first DoubleLinker in the list.

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>first</code>](#DoublyLinkedList+first)  
<a name="DoublyLinkedList+last"></a>

### linkedTreeList.last ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
Retrieve the last DoubleLinker in the list.

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>last</code>](#DoublyLinkedList+last)  
<a name="DoublyLinkedList+length"></a>

### linkedTreeList.length ⇒ <code>number</code>
Return the length of the list.

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>length</code>](#DoublyLinkedList+length)  
<a name="Arrayable+classType"></a>

### linkedTreeList.classType ⇒ [<code>Arrayable</code>](#Arrayable)
Return the type of class used for Arrayable.

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>classType</code>](#Arrayable+classType)  
<a name="Arrayable+initialized"></a>

### linkedTreeList.initialized ⇒ <code>boolean</code>
Detect if the inner list has been initialized.

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>initialized</code>](#Arrayable+initialized)  
<a name="Arrayable+innerList"></a>

### linkedTreeList.innerList ⇒ <code>Array</code>
Retrieve a copy of the innerList used.

**Kind**: instance property of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>innerList</code>](#Arrayable+innerList)  
<a name="LinkedTreeList+setChildren"></a>

### linkedTreeList.setChildren(item, children)
Set the children on a parent item.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  

| Param | Type | Default |
| --- | --- | --- |
| item | [<code>TreeLinker</code>](#TreeLinker) |  | 
| children | [<code>LinkedTreeList</code>](#LinkedTreeList) | <code></code> | 

<a name="DoublyLinkedList+insertAfter"></a>

### linkedTreeList.insertAfter(node, newNode) ⇒ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
Insert a new node (or data) after a node.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>insertAfter</code>](#DoublyLinkedList+insertAfter)  

| Param | Type |
| --- | --- |
| node | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>\*</code> | 
| newNode | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>\*</code> | 

<a name="DoublyLinkedList+insertBefore"></a>

### linkedTreeList.insertBefore(node, newNode) ⇒ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
Insert a new node (or data) before a node.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>insertBefore</code>](#DoublyLinkedList+insertBefore)  

| Param | Type |
| --- | --- |
| node | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>\*</code> | 
| newNode | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>\*</code> | 

<a name="DoublyLinkedList+remove"></a>

### linkedTreeList.remove(node) ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
Remove a linker from this linked list.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>remove</code>](#DoublyLinkedList+remove)  

| Param | Type |
| --- | --- |
| node | [<code>DoubleLinker</code>](#DoubleLinker) | 

<a name="DoublyLinkedList+reset"></a>

### linkedTreeList.reset() ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
Refresh all references and return head reference.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>reset</code>](#DoublyLinkedList+reset)  
<a name="DoublyLinkedList+item"></a>

### linkedTreeList.item(index) ⇒ [<code>DoubleLinker</code>](#DoubleLinker) \| <code>null</code>
Retrieve a DoubleLinker item from this list by numeric index, otherwise return null.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>item</code>](#DoublyLinkedList+item)  

| Param | Type |
| --- | --- |
| index | <code>number</code> | 

<a name="DoublyLinkedList+forEach"></a>

### linkedTreeList.forEach(callback, thisArg)
Be able to run forEach on this DoublyLinkedList ot iterate over the DoubleLinker Items.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>forEach</code>](#DoublyLinkedList+forEach)  

| Param | Type |
| --- | --- |
| callback | [<code>forEachCallback</code>](#forEachCallback) | 
| thisArg | [<code>DoublyLinkedList</code>](#DoublyLinkedList) | 

<a name="LinkedList+initialize"></a>

### linkedTreeList.initialize(initialList) ⇒ [<code>LinkedList</code>](#LinkedList)
Initialize the inner list, should only run once.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>initialize</code>](#LinkedList+initialize)  

| Param | Type |
| --- | --- |
| initialList | [<code>Linker</code>](#Linker) \| <code>Array</code> | 

<a name="LinkedList+append"></a>

### linkedTreeList.append(node, after) ⇒ [<code>Linker</code>](#Linker)
Add a node (or data) after the given (or last) node in the list.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>append</code>](#LinkedList+append)  

| Param | Type |
| --- | --- |
| node | [<code>Linker</code>](#Linker) \| <code>\*</code> | 
| after | [<code>Linker</code>](#Linker) | 

<a name="LinkedList+prepend"></a>

### linkedTreeList.prepend(node, before) ⇒ [<code>Linker</code>](#Linker)
Add a node (or data) before the given (or first) node in the list.

**Kind**: instance method of [<code>LinkedTreeList</code>](#LinkedTreeList)  
**Overrides**: [<code>prepend</code>](#LinkedList+prepend)  

| Param | Type |
| --- | --- |
| node | [<code>Linker</code>](#Linker) \| <code>\*</code> | 
| before | [<code>Linker</code>](#Linker) | 

<a name="LinkedTreeList.fromArray"></a>

### LinkedTreeList.fromArray([values], [linkerClass], [listClass]) ⇒ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
Create an instance of LinkedTreeList from an array

**Kind**: static method of [<code>LinkedTreeList</code>](#LinkedTreeList)  

| Param | Type | Default |
| --- | --- | --- |
| [values] | <code>Array</code> | <code>[]</code> | 
| [linkerClass] | [<code>TreeLinker</code>](#TreeLinker) | <code>TreeLinker</code> | 
| [listClass] | [<code>LinkedTreeList</code>](#LinkedTreeList) | <code>LinkedTreeList</code> | 

<a name="Linker"></a>

## Linker ⇐ [<code>ArrayElement</code>](#ArrayElement)
Linker represents a node in a LinkedList.

**Kind**: global class  
**Extends**: [<code>ArrayElement</code>](#ArrayElement)  

* [Linker](#Linker) ⇐ [<code>ArrayElement</code>](#ArrayElement)
    * [new Linker([nodeData], [linkerClass])](#new_Linker_new)
    * _instance_
        * [.classType](#ArrayElement+classType) ⇒ [<code>ArrayElement</code>](#ArrayElement)
    * _static_
        * [.make(linker, [linkerClass])](#Linker.make) ⇒ [<code>Linker</code>](#Linker)
        * [.fromArray([values], [linkerClass])](#Linker.fromArray) ⇒ <code>Object</code>

<a name="new_Linker_new"></a>

### new Linker([nodeData], [linkerClass])
Create the new Linker instance, provide the data and optionally configure the type of Linker.


| Param | Type | Default |
| --- | --- | --- |
| [nodeData] | <code>Object</code> | <code>{}</code> | 
| [nodeData.data] | <code>\*</code> | <code></code> | 
| [nodeData.next] | [<code>Linker</code>](#Linker) \| <code>null</code> | <code></code> | 
| [linkerClass] | [<code>Linker</code>](#Linker) | <code>Linker</code> | 

<a name="ArrayElement+classType"></a>

### linker.classType ⇒ [<code>ArrayElement</code>](#ArrayElement)
Return the type of class used for Element.

**Kind**: instance property of [<code>Linker</code>](#Linker)  
**Overrides**: [<code>classType</code>](#ArrayElement+classType)  
<a name="Linker.make"></a>

### Linker.make(linker, [linkerClass]) ⇒ [<code>Linker</code>](#Linker)
Make a new Linker from the data given if it is not already a valid Linker.

**Kind**: static method of [<code>Linker</code>](#Linker)  
**Methodof**: Linker  

| Param | Type | Default |
| --- | --- | --- |
| linker | [<code>Linker</code>](#Linker) \| <code>\*</code> |  | 
| [linkerClass] | [<code>Linker</code>](#Linker) | <code>Linker</code> | 

<a name="Linker.fromArray"></a>

### Linker.fromArray([values], [linkerClass]) ⇒ <code>Object</code>
Convert an array into Linker instances, return the head and tail Linkers.

**Kind**: static method of [<code>Linker</code>](#Linker)  
**Methodof**: Linker  

| Param | Type | Default |
| --- | --- | --- |
| [values] | <code>Array</code> | <code>[]</code> | 
| [linkerClass] | [<code>Linker</code>](#Linker) | <code>Linker</code> | 

<a name="LinkedList"></a>

## LinkedList ⇐ [<code>Arrayable</code>](#Arrayable)
LinkedList represents a collection stored as a LinkedList with next references.

**Kind**: global class  
**Extends**: [<code>Arrayable</code>](#Arrayable)  

* [LinkedList](#LinkedList) ⇐ [<code>Arrayable</code>](#Arrayable)
    * [new LinkedList(listClass)](#new_LinkedList_new)
    * _instance_
        * [.first](#LinkedList+first) ⇒ [<code>Linker</code>](#Linker)
        * [.last](#LinkedList+last) ⇒ [<code>Linker</code>](#Linker)
        * [.length](#LinkedList+length) ⇒ <code>number</code>
        * [.classType](#Arrayable+classType) ⇒ [<code>Arrayable</code>](#Arrayable)
        * [.initialized](#Arrayable+initialized) ⇒ <code>boolean</code>
        * [.innerList](#Arrayable+innerList) ⇒ <code>Array</code>
        * [.initialize(initialList)](#LinkedList+initialize) ⇒ [<code>LinkedList</code>](#LinkedList)
        * [.insertAfter(node, newNode)](#LinkedList+insertAfter) ⇒ [<code>LinkedList</code>](#LinkedList)
        * [.insertBefore(node, newNode)](#LinkedList+insertBefore) ⇒ [<code>LinkedList</code>](#LinkedList)
        * [.append(node, after)](#LinkedList+append) ⇒ [<code>Linker</code>](#Linker)
        * [.prepend(node, before)](#LinkedList+prepend) ⇒ [<code>Linker</code>](#Linker)
        * [.remove(node)](#LinkedList+remove) ⇒ [<code>Linker</code>](#Linker)
        * [.item(index)](#LinkedList+item) ⇒ [<code>Linker</code>](#Linker) \| <code>null</code>
        * [.forEach(callback, thisArg)](#LinkedList+forEach) ⇒ [<code>LinkedList</code>](#LinkedList)
    * _static_
        * [.fromArray(values, linkerClass, listClass)](#LinkedList.fromArray) ⇒ [<code>LinkedList</code>](#LinkedList)

<a name="new_LinkedList_new"></a>

### new LinkedList(listClass)
Create the new LinkedList instance, configure the Linker and List classes.


| Param | Type |
| --- | --- |
| listClass | [<code>LinkedList</code>](#LinkedList) \| <code>Iterable</code> | 

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
<a name="Arrayable+classType"></a>

### linkedList.classType ⇒ [<code>Arrayable</code>](#Arrayable)
Return the type of class used for Arrayable.

**Kind**: instance property of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>classType</code>](#Arrayable+classType)  
<a name="Arrayable+initialized"></a>

### linkedList.initialized ⇒ <code>boolean</code>
Detect if the inner list has been initialized.

**Kind**: instance property of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>initialized</code>](#Arrayable+initialized)  
<a name="Arrayable+innerList"></a>

### linkedList.innerList ⇒ <code>Array</code>
Retrieve a copy of the innerList used.

**Kind**: instance property of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>innerList</code>](#Arrayable+innerList)  
<a name="LinkedList+initialize"></a>

### linkedList.initialize(initialList) ⇒ [<code>LinkedList</code>](#LinkedList)
Initialize the inner list, should only run once.

**Kind**: instance method of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>initialize</code>](#Arrayable+initialize)  

| Param | Type |
| --- | --- |
| initialList | [<code>Linker</code>](#Linker) \| <code>Array</code> | 

<a name="LinkedList+insertAfter"></a>

### linkedList.insertAfter(node, newNode) ⇒ [<code>LinkedList</code>](#LinkedList)
Insert a new node (or data) after a node.

**Kind**: instance method of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>insertAfter</code>](#Arrayable+insertAfter)  

| Param | Type |
| --- | --- |
| node | [<code>Linker</code>](#Linker) \| <code>\*</code> | 
| newNode | [<code>Linker</code>](#Linker) \| <code>\*</code> | 

<a name="LinkedList+insertBefore"></a>

### linkedList.insertBefore(node, newNode) ⇒ [<code>LinkedList</code>](#LinkedList)
Insert a new node (or data) before a node.

**Kind**: instance method of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>insertBefore</code>](#Arrayable+insertBefore)  

| Param | Type |
| --- | --- |
| node | [<code>Linker</code>](#Linker) \| <code>\*</code> | 
| newNode | [<code>Linker</code>](#Linker) \| <code>\*</code> | 

<a name="LinkedList+append"></a>

### linkedList.append(node, after) ⇒ [<code>Linker</code>](#Linker)
Add a node (or data) after the given (or last) node in the list.

**Kind**: instance method of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>append</code>](#Arrayable+append)  

| Param | Type |
| --- | --- |
| node | [<code>Linker</code>](#Linker) \| <code>\*</code> | 
| after | [<code>Linker</code>](#Linker) | 

<a name="LinkedList+prepend"></a>

### linkedList.prepend(node, before) ⇒ [<code>Linker</code>](#Linker)
Add a node (or data) before the given (or first) node in the list.

**Kind**: instance method of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>prepend</code>](#Arrayable+prepend)  

| Param | Type |
| --- | --- |
| node | [<code>Linker</code>](#Linker) \| <code>\*</code> | 
| before | [<code>Linker</code>](#Linker) | 

<a name="LinkedList+remove"></a>

### linkedList.remove(node) ⇒ [<code>Linker</code>](#Linker)
Remove a linker from this linked list.

**Kind**: instance method of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>remove</code>](#Arrayable+remove)  

| Param | Type |
| --- | --- |
| node | [<code>Linker</code>](#Linker) | 

<a name="LinkedList+item"></a>

### linkedList.item(index) ⇒ [<code>Linker</code>](#Linker) \| <code>null</code>
Retrieve a Linker item from this list by numeric index, otherwise return null.

**Kind**: instance method of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>item</code>](#Arrayable+item)  

| Param | Type |
| --- | --- |
| index | <code>number</code> | 

<a name="LinkedList+forEach"></a>

### linkedList.forEach(callback, thisArg) ⇒ [<code>LinkedList</code>](#LinkedList)
Be able to run forEach on this LinkedList to iterate over the linkers.

**Kind**: instance method of [<code>LinkedList</code>](#LinkedList)  
**Overrides**: [<code>forEach</code>](#Arrayable+forEach)  

| Param | Type |
| --- | --- |
| callback | [<code>forEachCallback</code>](#forEachCallback) | 
| thisArg | [<code>LinkedList</code>](#LinkedList) \| [<code>Arrayable</code>](#Arrayable) | 

<a name="LinkedList.fromArray"></a>

### LinkedList.fromArray(values, linkerClass, listClass) ⇒ [<code>LinkedList</code>](#LinkedList)
Convert an array to a LinkedList.

**Kind**: static method of [<code>LinkedList</code>](#LinkedList)  
**Methodof**: LinkedList  

| Param | Type |
| --- | --- |
| values | <code>Array</code> | 
| linkerClass | [<code>Linker</code>](#Linker) | 
| listClass | [<code>LinkedList</code>](#LinkedList) \| <code>Iterable</code> | 

<a name="DoublyLinkedList"></a>

## DoublyLinkedList ⇐ [<code>LinkedList</code>](#LinkedList)
DoublyLinkedList represents a collection stored as a LinkedList with prev and next references.

**Kind**: global class  
**Extends**: [<code>LinkedList</code>](#LinkedList)  

* [DoublyLinkedList](#DoublyLinkedList) ⇐ [<code>LinkedList</code>](#LinkedList)
    * [new DoublyLinkedList([listClass])](#new_DoublyLinkedList_new)
    * _instance_
        * [.first](#DoublyLinkedList+first) ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
        * [.last](#DoublyLinkedList+last) ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
        * [.length](#DoublyLinkedList+length) ⇒ <code>number</code>
        * [.classType](#Arrayable+classType) ⇒ [<code>Arrayable</code>](#Arrayable)
        * [.initialized](#Arrayable+initialized) ⇒ <code>boolean</code>
        * [.innerList](#Arrayable+innerList) ⇒ <code>Array</code>
        * [.insertAfter(node, newNode)](#DoublyLinkedList+insertAfter) ⇒ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
        * [.insertBefore(node, newNode)](#DoublyLinkedList+insertBefore) ⇒ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
        * [.remove(node)](#DoublyLinkedList+remove) ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
        * [.reset()](#DoublyLinkedList+reset) ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
        * [.item(index)](#DoublyLinkedList+item) ⇒ [<code>DoubleLinker</code>](#DoubleLinker) \| <code>null</code>
        * [.forEach(callback, thisArg)](#DoublyLinkedList+forEach)
        * [.initialize(initialList)](#LinkedList+initialize) ⇒ [<code>LinkedList</code>](#LinkedList)
        * [.append(node, after)](#LinkedList+append) ⇒ [<code>Linker</code>](#Linker)
        * [.prepend(node, before)](#LinkedList+prepend) ⇒ [<code>Linker</code>](#Linker)
    * _static_
        * [.fromArray([values], [linkerClass], [listClass])](#DoublyLinkedList.fromArray) ⇒ [<code>DoublyLinkedList</code>](#DoublyLinkedList)

<a name="new_DoublyLinkedList_new"></a>

### new DoublyLinkedList([listClass])
Create the new DoublyLinkedList instance, configure the Linker and List classes.


| Param | Type | Default |
| --- | --- | --- |
| [listClass] | [<code>DoublyLinkedList</code>](#DoublyLinkedList) \| <code>Iterable</code> | <code>DoublyLinkedList</code> | 

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
<a name="Arrayable+classType"></a>

### doublyLinkedList.classType ⇒ [<code>Arrayable</code>](#Arrayable)
Return the type of class used for Arrayable.

**Kind**: instance property of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>classType</code>](#Arrayable+classType)  
<a name="Arrayable+initialized"></a>

### doublyLinkedList.initialized ⇒ <code>boolean</code>
Detect if the inner list has been initialized.

**Kind**: instance property of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>initialized</code>](#Arrayable+initialized)  
<a name="Arrayable+innerList"></a>

### doublyLinkedList.innerList ⇒ <code>Array</code>
Retrieve a copy of the innerList used.

**Kind**: instance property of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>innerList</code>](#Arrayable+innerList)  
<a name="DoublyLinkedList+insertAfter"></a>

### doublyLinkedList.insertAfter(node, newNode) ⇒ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
Insert a new node (or data) after a node.

**Kind**: instance method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>insertAfter</code>](#LinkedList+insertAfter)  

| Param | Type |
| --- | --- |
| node | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>\*</code> | 
| newNode | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>\*</code> | 

<a name="DoublyLinkedList+insertBefore"></a>

### doublyLinkedList.insertBefore(node, newNode) ⇒ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
Insert a new node (or data) before a node.

**Kind**: instance method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>insertBefore</code>](#LinkedList+insertBefore)  

| Param | Type |
| --- | --- |
| node | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>\*</code> | 
| newNode | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>\*</code> | 

<a name="DoublyLinkedList+remove"></a>

### doublyLinkedList.remove(node) ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
Remove a linker from this linked list.

**Kind**: instance method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>remove</code>](#LinkedList+remove)  

| Param | Type |
| --- | --- |
| node | [<code>DoubleLinker</code>](#DoubleLinker) | 

<a name="DoublyLinkedList+reset"></a>

### doublyLinkedList.reset() ⇒ [<code>DoubleLinker</code>](#DoubleLinker)
Refresh all references and return head reference.

**Kind**: instance method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
<a name="DoublyLinkedList+item"></a>

### doublyLinkedList.item(index) ⇒ [<code>DoubleLinker</code>](#DoubleLinker) \| <code>null</code>
Retrieve a DoubleLinker item from this list by numeric index, otherwise return null.

**Kind**: instance method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>item</code>](#LinkedList+item)  

| Param | Type |
| --- | --- |
| index | <code>number</code> | 

<a name="DoublyLinkedList+forEach"></a>

### doublyLinkedList.forEach(callback, thisArg)
Be able to run forEach on this DoublyLinkedList ot iterate over the DoubleLinker Items.

**Kind**: instance method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>forEach</code>](#LinkedList+forEach)  

| Param | Type |
| --- | --- |
| callback | [<code>forEachCallback</code>](#forEachCallback) | 
| thisArg | [<code>DoublyLinkedList</code>](#DoublyLinkedList) | 

<a name="LinkedList+initialize"></a>

### doublyLinkedList.initialize(initialList) ⇒ [<code>LinkedList</code>](#LinkedList)
Initialize the inner list, should only run once.

**Kind**: instance method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>initialize</code>](#LinkedList+initialize)  

| Param | Type |
| --- | --- |
| initialList | [<code>Linker</code>](#Linker) \| <code>Array</code> | 

<a name="LinkedList+append"></a>

### doublyLinkedList.append(node, after) ⇒ [<code>Linker</code>](#Linker)
Add a node (or data) after the given (or last) node in the list.

**Kind**: instance method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>append</code>](#LinkedList+append)  

| Param | Type |
| --- | --- |
| node | [<code>Linker</code>](#Linker) \| <code>\*</code> | 
| after | [<code>Linker</code>](#Linker) | 

<a name="LinkedList+prepend"></a>

### doublyLinkedList.prepend(node, before) ⇒ [<code>Linker</code>](#Linker)
Add a node (or data) before the given (or first) node in the list.

**Kind**: instance method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Overrides**: [<code>prepend</code>](#LinkedList+prepend)  

| Param | Type |
| --- | --- |
| node | [<code>Linker</code>](#Linker) \| <code>\*</code> | 
| before | [<code>Linker</code>](#Linker) | 

<a name="DoublyLinkedList.fromArray"></a>

### DoublyLinkedList.fromArray([values], [linkerClass], [listClass]) ⇒ [<code>DoublyLinkedList</code>](#DoublyLinkedList)
Convert an array into a DoublyLinkedList instance, return the new instance.

**Kind**: static method of [<code>DoublyLinkedList</code>](#DoublyLinkedList)  
**Methodof**: DoublyLinkedList  

| Param | Type | Default |
| --- | --- | --- |
| [values] | <code>Array</code> | <code>[]</code> | 
| [linkerClass] | [<code>DoubleLinker</code>](#DoubleLinker) | <code>DoubleLinker</code> | 
| [listClass] | [<code>DoublyLinkedList</code>](#DoublyLinkedList) | <code>DoublyLinkedList</code> | 

<a name="DoubleLinker"></a>

## DoubleLinker ⇐ [<code>Linker</code>](#Linker)
DoubleLinker represents a node in a DoublyLinkedList.

**Kind**: global class  
**Extends**: [<code>Linker</code>](#Linker)  

* [DoubleLinker](#DoubleLinker) ⇐ [<code>Linker</code>](#Linker)
    * [new DoubleLinker([nodeData], [linkerClass])](#new_DoubleLinker_new)
    * _instance_
        * [.classType](#ArrayElement+classType) ⇒ [<code>ArrayElement</code>](#ArrayElement)
    * _static_
        * [.make(linker, [linkerClass])](#DoubleLinker.make) ⇒ [<code>Linker</code>](#Linker)
        * [.fromArray([values], [linkerClass])](#DoubleLinker.fromArray) ⇒ <code>Object</code>

<a name="new_DoubleLinker_new"></a>

### new DoubleLinker([nodeData], [linkerClass])
Create the new DoubleLinker instance, provide the data and optionally configure the type of Linker.


| Param | Type | Default |
| --- | --- | --- |
| [nodeData] | <code>Object</code> | <code>{}</code> | 
| [nodeData.data] | <code>\*</code> | <code></code> | 
| [nodeData.prev] | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>null</code> | <code></code> | 
| [nodeData.next] | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>null</code> | <code></code> | 
| [linkerClass] | [<code>DoubleLinker</code>](#DoubleLinker) | <code>DoubleLinker</code> | 

<a name="ArrayElement+classType"></a>

### doubleLinker.classType ⇒ [<code>ArrayElement</code>](#ArrayElement)
Return the type of class used for Element.

**Kind**: instance property of [<code>DoubleLinker</code>](#DoubleLinker)  
**Overrides**: [<code>classType</code>](#ArrayElement+classType)  
<a name="DoubleLinker.make"></a>

### DoubleLinker.make(linker, [linkerClass]) ⇒ [<code>Linker</code>](#Linker)
Make a new DoubleLinker from the data given if it is not already a valid Linker.

**Kind**: static method of [<code>DoubleLinker</code>](#DoubleLinker)  
**Methodof**: DoubleLinker  

| Param | Type | Default |
| --- | --- | --- |
| linker | [<code>DoubleLinker</code>](#DoubleLinker) \| <code>\*</code> |  | 
| [linkerClass] | [<code>DoubleLinker</code>](#DoubleLinker) | <code>DoubleLinker</code> | 

<a name="DoubleLinker.fromArray"></a>

### DoubleLinker.fromArray([values], [linkerClass]) ⇒ <code>Object</code>
Convert an array into DoubleLinker instances, return the head and tail DoubleLinkers.

**Kind**: static method of [<code>DoubleLinker</code>](#DoubleLinker)  
**Methodof**: DoubleLinker  

| Param | Type | Default |
| --- | --- | --- |
| [values] | <code>Array</code> | <code>[]</code> | 
| [linkerClass] | [<code>DoubleLinker</code>](#DoubleLinker) | <code>DoubleLinker</code> | 

<a name="Arrayable"></a>

## Arrayable
DoublyLinkedList represents a collection stored as a LinkedList with prev and next references.

**Kind**: global class  

* [Arrayable](#Arrayable)
    * [new Arrayable(classType)](#new_Arrayable_new)
    * _instance_
        * [.classType](#Arrayable+classType) ⇒ [<code>Arrayable</code>](#Arrayable)
        * [.initialized](#Arrayable+initialized) ⇒ <code>boolean</code>
        * [.innerList](#Arrayable+innerList) ⇒ <code>Array</code>
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
        * [.fromArray(values, elementClass, classType)](#Arrayable.fromArray) ⇒ [<code>Arrayable</code>](#Arrayable)

<a name="new_Arrayable_new"></a>

### new Arrayable(classType)
Create the new Arrayable instance, configure the Arrayable class.


| Param | Type |
| --- | --- |
| classType | [<code>Arrayable</code>](#Arrayable) \| <code>Iterable</code> | 

<a name="Arrayable+classType"></a>

### arrayable.classType ⇒ [<code>Arrayable</code>](#Arrayable)
Return the type of class used for Arrayable.

**Kind**: instance property of [<code>Arrayable</code>](#Arrayable)  
<a name="Arrayable+initialized"></a>

### arrayable.initialized ⇒ <code>boolean</code>
Detect if the inner list has been initialized.

**Kind**: instance property of [<code>Arrayable</code>](#Arrayable)  
<a name="Arrayable+innerList"></a>

### arrayable.innerList ⇒ <code>Array</code>
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

| Param | Type |
| --- | --- |
| initialList | [<code>ArrayElement</code>](#ArrayElement) \| <code>Array</code> | 

<a name="Arrayable+insertAfter"></a>

### arrayable.insertAfter(node, newNode) ⇒ [<code>Arrayable</code>](#Arrayable)
Insert a new node (or data) after a node.

**Kind**: instance method of [<code>Arrayable</code>](#Arrayable)  

| Param | Type |
| --- | --- |
| node | [<code>ArrayElement</code>](#ArrayElement) \| <code>\*</code> | 
| newNode | [<code>ArrayElement</code>](#ArrayElement) \| <code>\*</code> | 

<a name="Arrayable+insertBefore"></a>

### arrayable.insertBefore(node, newNode) ⇒ [<code>Arrayable</code>](#Arrayable)
Insert a new node (or data) before a node.

**Kind**: instance method of [<code>Arrayable</code>](#Arrayable)  

| Param | Type |
| --- | --- |
| node | [<code>ArrayElement</code>](#ArrayElement) \| <code>\*</code> | 
| newNode | [<code>ArrayElement</code>](#ArrayElement) \| <code>\*</code> | 

<a name="Arrayable+append"></a>

### arrayable.append(node, after) ⇒ [<code>Arrayable</code>](#Arrayable)
Add a node (or data) after the given (or last) node in the list.

**Kind**: instance method of [<code>Arrayable</code>](#Arrayable)  

| Param | Type |
| --- | --- |
| node | [<code>ArrayElement</code>](#ArrayElement) \| <code>\*</code> | 
| after | [<code>ArrayElement</code>](#ArrayElement) | 

<a name="Arrayable+prepend"></a>

### arrayable.prepend(node, before) ⇒ [<code>Arrayable</code>](#Arrayable)
Add a node (or data) before the given (or first) node in the list.

**Kind**: instance method of [<code>Arrayable</code>](#Arrayable)  

| Param | Type |
| --- | --- |
| node | [<code>ArrayElement</code>](#ArrayElement) \| <code>\*</code> | 
| before | [<code>ArrayElement</code>](#ArrayElement) | 

<a name="Arrayable+remove"></a>

### arrayable.remove(node) ⇒ [<code>ArrayElement</code>](#ArrayElement)
Remove an element from this arrayable.

**Kind**: instance method of [<code>Arrayable</code>](#Arrayable)  

| Param | Type |
| --- | --- |
| node | [<code>ArrayElement</code>](#ArrayElement) | 

<a name="Arrayable+item"></a>

### arrayable.item(index) ⇒ [<code>ArrayElement</code>](#ArrayElement) \| <code>null</code>
Retrieve a DoubleLinker item from this list by numeric index, otherwise return null.

**Kind**: instance method of [<code>Arrayable</code>](#Arrayable)  

| Param | Type |
| --- | --- |
| index | <code>number</code> | 

<a name="Arrayable+forEach"></a>

### arrayable.forEach(callback, thisArg) ⇒ [<code>Arrayable</code>](#Arrayable)
Be able to run forEach on this Arrayable to iterate over the elements.

**Kind**: instance method of [<code>Arrayable</code>](#Arrayable)  

| Param | Type |
| --- | --- |
| callback | [<code>forEachCallback</code>](#forEachCallback) | 
| thisArg | [<code>Arrayable</code>](#Arrayable) | 

<a name="Arrayable.fromArray"></a>

### Arrayable.fromArray(values, elementClass, classType) ⇒ [<code>Arrayable</code>](#Arrayable)
Convert an array to an Arrayable.

**Kind**: static method of [<code>Arrayable</code>](#Arrayable)  
**Methodof**: Arrayable  

| Param | Type |
| --- | --- |
| values | <code>Array</code> | 
| elementClass | [<code>ArrayElement</code>](#ArrayElement) | 
| classType | [<code>Arrayable</code>](#Arrayable) \| <code>Iterable</code> | 

<a name="ArrayElement"></a>

## ArrayElement
Element represents a node in an Arrayable.

**Kind**: global class  

* [ArrayElement](#ArrayElement)
    * [new ArrayElement([data], [elementClass])](#new_ArrayElement_new)
    * _instance_
        * [.classType](#ArrayElement+classType) ⇒ [<code>ArrayElement</code>](#ArrayElement)
    * _static_
        * [.make(element, [elementClass])](#ArrayElement.make) ⇒ [<code>ArrayElement</code>](#ArrayElement)
        * [.fromArray([values], [elementClass])](#ArrayElement.fromArray) ⇒ <code>Object</code>

<a name="new_ArrayElement_new"></a>

### new ArrayElement([data], [elementClass])
Create the new Element instance, provide the data and optionally configure the type of Element.


| Param | Type | Default |
| --- | --- | --- |
| [data] | <code>\*</code> | <code></code> | 
| [elementClass] | [<code>ArrayElement</code>](#ArrayElement) | <code>Element</code> | 

<a name="ArrayElement+classType"></a>

### arrayElement.classType ⇒ [<code>ArrayElement</code>](#ArrayElement)
Return the type of class used for Element.

**Kind**: instance property of [<code>ArrayElement</code>](#ArrayElement)  
<a name="ArrayElement.make"></a>

### ArrayElement.make(element, [elementClass]) ⇒ [<code>ArrayElement</code>](#ArrayElement)
Make a new Element from the data given if it is not already a valid Element.

**Kind**: static method of [<code>ArrayElement</code>](#ArrayElement)  
**Methodof**: ArrayElement  

| Param | Type | Default |
| --- | --- | --- |
| element | [<code>ArrayElement</code>](#ArrayElement) \| <code>\*</code> |  | 
| [elementClass] | [<code>ArrayElement</code>](#ArrayElement) | <code>Element</code> | 

<a name="ArrayElement.fromArray"></a>

### ArrayElement.fromArray([values], [elementClass]) ⇒ <code>Object</code>
Convert an array into Element instances, return the head and tail Elements.

**Kind**: static method of [<code>ArrayElement</code>](#ArrayElement)  
**Methodof**: ArrayElement  

| Param | Type | Default |
| --- | --- | --- |
| [values] | <code>Array</code> | <code>[]</code> | 
| [elementClass] | [<code>ArrayElement</code>](#ArrayElement) | <code>Element</code> | 

<a name="recipes"></a>

## recipes : <code>Object</code>
List of class declarations that can be used to specify attributes for a style of object / class.

**Kind**: global constant  
<a name="completeResponse"></a>

## completeResponse : <code>Object</code>
Return results of the task.

**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| success | <code>\*</code> | 
| error | <code>\*</code> | 
| context | <code>\*</code> | 

<a name="forEachCallback"></a>

## forEachCallback ⇒
Run this function for each element in this arrayable.

**Kind**: global typedef  
**Returns**: void  

| Param | Type |
| --- | --- |
| element | [<code>ArrayElement</code>](#ArrayElement) | 
| index | <code>number</code> | 
| thisArg | [<code>Arrayable</code>](#Arrayable) | 

