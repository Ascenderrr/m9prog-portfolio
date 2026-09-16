<?php /* Template Name: Projecten */ get_header(); ?>
<main id="main-content" class="site-main">
    <section class="page-hero"><div class="container"><p class="eyebrow">Projectoverzicht</p><h1>Werk dat ik graag laat zien.</h1><p class="intro">Een selectie van projecten waarin ik verschillende kanten van development heb onderzocht.</p></div></section>
    <section class="section container"><div class="project-list">
        <?php foreach (othman_portfolio_projects() as $project) : $project_id = sanitize_title($project['title']); ?>
            <article id="<?php echo esc_attr($project_id); ?>" class="project-row"><img src="<?php echo esc_url($project['image']); ?>" alt="<?php echo esc_attr($project['title']); ?> project" loading="lazy"><div class="project-row__content"><p class="eyebrow"><?php echo esc_html($project['type']); ?></p><h2><?php echo esc_html($project['title']); ?></h2><p><?php echo esc_html($project['description']); ?></p><div class="tag-list"><?php foreach ($project['skills'] as $skill) : ?><span><?php echo esc_html($skill); ?></span><?php endforeach; ?></div></div></article>
        <?php endforeach; ?>
    </div><p class="project-note">Ik heb nog meer projecten gemaakt in mijn bewijzenmap. Vraag gerust toestemming om die te bekijken.</p></section>
</main>
<?php get_footer(); ?>