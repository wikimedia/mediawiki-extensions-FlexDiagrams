<?php

/**
 * Namespace internationalization for the Flex Diagrams extension.
 *
 * @file FDNamespaces.php
 * @ingroup FlexDiagrams
 *
 * @license GPL-2.0-or-later
 * @author Yaron Koren
 */

$namespaceNames = [];

// For wikis where the FlexDiagrams extension is not installed.
if ( !defined( 'FD_NS_BPMN' ) ) {
	define( 'FD_NS_BPMN', 740 );
}

if ( !defined( 'FD_NS_BPMN_TALK' ) ) {
	define( 'FD_NS_BPMN_TALK', 741 );
}

if ( !defined( 'FD_NS_GANTT' ) ) {
	define( 'FD_NS_GANTT', 742 );
}

if ( !defined( 'FD_NS_GANTT_TALK' ) ) {
	define( 'FD_NS_GANTT_TALK', 743 );
}

if ( !defined( 'FD_NS_MERMAID' ) ) {
	define( 'FD_NS_MERMAID', 744 );
}

if ( !defined( 'FD_NS_MERMAID_TALK' ) ) {
	define( 'FD_NS_MERMAID_TALK', 745 );
}

if ( !defined( 'FD_NS_DRAWIO' ) ) {
	define( 'FD_NS_DRAWIO', 746 );
}

if ( !defined( 'FD_NS_DRAWIO_TALK' ) ) {
	define( 'FD_NS_DRAWIO_TALK', 747 );
}

if ( !defined( 'FD_NS_DOT' ) ) {
	define( 'FD_NS_DOT', 748 );
}

if ( !defined( 'FD_NS_DOT_TALK' ) ) {
	define( 'FD_NS_DOT_TALK', 749 );
}

$namespaceNames['en'] = [
	FD_NS_BPMN       => 'BPMN',
	FD_NS_BPMN_TALK  => 'BPMN_talk',
	FD_NS_GANTT      => 'Gantt',
	FD_NS_GANTT_TALK => 'Gantt_talk',
	FD_NS_DRAWIO      => 'Drawio',
	FD_NS_DRAWIO_TALK => 'Drawio_talk',
	FD_NS_MERMAID      => 'Mermaid',
	FD_NS_MERMAID_TALK => 'Mermaid_talk',
	FD_NS_DOT      => 'DOT',
	FD_NS_DOT_TALK => 'DOT_talk'
];
