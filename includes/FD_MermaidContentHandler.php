<?php
/**
 * Content handler for Mermaid diagrams.
 */

class FDMermaidContentHandler extends TextContentHandler {

	/**
	 * @param int $modelId
	 */
	public function __construct( $modelId = CONTENT_MODEL_FD_MERMAID ) {
		parent::__construct( $modelId, [ CONTENT_FORMAT_TEXT ] );
	}

	/**
	 * @return string
	 */
	protected function getContentClass() {
		return FDMermaidContent::class;
	}
}
