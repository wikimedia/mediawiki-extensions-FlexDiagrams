<?php

/**
 * Displays a pre-defined form for either creating a new diagram page or
 * editing an existing one.
 *
 * @author Yaron Koren
 * @file
 * @ingroup FlexDiagrams
 */

use MediaWiki\Html\Html;
use MediaWiki\MediaWikiServices;
use MediaWiki\Revision\SlotRecord;
use MediaWiki\Title\Title;

class FDSpecialEditDiagram extends UnlistedSpecialPage {

	public function __construct() {
		parent::__construct( 'EditDiagram' );
	}

	public function execute( $query = null ) {
		$this->setHeaders();

		$out = $this->getOutput();

		$pageName = $this->getRequest()->getVal( 'title' );
		$title = Title::newFromText( $pageName );
		if ( $title === null ) {
			return;
		}
		$out->addModuleStyles( 'mediawiki.action.edit.styles' );
		$out->setPageTitle( $this->msg( 'flexdiagrams-edit-title', str_replace( '_', ' ', $pageName ) )->escaped() );

		$namespace = $title->getNamespace();
		switch ( $namespace ) {
			case FD_NS_BPMN:
				$text = $this->handleBPMN( $out );
				break;
			case FD_NS_GANTT:
				$text = $this->handleGantt( $out );
				break;
			case FD_NS_DRAWIO:
				$text = $this->handleDrawio( $out );
				break;
			case FD_NS_MERMAID:
				$text = $this->handleMermaid( $out, $title );
				break;
			case FD_NS_DOT:
				$text = $this->handleDot( $out, $title );
				break;
			default:
				$out->addHTML( 'Error: invalid namespace for this action.' );
				return;
		}

		if ( $namespace !== FD_NS_DRAWIO ) {
			// Draw.io does not requires edit warning since the save button will save both the page and the diagram
			$out->addModules( 'ext.flexdiagrams.editwarning' );
			$text = Html::rawElement( 'div',
				[ 'style' => 'border: 1px solid var( --border-color-subtle, #c8ccd1 ); padding: 10px;' ],
				$text
			);
		} else {
			$out->addModuleStyles( 'ext.flexdiagrams.editor.styles' );
		}

		$out->addHTML( $text );

		$article = new Article( $title );
		$flexDiagramsEditPage = new FDEditPage( $article );
		$flexDiagramsEditPage->showStandardInputs2();
	}

	private function handleBPMN( OutputPage $out ): string {
		global $wgResourceLoaderDebug;
		$wgResourceLoaderDebug = true;
		$out->addModules( 'ext.flexdiagrams.bpmn' );
		return '<div id="canvas"></div>' . "\n";
	}

	private function handleGantt( OutputPage $out ): string {
		$out->addModules( 'ext.flexdiagrams.gantt' );
		return '<div id="canvas"></div>' . "\n";
	}

	private function handleDrawio( OutputPage $out ): string {
		$out->addModules( 'ext.flexdiagrams.drawio' );
		return Html::element( 'div', [
			'id' => 'ext-flexdiagrams-editor',
			'class' => 'ext-flexdiagrams-editor',
			'data-mw-flexdiagrams-type' => 'drawio'
		], ' ' );
	}

	private function getRevisionText( Title $title ): string {
		$revisionRecord = MediaWikiServices::getInstance()
			->getRevisionLookup()
			->getRevisionByTitle( $title );
		if ( $revisionRecord === null ) {
			return '';
		}
		return $revisionRecord->getContent( SlotRecord::MAIN )->getText();
	}

	private function handleMermaid( OutputPage $out, Title $title ): string {
		global $wgResourceLoaderDebug;
		$wgResourceLoaderDebug = true;
		$out->addModules( 'ext.flexdiagrams.mermaid' );
		$mermaidText = $this->getRevisionText( $title );
		$codeMsg = $this->msg( 'flexdiagrams-edit-code' )->parse();
		$previewMsg = $this->msg( 'flexdiagrams-edit-preview' )->parse();
		return <<<END
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
	}

	private function handleDot( OutputPage $out, Title $title ): string {
		global $wgResourceLoaderDebug;
		$wgResourceLoaderDebug = true;
		$out->addModules( 'ext.flexdiagrams.dot' );
		$dotText = $this->getRevisionText( $title );
		$codeMsg = $this->msg( 'flexdiagrams-edit-code' )->parse();
		$previewMsg = $this->msg( 'flexdiagrams-edit-preview' )->parse();
		return <<<END
	<div class="dotEditPane">
	<div class="dotCodePane">
	<h3>$codeMsg</h3>
	<textarea class="dotCode" rows="15" cols="15" tabindex="1">$dotText</textarea>
	</div>
	<div class="dotPreviewPane">
	<h3>$previewMsg</h3>
	<div class="dot"></div>
	</div>
	</div>

END;
	}
}
