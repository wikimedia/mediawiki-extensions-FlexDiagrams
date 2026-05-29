<?php
/**
 * Content handler for BPMN XML.
 */

class FDBPMNContentHandler extends FDDiagramContentHandler {

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
}
