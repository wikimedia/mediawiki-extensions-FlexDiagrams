<?php
/**
 * Content Handler for BPMN Diagrams
 */

class FDBPMNContentHandler extends TextContentHandler{
	
    public function __construct( $modelId = CONTENT_MODEL_FD_BPMN ) {
		parent::__construct( $modelId, [ CONTENT_FORMAT_XML ] );
	}

    protected function getContentClass() {
		return FDBPMNContent::class;
    }
    
	public function makeEmptyContent() {
		return new FDBPMNContent('');
	}

	public function getActionOverrides() {
		return [
			'editdiagram' => FDEditDiagramAction::class
		];
	}
}
