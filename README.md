# use-vh-polyfill

Adds support for svh, dvh and lvh CSS viewport units using CSS variables.

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

/* ⚠️ Use cautiously: can cause content to resize, performance cost */
.h-dynamic-screen {
  height: calc(var(--dvh, 1vh) * 100);
}

.h-large-screen {
  height: calc(var(--lvh, 1vh) * 100);
}
```

## API

### Properties

- values.svh
- values.dvh
- values.lvh

### Methods

#### update

Update the values and the CSS variables.
Usually called on a resize event.

### destroy

Delete the CSS variables and remove the element `.vh-polyfill-lvh`.
