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

	let changesWereMade = false;

	$( () => {
		let allowCloseWindow;

		// Check if EditWarning is enabled and if we need it.
		if ( !mw.user.options.get( 'useeditwarning' ) ) {
			return true;
		}

		// BPMN and Gantt diagrams.
		// Ideally, this would check if the user made an actual change
		// to the diagram, beyond just clicking on it, but I couldn't
		// figure out how to do that.
		$( 'div#canvas' ).on( 'click', () => {
			changesWereMade = true;
			$( 'div#canvas' ).off( 'click' );
		} );

		// DOT diagrams.
		$( 'textarea.dotCode' ).on( 'keypress', () => {
			changesWereMade = true;
			$( 'textarea.dotCode' ).off( 'keypress' );
		} );

		// Mermaid diagrams.
		$( 'textarea.mermaidCode' ).on( 'keypress', () => {
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
		$( '#wpSave' ).on( 'click', () => {
			allowCloseWindow.release();
		} );
		$( '#wpSummary, #wpMinoredit, #wpWatchthis' ).on( 'keypress', ( e ) => {
			if ( e.which === 13 ) {
				allowCloseWindow.release();
			}
		} );
	} );

}() );
