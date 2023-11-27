<?php
/**
 * Content handler for Gantt chart JSON, as defined by the DHTMLX library.
 */

use MediaWiki\Content\Renderer\ContentParseParams;

class FDGanttContentHandler extends TextContentHandler {

	/**
	 * @param int $modelId
	 */
	public function __construct( $modelId = CONTENT_MODEL_FD_GANTT ) {
		parent::__construct( $modelId, [ CONTENT_FORMAT_JSON ] );
	}

	/**
	 * @return string
	 */
	protected function getContentClass() {
		return FDGanttContent::class;
	}

	/**
	 * @return FDGanttContent
	 */
	public function makeEmptyContent() {
		return new FDGanttContent( '' );
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
