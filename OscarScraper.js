var Ext = {};
Ext.util = {};

/**
 * @class Ext.util.JSON
 * Modified version of Douglas Crockford"s json.js that doesn"t
 * mess with the Object prototype 
 * http://www.json.org/js.html
 * @singleton
 */
Ext.util.JSON = new (function(){
    var useHasOwn = {}.hasOwnProperty ? true : false;
    
    // crashes Safari in some instances
    //var validRE = /^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/;
    
    var pad = function(n) {
        return n < 10 ? "0" + n : n;
    };
    
    var m = {
        "\b": '\\b',
        "\t": '\\t',
        "\n": '\\n',
        "\f": '\\f',
        "\r": '\\r',
        '"' : '\\"',
        "\\": '\\\\'
    };

    var encodeString = function(s){
        if (/["\\\x00-\x1f]/.test(s)) {
            return '"' + s.replace(/([\x00-\x1f\\"])/g, function(a, b) {
                var c = m[b];
                if(c){
                    return c;
                }
                c = b.charCodeAt();
                return "\\u00" +
                    Math.floor(c / 16).toString(16) +
                    (c % 16).toString(16);
            }) + '"';
        }
        return '"' + s + '"';
    };
    
    var encodeArray = function(o){
        var a = ["["], b, i, l = o.length, v;
            for (i = 0; i < l; i += 1) {
                v = o[i];
                switch (typeof v) {
                    case "undefined":
                    case "function":
                    case "unknown":
                        break;
                    default:
                        if (b) {
                            a.push(',');
                        }
                        a.push(v === null ? "null" : Ext.util.JSON.encode(v));
                        b = true;
                }
            }
            a.push("]");
            return a.join("");
    };
    
    var encodeDate = function(o){
        return '"' + o.getFullYear() + "-" +
                pad(o.getMonth() + 1) + "-" +
                pad(o.getDate()) + "T" +
                pad(o.getHours()) + ":" +
                pad(o.getMinutes()) + ":" +
                pad(o.getSeconds()) + '"';
    };
    
    /**
     * Encodes an Object, Array or other value
     * @param {Mixed} o The variable to encode
     * @return {String} The JSON string
     */
    this.encode = function(o){
        if(typeof o == "undefined" || o === null){
            return "null";
        }else if(o instanceof Array){
            return encodeArray(o);
        }else if(o instanceof Date){
            return encodeDate(o);
        }else if(typeof o == "string"){
            return encodeString(o);
        }else if(typeof o == "number"){
            return isFinite(o) ? String(o) : "null";
        }else if(typeof o == "boolean"){
            return String(o);
        }else {
            var a = ["{"], b, i, v;
            for (i in o) {
                if(!useHasOwn || o.hasOwnProperty(i)) {
                    v = o[i];
                    switch (typeof v) {
                    case "undefined":
                    case "function":
                    case "unknown":
                        break;
                    default:
                        if(b){
                            a.push(',');
                        }
                        a.push(this.encode(i), ":",
                                v === null ? "null" : this.encode(v));
                        b = true;
                    }
                }
            }
            a.push("}");
            return a.join("");
        }
    };
    
    /**
     * Decodes (parses) a JSON string to an object. If the JSON is invalid, this function throws a SyntaxError.
     * @param {String} json The JSON string
     * @return {Object} The resulting object
     */
    this.decode = function(json){
        return eval("(" + json + ')');
    };
})();



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
		var records = [];
		var prev = {};
		for (var x=0;x<classes.length;x++) {
			if (isClass(classes[x])) {
				if (isPrevious(classes[x])) {
					addTime(prev, classes[x]);
				} else {
					prev = getRecord(classes[x]);
					records.push(prev);
				}
			}
		}
		return records;
	};
})();

document.write(Ext.util.JSON.encode(oscarCrawler.readRecords()));
document.close();