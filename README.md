# taggingJS #

[![Build Status](https://travis-ci.org/sniperwolf/taggingJS.svg?branch=master)](https://travis-ci.org/sniperwolf/taggingJS)

## jQuery plugin to tagging like a charm! ##

**taggingJS** is a jQuery plugin to create an high customizable front-end tag system.
It is less than `3 kb` and [support major browsers](#browser-support) in the world!

Actual version is `1.2.5`.

![Example Image](example/example_img.png)

## Getting Started ##

You can find a working example in [Codepen.io](http://codepen.io/sniperwolf/pen/geFxq/)
or in the project's [GitHub page](http://sniperwolf.github.io/taggingJS/).

### Simplest ###

1. **Download** the `tagging.min.js` file from this repository;

2. **Include** `<script src="path/to/tagging.min.js"></script>` to the bottom of
your page;

3. *Optional* - Include the basic CSS tag style
`<link href="tag-basic-style.css" rel="stylesheet">` to the `<head>` of
your page;

4. **Add** to your page something like
`<div data-tags-input-name="tag" id="tagBox">preexisting-tag</div>`;

5. **Add** to your main JavaScript file `$("#tagBox").tagging();`;

The `data-tags-input-name="tag"` is the `name` attribute used by each input
inside the `tagBox`.

###  Customize ###

There are **several ways** to customize the default behavior of taggingJS:

1. Use a JavaScript `custom_options` object to customize the global taggingJS behavior
(see [First Way](#first-way---global-object));

2. Use `data` attributes in the `tagBox` HTML Markup
(see [Second Way](#second-way---data-attributes));

3. Use a combination of the first two way
(see [Third Way](#third-way---mixed-way));

**N.B.**: Be careful! `data` attributes have an higher priority than the `custom_options` object,
because each `data` attribute overwrite the global behavior.
In other words, the global settings work for all tags box captured, unless in
these are specified `data` attributes (*which may change the behavior*).

####  First Way - Global Object ####

1. **Create a custom options** `object`, like this `my_custom_options` (see [Available Options](#available-options)):

	```js
	var my_custom_options = {
		"no-duplicate": true,
		"no-duplicate-callback": window.alert,
		"no-duplicate-text": "Duplicate tags",
		"type-zone-class": "type-zone",
		"tag-box-class": "tagging",
		"forbidden-chars": [",", ".", "_", "?"]
	};
	```

2. **Create a tag box** (or multiple tag box) like this:

	```html
	<div id="tagBox">preexisting-tag</div>
	```

3. **Add** to your main JavaScript file:

	```js
	$("#tagBox").tagging(my_custom_options);
	```

In this way, we customize the **global behavior** of taggingJS for
**all tag box** caught with selector.

#### Second Way - Data Attributes ####

1. **Create a tag box** with some `data` attributes, like this (see [Available Options](#available-options)):

	```html
	<div
		data-no-duplicate="true"
		data-pre-tags-separator="\n"
		data-no-duplicate-text="Duplicate tags"
		data-type-zone-class="type-zone"
		data-tag-box-class="tagging"
		data-edit-on-delete="true"
	id="tagBox">preexisting-tag</div>
	```

2. **Add** to your main JavaScript file:

	```js
	$("#tagBox").tagging();
	```

**N.B.**: Use data method with `no-duplicate-callback` and `forbidden-chars`
can cause some problems. Avoid it.

#### Third Way - Mixed Way ####

In this way, we **mix** data attributes and options object to customize taggingJS behavior for each tag box.

1. **Create a tag box** with some `data` attributes, like this:

	```html
	<div class="tag-box"
		data-no-duplicate="true"
		data-tags-input-name="tag"
	id="tagBox1">preexisting-tag</div>
	```

2. **Create *another* tag box** with no `data` attributes:

	```html
	<div id="tagBox1" class="tag-box">preexisting-tag</div>
	```

3. **Create a custom options** `object`, like this `my_custom_options` (see [Available Options](#available-options)):

	```js
	var my_custom_options = {
		"no-duplicate": false,
		"tags-input-name": "taggone",
		"edit-on-delete": false,
	};
	```

4. **Add** to your main JavaScript file

	```js
	$(".tag-box").tagging(my_custom_options);
	```

Now you may see that:

* The `#tagBox1` has a behavior that overwrite some `my_custom_options` options:

	- Does not accept duplicate tag (*for the respective `data` attribute*);
	- For each tag, it has `tag` as input name (*for the respective `data` attribute*);
	- On delete, the tag is completely removed (*for the `my_custom_options`*);

* The `#tagBox2` has a behavior dictated only by `my_custom_options`:

	- Accept duplicate tag (*for the `my_custom_options`*);
	- For each tag, it has `tag` as input name (*for the `my_custom_options`*);
	- On delete, the tag is completely removed (*for the `my_custom_options`*);

## Available Options ##

Below there are the **available options to customize taggingJS** with a
little description, a `type` and the default value:

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| **case-sensitive** | `Boolean` | `false` | If `false`, all text is treated like lowercase. |
| **close-char** | `String` | `"&times;"` | Single Tag close character. |
| **close-class** | `String` | `"tag-i"` | Single Tag close class. |
| **edit-on-delete** | `Boolean` | `true` | `true` to edit tag that has just been removed from tag box. |
| **forbidden-chars** | `Array` | `["," , ".", "_", "?"]` | Array of forbidden characters. |
| **forbidden-chars-callback** | `Function` | `window.alert` | Function to call when is detected a forbidden character. |
| **forbidden-chars-text** | `String` | `"Forbidden character:"` | Basic text passed to `forbidden-chars-callback`. |
| **forbidden-words** | `Array` | `[]` | Array of forbidden words. |
| **forbidden-words-callback** | `Function` | `window.alert` | Function to call when is detected a forbidden words. |
| **forbidden-words-text** | `String` | `"Forbidden word:"` | Basic text passed to `forbidden-words-callback`. |
| **no-backspace** | `Boolean` | `false` | Backspace key remove last tag by default, `true` to avoid that. |
| **no-comma** | `Boolean` | `false` | Comma `","` key add a new tag by default, `true` to avoid that. |
| **no-del** | `Boolean` | `false` | Del key remove last tag by default, `true` to avoid that. |
| **no-duplicate** | `Boolean` | `true` | If `true`, there will be no duplicate tag's name in the tag box. |
| **no-duplicate-callback** | `Function` | `window.alert` | Function to call when is detected a duplicate tag. |
| **no-duplicate-text** | `String` | `"Duplicate tag:"` | Basic text passed to `no-duplicate-callback`. |
| **no-enter** | `Boolean` | `false` | Enter key add a new tag by default, `true` to avoid that. |
| **no-spacebar** | `Boolean` | `false` | Spacebar key add a new tag by default. `true` to avoid that.|
| **pre-tags-separator** | `String` | `", "` | This is used to `split` the initial text and add `preexistint-tag`. By default, you must put new tags using a comma and a space (`", "`). |
| **tag-box-class** | `String` | `"tagging"` | Class of the tag box. |
| **tag-char** | `String` | `"#"` | Single Tag char. |
| **tag-class** | `String` | `"tag"` | Single Tag class. |
| **tags-input-name** | `String` | `"tag"` | Name to use as `name=""` in single tags' input. By default, all tags being passed as array like `tag[]`. |
| **type-zone-class** | `String` | `"type-zone"` | Class of the type-zone. |

## Contribute ##

### Set Up nodeJS and Grunt ###

1. Fork the repository;

2. Open a shell in project's directory;

3. Type `npm install` (make sure you have installed [nodeJS](nodejs.org));

4. Type `grunt` to execute the default script (without minification),
`grunt dist` to also minify the script (make sure you have installed [Grunt](gruntjs.com)).

### JavaScript Style Guide ###

I follow the [jQuery's JavaScript style guide](https://contribute.jquery.org/style-guide/js/),
please follow it you too :D

## Requirements ##

- **jQuery** (`1.5.X` or more, also `2.X` works);

## Browser Support ##

Supports all major browsers in the world (`IE 6+`, `Mozilla Firefox 1+`,
`Google Chrome 1+`, `Safari 5.1+`).

## License ##

(C) Fabrizio Fallico 2014, released under the [MIT license](LICENSE.md).

## Changelog ##

### 1.2.5 - [Apr 10, 2014]

* Fix #5 issue;
* Changed `pre-tags-separator` and `no-spacebar` default value;
* Improved code formatting;

### 1.2.3 - [Apr 06, 2014]

* Add `case-sensitive` option;
* Add `forbidden-words` option to block some words inside a tag, with callback and text;
* Add callback and text to as `forbidden-chars` option;
* Fixed `i.handler.apply is not function` bug;
* Updated README.md with all Available Options;
* Improved code formatting;
* Passed to [Semantic Versioning](http://semver.org/);
* Add taggingJS to jQuery Plugin Registry;
* Minor fix;

### 1.1 - [Mar 27, 2014]

* Add chance to use custom options;
* Add `no-duplicate` option to avoid duplicate tag (with custom callback);
* Add `forbidden-chars` option to block some characters inside a tag;
* Updated README.md with all Available Options;
* Updated example;
* Improved code formatting;
* Minor fix;

### 1.0 - [Mar 22, 2014]

* First Commit;
