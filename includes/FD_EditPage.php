<?php

use MediaWiki\EditPage\EditPage;

/**
 * EditPage::showStandardInputs() can't directly be called from outside,
 * because it's a protected function, so we use this subclass instead. Using
 * this class also lets us easily make other changes, like customizing the
 * set of buttons and removing the copyright warning (seems unnecessary here).
 */

class FDEditPage extends EditPage {

	public function getEditButtons( &$tabindex ) {
		$buttons = parent::getEditButtons( $tabindex );
		unset( $buttons['preview'] );
		unset( $buttons['diff'] );
		return $buttons;
	}

	/**
	 * @return string
	 */
	protected function getCopywarn() {
		return '';
	}

	function showStandardInputs2() {
		$this->setContextTitle( $this->getTitle() );
		$out = $this->getContext()->getOutput();
		$out->enableOOUI();
		$request = $this->getContext()->getRequest();
		$this->importFormData( $request );
		$this->showStandardInputs();
	}
}
