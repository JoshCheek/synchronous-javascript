class Synchronize {
  constructor() {
    // does js have private vars? I don't really want these public
    this.nextWaitId = 0
    this.waiting    = [] // could probably replace with a simple counter
  }

  // receives a normal function (synchronous)
  // returns a function that can be passed to an asynchronous call
  up(cb, arg) {
    var waitId = this.getNextWaitId()
    // console.log(`Wait on ${waitId} (${this.waiting})`);
    return () => {
      cb(arg)
      this.doneWaiting(waitId)
      // console.log(`Wait on ${waitId} (${this.waiting})`);
    }
  }

  down() {
    while(this.waiting.length != 0)
      Synchronize.requeueCurrentStack()
  }

  // -----  private  -----

  getNextWaitId() {
    var id = this.nextWaitId
    this.waiting.push(id)
    this.nextWaitId++
    return id
  }

  doneWaiting(id) {
    if(!this.arrayDelete(this.waiting, id))
      throw(`Id ${id} not in ${this.waiting}`)
  }

  // ...apparently there is *still* no Array#delete method in js
  // checked with Reflect.ownKeys([].__proto__)
  arrayDelete(ary, toDelete) {
    var index = ary.indexOf(toDelete)
    if(index == -1) return false
    for(; index < ary.length; index++) ary[index] = ary[index+1]
    ary.pop()
    return true;
  }
}

// Doesn't work, because it returns to the caller,
// instead of to the toplevel env.
//
// Might wind up that the only way to do it is start with the
// generator, and call into their code.
//
// I need to let my brain soak in this a bit.
Synchronize.requeueCurrentStack = function*() {
  // setTimeout(() => yield _, 0)
}

module.exports = Synchronize
