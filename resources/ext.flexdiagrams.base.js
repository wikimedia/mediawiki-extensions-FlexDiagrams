/*
 * ext.flexdiagrams.base.js
 *
 * Base class for Flex Diagrams classes.
 *
 */

( function ( $, mw, fd ) {
	'use strict';

	/**
	 * Inheritance class for the fd constructor
	 *
	 *
	 * @class
	 */
	fd = fd || {};

	/**
	 * @class
	 * @constructor
	 */
	fd.base = function() {
	};

	fd.base.prototype = {

		getToken: function() {
			var baseUrl = mw.config.get( 'wgScriptPath' );
			var url = baseUrl + '/api.php?action=query&format=json&meta=tokens&type=csrf';
			return $.post( url );
		},

		updatePage: function( pageName, newText ) {
			var baseUrl = mw.config.get( 'wgScriptPath' );
			return $.when( this.getToken() ).then( function successHandler( postResult ){
				var data = {};
				data.action = 'edit';
				var token = postResult.query.tokens.csrftoken;
				data.token = token;
				data.text = newText;
				//data.basetimestamp = mw.config.get( 'wgDiagramsPageTimestamp' );
				data.title = pageName;
				data.summary = $('#wpSummary').val();
				if ( $('#wpMinoredit').prop('checked') ) {
					data.minor = true;
				}
				data.watchlist = ( $('#wpWatchthis').prop('checked') ) ? 'watch' : 'unwatch';
				data.format = 'json';
				return $.ajax( {
					type: 'POST',
					url: baseUrl + '/api.php',
					dataType: 'json',
					data: data
				} );
			});
		},

		updatePageAndRedirectUser: function( pageName, newText ) {
			// Display "loading" image - this will go away if/when
			// the redirect happens.
			var imagesPath = mw.config.get( 'wgScriptPath' ) + "/extensions/PageDiagrams/images/";
			$('#bodyContent').append('<div style="position: fixed; left: 50%; top: 30%;"><img src="' + imagesPath + 'loadingbg.png" /></div>' );
			$('#bodyContent').append('<div style="position: fixed; left: 50%; top: 30%; padding: 48px;"><img src="' + imagesPath + 'loading.gif" /></div>' );
			$.when( this.updatePage( pageName, newText ) ).then(
				function successHandler( result ) {
					if ( "error" in result ) {
						console.error( "Error in updating page: " + result.error.info, { type: 'error' } );
					} else {
						var diagramURL = mw.config.get('wgServer') + mw.config.get('wgScript') + "?title=" + pageName;
						window.location.href = diagramURL;
					}
				},
				function errorHandler( jqXHR, textStatus, errorThrown ){
					var result = jQuery.parseJSON(jqXHR.responseText);
					var text = result.responseText;
					for ( var i = 0; i < result.errors.length; i++ ) {
						text += ' ' + result.errors[i].message;
					}
					alert( "ERROR: " + text );
				}
			);
		},

		// For some reason, the class needs to be passed in as an
		// argument - using the regular "this" doesn't work here.
		enableSave: function( thiss ) {
			$('#wpSave').click(function() {
				thiss.exportDiagram()
			});
			$('#wpSummary, #wpMinoredit, #wpWatchthis').on('keypress', function (e) {
				if (e.which === 13) {
					thiss.exportDiagram();
				}
			});
		}

	};

}( jQuery, mediaWiki, flexdiagrams ) );
