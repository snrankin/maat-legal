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
$el_id = $el_class = $inner_class = $full_height = $collapsible = $content_placement = $no_padding = $bg_color = $bg_image = $bg_image_h_position = $bg_image_v_position = $parallax = $parallax_speed_bg = $parallax_speed_video = $video_bg = $video_bg_url = $video_bg_parallax = $css_animation = $disable_element = $output = $end_comment = '';


$atts = vc_map_get_attributes($this->getShortcode(), $atts);
extract($atts);

$el_class = $this->getExtraClass($el_class) . $this->getCSSAnimation($css_animation);

$parent_class = 'section-wrapper';
$child_class = 'section-inner';

$wrapper_classes = array(
	$parent_class,
	$el_class,
);

$inner_classes = array(
	$child_class,
	$inner_class,
	$content_placement,
	$bg_color
);

if ('yes' === $disable_element) {
	$wrapper_classes[] = 'd-none';
}

if ('yes' === $collapsible) {
	$wrapper_classes[] = 'collapse';
}

if ('yes' === $full_height) {
	$wrapper_classes[] = 'section-full-height';
}

if ('yes' === $no_padding) {
	$inner_classes[] = 'p-0';
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
	$wrapper_classes[] = 'bg-image-x' . $bg_image_h_position . '-y' . $bg_image_v_position;
	$wrapper_attributes[] = 'data-sizes="auto"';
	$wrapper_attributes[] = 'data-bgset="' . rtrim($img_sizes) . '"';
}
$has_video_bg = (!empty($video_bg) && !empty($video_bg_url) && vc_extract_youtube_id($video_bg_url));
$parallax_speed = $parallax_speed_bg;
if ($has_video_bg) {
	$parallax = $video_bg_parallax;
	$parallax_speed = $parallax_speed_video;
	$parallax_image = $video_bg_url;
	$wrapper_classes[] = 'vc_video-bg-container';
	wp_enqueue_script('vc_youtube_iframe_api_js');
}

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
if (!$parallax && $has_video_bg) {
	$wrapper_attributes[] = 'data-vc-video-bg="' . esc_attr($video_bg_url) . '"';
}

$wrapper_classes = maatGenerateVCClasses($wrapper_classes, $this->settings['base'], $atts);
$inner_classes = maatGenerateVCClasses($inner_classes, $this->settings['base'], $atts);
$wrapper_attributes[] = $wrapper_classes;

$output .= "\n" . '<section ' . implode(' ', $wrapper_attributes) . '>';
$output .= "\n\t" . '<div' . $inner_classes . '>';
$output .= "\n\t\t" . wpb_js_remove_wpautop($content);
$output .= "\n\t" . '</div><!-- end .' . $child_class . '-->';
$output .= "\n" . '</section>' . $end_comment;

echo $output;
