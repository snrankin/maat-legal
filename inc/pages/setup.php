<?php

/** ===========================================================================
 * This folder is for custom javascript/css/php for specific pages of a site.
 * Only enqueue these files on specific pages
 * @package Maat Legal Theme
 * @version 0.9.0
 * -----
 * @author Sam Rankin (sam@maatlegal.com>)
 * @copyright Copyright (c) 2019 Maat Legal
 * -----
 * Created Date:  4-15-19
 * Last Modified: 4-18-19 at 11:19 am
 * Modified By: Sam Rankin <sam@maatlegal.com>
 * -----
 * HISTORY:
 * Date    	By	Comments
 * --------	--	--------------------------------------------------------------
* ========================================================================= */

/**
 * Load desired components into theme
 */

function maat_load_page_assets(){
    if (!is_admin() && is_page()) {
        global $post;
        $post_slug = $post->post_name;
        $stylesheet_abs = PAGES_PATH . '/' . $post_slug . '/assets/css/maat-' . $post_slug . '.css';
        $stylesheet_rel = PAGES_PATH_URI . '/' . $post_slug . '/assets/css/maat-' . $post_slug . '.css';
        if(file_exists($stylesheet_abs)){
            wp_register_style('maat-' . $post_slug . '-styles', $stylesheet_rel, false, filemtime($stylesheet_abs), 'all');
            wp_enqueue_style('maat-' . $post_slug . '-styles');
        }

        $script_abs = PAGES_PATH . '/' . $post_slug . '/assets/js/maat-' . $post_slug . '.js';
        $script_rel = PAGES_PATH_URI . '/' . $post_slug . '/assets/js/maat-' . $post_slug . '.js';
        if(file_exists($script_abs)){
            wp_register_script('maat-' . $post_slug . '-scripts', $script_rel, false, filemtime($script_abs), 'all');
            wp_enqueue_script('maat-' . $post_slug . '-scripts');
        }
    }
}
add_action('wp_enqueue_scripts', 'maat_load_page_assets', 9999);
