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

			// Remove the 'add'/'+' column.
			for ( var i = gantt.config.columns.length - 1; i >= 0; i-- ) {
				if ( gantt.config.columns[i].name == 'add' ) {
					gantt.config.columns.splice( i, 1 );
				}
			}
		}

		// modeler instance
		gantt.init('canvas');

		if ( mw.config.get( 'wgArticleId' ) != 0 ) {
			var diagramURL = mw.config.get('wgServer') + mw.config.get('wgScript') +
				"?title=" + encodeURIComponent(pageName) + "&action=raw";
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
			case "weeks":
				gantt.config.scales = [
					{unit: "day", step: 7, format: "%d %M"}
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

	var zoomLevels = [ 'hours', 'days', 'weeks', 'months', 'years' ];
	var zoomLevelButtons = [];
	for ( var i = 0; i < zoomLevels.length; i++ ) {
		var zoomLevel = zoomLevels[i];
		zoomLevelButtons.push( new OO.ui.ButtonOptionWidget( {
			data: zoomLevel,
			label: mw.message( 'flexdiagrams-gantt-' + zoomLevel ).text(),
			selected: ( zoomLevel == 'days' )
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

	// Once the diagram has finished loading, get the overall duration of
	// the Gantt chart to figure out what the zoom level should be.
	// @todo - is there a way to do this before the diagram has loaded?
	gantt.attachEvent("onLoadEnd", function() {
		var earliestDate = gantt.getSubtaskDates().start_date;
		var latestDate = gantt.getSubtaskDates().end_date;
		// Duration in milliseconds.
		var duration = latestDate - earliestDate;
		var numDays = Math.floor(duration / 86400000);
		var selectedZoom = 'years';
		if ( numDays < 4 ) {
			selectedZoom = 'hours';
		} else if ( numDays < 60 ) {
			// It's 'days' - we don't need to do anything.
			return;
		} else if ( numDays < 400 ) {
			selectedZoom = 'weeks';
		} else if ( numDays < 730 ) {
			selectedZoom = 'months';
		}

		buttonSelect.selectItemByData(selectedZoom);
	});

}( jQuery, mediaWiki, flexdiagrams ) );
