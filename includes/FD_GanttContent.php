<?php
/**
 * Content of Gantt Diagrams
 */

use MediaWiki\Html\Html;

class FDGanttContent extends FDDiagramContent {

	public function __construct( $text, $modelId = CONTENT_MODEL_FD_GANTT ) {
		parent::__construct( htmlspecialchars( $text, ENT_NOQUOTES ), $modelId );
	}

	public function getHtml() {
		global $wgOut;
		$wgOut->addModules( 'ext.flexdiagrams.gantt' );
		$text = Html::element( 'div', [
			'id' => 'canvas',
		], ' ' );
		$text .= Html::element( 'pre', [], $this->mText );
		return $text;
	}
}
