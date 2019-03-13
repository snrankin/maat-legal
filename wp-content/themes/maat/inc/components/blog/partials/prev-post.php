<?php
$prev_post = get_previous_post();
$post_id = $prev_post->ID;
$classes = array(
    'single-nav-item',
    'prev-post'
);
$all_classes = get_post_class($classes, $post_id);
?>
<?php if (!empty($prev_post)) : ?>
<div class="col-ms-6">
    <div class="col-inner">
        <div class="wpb_content_element">
<article id="post-<?php echo $post_id; ?>" class="<?php echo implode(" ", $all_classes); ?>" itemscope itemtype="http://schema.org/BlogPosting">
    <a href="<?php echo get_permalink($post_id); ?>" title="<?php echo get_the_title($post_id); ?>" class="post-link blog-link" itemprop="url" rel="bookmark" >
    <?php echo get_the_post_thumbnail($post_id); ?>
        <div class="blog-content">
            <h4 class="post-title">Previous Post:</h4>
            <p class="small" itemprop="name headline"><?php echo get_the_title($post_id); ?></p>
        </div>
    </a>
</article>
        </div>
    </div>
</div>
<?php endif; ?>
