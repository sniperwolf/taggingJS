// taggingJS v1.1
//    2014-03-27

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

        var $this = $( this ),           // Saving for very slight optimization
            tags = [],                   // Here we will save all tags (for reference)
            settings,                    // My settings var
            default_options,             // Default options
            fill_data_options, add_tag;  // helper functions

        // Setting up default options
        default_options = {
            "no-duplicate": true,                   // No duplicate in tag box
            "pre-tags-separator": "\n",             // By default, you must put new tags using a new line
            "no-duplicate-callback": window.alert,  // Function to call when there is a duplicate tag
            "no-duplicate-text": "Duplicate tags",  // Basic text passed to callback
            "type-zone-class": "type-zone",         // Class of the type-zone
            "tag-box-class": "tagging",             // Class of the tag box
            "tag-char": "#",                        // Single Tag char
            "tag-class": "tag",                     // Single Tag class
            "close-char": "&times;",                // Single Tag close char
            "close-class": "tag-i",                 // Single Tag close class
            "tags-input-name": "tag",               // Name to use as name="" in single tags (by default tag[])
            "no-del": false,                        // Delete key remove last tag, true to avoid that
            "no-backspace": false,                  // Backspace key remove last tag, true to avoid that
            "no-comma": false,                      // Comma "," key add a new tag, true to avoid that
            "no-enter": false,                      // Enter key add a new tag, true to avoid that
            "no-spacebar": true,                    // Spacebar key NOT add a new tag by default, false to
            "edit-on-delete": true,                 // True to edit tag that has just been removed from tag box
            "forbidden-chars": [",", ".", "_", "?"] // Array of forbidden characters
        };

        // Overwriting default settings with Object passed by user
        //   N.B.: These settings work for all tags box captured, unless given specific data-* tag.
        settings = $.extend( default_options, options );

        /**
         * Filling data_options with data-* parameters
         *
         * @param  $_object   $actual_tag_box   The tag_box that call this function
         * @return object     data_options      We store here overwrited data attributes
         */
        fill_data_options = function( $actual_tag_box ) {
            var key, data_option,
                data_options = {}; // Here we store all data_options

            for ( key in default_options ) {

                data_option = $actual_tag_box.data( key );

                if ( data_option !== undefined ) {
                    data_options[ key ] = data_option;
                }
            }

            return data_options;
        };

        /**
         * Add a new tag to tag_box
         *
         * @param  $_Obj     $type_zone         jQuery Object with tag type div
         * @param  string    text               Tag's text
         * @param  object    actual_settings    Settings that must be used here
         * @return bool                         true => OK, tag added | false => Something is wrong
         */
        add_tag = function( $type_zone, text, actual_settings ) {
            var i, l, t, $tag;

            // If there are no specific settings, we use the ones defined at the top
            actual_settings = actual_settings || settings;


            // If no text is passed, we take it as text of $type_zone and then we empty it
            if ( ! text ) {
                text = $type_zone.val();
                $type_zone.val( "" );
            }

            // If it is empty too, then we go out
            if ( ! text || ! text.length ) {
                return false;
            }

            // If no_duplicate is true, we check that the text is not already present
            if ( actual_settings["no-duplicate"] === true ) {

                l = tags.length;

                // Looking for each text inside tags
                for ( i = 0; i < l; i += 1 ) {
                    t = tags[i].pure_text;

                    if ( t === text ) {

                        // Calling the callback with t as this
                        actual_settings["no-duplicate-callback"].apply(
                            this,
                            [ actual_settings["no-duplicate-text"] + " " + t + "." ]
                        );

                        // Removing all text and ','
                        $type_zone.val( "" );

                        // We don't add tag
                        return false;
                    }
                }
            }

            // Creating a new div for the new tag
            $tag = $( document.createElement("div") )
                        .addClass( "tag" )
                        .html( "<span>#</span> " + text );

            // Creating and Appending hidden input
            $( document.createElement( "input" ) )
                .attr( "type", "hidden" )
                .attr( "name", actual_settings["tags-input-name"] + "[]" ) // custom input name
                .val( text )
                .appendTo( $tag );

            // Creating and tag button (with "x" to remove tag)
            $( document.createElement( "a" ) )
                .attr( "role", "button" )
                .addClass( actual_settings["close-class"] ) // adding custom class
                .html( actual_settings["close-char"] )      // using custom char
                .click(function() {                         // click addEventListener
                    $tag.remove();
                })
                .appendTo( $tag );                          // finally append close button to tag element

            // Adding pure_text property to $tag
            $tag.pure_text = text;

            // Adding to tags the new tag (as jQuery Object)
            tags.push( $tag );

            // Adding tag in the type zone
            $type_zone.before( $tag );

            return true;
        };

        // For each 'tag_box' (caught with user's jQuery selector)
        $this.each(function() {

            var init_text, $type_zone, data_settings,
                $actual_tag_box = $( this );  // the actual tagging box

            // Getting all data Parameters to fully customize the single tag box selecteds
            data_settings = $.extend( settings, fill_data_options( $actual_tag_box ) );

            // Checking object length
            if ( ! $actual_tag_box.length ) {
                console.error( "%s not found", data_settings );
                return false;
            }

            // On-load Text presente in box
            init_text = $actual_tag_box.text();

            // Empty the original div
            $actual_tag_box.empty();

            // Create the type_zone input using custom class and contenteditable attribute
            $type_zone = $( document.createElement( "input" ) )
                             .addClass( data_settings["type-zone-class"] )
                             .attr( "contenteditable", true );

            // Adding tagging class and appending the type zone
            $actual_tag_box
                .addClass( data_settings["tag-box-class"] )
                .append( $type_zone );

            // Keydown event listener on type_zone
            $type_zone.on( "keydown", function(e) {
                var $last_tag, key, index, i, l, add_keys, remove_keys,
                    forbidden_chars = data_settings["forbidden-chars"],
                    actual_text     = $type_zone.val(),    // actual text in the type_zone
                    pressed_key     = e.which;              // the pressed key

                // Special keys to add a tag
                add_keys = {
                    comma: 188,
                    enter: 13,
                    spacebar: 32,
                };

                // Special keys to remove last tag
                remove_keys = {
                    del: 46,
                    backspace: 8,
                };

                // For in loop to look to Remove Keys
                if ( actual_text === "" ) {
                    for ( key in remove_keys ) {

                        // Enter or comma or enter or spacebar
                        if ( pressed_key === remove_keys[key] ) {

                            // Backspace or Del
                            if ( ! data_settings["no-" + key] ) {

                                // Prevent Default
                                e.preventDefault();

                                // Retrieve last tag
                                $last_tag = tags.pop();

                                // If there is a tag
                                if ( $last_tag !== undefined ) {
                                    // Removing last tag
                                    $last_tag.remove();

                                    // If you want to change the text when a tag is deleted
                                    if ( data_settings["edit-on-delete"] ) {

                                        $type_zone
                                            .focus()
                                            .val( "" )
                                            .val( $last_tag.pure_text );
                                    }
                                }
                            }

                            // Exit
                            return false;
                        }
                    }
                } else {

                    // For loop to remove Forbidden Chars from Text
                    l = forbidden_chars.length;
                    for ( i = 0; i < l; i += 1 ) {

                        // Looking for a forbidden char
                        index = actual_text.indexOf( forbidden_chars[i] );

                        // There is a forbidden text
                        if ( index !== -1 ) {

                            // Prevent Default
                            e.preventDefault();

                            // Removing Forbidden Char
                            actual_text = actual_text.replace( forbidden_chars[i], "" );

                            // Update type_zone text
                            $type_zone
                                .focus()
                                .val( "" )
                                .val( actual_text );

                            // Exit loop
                            break;
                        }
                    }

                    // For in to look in Add Keys
                    for ( key in add_keys ) {

                        // Enter or comma or spacebar if enabled
                        if ( pressed_key === add_keys[key] ) {

                            if ( ! data_settings["no-" + key] ) {

                                // Prevent Default
                                e.preventDefault();

                                // Adding tag with no text
                                add_tag( $type_zone, null, data_settings );
                            }

                            // Exit
                            return false;
                        }
                    }
                }

            }).blur( add_tag, $type_zone, null, data_settings );

            // On click, we focus the type_zone
            $actual_tag_box.on( "click", function() {
                $type_zone.focus();
            });

            $type_zone.on( "focus", function() {
                this.selectionStart = this.selectionEnd = $(this).val().length;
            });

            // Adding text present on type_zone as tag on first call
            $.each( init_text.split( data_settings["pre-tags-separator"] ), function() {
                add_tag( $type_zone, this, data_settings );
            });
        });

        // We don't break the chain
        return this;
    };


})( window.jQuery, window, document );

// jQuery on Ready example
(function( $, window, document ) {
    $( document ).ready(function() {
        var t = $( "#tag" ).tagging();
        console.log( t.addClass( "form-control" ) );
    });
})( window.jQuery, window, document );
