<?php
/**
 * Content handler for Mermaid diagrams.
 */

use MediaWiki\Content\Renderer\ContentParseParams;

class FDMermaidContentHandler extends TextContentHandler {

	public function __construct( $modelId = CONTENT_MODEL_FD_MERMAID ) {
		parent::__construct( $modelId, [ CONTENT_FORMAT_TEXT ] );
	}

	protected function getContentClass() {
		return FDMermaidContent::class;
	}

	public function makeEmptyContent() {
		return new FDMermaidContent( '' );
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
