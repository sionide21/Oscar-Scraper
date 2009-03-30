oscarCrawler = new (function() {
	var classes = document.getElementsByClassName("datadisplaytable")[0].rows;
	
	var isClass = function(row) {
		var aCell = row.cells[0];
		if (!aCell) {
			return false;
		}
		return (aCell.className.indexOf('dddefault') > -1);
	};
	var isPrevious = function(row) {
		return (row.cells[1].getElementsByTagName('A').length == 0);
	}
	var getCrn = function(crnCell) {
		return crnCell.getElementsByTagName('A')[0].innerHTML;
	};
	var getInstructor = function(iCell) {
		if (iCell.innerHTML.indexOf('TBA') > -1) {
			return '';
		}
		return iCell.innerHTML.split(' ')[0];
	};
	var getRecord = function(row) {
		var data = row.cells;
		return {
			crn: getCrn(data[1]),
			subject: data[2].innerHTML,
			course: data[3].innerHTML,
			section: data[4].innerHTML,
			hours: data[7].innerHTML,
			times: [
				{
					days: data[9].innerHTML,
					time: data[10].innerHTML
				}
			],
			title: data[8].innerHTML,
			capacity: data[11].innerHTML,
			registered: data[12].innerHTML,
			remaining: data[13].innerHTML,
			instructor: getInstructor(data[14]),
			location: data[15].innerHTML
		};
	};
	var addTime = function(record, row) {
		var data = row.cells;
		var time = {
			days: data[8].innerHTML,
			time: data[9].innerHTML
		};
		record.times.push(time);
	};
	
	this.readRecords = function() {
		var records = "";
		var curr = {};
		for (var x=0;x<classes.length;x++) {
			if (isClass(classes[x])) {
				curr = getRecord(classes[x]);
				// loop instead of if incase there are more that two meeting times
				//(I have never seen this before but just in case)
				while (x+1 < classes.length && isPrevious(classes[x+1])) {
					addTime(curr, classes[x+1]);
					x++;
				}
				var isLast = (x+1 == classes.length || (x+2 == classes.length && isPrevious(classes[x+1])));
				records += outputModule.formatRecord(curr, isLast);
			}
		}
		return records;
	};
})();

var output = outputModule.beforeData();
output += oscarCrawler.readRecords();
output += outputModule.afterData();
document.write(output);
document.close();