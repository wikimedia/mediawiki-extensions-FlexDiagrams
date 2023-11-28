/*
 * JavaScript for displaying a popup warning if the user has made changes to
 * the diagram without saving the page.
 *
 * Based on the file mediawiki.action.edit.editWarning.js in core
 * MediaWiki.
 *
 * @author Yaron Koren
 */
( function () {
	'use strict';

	var changesWereMade = false;

	$( function () {
		var allowCloseWindow;

		// Check if EditWarning is enabled and if we need it.
		if ( !mw.user.options.get( 'useeditwarning' ) ) {
			return true;
		}

		// BPMN and Gantt diagrams.
		// Ideally, this would check if the user made an actual change
		// to the diagram, beyond just clicking on it, but I couldn't
		// figure out how to do that.
		$( 'div#canvas' ).on( 'click', function () {
			changesWereMade = true;
			$( 'div#canvas' ).off( 'click' );
		} );

		// Mermaid diagrams.
		$( 'textarea.mermaidCode' ).on( 'keypress', function () {
			changesWereMade = true;
			$( 'textarea.mermaidCode' ).off( 'keypress' );
		} );

		allowCloseWindow = mw.confirmCloseWindow( {
			test: function () {
				if ( mw.config.get( 'wgAction' ) === 'submit' ) {
					return false;
				}
				return changesWereMade;
			},

			namespace: 'editwarning'
		} );

		// Ignore form submissions.
		$( '#wpSave' ).on( 'click', function () {
			allowCloseWindow.release();
		} );
		$( '#wpSummary, #wpMinoredit, #wpWatchthis' ).on( 'keypress', function ( e ) {
			if ( e.which === 13 ) {
				allowCloseWindow.release();
			}
		} );
	} );

}() );
