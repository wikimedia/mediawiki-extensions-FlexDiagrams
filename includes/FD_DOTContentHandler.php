<?php
/**
 * Content handler for DOT (Viz-JS) markup.
 */

use MediaWiki\Content\Renderer\ContentParseParams;

class FDDOTContentHandler extends TextContentHandler {

	/**
	 * @param int $modelId
	 */
	public function __construct( $modelId = CONTENT_MODEL_FD_DOT ) {
		parent::__construct( $modelId, [ CONTENT_FORMAT_TEXT ] );
	}

	/**
	 * @return string
	 */
	protected function getContentClass() {
		return FDDOTContent::class;
	}

	/**
	 * @return FDDOTContent
	 */
	public function makeEmptyContent() {
		return new FDDOTContent( '' );
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
