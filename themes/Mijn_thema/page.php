<?php get_header(); ?>

<main id="main-content" class="site-main">
    <section class="page-hero">
        <div class="container">
            <p class="eyebrow">Template test: page.php</p>
            <h1><?php the_title(); ?></h1>
        </div>
    </section>

    <section class="section container prose">
        <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
            <?php the_content(); ?>
        <?php endwhile; endif; ?>
    </section>
</main>

<?php get_footer(); ?>
