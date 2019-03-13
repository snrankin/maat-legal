<?php if (get_the_category_list()) : ?>
        <div class="meta-wrapper post-categories"><i class="ei-solid ei-archive-3 meta-icon"></i><span class="meta-title">Filed Under:</span><span class="meta-content"><?php the_category( ', ' ); ?></span></div>
<?php endif; ?>