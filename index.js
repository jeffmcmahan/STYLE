'use strict'

module.exports = function (id, styles, media = 'screen') {
	const block = document.createElement('style')
	block.id = id
	block.type = 'text/css'
	block.media = media
	block.innerHTML = styles
	document.head.appendChild(block)
}

// Add the .isolate class to the <head>
module.exports('isolate-style', (
	'.isolate{border-collapse:separate;border-spacing:0;caption-side:top;cursor:auto;'+
	'direction:ltr;empty-cells:show;font-family:serif;font-size:medium;font-style:normal;'+
	'font-variant:normal;font-weight:normal;font-stretch:normal;line-height:normal;hyphens:none;'+
	'letter-spacing:normal;list-style:disc outside none;tab-size:8;text-align:left;'+
	'text-align-last:auto;text-indent:0;text-shadow:none;text-transform:none;visibility:visible;'+
	'white-space:normal;widows:2;word-spacing:normal;}'
))
