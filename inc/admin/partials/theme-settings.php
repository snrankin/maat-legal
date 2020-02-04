<?php
/** ===========================================================================
 * @package maat
 * @subpackage /inc/components/admin/partials/theme-settings.php
 * @created 3-13-19
 * @author Sam Rankin sam@maatlegal.com>
 * @copyright 2019 Maat Legal
 * -----
 * Last Modified: 5-7-19 at 12:47 pm
 * Modified By:   Sam Rankin <sam@maatlegal.com>
 * -----
 * Description: Item description
 * @return mixed
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
 * ========================================================================= */

/**
 * Add a settings page to the backend for all of our theme options
 *
 * @link https://www.advancedcustomfields.com/resources/acf_add_options_page/
 * @uses acf_add_options_page()
 */
if (function_exists('acf_add_options_page')) {
    acf_add_options_page(array(
        'page_title'  => 'General Theme Settings',
        'menu_title'  => 'Theme Settings',
        'menu_slug'   => 'maat-theme-general-settings',
        'capability'  => 'edit_posts',
        'redirect'    => false
    ));
    acf_add_options_sub_page(array(
        'page_title'  => 'Theme Components',
        'menu_title'  => 'Components',
        'parent_slug' => 'maat-theme-general-settings',
    ));
    acf_add_options_sub_page(array(
        'page_title'  => 'Theme Footer',
        'menu_title'  => 'Footer',
        'parent_slug' => 'maat-theme-general-settings',
    ));
}
