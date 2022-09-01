# useVhPolyfill

This polyfill adds support for the incoming viewport units `svh`, `dvh` and `lvh` using CSS variables.

- [Specification](https://www.w3.org/TR/css-values-4/#viewport-relative-lengths)
- [Current support](https://caniuse.com/viewport-unit-variants)

## Setup

```js
import useVhPolyfill from "./use-vh-polyfill";

const vhPolyfill = useVhPolyfill();

window.addEventListener("resize", onResize);
function onResize() {
  vhPolyfill.update();
}
```

> Note: an element `.vh-polyfill-lvh` will be inserted at the end of the body.
> It is used to compute `lvh`.

## Usage

```css
.h-small-screen {
  height: calc(var(--svh, 1vh) * 100);
}

/* ⚠️ Use cautiously: can cause content to resize at performance cost */
.h-dynamic-screen {
  height: calc(var(--dvh, 1vh) * 100);
}

.h-large-screen {
  height: calc(var(--lvh, 1vh) * 100);
}
```

## API

The function `useVhPolyfill` will return:

```ts
{
  values: {
    svh: number,
    dvh: number,
    lvh: number,
  },
  update: function,
  destroy: function,
}
```

### Properties

#### `values.svh`

The smallest viewport height.

#### `values.dvh`

The current viewport height.

#### `values.lvh`

The largest viewport height.

### Methods

#### `update`

Update the values and the CSS variables.
Usually called on a resize event.

#### `destroy`

Delete the CSS variables and remove the element `.vh-polyfill-lvh`.
