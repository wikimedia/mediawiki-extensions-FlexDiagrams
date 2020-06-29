<?php
/**
 * Content Handler for Mermaid Diagrams
 */

class FDMermaidContentHandler extends TextContentHandler{
	
    public function __construct( $modelId = CONTENT_MODEL_FD_MERMAID ) {
		parent::__construct( $modelId, [ CONTENT_FORMAT_TEXT ] );
	}

    protected function getContentClass() {
		return FDMermaidContent::class;
    }
    
	public function makeEmptyContent() {
		return new FDMermaidContent('');
	}

	public function getActionOverrides() {
		return [
			'editdiagram' => FDEditDiagramAction::class
		];
	}
}
