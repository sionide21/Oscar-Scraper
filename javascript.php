<?php
	require_once("jsmin-1.1.1.php");
	header("Content-Type: application/javascript");
	$outputFile = './outputModules/' . $_GET['outputModule'] . 'Output.js';
	if (file_exists($outputFile)) {
	print JSMin::minify(file_get_contents($outputFile) . file_get_contents('./OscarCrawler.js'));
	} else {
		die("alert('Could not find output module');");
	}
?>
