<?php
/**
 * Custom template tags for this theme
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package Maat
 */

if (!function_exists('maat_posted_on')) :
	/**
	 * Prints HTML with meta information for the current post-date/time.
	 */
	function maat_posted_on()
	{
		$time_string = '<time class="entry-date published updated" datetime="%1$s">%2$s</time>';
		if (get_the_time('U') !== get_the_modified_time('U')) {
			$time_string = '<time class="entry-date published" datetime="%1$s">%2$s</time><time class="updated" datetime="%3$s">%4$s</time>';
		}

		$time_string = sprintf(
			$time_string,
			esc_attr(get_the_date(DATE_W3C)),
			esc_html(get_the_date()),
			esc_attr(get_the_modified_date(DATE_W3C)),
			esc_html(get_the_modified_date())
		);

		$posted_on = sprintf(
			/* translators: %s: post date. */
			esc_html_x('Posted on %s', 'post date', 'maat'),
			'<a href="' . esc_url(get_permalink()) . '" rel="bookmark">' . $time_string . '</a>'
		);

		echo '<span class="posted-on">' . $posted_on . '</span>'; // WPCS: XSS OK.
	}
endif;

if (!function_exists('maat_posted_by')) :
	/**
	 * Prints HTML with meta information for the current author.
	 */
	function maat_posted_by()
	{
		$byline = sprintf(
			/* translators: %s: post author. */
			esc_html_x('by %s', 'post author', 'maat'),
			'<span class="author vcard"><a class="url fn n" href="' . esc_url(get_author_posts_url(get_the_author_meta('ID'))) . '">' . esc_html(get_the_author()) . '</a></span>'
		);

		echo '<span class="byline"> ' . $byline . '</span>'; // WPCS: XSS OK.
	}
endif;

if (!function_exists('maat_entry_footer')) :
	/**
	 * Prints HTML with meta information for the categories, tags and comments.
	 */
	function maat_entry_footer()
	{
		// Hide category and tag text for pages.
		if ('post' === get_post_type()) {
			/* translators: used between list items, there is a space after the comma */
			$categories_list = get_the_category_list(esc_html__(', ', 'maat'));
			if ($categories_list) {
				/* translators: 1: list of categories. */
				printf('<span class="cat-links">' . esc_html__('Posted in %1$s', 'maat') . '</span>', $categories_list); // WPCS: XSS OK.
			}

			/* translators: used between list items, there is a space after the comma */
			$tags_list = get_the_tag_list('', esc_html_x(', ', 'list item separator', 'maat'));
			if ($tags_list) {
				/* translators: 1: list of tags. */
				printf('<span class="tags-links">' . esc_html__('Tagged %1$s', 'maat') . '</span>', $tags_list); // WPCS: XSS OK.
			}
		}

		if (!is_single() && !post_password_required() && (comments_open() || get_comments_number())) {
			echo '<span class="comments-link">';
			comments_popup_link(
				sprintf(
					wp_kses(
						/* translators: %s: post title */
						__('Leave a Comment<span class="screen-reader-text"> on %s</span>', 'maat'),
						array(
							'span' => array(
								'class' => array(),
							),
						)
					),
					get_the_title()
				)
			);
			echo '</span>';
		}

		edit_post_link(
			sprintf(
				wp_kses(
					/* translators: %s: Name of current post. Only visible to screen readers */
					__('Edit <span class="screen-reader-text">%s</span>', 'maat'),
					array(
						'span' => array(
							'class' => array(),
						),
					)
				),
				get_the_title()
			),
			'<span class="edit-link">',
			'</span>'
		);
	}
endif;

