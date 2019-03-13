<?php
$post_type = get_post_type();
if ($post_type !== 'post') {
    $item = $post_type;
} else {
    $item = 'blog';
}
?>
<div class="blog-meta <?php echo (is_single()) ? 'single-' : 'archive-'; ?>post-meta">
    <div class="meta-wrapper-inner">
        <?php get_component_partial($item, 'time'); ?>
        <?php
            if (is_single()) :
                get_component_partial($item, 'categories');
                get_component_partial($item, 'tags');
            else :
                get_component_partial($item, 'author');
            endif;
        ?>
    </div>
</div>