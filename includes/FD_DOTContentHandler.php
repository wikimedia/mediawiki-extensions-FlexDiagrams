<?php
/**
 * Content handler for DOT (Viz-JS) markup.
 */

class FDDOTContentHandler extends FDDiagramContentHandler {

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
}
