/**
 * Class for handling Drawio namespace (diagrams.net)
 *
 * @author Sanjay Thiyagarajan
 */
( function ( $, mw, fd ) {

	'use strict';

	var gLinkedPages = {};

	/**
	 * Inheritance class for the fd.base constructor
	 *
	 *
	 * @class
	 */
	fd.base = fd.base || {};

	/**
	 * @class
	 * @constructor
	 */
	fd.drawio = function () {
	};

	var drawio_proto = new fd.base();

	var editor = 'https://embed.diagrams.net/?embed=1&spin=1&proto=json';

	function edit( path, content ) {
		var $iframe = $( '<iframe>' );
		$iframe.attr( 'frameborder', '0' );

		var close = function () {
			var diagramURL = mw.config.get( 'wgServer' ) + mw.config.get( 'wgScript' ) +
				'?title=' + encodeURIComponent( pageName );
			window.location.href = diagramURL;
		};

		var receive = function ( evt ) {
			if ( evt.data.length > 0 ) {
				var msg = JSON.parse( evt.data );

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
					var data = ( msg.data.substring( 0, 5 ) === 'data:' ) ?
						msg.data.substring( msg.data.indexOf( ',' ) + 1 ) :
						btoa( msg.data );
				} else if ( msg.event === 'save' ) {
					if ( ( /\.(png|svg|html)$/i ).test( path ) ) {
						var ext = path.substring( path.lastIndexOf( '.' ) + 1 );

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
		$iframe.attr( 'src', editor );
		$( '#canvas' ).append( $iframe );
	}

	fd.drawio.prototype = drawio_proto;

	drawio_proto.initialize = function () {
		if ( mw.config.get( 'wgArticleId' ) === 0 ) {
			edit( pageName + '.png' );
		} else {
			var diagramURL = mw.config.get( 'wgServer' ) + mw.config.get( 'wgScript' ) +
				'?title=' + encodeURIComponent( pageName ) + '&action=raw';
			$.get( diagramURL, function ( data ) {
				if ( mw.config.get( 'wgAction' ) == 'editdiagram' ) {
					var $saveInfo = new OO.ui.MessageWidget( {
						type: 'notice',
						label: new OO.ui.HtmlSnippet( mw.message( 'flexdiagrams-drawio-saveinfo',
							$( '#wpSave' ).attr( 'value' ) ).text() )
					} );
					$saveInfo.$element.insertBefore( '#bodyContent' );
					edit( null, data );
				} else {
					var $img = $( '<img>' );
					$img.attr( 'id', 'diagramContainer' );
					$img.attr( 'src', data );
					$( '#canvas' ).append( $img );
				}
			} );
		}

		this.enableSave( this );
	};

	var imgData = null;

	window.addEventListener( 'message', onmessage, false );
	window.onmessage = function ( e ) {
		var obj = JSON.parse( e.data );
		if ( obj.event == 'export' ) {
			imgData = obj.data;
		}
	};

	drawio_proto.exportDiagram = function ( data ) {
		if ( imgData != null ) {
			drawio_proto.updatePageAndRedirectUser( pageName, imgData );
		} else {
			var diagramURL = mw.config.get( 'wgServer' ) + mw.config.get( 'wgScript' ) +
				'?title=' + encodeURIComponent( pageName );
			window.location.href = diagramURL;
		}

	};

	var pageName = $( '#canvas' ).attr( 'data-wiki-page' );
	if ( pageName == null ) {
		pageName = mw.config.get( 'wgPageName' );
	}

	var drawioHandler = new fd.drawio();
	drawioHandler.initialize();

}( jQuery, mediaWiki, flexdiagrams ) );
