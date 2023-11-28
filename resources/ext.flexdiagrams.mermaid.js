/*
 * ext.flexdiagrams.mermaid.js
 *
 * Class for handling the Mermaid: namespace, and mermaid JS library.
 *
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
	fd.mermaid = function () {
	};

	var mermaid_proto = new fd.base();

	mermaid_proto.initialize = function () {
		mermaid.initialize( { startOnLoad: true } );

		// Create initial "edit diagram" display
		if ( $( '.mermaidCode' ).val() != '' ) {
			$( '.mermaid' ).text( $( '.mermaidCode' ).val() );
			mermaid.init();
		}

		// Enable preview operation within "edit diagram" display
		$( '.mermaidCode' ).on( 'keyup', function () {
			$( '.mermaid' ).removeAttr( 'data-processed' );
			$( '.mermaid' ).text( $( this ).val() );
			mermaid.init();
		} );

		this.enableSave( this );
	};

	mermaid_proto.exportDiagram = function () {
		var mermaidText = $( '.mermaidCode' ).val();
		this.updatePageAndRedirectUser( pageName, mermaidText );
	};

	fd.mermaid.prototype = mermaid_proto;

	var pageName = $( '.mermaid' ).attr( 'data-wiki-page' );
	if ( pageName == null ) {
		pageName = mw.config.get( 'wgPageName' );
	}

	var mermaidHandler = new fd.mermaid();
	mermaidHandler.initialize();

}( jQuery, mediaWiki, flexdiagrams ) );
