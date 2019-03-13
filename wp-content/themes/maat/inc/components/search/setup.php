<?php

// Update the default wordpress search form
function maat_search_form($form)
{
    $form = '';

    ob_start(); ?>
        <form role="search" method="get" id="searchform" action="<?php home_url('/'); ?>">
            <label class="sr-only" for="s">Search</label>
            <input type="search" value="<?php get_search_query(); ?>" name="s" placeholder="Search" id="s" class="form-control" />
            <button type="submit" id="searchsubmit" value="<?php esc_attr__('Search'); ?>" class="btn btn-primary"><i class="ei-solid ei-search"></i></button>

        </form>

    <?php

    $form = ob_get_clean();

    return $form;
}
add_filter('get_search_form', 'maat_search_form');