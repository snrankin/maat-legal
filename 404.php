<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package Maat
 */

get_header();
?>

<div id="primary"
     class="content-area container-wrapper full-height-section d-flex justify-content-center align-items-center">
    <div class="container-wrapper-inner">
        <main id="main" class="site-main container">

            <section class="error-404 not-found col-12">
                <header class="page-header col-item">
                    <h1 class="page-title text-center text-primary">Whoops!<br><small>Looks like that page doesn't
                            exist</small></h1>
                </header><!-- .page-header -->

                <div class="page-content col-item text-center">
                    <a href="<?php echo esc_url(home_url('/')); ?>" rel="home"
                       title="<?php bloginfo('name'); ?>" class="btn btn-lg btn-primary">Go Back to Home Page</a>

                </div><!-- .page-content -->
            </section><!-- .error-404 -->

        </main><!-- #main -->
    </div><!-- #primary -->
</div>
<?php
get_footer();
