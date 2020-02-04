<?php
$next_post = get_next_post();
$post_id = $next_post->ID;
$classes = array(
    'single-nav-item',
    'next-post'
);
$all_classes = get_post_class($classes, $post_id);
?>
<?php if (!empty($next_post)) : ?>
<div class="col-ms-6 align-self-end">
    <div class="col-inner">
        <div class="wpb_content_element">
            <article id="post-<?php echo $post_id; ?>" class="<?php echo implode(" ", $all_classes); ?>" itemscope itemtype="http://schema.org/BlogPosting">
                <a href="<?php echo get_permalink($post_id); ?>" title="<?php echo get_the_title($post_id); ?>" class="post-link blog-link" itemprop="url" rel="bookmark" >
                <?php echo get_the_post_thumbnail($post_id); ?>
                    <div class="blog-content">
                        <h4 class="post-title text-ms-right">Next Post:</h4>
                        <p class="small text-ms-right" itemprop="name headline"><?php echo get_the_title($post_id); ?></p>
                    </div>
                </a>
            </article>
        </div>
    </div>
</div>
<?php endif; ?>
