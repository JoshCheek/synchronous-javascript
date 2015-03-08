class Synchronize {
  constructor() {
  }
}

var Sync = new Synchronize();

var waitForTimeouts = function(timeouts, callback) {
  for(var i=0; i < timeouts.length; ++i) {
    let timeout = timeouts[i]
    setTimeout( ()=>callback(timeout), timeout)
  }
}

var timeoutTimes = [1, 4, 2, 3]
console.log("before call");
waitForTimeouts(timeoutTimes, seconds => console.log(`Waited ${seconds} seconds`))
console.log("after call");
