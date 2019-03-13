<?php
$item = 'blog';
$next_post = get_next_post();
$prev_post = get_previous_post();
?>
<nav class="single-post-nav wpb_content_element border-top border-dark container grid-half">
<div class="row">
<?php if (!empty($prev_post)) : ?>
<?php get_component_partial($item, 'prev-post'); ?>
<?php endif; ?>
<?php if (!empty($next_post)) : ?>
<?php get_component_partial($item, 'next-post'); ?>
<?php endif; ?>
</div>
</nav>