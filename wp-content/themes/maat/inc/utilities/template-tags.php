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

if (!function_exists('maat_post_thumbnail')) :
	/**
	 * Displays an optional post thumbnail.
	 *
	 * Wraps the post thumbnail in an anchor element on index views, or a div
	 * element when on single views.
	 */
	function maat_post_thumbnail($class = '', $link = 0)
	{
		if (post_password_required() || is_attachment() || !has_post_thumbnail()) {
			return;
		}
		$image_id = get_post_thumbnail_id();
		$image_meta = wp_get_attachment_metadata($image_id);
		$image_width = $image_meta['width'];
		$image_height = $image_meta['height'];
		$wrapper_classes = 'image-wrapper embed-responsive';
		$wrapper_classes .= (!empty($class)) ? ' ' . $class : '';
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

		if ($link == 1) { ?>
<a href="<?php the_permalink(); ?>" aria-hidden="true" tabindex="-1" class="<?php echo $wrapper_classes; ?>" itemprop="image" itemscope itemtype="http://schema.org/ImageObject" data-responsive-background-image>
    <?php 
} else { ?>
    <div class="<?php echo $wrapper_classes; ?>" itemprop="image" itemscope itemtype="http://schema.org/ImageObject" data-responsive-background-image>
        <?php 
	} ?>
        <?php the_post_thumbnail('full', $attr); ?>
        <meta itemprop="url" content="<?php echo get_the_post_thumbnail_url('full'); ?>">';
        <meta itemprop="width" content="<?php echo $image_width; ?>">
        <meta itemprop="height" content="<?php echo $image_height; ?>">
        <meta itemprop="thumbnail" content="<?php echo get_the_post_thumbnail_url(); ?>">
        <?php if ($link == 1) { ?>
</a><!-- .post-thumbnail -->
<?php 
} else { ?>
</div><!-- .post-thumbnail -->
<?php 
}
}
endif;

if (!function_exists('maat_pagination')) :
	/**
	 * Displays an optional post thumbnail.
	 *
	 * Wraps the post thumbnail in an anchor element on index views, or a div
	 * element when on single views.
	 */
	function maat_pagination($pages = '', $range = 1)
	{
		$post_type = get_post_type();
		if ($post_type !== 'post') {
			$item = $post_type;
		} else {
			$item = 'blog';
		}
		$showitems = ($range * 2) + 1;

		global $paged;
		if (empty($paged)) $paged = 1;

		if ($pages == '') {
			global $wp_query;
			$pages = $wp_query->max_num_pages;
			if (!$pages) {
				$pages = 1;
			}
		}
		$page_nav = '';
		if ($pages != 1) :  ob_start(); ?>
<div class="maat-pagination-wrapper">
    <nav aria-label="<?php echo ucfirst($item); ?> Navigation" class="maat-pagination">
        <ul class="pagination">
            <?php
					// If there are more than 2 pages show first page link
			if ($paged > 2 && $paged > $range + 1 && $showitems < $pages) { ?>
            <li class="page-item">
                <a href="<?php echo get_pagenum_link(1); ?>" class="page-link" aria-label="First Page">
                    <span aria-hidden="true">&laquo;</span> <span class="sr-only">First Page</span>
                </a>
            </li>
            <?php 
		} ?>
            <?php
					// if there is more than one page
			if ($paged > 1 && $showitems < $pages) { ?>
            <li class="page-item">
                <a href="<?php echo get_pagenum_link($paged - 1); ?>" class="page-link" aria-label="Previous Page">
                    <span aria-hidden="true">&lsaquo;</span> <span class="sr-only">Previous Page</span>
                </a>
            </li>
            <?php for ($i = 1; $i <= $pages; $i++) { ?>
            <?php if (1 != $pages && (!($i >= $paged + $range + 1 || $i <= $paged - $range - 1) || $pages <= $showitems)) { ?>
            <?php if ($paged == $i) { ?>
            <li class="page-item active" aria-current="page">
                <a class="page-link" href="#" aria-label="Current Page">
                    <?php echo $i; ?> <span class="sr-only">Current Page</span>
                </a>
            </li>
            <?php 
		} else { ?>
            <li class="page-item">
                <a href="<?php echo get_pagenum_link($i); ?>" class="page-link">
                    <span class="sr-only">Page </><?php echo $i; ?>
                </a>
            </li>
            <?php 
		} ?>
            <?php 
		} ?>
            <?php 
		} ?>
            <li class="page-item">
                <a href="<?php echo get_pagenum_link($paged + 1); ?>" class="page-link" aria-label="Next Page">
                    <span aria-hidden="true">&rsaquo;</span> <span class="sr-only">Next Page</span>
                </a>
            </li>
            <?php 
		} ?>
            <?php
					// If there are more than 2 pages show last page link
			if ($paged > 2 && $paged > $range + 1 && $showitems < $pages) { ?>
            <li class="page-item">
                <a href="<?php echo get_pagenum_link($pages); ?>" class="page-link" aria-label="Last Page">
                    <span aria-hidden="true">&raquo;</span> <span class="sr-only">Last Page</span>
                </a>
            </li>
            <?php 
		} ?>
        </ul>
    </nav>
</div>
<?php
$page_nav = ob_get_clean();
endif;
return $page_nav;
}
endif;
