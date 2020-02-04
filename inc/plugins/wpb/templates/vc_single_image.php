<?php
if (!defined('ABSPATH')) {
	die('-1');
}

/**
 * Shortcode attributes
 * @var $atts
 * @var $title
 * @var $source
 * @var $image
 * @var $custom_src
 * @var $onclick
 * @var $img_size
 * @var $external_img_size
 * @var $caption
 * @var $img_link_large
 * @var $link
 * @var $img_link_target
 * @var $alignment
 * @var $el_class
 * @var $el_id
 * @var $css_animation
 * @var $style
 * @var $external_style
 * @var $border_color
 * @var $css
 * Shortcode class
 * @var $this WPBakeryShortCode_VC_Single_image
 */
$title = $source = $image = $custom_src = $onclick = $img_size = $external_img_size =
	$caption = $img_link_large = $link = $img_link_target = $alignment = $el_class = $el_id = $css_animation = $style = $external_style = $border_color = $meta = $add_caption = $data_srcset = $css = '';

$default_src = vc_asset_url('vc/no_image.png');


$atts = vc_map_get_attributes($this->getShortcode(), $atts);
extract($atts);

$mime = get_post_mime_type($image);

$el_class = $this->getExtraClass($el_class);

$parent_class = 'single_image-wrapper';
$child_class = 'single_image';

$wrapper_classes = array(
	$el_class,
	$parent_class,
	'wpb_single_image',
	'content-item',
	'vc_align_' . $alignment,
	$this->getCSSAnimation($css_animation),
	vc_shortcode_custom_css_class($css, ' '),
	$this->getExtraClass($el_class)
);

$inner_classes = array(
	$child_class,
	'img-fluid',
);
$link_classes = array(
	'single_image',
	$style,
	$border_color
);
// backward compatibility. since 4.6
if (empty($onclick) && isset($img_link_large) && 'yes' === $img_link_large) {
	$onclick = 'img_link_large';
} elseif (empty($atts['onclick']) && (!isset($atts['img_link_large']) || 'yes' !== $atts['img_link_large'])) {
	$onclick = 'custom_link';
}

if ('external_link' === $source) {
	$style = $external_style;
	$border_color = $external_border_color;
}



$border_color = ('' !== $border_color) ? ' vc_box_border_' . $border_color : '';

$img = false;

if ($mime === 'image/svg+xml') {
	$inner_classes[] = 'style-svg';
	$inner_classes[] = 'w-100';
} else {
	$inner_classes[] = 'lazyload';
}


$img_attr = array(
	'class' => implode(' ', $inner_classes)
);


switch ($source) {
	case 'media_library':
	case 'featured_image':

		if (!$img_size) {
			$img_size = 'full';
		}

		if ('featured_image' === $source) {
			$post_id = get_the_ID();
			if ($post_id && has_post_thumbnail($post_id)) {
				$img_id               = get_post_thumbnail_id($post_id);
				$img_attr['itemprop'] = 'contentUrl';
				$img_attr['title']    = get_the_title($post_id);
				$img_attr['alt']      = get_the_title($post_id);
			} else {
				$img_id = 0;
			}
		} else {
			$img_id = preg_replace('/[^\d]/', '', $image);
		}

		$meta = wp_get_attachment_metadata($img_id);

		$img_title = get_the_title($img_id);
		$img_alt = get_post_meta($img_id, '_wp_attachment_image_alt', TRUE);

		if ('featured_image' === $source) {
			$img_attr['title']    = !empty($img_title) ? $img_title : get_the_title($post_id);
			$img_attr['alt']      = !empty($img_alt) ? $img_alt : get_the_title($post_id);
		} else {
			if (!empty($img_title)) {
				$img_attr['title'] = $img_title;
			}
			if (!empty($img_alt)) {
				$img_attr['alt'] = $img_alt;
			}
		}

		if ($mime !== 'image/svg+xml') {

			$sizes = array('thumbnail', 'medium_sm', 'medium', 'medium_lg', 'large', 'large_lg');
			foreach ($sizes as $size) {
				$img_url = wp_get_attachment_image_src($img_id, $size);
				$img_sizes = $meta['sizes'][$size]['width'];
				$data_srcset .= $img_url[0] . ' ' . $img_sizes . 'w, ';
			}
			$data_srcset .= wp_get_attachment_image_url($img_id, 'full') . ' ' . $meta['width'] . 'w, ';
			$data_src = vc_get_image_by_size($img_id, $img_size);
			$img_attr['data-srcset'] = $data_srcset;
			$img_attr['data-sizes'] = 'auto';
			$img_attr['data-src'] = $data_src[0];
			if (is_string($img_size) && in_array($img_size, $sizes)) {
				$img_attr['data-src'] = $data_src[0];
			} else {
				$img_attr['data-src'] = $data_src;
			}
		} else {
			$img_attr['src'] = wp_get_attachment_image_url($img_id, 'full');
		}

		// set rectangular
		if (preg_match('/_circle_2$/', $style)) {
			$style = preg_replace('/_circle_2$/', '_circle', $style);
			$img_size = $this->getImageSquareSize($img_id, $img_size);
		}



		$img = array(
			'thumbnail' => '<img ' . vc_stringify_attributes($img_attr) . '/>'
		);

		// don't show placeholder in public version if post doesn't have featured image
		if ('featured_image' === $source) {
			if (!$img && 'page' === vc_manager()->mode()) {
				return;
			}
		}

		break;

	case 'external_link':
		$dimensions = vcExtractDimensions($external_img_size);
		$hwstring = $dimensions ? image_hwstring($dimensions[0], $dimensions[1]) : '';

		$custom_src = $custom_src ? esc_attr($custom_src) : $default_src;

		$img = array(
			'thumbnail' => '<img class="' . implode(' ', $inner_classes) . '" ' . $hwstring . ' data-src="' . $custom_src . '" />',
		);
		break;

	default:
		$img = false;
}

