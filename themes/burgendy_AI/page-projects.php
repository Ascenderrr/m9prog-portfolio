<?php /* Template Name: Projecten */ get_header(); ?>
<main id="main-content" class="site-main">
    <section class="page-hero"><div class="container"><p class="eyebrow">Projectoverzicht</p><h1>Werk dat ik graag laat zien.</h1><p class="intro">Een selectie van projecten waarin ik verschillende kanten van development heb onderzocht.</p></div></section>
    <section class="section container"><div class="project-list">
        <?php foreach (burgendy_ai_projects() as $index => $project) : $project_id = sanitize_title($project['title']); ?>
            <article id="<?php echo esc_attr($project_id); ?>" class="project-row" data-tilt><span class="project-row__index" aria-hidden="true"><?php echo sprintf('%02d', $index + 1); ?></span><img src="<?php echo esc_url(burgendy_ai_project_image($project)); ?>" alt="<?php echo esc_attr($project['title']); ?> project" loading="lazy"><div class="project-row__content"><p class="eyebrow"><?php echo esc_html($project['type']); ?></p><h2><?php echo esc_html($project['title']); ?></h2><p><?php echo esc_html($project['description']); ?></p><?php burgendy_ai_project_row_links($project); ?></div></article>
        <?php endforeach; ?>
</main>
<?php get_footer(); ?>