<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?php
	error_reporting(E_ALL);
	$outputModules = scandir('./outputModules/');
	$mask = '/^([A-Za-z0-9\-]*)Output.js/';
?>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
	<head>
		<!--
		   Copyright 2009 Ben Olive
		
		   Licensed under the Apache License, Version 2.0 (the "License");
		   you may not use this file except in compliance with the License.
		   You may obtain a copy of the License at
		
			   http://www.apache.org/licenses/LICENSE-2.0
		
		   Unless required by applicable law or agreed to in writing, software
		   distributed under the License is distributed on an "AS IS" BASIS,
		   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
		   See the License for the specific language governing permissions and
		   limitations under the License.
		-->
		<title>Oscar Data Collection</title>
		<link rel="stylesheet" href="style.css" />
		<script type="text/javascript">
			function jsUrl(om) {
				return "javascript:(function(){var sc=document.createElement('script');sc.src='http://<?= $_SERVER['HTTP_HOST']?>/oscar/"
				+ om
				+ "Scraper.js';document.body.appendChild(sc);})();";
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
		<p>This program is very simple to use. Start by searching for the classes you want to scrape in oscar in a separate window. Next, select the format you want the data to be in. When you choose a format, the green box will display a url. Copy the entire url (including "javascript:") into the address bar for the oscar page. When you press enter, you should see the data in the format you selected. </p>
		<form action="#">
			<select name="outputModule" onchange="updateOM(this)" id="changebar">
				<option value="">---Select an Output Format---</option>
				<?php
					foreach ($outputModules as $module) {
						if (preg_match($mask, $module, $matches)) {
							echo '<option value="' . $matches[1] . '">' . $matches[1] . '</option>';
						}
					}
				?>
			</select>
		</form>
		<div id="urlBar">Select an output format to get a url.</div>
		<span class="srcLink" id="scraper"><a href="OscarCrawler.js">View Scraper Source</a></span><br />
		<span class="srcLink" id="outputModule"><a href="outputModules/JSONOutput.js">View Output Module Source</a></span><br />
		<span class="srcLink" id="template"><a href="Output.js">Output Module Template</a></span><br />
	</body>
</html>
