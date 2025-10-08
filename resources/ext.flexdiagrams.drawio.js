/**
 * Class for handling Drawio namespace (diagrams.net)
 *
 * @author Sanjay Thiyagarajan
 */
( function ( $, mw, fd ) {

	'use strict';

	const gLinkedPages = {};

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

	const editor = 'https://embed.diagrams.net/?embed=1&spin=1&proto=json';

	function edit( path, content ) {
		const $iframe = fd.editor.createEditor( '#canvas', {
			src: editor,
			allowFullscreen: true
		} );

		const close = function () {
			const diagramURL = mw.config.get( 'wgServer' ) + mw.config.get( 'wgScript' ) +
				'?title=' + encodeURIComponent( pageName );
			window.location.href = diagramURL;
		};

		const receive = function ( evt ) {
			if ( evt.data.length > 0 ) {
				const msg = JSON.parse( evt.data );

				if ( msg.event === 'init' ) {
					if ( content === null ) {
						$iframe[ 0 ].contentWindow.postMessage( JSON.stringify(
							{
								action: 'load',
								autosave: 0,
								xml: ''
							} ), '*' );
					} else if ( /(\.png)$/i.test( path ) ) {
						$iframe[ 0 ].contentWindow.postMessage( JSON.stringify(
							{
								action: 'load',
								autosave: 0,
								xmlpng: 'data:image/png;base64,' + content
							} ), '*' );
					} else {
						$iframe[ 0 ].contentWindow.postMessage( JSON.stringify(
							{
								action: 'load',
								autosave: 0,
								xml: content
							} ), '*' );
					}
				} else if ( msg.event === 'export' ) {
					const data = ( msg.data.slice( 0, 5 ) === 'data:' ) ?
						msg.data.slice( Math.max( 0, msg.data.indexOf( ',' ) + 1 ) ) :
						btoa( msg.data );
				} else if ( msg.event === 'save' ) {
					if ( ( /\.(png|svg|html)$/i ).test( path ) ) {
						const ext = path.slice( Math.max( 0, path.lastIndexOf( '.' ) + 1 ) );

						// Additional export step required for PNG, SVG and HTML
						$iframe[ 0 ].contentWindow.postMessage( JSON.stringify(
							{
								spin: 'Saving',
								action: 'export',
								format: ( /(\.html)$/i.test( path ) ) ? 'html' : 'xml' + ext,
								xml: msg.xml
							} ), '*' );
					} else {
						// Additional export step required for PNG, SVG and HTML
						$iframe[ 0 ].contentWindow.postMessage( JSON.stringify(
							{
								spin: 'Saving',
								action: 'export',
								format: 'xmlpng',
								xmlpng: content
							} ), '*' );
					}
				} else if ( msg.event === 'exit' ) {
					close();
				}
			}
		};

		window.addEventListener( 'message', receive );
	}

	fd.drawio.prototype = drawio_proto;

	drawio_proto.initialize = function () {
		if ( mw.config.get( 'wgArticleId' ) === 0 ) {
			edit( pageName + '.png' );
		} else {
			const diagramURL = mw.config.get( 'wgServer' ) + mw.config.get( 'wgScript' ) +
				'?title=' + encodeURIComponent( pageName ) + '&action=raw';
			$.get( diagramURL, ( data ) => {
				if ( mw.config.get( 'wgAction' ) == 'editdiagram' ) {
					const $saveInfo = new OO.ui.MessageWidget( {
						type: 'notice',
						label: mw.msg( 'flexdiagrams-drawio-saveinfo', $( '#wpSave' ).attr( 'value' ) )
					} );
					$saveInfo.$element.insertBefore( '#bodyContent' );
					edit( null, data );
				} else {
					const $img = $( '<img>' );
					$img.attr( 'id', 'diagramContainer' );
					$img.attr( 'src', data );
					$( '#canvas' ).append( $img );
				}
			} );
		}

		this.enableSave( this );
	};

	let imgData = null;

	window.addEventListener( 'message', onmessage, false );
	window.onmessage = function ( e ) {
		const obj = JSON.parse( e.data );
		if ( obj.event == 'export' ) {
			imgData = obj.data;
		}
	};

	drawio_proto.exportDiagram = function ( data ) {
		if ( imgData != null ) {
			drawio_proto.updatePageAndRedirectUser( pageName, imgData );
		} else {
			const diagramURL = mw.config.get( 'wgServer' ) + mw.config.get( 'wgScript' ) +
				'?title=' + encodeURIComponent( pageName );
			window.location.href = diagramURL;
		}

	};

	let pageName = $( '#canvas' ).attr( 'data-wiki-page' );
	if ( pageName == null ) {
		pageName = mw.config.get( 'wgPageName' );
	}

	const drawioHandler = new fd.drawio();
	drawioHandler.initialize();

}( jQuery, mediaWiki, flexdiagrams ) );
