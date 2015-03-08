var Synchronize = require('./synchronize')
var Sync = new Synchronize()

var waitForTimeouts = function(timeouts, callback) {
  for(var i=0; i < timeouts.length; ++i) {
    let timeout = timeouts[i]
    setTimeout( ()=>callback(timeout), timeout)
  }
}

console.log("-----  With Sync  -----")
console.log("This does not return from the function call until the async operations are complete");
console.log();

var timeoutTimes = [1, 4, 2, 3]
console.log("before call");
waitForTimeouts(timeoutTimes, seconds => console.log(`Waited ${seconds} seconds`))
console.log("after call");
