<?php
/**
    * Better Print
    *
    * Adds the <pre> tag to the print value
    *
    * @param mixed $val Value to print to page
    * @uses print_r()
*/
function print_r2($val)
{
    echo '<pre>';
    print_r($val);
    echo '</pre>';
}

function item_title($item)
{
    $item = sanitize_title_with_dashes($item);
    $item = str_replace('_', '-', $item);
    return $item;
}

/**
    * Load component partial file
    *
    * Loads a file from a specific compontent. The component must be
    * located in the components folder and the file must be located in the
    * partials sub folder. To be used for locating templates for a specific
    * component
    *
    * @param string $component Name of folder where the partial is located.
    * (subfolder of components)
    * @param string $partial Name of file to load.
    * @uses get_template_part()
*/
function get_component_partial($component, $partial)
{
    $file = COMPONENT_PATH . '/' . $component . '/partials/' . $partial . '.php';
    $path = 'inc/components/' . $component . '/partials/' . $partial;
    if (file_exists($file)) {
        get_template_part($path);
    } else {
        echo 'File does not exist';
    }
}
/**
    * Include component partial file
    *
    * Includes a file from a specific compontent. The component must be
    * located in the components folder and the file must be located in the
    * partials sub folder. To be used for adding functionality for a specific
    * component
    *
    * @param string $component Name of folder where the partial is located.
    * (subfolder of components)
    * @param string $partial Name of file to load.
    * @uses include_once()
*/
function include_component_partial($component, $partial)
{
    $component = item_title($component);
    $path = COMPONENT_PATH_URI . '/' . $component . '/partials/' . $partial . '.php';
    if (file_exists($path)) {
        include_once($path);
    }
}
/**
    * Include component setup file
    *
    * Includes the setup file from a specific compontent. The component must be
    * located in the components folder
    *
    * @param string $component Name of folder where the partial is located.
    * (subfolder of components)
    * @param string $partial Name of file to load.
    * @uses get_template_part()
*/
function get_component_setup($component)
{
    $component = item_title($component);
    $path = COMPONENT_PATH_URI . '/' . $component . '/setup.php';
    if (file_exists($path)) {
        include_once($path);
    }
}

function bg_color_list()
{
    $bg_colors = array(
        'primary' => 'Primary Color',
        'secondary' => 'Secondary Color',
        'success' => 'Success Color',
        'danger' => 'Danger Color',
        'warning' => 'Warning Color',
        'info' => 'Info Color',
        'light' => 'Light Color',
        'dark' => 'Dark Color',
        'white' => 'White Color',
        'transparent' => 'Transparent',
        'custom' => 'Custom Color',
    );
    return $bg_colors;
}

function bootstrap_bg_colors()
{
    $colors = array(
        'bg-primary' => 'Primary',
        'bg-secondary' => 'Secondary',
        'bg-success' => 'Success',
        'bg-danger' => 'Danger',
        'bg-warning' => 'Warning',
        'bg-info' => 'Info',
        'bg-light' => 'Light',
        'bg-dark' => 'Dark',
        'bg-transparent' => 'Transparent',
        'bg-white' => 'White',
        'bg-custom' => 'Custom',
    );
    return $colors;
}

function bg_color_choices($field)
{
    global $settings;
    $theme_colors = $settings['colors'];
    $custom_colors = $theme_colors['custom_colors'];

    $colors = array(
        'bg-primary' => 'Primary',
        'bg-secondary' => 'Secondary',
        'bg-success' => 'Success',
        'bg-danger' => 'Danger',
        'bg-warning' => 'Warning',
        'bg-info' => 'Info',
        'bg-light' => 'Light',
        'bg-dark' => 'Dark',
        'bg-transparent' => 'Transparent',
        'bg-white' => 'White',
    );

    if ($custom_colors) {
        foreach ($custom_colors as $color) {
            $color_name = $color['color_name'];
            $css_name = sanitize_html_class($color_name);
            $custom_color = $color['custom_color'];
            $colors += ['bg-' . $css_name => $color_name];
        }
    }

    $field['choices'] = $colors;
    return $field;
}
add_filter('acf/load_field/name=background_color', 'bg_color_choices');

function bootstrap_txt_colors()
{
    $colors = array(
        'text-primary' => 'Primary',
        'text-secondary' => 'Secondary',
        'text-success' => 'Success',
        'text-danger' => 'Danger',
        'text-warning' => 'Warning',
        'text-info' => 'Info',
        'text-light' => 'Light',
        'text-dark' => 'Dark',
        'text-body' => 'Body',
        'text-white' => 'White',
        'text-white-50' => 'White 50',
        'text-black-50' => 'Black 50',
        'text-custom' => 'Custom',
    );
    return $colors;
}

function add_item_classes($classes = array())
{
    $class_list = 'class="';

    $all_classes = '';
    foreach ($classes as $class) {
        if (!empty($class)) {
            $all_classes .= sanitize_html_class($class) . ' ';
        }
    }
    $class_list .= trim($all_classes) . '"';
    return $class_list;
}

function add_item_styles($styles = array())
{
    $styles_list = ' style="';

    $all_styles = '';
    foreach ($styles as $property => $value) {
        if (!empty($value)) {
            $all_styles .= $property . ': ' . $value . '; ';
        }
    }
    $styles_list .= trim($all_styles) . '"';
    return $styles_list;
}

function add_item_data($data = array())
{

    $all_data = '';
    foreach ($data as $property => $value) {
        if (!empty($value)) {
            $all_data .= ' ' . $property . '="' . $value . '"';
        }
    }
    return $all_data;
}

