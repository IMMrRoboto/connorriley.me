<?php
/**
 * The template for displaying all single galleries and attachments.
 *
 * @package Hestia
 * @since Hestia 1.0
 */

get_header();

/**
 * Don't display page header if header layout is set as classic blog.
 */
$hestia_header_layout = get_theme_mod( 'hestia_header_layout', 'default' );
if ( $hestia_header_layout !== 'classic-blog' ) {
	hestia_display_page_header( 'post' );
}
?>

</header>

<div class="<?php echo hestia_layout(); ?>">
	<div class="blog-post blog-post-wrapper">
			<div class="container">

				<?php
				if ( have_posts() ) :
					while ( have_posts() ) :
						the_post();
						get_template_part( 'template-parts/content', 'single' );
					endwhile;
				else :
					get_template_part( 'template-parts/content', 'none' );
				endif;
				?>
				<?php $images = get_field('gallery');

if( $images ): ?>
    <ul>
        <?php foreach( $images as $image ): ?>
            <li>
                <a href="<?php echo $image['url']; ?>">
                     <img src="<?php echo $image['sizes']['thumbnail']; ?>" alt="<?php echo $image['alt']; ?>" />
                </a>
                <p><?php echo $image['caption']; ?></p>
            </li>
        <?php endforeach; ?>
    </ul>
<?php endif; ?>
			</div>
	</div>
</div>


<div class="footer-wrapper">
	<?php get_footer(); ?>
