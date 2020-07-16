<?php
/**
 * Content of BPMN Diagrams
 */

class FDBPMNContent extends TextContent {

	public function __construct( $text ,$modelId = CONTENT_MODEL_FD_BPMN ) {
		parent::__construct( $text, $modelId );
	}

	public function getHtml() {
		global $wgOut;
		$wgOut->addModules( 'ext.flexdiagrams.bpmn' );
		$text = Html::element( 'div', [
			'id' => 'canvas',
		],'' );
		$text .= Html::element( 'pre', [], $this->getText() );
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
