<?php
/** ===========================================================================
 * @package maat
 * @subpackage /inc/components/admin/setup.php
 * @created 3-13-19
 * @author Sam Rankin sam@maatlegal.com>
 * @copyright 2019 Maat Legal
 * -----
 * Last Modified: 4-3-19 at 10:15 am
 * Modified By: Sam Rankin <sam@maatlegal.com>
 * -----
 * Description: Item description
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
* ========================================================================= */

// =============================================================================
// Add Styles and Scripts to Admin
// =============================================================================

function maat_admin_styles()
{
    $stylesheet = ASSETS_PATH_URI . '/css/maat-admin.css';
    $stylesheet_mod_time = filemtime(ASSETS_PATH . '/css/maat-admin.css');
    wp_register_style('maat-admin', $stylesheet, false, $stylesheet_mod_time, 'all');
    wp_enqueue_style('maat-admin');
    wp_enqueue_style('font-awesome', 'https://use.fontawesome.com/releases/v5.0.13/css/all.css');
    //wp_enqueue_script('maat-admin-scripts', get_stylesheet_directory_uri() . '/inc/components/admin/assets/js/admin.js', array('jquery'), '', true);
}
add_action('admin_enqueue_scripts', 'maat_admin_styles', 999);

include_once(ADMIN_PATH . '/partials/theme-settings.php');
include_once(ADMIN_PATH . '/partials/editor-styles.php');

require_once(ADMIN_PATH . '/tgm/maat-tgm.php');
