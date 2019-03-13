

<?php if (is_single()) : ?>
<div itemprop="articleBody" class="post-content main-content">
    <meta name="description" content="<?php echo wp_strip_all_tags( get_the_excerpt(), true ); ?>" />
    <?php the_content(); ?>
</div>
<?php else : ?>
<section itemprop="description" class="post-content">
    <?php the_excerpt(); ?>
</section>
<?php endif ?>