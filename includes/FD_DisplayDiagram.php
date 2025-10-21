<?php
/**
 * FDDisplayDiagram - class for the #display_diagram parser function.
 *
 * @author Yaron Koren
 * @ingroup FlexDiagrams
 */

use MediaWiki\Html\Html;
use MediaWiki\MediaWikiServices;
use MediaWiki\Revision\RevisionRecord;
use MediaWiki\Revision\SlotRecord;
use MediaWiki\Title\Title;

class FDDisplayDiagram {

	/** @var int The number of instances of #display_diagram on this page */
	private static $numInstances = 0;

	/** @var ?Config */
	private static $config;

	/**
	 * Handles the #display_diagram parser function - displays the
	 * diagram defined in the specified page.
	 *
	 * @param Parser &$parser
	 * @return string
	 */
	public static function run( &$parser ) {
		$params = func_get_args();
		// we already know the $parser...
		array_shift( $params );

		$parserOutput = $parser->getOutput();

		$diagramPageName = $params[0];

		$diagramPage = Title::newFromText( $diagramPageName );
		if ( !$diagramPage->exists() ) {
			return '<div class="error">' . "Page [[$diagramPage]] does not exist." . '</div>';
		}

		$revRecord = self::getDiagramPageRevisionRecord( $diagramPage );
		if ( $revRecord === null ) {
			return '<div class="error">' . "Page [[$diagramPage]] does not have a revision." . '</div>';
		}

		// Register the diagram page as a tranclusion
		$parserOutput->addTemplate(
			$diagramPage,
			$revRecord->getPageId(),
			$revRecord->getId()
		);

		$diagramType = $diagramPage->getNamespace();

		if ( $diagramType == FD_NS_BPMN || $diagramType == FD_NS_GANTT ) {
			if ( self::$numInstances++ > 0 ) {
				return '<div class="error">Due to current limitations, #display_diagram can only ' .
					'be called once per page on any BPMN or Gantt diagram.</div>';
			}
		}

		switch ( $diagramType ) {
			case FD_NS_BPMN:
				$parserOutput->addModules( [ 'ext.flexdiagrams.bpmn.viewer' ] );
				$text = Html::element( 'div', [
					'id' => 'canvas',
					'data-wiki-page' => $diagramPageName
				], ' ' );
				break;
			case FD_NS_GANTT:
				$parserOutput->addModules( [ 'ext.flexdiagrams.gantt' ] );
				$text = Html::element( 'div', [
					'id' => 'canvas',
					'data-wiki-page' => $diagramPageName
				], ' ' );
				break;
			case FD_NS_DRAWIO:
				$parserOutput->addModules( [ 'ext.flexdiagrams.drawio' ] );
				$renderSVG = self::getConfig()
					->get( 'FlexDiagramsDrawioRenderSVG' ) ? 'true' : 'false';
				$text = Html::element( 'figure', [
					'class' => 'ext-flexdiagrams-diagram-container',
					'data-mw-flexdiagrams-type' => 'drawio',
					'data-mw-flexdiagrams-page' => $diagramPageName,
					'data-mw-flexdiagrams-svg' => $renderSVG,
				], ' ' );
				break;
			case FD_NS_DOT:
				global $wgResourceLoaderDebug;
				$wgResourceLoaderDebug = true;
				$parserOutput->addModules( [ 'ext.flexdiagrams.dot' ] );
				$dotText = self::getDiagramPageContentText( $revRecord );
				$text = Html::rawElement( 'div', [
					'class' => 'dotText'
				], "<nowiki>$dotText</nowiki>" );
				return [ $text, 'noparse' => false, 'isHTML' => false ];
			case FD_NS_MERMAID:
				global $wgResourceLoaderDebug;
				$wgResourceLoaderDebug = true;
				$parserOutput->addModules( [ 'ext.flexdiagrams.mermaid' ] );
				$mermaidText = self::getDiagramPageContentText( $revRecord );
				$text = Html::rawElement( 'div', [
					'class' => 'mermaid'
				], "<nowiki>$mermaidText</nowiki>" );
				return [ $text, 'noparse' => false, 'isHTML' => false ];
			default:
				$text = '<div class="error">Invalid namespace for a diagram page.</div>';
		}

		return [ $text, 'noparse' => true, 'isHTML' => true ];
	}

	/**
	 * @return Config
	 */
	private static function getConfig() {
		if ( self::$config === null ) {
			self::$config = MediaWikiServices::getInstance()
				->getConfigFactory()
				->makeConfig( 'flexdiagrams' );
		}
		return self::$config;
	}

	private static function getDiagramPageRevisionRecord( Title $diagramPage ): ?RevisionRecord {
		return MediaWikiServices::getInstance()
			->getRevisionLookup()
			->getRevisionByTitle( $diagramPage );
	}

	private static function getDiagramPageContentText( RevisionRecord $revRecord ): string {
		$content = $revRecord->getContent( SlotRecord::MAIN );
		if ( $content instanceof TextContent ) {
			return $content->getText();
		}
		return '';
	}
}
