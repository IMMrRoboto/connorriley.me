<?php
/**
* Template Name: Gallery
*/

get_header(); ?>

<section>
<?php if( have_posts()) : while( have_posts()) : the_post(); ?>
	<div class="da-row">
		   <h1><?php the_title(); ?></h1>

		  <p><?php the_content(); ?></p>
	</div>
<?php endwhile; endif; ?>
</section>

<section>
	<div class = "da-row group">
<?php
	$args = array ('post_type' => 'portfolio');
	$query = new WP_Query($args);

	if( $query->have_posts()) : while( $query->have_posts()) : $query->the_post(); ?>
		<div class="center table third-page">
			<h2><?php the_title(); ?></h2>
			<a href="<?php the_permalink(); ?>"><?php the_post_thumbnail('medium') ?></a>
		</div>

		<?php $count = $query->current_post + 1;
		if($count % 3 == 0) : ?>
			</div><div class = "da-row group">
		<?php endif; ?>

	<?php endwhile; endif; wp_reset_postdata();?>
	</div>
</section>

<?php get_footer(); ?>
