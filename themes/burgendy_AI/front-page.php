<?php get_header(); ?>

<main id="main-content" class="site-main">
    <section class="portal-gate" aria-labelledby="portal-title">
        <div class="portal-gate__noise" aria-hidden="true"></div>
        <div class="portal-gate__content">
            <p class="portal-gate__kicker">Othman / portfolio 2026</p>
            <button class="record" type="button" data-magnetic aria-controls="portfolio-content" aria-expanded="false" aria-label="Open het portfolio">
                <span class="record__disc">
                    <span class="record__grooves" aria-hidden="true"></span>
                    <span class="record__label">
                        <img src="<?php echo esc_url(get_theme_file_uri('/portofoliofoto.jpg')); ?>" alt="Portret van Othman" fetchpriority="high">
                        <span class="record__hole" aria-hidden="true"></span>
                    </span>
                    <span class="record__shine" aria-hidden="true"></span>
                </span>
                <svg class="record__ringtext" viewBox="0 0 200 200" aria-hidden="true" focusable="false"><defs><path id="recordRingPath" d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" /></defs><text><textPath href="#recordRingPath">PRESS PLAY • DRAAI DE PLAAT • PRESS PLAY • DRAAI DE PLAAT •</textPath></text></svg>
                <span class="record__caption">
                    <strong id="portal-title">Press play to enter</strong>
                    <span>Een portfolio in beweging <span aria-hidden="true">↗</span></span>
                </span>
            </button>
            <p class="portal-gate__hint">Klik op de plaat of druk op Enter</p>
        </div>
    </section>

    <div id="portfolio-content" class="portfolio-shell" aria-hidden="true">
      <section class="hero container">
        <div class="hero__content">
            <p class="eyebrow">Portfolio 2026</p>
            <h1>Ik bouw digitale ervaringen die <em>werken.</em></h1>
            <p class="intro">Mijn naam is Othman. Ik combineer code, hardware en nieuwsgierigheid om duidelijke en bruikbare oplossingen te maken. Op zoek naar een stage waar ik verder kan groeien.</p>
            <div class="hero__actions">
                <a class="button button--primary" data-magnetic href="<?php echo esc_url(home_url('/projecten/')); ?>">Bekijk mijn projecten <span aria-hidden="true">↗</span></a>
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
            <p class="scroll-hint" aria-hidden="true">Scroll om te ontdekken ↓</p>
            </section>


    <div class="marquee" aria-hidden="true">
        <div class="marquee__track">
            <div class="marquee__group"><span>Development</span><span class="marquee__dot">✦</span><span>WordPress</span><span class="marquee__dot">✦</span><span>PHP</span><span class="marquee__dot">✦</span><span>JavaScript</span><span class="marquee__dot">✦</span><span>Raspberry Pi</span><span class="marquee__dot">✦</span><span>C#</span><span class="marquee__dot">✦</span><span>Game development</span><span class="marquee__dot">✦</span><span>Responsive design</span><span class="marquee__dot">✦</span></div>
            <div class="marquee__group" aria-hidden="true"><span>Development</span><span class="marquee__dot">✦</span><span>WordPress</span><span class="marquee__dot">✦</span><span>PHP</span><span class="marquee__dot">✦</span><span>JavaScript</span><span class="marquee__dot">✦</span><span>Raspberry Pi</span><span class="marquee__dot">✦</span><span>C#</span><span class="marquee__dot">✦</span><span>Game development</span><span class="marquee__dot">✦</span><span>Responsive design</span><span class="marquee__dot">✦</span></div>
        </div>
    </div>

    <section class="section container">
        <div class="section-heading"><div><p class="eyebrow">Geselecteerd werk</p><h2>Projecten met een verhaal.</h2></div><a class="text-link" href="<?php echo esc_url(home_url('/projecten/')); ?>">Alle projecten <span aria-hidden="true">→</span></a></div>
        <div class="project-grid">
            <?php foreach (burgendy_ai_projects() as $index => $project) : ?>
                <article class="project-card" data-tilt>
                    <span class="project-index" aria-hidden="true"><?php echo sprintf('%02d', $index + 1); ?></span>
                    <img src="<?php echo esc_url(burgendy_ai_project_image($project)); ?>" alt="<?php echo esc_attr($project['title']); ?> project" loading="lazy">
                    <span class="project-card__view" aria-hidden="true">Bekijk →</span>
                    <div class="project-card__body"><p class="eyebrow"><?php echo esc_html($project['type']); ?></p><h3><?php echo esc_html($project['title']); ?></h3><p><?php echo esc_html($project['description']); ?></p><a class="text-link" href="<?php echo esc_url(home_url('/projecten/')); ?>#<?php echo esc_attr(sanitize_title($project['title'])); ?>">Bekijk project <span aria-hidden="true">→</span></a><?php if (!empty($project['github'])) : ?> <a class="text-link" href="<?php echo esc_url($project['github']); ?>" target="_blank" rel="noopener">GitHub <span aria-hidden="true">↗</span></a><?php endif; ?></div>
                </article>
            <?php endforeach; ?>
        </div>
    </section>
    

            <section class="section contact-banner"><div class="container split-heading"><div><p class="eyebrow">Samenwerken?</p><h2>Ik hoor graag wat we kunnen bouwen.</h2></div><a class="button button--light" data-magnetic href="<?php echo esc_url(home_url('/contact/')); ?>">Stuur een bericht <span aria-hidden="true">↗</span></a></div></section>
        </div>
</main>

<?php get_footer(); ?>