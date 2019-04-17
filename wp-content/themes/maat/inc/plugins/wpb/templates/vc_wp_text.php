<?php

/** ===========================================================================
 * Visual Composer Text Element
 * @package Maat Legal Theme
 * @version 0.9.0
 * -----
 * @author Sam Rankin (sam@maatlegal.com>)
 * @copyright Copyright (c) 2019 Maat Legal
 * -----
 * Shortcode attributes
 * @var $atts
 * @var $el_class
 * @var $el_id
 * @var $content - shortcode content
 * Shortcode class
 * @var $this WPBakeryShortCode_VC_Wp_Text
 * -----
 * Created Date: 4-2-19
 * Last Modified: 4-3-19 at 12:05 pm
 * Modified By: Sam Rankin <sam@maatlegal.com>
 * -----
 * HISTORY:
 * Date    	By	Comments
 * --------	--	--------------------------------------------------------------
* ========================================================================= */


if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

$el_class = $el_id = '';
$output = '';
$atts = vc_map_get_attributes( $this->getShortcode(), $atts );
$atts['filter'] = true; //Hack to make sure that <p> added
extract( $atts );

$el_class = $this->getExtraClass( $el_class );
$wrapper_attributes = array();
if ( ! empty( $el_id ) ) {
	$wrapper_attributes[] = 'id="' . esc_attr( $el_id ) . '"';
}
$output = '<div ' . implode( ' ', $wrapper_attributes ) . ' class="vc_wp_text wpb_content_element content-item ' . esc_attr( $el_class ) . '">';
$type = 'WP_Widget_Text';
$args = array();
$content = apply_filters( 'vc_wp_text_widget_shortcode', $content );
if ( strlen( $content ) > 0 ) {
	$atts['text'] = $content;
}
global $wp_widget_factory;
// to avoid unwanted warnings let's check before using widget
if ( is_object( $wp_widget_factory ) && isset( $wp_widget_factory->widgets, $wp_widget_factory->widgets[ $type ] ) ) {
	ob_start();
	the_widget( $type, $atts, $args );
	$output .= ob_get_clean();

	$output .= '</div>';

	echo $output;
}
