# syncprompt
A _real_ sync-prompt solution for node.

## What is this?
Python users have always add a simple easy way to grab user-input:
```pythono
foo = input()
```

while us JavaScript users are stuck with:
```js
process.stdin.resume()
process.stdin.on('data', function(foo) {
    // ... code
});
```

but those days are long over! This brings an elegant prompt function to node.

---

Well they are other sync-prompt libraries? Hardly, here are the two:

 - [sync-prompt](https://github.com/shovon/sync-prompt), not maintained, doesn't even work on most versions of node anymore
 - [prompt-sync](https://github.com/0x00A/prompt-sync), very flimsy, doesn't properly handle mixed stdin modes, and lacks proper support for more complex stdin reading. Attempts to mimick terminal inputs with raw-mode but breaks easily

So here's a _real_ solution, one that _actually_ mimicks a `getline` or `input` function (uses `getline()` internally).

## Installation
This is easy. Install using:

```shell
$ npm install --save syncprompt
```

Now, in your project, just do:

```js
var prompt = require('syncprompt');
```

or, if you're using the fancy new `import` syntax:

```js
import prompt from 'syncprompt';
```

## Usage
Usage couldn't be more simple. Simple do:

```js
var name = prompt("What's your name? ");
```

Passwords? simply add `secure: true` and you'll get a _real_ hidden password prompt:

```js
var passwords = prompt("Password? ", { secure: true });
```

## Examples
A full example is the following:

```js
var prompt = require('syncprompt');

var username = prompt("Username: ");
var password = prompt("Password: ", { secure: true });

console.log( "Username: %s\nPassword: %s", username, password );
```
