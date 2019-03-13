<?php
/**
 * Enqueue scripts and styles.
 */
function maat_assets()
{
    wp_register_style('maat-css', ASSETS_PATH_URI . '/css/main.css', false, false);
    wp_enqueue_style('maat-css');

    wp_register_script('maat-js', ASSETS_PATH_URI . '/js/maat-main.js', ['jquery'], null, true);
    wp_enqueue_script('maat-js');

    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}
add_action('wp_enqueue_scripts', 'maat_assets');
