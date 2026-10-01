<!doctype html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#f7f2e9">
    <link rel="preconnect" href="https://images.unsplash.com">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip-link" href="#main-content">Direct naar inhoud</a>
<div class="scroll-progress" aria-hidden="true"></div>
<div class="site-loader" id="siteLoader" aria-hidden="true"><div class="site-loader__inner"><p class="site-loader__brand" translate="no">Othman<span>®</span></p><div class="site-loader__bar"><div class="site-loader__fill" id="loadFill"></div></div><p class="site-loader__pct" id="loadPct">00%</p></div></div>
<canvas id="dust-canvas" aria-hidden="true"></canvas>
<div class="grain" aria-hidden="true"></div>
<div class="cursor-dot" id="cursorDot" aria-hidden="true"></div>
<div class="cursor-ring" id="cursorRing" aria-hidden="true"></div>
<button class="to-top" id="toTop" type="button" aria-label="Terug naar boven">↑</button>
<header class="site-header">
    <div class="container site-header__inner">
        <a class="site-logo" data-magnetic href="<?php echo esc_url(home_url('/')); ?>" aria-label="Naar de homepage">
            <span class="site-logo__mark">O</span>
            <span translate="no"><?php echo esc_html(get_bloginfo('name')); ?></span>
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