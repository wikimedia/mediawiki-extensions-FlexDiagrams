<?php
/**
 * Content of DOT (Viz-JS) Diagrams
 */

use MediaWiki\Html\Html;

class FDDOTContent extends TextContent {

	public function __construct( $text, $modelId = CONTENT_MODEL_FD_DOT ) {
		parent::__construct( $text, $modelId );
	}

	public function getHtml() {
		global $wgOut, $wgResourceLoaderDebug;

		// Turn on "debug mode" to avoid browser caching, because
		// it can lead to users seeing an old version of the
		// diagram, with viz-js.
		$wgResourceLoaderDebug = true;

		$wgOut->addModules( 'ext.flexdiagrams.dot' );
		$text = Html::element( 'div', [
			'class' => 'dot',
		], '' );
		$text .= Html::element( 'pre', [], $this->mText );
		return $text;
	}

	/**
	 * @return string The wikitext to include when another page includes this
	 * content, or false if the content is not includable in a wikitext page.
	 */
	public function getWikitextForTransclusion() {
		return '<span class="error">' . wfMessage( 'flexdiagrams-embedding-unsupported' )->plain() . '</span>';
	}
}
