<?php

function othman_portfolio_setup() {
	add_theme_support('title-tag');
	add_theme_support('post-thumbnails');
	add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script'));

	register_nav_menus(array(
		'primary' => __('Hoofdnavigatie', 'othman-portfolio'),
	));
}
add_action('after_setup_theme', 'othman_portfolio_setup');

function othman_portfolio_assets() {
	wp_enqueue_style('othman-portfolio-style', get_stylesheet_uri(), array(), '1.0.2');
	wp_enqueue_script('othman-portfolio-script', get_theme_file_uri('/script.js'), array(), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'othman_portfolio_assets');

function othman_portfolio_projects() {
	return array(
		array(
			'title' => 'Todo List',
			'type' => 'Webapp',
			'description' => 'Een overzichtelijke todo-app waarmee taken aangemaakt, afgevinkt en beheerd kunnen worden.',
			'skills' => array('HTML', 'CSS', 'JavaScript', 'UX'),
			'image' => 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=80',
		),
		array(
			'title' => 'Muse Experience',
			'type' => 'Web & hardware',
			'description' => 'Een interactieve installatie met een Raspberry Pi en een zorgvuldig ontworpen website.',
			'skills' => array('PHP', 'WordPress', 'Raspberry Pi', 'Responsive design'),
			'image' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
		),
		array(
			'title' => 'Arcade Controller',
			'type' => 'Hardware & game',
			'description' => 'Een zelfgebouwde controller voor een arcadegame die vanaf de basis is ontwikkeld.',
			'skills' => array('C#', 'Game development', 'Electronics', 'Prototyping'),
			'image' => 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
		),
	);
}
