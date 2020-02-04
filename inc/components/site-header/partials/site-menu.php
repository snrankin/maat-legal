<nav id="site-navigation" class="navbar navbar-expand-lg navbar-light bg-primary">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-menu" aria-controls="main-menu" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <?php
    wp_nav_menu(array(
        'theme_location' => 'main-menu',
        'menu_id'        => 'main-menu',
    ));
    ?>
</nav><!-- #site-navigation --> 