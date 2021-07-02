<?php

/**
 * Displays a pre-defined form for either creating a new diagram page or
 * editing an existing one.
 *
 * @author Yaron Koren
 * @file
 * @ingroup FlexDiagrams
 */

use MediaWiki\MediaWikiServices;

class FDSpecialEditDiagram extends UnlistedSpecialPage {

	function __construct() {
		parent::__construct( 'EditDiagram' );
	}

	function execute( $query = null ) {
		$this->setHeaders();

		$out = $this->getOutput();

		$pageName = $this->getRequest()->getVal( 'title' );
		$title = Title::newFromText( $pageName );
		if ( $title == null ) {
			return;
		}

		$out->setPageTitle( $this->msg( 'flexdiagrams-edit-title', str_replace( '_', ' ', $pageName ) ) );

		if ( $title->getNamespace() == FD_NS_BPMN ) {
			// Turn on "debug mode" to avoid browser caching,
			// because it can lead to users seeing an old version of
			// the diagram, with bpmn-js.
			global $wgResourceLoaderDebug;
			$wgResourceLoaderDebug = true;
			$out->addModules( 'ext.flexdiagrams.bpmn' );
			$text = '<div id="canvas"></div>' . "\n";
		} elseif ( $title->getNamespace() == FD_NS_GANTT ) {
			$out->addModules( 'ext.flexdiagrams.gantt' );
			$text = '<div id="canvas"></div>' . "\n";
		} elseif ( $title->getNamespace() == FD_NS_MERMAID ) {
			global $wgResourceLoaderDebug;
			$wgResourceLoaderDebug = true;
			$out->addModules( 'ext.flexdiagrams.mermaid' );
			if ( method_exists( MediaWikiServices::class, 'getRevisionLookup' ) ) {
				// MW 1.31+
				$revision = MediaWikiServices::getInstance()
					->getRevisionLookup()
					->getRevisionByTitle( $title );
			} else {
				$revision = Revision::newFromTitle( $title );
			}
			if ( $revision == null ) {
				$mermaidText = '';
			} else {
				$mermaidText = $revision->getContent()->getNativeData();
			}
			$codeMsg = $this->msg( 'flexdiagrams-edit-code' )->parse();
			$previewMsg = $this->msg( 'flexdiagrams-edit-preview' )->parse();
			$text =<<<END
	<div class="mermaidEditPane">
	<div class="mermaidCodePane">
	<h3>$codeMsg</h3>
	<textarea class="mermaidCode" rows="15" cols="15" tabindex="1">$mermaidText</textarea>
	</div>
	<div class="mermaidPreviewPane">
	<h3>$previewMsg</h3>
	<div class="mermaid"></div>
	</div>
	</div>

END;
		} else {
			$out->addHTML( 'Error: invalid namespace for this action.' );
			return;
		}

		$out->addModules( 'ext.flexdiagrams.editwarning' );
		$text = Html::rawElement( 'div', [ 'style' => 'border: 1px solid #c8ccd1; padding: 10px;' ], $text );
		$out->addHTML( $text );

		$article = new Article( $title );
		$flexDiagramsEditPage = new FDEditPage( $article );
		$flexDiagramsEditPage->showStandardInputs2();
	}
}
