const state = {
  // <id>: <balance>
}

function injectCSS(id, styles) {
  if (document.getElementById(id)) return
  const block = document.createElement('style')
  block.id = id
  block.type = 'text/css'
  block.innerHTML = styles
  document.head.appendChild(block)
}

function rmCSS(id) {
  const block = document.getElementById(id)
  console.log(block)
  if (!block) return
  document.head.removeChild(block)
}

function CSS(id, styles) {
  if (!(id in state)) state[id] = 0
  state[id]++
  if (state[id]) injectCSS(id, styles)
}

CSS.rm = function removeCSS(id) {
  if (!(id in state)) return
  state[id]--
  if (state[id] <= 0) rmCSS(id)
}

// Inject the style isolation class.
CSS('isolate', `
  .isolate {
    border-collapse: separate;
    border-spacing: 0;
    caption-side: top;
    cursor: auto;
    direction: ltr;
    empty-cells: show;
    font-family: serif;
    font-size: medium;
    font-style: normal;
    font-variant: normal;
    font-weight: normal;
    font-stretch: normal;
    line-height: normal;
    hyphens: none;
    letter-spacing: normal;
    list-style: disc outside none;
    tab-size: 8;
    text-align: left;
    text-align-last: auto;
    text-indent: 0;
    text-shadow: none;
    text-transform: none;
    visibility: visible;
    white-space: normal;
    widows: 2;
    word-spacing: normal;
  }
`)

module.exports = CSS
