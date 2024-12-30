/*
 * ext.flexdiagrams.bpmn.js
 *
 * Class for handling the BPMN: namespace and bpmn-js library.
 *
 */

( function( $, mw, fd ) {
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
	fd.bpmn = function() {
	};

	var bpmn_proto = new fd.base();

	bpmn_proto.initialize = function() {
		if ( mw.config.get('wgArticleId') == 0 ) {
			bpmnModeler.createDiagram();
		} else {
			var diagramURL = mw.config.get('wgServer') + mw.config.get('wgScript') +
				"?title=" + encodeURIComponent(pageName) + "&action=raw";
			$.get(diagramURL, this.openDiagram, 'text');
		}

		this.enableSave(this);
	};

	bpmn_proto.openDiagram = function( bpmnXML ) {
		// Before the diagram gets displayed, go through the BPMN XML
		// to find all labels with the structure "X [[Y]]" - which is
		// the special Flex Diagrams syntax for specifying a linked
		// element - and replace them with just "X", while storing "Y"
		// in a global array so that they can be linked during the
		// display.
		// We could change the names later, during the display - but
		// it's better to do it now, so that bpmn-js can correctly set
		// the placement of each text label, given its correct size.
		if ( mw.config.get( 'wgAction' ) != 'editdiagram' ) {
			var elementRegExp = /bpmn:.* id="([^"]*)" name="([^"]*)"/g;
			var elementMatches = bpmnXML.matchAll(elementRegExp);
			for ( var elementMatch of elementMatches ) {
				var elementLine = elementMatch[0];
				var elementID = elementMatch[1];
				var elementName = elementMatch[2];

				var finalLinkRegExp = /\[\[([^\[]*)\]\]$/;
				var linkMatch = elementName.match(finalLinkRegExp);
				if ( linkMatch == null ) {
					continue;
				}
				var newName = elementName.replace(linkMatch[0], '')
					.replace('&#10;', "\n")
					.trim();
				var newElementLine = elementLine.replace( elementName, newName );
				bpmnXML = bpmnXML.replace( elementLine, newElementLine );

				var pageName = linkMatch[1];
				gLinkedPages[elementID] = pageName;
			}
		}

		// Set up diagram - in both edit and display modes.
		bpmnModeler.importXML( bpmnXML ).then( function() {
			// access modeler components
			var canvas = bpmnModeler.get('canvas');
			// zoom to fit full viewport
			canvas.zoom('fit-viewport');
			// add marker
			// (This line is found in many bpmn-js tutorials, but
			// it causes a JS error when included here.
			// Is it necessary?)
			//canvas.addMarker('SCAN_OK', 'needs-discussion');

			if ( mw.config.get( 'wgAction' ) != 'editdiagram' ) {
				bpmn_proto.applyLinks();
			}
		}).catch( function(err) {
			if (err) {
				return console.error('could not import BPMN 2.0 diagram', err);
			}
		})
	}

	bpmn_proto.exportDiagram = function() {
		var self = this;
		bpmnModeler.saveXML({ format: true } ).then( function(xml) {
			self.updatePageAndRedirectUser( pageName, xml.xml );
		}).catch(function (err) {
			if (err) {
				return console.error('could not save BPMN 2.0 diagram', err);
			}
		});
	}

	/**
	 * Go through the gLinkedPages array and turn each element there into
	 * a link to its respective wiki page. Also add graphical elements to
	 * each such element to make it more obvious, like making the shapes
	 * blue.
	 */
	bpmn_proto.applyLinks = function() {
		var self = this;

		for ( var elementID in gLinkedPages ) {
			$('g[data-element-id="' + elementID + '"').each( function() {
				var linkedPage = gLinkedPages[elementID];
				$(this).click( function( evt ) {
					var newURL = mw.config.get('wgServer') +
						mw.config.get('wgScript') +
						'?title=' + linkedPage;
					if ( evt.ctrlKey ) {
						// ctrl+click opens a new tab.
						window.open( newURL, '_blank' );
					} else {
						window.location.href = newURL;
					}
				} );
				$(this).css('cursor', 'pointer');
				self.setShapeColors( $(this), '#0000EE', '#E9E9FB' );
				$(this).mouseenter( function() {
					//self.setShapeColors( $(this), '#0000BB', '#D9D9F5' );
					self.setShapeColors( $(this), '#0000FF', '#F5F5FF' );
				} );
				$(this).mouseleave( function() {
					self.setShapeColors( $(this), '#0000EE', '#E9E9FB' );
				} );
			});
		}
	}

	bpmn_proto.setShapeColors = function( $shape, strokeColor, fillColor ) {
		$shape.find('g.djs-visual').each( function() {
			$(this).children('rect,circle,polygon').css('fill', fillColor)
				.css('stroke', strokeColor);
			$(this).children('text,path').css('fill', strokeColor);
			$(this).children('path').css('stroke', strokeColor);
		} );
	}

	fd.bpmn.prototype = bpmn_proto;

	var bpmnModeler = new BpmnJS({
		container: '#canvas'
	});

	var pageName = $('#canvas').attr('data-wiki-page');
	if ( pageName == null ) {
		pageName = mw.config.get('wgPageName');
	}

	var bpmnHandler = new fd.bpmn();
	bpmnHandler.initialize();

	// Add a zoom in/zoom out interface, similar to the one found on
	// https://demo.bpmn.io, for both viewing and editing.
	$('.djs-container').append('<div class="fd-djs-zoom djs-palette" style="left: auto; right: 20px;">' +
		'<div class="entry fd-djs-zoom-in">+</div><hr class="separator" /><div class="entry fd-djs-zoom-out">-</div></div>');
	$('.fd-djs-zoom-in').click( function() {
		bpmnModeler.get('zoomScroll').stepZoom(1);
	} );
	$('.fd-djs-zoom-out').click( function() {
		bpmnModeler.get('zoomScroll').stepZoom(-1);
	} );

}( jQuery, mediaWiki, flexdiagrams ) );
