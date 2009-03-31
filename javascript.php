<?php
	require_once("jsmin-1.1.1.php");
	$outputFile = './outputModules/' . $_GET['outputModule'] . 'Output.js';
	if (file_exists($outputFile)) {
	print JSMin::minify(file_get_contents($outputFile) . file_get_contents('./OscarCrawler.js'));
	} else {
		die("alert('Could not find output module');");
	}
?>
