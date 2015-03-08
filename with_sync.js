var Synchronize = require('./synchronize')

// Ideally this would be a stack-local variable,
// as in the JS equivalent of a therad-local variable
// Right now, you either have a lexical view of it,
// or pass it around to everything
var sync = new Synchronize()

var waitForTimeouts = function(timeouts, callback) {
  for(var i=0; i < timeouts.length; ++i) {
    let timeout = timeouts[i]
    setTimeout(sync.up(callback, timeout),
               timeout
              )
  }
  sync.down(); // waits for the calls to `up` to return
}

console.log("-----  With Sync  -----")
console.log("This does not return from the function call until the async operations are complete");
console.log();

var timeoutTimes = [1, 4, 2, 3] // these don't seem to actually be seconds, but w/e
console.log("before call");
waitForTimeouts(timeoutTimes, seconds => console.log(`Waited ${seconds} seconds`))
console.log("after call");
