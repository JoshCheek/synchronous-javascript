class Synchronize {
  constructor() {
    this.waitCount = 0 // does js have private vars? I don't really want this public
  }

  // receives a normal function (synchronous)
  // returns a function that can be passed to an asynchronous call
  up(cb, arg) {
    this.waitCount++
    return () => {
      cb(arg)
      this.waitCount--
    }
  }

  down() {
    while(this.waitCount != 0)
      Synchronize.requeueCurrentStack()
  }
}

// Doesn't work, because it returns to the caller,
// instead of to the toplevel env.
// See the Readme for some thoughts on possible ways around this.
Synchronize.requeueCurrentStack = function*() {
  // setTimeout(() => yield _, 0)
}

module.exports = Synchronize
