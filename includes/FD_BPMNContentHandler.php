<?php
/**
 * Content handler for BPMN XML.
 */

use MediaWiki\Content\Renderer\ContentParseParams;

class FDBPMNContentHandler extends TextContentHandler {

	public function __construct( $modelId = CONTENT_MODEL_FD_BPMN ) {
		parent::__construct( $modelId, [ CONTENT_FORMAT_XML ] );
	}

	protected function getContentClass() {
		return FDBPMNContent::class;
	}

	public function makeEmptyContent() {
		return new FDBPMNContent('');
	}

	public function getActionOverrides() {
		return [
			'editdiagram' => FDEditDiagramAction::class
		];
	}

	/**
	 * Only called for MW 1.38+.
	 */
	protected function fillParserOutput(
		Content $content,
		ContentParseParams $cpoParams,
		ParserOutput &$output
	) {
		$html = $content->getHtml();
		$output->setText( $html );
	}

}
