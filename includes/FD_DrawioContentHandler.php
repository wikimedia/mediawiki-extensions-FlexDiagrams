<?php
/**
 * Content handler for DRAWIO XML.
 */

use MediaWiki\Content\Renderer\ContentParseParams;

class FDDrawioContentHandler extends TextContentHandler {

	/**
	 * @param int $modelId
	 */
	public function __construct( $modelId = CONTENT_MODEL_FD_DRAWIO ) {
		parent::__construct( $modelId, [ CONTENT_FORMAT_XML ] );
	}

	/**
	 * @return string
	 */
	protected function getContentClass() {
		return FDDrawioContent::class;
	}

	/**
	 * @return FDDrawioContent
	 */
	public function makeEmptyContent() {
		return new FDDrawioContent( '' );
	}

	/**
	 * @return string[]
	 */
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
