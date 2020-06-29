<?php

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

	protected function getCopywarn() {
		return '';
	}

	function showStandardInputs2() {
		$out = $this->context->getOutput();
		$out->enableOOUI();
		$request = $this->context->getRequest();
		$this->importFormData( $request );
		$this->initialiseForm();
		$this->showStandardInputs();
	}
}
