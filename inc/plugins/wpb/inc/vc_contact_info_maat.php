<?php

/** ===========================================================================
 * Visual Composer Setup file for the Contact Info Component
 * @package Contact Info
 * @version <<version>>
 * @link http://www.wpelixir.com/how-to-create-new-element-in-visual-composer/
 * @uses WPBakeryShortCode
 * -----
 * @author Sam Rankin <you@you.you>
 * @copyright Copyright (c) 2019 Maat Legal
 * -----
 * ========================================================================= */

class maatContactInfo extends WPBakeryShortCode
{

    // Element Init
    function __construct()
    {
        add_action('init', array($this, 'vc_contact_info_maat_mapping'));
        add_shortcode('vc_contact_info_maat', array($this, 'vc_contact_info_maat_html'));
    }

    // Element Mapping
    public function vc_contact_info_maat_mapping()
    {

        // Stop all if VC is not enabled
        if (!defined('WPB_VC_VERSION')) {
            return;
        }

        // Map the block with vc_map()
        vc_map(
            array(
                'name'        => __('Contact Info', 'maat'),
                'base'        => 'vc_contact_info_maat',
                'description' => __('', 'maat'),
                'category'    => __('Maat Components', 'maat'),
                'params'      => array(
                    array(
                        'type'        => 'textfield',
                        'heading'     => __('Element ID', 'maat'),
                        'param_name'  => 'el_id',
                        'description' => sprintf(__('Enter element ID (Note: make sure it is unique and valid according to <a href="%s" target="_blank">w3c specification</a>).', 'maat'), 'http://www.w3schools.com/tags/att_global_id.asp'),
                    ),
                    array(
                        'type'        => 'textfield',
                        'heading'     => __('Extra class name', 'maat'),
                        'param_name'  => 'el_class',
                        'description' => __('Style particular content element differently - add a class name and refer to it in custom CSS.', 'maat'),
                    ),
                    array(
                        'type' => 'checkbox',
                        'heading' => __('Add Links to Items', 'maat'),
                        'param_name' => 'add_links',
                        'value' => array(__('Yes', 'maat') => 'yes'),
                        'description' => __('Make items such as address, email and telephone clickable', 'maat'),
                    ),
                    array(
                        'type' => 'checkbox',
                        'heading' => __('Add Icons to Items', 'maat'),
                        'param_name' => 'add_icons',
                        'value' => array(__('Yes', 'maat') => 'yes'),
                        'description' => __('Insert icons before each item', 'maat'),
                    ),
                    array(
                        'type' => 'checkbox',
                        'heading' => __('Items to Display', 'maat'),
                        'param_name' => 'display_items',
                        'value' => array(
                            __('Address', 'maat') => 'address',
                            __('Email', 'maat') => 'email',
                            __('Phone', 'maat') => 'phone',
                            __('Fax', 'maat') => 'fax',
                            __('Hours of Business', 'maat') => 'hob'
                        ),
                        'description' => __('Choose which items you want displayed', 'maat'),
                    ),
                ),
            )
        );
    }

    // Element HTML
    public function vc_contact_info_maat_html($atts)
    {
        $location_info = getLocationInfo();
        extract(
            shortcode_atts(
                array(
                    'el_id'    => '',
                    'el_class' => '',
                    'add_links' => '',
                    'add_icons' => '',
                    'display_items' => '',
                ),
                $atts
            )
        );

        $icons = ($add_icons === 'yes') ? 1 : 0;
        $links = ($add_links === 'yes') ? 1 : 0;

        $defaults = array(
            'wrapper' => 'div',
            'icons' => $icons
        );

        $display_items = explode(',', $display_items);
        $items = array();
        foreach ($display_items as $item) {
            $items[$item]['content'] = $location_info[$item];
            if ($item === 'address') {
                $items[$item]['wrapper'] = 'address';
            } else {
                $items[$item]['wrapper'] = 'div';
            }
            if ($item !== 'fax' || $item !== 'hob') {
                $items[$item]['link'] = $links;
            }
        }
        $args = wp_parse_args($items, $defaults);

        $wrapper_attributes = array();
        if (!empty($el_id)) {
            $wrapper_attributes[] = 'id="' . esc_attr($el_id) . '"';
        }

        if (!empty($el_id)) {
            $end_comment = '<!-- end #' . esc_attr($el_id) . '.content-item-->';
        } else {
            $end_comment = '<!-- end .content-item-->';
        }

        $container_classes = array(
            'content-item',
            'maat-contact-info',
        );

        $custom_classes = explode(' ', $el_class);

        foreach ($custom_classes as $class) {
            $container_classes[] = $class;
        }

        $container_class      = maat_add_item_classes($container_classes);
        $wrapper_attributes[] = $container_class;

        // Fill $html var with data
        $output .= "\n" . '<div ' . implode(' ', $wrapper_attributes) . '>';
        $output .= "\n\t" . displayLocationInfo($args);
        $output .= "\n" . '</div>' . $end_comment;

        return $output;
    }
} // End Element Class

// Element Class Init
new maatContactInfo();
