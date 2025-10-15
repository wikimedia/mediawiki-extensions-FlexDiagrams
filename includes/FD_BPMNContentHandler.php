<?php
/**
 * Content handler for BPMN XML.
 */

use MediaWiki\Content\Renderer\ContentParseParams;

class FDBPMNContentHandler extends TextContentHandler {

	/**
	 * @param int $modelId
	 */
	public function __construct( $modelId = CONTENT_MODEL_FD_BPMN ) {
		parent::__construct( $modelId, [ CONTENT_FORMAT_XML ] );
	}

	/**
	 * @return string
	 */
	protected function getContentClass() {
		return FDBPMNContent::class;
	}

	/**
	 * @return FDBPMNContent
	 */
	public function makeEmptyContent() {
		return new FDBPMNContent( '' );
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
		if ( method_exists( $output, 'setRawText' ) ) {
			// MW 1.42+
			$output->setRawText( $html );
		} else {
			$output->setText( $html );
		}
	}

}
