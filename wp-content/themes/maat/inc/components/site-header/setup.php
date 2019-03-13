<?php if (!function_exists('maat_top_menu')) {

    // Register Navigation Menus
    function maat_top_menu()
    {

        $locations = array(
            'top_menu' => __('Top Menu', 'maat'),
        );
        register_nav_menus($locations);
    }
    add_action('init', 'maat_top_menu');
}
