<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package Maat
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function maat_body_classes( $classes ) {
	global $wp_query;
	$post_id =  get_the_ID();
	$post_object = get_post($post_id);
	$classes[] = $post_object->post_type;
	$classes[] = $post_object->post_name;
	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}

	// Adds a class of no-sidebar when there is no sidebar present.
	if ( ! is_active_sidebar( 'sidebar-1' ) ) {
		$classes[] = 'no-sidebar';
	}

	return $classes;
}
add_filter( 'body_class', 'maat_body_classes' );

/**
 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
 */
function maat_pingback_header() {
	if ( is_singular() && pings_open() ) {
		printf( '<link rel="pingback" href="%s">', esc_url( get_bloginfo( 'pingback_url' ) ) );
	}
}
add_action( 'wp_head', 'maat_pingback_header' );

function theme_logo($class = ''){
    $custom_logo_id = get_theme_mod('custom_logo');
    if(!empty($custom_logo_id)):
        $classes = array('site-title', 'text-hide', 'logo');
		if(!empty($class)){
			$custom_classes = explode(' ',$class);
			foreach ($custom_classes as $custom_class) {
				array_push($classes, $custom_class);
			}
		}
		$classes = maat_add_item_classes($classes);
        $image = wp_get_attachment_image_src($custom_logo_id, 'full');
        $logo_url = $image[0];
        $styles = maat_add_item_styles(array(
			'background-image' => $logo_url,
			'background-position' => 'center center',
			'background-repeat' => 'no-repeat',
			'background-size' => 'contain'
		));
        $wrapper = $classes . $styles;
?>
<h1 <?php echo $wrapper; ?>><a href="<?php echo esc_url(home_url('/')); ?>" rel="home" title="<?php bloginfo('name'); ?>" class="stretched-link"><?php bloginfo('name'); ?></a></h1>
<?php
endif;
}
