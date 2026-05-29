<?php
/**
 * Content handler for Gantt chart JSON, as defined by the DHTMLX library.
 */

class FDGanttContentHandler extends FDDiagramContentHandler {

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
}
