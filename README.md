# taggingJS #

[![Build Status](https://travis-ci.org/sniperwolf/taggingJS.svg?branch=master)](https://travis-ci.org/sniperwolf/taggingJS)

## jQuery plugin to tagging like a charm! ##

jQuery plugin to create a simple and high customizable front-end tag system.

![Example Image](example/example_img.png)

## Getting Started ##

You can find a working example in [Codepen.io](http://codepen.io/sniperwolf/pen/geFxq/)
or in the project's [GitHub page](http://sniperwolf.github.io/taggingJS/).

### Simplest ###

1. Download the `tagging.min.js` file from this repository;
1. Include `<script src="path/to/tagging.min.js"></script>` to the bottom of your page;
1. *Optional* - Include the basic CSS tag style `<link href="tag-basic-style.css" rel="stylesheet">` to the `<head>` of your page;
1. Write in your page something like `<div data-input-name="tag" id="tagBox">preexisting-tag</div>`;
1. Add to your main JavaScript file `$("#tagBox").tagging();` to implement it;

The `data-input-name="tag"` is the name used for every single input inside the `tagBox`.

### Customize ###

There are several ways to customize the behavior of taggingJS:

- Pass a JavaScript `object` to customize the global taggingJS behavior (see [#1](#available-options) in Available Options);
- Use `data-*` in the `tagBox` HTML Markup (see [#2](#available-options) in Available Options);

**N.B.**: Be careful! `data-*` has a higher priority than the passed object, because each `data-*` overwrite also the global behavior.
In other words, the global settings work for all tags box captured, unless in these are specified `data-*` tag (*which may change the behavior*).

### Available Options ###

#1 - All of these options can be passed as an object...

	default_options = {
		"no-duplicate": true,
		"pre-tags-separator": "\n",
		"no-duplicate-callback": window.alert,
		"no-duplicate-text": "Duplicate tags",
		"type-zone-class": "type-zone",
		"tag-box-class": "tagging",
		"tag-char": "#",
		"tag-class": "tag",
		"close-char": "&times;",
		"close-class": "tag-i",
		"tags-input-name": "tag",
		"no-del": false,
		"no-backspace": false,
		"no-comma": false,
		"no-enter": false,
		"no-spacebar": true,
		"edit-on-delete": true,
		"forbidden-chars": [",", ".", "_", "?"]
	};

... and then add to your main JavaScript file `$("#tagBox").tagging(default_options);` to implement it.

#2 - Or can be specified inside tag box as `data-*` parameters, like:

	<div
		data-no-duplicate="true"
		data-pre-tags-separator="\n"
		data-no-duplicate-text="Duplicate tags"
		data-type-zone-class="type-zone"
		data-tag-box-class="tagging"
		data-tag-char="#"
		data-tag-class="tag"
		data-close-char="&times;"
		data-close-class="tag-i"
		data-tags-input-name="tag"
		data-no-del="false"
		data-no-backspace="false"
		data-no-comma="false"
		data-no-enter="false"
		data-no-spacebar="true"
		data-edit-on-delete="true"
	id="tagBox">preexisting-tag</div>

**N.B.**: Use data method with `no-duplicate-callback` and `forbidden-chars` can cause some problems. Avoid it.

Below, little description, `type`, and default value of all the available options:

#### no-duplicate ####

Type: `Boolean`

Default: `true`

If `true`, there will be no duplicate tag's name in the tag box.

#### pre-tags-separator ####

Type: `String`

Default: `"\n"`

This is used to `split` the initial text and add `preexistint-tag`.
By default, you must put new tags using a new line.

#### no-duplicate-callback ####

Type: `Function`

Default: `window.alert`

Function to call when is detected a duplicate tag.

#### no-duplicate-text ####

Type: `String`

Default: `"Duplicate tags"`

Basic text passed to callback.

#### type-zone-class ####

Type: `String`

Default: `"type-zone"`

Class of the type-zone.

#### tag-box-class ####

Type: `String`

Default: `"tagging"`

Class of the tag box.

#### tag-char ####

Type: `String`

Default: `"#"`

Single Tag char.

#### tag-class ####

Type: `String`

Default: `"tag"`

Single Tag class.

#### close-char ####

Type: `String`

Default: `&times;`

Single Tag close character.

#### close-class ####

Type: `String`

Default: `"tag-i"`

Single Tag close class.

#### tags-input-name ####

Type: `String`

Default: `"tag"`

Name to use as `name=""` in single tags' input.
By default, all tags being passed as array like `tag[]`.

#### no-del ####

Type: `Boolean`

Default: `false`

Del key remove last tag by default, `true` to avoid that.

#### no-backspace ####

Type: `Boolean`

Default: `false`

Backspace key remove last tag by default, `true` to avoid that.

#### no-comma ####

Type: `Boolean`

Default: `false`

Comma `","` key add a new tag by default, `true` to avoid that.

#### no-enter ####

Type: `Boolean`

Default: `false`

Enter key add a new tag by default, `true` to avoid that.

#### no-spacebar ####

Type: `Boolean`

Default: `true`

Spacebar key **NOT** add a new tag by default. `false` enable.

#### edit-on-delete ####

Type: `Boolean`

Default: `true`

`true` to edit tag that has just been removed from tag box.

#### forbidden-chars ####

Type: `Array`
Default: `[",", ".", "_", "?"]`

Array of forbidden characters.

### Contribute - with NodeJS and Grunt ###

1. Clone the repository;
1. Open a shell in project's directory;
1. Write `npm install` on it (make sure you have installed [nodeJS](nodejs.org));
1. Write `grunt` to execute the default script (without minification), `grunt dist` to also minify the script (make sure you have installed [Grunt](gruntjs.com)).

#### Syntax ####

I followed the [jQuery's JavaScript style guide](https://contribute.jquery.org/style-guide/js/), so please follow it you too :D

## Browser Support ##

Supports all major browsers in the world (`IE 6+`, `Mozilla Firefox 1+`, `Google Chrome 1+`, `Safari 5.1+`).

## Changelog ##

### 1.1 - [Mar 27, 2014]

* Added chance to use custom options;
* Add `no-duplicate` option to avoid duplicate tag (with custom callback);
* Add `forbidden-chars` option to prevent to the user to type some characters in type_zone;
* Updated README.md with all Available Options;
* Updated example;
* Improved formatting;
* Minor fix;

### 1.0 - [Mar 22, 2014]

* First Commit;
