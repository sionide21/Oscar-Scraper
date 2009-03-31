<?php
	error_reporting(E_ALL);
	$outputModules = scandir('./outputModules/');
	$mask = '/^([A-Za-z0-9\-]*)Output.js/';
?>
<html>
	<head>
		<title>Oscar Data Collection</title>
		<link rel="stylesheet" href="style.css" />
		<script>
			function jsUrl(om) {
				return "javascript:(function(){var sc=document.createElement('script');sc.src='http://<?= $_SERVER['HTTP_HOST']?>/oscar/javascript.php?outputModule="
				+ om
				+ "';document.body.appendChild(sc);})();";
			}
			function updateOM(node) {
				if (node.value == '') {
					document.getElementById('urlBar').innerHTML = "Select an output format to get a url."
				} else {
					document.getElementById('urlBar').innerHTML = jsUrl(node.value);
				}
			}
		</script>
	</head>
	<body onload="updateOM(document.getElementById('changebar'))">
		<p>This program is very simple to use. Start by searching for the classes you want to scrape in oscar in a separate window. Next, select the format you want the data to be in. When you choose a format, the green box will display a url. Copy the entire url (including "javascript:") into the address bar for the oscar page. When you press enter, you should see the data in the format you selected. 
		<form action="#">
			<select name="outputModule" onChange="updateOM(this)" id="changebar">
				<option value="">---Select an Output Format---</option>
				<?php
					foreach ($outputModules as $module) {
						if (preg_match($mask, $module, $matches)) {
							print_r($matches);
							echo '<option value="' . $matches[1] . '">' . $matches[1] . '</option>';
						}
					}
				?>
			</select>
		</form>
		<div id="urlBar">Select an output format to get a url.</div>
	</body>
</html>
