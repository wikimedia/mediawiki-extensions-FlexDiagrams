<?php
/**
 * Content handler for DrawIO XML.
 */

class FDDrawioContentHandler extends FDDiagramContentHandler {

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
}
