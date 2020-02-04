<?php
$post_type = get_post_type();
if ($post_type !== 'post') {
    $item = $post_type;
} else {
    $item = 'blog';
}
?>
<article id="post-<?php the_ID(); ?>" <?php post_class($item . '-post'); ?> itemscope itemtype="http://schema.org/BlogPosting">
    <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>" class="<?php echo $item; ?>-link" itemprop="url" rel="bookmark" >
        <?php the_post_thumbnail(); ?>
        <div class="<?php echo $item; ?>-content">
            <?php get_component_partial($item, 'title'); ?>
            <?php get_component_partial($item, 'meta'); ?>
            <?php get_component_partial($item, 'content'); ?>
        </div>
    </a>
</article>