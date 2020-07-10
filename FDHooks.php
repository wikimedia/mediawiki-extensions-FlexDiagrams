<?php
/**
 * Static functions called by various outside hooks, as well as by
 * extension.json.
 *
 * @author Yaron Koren
 * @file
 * @ingroup FlexDiagrams
 */

class FDHooks {

	public static function registerExtension() {
		define( 'CONTENT_MODEL_FD_BPMN', 'flexdiagrams-bpmn' );
		define( 'CONTENT_MODEL_FD_GANTT', 'flexdiagrams-gantt' );
		define( 'CONTENT_MODEL_FD_MERMAID', 'flexdiagrams-mermaid' );
	}

	/**
	 * Register the namespaces for Flex Diagrams.
	 * @see https://www.mediawiki.org/wiki/Manual:Hooks/CanonicalNamespaces
	 *
	 * @param array &$list
	 *
	 * @return true
	 */
	public static function registerNamespaces( array &$list ) {
		if ( !defined( 'FD_NS_BPMN' ) ) {
			define( 'FD_NS_BPMN', 740 );
			define( 'FD_NS_BPMN_TALK', 741 );
		}
		if ( !defined( 'FD_NS_GANTT' ) ) {
			define( 'FD_NS_GANTT', 742 );
			define( 'FD_NS_GANTT_TALK', 743 );
		}
		if ( !defined( 'FD_NS_MERMAID' ) ) {
			define( 'FD_NS_MERMAID', 744 );
			define( 'FD_NS_MERMAID_TALK', 745 );
		}

		$list[FD_NS_BPMN] = 'BPMN';
		$list[FD_NS_BPMN_TALK] = 'BPMN_talk';
		$list[FD_NS_GANTT] = 'Gantt';
		$list[FD_NS_GANTT_TALK] = 'Gantt_talk';
		$list[FD_NS_MERMAID] = 'Mermaid';
		$list[FD_NS_MERMAID_TALK] = 'Mermaid_talk';

		return true;
	}

	public static function registerParserFunctions( &$parser ) {
		$parser->setFunctionHook( 'display_diagram', [ 'FDDisplayDiagram', 'run' ] );
		return true;
	}

	static function setGlobalJSVariables( &$vars ) {
		global $wgTitle, $wgServer, $wgScript;

		$vars['wgServer'] = $wgServer;
		$vars['wgScript'] = $wgScript;

		$page = new WikiPage( $wgTitle );
		$vars['wgFlexDiagramsPageTimestamp'] = $page->getTimestamp();

		return true;
	}

	public static function disableParserCache( Parser &$parser, string &$text ) {
		$title = $parser->getTitle();
		$ns = $title->getNamespace();
		if ( $ns == FD_NS_BPMN || $ns == FD_NS_GANTT || $ns == FD_NS_MERMAID ) {
			$parser->getOutput()->updateCacheExpiry( 0 );
		}
	}
}
