class AsyncOperationManager {
    simulateAsyncOperation(delay) {
        setTimeout(() => {
            console.log(`SetTimeout result timeout: ${delay}`);
            process.nextTick(() =>
                console.log("This message shows after SetTimeout")
            );
        }, delay);
    }
    scheduleImmediate() {
        setImmediate(() => {
            console.log("Immediate task executed");
            process.nextTick(() =>
                console.log("This message shows after setImmediate")
            );
        });
    }
    nextTickMethod() {
        process.nextTick(() => console.log("Microtask executed immediately"));
    }
}

const manager = new AsyncOperationManager();

manager.simulateAsyncOperation(200);
manager.scheduleImmediate();
manager.nextTickMethod();
console.log("LAST LINE");

// Description below shows execution of previous commit

/*
Event loop description.
0 - Microtask Queue
0/1 - process.nextTick Queue
0/2 - Promise Queue
1 - Timer Queue
2 - I/O Queue
* I/O Polling
3 - Check Queue
4 - Close Queue

Microtask queue is technically not a part of a loop as nodejs documentation says. It is not implemented as a part of a libuv library unlike the other queues.
Microtask queue consists of two queues. Process.nextTick queue and Promise. The first one has higher priority and it is emptied before second one.
Microtask queue has priority over other queues. When there are tasks present in any of it's queues, the queues are emptied and execution continues.
I/O tasks are polled during I/O polling phase. Then callback is put on I/O queue on the next iteration of the event loop.


There are 3 queues used in this task.
0/1 process.nextTick
1   timer
3   check

Each one is a FIFO queue. I'll use array notation to show their state:
0/1 = [cb1, cb2]
0/2 = [cb3]
etc.


Result:
    LAST LINE
    Microtask executed immediately
    Immediate task executed
    This message shows after setImmediate
    SetTimeout result timeout: 200
    This message shows after SetTimeout

Explaination:
    LAST LINE gets printed first as it is a part of synchronous flow.

    Timers are placed on the timer heap. During each iteration of the event loop, it checks if timer's delay has elapsed.  If so, it places its callback onto the timers queue. 

    TimerHeap = [
        setTimeout(() => {
            console.log(`SetTimeout result timeout: ${delay}`);
            process.nextTick(() =>
                console.log("This message shows after SetTimeout")
            );
        }, delay);
    ]

    Firstly all tasks are put onto queues top-to bottom:
    0/1 = [() => console.log("Microtask executed immediately")]
    1 = []
    3 = [() => {
            console.log("Immediate task executed");
            process.nextTick(() =>
                console.log("This message shows after setImmediate")
            );
    }]

================ LOOP PHASE 1 ================

    0/1 is not empty, so it gets resolved before 1.
        
    console.log("Microtask executed immediately")


    Current state:
    TimerHeap = [
        setTimeout(() => {
            console.log(`SetTimeout result timeout: ${delay}`);
            process.nextTick(() =>
                console.log("This message shows after SetTimeout")
            );
        }, delay);
    ]

    0/1 = []
    1 = []
    3 = [() => {
            console.log("Immediate task executed");
            process.nextTick(() =>
                console.log("This message shows after setImmediate")
            );
    }]

================ LOOP PHASE 2 ================

We don't process any I/O tasks.

================ LOOP PHASE 3 ================
    
    3 gets emptied.
    console.log("Immediate task executed");

    Current state:
    TimerHeap = [
        setTimeout(() => {
            console.log(`SetTimeout result timeout: ${delay}`);
            process.nextTick(() =>
                console.log("This message shows after SetTimeout")
            );
        }, delay);
    ]

    0/1 = [console.log("This message shows after setImmediate")]
    1 = []
    3 = []

    0/1 is not empty, so program prints
    console.log("This message shows after setImmediate")

    Current state:
        TimerHeap = [
        setTimeout(() => {
            console.log(`SetTimeout result timeout: ${delay}`);
            process.nextTick(() =>
                console.log("This message shows after SetTimeout")
            );
        }, delay);
    ]

    0/1 = []
    1 = []
    3 = []

================ LOOP PHASE x ================

    Time elapses callback gets put on the 1 queue.

    Current state:
    0/1 = []
    1 = [() => {
            console.log(`SetTimeout result timeout: ${delay}`);
            process.nextTick(() =>
                console.log("This message shows after SetTimeout")
            );
        }]
    3 = []

...
================ LOOP PHASE 1 ================

    console.log(`SetTimeout result timeout: ${delay}`);

    Current state:
    0/1 = [console.log("This message shows after SetTimeout")]
    1 = []
    3 = []

    0/1 gets emptied, program quits
    console.log("This message shows after SetTimeout")
*/

// Role of microtask and setImmediate
/*
Microtasks:
- high priority
- immediately executed tasks
- used to handle promises 
- process.nextTick 
setImmediate:
- lower priority
- used to break cpu intensive tasks into smaller pieces
*/
