<?php

/** ===========================================================================
 * Sets up theme defaults and registers support for various WordPress features.
 * @package Maat Legal Theme
 * @version 0.9.0
 * -----
 * @author Sam Rankin (sam@maatlegal.com>)
 * @copyright Copyright (c) 2019 Maat Legal
 * -----
 * Created Date: 3-4-19
 * Last Modified: 4-12-19 at 5:03 pm
 * Modified By: Sam Rankin <sam@maatlegal.com>
 * -----
 * HISTORY:
 * Date    	By	Comments
 * --------	--	--------------------------------------------------------------
* ========================================================================= */

/**
	* Note that this function is hooked into the after_setup_theme hook, which
	* runs before the init hook. The init hook is too late for some features, such
	* as indicating support for post thumbnails.
*/

if (!function_exists('maat_setup')) :

    function maat_setup()
    {
        /**
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on Maat, use a find and replace
		 * to change 'maat' to the name of your theme in all the template files.
		 */
        load_theme_textdomain('maat', get_template_directory() . '/languages');

        /**
         * Add default posts and comments RSS feed links to head.
         */
        add_theme_support('automatic-feed-links');

        /**
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
        add_theme_support('title-tag');

        /**
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
        add_theme_support('post-thumbnails');
/**
		 * Register Main Menu
		 *
		 * @link https://codex.wordpress.org/Function_Reference/register_nav_menus
		 */
        register_nav_menus(array(
            'main-menu' => esc_html__('Primary', 'maat'),
        ));

        /**
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
        add_theme_support('html5', array(
            'search-form',
            'comment-form',
            'comment-list',
            'gallery',
            'caption',
        ));
        /**
         * Set up the WordPress core custom background feature.
         */
        add_theme_support('custom-background', apply_filters('maat_custom_background_args', array(
            'default-color' => 'ffffff',
            'default-image' => '',
        )));
        /**
         * Add theme support for selective refresh for widgets.
         */
        add_theme_support('customize-selective-refresh-widgets');

        /**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
        add_theme_support('custom-logo', array(
            'height'      => 250,
            'width'       => 250,
            'flex-width'  => true,
            'flex-height' => true,
        ));
        /**
		 * Add support for new Gutenberg features.
		 *
		 * @link https://wordpress.org/gutenberg/handbook/designers-developers/developers/themes/theme-support/
		 */
        add_theme_support('align-wide');
        add_theme_support('editor-styles');
        add_theme_support('responsive-embeds');
        add_theme_support('disable-custom-font-sizes');

        /**
		 * Load desired components into theme
		 */
        $components = glob(COMPONENT_PATH . '/*', GLOB_ONLYDIR);

        foreach ($components as $component) {
            $path = $component . '/setup.php';
            if (file_exists($path)) {
                include_once($path);
            }
        }

        /**
		 * Add small thumbnail size for admin usage
		 *
		 * @link https://developer.wordpress.org/reference/functions/add_image_size/
		 */
        remove_image_size('medium_large');
        add_image_size('admin-thumb', 60, 60, true);
        update_option( 'thumbnail_size_w', 320 );
        update_option( 'thumbnail_crop', 0 );
        add_image_size('medium_sm', 576, 576);
        update_option( 'medium_size_w', 768);
        add_image_size('medium_lg', 1024, 1024);
        update_option( 'large_size_w', 1280);
        add_image_size('large_lg', 1440, 1440);
        function my_custom_sizes( $sizes ) {
            return array_merge( $sizes, array(
                'admin-thumb' => __( 'Admin Thumbnail' ),
                'medium_sm' => __( 'Large Phone (576px)' ),
                'medium_lg' => __( 'Tablet Landscape (1024px)' ),
                'large_lg' => __( 'Large Desktop (1440px)' ),
            ) );
        }

        /**
         * Include Admin Customizations
         */
        require ADMIN_PATH . '/setup.php';

        /**
         * Include Required Plugins
         */
        require PLUGINS_PATH . '/setup.php';
    }
endif;
add_action('after_setup_theme', 'maat_setup');

// function maat_setup_theme_supported_features()
// {
//     $theme_settings = CONFIG_PATH . '/theme.json';
//     if (file_exists($theme_settings)) {
//         $json = json_decode($theme_settings, true);
//         $colors = $json['colors'];
//         $theme_colors = array();
//         foreach ($colors as $name => $value) {
//             $theme_color = array(
//                 'name' => __($name, 'maat'),
//                 'slug' => $name,
//                 'color' => $value,
//             );
//             $theme_colors[] = $theme_color;
//         }
//         add_theme_support('editor-color-palette', $theme_colors);
//     }
// }

