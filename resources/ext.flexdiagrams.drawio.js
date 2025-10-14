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
	/**
	 * For possible URL parameters, see:
	 * https://www.drawio.com/doc/faq/supported-url-parameters
	 * https://www.drawio.com/doc/faq/embed-mode
	 */
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

	const config = {
		defaultAdaptiveColors: 'none' // Force light mode for now so that SVG works the same as PNG
	};

	let $iframe;
	let saveInProgress = false;

	// See https://www.drawio.com/doc/faq/embed-mode for possible actions
	function postMessageToIframe( message ) {
		if ( $iframe && $iframe.length > 0 ) {
			$iframe[ 0 ].contentWindow.postMessage( JSON.stringify( message ), '*' );
		}
	}

	function edit( path, content, $container ) {
		$iframe = fd.editor.createEditor( $container, {
			src: editor,
			allowFullscreen: true
		} );

		const receive = function ( evt ) {
			if ( evt.data.length > 0 ) {
				const msg = JSON.parse( evt.data );
				switch ( msg.event ) {
					case 'init':
						if ( content === null ) {
							postMessageToIframe(
								{
									action: 'load',
									autosave: 0,
									xml: ''
								} );
						} else if ( /(\.png)$/i.test( path ) ) {
							postMessageToIframe(
								{
									action: 'load',
									autosave: 0,
									xmlpng: content
								} );
						} else {
							postMessageToIframe(
								{
									action: 'load',
									autosave: 0,
									xml: content
								} );
						}
						break;
					case 'export':
						imgData = msg.data;
						if ( saveInProgress ) {
							const pageName = mw.config.get( 'wgPageName' );
							drawio_proto.updatePageAndRedirectUser( pageName, imgData );
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

	fd.drawio.prototype = drawio_proto;

	drawio_proto.initialize = function () {
		const $containers = $( '[data-mw-flexdiagrams-type="drawio"]' );

		$containers.each( function () {
			const $container = $( this );
			const pageName = $container.attr( 'data-mw-flexdiagrams-page' ) || mw.config.get( 'wgPageName' );

			if ( mw.config.get( 'wgArticleId' ) === 0 ) {
				edit( pageName + '.png', null, $container );
			} else {
				const diagramURL = mw.config.get( 'wgServer' ) + mw.config.get( 'wgScript' ) +
					'?title=' + encodeURIComponent( pageName ) + '&action=raw';
				$.get( diagramURL, ( data ) => {
					if ( mw.config.get( 'wgAction' ) === 'editdiagram' ) {
						edit( null, data, $container );
					} else {
						const $img = $( '<img>' );
						$img.attr( 'id', 'diagramContainer' );
						$img.attr( 'src', data );
						$container.append( $img );
					}
				} );
			}
		} );

		this.enableSave( this );
	};

	let imgData = null;

	drawio_proto.exportDiagram = function () {
		const pageName = mw.config.get( 'wgPageName' );
		if ( imgData !== null ) {
			drawio_proto.updatePageAndRedirectUser( pageName, imgData );
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
			postMessageToIframe( {
				action: 'export',
				format: 'xmlpng'
			} );
		} else {
			const diagramURL = mw.config.get( 'wgServer' ) + mw.config.get( 'wgScript' ) +
				'?title=' + encodeURIComponent( pageName );
			window.location.href = diagramURL;
		}
	};

	const drawioHandler = new fd.drawio();
	drawioHandler.initialize();

}( jQuery, mediaWiki, flexdiagrams ) );
