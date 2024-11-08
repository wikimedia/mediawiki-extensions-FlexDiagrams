/**
 * Class for handling dot (viz-js) namespace
 *
 * @author Naresh Kumar Babu
 */
( function ( $, mw, fd ) {

	'use strict';

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
	fd.dot = function () {};

	var dot_proto = new fd.base();

	dot_proto.initialize = function () {

		var self = this;

		// Create initial "edit diagram" display
		if ( $( '.dotCode' ).val() != '' ) {
			var diagramURL = mw.config.get( 'wgServer' ) + mw.config.get( 'wgScript' ) +
				'?title=' + encodeURIComponent( pageName ) + '&action=raw';
			$.get( diagramURL, this.openDiagram, 'text' );
		}

		// Enable preview operation within "edit diagram" display
		$( '.dotCode' ).on( 'keyup', function () {
			$( '.dot' ).empty();
			self.openDiagram( $( '.dotCode' ).val() );
		} );

		this.enableSave( this );
	};

	dot_proto.exportDiagram = function () {
		var dotText = $( '.dotCode' ).val();
		this.updatePageAndRedirectUser( pageName, dotText );
	};

	dot_proto.openDiagram = function ( dotText ) {
		Viz.instance().then( function ( dot ) {
			var svg = dot.renderSVGElement( dotText );
			document.getElementsByClassName( 'dot' )[ 0 ].appendChild( svg );
		} );
	};

	fd.dot.prototype = dot_proto;

	var pageName = $( '.dot' ).attr( 'data-wiki-page' );
	if ( pageName == null ) {
		pageName = mw.config.get( 'wgPageName' );
	}

	var dotHandler = new fd.dot();
	dotHandler.initialize();

}( jQuery, mediaWiki, flexdiagrams ) );
