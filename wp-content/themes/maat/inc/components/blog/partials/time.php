<div class="meta-wrapper post-date">
<i class="maat maat-calendar-solid meta-icon"></i><span class="meta-title">Posted on:</span><time datetime="<?php echo get_the_date('c'); ?>" itemprop="datePublished" class="published meta-content"><?php the_date(get_option('date_format')); ?></time>
<time datetime="<?php get_the_modified_date('c'); ?>" itemprop="dateModified" class="modified sr-only">
    <?php the_modified_date(get_option('date_format')); ?>
</time>
</div>
