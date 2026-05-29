<?php
/**
 * Superclass for content handlers defined by the Flex Diagrams extension.
 */

use MediaWiki\Content\Content;
use MediaWiki\Content\Renderer\ContentParseParams;
use MediaWiki\Content\TextContentHandler;
use MediaWiki\Parser\ParserOutput;

class FDDiagramContentHandler extends TextContentHandler {

	/** @inheritDoc */
	public function __construct( $modelId, $formats ) {
		parent::__construct( $modelId, $formats );
	}

	/**
	 * @return string
	 */
	protected function getContentClass() {
		return FDDiagramContent::class;
	}

	/**
	 * @return FDDiagramContent
	 */
	public function makeEmptyContent() {
		$contentClass = $this->getContentClass();
		return new $contentClass( '' );
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
		$output->setContentHolderText( $html );
	}

}
