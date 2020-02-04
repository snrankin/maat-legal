<?php
/**
 * Enqueue scripts and styles.
 */



function maat_assets()
{
    wp_register_style('metropolis', ASSETS_PATH_URI . '/css/metropolis.css', false, '', 'all');
    wp_enqueue_style('metropolis');
    wp_register_style('font-awesome-5', FA_CDN, false, '', 'all');
    wp_enqueue_style('font-awesome-5');
    $stylesheet = ASSETS_PATH_URI . '/css/maat-main.css';
    $stylesheet_mod_time = filemtime(ASSETS_PATH . '/css/maat-main.css');
    wp_register_style('maat-main', $stylesheet, false, $stylesheet_mod_time, 'all');
    wp_enqueue_style('maat-main');

    wp_register_script('maat-vendor-js', ASSETS_PATH_URI . '/js/maat-vendor.js', ['jquery'], null, true);
    wp_enqueue_script('maat-vendor-js');

    wp_register_script('maat-js', ASSETS_PATH_URI . '/js/maat-main.js', ['jquery'], null, true);
    wp_enqueue_script('maat-js');

    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}
add_action('wp_enqueue_scripts', 'maat_assets', 9998);
