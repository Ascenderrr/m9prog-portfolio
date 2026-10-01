<footer class="site-footer">
    <div class="container site-footer__inner">
        <p>&copy; <?php echo esc_html(wp_date('Y')); ?> <?php echo esc_html(get_bloginfo('name')); ?></p>
        <a class="text-link" href="<?php echo esc_url(home_url('/contact/')); ?>">Neem contact op <span aria-hidden="true">→</span></a>
    </div>
</footer>
<?php wp_footer(); ?>
</body>
</html>