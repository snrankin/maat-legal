<?php

/** ===========================================================================
 * Visual Composer Setup file for the Twitter Feed Component
 * @package Twitter Feed
 * @version <<version>>
 * @link http://www.wpelixir.com/how-to-create-new-element-in-visual-composer/
 * @uses WPBakeryShortCode
 * -----
 * @author Sam Rankin <you@you.you>
 * @copyright Copyright (c) 2019 Maat Legal
 * -----
 * ========================================================================= */

class maatTwitterFeed extends WPBakeryShortCode
{

    // Element Init
    function __construct()
    {
        add_action('init', array($this, 'vc_twitter_feed_maat_mapping'));
        add_shortcode('vc_twitter_feed_maat', array($this, 'vc_twitter_feed_maat_html'));
    }

    // Element Mapping
    public function vc_twitter_feed_maat_mapping()
    {

        // Stop all if VC is not enabled
        if (!defined('WPB_VC_VERSION')) {
            return;
        }

        // Map the block with vc_map()
        vc_map(
            array(
                'name'        => __('Twitter Feed', 'maat'),
                'base'        => 'vc_twitter_feed_maat',
                'description' => __('Twitter Feed', 'maat'),
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
                        'type'        => 'textfield',
                        'heading'     => __('Number of Tweets to Show', 'maat'),
                        'param_name'  => 'num_tweets',
                    ),
                ),
            )
        );
    }

    // Element HTML
    public function vc_twitter_feed_maat_html($atts)
    {
        // Params extraction
        extract(
            shortcode_atts(
                array(
                    'el_id'    => '',
                    'el_class' => '',
                    'num_tweets' => '',
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
            $elem,
        );

        $custom_classes = explode(' ', $el_class);

        foreach ($custom_classes as $class) {
            $container_classes[] = $class;
        }

        $container_class      = maat_add_item_classes($container_classes);
        $wrapper_attributes[] = $container_class;

        $maat = get_option('maat_theme');

        $username = $maat['twitter_feed']['username'];

        // Fill $html var with data
        $output .= "\n" . '<div ' . implode(' ', $wrapper_attributes) . '>';
        $output .= "\n\t" . buildTwitterFeed($username, $num_tweets, 1, 1, 1);
        $output .= "\n" . '</div>' . $end_comment;

        return $output;
    }
} // End Element Class

// Element Class Init
new maatTwitterFeed();
