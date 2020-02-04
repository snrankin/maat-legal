<?php
 /*
 * Copyright (c) 2018 snrankin
 *
 * @Script: setup.php
 * @Author: snrankin
 * @Email: snrankin@me.com
 * @Create At: 2018-05-22 10:45:11
 * @Last Modified By: snrankin
 * @Last Modified At: 2018-06-08 16:42:06
 * @Description: This is description.
 */

if (function_exists('acf_add_options_page')) {
    acf_add_options_page(array(
        'page_title' => 'Maat Schema Settings',
        'menu_title' => 'Schema Settings',
        'capability' => 'edit_posts',
        'autoload' => true,
    ));
}

include_component_partial(basename(__DIR__), 'location-info');
include_component_partial(basename(__DIR__), 'json');
