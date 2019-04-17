<?php

/** ===========================================================================
 * Description
 * @package Maat Legal Theme
 * @version 0.9.0
 * -----
 * @author Sam Rankin (sam@maatlegal.com>)
 * @copyright Copyright (c) 2019 Maat Legal
 * -----
 * Created Date: 4-10-19
 * Last Modified: 4-12-19 at 3:48 pm
 * Modified By: Sam Rankin <sam@maatlegal.com>
 * @link https://kb.wpbakery.com/docs/inner-api/vc_map/
 * -----
 * HISTORY:
 * Date    	By	Comments
 * --------	--	--------------------------------------------------------------
* ========================================================================= */

$elem = 'vc_row';

$removeAtts = array(
    'gap',
    'columns_placement',
    'equal_height',
    'rtl_reverse',
    'content_placement',
    'full_width',
    'full_height',
    'css_editor'
);
maatRemoveAtts($elem, $removeAtts);

$newAtts = array(
    array(
        'type' => 'textfield',
        'heading' => 'Row Inner Class',
        'param_name' => 'section_inner_class',
        'value' => '',
        'weight' => '2',
        'description' => __( 'Class for the inner container of a row', 'maat' )
    ),
    array(
        'type' => 'textfield',
        'heading' => 'Content Wraper Class',
        'param_name' => 'section_wrapper_class',
        'value' => '',
        'weight' => '1',
        'description' => __( 'Class for the container that wrapps all the columns', 'maat' )
    ),
    array(
        'type' => 'checkbox',
        'heading' => __( 'Full Width Row', 'maat' ),
        'param_name' => 'full_width_row',
        'description' => __( 'If checked the row will be full width.', 'maat' ),
        'value' => array( __( 'Yes', 'maat' ) => 'yes' ),
    ),
    array(
        'type' => 'attach_image',
        'heading' => __( 'Background Image', 'maat' ),
        'param_name' => 'bg_image',
        'value' => '',
        'description' => __( 'Select image from media library.', 'maat' ),
    ),
    array(
        'type' => 'dropdown',
        'heading' => __( 'Background Image Horizontal Position', 'maat' ),
        'param_name' => 'bg_image_h_position',
        'value' => array(
            __( 'Center', 'maat' ) => 'center',
            __( 'Left', 'maat' ) => 'left',
            __( 'Right', 'maat' ) => 'right',
        ),
        'description' => __( 'Background position along x-axis', 'maat' ),
        'dependency' => array(
            'element' => 'bg_image',
            'not_empty' => true,
        ),
    ),
    array(
        'type' => 'dropdown',
        'heading' => __( 'Background Image Vertical Position', 'maat' ),
        'param_name' => 'bg_image_v_position',
        'value' => array(
            __( 'Center', 'maat' ) => 'center',
            __( 'Bottom', 'maat' ) => 'bottom',
            __( 'Top', 'maat' ) => 'top',
        ),
        'description' => __( 'Background position along y-axis', 'maat' ),
        'dependency' => array(
            'element' => 'bg_image',
            'not_empty' => true,
        ),
    ),
    array(
        'type' => 'dropdown',
        'heading' => __( 'Background Color', 'maat' ),
        'param_name' => 'bg_color',
        'value' => array(
            __( 'None', 'maat' )         => '',
            __( 'Primary', 'maat' )   => 'bg-primary',
            __( 'Secondary', 'maat' ) => 'bg-secondary',
            __( 'Tertiary', 'maat' )  => 'bg-tertiary',
            __( 'Success', 'maat' )   => 'bg-success',
            __( 'Danger', 'maat' )    => 'bg-danger',
            __( 'Warning', 'maat' )   => 'bg-warning',
            __( 'Info', 'maat' )      => 'bg-info',
            __( 'Light', 'maat' )     => 'bg-light',
            __( 'Dark', 'maat' )      => 'bg-dark',
            __( 'Gray 100', 'maat' )  => 'bg-gray-100',
            __( 'Gray 200', 'maat' )  => 'bg-gray-200',
            __( 'Gray 300', 'maat' )  => 'bg-gray-300',
            __( 'Gray 400', 'maat' )  => 'bg-gray-400',
            __( 'Gray 500', 'maat' )  => 'bg-gray-500',
            __( 'Gray 600', 'maat' )  => 'bg-gray-600',
            __( 'Gray 700', 'maat' )  => 'bg-gray-700',
            __( 'Gray 800', 'maat' )  => 'bg-gray-800',
            __( 'Gray 900', 'maat' )  => 'bg-gray-900',

        ),
        'description' => __( 'Choose a background color from the theme colors', 'maat' ),
    ),
    array(
        'type' => 'checkbox',
        'heading' => __( 'Make Columns Vertical', 'maat' ),
        'param_name' => 'vertical_cols',
        'description' => __( 'If checked columns will always be stacked vertically instead of horizontally.', 'maat' ),
        'value' => array( __( 'Yes', 'maat' ) => 'yes' ),
    ),
    array(
        'type' => 'dropdown',
        'heading' => __( 'Column Horizontal Alignment', 'maat' ),
        'param_name' => 'col_h_align',
        'value' => array(
            __( 'Default', 'maat' ) => '',
            __( 'Left', 'maat' ) => 'justify-content-start',
            __( 'Right', 'maat' ) => 'justify-content-end',
            __( 'Center', 'maat' ) => 'justify-content-center',
            __( 'Distributed with side space', 'maat' ) => 'justify-content-around',
            __( 'Distributed with no space', 'maat' ) => 'justify-content-between',
        ),
        'description' => __( 'Flexbox property: justify-content', 'maat' ),
    ),
    array(
        'type' => 'dropdown',
        'heading' => __( 'Column Vertical Alignment', 'maat' ),
        'param_name' => 'col_v_align',
        'value' => array(
            __( 'Default', 'maat' ) => '',
            __( 'Top', 'maat' ) => 'align-items-start',
            __( 'Bottom', 'maat' ) => 'align-items-end',
            __( 'Middle', 'maat' ) => 'align-items-center',
            __( 'Font Baseline', 'maat' ) => 'align-items-baseline',
            __( 'Stretch all Columns', 'maat' ) => 'align-items-stretch',
        ),
        'description' => __( 'Flexbox property: align-items', 'maat' ),
    ),
);
maatAddAtts($elem, $newAtts);

$updatedAtts = array(
    array(
        'param_name' => 'el_class',
        'heading' => __( 'Row Outer Class', 'maat' ),
        'weight' => '3',
    ),
    array(
        'param_name' => 'el_id',
        'weight' => '4',
    ),
);
maatUpdatedAtts($elem, $updatedAtts);
