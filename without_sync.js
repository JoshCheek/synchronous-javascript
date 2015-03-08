var waitForTimeouts = function(timeouts, callback) {
  for(var i=0; i < timeouts.length; ++i) {
    let timeout = timeouts[i]
    setTimeout(()=>callback(timeout), timeout)
  }
}

var timeoutTimes = [1, 4, 2, 3]
console.log("-----  Without Sync  -----")
console.log("This returns from the fn immediately, without waiting for the timeouts to complete");
console.log();

console.log("before call");
waitForTimeouts(timeoutTimes, seconds => console.log(`Waited ${seconds} seconds`))
console.log("after call");
