<?php
/** ===========================================================================
 * Template Name: Landing Page
 * @package Maat
 * @subpackage /landing-page.php
 * @created 3-12-19
 * @author Sam Rankin sam@maatlegal.com>
 * @copyright 2019 Maat Legal
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 * -----
 * Last Modified: 3-15-19 at 10:09 pm
 * Modified By: Sam Rankin <sam@maatlegal.com>
 * -----
 * Description: This is a template for pages that do not include the global
 * site header
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
* ========================================================================= */

// Variables

?>
<?php get_header();
$bg = '';
if(has_post_thumbnail()){
    $styles = array(
        'background-image' => get_the_post_thumbnail_url(get_the_ID(),'full'),
        'background-position' => 'center center',
        'background-repeat' => 'no-repeat',
        'background-size' => 'cover',
        'background-attachment' => 'fixed'
    );
    $bg = maat_add_item_styles($styles);
}
?>

<section id="primary" class="content-area" <?php echo $bg; ?>>
    <main id="main" class="site-main">

        <?php get_component_partial('landing-page', 'template'); ?>

    </main><!-- #main -->
</section><!-- #primary -->

<?php
get_footer();
