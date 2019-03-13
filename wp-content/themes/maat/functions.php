<?php
/**
	* Maat functions and definitions
	*
	* @link https://developer.wordpress.org/themes/basics/theme-functions/
	*
	* @package Maat
*/

define('INCLUDES_PATH', get_stylesheet_directory() . '/inc');
define('INCLUDES_PATH_URI', get_stylesheet_directory_uri() . '/inc');
define('COMPONENT_PATH', INCLUDES_PATH . '/components');
define('COMPONENT_PATH_URI', INCLUDES_PATH_URI . '/components');
define('UTILITIES_PATH', INCLUDES_PATH . '/utilities');
define('UTILITIES_PATH_URI', INCLUDES_PATH_URI . '/utilities');
define('ASSETS_PATH', get_stylesheet_directory() . '/assets');
define('ASSETS_PATH_URI', get_stylesheet_directory_uri() . '/assets');

require UTILITIES_PATH . '/setup.php';
require UTILITIES_PATH . '/assets.php';
require UTILITIES_PATH . '/filters.php';
require UTILITIES_PATH . '/utilities.php';
require UTILITIES_PATH . '/shortcodes.php';
require UTILITIES_PATH . '/template-functions.php';
require UTILITIES_PATH . '/template-tags.php';
require UTILITIES_PATH . '/customizer.php';

/**
 * Add Advanced Custom Fields Plugin
 *
 * @link https://www.advancedcustomfields.com/resources/including-acf-in-a-plugin-theme/
 */
include_once(INCLUDES_PATH . '/plugins/acf/acf.php');

/**
 * Load Jetpack compatibility file.
 */
if (defined('JETPACK__VERSION')) {
	require UTILITIES_PATH . '/jetpack.php';
}
