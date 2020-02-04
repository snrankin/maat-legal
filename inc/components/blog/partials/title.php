<?php if (is_single()) : ?>
<h1 class="post-title" itemprop="name headline"><?php the_title(); ?></h1>
<?php else : ?>
<h4 class="post-title" itemprop="name headline"><?php the_title(); ?></h4>
<?php endif ?>
