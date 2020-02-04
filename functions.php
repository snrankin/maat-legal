<?php
/** ===========================================================================
 * Required Theme Functions File
 * @package Maat Legal Theme
 * @version 0.9.0
 * -----
 * @author Sam Rankin (sam@maatlegal.com>)
 * @copyright Copyright (c) 2019 Maat Legal
 * -----
 * Created Date: 3-4-19
 * Last Modified: 4-18-19 at 11:39 am
 * Modified By: Sam Rankin <sam@maatlegal.com>
 * -----
 * HISTORY:
 * Date    	By	Comments
 * --------	--	--------------------------------------------------------------
* ========================================================================= */

/**
 * Theme Global Definitions
 */

define('INCLUDES_PATH', get_template_directory() . '/inc');
define('INCLUDES_PATH_URI', get_template_directory_uri() . '/inc');
define('CONFIG_PATH', get_template_directory() . '/config');
define('CONFIG_PATH_URI', get_template_directory_uri() . '/config');
define('THEME_CONFIG_PATH', CONFIG_PATH . '/theme-config.json');
define('THEME_CONFIG_PATH_URI', CONFIG_PATH_URI . '/theme-config.json');
define('COMPONENT_PATH', INCLUDES_PATH . '/components');
define('COMPONENT_PATH_URI', INCLUDES_PATH_URI . '/components');
define('UTILITIES_PATH', INCLUDES_PATH . '/utilities');
define('UTILITIES_PATH_URI', INCLUDES_PATH_URI . '/utilities');
define('ASSETS_PATH', get_template_directory() . '/assets');
define('ASSETS_PATH_URI', get_template_directory_uri() . '/assets');
define('ADMIN_PATH', INCLUDES_PATH . '/admin');
define('ADMIN_PATH_URI', INCLUDES_PATH_URI . '/admin');
define('PAGES_PATH', INCLUDES_PATH . '/pages');
define('PAGES_PATH_URI', INCLUDES_PATH_URI . '/pages');
define('PLUGINS_PATH', INCLUDES_PATH . '/plugins');
define('PLUGINS_PATH_URI', INCLUDES_PATH_URI . '/plugins');
define('FA_CDN', 'https://use.fontawesome.com/releases/v5.8.1/css/all.css');

/**
 * Required Theme Files
 */
require_once UTILITIES_PATH . '/setup.php';
require_once ADMIN_PATH . '/setup.php';
require_once UTILITIES_PATH . '/assets.php';
require_once UTILITIES_PATH . '/filters.php';
require_once UTILITIES_PATH . '/template-functions.php';
require_once UTILITIES_PATH . '/utilities.php';
require_once UTILITIES_PATH . '/shortcodes.php';
require_once UTILITIES_PATH . '/template-tags.php';
require_once UTILITIES_PATH . '/customizer.php';
