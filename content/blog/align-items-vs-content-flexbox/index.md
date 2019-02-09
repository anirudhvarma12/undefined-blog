---
title: Flexbox - Align Items vs Align Content.
date: '2019-02-04'
---

[Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox) is awesome. If you have worked with modern CSS, whether you are rolling your own or using a frameworks like Bootstrap & Foundation, chances are you are using Flexbox for layout and alignment.

> To align or to justify..that is the question

For a very long time, I have been trying to figure out what is the difference between `align-items`, `align-content` & `justify-content` and how they work or more importantly _when_ they work.

### TL;DR

- If you have set your `flex-direction` to `row`, then `justify-content` works on the horizontal axis and `align-*` properties work on the vertical axis.
- If you have set your `flex-direction` to `column`, then `align-*` properties work on the horizontal axis and `justify-content` works on the vertical axis.

<iframe height="265" style="width: 100%;" scrolling="no" title="Align items vs Justify Content" src="//codepen.io/thebigfatpanda12/embed/preview/aXqjNq/?height=265&theme-id=dark&default-tab=html,result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/thebigfatpanda12/pen/aXqjNq/'>Align items vs Justify Content</a> by Anirudh Varma
  (<a href='https://codepen.io/thebigfatpanda12'>@thebigfatpanda12</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### What separates align-items and align-content?

- `align-items` effect the alignment of items on the current line.
- `align-content` effects the alignment accross lines of a flex-container. This means that this property has no effect on single-line containers.

_The rest of the article is just a brain dump of everything I learned while trying to figure out the above._

## Nomenclature

- **Flex Container**: An element on which the `display` value is set to `flex`.
- **Flex Items**: _Direct_ children of the flex containers are called flex items.
- **Main Axis**: The axis defined by the `flex-direction` property.

  -- `flex-direction:row` means that elements inside the flex container are aligned next to each other. Technically, these elements are aligned along the [inline-axis](https://www.w3.org/TR/css-writing-modes-4/#inline-axis) (just like inline elements).

  -- `flex-direction:column` means that elements are aligned along the vertical axis i.e. below each other. Technically called the [block-axis](https://www.w3.org/TR/css-writing-modes-4/#block-axis) (just like block elements)

- **Cross Axis**: The axis perpendicular to the main axis is called the cross axis.

- **Single-line Container**: Flex containers whose `flex-wrap` property is set to `nowrap`. By default every flex container is a single-line container.
- **Multi-line Containers**: Flex containers whose `flex-wrap` property is set to `wrap`

## TL;DR with Nomenclature

Now that we know the jargon, we can rewrite the TL;DR as-

- `justify-content` works on the Main Axis and `align-*` properties work on the Cross Axis.
- `justify-content` and `align-items` are similar in their behviour, the difference being that `justify-content` works on the the main axis while `align-items` works on the cross axis.
- `align-content` works only on multi-line containers and has no effect on single line containers.

## Sources

1. [w3.org](https://www.w3.org/TR/css-flexbox-1/) documentation on Flexbox is pretty comprehensive and a good read.
2. [MDN](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox) Flexbox documentation.
