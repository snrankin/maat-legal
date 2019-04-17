<?php

/** ===========================================================================
 * Setup file for Visual Composer
 * @package Maat Legal Theme
 * @version 0.9.0
 * -----
 * @author Sam Rankin (sam@maatlegal.com>)
 * @copyright Copyright (c) 2019 Maat Legal
 * -----
 * Created Date: 4-3-19
 * Last Modified: 4-10-19 at 2:21 pm
 * Modified By: Sam Rankin <sam@maatlegal.com>
 * -----
 * HISTORY:
 * Date    	By	Comments
 * --------	--	--------------------------------------------------------------
* ========================================================================= */



if ( is_plugin_active( 'js_composer/js_composer.php' ) ) {
    include_once(PLUGINS_PATH . '/wpb/inc/vc_custom.php');
    vc_disable_frontend();
}

/**
 * Change where Visual Composer template override folder is
 *
 * @uses vc_before_init
 * @uses vc_set_shortcodes_templates_dir
*/
add_action( 'vc_before_init', 'vc_before_init_actions' );

function vc_before_init_actions() {
    if( function_exists('vc_set_shortcodes_templates_dir') ){
        vc_set_shortcodes_templates_dir(PLUGINS_PATH . '/wpb/templates' );
    }
}

include_once PLUGINS_PATH . '/wpb/inc/vc_row.php';
