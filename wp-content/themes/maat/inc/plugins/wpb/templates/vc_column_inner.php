<?php
if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

/**
 * Shortcode attributes
 * @var $atts
 * @var $el_class
 * @var $el_id
 * @var $width
 * @var $css
 * @var $offset
 * @var $content - shortcode content
 * Shortcode class
 * @var $this WPBakeryShortCode_VC_Column_Inner
 */
$el_class = $width = $el_id = $css = $offset = '';
$output = '';
$atts = vc_map_get_attributes( $this->getShortcode(), $atts );
extract( $atts );

$width = maat_col_width_to_span( $width );
$width = maat_col_offset_class_merge( $offset, $width );

$css_classes = array(
	$this->getExtraClass( $el_class ),
	'col',
	$width,
);

if ( vc_shortcode_custom_css_has_property( $css, array(
	'border',
	'background',
) ) ) {
	$css_classes[] = 'vc_col-has-fill';
}

$wrapper_attributes = array();

$css_class = preg_replace( '/\s+/', ' ', apply_filters( VC_SHORTCODE_CUSTOM_CSS_FILTER_TAG, implode( ' ', array_filter( $css_classes ) ), $this->settings['base'], $atts ) );
$wrapper_attributes[] = 'class="' . esc_attr( trim( $css_class ) ) . '"';
if ( ! empty( $el_id ) ) {
	$wrapper_attributes[] = 'id="' . esc_attr( $el_id ) . '"';
}
$innerColumnClass = 'content-wrapper ' . esc_attr( trim( vc_shortcode_custom_css_class( $css ) ) );

$output .= "\n" . '<div ' . implode( ' ', $wrapper_attributes ) . '>';
$output .= "\n\t" . '<div class="' . trim( $innerColumnClass ) . '">';
$output .= "\n\t\t" . wpb_js_remove_wpautop( $content );
$output .= "\n\t" . '</div><!-- end .content-wrapper -->';
$output .= "\n" . '</div><!-- end .col -->';

echo $output;
