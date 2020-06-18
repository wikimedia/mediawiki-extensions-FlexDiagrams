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

		define( 'CONTENT_MODEL_FD_BPMN', 'flexdiagrams-bpmn' );

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

	/**
	 * This function is called by the 'ArticleAfterFetchContentObject' hook.
	 * That hook was deprecated in MW 1.31 and replaced by the
	 * 'ArticleRevisionViewCustom' hook, but that hook unfortunately had
	 * a bug in the way it's called until MW 1.34 (the development of this
	 * extension uncovered it!), so we'll keep using the deprecated hook
	 * for a while.
	 */
	public static function displayPage( &$article, Content &$content = null ) {
/*
		global $wgFlexDiagramsEnabledFormats;

		$ns = $article->getTitle()->getNamespace();
		if ( !in_array( $ns, $wgFlexDiagramsEnabledFormats ) ) {
			return true;
		}

		$request = $article->getContext()->getRequest();
		$out = $article->getContext()->getOutput();
		if ( $request->getCheck( 'action' ) &&
			$request->getVal( 'action' ) != 'view' ) {
			return true;
		}
		if ( $request->getCheck( 'type' ) ) {
			return true;
		}

		$text = $content->getNativeData();

		if ( $ns == FD_NS_BPMN ) {
			$out->addModules( 'ext.flexdiagrams.bpmn.viewer' );

			$newText = <<<END
<div id="canvas"></div>

<pre>$text</pre>

END;
		} elseif ( $ns == FD_NS_GANTT ) {
			$out->addModules( 'ext.flexdiagrams.gantt' );

			$newText = <<<END
<div id="canvas"></div>

<pre>$text</pre>

END;
		} elseif ( $ns == FD_NS_MERMAID ) {
			// We need to use debug mode because the Mermaid JS
			// file, when minimized by the ResourceLoader, simply
			// doesn't get loaded. It's not becuase the Mermaid JS
			// file is already minimized - the same thing happens
			// with both mermaid.min.js and mermaid.js. (Given that,
			// we're using mermaid.min.js, because it's smaller.)
			global $wgResourceLoaderDebug;
			$wgResourceLoaderDebug = true;
			$out->addModules( 'ext.flexdiagrams.mermaid' );

			$newText = <<<END
<div class="mermaid"><nowiki>$text</nowiki></div>

<pre>$text</pre>

END;
		}

		$content = new WikitextContent( $newText );
*/

		return true;
	}

	public static function disableParserCache( Parser &$parser, string &$text ) {
		$title = $parser->getTitle();
		$ns = $title->getNamespace();
		if ( $ns == FD_NS_BPMN || $ns == FD_NS_GANTT || $ns == FD_NS_MERMAID ) {
			$parser->disableCache();
		}
	}

}
