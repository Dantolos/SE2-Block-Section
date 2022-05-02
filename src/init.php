<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles. 
 * @since 1.0.0
 */
function se2_section_cgb_block_assets() { // phpcs:ignore
	// Register block styles for both frontend + backend.
	wp_register_style(
		'se2_section-cgb-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		is_admin() ? array( 'wp-editor' ) : null, // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);

	// Register block editor script for backend.
	wp_register_script(
		'se2_section-cgb-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	// Register block editor styles for backend.
	wp_register_style(
		'se2_section-cgb-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);

	// WP Localized globals. Use dynamic PHP stuff in JavaScript via `cgbGlobal` object.
	wp_localize_script(
		'se2_section-cgb-block-js',
		'cgbGlobal', // Array containing dynamic data for a JS Global.
		[
			'pluginDirPath' => plugin_dir_path( __DIR__ ),
			'pluginDirUrl'  => plugin_dir_url( __DIR__ ),
			// Add more data here that you want to access from `cgbGlobal` object.
		]
	);

	/**
	 * Register Gutenberg block on server-side.
	 *
	 * Register the block on server-side to ensure that the block
	 * scripts and styles for both frontend and backend are
	 * enqueued when the editor loads.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @since 1.16.0
	 */
	register_block_type(
		'cgb/block-se2-section', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'se2_section-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'se2_section-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'se2_section-cgb-block-editor-css',
			'render_callback' => 'simplevent_section_render',

			'attributes' => [
				'containerstyle' => [ 
					 'type' => 'object',
					 'default' => [
						  'overflow'               => 'hidden',
						  'position'               => 'relative',
						  'height'                 => 'auto',
						  'width'                  => 'auto', 
						  'minHeight'              => 'auto',                        
						  'margin'                 => '0',
						  'padding'                => '0',
						  'background'			  => 'unset',
						  'backgroundColor'        => '#f1f1f1',
						  'backgroundImage'        => 'none',
						  'backgroundSize'         => 'cover',
						  'backgroundRepeat'       => 'no-repeat',
						  'backgroundAttachment'   => 'scroll',
						  'backgroundPosition'     => 'center',
						  'borderWidth'            => '0',
						  'borderStyle'            => 'solid',
						  'borderColor'            => '#ffffff',
						  'borderRadius'           => '0',
						  'clipPath'               => 'unset',
						  'video'                  => 'false',
						  'opacity'			  => '1'
					 ]
				],
				'style' => [
					 'type' => 'object',
					 'default' => []
				],
			
			   
		   ],
		)
	);
}

function simplevent_section_render($attr, $content) {
	$style;
	$video = '';

	if( is_array( $attr['style'])  ){
		 $style = '';
		 foreach( $attr['style'] as $tagKey => $styleTag ){
			  $tagKey = preg_replace('/([A-Z])/', '-$1', $tagKey);
			  if( $tagKey !== 'video'){
				   
				   $style .= strtolower($tagKey) . ':' . $styleTag . '; ';   
			  } else {
					if($attr['style']['video'] !== 'false'){
						$videoStyle = 'position: absolute; top: 50%; transform:translate(-50%, -50%); left: 50%; height:100%; width:177.77777778vh; min-width: 100%; min-height: 56.25vw; ';
						$video = '<video class="background-video" style="'.$videoStyle.'" autoplay loop muted playsinline><source src="' . $attr['style']['video']['url']. '" type="'.$attr['style']['video']['mime'].'" ></video>';
				   } 
			  }
		 }
	}
	
  
   return '<div style="position:relative; ' . $style . '">'.$video.$content.'</div>';
}

// Hook: Block assets.
add_action( 'init', 'se2_section_cgb_block_assets' );