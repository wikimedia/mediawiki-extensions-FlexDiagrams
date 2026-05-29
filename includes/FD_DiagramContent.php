<?php
/**
 * Superclass for content classes defined by the Flex Diagrams extension.
 */

use MediaWiki\Content\TextContent;

class FDDiagramContent extends TextContent {

	/**
	 * @return string The wikitext to include when another page includes this
	 * content, or false if the content is not includable in a wikitext page.
	 */
	public function getWikitextForTransclusion() {
		return '<span class="error">' . wfMessage( 'flexdiagrams-embedding-unsupported' )->plain() . '</span>';
	}
}
