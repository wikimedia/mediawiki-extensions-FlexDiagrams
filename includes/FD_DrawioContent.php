<?php
/**
 * Content of DrawIO Diagrams
 */

use MediaWiki\Html\Html;

class FDDrawioContent extends FDDiagramContent {

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
}
