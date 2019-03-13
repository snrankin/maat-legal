<?php

// 1. customize ACF path
function maat_acf_settings_path($path)
{

    // update path
    $path = INCLUDES_PATH . '/acf/';

    // return
    return $path;
}
add_filter('acf/settings/path', 'maat_acf_settings_path');
// 2. customize ACF dir
function maat_acf_settings_dir($dir)
{
    // update path
    $dir = INCLUDES_PATH_URI . '/acf/';

    // return
    return $dir;
}
add_filter('acf/settings/dir', 'maat_acf_settings_dir');

// 3. Hide ACF field group menu item
//add_filter('acf/settings/show_admin', '__return_false');

/**
    * Set a new location to save ACF field group JSON
    *
    * @param string $path
    * @return string
*/
function maat_set_acf_json_save_folder($path)
{
    // update path
    // CHANGE THIS
    $path = ASSETS_PATH . '/json';
    // return
    return $path;
}
add_filter('acf/settings/save_json', 'maat_set_acf_json_save_folder');

/**
    * Adds a folder to the ACF JSON load list
    *
    * @param array $paths
    * @return array
*/
function maat_add_acf_json_load_folder($paths)
{
    // Remove original path (optional)
    unset($paths[0]);
    // append path
    // CHANGE THIS
    $paths[] = $path = ASSETS_PATH . '/json';
    // return
    return $paths;
}
add_filter('acf/settings/load_json', 'maat_add_acf_json_load_folder');

// Allow shortcode in text widgets

add_filter('widget_text', 'do_shortcode');
