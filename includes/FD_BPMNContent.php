<?php
/**
 * Content of BPMN Diagrams
 */

use MediaWiki\Html\Html;

class FDBPMNContent extends FDDiagramContent {

	public function __construct( $text, $modelId = CONTENT_MODEL_FD_BPMN ) {
		parent::__construct( $text, $modelId );
	}

	public function getHtml() {
		global $wgOut, $wgResourceLoaderDebug;

		// Turn on "debug mode" to avoid browser caching, because
		// it can lead to users seeing an old version of the
		// diagram, with bpmn-js.
		$wgResourceLoaderDebug = true;

		$wgOut->addModules( 'ext.flexdiagrams.bpmn.viewer' );
		$text = Html::element( 'div', [
			'id' => 'canvas',
		], '' );
		$text .= Html::element( 'pre', [], $this->mText );
		return $text;
	}
}
