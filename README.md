# taggingJS #

[![Build Status](https://travis-ci.org/sniperwolf/taggingJS.svg?branch=master)](https://travis-ci.org/sniperwolf/taggingJS)

## jQuery plugin to tagging like a charm! ##

jQuery plugin to create a simple and high customizable front-end tag system. It is only `2.5 kb`!

Actual version is `1.1`.

![Example Image](example/example_img.png)

## Getting Started ##

You can find a working example in [Codepen.io](http://codepen.io/sniperwolf/pen/geFxq/)
or in the project's [GitHub page](http://sniperwolf.github.io/taggingJS/).

### Simplest ###

1. **Download** the `tagging.min.js` file from this repository;

1. **Include** `<script src="path/to/tagging.min.js"></script>` to the bottom of
your page;

1. *Optional* - Include the basic CSS tag style
`<link href="tag-basic-style.css" rel="stylesheet">` to the `<head>` of
your page;

1. Add to your page something like
`<div data-tags-input-name="tag" id="tagBox">preexisting-tag</div>`;

1. Add to your main JavaScript file `$("#tagBox").tagging();`;

The `data-tags-input-name="tag"` is the `name` attribute used by each input
inside the `tagBox`.

###  Customize ###

There are several ways to customize the default behavior of taggingJS:

1. Use a JavaScript `custom_options` object to customize the global taggingJS behavior
(see [First Way](#first-way---global-object));

2. Use `data` attributes in the `tagBox` HTML Markup
(see [Second Way](#second-way---data-attributes));

3. Use a combination of the first two way
(see [Third Way](#third-way---mixed-way));

**N.B.**: Be careful! `data` attributes have an higher priority than the `custom_options` object, because each `data` attribute overwrite the global behavior.
In other words, the global settings work for all tags box captured, unless in
these are specified `data` attributes (*which may change the behavior*).

####  First Way - Global Object ####

1. Create a custom options `object`, like this `my_custom_options` (see [Available Options](#available-options)):

		var my_custom_options = {
				"no-duplicate": true,
				"no-duplicate-callback": window.alert,
				"no-duplicate-text": "Duplicate tags",
				"type-zone-class": "type-zone",
				"tag-box-class": "tagging",
				"forbidden-chars": [",", ".", "_", "?"]
		};

1. Create a tag box (or multiple tag box) like this:

		<div id="tagBox">preexisting-tag</div>

1. Add to your main JavaScript file:

		$("#tagBox").tagging(my_custom_options);

In this way, we customize the **global behavior** of taggingJS for
**all tag box** caught with selector.

#### Second Way - Data Attributes ####

1. Create a tag box with some `data` attributes, like this (see [Available Options](#available-options)):

		<div
				data-no-duplicate="true"
				data-pre-tags-separator="\n"
				data-no-duplicate-text="Duplicate tags"
				data-type-zone-class="type-zone"
				data-tag-box-class="tagging"
				data-edit-on-delete="true"
		id="tagBox">preexisting-tag</div>

1. Add to your main JavaScript file:

		$("#tagBox").tagging();

**N.B.**: Use data method with `no-duplicate-callback` and `forbidden-chars`
can cause some problems. Avoid it.

#### Third Way - Mixed Way ####

In this way, we mix data attributes and options object to customize taggingJS behavior for each tag box.

1. Create a tag box with some `data` attributes, like this:

		<div class="tag-box"
				data-no-duplicate="true"
				data-tags-input-name="tag"
		id="tagBox1">preexisting-tag</div>

1. Create another tag box with no `data` attributes:

		<div id="tagBox1" class="tag-box">preexisting-tag</div>

1. Create a custom options `object`, like this `my_custom_options` (see [Available Options](#available-options)):

		var my_custom_options = {
				"no-duplicate": false,
				"tags-input-name": "taggone",
				"edit-on-delete": false,
		};

1. Add to your main JavaScript file

		$(".tag-box").tagging(my_custom_options);

Now you can see that:

1. The `#tagBox1` has a behavior that overwrite some `my_custom_options` options:

  - Does not accept duplicate tag (*for the respective `data` attribute*);
  - For each tag, it has `tag` as input name (*for the respective `data` attribute*);
  - On delete, the tag is completely removed (*for the `my_custom_options`*);

1. The `#tagBox2` has a behavior dictated only by `my_custom_options`:

  - Accept duplicate tag (*for the `my_custom_options`*);
  - For each tag, it has `tag` as input name (*for the `my_custom_options`*);
  - On delete, the tag is completely removed (*for the `my_custom_options`*);


## Available Options ##

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

Default: `"&times;"`

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

## Contribute ##

### Set Up nodeJS and Grunt ###

1. Fork the repository;

1. Open a shell in project's directory;

1. Type `npm install` (make sure you have installed [nodeJS](nodejs.org));

1. Type `grunt` to execute the default script (without minification),
`grunt dist` to also minify the script (make sure you have installed [Grunt](gruntjs.com)).

### JavaScript Style Guide ###

I follow the [jQuery's JavaScript style guide](https://contribute.jquery.org/style-guide/js/),
so please follow it you too :D

## Browser Support ##

Supports all major browsers in the world (`IE 6+`, `Mozilla Firefox 1+`,
`Google Chrome 1+`, `Safari 5.1+`).

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
