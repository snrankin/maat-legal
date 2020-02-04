<?php
if (!defined('ABSPATH')) {
	die('-1');
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

$el_id = $el_class = $inner_class = $full_height = $full_width_row = $no_gaps = $vertical_cols = $col_h_align = $col_v_align = $bg_color = $bg_image = $bg_image_h_position = $bg_image_v_position = $parallax = $parallax_speed_bg = $parallax_speed_video = $video_bg = $video_bg_url = $video_bg_parallax = $css_animation = $disable_element = $output = $end_comment = '';

$atts = vc_map_get_attributes($this->getShortcode(), $atts);
extract($atts);

$el_class = $this->getExtraClass($el_class) . $this->getCSSAnimation($css_animation);

$parent_class = 'container';
$child_class = 'row';

$wrapper_classes = array(
	$el_class
);
$inner_classes = array(
	$child_class,
	$inner_class,
	$bg_color,
	$col_h_align,
	$col_v_align
);

if ('yes' === $disable_element) {
	$wrapper_classes[] = 'd-none';
}

if ('yes' === $full_height) {
	$wrapper_classes[] = 'section-full-height';
}

if ('yes' === $no_gaps) {
	$inner_classes[] = 'no-gutters';
}

if ($full_width_row === 'yes') {
	$wrapper_classes[] = 'container-fluid';
} else {
	$wrapper_classes[] = $parent_class;
}

if ($vertical_cols === 'yes') {
	$inner_classes[] = 'flex-column';
	$inner_classes[] = 'flex-nowrap';
}

$wrapper_attributes = array();
// build attributes for wrapper
if (!empty($el_id)) {
	$wrapper_attributes[] = 'id="' . esc_attr($el_id) . '"';
	$end_comment = '<!-- end #' . esc_attr($el_id) . '.' . $parent_class . '-->';
} else {
	$end_comment = '<!-- end .' . $parent_class . '-->';
}

if (!empty($bg_image)) {
	$img_meta = wp_get_attachment_metadata($bg_image);
	$img_sizes = '';
	$sizes = array('thumbnail', 'medium_sm', 'medium', 'medium_lg', 'large', 'large_lg');
	foreach ($sizes as $size) {
		$img_url = wp_get_attachment_image_src($bg_image, $size);
		$img_size = $img_meta['sizes'][$size]['width'];
		$img_sizes .= $img_url[0] . ' ' . $img_size . 'w, ';
	}
	$img_sizes .= wp_get_attachment_image_url($bg_image, 'full') . ' ' . $img_meta['width'] . 'w, ';
	$wrapper_classes[] = 'lazyload';
	$wrapper_classes[] = 'bg-image';
	$wrapper_attributes[] = 'data-sizes="auto"';
	$wrapper_attributes[] = 'data-bgset="' . rtrim($img_sizes) . '"';
}

$parallax_speed = $parallax_speed_bg;

if (!empty($parallax)) {
	wp_enqueue_script('vc_jquery_skrollr_js');
	$wrapper_attributes[] = 'data-vc-parallax="' . esc_attr($parallax_speed) . '"'; // parallax speed
	$wrapper_classes[] = 'vc_general vc_parallax vc_parallax-' . $parallax;
	$wrapper_attributes[] = 'data-vc-parallax-image="' . wp_get_attachment_image_url($bg_image, 'full') . '"';
	if (false !== strpos($parallax, 'fade')) {
		$wrapper_classes[] = 'js-vc_parallax-o-fade';
		$wrapper_attributes[] = 'data-vc-parallax-o-fade="on"';
	} elseif (false !== strpos($parallax, 'fixed')) {
		$wrapper_classes[] = 'js-vc_parallax-o-fixed';
	}
}
$has_video_bg = (!empty($video_bg) && !empty($video_bg_url) && vc_extract_youtube_id($video_bg_url));
if ($has_video_bg) {
	$parallax = $video_bg_parallax;
	$parallax_speed = $parallax_speed_video;
	$parallax_image = $video_bg_url;
	$wrapper_classes[] = 'vc_video-bg-container';
	wp_enqueue_script('vc_youtube_iframe_api_js');
}
if (!$parallax && $has_video_bg) {
	$wrapper_attributes[] = 'data-vc-video-bg="' . esc_attr($video_bg_url) . '"';
}
$wrapper_class = maatGenerateVCClasses($wrapper_classes, $this->settings['base'], $atts);
$inner_classes = maatGenerateVCClasses($inner_classes, $this->settings['base'], $atts);
$wrapper_attributes[] = $wrapper_class;

$output .= "\n" . '<div ' . implode(' ', $wrapper_attributes) . '>';
$output .= "\n\t" . '<div' . $inner_classes . '>';
$output .= "\n\t\t" . wpb_js_remove_wpautop($content);
$output .= "\n\t" . '</div><!-- end .' . $child_class . '-->';
$output .= "\n" . '</div>' . $end_comment;

echo $output;
