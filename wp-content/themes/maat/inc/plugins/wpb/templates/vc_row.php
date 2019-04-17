<?php
if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

/**
 * Shortcode attributes
 * @var $atts
 * @var $el_class
 * @var $full_width
 * @var $full_height
 * @var $equal_height
 * @var $columns_placement
 * @var $content_placement
 * @var $parallax
 * @var $parallax_image
 * @var $css
 * @var $el_id
 * @var $video_bg
 * @var $video_bg_url
 * @var $video_bg_parallax
 * @var $parallax_speed_bg
 * @var $parallax_speed_video
 * @var $content - shortcode content
 * @var $css_animation
 * Shortcode class
 * @var $this WPBakeryShortCode_VC_Row
 */
$el_class = $parallax_speed_bg = $parallax_speed_video = $parallax = $parallax_image = $el_id = $video_bg = $video_bg_url = $video_bg_parallax = $css_animation = $disable_element = $output = $after_output = $section_inner_class = $section_wrapper_class = $col_h_align = $col_v_align = $css = $full_width_row = $vertical_cols = $bg_color = $bg_image = $bg_image_h_position = $bg_image_v_position = '';
$atts = vc_map_get_attributes( $this->getShortcode(), $atts );
extract( $atts );

//wp_enqueue_script( 'wpb_composer_front_js' );

$el_class = $this->getExtraClass( $el_class ) . $this->getCSSAnimation( $css_animation );

$css_classes = array(
	'section-wrapper',
	$el_class,
	vc_shortcode_custom_css_class( $css ),
);

$section_inner_classes = array(
	'section-inner',
	$section_inner_class,
	$bg_color
);
$container_classes = array();
$row_classes = array(
	'row',
	$section_wrapper_class,
	$col_h_align,
	$col_v_align
);

if ( 'yes' === $disable_element ) {
	if ( vc_is_page_editable() ) {
		$css_classes[] = 'd-none';
	}
}

if ( $full_width_row === 'yes' ) {
	$container_classes[] = 'container-fluid';
} else {
	$container_classes[] = 'container';
}

if ( $vertical_cols === 'yes' ) {
	$row_classes[] = 'flex-column';
}

if ( vc_shortcode_custom_css_has_property( $css, array(
		'border',
		'background',
	) ) || $video_bg || $parallax
) {
	$css_classes[] = 'vc_row-has-fill';
}

$wrapper_attributes = array();
// build attributes for wrapper
if ( ! empty( $el_id ) ) {
	$wrapper_attributes[] = 'id="' . esc_attr( $el_id ) . '"';
}

if(!empty($bg_image)){
	$img_meta = wp_get_attachment_metadata($bg_image);
	$img_sizes = '';
	$sizes = array('thumbnail', 'medium_sm', 'medium', 'medium_lg', 'large', 'large_lg' );
	foreach ($sizes as $size) {
		$img_url = wp_get_attachment_image_src( $bg_image, $size );
		$img_size = $img_meta['sizes'][$size]['width'];
		$img_sizes .= $img_url[0] . ' ' . $img_size . 'w, ';
	}
	$img_sizes .= wp_get_attachment_image_url($bg_image, 'full') . ' ' . $img_meta['width'] . 'w, ';
	$css_classes[] = 'lazyload';
	$css_classes[] = 'bg-image';
	$wrapper_attributes[] = 'data-sizes="auto"';
	$wrapper_attributes[] = 'data-bgset="' . rtrim($img_sizes) . '"';
}

$has_video_bg = ( ! empty( $video_bg ) && ! empty( $video_bg_url ) && vc_extract_youtube_id( $video_bg_url ) );

$parallax_speed = $parallax_speed_bg;
if ( $has_video_bg ) {
	$parallax = $video_bg_parallax;
	$parallax_speed = $parallax_speed_video;
	$parallax_image = $video_bg_url;
	$css_classes[] = 'vc_video-bg-container';
	wp_enqueue_script( 'vc_youtube_iframe_api_js' );
}

if ( ! empty( $parallax ) ) {
	wp_enqueue_script( 'vc_jquery_skrollr_js' );
	$wrapper_attributes[] = 'data-vc-parallax="' . esc_attr( $parallax_speed ) . '"'; // parallax speed
	$css_classes[] = 'vc_general vc_parallax vc_parallax-' . $parallax;
	if ( false !== strpos( $parallax, 'fade' ) ) {
		$css_classes[] = 'js-vc_parallax-o-fade';
		$wrapper_attributes[] = 'data-vc-parallax-o-fade="on"';
	} elseif ( false !== strpos( $parallax, 'fixed' ) ) {
		$css_classes[] = 'js-vc_parallax-o-fixed';
	}
}

if ( ! empty( $parallax_image ) ) {
	if ( $has_video_bg ) {
		$parallax_image_src = $parallax_image;
	} else {
		$parallax_image_id = preg_replace( '/[^\d]/', '', $parallax_image );
		$parallax_image_src = wp_get_attachment_image_src( $parallax_image_id, 'full' );
		if ( ! empty( $parallax_image_src[0] ) ) {
			$parallax_image_src = $parallax_image_src[0];
		}
	}
	$wrapper_attributes[] = 'data-vc-parallax-image="' . esc_attr( $parallax_image_src ) . '"';
}
if ( ! $parallax && $has_video_bg ) {
	$wrapper_attributes[] = 'data-vc-video-bg="' . esc_attr( $video_bg_url ) . '"';
}
$css_class = maatGenerateVCClasses($css_classes, $this->settings['base'], $atts);
$section_inner_classes = maatGenerateVCClasses($section_inner_classes, $this->settings['base'], $atts);
$container_classes = maatGenerateVCClasses($container_classes, $this->settings['base'], $atts);
$row_classes = maatGenerateVCClasses($row_classes, $this->settings['base'], $atts);
$wrapper_attributes[] = $css_class;

$output .= "<section " . implode( " ", $wrapper_attributes ) . ">";
$output .= "\n\t<div" . $section_inner_classes  . ">";
$output .= "\n\t\t<div" . $container_classes  . ">";
$output .= "\n\t\t\t<div" . $row_classes  . ">";
$output .= "\n\t\t\t\t" . wpb_js_remove_wpautop( $content );
$output .= "\n\t\t\t</div><!-- end .row -->";
$output .= "\n\t\t</div><!-- end .container-->";
$output .= "\n\t</div><!-- end .section-inner -->";
$output .= "</section><!-- end .section -->";
$output .= $after_output;

echo $output;
