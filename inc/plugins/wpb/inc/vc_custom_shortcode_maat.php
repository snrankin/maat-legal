<?php

/** ===========================================================================
 * Visual Composer Setup file for the Custom Shortcode Component
 * @package Custom Shortcode
 * @version <<version>>
 * @link http://www.wpelixir.com/how-to-create-new-element-in-visual-composer/
 * @uses WPBakeryShortCode
 * -----
 * @author Sam Rankin <you@you.you>
 * @copyright Copyright (c) 2019 Maat Legal
 * -----
 * ========================================================================= */

class maatCustomShortcode extends WPBakeryShortCode
{

    // Element Init
    function __construct()
    {
        add_action('init', array($this, 'vc_custom_shortcode_maat_mapping'));
        add_shortcode('vc_custom_shortcode_maat', array($this, 'vc_custom_shortcode_maat_html'));
    }

    // Element Mapping
    public function vc_custom_shortcode_maat_mapping()
    {

        // Stop all if VC is not enabled
        if (!defined('WPB_VC_VERSION')) {
            return;
        }

        // Map the block with vc_map()
        vc_map(
            array(
                'name'        => __('Custom Shortcode', 'maat'),
                'base'        => 'vc_custom_shortcode_maat',
                'description' => __('', 'maat'),
                'category'    => __('Maat Components', 'maat'),
                'params'      => array(
                    array(
                        'type'        => 'textfield',
                        'heading'     => __('Shortcode', 'maat'),
                        'param_name'  => 'maat_shortcode',
                        'description' => __('Enter a custom shortcode', 'maat'),
                    ),
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
                ),
            )
        );
    }

    // Element HTML
    public function vc_custom_shortcode_maat_html($atts)
    {
        // Params extraction
        extract(
            shortcode_atts(
                array(
                    'el_id'    => '',
                    'el_class' => '',
                    'maat_shortcode' => ''
                ),
                $atts
            )
        );

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
            'maat-custom-shortcode',
            $elem,
        );

        $custom_classes = explode(' ', $el_class);

        foreach ($custom_classes as $class) {
            $container_classes[] = $class;
        }

        $container_class      = maat_add_item_classes($container_classes);
        $wrapper_attributes[] = $container_class;

        // Fill $html var with data
        $output .= "\n" . '<div ' . implode(' ', $wrapper_attributes) . '>';
        $output .= "\n\t" . do_shortcode($maat_shortcode);
        $output .= "\n" . '</div>' . $end_comment;

        return $output;
    }
} // End Element Class

// Element Class Init
new maatCustomShortcode();
