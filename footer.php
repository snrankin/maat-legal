<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Maat
 */

?>

</div><!-- #content -->

<?php if (!is_page_template('landing-page.php')) {
            get_component_partial('site-footer', 'template');
        } ?>
</div><!-- #page -->

<?php wp_footer(); ?>
<script type="application/ld+json">
{
    "@context": "http://schema.org",
    "@type": "Organization",
    "additionalType": "http://www.productontology.org/doc/Business_consultant",
    "name": "Maat Legal",
    "description": "Take your law firm to the next level with Maat Legal",
    "image": "<?php echo wp_get_attachment_url( 94 ); ?>",
    "logo": "<?php echo wp_get_attachment_url( 93 ); ?>",
    "url": "https://maatlegal.com",
    "telephone": "855-996-9993",
    "sameAs": [
        "https://twitter.com/MadeforLawyers",
        "https://www.linkedin.com/company/dannaandassociates",
        "https://plus.google.com/109692395148165905920",
        "https://www.facebook.com/MAATlegal/",
        "https://www.youtube.com/channel/UCtGzqrwYA8UtT1_JzQJYIuA",
        "https://www.instagram.com/maatlegal"
    ]
}
</script>

</body>

</html>
