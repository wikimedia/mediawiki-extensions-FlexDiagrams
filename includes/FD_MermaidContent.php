<?php
/**
 * Content of Mermaid Diagrams
 */

class FDMermaidContent extends TextContent {

	public function __construct( $text, $modelId = CONTENT_MODEL_FD_MERMAID ) {
		parent::__construct( $text, $modelId );
	}

	public function getHtml() {
		// We need to use debug mode because the Mermaid JS
		// file, when minimized by the ResourceLoader, simply
		// doesn't get loaded. It's not becuase the Mermaid JS
		// file is already minimized - the same thing happens
		// with both mermaid.min.js and mermaid.js. (Given that,
		// we're using mermaid.min.js, because it's smaller.)
		global $wgOut, $wgResourceLoaderDebug;
		$wgResourceLoaderDebug = true;
		$wgOut->addModules( 'ext.flexdiagrams.mermaid' );

		$text = Html::element( 'div', [
			'class' => 'mermaid'
		], $this->mText );
		$text .= Html::element( 'pre', [], $this->mText );
		return $text;
	}

	/**
	 * @return string The wikitext to include when another page includes this
	 * content, or false if the content is not includable in a wikitext page.
	 */
	public function getWikitextForTransclusion() {
		return '<span class="error">' . wfMessage( 'flexdiagrams-embedding-unsupported' )->plain() . '</span>';
	}
}
