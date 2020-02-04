<?php

/** ===========================================================================
 * Description
 * @package Maat Legal Theme
 * @version 0.9.0
 * -----
 * @author Sam Rankin (sam@maatlegal.com>)
 * @copyright Copyright (c) 2019 Maat Legal
 * -----
 * Created Date: 4-3-19
 * Last Modified: 5-7-19 at 1:33 pm
 * Modified By:   Sam Rankin <sam@maatlegal.com>
 * -----
 * HISTORY:
 * Date    	By	Comments
 * --------	--	--------------------------------------------------------------
 * ========================================================================= */


include_once(PLUGINS_PATH . '/acf/setup.php');
include_once(PLUGINS_PATH . '/wpb/setup.php');

/**
 * Load Jetpack compatibility file.
 */
if (defined('JETPACK__VERSION')) {
	require UTILITIES_PATH . '/jetpack.php';
}
