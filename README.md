# STYLE

In general, working with react makes stylesheet includes feel really obtrusive and clunky. Inline styles are better, but you cannot have pseudo-elements and pseudo-classes. Solutions like JSS are woefully over-engineered and cost significant bytes just to turn JSON into CSS (which are already very similar).

## API
Use template literals to author your CSS, pass it to STYLE to be injected as `<style>` blocks into the document `<head>`.

```js
const CSS = (`
  body {
    background: white;
    color: black;
  }
  a {
    color: blue;
    text-decoration: none;
  }
`)

// Add the style block:
STYLE('my-component', CSS)

// Remove the style block:
STYLE.rm('my-component')
```

The aim is simply to make React component styles more maintainable without &approx;100kb+ of additional code to parse and execute. The same block will never be injected twice, so it's more performant than inline styles. It allows you to render a thousand instances of a component and only inject a single style block.

Standard usage within React looks like this:

```js
module.exports = React.createClass({

  componentWillMount() {
    STYLE('my-component', CSS)
  },

  render() {
    // ...
  }
})
```

## Isolation
STYLE defines a `.isolate` class that can be added to any element to keep it from inheriting values from its ancestors.
