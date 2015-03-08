class Synchronize {
  constructor(halt) {
    // does js have private vars? I don't really want these public
    this.nextWaitId = 0
    this.waiting    = []
    this.halt = halt
  }

  // receives a normal function (synchronous)
  // returns a function that can be passed to an asynchronous call
  up(cb) {
    var waitId = this.getNextWaitId()
    () => {
      cb()
      doneWaiting(waitId)
    }
  }

  down() {
    this.halt(_ => 0 < waiting.length)
  }

  // -----  private  -----

  getNextWaitId() {
    var id = this.nextWaitId
    this.waiting.push(id)
    this.nextWaitId++
    return id
  }

  doneWaiting(id) {
    if(!arrayDelete(this.waiting, id))
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

module.exports = Synchronize
