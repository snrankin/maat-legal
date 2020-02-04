<?php
/** ===========================================================================
 * -----
 * -----
 * -----
 * ----------	---	----------------------------------------------------------
 * @author Sam Rankin sam@maatlegal.com>
 * @copyright 2019 Your Company
 * @created 4-3-19
 * @package maat
 * @return mixed
 * @subpackage /inc/plugins/acf/setup.php
 * Date      	By	Comments
 * Description: Item description
 * HISTORY:
 * Last Modified: 5-7-19 at 1:34 pm
 * Modified By:   Sam Rankin <sam@maatlegal.com>
 * ========================================================================= */


// 1. customize ACF path
function maat_acf_settings_path($path)
{

    // update path
    $path = INCLUDES_PATH . '/plugins/acf/';

    // return
    return $path;
}
add_filter('acf/settings/path', 'maat_acf_settings_path');
// 2. customize ACF dir
function maat_acf_settings_dir($dir)
{
    // update path
    $dir = INCLUDES_PATH_URI . '/plugins/acf/';

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


function maat_combine_acf_theme_options()
{
    $fields = get_fields('option');
    $field_values = array();
    if ($fields) {
        foreach ($fields as $field_name => $value) {
            if (!is_object($value)) {
                $field_values[$field_name] = $value;
            }
        }
        //$field_values = serialize($field_values);
        update_option('maat_theme', $field_values, true);
    }
}
add_action('acf/save_post', 'maat_combine_acf_theme_options', 20);
