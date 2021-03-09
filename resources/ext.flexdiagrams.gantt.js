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

	function setGanttZoom( evt ) {
		switch (evt.data) {
			case "hours":
				gantt.config.scales = [
					{unit: "day", step: 1, format: "%d %F"},
					{unit: "hour", step: 1, format: "%h"}
				];
				break;
			case "days":
				gantt.config.scales = [
					{unit: "day", step: 1, format: "%d %M"}
				];
				break;
			case "months":
				gantt.config.scales = [
					{unit: "month", step: 1, format: "%M %Y"}
				];
				break;
			case "years":
				gantt.config.scales = [
					{unit: "year", step: 1, format: "%Y"}
				];
				break;
		}
		gantt.init('canvas');
	}

	var zoomLevels = [ 'hours', 'days', 'months', 'years' ];
	var zoomLevelButtons = [];
	for ( var i = 0; i < zoomLevels.length; i++ ) {
		var zoomLevel = zoomLevels[i];
		zoomLevelButtons.push( new OO.ui.ButtonOptionWidget( {
			data: zoomLevel,
			label: mw.message( 'flexdiagrams-gantt-' + zoomLevel ).text(),
			selected: ( zoomLevel == 'days')
		}) );
	}

	var buttonSelect = new OO.ui.ButtonSelectWidget( {
		items: zoomLevelButtons
	} );

	buttonSelect.on('select', setGanttZoom );

	var zoomLayout = new OO.ui.FieldLayout( buttonSelect, {
		align: 'top',
		label: mw.message( 'flexdiagrams-gantt-zoomlevel' ).text()
	} );

	$('#canvas').after( '<div id="ganttZoomInput"></div><br style="clear: both;" />' );
	$('#ganttZoomInput').append( zoomLayout.$element );

}( jQuery, mediaWiki, flexdiagrams ) );
