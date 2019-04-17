<?php
/** ===========================================================================
 * @package maat
 * @created 3-4-19
 * @author Sam Rankin sam@maatlegal.com>
 * @copyright 2019 Maat Legal
 * -----
 * Last Modified: 3-22-19 at 12:25 pm
 * Modified By: Sam Rankin <sam@maatlegal.com>
 * -----
 * Description: This is the template that displays all of the <head> section and everything up until <div id="content">
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 * -----
 * HISTORY:
 * Date      	By	Comments
 * ----------	---	----------------------------------------------------------
* ========================================================================= */

// Variables
?>

<!doctype html>
<html <?php language_attributes(); ?>
      <?php if (!is_single()) {
    echo 'itemscope itemtype="http://schema.org/WebPage"';
} else {
    echo 'itemscope itemtype="http://schema.org/Blog"';
} ?>>

    <head>
        <meta http-equiv="Content-Type"
              content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
        <link rel="pingback" href="<?php echo esc_url(get_bloginfo('pingback_url')); ?>">
        <link rel="profile" href="https://gmpg.org/xfn/11">
        <link rel="stylesheet" href="https://use.typekit.net/yrt5wlm.css">
        <?php wp_head(); ?>
    </head>

    <body <?php body_class(); ?>>
        <?php //get_component_partial('page-loader', 'template'); ?>
        <div id="page" class="site">
            <a class="sr-only sr-only-focusable" href="#content"><?php esc_html_e('Skip to content', 'maat'); ?></a>
            <?php
                if (!is_page_template('landing-page.php') || !is_admin() || !is_front_page()) {
                    //get_component_partial('site-header', 'template');
                }
            ?>
            <div id="content" class="site-content">
