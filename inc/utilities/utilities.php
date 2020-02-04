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
 * @uses include_once()
 */
function include_component_partial($component, $partial)
{
    $path = COMPONENT_PATH . '/' . $component . '/partials/' . $partial . '.php';
    if (file_exists($path)) {
        include_once($path);
    }
}

/**
 * Add html markup for classes from array
 *
 * @param array $classes
 *
 * @return string
 */
function maat_add_item_classes($classes = array())
{
    $class_list = 'class="';

    $all_classes = '';
    if (!empty($classes)) {
        $classes = array_unique($classes);
        foreach ($classes as $class) {
            $all_classes .= sanitize_html_class($class) . ' ';
        }
        $class_list .= trim($all_classes) . '"';
        return $class_list;
    } else {
        return '';
    }
}
/**
 * Add html markup for inline styles from array
 *
 * @param array $styles
 *
 * @return string
 */

function maat_add_item_styles($styles = array())
{
    $styles_list = ' style="';

    $all_styles = '';
    if (!empty($styles)) {
        foreach ($styles as $property => $value) {
            if ($property === 'background-image') {
                $all_styles .= $property . ': url(' . $value . '); ';
            } else {
                $all_styles .= $property . ': ' . $value . '; ';
            }
        }
        $styles_list .= trim($all_styles) . '"';
        return $styles_list;
    } else {
        return '';
    }
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

/**
 * Turn Hex colors in rgba colors
 *
 * @param string $hex
 * @param number $opacity
 *
 * @return string rgba()
 */
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

function get_the_slug($post_id = '')
{
    if (empty($post_id)) {
        $post_id = get_the_id();
    }
    $item = get_post($post_id);
    $slug = $item->post_name;
    return $slug;
}

function the_slug($post_id = '')
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
    $string = str_replace("_", " ", $string);
    $string = str_replace("-", " ", $string);
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

function to_snake_case($str)
{
    $str = sanitize_title_with_dashes($str);
    $str = str_replace("-", "_", $str);
    return $str;
}

function to_kebab_case($str)
{
    $str = sanitize_title_with_dashes($str);
    $str = str_replace("_", "-", $str);
    return $str;
}
