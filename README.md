# taggingJS #

## jQuery plugin to tagging like a charm! ##

jQuery plugin to create a simple and high customizable front-end tag system.

![Example Image](example/example_img.png)

## Getting Started ##

### Simplest ###

1. Download the `tagging.min.js` file from this repository;
1. Include `<script src="path/to/tagging.min.js"></script>` to the bottom of your page;
1. *Optional* - Include the basic CSS tag style `<link href="tag-basic-style.css" rel="stylesheet">` to the `<head>` of your page;
1. Write in your page something like `<div data-name="tag" id="fooTagField">preexisting-tag</div>`;
1. Add to your main JavaScript file `$('#fooTagField').tagging();` to implement it;

The `data-name="tag"` is the class used for every single tag inside the type_zone.

### Contribute - With Grunt & co. ###

1. Clone the repository;
1. Open a shell in project's directory;
1. Write `npm install` on it (make sure you have installed [nodeJS](nodejs.org));
1. Write `grunt` to execute the default script (without minification), `grunt dist` to also minify the script (make sure you have installed [Grunt](gruntjs.com)).

You can find a working example in [Codepen.io](http://codepen.io/sniperwolf/pen/geFxq/)
or in the project's [GitHub page](http://sniperwolf.github.io/taggingJS/).

## Browser Support ##

Supports all major browsers in the world (`IE 6+`, `Mozilla Firefox 1+`, `Google Chrome 1+`, `Safari 5.1+`).

## Changelog ##

### 1.0 - [Mar 22, 2014]

* First Commit;