// add_action('after_setup_theme', 'maat_setup_theme_supported_features');
/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function maat_content_width()
{
    // This variable is intended to be overruled from themes.
    // Open WPCS issue: {@link https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards/issues/1043}.
    // phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
    $GLOBALS['content_width'] = apply_filters('maat_content_width', 640);
}
add_action('after_setup_theme', 'maat_content_width', 0);

/**
 * Add favicons if there is a folder in the images folder
 *
 * @link https://realfavicongenerator.net/
 * @var string $favicon Favicon folder. Generated favicons from realfavicongenerator.net
 */
function maat_add_favicon()
{
    $favicon_folder = ASSETS_PATH . '/imgs';
    $favicons = ASSETS_PATH_URI . '/imgs';
    if (file_exists($favicon_folder)) {
        $output = "";
        $output .= "\t" . "<link rel='apple-touch-icon' sizes='180x180' href='" . $favicons . "'/apple-touch-icon.png'>" . PHP_EOL;
        $output .= "\t" . '<link rel="icon" type="image/png" sizes="192x192" href="' . $favicons . '/android-chrome-192x192.png">' . PHP_EOL;
        $output .= "\t" . '<link rel="icon" type="image/png" sizes="32x32" href="' . $favicons . '/favicon-32x32.png">' . PHP_EOL;
        $output .= "\t" . '<link rel="icon" type="image/png" sizes="16x16" href="' . $favicons . '/favicon-16x16.png">' . PHP_EOL;
        $output .= "\t" . '<link rel="manifest" href="' . $favicons . '/site.webmanifest">' . PHP_EOL;
        $output .= "\t" . '<link rel="mask-icon" href="' . $favicons . '/safari-pinned-tab.svg" color="#3C1053">' . PHP_EOL;
        $output .= "\t" . '<meta name="msapplication-TileColor" content="#3C1053">' . PHP_EOL;
        $output .= "\t" . '<meta name="msapplication-TileImage" content="' . $favicons . '/mstile-144x144.png">' . PHP_EOL;
        $output .= "\t" . '<meta name="theme-color" content="#3C1053">' . PHP_EOL;
        echo $output;
    }
}
add_action('wp_head', 'maat_add_favicon');

/**
 * Add admin bar styles
 *
 * @return mixed
 */
function maat_add_adminbar_styles()
{
    if (is_user_logged_in() && is_admin_bar_showing()) {
        $output = "";
        $output .= '<style type="text/css" media="screen">' . PHP_EOL;
        $output .= "\t" . 'html { ' . PHP_EOL;
        $output .= "\t\t" . 'margin-top: 46px !important;' . PHP_EOL;
        $output .= "\t" . '}' . PHP_EOL;
        $output .= "\t" . '* html body { ' . PHP_EOL;
        $output .= "\t\t" . 'margin-top: 0 !important;' . PHP_EOL;
        $output .= "\t" . '}' . PHP_EOL;
        $output .= "\t" . 'html #wpadminbar { ' . PHP_EOL;
        $output .= "\t\t" . 'height: 46px !important;' . PHP_EOL;
        $output .= "\t" . '}' . PHP_EOL;
        $output .= "\t" . '@media screen and ( min-width: 1440px ) {' . PHP_EOL;
        $output .= "\t\t" . 'html { ' . PHP_EOL;
        $output .= "\t\t\t" . 'margin-top: 32px !important;' . PHP_EOL;
        $output .= "\t\t" . '}' . PHP_EOL;
        $output .= "\t\t" . '* html body { ' . PHP_EOL;
        $output .= "\t\t\t" . 'margin-top: 0 !important;' . PHP_EOL;
        $output .= "\t\t" . '}' . PHP_EOL;
        $output .= "\t\t" . 'html #wpadminbar { ' . PHP_EOL;
        $output .= "\t\t\t" . 'height: 32px !important;' . PHP_EOL;
        $output .= "\t\t" . '}' . PHP_EOL;
        $output .= "\t" . '}' . PHP_EOL;
        $output .= '</style>' . PHP_EOL;
        echo $output;
    }
}
