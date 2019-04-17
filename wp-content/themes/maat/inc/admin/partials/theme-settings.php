<?php
/** ===========================================================================
 * @package maat
 * @subpackage /inc/components/admin/partials/theme-settings.php
 * @created 3-13-19
 * @author Sam Rankin sam@maatlegal.com>
 * @copyright 2019 Maat Legal
 * -----
 * Last Modified: 3-13-19 at 1:35 pm
 * Modified By: Sam Rankin <sam@maatlegal.com>
 * -----
 * Description: Item description
 * @return mixed
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
* ========================================================================= */


// Variables

/**
 * Add a settings page to the backend for all of our theme options
 *
 * @link https://www.advancedcustomfields.com/resources/acf_add_options_page/
 * @uses acf_add_options_page()
 */
if (function_exists('acf_add_options_page')) {
    acf_add_options_page(array(
        'page_title' => 'Maat Theme Settings',
        'menu_title' => 'Theme Settings',
        'capability' => 'edit_posts',
        'autoload' => true,
    ));
}