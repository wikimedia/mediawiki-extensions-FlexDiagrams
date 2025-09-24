/**
 * Class for handling dot (viz-js) namespace
 *
 * @author Naresh Kumar Babu
 * @author Yaron Koren
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
	fd.dot = function () {};

	const dot_proto = new fd.base();

	dot_proto.initialize = function () {

		const self = this;

		if ( $( '.dotText' ).length > 0 ) {
			// Called with #display_diagram.
			Viz.instance().then( ( dot ) => {
				$( '.dotText' ).each( function () {
					const svg = dot.renderSVGElement( $( this ).text() );
					$( this ).empty();
					$( this ).append( svg );
				} );
			} );
		} else if ( $( '.dotCode' ).length > 0 ) {
			// Called with "action=editdiagram".
			$( '.dot' ).empty();
			self.openDiagram( $( '.dotCode' ).val() );

			// Enable preview operation.
			$( '.dotCode' ).on( 'keyup', () => {
				$( '.dot' ).empty();
				self.openDiagram( $( '.dotCode' ).val() );
			} );

			this.enableSave( this );
		} else if ( $( '.dot' ).length > 0 ) {
			// Called on regular viewing of a DOT: page.
			const diagramURL = mw.config.get( 'wgServer' ) + mw.config.get( 'wgScript' ) +
				'?title=' + encodeURIComponent( pageName ) + '&action=raw';
			$.get( diagramURL, this.openDiagram, 'text' );
		}
	};

	dot_proto.exportDiagram = function () {
		const dotText = $( '.dotCode' ).val();
		this.updatePageAndRedirectUser( pageName, dotText );
	};

	dot_proto.openDiagram = function ( dotText ) {
		Viz.instance().then( ( dot ) => {
			try {
				const svg = dot.renderSVGElement( dotText );
				document.getElementsByClassName( 'dot' )[ 0 ].appendChild( svg );
			} catch ( e ) {
				// Bad syntax - do nothing.
			}
		} );
	};

	fd.dot.prototype = dot_proto;

	var pageName = $( '.dot' ).attr( 'data-wiki-page' );
	if ( pageName == null ) {
		pageName = mw.config.get( 'wgPageName' );
	}

	const dotHandler = new fd.dot();
	dotHandler.initialize();

}( jQuery, mediaWiki, flexdiagrams ) );
