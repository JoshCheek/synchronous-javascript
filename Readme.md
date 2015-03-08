A failed experiment
===================

This was an experiment to see if I could get generators
to perform the kind of synchronization that I want every
time I use JavaScript.

The basic idea is that I can take the current stack of execution
and place it into the event queue as the callback.

This did not work, becuase as far as I can tell,
generators are not true coroutines. So there is
no way to get back to the top of the stack to return,
allowing the next item in the queue to be evaluated,
and then resuming the current execution once its
callback makes its way to the front of the queue.

It **might** be possible if I were to write this
within the transpiler, but as of right now, the
`yield` cannot be called from the function I hand
to `setTimeout`. If I could find a way to do that,
though, then I could probably use exceptions to
jump back to the top of the stack.

Or, maybe it just needs interpreter level support
to ever actually work.

One possible alternative is to write your own event loop,
possibly this can be done in a non-invasive way through
transpiling, or possibly you'd have to completely reimplement
javaScript, and use asm.js to reduce the performance hit.
Not really sure. I'll keep contemplating it.

Possible solution with transpiling
----------------------------------

I had attempted to do this before in js [here](https://gist.github.com/JoshCheek/47c3fb69640202ec72c7),
but my rewriter wasn't good enough, and I don't really know js,
and in Ruby [here](https://github.com/JoshCheek/event_loop/blob/5b22d1216690c56aecf744873a35f064fc4a69dc/Readme.md#event-loop)
but I got [sidetracked](https://github.com/rspec/rspec-core/pull/1858).

I still think it could work. Here's an example that should work
with code rewriting (I can't tell, yet, if it will be able
to handle more complex examples):

```javascript
// initial code
var pretendThisIsAsync = function(var) {
  return var
}

var a = 0
a = pretendThisIsAsync 1
a + 2
```

It should be able to be rewritten as this:

```javascript
// rewritten code
var pretendThisIsAsync = function(var, async) {
  async(var)
}

var a = 0
call 1, -> result {
  a = result
  a + 2
}
```

But of course, you'd have to pass the `async` fn on every function call,
or use a keyword to tell the transpiler when to do this,
becuse it doesn't actually stop the stack, it instead puts all execution
into callbacks... essentially, turning the stack into a queue.

Instructions
------------

Get babel:

```sh
$ npm install --global babel
```

Run against the examples:

```sh
$ ./run
```

Currently (node 0.10.26, babel 4.7.3),
this will hang forever.
You might kill it with `C-c`,
but it starts a node process that it doesn't clean up,
so you'll have to go kill that independently.
