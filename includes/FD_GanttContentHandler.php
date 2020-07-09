<?php
/**
 * Content handler for Gantt chart JSON, as defined by the DHTMLX library.
 */

class FDGanttContentHandler extends TextContentHandler{
	
	public function __construct( $modelId = CONTENT_MODEL_FD_GANTT ) {
		parent::__construct( $modelId, [ CONTENT_FORMAT_JSON ] );
	}

	protected function getContentClass() {
		return FDGanttContent::class;
	}
    
	public function makeEmptyContent() {
		return new FDGanttContent('');
	}

	public function getActionOverrides() {
		return [
			'editdiagram' => FDEditDiagramAction::class
		];
	}
}
