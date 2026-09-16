<?php get_header(); ?>

<main id="main-content" class="site-main">
	<section class="page-hero page-hero--compact">
		<div class="container">
			<p class="eyebrow">Portfolio</p>
			<h1><?php echo esc_html(get_bloginfo('name')); ?></h1>
			<p class="intro">Een rustige plek voor mijn werk, ontwikkeling en plannen als software developer.</p>
		</div>
	</section>

	<section class="section container content-list">
		<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
			<article <?php post_class('post-preview'); ?>>
				<p class="eyebrow"><?php echo esc_html(get_the_date()); ?></p>
				<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
				<?php the_excerpt(); ?>
				<a class="text-link" href="<?php the_permalink(); ?>">Lees meer <span aria-hidden="true">→</span></a>
			</article>
		<?php endwhile; else : ?>
			<p>Er is nog geen inhoud gepubliceerd.</p>
		<?php endif; ?>
	</section>
</main>

<?php get_footer(); ?>