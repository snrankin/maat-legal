<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package Maat
 */

get_header();
?>

<div id="primary" class="content-area">
    <main id="main" class="site-main">
        <div class="section-wrapper">
            <div class="section-inner">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-10 offset-xl-1">
                            <div class="content-wrapper">
                                <article class="content-item">
                                    <header>
                                        <?php maat_post_thumbnail(array('ratio' => '2by3', 'echo' => 1)); ?>
                                        <?php get_blog_part('title'); ?>
                                    </header>
                                    <?php
                                    while (have_posts()) : the_post();
                                        $format = get_post_format();
                                        if (!empty($format)) {
                                            get_blog_template('single-' . get_post_format());
                                        } else {
                                            get_blog_template('single-standard');
                                        }
                                        the_post_navigation();

                                        // If comments are open or we have at least one comment, load up the comment template.
                                        if (comments_open() || get_comments_number()) :
                                            comments_template();
                                        endif;

                                    endwhile; // End of the loop.
                                    ?>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main><!-- #main -->
</div><!-- #primary -->

<?php
//get_sidebar();
get_footer();
