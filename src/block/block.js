/**
 * BLOCK: simplevent-block-section
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
import { useSelect } from '@wordpress/data';
import SectionEdit from './block-editor';


const {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	ColorPalette
} = wp.blockEditor;
const {
	PanelBody,
	Dropdown,
	MenuItem,
	MenuGroup,
	Button,
	RangeControl,
	Icon
} = wp.components;
import SE2_container from '../components/container';
import se2SectionIcon from './icon.js';



/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType('cgb/block-se2-section', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __('SE2 Section (dyn)'), // Block title.
	icon: {
		// Specifying a background color to appear with the icon e.g.: in the inserter.
		background: 'rgba(0, 0, 0, 0)',
		// Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
		foreground: '#00f692',
		// Specifying an icon for the block
		src: <svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
			viewBox="0 0 1080 1080" >
			<path d="M87,87C36,137.9,8,205.6,8,277.6v50h100v-50c0-93.5,76.1-169.6,169.6-169.6h50V8h-50
	    C205.6,8,137.9,36,87,87z"/>
			<path d="M108,802.4v-50H8v50c0,72,28,139.7,79,190.7s118.6,79,190.7,79h50V972h-50
	    C184.1,972,108,895.9,108,802.4z"/>
			<path d="M972,802.4c0,93.5-76.1,169.6-169.6,169.6h-50v100h50c72,0,139.7-28,190.7-79s79-118.6,79-190.7v-50
	    H972V802.4z"/>
			<path d="M993,87C942.1,36,874.4,8,802.4,8h-50v100h50c93.5,0,169.6,76.1,169.6,169.6v50h100v-50
	    C1072,205.6,1044,137.9,993,87z"/>
			<polygon points="540,322.1 593,474.6 754.4,477.9 625.7,575.4 672.5,729.9 540,637.7 407.5,729.9 
	    454.3,575.4 325.6,477.9 487,474.6 "/>
		</svg>,
	},// Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'se2', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__('se2-section — CGB Block'),
		__('CGB Example'),
		__('create-guten-block'),
	],

	edit: ({ attributes, setAttributes }) => {
		function containerStyle(e, style) {
			setAttributes({
				containerstyle: e,
				style: style
			});
		}

		const blockProps = useBlockProps();
		return (

			<SE2_container styleProps={attributes.containerstyle} styleHandler={containerStyle}>
				<InnerBlocks allowedBlocks={true} renderAppender={InnerBlocks.ButtonBlockAppender} />
			</SE2_container>

		);
	},


	save: props => <InnerBlocks.Content />,
});