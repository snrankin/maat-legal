<?php

/** ===========================================================================
 * Functions to Customie Visual Composer
 * @package Maat Legal Theme
 * @version 0.9.0
 * -----
 * @author Sam Rankin (sam@maatlegal.com>)
 * @copyright Copyright (c) 2019 Maat Legal
 * -----
 * Created Date: 4-2-19
 * Last Modified: 4-12-19 at 10:34 am
 * Modified By: Sam Rankin <sam@maatlegal.com>
 * -----
 * HISTORY:
 * Date    	By	Comments
 * --------	--	--------------------------------------------------------------
* ========================================================================= */

/**
 * Convert Column Width to Class
 *
 * @param string $width
 *
 * @return string
 */
function maat_col_width_to_span($width){
    $output = $width;
    preg_match('/(\d+)\/(\d+)/', $width, $matches);

    if (!empty($matches)) {
        $part_x = (int)$matches[1];
        $part_y = (int)$matches[2];
        if ($part_x > 0 && $part_y > 0) {
            $value = ceil($part_x / $part_y * 12);
            if ($value > 0 && $value <= 12) {
                $output = 'col-lg-' . $value;
            }
        }
    }
    if (preg_match('/\d+\/5$/', $width)) {
        $part_x = (int)$matches[1];
        $part_y = (int)$matches[2];
        if ($part_x > 0 && $part_y > 0) {
            $value = ceil($part_x / $part_y * 100);
            if ($value > 0 && $value <= 100) {
                $output = 'col-lg-' . $value;
            }
        }
    }

    return apply_filters('vc_translate_column_width_class', $output, $width);
}

function maat_col_offset_class_merge($column_offset, $width){
    // Remove offset settings if
    if ('1' === vc_settings()->get('not_responsive_css')) {
        $column_offset = preg_replace('/col\-(lg|md|xs)[^\s]*/', '', $column_offset);
    }
    if (preg_match('/col\-sm\-\d+/', $column_offset)) {
        return $column_offset;
    }

    return $width . (empty($column_offset) ? '' : ' ' . $column_offset);
}

/**
 * Update VC Shortcode Attributes
 *
 * @param string $elem
 * @param array $updated_atts
 * @link https://kb.wpbakery.com/docs/developers-how-tos/change-default-value-of-param/
 * @return void
 */
function maatUpdatedAtts($elem, $updated_atts = ''){
    if(!empty($updated_atts)){
        if( function_exists('vc_update_shortcode_param') ){
            foreach ($updated_atts as $att) {
                vc_update_shortcode_param($elem, $att);
            }
        }
    }
}

/**
 * Remove VC Shortcode Attributes
 *
 * @param string $elem
 * @param array $remove_atts
 * @link https://kb.wpbakery.com/docs/inner-api/vc_remove_param/
 * @return void
 */
function maatRemoveAtts($elem, $remove_atts = ''){
    if(!empty($remove_atts)){
        if( function_exists('vc_remove_param') ){
            foreach ($remove_atts as $att) {
                vc_remove_param($elem, $att);
            }
        }
    }
}
/**
 * Add VC Shortdcode Attributes
 *
 * @param string $elem
 * @param array $add_atts
 * @link https://kb.wpbakery.com/docs/inner-api/vc_add_param/
 * @return void
 */
function maatAddAtts($elem, $add_atts = ''){
    if(!empty($add_atts)){
        if( function_exists('vc_add_param') ){
            foreach ($add_atts as $att) {
                vc_add_param($elem, $att);
            }
        }
    }
}

function maatGenerateVCClasses($css_classes, $base, $atts){
    $classes = '';
    if(!empty($css_classes)){
        $css_class = preg_replace(
            '/\s+/',
            ' ',
            apply_filters(
                VC_SHORTCODE_CUSTOM_CSS_FILTER_TAG,
                implode(
                    ' ',
                    array_filter(
                        array_unique( $css_classes )
                    )
                ),
                $base,
                $atts
            )
        );
        $classes  = ' class="' . esc_attr( trim( $css_class ) ) .  '"';
    }
    return $classes;
}