if (!function_exists('maat_post_thumbnail')) {
	/**
	 * Displays an optional post thumbnail.
	 *
	 * Wraps the post thumbnail in an anchor element on index views, or a div
	 * element when on single views.
	 * @var array $args
	 * @param mixed $id <ID of the post to get the featured image from, defaults to get_the_ID();>
	 * @param string $class <Extra classes to add>
	 * @param integer $link <True or false on whether or not to add a link wrapper>
	 * @param string $ratio <Ratio of the image. Defaults to 1by1 or a square image>
	 * @param integer $echo <True or false, Defualts to false>
	 *
	 * @return string
	 */
	function maat_post_thumbnail($args = array())
	{
		$defaults = array(
			'id' => get_the_ID(),
			'class' => '',
			'link' => 0,
			'ratio' => '1by1',
			'echo' => 0
		);
		$args = wp_parse_args($args, $defaults);
		if (post_password_required() || is_attachment() || !has_post_thumbnail($args['id'])) {
			return;
		}
		$image_id = get_post_thumbnail_id($args['id']);
		$image_meta = wp_get_attachment_metadata($image_id);
		$image_width = $image_meta['width'];
		$image_height = $image_meta['height'];
		$wrapper_classes = array(
			'image-wrapper',
			'embed-responsive',
			'embed-responsive-' . $args['ratio'],
			$args['class']
		);
		$attr = array(
			'itemprop' => 'contentUrl',
			'title' => the_title_attribute(array(
				'echo' => false,
			)),
			'alt' => the_title_attribute(array(
				'echo' => false,
			)),
			'class' => 'embed-responsive-item invisible'
		);

		$tag = ($args['link'] == 1) ? 'a' : 'div';
		$output = '<' . $tag;
		$output .= ($args['link'] == 1) ? ' href="' . get_the_permalink() . '" aria-hidden="true" tabindex="-1"' : '';
		$output .= ' ' . maat_add_item_classes($wrapper_classes);
		$output .= ' itemprop="image" itemscope itemtype="http://schema.org/ImageObject" data-responsive-background-image>';
		$output .= get_the_post_thumbnail($args['id'], 'full', $attr);
		$output .= '<meta itemprop="url" content="' . get_the_post_thumbnail_url($args['id'], 'full') . '">';
		$output .= '<meta itemprop="width" content="' . $image_width . '">';
		$output .= '<meta itemprop="height" content="' . $image_height . '">';
		$output .= '<meta itemprop="thumbnail" content="' . get_the_post_thumbnail_url($args['id'], 'thumbnail') . '">';
		$output .= '</' . $tag . '><!-- .post-thumbnail -->';

		if ($args['echo'] == 1) {
			echo $output;
		} else {
			return $output;
		}
	}
}

/**
 * Archive Navigation Link
 *
 * @author Bill Erickson
 * @see https://www.billerickson.net/custom-pagination-links/
 *
 * @param int $page
 * @param string $class
 * @param string $label
 * @return string $link
 */
function maat_archive_navigation_link($page = false, $class = '', $label = '')
{

	if (!$page)
		return;

	$classes = array('page-link');
	if (!empty($class))
		$classes[] = $class;
	$classes = array_map('sanitize_html_class', $classes);

	$label = $label ? $label : $page;
	$link = esc_url_raw(get_pagenum_link($page));

	return '<li class="page-item"><a class="' . join(' ', $classes) . '" href="' . $link . '">' . $label . '</a></li>';
}

/**
 * Archive Navigation
 *
 * @author Bill Erickson
 * @see https://www.billerickson.net/custom-pagination-links/
 *
 */
function maat_pagination()
{

	$settings = array(
		'count' => 7,
		'prev_text' => '<span aria-hidden="true">&lsaquo;</span> <span class="sr-only">Previous Page</span>',
		'next_text' => '<span aria-hidden="true">&rsaquo;</span> <span class="sr-only">Next Page</span>',
	);

	global $wp_query;
	$current = max(1, get_query_var('paged'));
	$total = $wp_query->max_num_pages;
	$links = array();

	// Offset for next link
	if ($current < $total)
		$settings['count']--;

	// Previous
	if ($current > 1) {
		$settings['count']--;
		$links[] = maat_archive_navigation_link($current - 1, 'prev', $settings['prev_text']);
	}

	// Current
	$links[] = maat_archive_navigation_link($current, 'current');

	// Next Pages
	for ($i = 1; $i < $settings['count']; $i++) {
		$page = $current + $i;
		if ($page <= $total) {
			$links[] = maat_archive_navigation_link($page);
		}
	}

	// Next
	if ($current < $total) {
		$links[] = maat_archive_navigation_link($current + 1, 'next', $settings['next_text']);
	}

	$output = '';


	$output .= '<nav class="navigation posts-navigation" role="navigation">';
	$output .= '<ul class="pagination">' . join('', $links) . '</ul>';
	$output .= '</nav>';

	return $output;
}
