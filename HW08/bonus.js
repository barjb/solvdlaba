class AsyncOperationManager {
    simulateAsyncOperation(delay) {
        setTimeout(() => {
            console.log(`setTimeout: ${delay}`);
            setImmediate(() => console.log(`setTimeout setImmediate ${delay}`));
            setTimeout(() => console.log(`setTimeout setTimeout ${delay}`));
            Promise.resolve().then(() =>
                console.log(`setTimeout Promise.resolve ${delay}`)
            );
            process.nextTick(() =>
                console.log(`setTimeout process.nextTick ${delay}`)
            );
        }, delay);
    }
    scheduleImmediate() {
        setImmediate(() => {
            console.log("setImmediate");
            setImmediate(() => console.log(`setImmediate setImmediate`));
            setTimeout(() => console.log(`setImmediate setTimeout`));
            Promise.resolve().then(() =>
                console.log(`setImmediate Promise.resolve`)
            );
            process.nextTick(() =>
                console.log(`setImmediate process.nextTick`)
            );
        });
    }
    nextTickMethod() {
        process.nextTick(() => {
            console.log("process.nextTick");
            setImmediate(() => console.log(`process.nextTick setImmediate`));
            setTimeout(() => console.log(`process.nextTick setTimeout`));
            process.nextTick(() =>
                console.log(`process.nextTick process.nextTick`)
            );
            Promise.resolve().then(() =>
                console.log(`process.nextTick Promise.resolve`)
            );
        });
    }
}

const manager = new AsyncOperationManager();
manager.simulateAsyncOperation(0);
manager.scheduleImmediate();
Promise.resolve().then(() => console.log("Promise.resolve main flow"));
manager.nextTickMethod();

console.log("LAST LINE");

