<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<header class="site-header">
    <div class="container site-header__inner">
        <a class="site-logo" href="<?php echo esc_url(home_url('/')); ?>" aria-label="Naar de homepage">
            <span class="site-logo__mark">O</span>
            <span><?php echo esc_html(get_bloginfo('name')); ?></span>
        </a>
        <nav class="site-nav" aria-label="Hoofdnavigatie">
            <?php
            wp_nav_menu(array(
                'theme_location' => 'primary',
                'container' => false,
                'fallback_cb' => function () {
                    echo '<ul><li><a href="' . esc_url(home_url('/')) . '">Home</a></li><li><a href="' . esc_url(home_url('/over-mij/')) . '">Over mij</a></li><li><a href="' . esc_url(home_url('/projecten/')) . '">Projecten</a></li><li><a href="' . esc_url(home_url('/contact/')) . '">Contact</a></li></ul>';
                },
            ));
            ?>
        </nav>
    </div>
</header>