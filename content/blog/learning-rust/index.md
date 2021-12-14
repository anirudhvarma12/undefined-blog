---
title: 'Learning Rust - The Interesting Parts'
date: '2020-12-10'
---

I have been programming for some time now and have been fortunate enough to have worked on a bunch of different languages like Java, C#, Python, JavaScript (TypeScript).

I have been thinking of picking up a new language for sometime now and the choice came down to Go & Rust. As the title indicates, I went with Rust.

## Why Rust?

1. **The ecosystem**: As a frontend/JavaScript developer, I am seeing more and more tools being re-written in Rust for performance benefits, and so hopefully, I would be able to contribute or at least learn from those code bases in the context of my day to day work.
2. **Its Different?!**: All of my previous experiences have been in application-oriented, managed languages. Rust is similar, but has some interesting concepts like [Immutability-by-default](https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html), [Ownership](https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html) etc.

## What is this post?

This post is supposed to be just a journal of things that I might like, dislike or find interesting enough to document as I learn Rust enough to build a simple CLI app. I am following the [Rust Programming Language Book](https://doc.rust-lang.org/book) and many snippets here are picked from there.

## The Setup: Rust and Sublime Text 3 (MacOS)

### Packages Required

- [Rust Enhanced](https://rust-lang.github.io/rust-enhanced): The official Rust package for ST3.
- [rust-analyzer](https://rust-analyzer.github.io/): Language Server implementation for Rust.

### Setup the Language Server

- Install the [LSP Package](https://github.com/sublimelsp/LSP)
- Download the right package from releases.
- Extract the package.
- Rename to `rust-analyzer`
- Add to `$PATH`
- Make it executable `chmod +x rust-analyzer`

### Enable the Language Server in Sublime

- Open Command Pallete (Cmd + Shift + P)
- Select `LSP: Enable Language Server Globally`
- Select `rust-analyzer`

## The Interesting Parts

### Match

Rust has an expressive `match` syntax that can be used to compare values. A match expression is written like -

```rust
use std::cmp::Ordering;

fn main(){
    let guess = 4; // some sample value, can be input
    let secret = 5; // another value to compare against.

    match guess.cmp(&secret) {
            Ordering::Less => println!("Under"),
            Ordering::Equal => println!("Match!!"),
            Ordering::Greater => println!("Over")
        }
}
```

Each line in the `match` block is called an `arm`. In my opinion this makes the code very easy to read and understand at a glance.

### Built-In Error Handling

Some operations, like I/O always require error handling. Rust's `Result` type represents either a success (`OK`) or an error (`Err`).

The great thing here is that if a function returns a `Result`, then the caller must handle both success and failure cases.

Consider this code that converts a string to an int -

```rust
let guess: u32 = match guess.trim().parse() {
            Ok(num) => num,
            Err(_) => {
                eprintln!("{} is not a legit number, try again;", guess.trim());
                return ()
            },
        };
```

### Immutable Variables
One major difference in Rust vs the other langugages I mentioned above is that variables in Rust are immutable by default. 

In cases where we need to re-assign a value to a variable, we need to explicitly mark that variable as mutable by using the `mut` keyword.

```rust
let a = 5; //This is immutable, `a` cannot be re-assigned.
let mut b = 10; // `b` can be reassigned.
```

### Shadowing
Rust allows developers to re-declare a variable with the same name in a scope. This is called Shadowing.

Consider the following snippet - 

```rust
fn main() {
    let x = 5;

    let x = x + 1;

    {
        let x = x * 2;
        println!("The value of x in the inner scope is: {}", x); // This will print 12
    }

    println!("The value of x is: {}", x); // This is still 6.
}

```

Honestly, the first time I saw this, I was pretty confused. Alot of other languages just refuse this kind of re-declaring of variables in scope.

Technically, this variable is still immutable, i.e. this snippet would fail -
```rust
fn main() {
    let x = 5;

    x = x + 1; // will fail
}
```

The usecase for shadowing defined in the [Rust Book](https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html#shadowing) is for running multiple transforms on the same variable without having to declare a bunch of variables names that we don't care about. 

It will interesting to see if this causes any issues on larger Rust codebases.

### Arrays
* Arrays in Rust are more like Java than JavaScript. While an array in JavaScript can grow in size after initialization, arrays in Rust are fixed size. 
* An array maybe initialized using the type of its elements and the the length like - `let x:[char, 5] = ['a','b','c','d','e']`
* Rust also provides a shorthand syntax when we want to create an array with the same elements like `let x = [3;'a']`. This creates an array like `['a','a','a']`

### Expressions vs Statements
Statements do not return a value. An assignemnt is a statement. Consider the following JavaScript snippet;
```js
const a = b = 12;
console.log(a); // prints 12
console.log(b); // prints 12
```

Here the variable `a` gets a value 12, because `b=12` returns 12. However, assignments in Rust don't return a value.

Expressions return a value, Rust is an [Expression oriented](https://en.wikipedia.org/wiki/Expression-oriented_programming_language) language.

The block `{}` created for new scopes is an expression and thus can be assigned to variable like - 

```rust
   let y = {
        let x = 3;
        x + 1
    };
```

Here the last line in the block does not end with a semi-colon (;), thats because expressions do not include ending semicolons, if we add a semicolon, then it becomes a statement and hence it does not return a value.

### Return Values
In Rust, the by default, the return value of the function is the value returned by the last expression in the function. Using `return` can be used to exit early, but otherwise its optional.

### Conditional Assignemnt
Since `if` is an expression, conditional assignemnts don't require additional syntax. 

```rust
let condition = true;
let number = if condition { 5 } else { 6 };
```

### Infinite Loops? There is a keyword for that
Rust has built-in support for infinite loops [using the `loop` keyword](https://doc.rust-lang.org/book/ch03-05-control-flow.html#repeating-code-with-loop). This is the first language where I am seeing this. 

#### Returning with break;
Another first for me, was the ability to return values with the `break` keyword. 
```rust
    let mut counter = 0;

    let result = loop {
        counter += 1;

        if counter == 10 {
            break counter * 2;
        }
    };

    println!("The result is {}", result);
```
* Note that since `loop` is treated as an expression that yields a value, we can put it on the right side of assignment. 
* The `break counter * 2` statement not only stops the loop, but assigns the value to the variable `result`

*Source* https://doc.rust-lang.org/book/ch03-05-control-flow.html#returning-values-from-loops

### Ownership
Just refer - https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html

#### Rules of ownership
* Each value in Rust has a variable that’s called its owner.
* There can only be one owner at a time.
* When the owner goes out of scope, the value will be dropped.


#### Reassigning 'objects'
Consider the following JS Code:

```js
    const x = {foo:1};
    const y = x;
    y.foo = 2; // this works and sets x.foo = 2
```
Here JavaScript assigns the reference to the variable x to y. So when some code alters `y.foo`, it's actually changing `x.foo`. 

Consider the following rust snippet

```rust
    let s1 = String::from("hello");
    let s2 = s1;
    println!(s1); // this errors.
```

In this case, Rust too copies the pointer to where "Hello" is stored, but does not copy the data itself. However, due to how ownership works, and to keep things simple, `let s2=s1` actually invalidates `s1` and transfers the ownership of `Hello` to `s2`. After the re-assignment `s1` can no longer be used. This is called `move`. 

As explained [here](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html#ways-variables-and-data-interact-move),  this is done so that `hello` only has one owner (s2) and when s2 goes out of scope, Rust can easily free up the memory.

**Note**: Fixed length data like integers and floats, that is stored on the stack can be re-assiged without invalidating the old variable. [Read More Here](https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html#stack-only-data-copy)

#### Ownership and Functions
Passing data to functions as arguments also transfers the ownership of that data. Assume a regular `say_hello` function like - 

```rust
fn say_hello(name: String)->String {
    String::from("Hello!, ") + &name
}

fn main() {
    let s1 = String::from("foo");  
    println!("{}", say_hello(s1));
    println!("{}". s1); // This would complain about `s1` having moved
}
```

Passing variables to a function and then storing its return value back in a different variable will obviously be tedios and not always desirable. To get around this Rust has the concept of [References](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html)

```rust
fn say_hello(name: &String)->String {
    String::from("Hello!, ") + &name
}

fn main() {
    let s1 = String::from("foo");  
    println!("{}", say_hello(&s1));
    println!("{}". s1);
}
```

The `&` syntax creates a reference to the value of `s1`, but it does not own it. Creating references is called **borrowing**.

*Notes* 
- References, just like variables are mutable by default. In order to change a reference, it needs to be marked with `&mut`.
- There can only be one mutable reference at a time.


---

**Last Updated**: 15 December 2021.


