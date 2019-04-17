<?php
/** ===========================================================================
 * @package maat
 * @subpackage /inc/components/admin/partials/editor-styles.php
 * @created 3-13-19
 * @author Sam Rankin sam@maatlegal.com>
 * @copyright 2019 Maat Legal
 * -----
 * Last Modified: 4-12-19 at 11:34 am
 * Modified By: Sam Rankin <sam@maatlegal.com>
 * -----
 * Description: Item description
 * @return mixed
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
* ========================================================================= */


// Variables


// Callback function to insert 'styleselect' into the $buttons array
function my_mce_buttons_2( $buttons ) {
	array_unshift( $buttons, 'styleselect' );
	return $buttons;
}
// Register our callback to the appropriate filter
add_filter( 'mce_buttons_2', 'my_mce_buttons_2' );

// Callback function to filter the MCE settings
function maat_mce_insert_formats($init_array)
{
    $styles = array(

        array(
            'title' => 'Left Text',
            'selector' => 'p,span,div,li,a,blockquote,h1,h2,h3,h4,h5,h6',
            'classes' => 'text-left',
        ),
        array(
            'title' => 'Center Text',
            'selector' => 'p,span,div,li,a,blockquote,h1,h2,h3,h4,h5,h6',
            'classes' => 'text-center',
        ),
        array(
            'title' => 'Right Text',
            'selector' => 'p,span,div,li,a,blockquote,h1,h2,h3,h4,h5,h6',
            'classes' => 'text-right',
        ),
        array(
            'title' => 'Justified Text',
            'selector' => 'p,span,div,li,a,blockquote,h1,h2,h3,h4,h5,h6',
            'classes' => 'text-justify',
        ),
        array(
            'title' => 'Lowercased Text',
            'selector' => 'p,span,div,li,a,blockquote,h1,h2,h3,h4,h5,h6',
            'classes' => 'text-lowercase',
        ),
        array(
            'title' => 'Uppercase Text',
            'selector' => 'p,span,div,li,a,blockquote,h1,h2,h3,h4,h5,h6',
            'classes' => 'text-uppercase',
        ),
        array(
            'title' => 'Capitalized Text',
            'selector' => 'p,span,div,li,a,blockquote,h1,h2,h3,h4,h5,h6',
            'classes' => 'text-capitalize',
        ),
        array(
            'title' => 'Bold Text',
            'selector' => 'p,span,div,li,a,blockquote,h1,h2,h3,h4,h5,h6',
            'classes' => 'font-weight-bold',
        ),
        array(
            'title' => 'Emphasized Text',
            'selector' => 'p,span,div,li,a,blockquote,h1,h2,h3,h4,h5,h6',
            'classes' => 'emphasis',
        ),
        array(
            'title' => 'Primary Color Text',
            'selector' => 'p,li,a,div,span,h1,h2,h3,h4,h5,h6',
            'classes' => 'text-primary',
        ),
        array(
            'title' => 'Secondary Color Text',
            'selector' => 'p,li,a,div,span,h1,h2,h3,h4,h5,h6',
            'classes' => 'text-secondary',
        ),
        array(
            'title' => 'Tertiary Color Text',
            'selector' => 'p,li,a,div,span,h1,h2,h3,h4,h5,h6',
            'classes' => 'text-tertiary',
        ),
        array(
            'title' => 'Success Color Text',
            'selector' => 'p,li,a,div,span,h1,h2,h3,h4,h5,h6',
            'classes' => 'text-success',
        ),
        array(
            'title' => 'Danger Color Text',
            'selector' => 'p,li,a,div,span,h1,h2,h3,h4,h5,h6',
            'classes' => 'text-danger',
        ),
        array(
            'title' => 'Warning Color Text',
            'selector' => 'p,li,a,div,span,h1,h2,h3,h4,h5,h6',
            'classes' => 'text-warning',
        ),
        array(
            'title' => 'Info Color Text',
            'selector' => 'p,li,a,div,span,h1,h2,h3,h4,h5,h6',
            'classes' => 'text-info',
        ),
        array(
            'title' => 'Light Color Text',
            'selector' => 'p,li,a,div,span,h1,h2,h3,h4,h5,h6',
            'classes' => 'text-light',
        ),
        array(
            'title' => 'Dark Color Text',
            'selector' => 'p,li,a,div,span,h1,h2,h3,h4,h5,h6',
            'classes' => 'text-dark',
        ),
        array(
            'title' => 'Body Color Text',
            'selector' => 'p,li,a,div,span,h1,h2,h3,h4,h5,h6',
            'classes' => 'text-body',
        ),
        array(
            'title' => 'Muted Text',
            'selector' => 'p,li,a,div,span,h1,h2,h3,h4,h5,h6',
            'classes' => 'text-muted',
        ),
        array(
            'title' => 'White Color Text',
            'selector' => 'p,li,a,div,span,h1,h2,h3,h4,h5,h6',
            'classes' => 'text-white',
        ),
        array(
            'title' => 'White 50% Color Text',
            'selector' => 'p,li,a,div,span,h1,h2,h3,h4,h5,h6',
            'classes' => 'text-white-50',
        ),
        array(
            'title' => 'Black 50% Color Text',
            'selector' => 'p,li,a,div,span,h1,h2,h3,h4,h5,h6',
            'classes' => 'text-black-50',
        ),

        array(
            'title' => 'Lead',
            'selector' => 'p,span,div,li,a',
            'classes' => 'lead',
        ),
        array(
            'title' => 'Blockquote',
            'inline' => 'p',
            'selector' => 'blockquote,p',
            'block' => 'blockquote',
            'classes' => 'blockquote',
            'wrapper' => true,
        ),
        array(
            'title' => 'Italic Text',
            'selector' => 'p,span,div,li,a,blockquote,h1,h2,h3,h4,h5,h6',
            'classes' => 'font-italic',
        ),
        array(
            'title' => 'Heading 1',
            'selector' => 'h1,h2,h3,h4,h5,h6,p,li,a,div,span',
            'classes' => 'h1',
        ),
        array(
            'title' => 'Heading 2',
            'selector' => 'h2,h1,h3,h4,h5,h6,p,li,a,div,span',
            'classes' => 'h2',
        ),
        array(
            'title' => 'Heading 3',
            'selector' => 'h3,h1,h2,h4,h5,h6,p,li,a,div,span',
            'classes' => 'h3',
        ),
        array(
            'title' => 'Heading 4',
            'selector' => 'h4,h1,h2,h3,h5,h6,p,li,a,div,span',
            'classes' => 'h4',
        ),
        array(
            'title' => 'Heading 5',
            'selector' => 'h5,h1,h2,h3,h4,h6,p,li,a,div,span',
            'classes' => 'h5',
        ),
        array(
            'title' => 'Heading 6',
            'selector' => 'h6,h1,h2,h3,h4,h5,p,li,a,div,span',
            'classes' => 'h6',
        ),
        array(
            'title' => 'Display 1',
            'selector' => 'h1,h2,h3,h4,h5,h6,p,li,a,div,span',
            'classes' => 'display-1',
        ),
        array(
            'title' => 'Display 2',
            'selector' => 'h1,h2,h3,h4,h5,h6,p,li,a,div,span',
            'classes' => 'display-2',
        ),
        array(
            'title' => 'Display 3',
            'selector' => 'h1,h2,h3,h4,h5,h6,p,li,a,div,span',
            'classes' => 'display-3',
        ),
        array(
            'title' => 'Display 4',
            'selector' => 'h1,h2,h3,h4,h5,h6,p,li,a,div,span',
            'classes' => 'display-4',
        ),
    );
    $init_array['style_formats'] = json_encode($styles);

    return $init_array;
}
add_filter('tiny_mce_before_init', 'maat_mce_insert_formats', 999);

add_editor_style(ASSETS_PATH_URI . '/css/maat-editor.css');
