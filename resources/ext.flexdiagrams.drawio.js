/**
 * Class for handling Drawio namespace (diagrams.net)
 *
 * @author Sanjay Thiyagarajan
 */
( function ( $, mw, fd ) {

	'use strict';
	/**
	 * Inheritance class for the fd.base constructor
	 *
	 * @class
	 */
	fd.base = fd.base || {};

	/**
	 * @class
	 * @constructor
	 */
	fd.drawio = function () {};

	const drawio_proto = new fd.base();

	const baseUrl = 'https://embed.diagrams.net/';

	// For possible URL parameters, see:
	// https://www.drawio.com/doc/faq/supported-url-parameters
	// https://www.drawio.com/doc/faq/embed-mode
	const editorParams = {
		embed: 1,
		proto: 'json',
		configure: 1,
		// Disable save and exit buttons
		saveAndExit: 0,
		noSaveBtn: 1,
		noExitBtn: 1
	};
	const editor = `${ baseUrl }?${ new URLSearchParams( editorParams ).toString() }`;

	// https://www.drawio.com/doc/faq/configure-diagram-editor
	const config = {
		defaultAdaptiveColors: 'none' // Force light mode for now so that SVG works the same as PNG
	};

	// Avoid repeated calls to mw.config.get()
	const mwConfig = {
		wgServer: mw.config.get( 'wgServer' ),
		wgScript: mw.config.get( 'wgScript' ),
		wgAction: mw.config.get( 'wgAction' ),
		wgPageName: mw.config.get( 'wgPageName' )
	};

	let $iframe;
	let saveInProgress = false;

	// See https://www.drawio.com/doc/faq/embed-mode for possible actions
	function postMessageToIframe( message ) {
		if ( $iframe && $iframe.length > 0 ) {
			$iframe[ 0 ].contentWindow.postMessage( JSON.stringify( message ), '*' );
		}
	}

	fd.drawio.prototype = drawio_proto;

	drawio_proto.initialize = function () {
		const $containers = $( '[data-mw-flexdiagrams-type="drawio"]' );

		$containers.each( function () {
			const $container = $( this );
			const pageName = $container.attr( 'data-mw-flexdiagrams-page' ) || mwConfig.wgPageName;

			const diagramURL = mwConfig.wgServer + mwConfig.wgScript +
				'?title=' + encodeURIComponent( pageName ) + '&action=raw';

			$.get( diagramURL )
				.catch( ( jqXHR ) => {
					if ( mwConfig.wgAction === 'editdiagram' && jqXHR.status === 404 ) {
						return '';
					}
					return $.Deferred().reject( jqXHR );
				} )
				.then( ( xml ) => {
					if ( mwConfig.wgAction === 'editdiagram' ) {
						renderEditor( xml, $container );
					} else {
						renderDiagram( xml, $container );
					}
				} );
		} );

		this.enableSave( this );
	};

	/**
	 * Initializes the editor for the given container.
	 *
	 * @param {string|null} xml - The XML content of the diagram, or null if the diagram is empty.
	 * @param {jQuery} $container - The container element.
	 */
	function renderEditor( xml, $container ) {
		$iframe = fd.editor.createEditor( $container, {
			src: editor,
			allowFullscreen: true
		} );

		const receive = function ( evt ) {
			if ( evt.data.length > 0 ) {
				const msg = JSON.parse( evt.data );
				switch ( msg.event ) {
					case 'init':
						postMessageToIframe(
							{
								action: 'load',
								autosave: 0,
								xml: xml || ''
							} );
						break;
					case 'export':
						imgData = msg.data;
						if ( saveInProgress ) {
							drawio_proto.updatePageAndRedirectUser( mwConfig.wgPageName, imgData );
							saveInProgress = false;
						}
						break;
					case 'configure':
						postMessageToIframe( {
							action: 'configure',
							config: config
						} );
						break;
				}
			}
		};

		window.addEventListener( 'message', receive );
	}

	/**
	 * Renders the diagram for the given container.
	 *
	 * @param {string} xml - The XML content of the diagram.
	 * @param {jQuery} $container - The container element.
	 */
	function renderDiagram( xml, $container ) {
		const useSVG = $container.attr( 'data-mw-flexdiagrams-svg' ) === 'true';

		if ( useSVG && xml && xml.startsWith( 'data:image/svg+xml;base64,' ) ) {
			const base64Data = xml.slice( 'data:image/svg+xml;base64,'.length );
			try {
				const decodedSvg = atob( base64Data );

				// Use DOMParser to safely parse the SVG XML without executing scripts.
				const parser = new DOMParser();
				const svgDoc = parser.parseFromString( decodedSvg, 'image/svg+xml' );
				const svgElement = svgDoc.documentElement;

				if ( svgElement.querySelector( 'parsererror' ) ) {
					throw new Error( '[FlexDiagrams] Error parsing SVG data.' );
				}

				const $svg = $( svgElement );
				$svg.attr( 'class', 'ext-flexdiagrams-diagram' );
				$container.append( $svg );
				return;
			} catch ( e ) {
				mw.log.error( '[FlexDiagrams] Error decoding or parsing SVG data.', e );
			}
		}

		const $img = $( '<img>' );
		$img.attr( 'class', 'ext-flexdiagrams-diagram' );
		$img.attr( 'src', xml );
		$container.append( $img );
	}

	let imgData = null;

	drawio_proto.exportDiagram = function () {
		if ( imgData !== null ) {
			drawio_proto.updatePageAndRedirectUser( mwConfig.wgPageName, imgData );
		} else if ( $iframe ) {
			saveInProgress = true;
			// HACK: Reset the modified status to false to get rid of the confirmation dialog.
			// This is sent before the 'export' action. Since 'export' is async and takes time,
			// this 'status' message will be processed by the iframe before the page unloads,
			// preventing the confirmation dialog.
			postMessageToIframe( {
				action: 'status',
				modified: false
			} );
			const useSVG = $iframe.parent().attr( 'data-mw-flexdiagrams-drawio-use-svg' ) === 'true';
			postMessageToIframe( {
				action: 'export',
				format: useSVG ? 'xmlsvg' : 'xmlpng',
				background: 'transparent'
			} );
		} else {
			const diagramURL = mwConfig.wgServer + mwConfig.wgScript +
				'?title=' + encodeURIComponent( mwConfig.wgPageName );
			window.location.href = diagramURL;
		}
	};

	const drawioHandler = new fd.drawio();
	drawioHandler.initialize();

}( jQuery, mediaWiki, flexdiagrams ) );
