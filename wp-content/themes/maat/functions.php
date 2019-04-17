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
 * Last Modified: 4-3-19 at 11:49 am
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
define('COMPONENT_PATH', INCLUDES_PATH . '/components');
define('COMPONENT_PATH_URI', INCLUDES_PATH_URI . '/components');
define('UTILITIES_PATH', INCLUDES_PATH . '/utilities');
define('UTILITIES_PATH_URI', INCLUDES_PATH_URI . '/utilities');
define('ASSETS_PATH', get_template_directory() . '/assets');
define('ASSETS_PATH_URI', get_template_directory_uri() . '/assets');
define('ADMIN_PATH', INCLUDES_PATH . '/admin');
define('ADMIN_PATH_URI', INCLUDES_PATH_URI . '/admin');
define('PLUGINS_PATH', INCLUDES_PATH . '/plugins');
define('PLUGINS_PATH_URI', INCLUDES_PATH_URI . '/plugins');

/**
 * Required Theme Files
 */
require UTILITIES_PATH . '/setup.php';
require UTILITIES_PATH . '/assets.php';
require UTILITIES_PATH . '/filters.php';
require UTILITIES_PATH . '/template-functions.php';
require UTILITIES_PATH . '/utilities.php';
require UTILITIES_PATH . '/shortcodes.php';
require UTILITIES_PATH . '/template-tags.php';
require UTILITIES_PATH . '/customizer.php';
