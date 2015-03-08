var Synchronize = require('./synchronize')

// move into Synchronize if this works
var halt = function*(haltCondition) {
  if(haltCondition()) {
    // push onto the queue
    // end current execution stack
    setTimeout(() => halt(haltCondition))
  } else {
    yield _
  }
}

// Ideally this would be a stack-local variable,
// as in the JS equivalent of a therad-local variable
var sync = new Synchronize(halt)

var waitForTimeouts = function(timeouts, callback) {
  for(var i=0; i < timeouts.length; ++i) {
    let timeout = timeouts[i]
    setTimeout(
      sync.up(callback(timeout)),
      timeout
    )
  }
  sync.down();
}

console.log("-----  With Sync  -----")
console.log("This does not return from the function call until the async operations are complete");
console.log();

var timeoutTimes = [1, 4, 2, 3]
console.log("before call");
waitForTimeouts(timeoutTimes, seconds => console.log(`Waited ${seconds} seconds`))
console.log("after call");
