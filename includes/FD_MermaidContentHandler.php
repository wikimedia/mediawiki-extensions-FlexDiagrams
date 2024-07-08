<?php
/**
 * Content handler for Mermaid diagrams.
 */

use MediaWiki\Content\Renderer\ContentParseParams;

class FDMermaidContentHandler extends TextContentHandler {

	/**
	 * @param int $modelId
	 */
	public function __construct( $modelId = CONTENT_MODEL_FD_MERMAID ) {
		parent::__construct( $modelId, [ CONTENT_FORMAT_TEXT ] );
	}

	/**
	 * @return string
	 */
	protected function getContentClass() {
		return FDMermaidContent::class;
	}

	/**
	 * @return FDMermaidContent
	 */
	public function makeEmptyContent() {
		return new FDMermaidContent( '' );
	}

	/**
	 * @return string[]
	 */
	public function getActionOverrides() {
		return [
			'editdiagram' => FDEditDiagramAction::class
		];
	}

	protected function fillParserOutput(
		Content $content,
		ContentParseParams $cpoParams,
		ParserOutput &$output
	) {
		$html = $content->getHtml();
		$output->setText( $html );
	}

}
