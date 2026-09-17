<?php get_header(); ?>

<main id="main-content" class="site-main">
    <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
        <section class="page-hero">
            <div class="container">
                <p class="eyebrow">Template test: page.php</p>
                <h1><?php the_title(); ?></h1>
            </div>
        </section>

        <article <?php post_class('section container prose'); ?>>
            <?php if (has_post_thumbnail()) : ?>
                <?php the_post_thumbnail('large', array('class' => 'content-image')); ?>
            <?php endif; ?>
            <?php the_content(); ?>
        </article>
    <?php endwhile; else : ?>
        <section class="section container"><p>Deze pagina bevat nog geen inhoud.</p></section>
    <?php endif; ?>
</main>

<?php get_footer(); ?>
