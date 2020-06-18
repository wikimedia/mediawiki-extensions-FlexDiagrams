/*
 * ext.flexdiagrams.gantt.js
 *
 * Class for handling the Gantt: namespace, and dhtmlxGantt JS library.
 *
 */

( function( $, mw, dg ) {
	'use strict';

	/**
	 * Inheritance class for the dg.base constructor
	 *
	 *
	 * @class
	 */
	dg.base = dg.base || {};

	/**
	 * @class
	 * @constructor
	 */
	dg.gantt = function() {
	};

	var gantt_proto = new dg.base();

	gantt_proto.initialize = function() {
		if ( mw.config.get( 'wgAction' ) != 'editdiagram' ) {
			gantt.config.readonly = true;
		}

		// modeler instance
		gantt.init('canvas');

		if ( mw.config.get( 'wgArticleId' ) != 0 ) {
			var diagramURL = mw.config.get('wgServer') + mw.config.get('wgScript') +
				"?title=" + pageName + "&action=raw";
			gantt.load(diagramURL);
		}

		this.enableSave( this );
	};

	gantt_proto.exportDiagram = function() {
		var jsonText = JSON.stringify(gantt.serialize());
		this.updatePageAndRedirectUser( pageName, jsonText );
	}

	dg.gantt.prototype = gantt_proto;

	var pageName = $('#canvas').attr('data-wiki-page');
	if ( pageName == null ) {
		pageName = mw.config.get('wgPageName');
	}

	var ganttHandler = new dg.gantt();
	ganttHandler.initialize();

}( jQuery, mediaWiki, flexdiagrams ) );
