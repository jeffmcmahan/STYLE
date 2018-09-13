'use strict'

// Keep track of everything that's been added.
const state = {}

// Inject a <style> block into the DOM.
function injectCSS(id, styles, media) {
	if (!document.getElementById(id)) {
		const block = document.createElement('style')
		block.id = id
		block.type = 'text/css'
		block.media = media
		block.innerHTML = styles
		document.head.appendChild(block)
	}
}

// Remove <style> block from <head>
function rmCSS(id) {
	const block = document.getElementById(id)
	if (block) {
		// Wait 100ms and see whether it still needs removing or not.
		setTimeout(() => {
			if (!state[id]) {
				document.head.removeChild(block)
			}
		}, 100)
	}
}

// Create a new <style> block (and inject if in a browser).
function CSS(id, styles, media = 'screen') {
	if (!(id in state)) {
		state[id] = false
	}
	if (!state[id]) {
		state[id] = true // Track that we have added it.
		injectCSS(id, styles, media)
	}
}

// Decrement the state counter for a given <style> block; remove if sensible.
CSS.rm = function removeCSS(id) {
	if (!(id in state)) {
		throw new Error('Style ' + id + ' was never defined.')
	}
	if (state[id]) {
		state[id] = false
		rmCSS(id)
	}
}

// Add the .isolate class to the <head>
CSS('isolate-style', (
	'.isolate{border-collapse:separate;border-spacing:0;caption-side:top;cursor:auto;'+
	'direction:ltr;empty-cells:show;font-family:serif;font-size:medium;font-style:normal;'+
	'font-variant:normal;font-weight:normal;font-stretch:normal;line-height:normal;hyphens:none;'+
	'letter-spacing:normal;list-style:disc outside none;tab-size:8;text-align:left;'+
	'text-align-last:auto;text-indent:0;text-shadow:none;text-transform:none;visibility:visible;'+
	'white-space:normal;widows:2;word-spacing:normal;}'
))

module.exports = CSS