/*
0 - Microtask Queue
0/1 - process.nextTick Queue
0/2 - Promise Queue
1 - Timer Queue
2 - I/O Queue
* I/O Polling
3 - Check Queue
4 - Close Queue

There are 4 queues used in this demo:
0/1 process.nextTick
0/2 promise
1   timer
3   check

Result:
    LAST LINE
    process.nextTick
    process.nextTick process.nextTick
    Promise.resolve main flow
    process.nextTick Promise.resolve
    setTimeout: 0
    setTimeout process.nextTick 0
    setTimeout Promise.resolve 0
    process.nextTick setTimeout
    setImmediate
    setImmediate process.nextTick
    setImmediate Promise.resolve
    process.nextTick setImmediate
    setTimeout setImmediate 0
    setTimeout setTimeout 0
    setImmediate setTimeout
    setImmediate setImmediate

Explaination:
    LAST LINE - gets executed first as a part of a synchronous flow

    Queues are filled with callbacks:
    0/1 = [() => {
            console.log("process.nextTick");
            setImmediate(() => console.log(`process.nextTick setImmediate`));
            setTimeout(() => console.log(`process.nextTick setTimeout`));
            process.nextTick(() =>
                console.log(`process.nextTick process.nextTick`)
            );
            Promise.resolve().then(() =>
                console.log(`process.nextTick Promise.resolve`)
            );
        }]
    0/2 = [() => console.log("Promise.resolve main flow")]
    1 = [() => {
            console.log(`setTimeout: ${delay}`);
            setImmediate(() => console.log(`setTimeout setImmediate ${delay}`));
            setTimeout(() => console.log(`setTimeout setTimeout ${delay}`));
            Promise.resolve().then(() =>
                console.log(`setTimeout Promise.resolve ${delay}`)
            );
            process.nextTick(() =>
                console.log(`setTimeout process.nextTick ${delay}`)
            );
        }]
    3 = [() => {
            console.log("setImmediate");
            setImmediate(() => console.log(`setImmediate setImmediate`));
            setTimeout(() => console.log(`setImmediate setTimeout`));
            Promise.resolve().then(() =>
                console.log(`setImmediate Promise.resolve`)
            );
            process.nextTick(() =>
                console.log(`setImmediate process.nextTick`)
            );
        }]

================ LOOP PHASE 1 ================

    We move to phase 1. Because 0/1 and 0/2 are not empty they are processed as described in AsyncOperationManager.js. Firstly 0/1.

    console.log("process.nextTick"); gets printed on the screen. Callback is run. 0/1 gets emptied, queues receive additional tasks from executed callback.
    Current state:
    0/1 = [() => console.log(`process.nextTick process.nextTick`)]
    0/2 = [() => console.log("Promise.resolve main flow"), () = > console.log(`process.nextTick Promise.resolve`)]
    1 = [() => {
        console.log(`setTimeout: ${delay}`);
        setImmediate(() => console.log(`setTimeout setImmediate ${delay}`));
        setTimeout(() => console.log(`setTimeout setTimeout ${delay}`));
        Promise.resolve().then(() =>
            console.log(`setTimeout Promise.resolve ${delay}`)
        );
        process.nextTick(() =>
            console.log(`setTimeout process.nextTick ${delay}`)
        );
    }, () => console.log(`process.nextTick setTimeout`)]
    3 = [() => {
        console.log("setImmediate");
        setImmediate(() => console.log(`setImmediate setImmediate`));
        setTimeout(() => console.log(`setImmediate setTimeout`));
        Promise.resolve().then(() =>
            console.log(`setImmediate Promise.resolve`)
        );
        process.nextTick(() =>
            console.log(`setImmediate process.nextTick`)
        );
    }, () => console.log(`process.nextTick setImmediate`)]

    As 0/1 gets emptied, 0/2 is emptied next. As you can see 0/1 executes second callback, that's why uncareful usage of process.nextTick may lead to I/O starvation.
    console.log(`process.nextTick process.nextTick`)
    console.log("Promise.resolve main flow"),
    console.log(`process.nextTick Promise.resolve`), Three lines are printed on the screen.
    
    0/1 and 0/2 are empty. Loop executes first callback fop 1.
    console.log(`setTimeout: ${delay}`); Is printed on the screen. Other queues are updated.

    Current state:
    0/1 = [() =>console.log(`setTimeout process.nextTick ${delay}`)]
    0/2 = [() => console.log(`setTimeout Promise.resolve ${delay}`)]
    1 = [() => console.log(`process.nextTick setTimeout`), () => console.log(`setTimeout setTimeout ${delay}`)]
    3 = [() => {
        console.log("setImmediate");
        setImmediate(() => console.log(`setImmediate setImmediate`));
        setTimeout(() => console.log(`setImmediate setTimeout`));
        Promise.resolve().then(() =>
            console.log(`setImmediate Promise.resolve`)
        );
        process.nextTick(() =>
            console.log(`setImmediate process.nextTick`)
        );
    }, () => console.log(`process.nextTick setImmediate`), () => console.log(`setTimeout setImmediate ${delay}`)]
    
    As 0/1 and 0/2 are not empty. Firstly 0/1 gets emptied then 0/2.

    console.log(`setTimeout process.nextTick ${delay}`)
    console.log(`setTimeout Promise.resolve ${delay}`) Both lines are printed on a screen.

    As 0/1 and 0/2 are empty. Current phase of event queue is still 1.
    Current state: 
    0/1 = []
    0/2 = []
    1 = [() => console.log(`process.nextTick setTimeout`), () => console.log(`setTimeout setTimeout ${delay}`)]
    3 = [() => {
        console.log("setImmediate");
        setImmediate(() => console.log(`setImmediate setImmediate`));
        setTimeout(() => console.log(`setImmediate setTimeout`));
        Promise.resolve().then(() =>
            console.log(`setImmediate Promise.resolve`)
        );
        process.nextTick(() =>
            console.log(`setImmediate process.nextTick`)
        );
    }, () => console.log(`process.nextTick setImmediate`), () => console.log(`setTimeout setImmediate ${delay}`)]

    console.log(`process.nextTick setTimeout`) Gets printed on the screen.
    Callback () => console.log(`setTimeout setTimeout ${delay}`) creted in this iteration will be executed in the next iteration.

    Current state: 
    0/1 = []
    0/2 = []
    1 = [() => console.log(`setTimeout setTimeout ${delay}`)]
    3 = [() => {
        console.log("setImmediate");
        setImmediate(() => console.log(`setImmediate setImmediate`));
        setTimeout(() => console.log(`setImmediate setTimeout`));
        Promise.resolve().then(() =>
            console.log(`setImmediate Promise.resolve`)
        );
        process.nextTick(() =>
            console.log(`setImmediate process.nextTick`)
        );
    }, () => console.log(`process.nextTick setImmediate`), () => console.log(`setTimeout setImmediate ${delay}`)]

================ LOOP PHASE 2 ================

We don't process any I/O tasks.

================ LOOP PHASE  3 ================

    Loop moves to phase 3.
  
    console.log("setImmediate"); Gets printed on the screen. Other queues receive callbacks. 
    Callback () => console.log(`setImmediate setImmediate`) created in this iteration will be executed in the next iteration. 

    Current state:
    0/1 = [() => console.log(`setImmediate process.nextTick`)]
    0/2 = [() => console.log(`setImmediate Promise.resolve`)]
    1   = [() => console.log(`setTimeout setTimeout ${delay}`),() => console.log(`setImmediate setTimeout`)]
    3   = [() => console.log(`process.nextTick setImmediate`), () => console.log(`setTimeout setImmediate ${delay}`), () => console.log(`setImmediate setImmediate`)]
    Before we move further queue 0/1 and 0/2 finish their callbacks.

    0/1 and 0/2 get emptied.
    console.log(`setImmediate process.nextTick`)
    console.log(`setImmediate Promise.resolve`) Get printed on a screen.

    Current state:
    0/1 = []
    0/2 = []
    1   = [() => console.log(`setTimeout setTimeout ${delay}`),() => console.log(`setImmediate setTimeout`)]
    3   = [() => console.log(`process.nextTick setImmediate`), () => console.log(`setTimeout setImmediate ${delay}`), () => console.log(`setImmediate setImmediate`)]

    Execution continues with callbacks.
    console.log(`process.nextTick setImmediate`)
    console.log(`setTimeout setImmediate ${delay}`) Get printed on the screen. 

    Current state:
    0/1 = []
    0/2 = []
    1   = [() => console.log(`setTimeout setTimeout ${delay}`),() => console.log(`setImmediate setTimeout`)]
    3   = [() => console.log(`setImmediate setImmediate`)]

================ LOOP PHASE  4 ================

We don't close any streams.

================ LOOP PHASE  1 ================

    Loop moves back to 1.
    console.log(`setTimeout setTimeout ${delay}`)
    console.log(`setImmediate setTimeout`) Are printed on the screen.

    Current state:
    0/1 = []
    0/2 = []
    1   = []
    3   = [() => console.log(`setImmediate setImmediate`)]

================ LOOP PHASE  2 ================

We don't process any I/O tasks.

================ LOOP PHASE  3 ================

    Loop moves to phase 3
    console.log(`setImmediate setImmediate`) Gets printed on the screen.

    0/1 = []
    0/2 = []
    1   = []
    3   = []
*/
