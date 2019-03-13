<header id="masthead" class="site-header">
    <div class="site-branding">
        <?php
        $custom_logo_id = get_theme_mod('custom_logo');
        $image = wp_get_attachment_image_src($custom_logo_id, 'full');
        $logo_url = $image[0]; ?>
        <?php if (is_front_page() && is_home()) : ?>
        <h1 class="site-title text-hide" style="background-image: url(<?php echo $logo_url; ?>);"><a href="<?php echo esc_url(home_url('/')); ?>" rel="home"><?php bloginfo('name'); ?></a></h1>
        <?php else : ?>
        <p class="site-title text-hide" style="background-image: url(<?php echo $logo_url; ?>);"><a href="<?php echo esc_url(home_url('/')); ?>" rel="home"><?php bloginfo('name'); ?></a></p>
        <?php endif; ?>
    </div><!-- .site-branding -->
    <?php get_component_partial('site-header', 'site-menu'); ?>
</header><!-- #masthead --> 