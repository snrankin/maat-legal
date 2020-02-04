<?php

/** ===========================================================================
 * Description
 * @package Maat Legal Theme
 * @version 0.9.0
 * -----
 * @author Sam Rankin (sam@maatlegal.com>)
 * @copyright Copyright (c) 2019 Maat Legal
 * -----
 * Created Date:  4-27-19
 * Last Modified: 5-7-19 at 10:58 am
 * Modified By:   Sam Rankin <sam@maatlegal.com>
 * -----
 * HISTORY:
 * Date    	By	Comments
 * --------	--	--------------------------------------------------------------
 * ========================================================================= */


$elem = 'vc_section';

$removeAtts = array(
    'full_width',
    'parallax_image'
);
maatRemoveAtts($elem, $removeAtts);

$updatedAtts = array(
    array(
        'param_name' => 'el_id',
        'weight' => '9',
    ),
    array(
        'param_name' => 'el_class',
        'heading' => __('Section Outer Class', 'maat'),
        'weight' => '8',
    ),
    array(
        'param_name' => 'content_placement',
        'weight' => '6',
        'value' => array(
            __('Default', 'maat') => '',
            __('Top', 'maat') => 'justify-content-start',
            __('Middle', 'maat') => 'justify-content-center',
            __('Bottom', 'maat') => 'justify-content-end',
            __('Distributed with space', 'maat') => 'justify-content-around',
            __('Distributed with no space', 'maat') => 'justify-content-between',
        ),
        'description' => __('Select content position within section.', 'maat'),
    ),
);
maatUpdatedAtts($elem, $updatedAtts);

$newAtts = array(
    array(
        'type' => 'textfield',
        'heading' => 'Section Inner Class',
        'param_name' => 'inner_class',
        'class' => 'vc_col-lg-6',
        'weight' => '7',
        'description' => __('Class for the inner container of a row', 'maat')
    ),
    array(
        'type' => 'checkbox',
        'heading' => __('Remove Padding', 'maat'),
        'param_name' => 'no_padding',
        'value' => array(__('Yes', 'maat') => 'yes'),
        'weight' => '5',
    ),

    array(
        'type' => 'dropdown',
        'heading' => __('Background Color', 'maat'),
        'param_name' => 'bg_color',
        'value' => array(
            __('None', 'maat')         => '',
            __('Primary', 'maat')   => 'bg-primary',
            __('Secondary', 'maat') => 'bg-secondary',
            __('Tertiary', 'maat')  => 'bg-tertiary',
            __('Success', 'maat')   => 'bg-success',
            __('Danger', 'maat')    => 'bg-danger',
            __('Warning', 'maat')   => 'bg-warning',
            __('Info', 'maat')      => 'bg-info',
            __('Light', 'maat')     => 'bg-light',
            __('Dark', 'maat')      => 'bg-dark',
            __('Gray 100', 'maat')  => 'bg-gray-100',
            __('Gray 200', 'maat')  => 'bg-gray-200',
            __('Gray 300', 'maat')  => 'bg-gray-300',
            __('Gray 400', 'maat')  => 'bg-gray-400',
            __('Gray 500', 'maat')  => 'bg-gray-500',
            __('Gray 600', 'maat')  => 'bg-gray-600',
            __('Gray 700', 'maat')  => 'bg-gray-700',
            __('Gray 800', 'maat')  => 'bg-gray-800',
            __('Gray 900', 'maat')  => 'bg-gray-900',
            __('Custom', 'maat')    => 'custom',

        ),
        'description' => __('Choose a background color from the theme colors', 'maat'),
        'weight' => '4',
    ),
    array(
        'type' => 'attach_image',
        'heading' => __('Background Image', 'maat'),
        'param_name' => 'bg_image',
        'value' => '',
        'description' => __('Select image from media library.', 'maat'),
        'weight' => '3',
    ),
    array(
        'type' => 'dropdown',
        'heading' => __('Background Image Horizontal Position', 'maat'),
        'param_name' => 'bg_image_h_position',
        'value' => array(
            __('Center', 'maat') => 'c',
            __('Left', 'maat')   => 'l',
            __('Right', 'maat')  => 'r',
        ),
        'description' => __('Background position along x-axis', 'maat'),
        'dependency' => array(
            'element' => 'bg_image',
            'not_empty' => true,
        ),
        'weight' => '2',
    ),
    array(
        'type' => 'dropdown',
        'heading' => __('Background Image Vertical Position', 'maat'),
        'param_name' => 'bg_image_v_position',
        'value' => array(
            __('Center', 'maat') => 'c',
            __('Bottom', 'maat') => 'b',
            __('Top', 'maat') => 't',
        ),
        'description' => __('Background position along y-axis', 'maat'),
        'dependency' => array(
            'element' => 'bg_image',
            'not_empty' => true,
        ),
        'weight' => '1',
    ),
    array(
        'type' => 'checkbox',
        'heading' => __('Make Section Collapsible', 'maat'),
        'param_name' => 'collapsible',
        'value' => array(__('Yes', 'maat') => 'yes'),
        'description' => __('Must have an ID if it is going to collapse', 'maat'),
    ),
);
maatAddAtts($elem, $newAtts);
