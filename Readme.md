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
