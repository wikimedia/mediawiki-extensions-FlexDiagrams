<?php
/**
 * Content of DRAWIO Diagrams
 */

use MediaWiki\Html\Html;

class FDDrawioContent extends TextContent {

	public function __construct( $text, $modelId = CONTENT_MODEL_FD_DRAWIO ) {
		parent::__construct( $text, $modelId );
	}

	public function getHtml() {
		global $wgOut;

		$wgOut->addModules( 'ext.flexdiagrams.drawio' );
		$text = Html::element( 'div', [
			'data-mw-flexdiagrams-type' => 'drawio',
			'data-mw-flexdiagrams-svg' => $wgOut->getConfig()->get( 'FlexDiagramsDrawioRenderSVG' ) ? 'true' : 'false',
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
