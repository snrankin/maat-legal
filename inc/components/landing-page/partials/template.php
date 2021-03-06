<?php
/** ===========================================================================
 * @package maat
 * @created 3-12-19
 * @author Sam Rankin sam@maatlegal.com>
 * @copyright 2019 Maat Legal
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 * -----
 * Last Modified: 3-21-19 at 1:40 pm
 * Modified By: Sam Rankin <sam@maatlegal.com>
 * -----
 * Template part for displaying page content in landing-page.php
 * @return mixed
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
* ========================================================================= */

// Variables

?>
<?php

/* Start the Loop */
while (have_posts()) :
    the_post(); ?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <div class="entry-content">
        <div class="container-wrapper">
            <div class="container-wrapper-inner">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-lg-9">
                            <div class="content-wrapper align-items-center justify-content-center full-height-section">
                                <?php the_content(); ?>
                                <?php
                                    wp_link_pages(array(
                                        'before' => '<div class="page-links">' . __('Pages:', 'maat'),
                                        'after'  => '</div>',
                                    ));
                                ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div><!-- .entry-content -->

    <?php if (get_edit_post_link()) : ?>
    <footer class="entry-footer">
        <?php
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
        ?>
    </footer><!-- .entry-footer -->
    <?php endif; ?>
</article><!-- #post-<?php the_ID(); ?> -->
<?php if (comments_open() || get_comments_number()) {
    comments_template();
}

endwhile; ?>
