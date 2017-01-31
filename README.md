# STYLE

SPAs built on React make stylesheet includes obtrusive and clunky. Inline styles are more easily maintained, but you forfeit pseudo-elements and pseudo-classes and take a performance hit. Solutions like [JSS](http://cssinjs.org/?v=v6.2.0) cost significant bytes and add execution time, mostly to turn ugly JSON into style blocks.

## API
Use template literals to author your CSS, pass it to STYLE to be injected as `<style>` blocks into the document `<head>`.

```js
const CSS = (`
  .my-component {
    background: white;
    color: black;
  }
  .my-component a {
    color: blue;
    text-decoration: none;
  }
`)

// Add the style block:
STYLE('my-component', CSS)

// Remove the style block:
STYLE.rm('my-component') // <-- Usually not necessary.
```

The aim is simply to make React component styles more maintainable without &approx;100kb+ of additional code to parse and execute. The same block will never be injected twice, so it performs better than inline styles, since you can render a thousand instances of a component and only inject the corresponding style block once.

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
STYLE defines an `.isolate` class that can be added to any element to keep it from inheriting style properties from its ancestors.