function acf_divider($item_name)
{
    $fields = array(
        'key' => 'field_' . $item_name . '_divider',
        'label' => 'Divider',
        'type' => 'message',
        'wrapper' => array(
            'class' => 'acf-divider w-100',
        ),
    );

    return $fields;
}

// Get page ID with page slugs
function get_id_by_slug($page_slug)
{
    $page = get_page_by_path($page_slug);
    if ($page) {
        return $page->ID;
    } else {
        return null;
    }
}

// Turn hex values into rgb values
function hex2rgba($hex, $opacity)
{
    $hex = str_replace("#", "", $hex);

    if (strlen($hex) == 3) {
        $r = hexdec(substr($hex, 0, 1) . substr($hex, 0, 1));
        $g = hexdec(substr($hex, 1, 1) . substr($hex, 1, 1));
        $b = hexdec(substr($hex, 2, 1) . substr($hex, 2, 1));
    } else {
        $r = hexdec(substr($hex, 0, 2));
        $g = hexdec(substr($hex, 2, 2));
        $b = hexdec(substr($hex, 4, 2));
    }

    $a = intval($opacity) * 0.01;

    $rgba = array($r, $g, $b, $a);

    $Final_Rgb_color = implode(", ", $rgba);

    return $Final_Rgb_color;
}

// Time Elapsed Function
function time_elapsed_string($datetime, $full = false)
{
    $now = new DateTime;
    $ago = new DateTime($datetime);
    $diff = $now->diff($ago);

    $diff->w = floor($diff->d / 7);
    $diff->d -= $diff->w * 7;

    $string = array(
        'y' => 'year',
        'm' => 'month',
        'w' => 'week',
        'd' => 'day',
        'h' => 'hour',
        'i' => 'minute',
        's' => 'second',
    );
    foreach ($string as $k => &$v) {
        if ($diff->$k) {
            $v = $diff->$k . ' ' . $v . ($diff->$k > 1 ? 's' : '');
        } else {
            unset($string[$k]);
        }
    }

    if (!$full) {
        $string = array_slice($string, 0, 1);
    }

    return $string ? implode(', ', $string) . ' ago' : 'just now';
}

// UTF-8 String Replace
function utf8_substr_replace($original, $replacement, $position, $length)
{
    $startString = mb_substr($original, 0, $position, "UTF-8");
    $endString = mb_substr($original, $position + $length, mb_strlen($original), "UTF-8");

    $out = $startString . $replacement . $endString;

    return $out;
}

// Function to Sanatize String for CSS Class use
function seoUrl($string)
{
    $string = strtolower($string);
    $string = preg_replace("/[^a-z0-9_\s-]/", "", $string);
    $string = preg_replace("/[\s-]+/", " ", $string);
    $string = preg_replace("/[\s_]/", "-", $string);
    return $string;
}

function get_the_slug($post_id)
{
    if (empty($post_id)) {
        $post_id = get_the_id();
    }
    $item = get_post($post_id);
    $slug = $item->post_name;
    return $slug;
}

function the_slug($post_id)
{
    if (empty($post_id)) {
        $post_id = get_the_id();
    }
    $item = get_post($post_id);
    $slug = $item->post_name;
    echo $slug;
}

function get_post_id_by_slug($slug, $type)
{
    $item = get_page_by_path($slug, object, $type);
    if ($item) {
        return $item->ID;
    } else {
        return null;
    }
}

function to_title_case($string)
{
    /* Words that should be entirely lower-case */
    $articles_conjunctions_prepositions = array(
        'a', 'an', 'the',
        'and', 'but', 'or', 'nor',
        'if', 'then', 'else', 'when',
        'at', 'by', 'from', 'for', 'in',
        'off', 'on', 'out', 'over', 'to', 'into', 'with'
    );
    /* Words that should be entirely upper-case (need to be lower-case in this list!) */
    $acronyms_and_such = array(
        'asap', 'unhcr', 'wpse', 'wtf'
    );
    /* split title string into array of words */
    $words = explode(' ', mb_strtolower($string));
    /* iterate over words */
    foreach ($words as $position => $word) {
        /* re-capitalize acronyms */
        if (in_array($word, $acronyms_and_such)) {
            $words[$position] = mb_strtoupper($word);
            /* capitalize first letter of all other words, if... */
        } elseif (
            /* ...first word of the title string... */
            0 === $position ||
            /* ...or not in above lower-case list*/
            !in_array($word, $articles_conjunctions_prepositions)
        ) {
            $words[$position] = ucwords($word);
        }
    }
    /* re-combine word array */
    $string = implode(' ', $words);
    /* return title string in title case */
    return $string;
}

function maat_item_type()
{
    $item_type = '';
    $queried_object = get_queried_object();
    if (is_singular('post') || is_post_type_archive('post') || is_home()) {
        $item_type = 'blog';
    } elseif (is_singular()) {
        $item_type = $queried_object->post_type;
    } elseif (is_post_type_archive()) {
        $item_type = $queried_object->labels->singular_name;
        $item_type = sanitize_title($item_type);
    } elseif (is_404()) {
        $item_type = 'error';
    } elseif (is_search()) {
        $item_type = 'search';
    } else {
        $item_type = 'Error no type';
    }
    return $item_type;
}
function maat_item_title()
{
    $item_title = '';
    $queried_object = get_queried_object();
    if (is_singular('post') || is_post_type_archive('post') || is_home()) {
        $item_title = 'Blog';
    } elseif (is_singular()) {
        $item_title = $queried_object->post_type;
        $item_title = to_title_case($item_title);
    } elseif (is_post_type_archive()) {
        $item_title = $queried_object->labels->name;
    } elseif (is_404()) {
        $item_title = 'Error';
    } elseif (is_search()) {
        $item_title = 'Search';
    } else {
        $item_title = 'Error no title';
    }

    return $item_title;
}
