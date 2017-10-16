'use strict'

// Keep track of everything that's been added, and how many times.
const state = {__string: ''}

// Inject a <style> block into the DOM.
function injectCSS(id, styles, media) {
  if (document.getElementById(id)) return
  const block = document.createElement('style')
  block.id = id
  block.type = 'text/css'
  block.media = media
  block.innerHTML = styles
  document.head.appendChild(block)
}

// Remove <style> block from <head>
function rmCSS(id) {
  const block = document.getElementById(id)
  if (!block) return
  document.head.removeChild(block)
}

// Create a new <style> block (and inject if in a browser).
function CSS(id, styles, media='screen') {
  if (!(id in state)) state[id] = 0
  state[id]++
  if (state[id]) {
    if (typeof window === 'undefined') {
      state.__string += `<style id="${id}" media="${media}">${styles}</style>`
    } else {
      injectCSS(id, styles, media)
    }
  }
}

// Decrement the state counter for a given <style> block; remove if sensible.
CSS.rm = function removeCSS(id) {
  if (typeof window === 'undefined') {
    throw new Error('CSS.rm() only applies in the browser.')
  }
  if (!(id in state)) return
  state[id]--
  if (state[id] <= 0) rmCSS(id)
}

CSS.toString = _=> state.__string
CSS('isolate', '.isolate{border-collapse:separate;border-spacing:0;caption-side:top;cursor:auto;direction:ltr;empty-cells:show;font-family:serif;font-size:medium;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;line-height:normal;hyphens:none;letter-spacing:normal;list-style:disc outside none;tab-size:8;text-align:left;text-align-last:auto;text-indent:0;text-shadow:none;text-transform:none;visibility:visible;white-space:normal;widows:2;word-spacing:normal;}')

module.exports = CSS
