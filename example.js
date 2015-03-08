class Synchronize {
  constructor() {
  }
}

var Sync = new Synchronize();

var waitForTimeouts = function(timeouts, callback) {
  for(var i=0; i < timeouts.length; ++i) {
    callback(timeouts[i]);
  }
}

var timeoutTimes = [1, 4, 2, 3]
waitForTimeouts(timeoutTimes, seconds => console.log(`Waited ${seconds} seconds`))
