<?php

use MediaWiki\MediaWikiServices;

/**
 * Handles the "editdiagram" action.
 *
 * @author Yaron Koren
 * @file
 * @ingroup FlexDiagrams
 */

class FDEditDiagramAction extends Action {

	/**
	 * Return the name of the action this object responds to.
	 * @return string lowercase
	 */
	public function getName() {
		return 'editdiagram';
	}

	/**
	 * The main action entry point. Do all output for display and send it
	 * to the context output. Do not use globals $wgOut, $wgRequest, etc,
	 * in implementations; use $this->getOutput(), etc.
	 *
	 * @throws ErrorPageError
	 * @return false
	 */
	public function show() {
		$ed = new FDSpecialEditDiagram();
		$ed->execute();
	}

	/**
	 * Execute the action in a silent fashion: do not display anything or
	 * release any errors.
	 *
	 * @return bool Whether execution was successful
	 */
	public function execute() {
		return true;
	}

	/**
	 * Adds an "action" (i.e., a tab) to edit the current article with
	 * a form.
	 *
	 * @param Title $obj
	 * @param array &$links
	 * @return true
	 */
	static function displayTab( $obj, &$links ) {
		global $wgFlexDiagramsEnabledFormats;

		$title = $obj->getTitle();
		if ( !isset( $title ) ||
			( !in_array( $title->getNamespace(), $wgFlexDiagramsEnabledFormats ) ) ) {
			return true;
		}

		$content_actions = &$links['views'];

		$permissionManager = MediaWikiServices::getInstance()->getPermissionManager();
		$user = RequestContext::getMain()->getUser();

		// Create the form edit tab, and apply whatever changes are
		// specified by the edit-tab global variables.
		if ( $permissionManager->userCan( 'edit', $user, $title ) ) {
			$diagram_edit_tab_msg = $title->exists() ? 'editdiagram' : 'flexdiagrams-creatediagram';
		} else {
			$diagram_edit_tab_msg = 'flexdiagrams-viewdiagram';
		}

		$class_name = ( $obj->getRequest()->getVal( 'action' ) == 'editdiagram' ) ? 'selected' : '';
		$diagram_edit_tab = [
			'class' => $class_name,
			'text' => wfMessage( $diagram_edit_tab_msg )->parse(),
			'href' => $title->getLocalURL( 'action=editdiagram' )
		];

		// Find the location of the 'edit' tab, and add 'edit
		// diagram' right before it.
		// This is a "key-safe" splice - it preserves both the keys
		// and the values of the array, by editing them separately
		// and then rebuilding the array. Based on the example at
		// http://us2.php.net/manual/en/function.array-splice.php#31234
		$tab_keys = array_keys( $content_actions );
		$tab_values = array_values( $content_actions );
		$edit_tab_location = array_search( 'edit', $tab_keys );

		// If there's no 'edit' tab, look for the 'view source' tab
		// instead.
		if ( $edit_tab_location == null ) {
			$edit_tab_location = array_search( 'viewsource', $tab_keys );
		}

		// This should rarely happen, but if there was no edit *or*
		// view source tab, set the location index to -1, so the
		// tab shows up near the end.
		if ( $edit_tab_location == null ) {
			$edit_tab_location = -1;
		}
		array_splice( $tab_keys, $edit_tab_location, 0, 'editdiagram' );
		array_splice( $tab_values, $edit_tab_location, 0, [ $diagram_edit_tab ] );
		$content_actions = [];
		foreach ( $tab_keys as $i => $key ) {
			$content_actions[$key] = $tab_values[$i];
		}

		if ( !$obj->getUser()->isAllowed( 'viewedittab' ) ) {
			// The tab can have either of these two actions.
			unset( $content_actions['edit'] );
			unset( $content_actions['viewsource'] );
		}

		// always return true, in order not to stop MW's hook processing!
		return true;
	}

}
