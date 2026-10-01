<?php get_header(); ?>

<main id="main-content" class="site-main">
    <section class="hero container">
        <div class="hero__content">
            <p class="eyebrow">Template test: front-page.php</p>
            <h1>Ik bouw digitale ervaringen die <em>werken.</em></h1>
            <p class="intro">Mijn naam is Othman. Ik combineer code, hardware en nieuwsgierigheid om duidelijke en bruikbare oplossingen te maken. Op zoek naar een stage waar ik verder kan groeien.</p>
            <div class="hero__actions">
                <a class="button button--primary" href="<?php echo esc_url(home_url('/projecten/')); ?>">Bekijk mijn projecten <span aria-hidden="true">↗</span></a>
                <a class="text-link" href="<?php echo esc_url(home_url('/over-mij/')); ?>">Meer over mij <span aria-hidden="true">→</span></a>
            </div>
        </div>
        <div class="hero__note">
            <img class="hero__profile" src="<?php echo esc_url(get_theme_file_uri('/portofoliofoto.jpg')); ?>" alt="Portret van Othman">
            <div class="hero__note-copy">
                <span class="hero__line"></span>
                <p>Van eerste idee<br>naar werkend product.</p>
            </div>
        </div>
    </section>



    <section class="section container">
        <div class="section-heading"><div><p class="eyebrow">Geselecteerd werk</p><h2>Projecten met een verhaal.</h2></div><a class="text-link" href="<?php echo esc_url(home_url('/projecten/')); ?>">Alle projecten <span aria-hidden="true">→</span></a></div>
        <div class="project-grid">
            <?php foreach (othman_portfolio_projects() as $project) : ?>
                <article class="project-card">
                    <img src="<?php echo esc_url($project['image']); ?>" alt="<?php echo esc_attr($project['title']); ?> project" loading="lazy">
                    <div class="project-card__body"><p class="eyebrow"><?php echo esc_html($project['type']); ?></p><h3><?php echo esc_html($project['title']); ?></h3><p><?php echo esc_html($project['description']); ?></p><a class="text-link" href="<?php echo esc_url(home_url('/projecten/')); ?>#<?php echo esc_attr(sanitize_title($project['title'])); ?>">Bekijk project <span aria-hidden="true">→</span></a></div>
                </article>
            <?php endforeach; ?>
        </div>
    </section>
    

    <section class="section contact-banner"><div class="container split-heading"><div><p class="eyebrow">Samenwerken?</p><h2>Ik hoor graag wat we kunnen bouwen.</h2></div><a class="button button--light" href="<?php echo esc_url(home_url('/contact/')); ?>">Stuur een bericht <span aria-hidden="true">↗</span></a></div></section>
</main>

<?php get_footer(); ?>