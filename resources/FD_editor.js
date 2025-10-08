/**
 * Shared editor functionality for FlexDiagrams
 * Provides common features like fullscreen toggle for all editors
 */
( function ( $, mw, fd ) {

	'use strict';

	fd.editor = fd.editor || {};

	const FULLSCREEN_LABEL = mw.msg( 'flexdiagrams-editor-fullscreen' );
	const EXIT_FULLSCREEN_LABEL = mw.msg( 'flexdiagrams-editor-exit-fullscreen' );

	let listenerAttached = false;
	let fullscreenButtonWidget;

	/**
	 * Toggles fullscreen mode for a container element.
	 *
	 * @param {string} containerId - The ID of the container element.
	 * @return {void}
	 */
	function toggleFullscreen( containerId ) {
		const container = document.getElementById( containerId );
		if ( !container ) {
			return;
		}

		if ( !document.fullscreenElement ) {
			// Enter fullscreen
			if ( container.requestFullscreen ) {
				container.requestFullscreen();
			} else if ( container.webkitRequestFullscreen ) {
				container.webkitRequestFullscreen();
			} else if ( container.msRequestFullscreen ) {
				container.msRequestFullscreen();
			}
		} else {
			// Exit fullscreen
			if ( document.exitFullscreen ) {
				document.exitFullscreen();
			} else if ( document.webkitExitFullscreen ) {
				document.webkitExitFullscreen();
			} else if ( document.msExitFullscreen ) {
				document.msExitFullscreen();
			}
		}
	}

	/**
	 * Creates a fullscreen toggle button.
	 *
	 * @param {string} containerId - The ID of the container element to make fullscreen.
	 * @return {jQuery} The fullscreen button element.
	 */
	function createFullscreenButton( containerId ) {
		fullscreenButtonWidget = new OO.ui.ButtonWidget( {
			icon: 'fullScreen',
			title: FULLSCREEN_LABEL,
			classes: [ 'ext-flexdiagrams-editor-fullscreen-button' ]
		} );

		fullscreenButtonWidget.on( 'click', () => {
			toggleFullscreen( containerId );
		} );

		return fullscreenButtonWidget.$element;
	}

	/**
	 * Sets up a listener for fullscreen change events to update the button.
	 *
	 * @return {void}
	 */
	function setupFullscreenListener() {
		if ( listenerAttached ) {
			return;
		}
		document.addEventListener( 'fullscreenchange', () => {
			if ( fullscreenButtonWidget ) {
				if ( document.fullscreenElement ) {
					fullscreenButtonWidget.setIcon( 'exitFullscreen' );
					fullscreenButtonWidget.setTitle( EXIT_FULLSCREEN_LABEL );
				} else {
					fullscreenButtonWidget.setIcon( 'fullScreen' );
					fullscreenButtonWidget.setTitle( FULLSCREEN_LABEL );
				}
			}
		} );
		listenerAttached = true;
	}

	/**
	 * Creates an editor container with an iframe and optional fullscreen button.
	 *
	 * @param {jQuery} $container - The container element.
	 * @param {Object} options - Configuration options.
	 * @param {string} options.src - Source URL for the iframe.
	 * @param {boolean} options.allowFullscreen - Whether to enable fullscreen functionality.
	 * @return {jQuery} The created iframe element.
	 */
	fd.editor.createEditor = function ( $container, options = {} ) {
		const defaults = {
			src: '',
			allowFullscreen: false
		};

		const config = Object.assign( {}, defaults, options );

		const containerId = $container.attr( 'id' );

		if ( config.allowFullscreen && !containerId ) {
			// eslint-disable-next-line no-console
			console.error( 'FlexDiagrams: The container for a fullscreen editor must have an ID.' );
		}

		$container.css( {
			position: 'relative',
			margin: '-10px', // Counteract the margin added by the container
			height: '80vh'
		} );

		const $iframe = $( '<iframe>' )
			.attr( 'id', 'ext-flexdiagram-editor-iframe' )
			.attr( 'src', config.src )
			.attr( 'frameborder', '0' )
			.css( {
				width: '100%',
				height: '100%'
			} );

		if ( config.allowFullscreen ) {
			$iframe.attr( 'allow', 'fullscreen' );
			const $fullscreenBtn = createFullscreenButton( containerId );
			$container.append( $fullscreenBtn );
			setupFullscreenListener();
		}

		$container.append( $iframe );

		return $iframe;
	};

}( jQuery, mediaWiki, flexdiagrams ) );
