<?php

/** ===========================================================================
 * Description: Add a formats dropdown to TinyMCE Editor
 * @link https://codex.wordpress.org/TinyMCE_Custom_Styles
 * @package Maat Legal Theme
 * @version 0.9.0
 * -----
 * @author Sam Rankin (sam@maatlegal.com>)
 * @copyright Copyright (c) 2019 Maat Legal
 * -----
 * Created Date:  3-13-19
 * Last Modified: 4-24-19 at 12:53 pm
 * Modified By:   Sam Rankin <sam@maatlegal.com>
 * -----
 * HISTORY:
 * Date    	By	Comments
 * --------	--	--------------------------------------------------------------
* ========================================================================= */



/**
 ** Enabling styleselect
 * Before any registered formats/styles will show, we need to activate the
 * styleselect pulldown menu in the Visual editor. We do this by filtering the
 * array of buttons loaded by TinyMCE. We use the mce_buttons_2 filter because
 * that is the second row and it looks good there.
 * @return array $buttons
 */

function maat_mce_buttons( $buttons ) {
	array_unshift( $buttons, 'styleselect' );
	return $buttons;
}
add_filter( 'mce_buttons_2', 'maat_mce_buttons' );

/**
 ** Registering Custom Styles
 * Once styleselect is in place we can register our actual styles in two different
 * ways. Both involve using the tiny_mce_before_init filter, which receives the
 * full configuration parameters of TinyMCE and into which we'll inject our custom
 * styles.
 *
 * @param array $styles
 *
 * @return array $init_array
 */

function maat_mce_insert_formats($init_array)
{
    $theme_config = file_get_contents(THEME_CONFIG_PATH);
    $theme_array = json_decode($theme_config, true);
    $styles = $theme_array['editor_styles'];
    $init_array['style_formats'] = json_encode($styles);

    return $init_array;
}
add_filter('tiny_mce_before_init', 'maat_mce_insert_formats', 999);

add_editor_style(ADMIN_PATH_URI . '/assets/css/maat-editor.css');
add_editor_style('font-awesome', FA_CDN);
