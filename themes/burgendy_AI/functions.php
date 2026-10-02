<?php

function burgendy_ai_setup() {
	add_theme_support('title-tag');
	add_theme_support('post-thumbnails');
	add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script'));

	register_nav_menus(array(
		'primary' => __('Hoofdnavigatie', 'burgendy-ai'),
	));
}
add_action('after_setup_theme', 'burgendy_ai_setup');

function burgendy_ai_assets() {
	wp_enqueue_style('burgendy-ai-style', get_stylesheet_uri(), array(), '1.5.1');
	wp_enqueue_script('burgendy-ai-script', get_theme_file_uri('/script.js'), array(), '2.5.0', true);
}
add_action('wp_enqueue_scripts', 'burgendy_ai_assets');

function burgendy_ai_projects() {
	return array(
		array(
			'title' => 'Roomus Website',
			'type' => 'Webapp',
			'description' => 'Een roommate-matching platform waar studenten profielen maken, swipen op roommates en kamers vinden of aanbieden.',
			'skills' => array('HTML', 'CSS', 'JavaScript', 'UX'),
			'image' => 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80',
			'image_local' => '/wp-content/uploads/roomus-screenshot.png',
			'github' => 'https://github.com/Ascenderrr/m5bo',
			'website' => 'https://39035.hosts2.ma-cloud.nl/HTML/roomus-website/',
		),
		array(
			'title' => 'Muse Experience',
			'type' => 'Web & hardware',
			'description' => 'Een interactieve installatie met een Raspberry Pi en een zorgvuldig ontworpen website met responsive design voor elke bezoeker.',
			'skills' => array('PHP', 'WordPress', 'Raspberry Pi', 'Responsive design'),
			'image' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
			'image_local' => '/wp-content/uploads/muse2.jpg',
			'github' => 'https://github.com/Ascenderrr/M8BO_protest',
		),
		array(
			'title' => 'Arcade Game Controller',
			'type' => 'Hardware & game',
			'description' => 'Een Unity fish-arcade game (gamejam) met een zelfgebouwde controller: joystick en rotary-encoder via Arduino als toetsenbord-input.',
			'skills' => array('C#', 'Unity', 'Arduino', 'Prototyping'),
			'image' => 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
			'image_local' => '/wp-content/uploads/arcade-game-controller.png',
			'github' => 'https://github.com/gh05t-1/Gamejam-2627-gd-fs-team-TheByteOf87',
		),
	);
}

function burgendy_ai_project_image($project) {
	if (!empty($project['image_local'])) {
		// Fall back to the remote placeholder while the local screenshot is missing
		// (e.g. muse-screenshot.png until the user supplies it).
		if (defined('ABSPATH')) {
			$absolute = trailingslashit(ABSPATH) . ltrim($project['image_local'], '/');
			if (file_exists($absolute)) {
				return home_url($project['image_local']);
			}
			return $project['image'];
		}
		return home_url($project['image_local']);
	}
	return $project['image'];
}
