<?php

/** ===========================================================================
 * Add Customizations to Wordpress Admin
 * @package Maat Legal Theme
 * @version 0.9.0
 * -----
 * @author Sam Rankin (sam@maatlegal.com>)
 * @copyright Copyright (c) 2019 Maat Legal
 * -----
 * Created Date:  3-13-19
 * Last Modified: 4-26-19 at 4:55 pm
 * Modified By:   Sam Rankin <sam@maatlegal.com>
 * -----
 * HISTORY:
 * Date    	By	Comments
 * --------	--	--------------------------------------------------------------
* ========================================================================= */

function maat_load_admin_assets(){
    $stylesheet_abs = ADMIN_PATH . '/assets/css/maat-admin.css';
    $stylesheet_rel = ADMIN_PATH_URI . '/assets/css/maat-admin.css';
    if(file_exists($stylesheet_abs)){
        wp_register_style('maat-admin-styles', $stylesheet_rel, false, filemtime($stylesheet_abs), 'all');
        wp_enqueue_style('maat-admin-styles');
    }
    wp_enqueue_style('font-awesome', FA_CDN);
    $script_abs = ADMIN_PATH . '/assets/js/maat-admin.js';
    $script_rel = ADMIN_PATH_URI . '/assets/js/maat-admin.js';
    if(file_exists($script_abs)){
        wp_register_script('maat-admin-scripts', $script_rel, false, filemtime($script_abs), 'all');
        wp_enqueue_script('maat-admin-scripts');
    }
}
add_action('admin_enqueue_scripts', 'maat_load_admin_assets', 9999);

include_once(ADMIN_PATH . '/partials/theme-settings.php');
include_once(ADMIN_PATH . '/partials/editor-styles.php');

require_once(ADMIN_PATH . '/tgm/maat-tgm.php');
