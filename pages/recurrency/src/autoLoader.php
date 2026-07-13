<?php
	spl_autoload_extensions('.php');
	spl_autoload_register('load');

	function load($className) {
		$extension = spl_autoload_extensions();
		$filePath = $_SERVER["DOCUMENT_ROOT"] . "/" . 
			str_replace('\\', '/', $className . $extension);
			
		if (is_file($filePath)) {
			require_once($filePath);
		}
	}
