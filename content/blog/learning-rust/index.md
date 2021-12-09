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

This post is supposed to be just a journal of things that I might like, dislike or find interesting enough to document as I learn Rust enough to build a simple CLI app.

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

```rs
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

```rs
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

```rs
let a = 5; //This is immutable, `a` cannot be re-assigned.
let mut b = 10; // `b` can be reassigned.
```

### Shadowing
Rust allows developers to re-declare a variable with the same name in a scope. This is called Shadowing.

Consider the following snippet - 

```rs
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
```rs
fn main() {
    let x = 5;

    x = x + 1; // will fail
}
```

The usecase for shadowing defined in the [Rust Book](https://doc.rust-lang.org/book/ch03-01-variables-and-mutability.html#shadowing) is for running multiple transforms on the same variable without having to declare a bunch of variables names that we don't care about. 

It will interesting to see if this causes any issues on larger Rust codebases.

---

**Last Updated**: 10 December 2021.


