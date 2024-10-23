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
		var diagramURL = mw.config.get( 'wgServer' ) + mw.config.get( 'wgScript' ) +
			'?title=' + encodeURIComponent( pageName ) + '&action=raw';
		$.get( diagramURL, this.openDiagram, 'text' );
	};

	dot_proto.openDiagram = function ( dot_markup ) {
		Viz.instance().then( function ( dot ) {
			var svg = dot.renderSVGElement( dot_markup );
			document.getElementById( 'canvas' ).appendChild( svg );
		} );
	};

	fd.dot.prototype = dot_proto;

	var pageName = $( '#canvas' ).attr( 'data-wiki-page' );
	if ( pageName == null ) {
		pageName = mw.config.get( 'wgPageName' );
	}

	var dotHandler = new fd.dot();
	dotHandler.initialize();

}( jQuery, mediaWiki, flexdiagrams ) );
