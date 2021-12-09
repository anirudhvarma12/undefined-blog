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

---

**Last Updated**: 10 December 2021.