if (!$img) {
	$img['thumbnail'] = '<img class="vc_img-placeholder ' . implode(' ', $inner_classes) . '" data-src="' . $default_src . '" />';
}

if (in_array($source, array('media_library', 'featured_image')) && 'yes' === $add_caption) {
	$img_id = apply_filters('wpml_object_id', $img_id, 'attachment');
	$post = get_post($img_id);
	$caption = $post->post_excerpt;
} else {
	if ('external_link' === $source) {
		$add_caption = 'yes';
	}
}

if ($add_caption === 'yes' && !empty($caption)) {
	$show_caption = true;
} else {
	$show_caption = false;
}

// backward compatibility
if (vc_has_class('fancybox', $el_class)) {
	$onclick = 'link_image';
}

// backward compatibility. will be removed in 4.7+
if (!empty($atts['img_link'])) {
	$link = $atts['img_link'];
	if (!preg_match('/^(https?\:\/\/|\/\/)/', $link)) {
		$link = 'http://' . $link;
	}
}

// backward compatibility
if (in_array($link, array('none', 'link_no'))) {
	$link = '';
}

$a_attrs = array();

switch ($onclick) {
	case 'img_link_large':

		if ('external_link' === $source) {
			$link = $custom_src;
		} else {
			$link = wp_get_attachment_image_src($img_id, 'full');
			$link = $link[0];
		}

		break;

	case 'link_image':

		$a_attrs['class'] = 'fancybox';
		$a_attrs['data-srcset'] = $data_srcset;
		if ($show_caption) {
			$a_attrs['data-caption'] = esc_html($caption);
		}

		// backward compatibility
		if (vc_has_class('fancybox', $el_class)) {
			// $link is already defined
		} elseif ('external_link' === $source) {
			$link = $custom_src;
		} else {
			$link = wp_get_attachment_image_src($img_id, 'full');
			$link = $link[0];
		}

		break;

	case 'custom_link':
		// $link is already defined
		break;

	case 'zoom':
		wp_enqueue_script('vc_image_zoom');

		if ('external_link' === $source) {
			$large_img_src = $custom_src;
		} else {
			$large_img_src = wp_get_attachment_image_src($img_id, 'full');
			if ($large_img_src) {
				$large_img_src = $large_img_src[0];
			}
		}

		$img['thumbnail'] = str_replace('<img ', '<img data-vc-zoom="' . $large_img_src . '" ', $img['thumbnail']);

		break;
}

// backward compatibility
if (vc_has_class('fancybox', $el_class)) {
	$el_class = vc_remove_class('fancybox', $el_class);
}


if ($link) {
	$a_attrs['href'] = $link;
	$a_attrs['target'] = $img_link_target;
	if (!empty($a_attrs['class'])) {
		$link_classes[] = $a_attrs['class'];
		$link_classes[] = 'single_image-link';
		unset($a_attrs['class']);
	}
	$html = '<a ' . vc_stringify_attributes($a_attrs) . ' class="' . implode(' ', $link_classes) . '">';
} else {
	$html = '<div class="' . implode(' ', $link_classes) . '">';
}


$html .= $img['thumbnail'];

if ('featured_image' === $source) {
	$post_id = get_the_ID();
	if ($post_id && has_post_thumbnail($post_id)) {
		$html .= '<meta itemprop="url" content="' . get_the_post_thumbnail_url($post_id, 'full') . '">';
		$html .= '<meta itemprop="width" content="' . $meta['sizes']['thumbnail']['width'] . '">';
		$html .= '<meta itemprop="height" content="' . $meta['sizes']['thumbnail']['height'] . '">';
		$html .= '<meta itemprop="thumbnail" content="' . get_the_post_thumbnail_url($post_id) . '">';
	}
}


$html .= ($link) ? '</a>' : '</div>';



if ('yes' === $add_caption && '' !== $caption) {
	$html .= '<figcaption class="figure-caption">' . esc_html($caption) . '</figcaption>';
}

if (!empty($el_id)) {
	$wrapper_attributes[] = 'id="' . esc_attr($el_id) . '"';
	$end_comment = '<!-- end #' . esc_attr($el_id) . '.' . $parent_class . '-->';
} else {
	$end_comment = '<!-- end .' . $parent_class . '-->';
}


$wrapper_class = maatGenerateVCClasses($wrapper_classes, $this->settings['base'], $atts);
$inner_classes = maatGenerateVCClasses($inner_classes, $this->settings['base'], $atts);
$wrapper_attributes[] = $wrapper_class;

$output .= "\n" . '<div ' . implode(' ', $wrapper_attributes) . '>';
$output .= "\n\t" . wpb_widget_title(array('title' => $title, 'extraclass' => 'wpb_singleimage_heading'));
$output .= "\n\t" . '<figure class="wpb_wrapper figure">';
$output .= "\n\t\t" . $html;
$output .= "\n\t" . '</figure><!-- end .' . $child_class . '-->';
$output .= "\n" . '</div>' . $end_comment;

echo $output;
