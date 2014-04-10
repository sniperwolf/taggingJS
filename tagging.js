// taggingJS v1.2.5
//    2014-04-10

// Copyright (c) 2014 Fabrizio Fallico

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

(function( $, window, document, undefined ) {

    $.fn.tagging = function(options) {

        var $this,
            settings, default_options,
            tags,
            fill_data_options, add_tag, error;

        // Saving for very slight optimization
        $this = $( this );

        // Here we will save all tags (for reference)
        tags = [];

        // Setting up default options (in alphabetical order)
        default_options = {
            "case-sensitive": false,                        // True to allow differences between lowercase and uppercase
            "close-char": "&times;",                        // Single Tag close char
            "close-class": "tag-i",                         // Single Tag close class
            "edit-on-delete": true,                         // True to edit tag that has just been removed from tag box
            "forbidden-chars": [ "," , ".", "_", "?" ],     // Array of forbidden characters
            "forbidden-chars-callback": window.alert,       // Function to call when there is a forbidden chars
            "forbidden-chars-text": "Forbidden character:", // Basic text passed to forbidden-chars callback
            "forbidden-words": [],                          // Array of forbidden words
            "forbidden-words-callback": window.alert,       // Function to call when there is a forbidden words
            "forbidden-words-text": "Forbidden word:",      // Basic text passed to forbidden-words callback
            "no-backspace": false,                          // Backspace key remove last tag, true to avoid that
            "no-comma": false,                              // Comma "," key add a new tag, true to avoid that
            "no-del": false,                                // Delete key remove last tag, true to avoid that
            "no-duplicate": true,                           // No duplicate in tag box
            "no-duplicate-callback": window.alert,          // Function to call when there is a duplicate tag
            "no-duplicate-text": "Duplicate tag:",          // Basic text passed to no-duplicate callback
            "no-enter": false,                              // Enter key add a new tag, true to avoid that
            "no-spacebar": false,                           // Spacebar key add a new tag by default, true to avoid that
            "pre-tags-separator": ", ",                     // By default, you must put new tags using a new line
            "tag-box-class": "tagging",                     // Class of the tag box
            "tag-char": "#",                                // Single Tag char
            "tag-class": "tag",                             // Single Tag class
            "tags-input-name": "tag",                       // Name to use as name="" in single tags (by default tag[])
            "type-zone-class": "type-zone",                 // Class of the type-zone
        };

        // Overwriting default settings with Object passed by user
        //   N.B.: These settings work for all tags box captured, unless given specific data attributes.
        settings = $.extend( {}, default_options, options );

        /**
         * Filling data_options with data attributes
         *
         * @param  $_object   $actual_tag_box   The tag_box that call this function
         * @return object     data_options      We store here overwrited data attributes
         */
        fill_data_options = function( $actual_tag_box ) {
            var key, data_option, data_options;

            // Here we store all data_options
            data_options = {};

            // For each option
            for ( key in default_options ) {

                // Getting value
                data_option = $actual_tag_box.data( key );

                // Checking if it is not undefined
                if ( data_option !== undefined ) {

                    // Saving in data_options object
                    data_options[ key ] = data_option;

                }
            }

            return data_options;
        };

        /**
         * Remov a tag
         *
         * @param  function callback_f    Callback to invoke
         * @param  string   callback_t    Text to use in callback
         * @param  string   tag_text      Duplicate Text
         * @return boolean
         */
        error = function(callback_f, callback_t, tag_text) {

            // Calling the callback with t as th
            callback_f.apply(
                this,
                [ callback_t + " '" + tag_text + "'." ]
            );

            // We don't add tag
            return false;
        };

        /**
         * Add a new tag to tag_box
         *
         * @param  $_Obj     $type_zone         jQuery Object with tag type div
         * @param  string    text               Tag's text
         * @param  object    actual_settings    Settings that must be used here
         * @return boolean                      true => OK, tag added | false => Something is wrong
         */
        add_tag = function( $type_zone, text, actual_settings ) {
            var i, l, t, index, forbidden_words, callback_f, callback_t, $tag;

            // If there are no specific settings, use the ones defined at the top
            actual_settings = actual_settings || settings;

            // Forbidden Words shortcut
            forbidden_words = actual_settings[ "forbidden-words" ];

            // If no text is passed, take it as text of $type_zone and then empty it
            if ( ! text ) {
                text = $type_zone.val();
                $type_zone.val( "" );
            }

            // If it is empty too, then go out
            if ( ! text || ! text.length ) {
                return false;
            }

            // If case-sensitive is true, write everything in lowercase
            if ( actual_settings[ "case-sensitive" ] === false ) {
                text = text.toLowerCase();
            }

            // Checking if text is a Forbidden Word
            l = forbidden_words.length;
            if ( l !== 0 ) {

                // For loop
                for ( i = 0; i < l; i += 1 ) {

                    // Looking for a forbidden words
                    index = text.indexOf( forbidden_words[ i ] );

                    // There is a forbidden word
                    if ( index !== -1 ) {

                        // Removing all text and ','
                        $type_zone.val( "" );

                        // Renaiming
                        callback_f = actual_settings[ "forbidden-words-callback" ];
                        callback_t = actual_settings[ "forbidden-words-text" ];

                        // Remove as a duplicate
                        return error( callback_f, callback_t, text );
                    }
                }

            }

            // If no-duplicate is true, check that the text is not already present
            if ( actual_settings[ "no-duplicate" ] === true ) {

                // Looking for each text inside tags
                l = tags.length;
                if ( l !== 0 ) {

                    for ( i = 0; i < l; i += 1 ) {
                        t = tags[ i ].pure_text;

                        if ( t === text ) {

                            // Removing all text and ','
                            $type_zone.val( "" );

                            // Renaiming
                            callback_f = actual_settings[ "no-duplicate-callback" ];
                            callback_t = actual_settings[ "no-duplicate-text" ];

                            // Remove the duplicate
                            return error( callback_f, callback_t, text );

                        }
                    }
                }
            }

            // Creating a new div for the new tag
            $tag = $( document.createElement( "div" ) )
                        .addClass( "tag" )
                        .html( "<span>#</span> " + text );

            // Creating and Appending hidden input
            $( document.createElement( "input" ) )
                .attr( "type", "hidden" )
                // custom input name
                .attr( "name", actual_settings[ "tags-input-name" ] + "[]" )
                .val( text )
                .appendTo( $tag );

            // Creating and tag button (with "x" to remove tag)
            $( document.createElement( "a" ) )
                .attr( "role", "button" )
                // adding custom class
                .addClass( actual_settings[ "close-class" ] )
                // using custom char
                .html( actual_settings[ "close-char" ] )
                // click addEventListener
                .click(function() {
                    $tag.remove();
                })
                // finally append close button to tag element
                .appendTo( $tag );

            // Adding pure_text property to $tag
            $tag.pure_text = text;

            // Adding to tags the new tag (as jQuery Object)
            tags.push( $tag );

            // Adding tag in the type zone
            $type_zone.before( $tag );

            return false;
        };

        // For each 'tag_box' (caught with user's jQuery selector)
        $this.each(function() {

            var init_text, $type_zone, data_settings, $actual_tag_box,
                add_keys, all_keys, remove_keys; /*KEYS_OBJ, ADD_KEYS_OBJ, REMOVE_KEYS_OBJ,
                l, i, _i, _l, key_obj;*/

            // the actual tagging box
            $actual_tag_box = $( this );

            // Getting all data Parameters to fully customize the single tag box selecteds
            data_settings = $.extend( {}, settings, fill_data_options( $actual_tag_box ) );

            // Pre-existent text
            init_text = $actual_tag_box.text();

            // Empty the original div
            $actual_tag_box.empty();

            // Create the type_zone input using custom class and contenteditable attribute
            $type_zone = $( document.createElement( "input" ) )
                             .addClass( data_settings[ "type-zone-class" ] )
                             .attr( "contenteditable", true );

            // Adding tagging class and appending the type zone
            $actual_tag_box
                .addClass( data_settings[ "tag-box-class" ] )
                .append( $type_zone );

            // Special keys to add a tag
            add_keys = {
                comma:    188,
                enter:    13,
                spacebar: 32,
            };

            // Special keys to remove last tag
            remove_keys = {
                del: 46,
                backspace: 8,
            };

            // Merging keys
            all_keys = $.extend( {}, add_keys, remove_keys );

            // Keydown event listener on type_zone
            $type_zone.on( "keydown", function(e) {
                var $last_tag, key, index, i, l,
                    forbidden_chars, actual_text, pressed_key,
                    callback_f, callback_t;

                // Forbidden Chars shortcut
                forbidden_chars = data_settings[ "forbidden-chars" ];

                // Actual text in the type_zone
                actual_text     = $type_zone.val();

                // The pressed key
                pressed_key     = e.which;

                // For in loop to look to Remove Keys
                if ( actual_text === "" ) {

                    for ( key in all_keys ) {

                        // Some special key
                        if ( pressed_key === all_keys[ key ] ) {

                            // Enter or comma or spacebar - We cannot add an empty tag
                            if ( add_keys[ key ] !== undefined ) {

                                // Prevent Default
                                e.preventDefault();

                                // Exit with 'true'
                                return true;
                            }

                            // Backspace or Del
                            if ( remove_keys[ key ] !== undefined ) {

                                // Checking if it enabled
                                if ( ! data_settings[ "no-" + key ] ) {

                                    // Prevent Default
                                    e.preventDefault();

                                    // Retrieve last tag
                                    $last_tag = tags.pop();

                                    // If there is a tag
                                    if ( $last_tag !== undefined ) {

                                        // Removing last tag
                                        $last_tag.remove();

                                        // If you want to change the text when a tag is deleted
                                        if ( data_settings[ "edit-on-delete" ] ) {

                                            $type_zone
                                                .focus()
                                                .val( "" )
                                                .val( $last_tag.pure_text );
                                        }
                                    }
                                }
                            }

                            // Exit
                            return false;
                        }
                    }
                } else {

                    // For in to look in Add Keys
                    for ( key in add_keys ) {

                        // Enter or comma or spacebar if enabled
                        if ( pressed_key === add_keys[ key ] ) {

                            if ( ! data_settings[ "no-" + key ] ) {

                                // Prevent Default
                                e.preventDefault();

                                // Adding tag with no text
                                return add_tag( $type_zone, null, data_settings );
                            }

                            // Exit
                            return false;
                        }
                    }

                    // For loop to remove Forbidden Chars from Text
                    l = forbidden_chars.length;
                    for ( i = 0; i < l; i += 1 ) {

                        // Looking for a forbidden char
                        index = actual_text.indexOf( forbidden_chars[ i ] );

                        // There is a forbidden text
                        if ( index !== -1 ) {

                            // Prevent Default
                            e.preventDefault();

                            // Removing Forbidden Char
                            actual_text = actual_text.replace( forbidden_chars[ i ], "" );

                            // Update type_zone text
                            $type_zone
                                .focus()
                                .val( "" )
                                .val( actual_text );

                            // Renaiming
                            callback_f = data_settings[ "forbidden-chars-callback" ];
                            callback_t = data_settings[ "forbidden-chars-text" ];

                            // Remove the duplicate
                            return error( callback_f, callback_t, forbidden_chars[ i ] );
                        }
                    }
                }

                // Exit with success
                return true;
            });

            // On click, we focus the type_zone
            $actual_tag_box.on( "click", function() {
                $type_zone.focus();
            });

            // @link stackoverflow.com/questions/12911236/setting-focus-to-the-end-of-a-textarea
            $type_zone.on( "focus", function() {
                this.selectionStart = this.selectionEnd = $(this).val().length;
            });

            // Adding text present on type_zone as tag on first call
            $.each( init_text.split( data_settings[ "pre-tags-separator" ] ), function() {
                add_tag( $type_zone, this, data_settings );
            });
        });

        // We don't break the chain
        return this;
    };

})( window.jQuery, window, document );

// jQuery on Ready example
// (function( $, window, document ) {
//     $( document ).ready(function() {
//         var t = $( "#tag" ).tagging();
//         console.log( t.addClass( "form-control" ) );
//     });
// })( window.jQuery, window, document );
