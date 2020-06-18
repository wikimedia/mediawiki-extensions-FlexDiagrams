/*
 * ext.flexdiagrams.bpmn.js
 *
 * Class for handling the BPMN: namespace and bpmn-js library.
 *
 */

( function( $, mw, fd ) {
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
	fd.bpmn = function() {
	};

	var bpmn_proto = new fd.base();

	bpmn_proto.initialize = function() {
		if ( mw.config.get('wgArticleId') == 0 ) {
			bpmnModeler.createDiagram();
		} else {
			var diagramURL = mw.config.get('wgServer') + mw.config.get('wgScript') +
				"?title=" + pageName + "&action=raw";
			$.get(diagramURL, this.openDiagram, 'text');
		}

		this.enableSave(this);
	};

	bpmn_proto.openDiagram = function( bpmnXML ) {
		// Set up diagram - in both edit and display modes.
		bpmnModeler.importXML(bpmnXML, function(err) {
			if (err) {
				return console.error('could not import BPMN 2.0 diagram', err);
			}
			// access modeler components
			var canvas = bpmnModeler.get('canvas');
			// zoom to fit full viewport
			canvas.zoom('fit-viewport');
			// add marker
			canvas.addMarker('SCAN_OK', 'needs-discussion');
		});
	}

	bpmn_proto.exportDiagram = function() {
		var self = this;
		bpmnModeler.saveXML({ format: true }, function(err, xml) {
			if (err) {
				return console.error('could not save BPMN 2.0 diagram', err);
			}
			self.updatePageAndRedirectUser( pageName, xml );
		});
	}

	fd.bpmn.prototype = bpmn_proto;

	var bpmnModeler = new BpmnJS({
		container: '#canvas',
		keyboard: {
			bindTo: window
		}
	});

	var pageName = $('#canvas').attr('data-wiki-page');
	if ( pageName == null ) {
		pageName = mw.config.get('wgPageName');
	}

	var bpmnHandler = new fd.bpmn();
	bpmnHandler.initialize();

}( jQuery, mediaWiki, flexdiagrams ) );
