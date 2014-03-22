// taggingJS v1.0
//    2014-03-22

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

( function( $, window, document ) {

    $.fn.tagging = function(a) {

        // Here we will save all tags (for reference)
        var tags = [];

        $( this ).each( function() {

            var init_text, $type_zone, obj, add_tag,
                    $this = $( this );

            // Checking object length
            if ( ! $this.length ) {
                console.error( "%s not found", a );
                return ;
            }

            // Init Text
            init_text = $this.text();

            // Empty the original div
            $this.empty();

            // Adding class and contenteditable attribute to the type zone
            $type_zone = $( document.createElement( "div" ) )
                            .addClass( "type-zone" )
                            .attr( "contenteditable", true );

            // Adding tagging class and appending the type zone
            $this
                .addClass( "tagging" )
                .append( $type_zone );

            obj = {
                input_name: $this.data( "name" )
            };

            /**
             * Simply add tag to type_zone
             *
             * @param string    text    Tag's text
             */
            add_tag = function( text ) {

                if ( ! text ) {
                    text = $type_zone.text();
                    $type_zone.empty();
                }

                if ( ! text || ! text.length ) {
                    return ;
                }

                var $tag = $( document.createElement("div") )
                                .addClass( "tag" )
                                .html( "<span>#</span> " + text );

                // Creating and Appending hidden input
                $( "<input/>" )
                    .attr( "type", "hidden" )
                    .attr( "name", obj.input_name + "[]" )
                    .val( text )
                    .appendTo( $tag );

                // Creating and tag button (with "x" to remove tag)
                $( "<a/>" )
                    .attr( "role", "button" )
                    .addClass( "tag-i" )
                    .text( "x" )
                    .click( function() {
                        $tag.remove();
                    })
                    .appendTo( $tag );

                tags.push( $tag );

                // Adding tag in the type zone
                $type_zone.before( $tag );
            };

            // Keydown event listener on type_zone
            $type_zone.on( "keydown", function(e) {
                var $last_tag,
                    key = e.which;

                // Enter or comma
                if ( key === 13 || key === 188 ) {

                    // Prevent Default
                    e.preventDefault();

                    // Adding tag
                    add_tag();
                }

                // Backspace or Del
                if ( $type_zone.text() === "" && ( key === 8 || key === 46 ) ) {

                    // Prevent Default
                    e.preventDefault();

                    // Retrieve last tag
                    $last_tag = tags.pop();

                    // If there is a tag
                    if ( $last_tag !== undefined ) {
                        // Removing last tag
                        $last_tag.remove();
                    }

                }

            }).blur( add_tag );

            $this.on( "click", function() {
                $type_zone.focus();
            });

            // Adding text present on type_zone as tag on first call
            $.each( init_text.split("\n"), function() {
                add_tag( this );
            });
        });

        // We don"t break the chain
        return this;
    };


})( window.jQuery, window, document );

// jQuery on Ready example
// ( function( $, window, document ) {
//     $( document ).ready( function() {
//         $( "#tag" ).tagging();
//     });
// })( window.jQuery, window, document );
