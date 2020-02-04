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
 * Last Modified: 5-8-19 at 12:48 pm
 * Modified By:   Sam Rankin <sam@maatlegal.com>
 * -----
 * HISTORY:
 * Date    	By	Comments
 * --------	--	--------------------------------------------------------------
 * ========================================================================= */

if (is_plugin_active('js_composer/js_composer.php')) {
    vc_disable_frontend();
}

/**
 * Change where Visual Composer template override folder is
 *
 * @uses vc_before_init
 * @uses vc_set_shortcodes_templates_dir
 */

function vc_before_init_actions()
{
    if (function_exists('vc_set_shortcodes_templates_dir')) {
        vc_set_shortcodes_templates_dir(PLUGINS_PATH . '/wpb/templates');
    }
}
add_action('vc_before_init', 'vc_before_init_actions');

$components = array(
    'functions',
    'section',
    'row',
    'row_inner',
    'column',
    'column_inner',
    'social_links_maat',
    'contact_info_maat',
    'twitter_feed_maat',
    'custom_shortcode_maat'
);
foreach ($components as $component) {
    $path = PLUGINS_PATH . '/wpb/inc/vc_' . $component . '.php';
    if (file_exists($path)) {
        include_once($path);
    }
}
