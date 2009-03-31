/**
 * All output modules must implement this interface.
 */
 function Output() {
 
	/**
	 * Create table statements
	 */
	this.beforeData = function() {
		return "CREATE TABLE Courses (crn INTEGER(5), subject VARCHAR(10), course INTEGER(4), section VARCHAR(10), title VARCHAR(100), capacity INTEGER(3), registered INTEGER(3), instructor VARCHAR(100), location VARCHAR(100), PRIMARY KEY(crn));\n"
        + "CREATE TABLE CourseTimes (crn INTEGER(5), time  VARCHAR(100), days VARCHAR(100));\n";
	};
	
	/**
	 * Insert statement
	 */
	this.formatRecord = function(record, last) {
        // First escape all '
        for (var x in record) {
            // times is an array, escape it itemwise later.
            if (x != 'times') {
                record[x] = record[x].replace(/'/g,"\\'");
            }
        }
		var insert = "INSERT INTO Courses (crn, subject, course, section, title, capacity, registered, instructor, location) VALUES ("
        + "'" + record.crn + "',"
        + "'" + record.subject + "',"
        + "'" + record.course + "',"
        + "'" + record.section + "',"
        + "'" + record.title + "',"
        + "'" + record.capacity + "',"
        + "'" + record.registered + "',"
        + "'" + record.instructor + "',"
        + "'" + record.location
        + "');\n";
        // Add an insert staement for each time
        for (var x = 0; x < record.times.length; x++) {
        	// Don't bother adding TBA to database.
        	if (record.times[x].time != '<abbr title="To Be Announced">TBA</abbr>') {
				// Clean times of '
				for (var i in record.times[x]) {
					record.times[x][i] = record.times[x][i].replace(/'/g,"\\'");
				}
				insert += "INSERT INTO CourseTimes (crn, time, days) VALUES ("
				+ "'" + record.crn + "',"
				+ "'" + record.times[x].time + "',"
				+ "'" + record.times[x].days
				+ "');\n";
         	}   
        }
        return insert;
	};
	
	/**
	 * Nothing to be done
	 */
	 this.afterData = function() {
		return "";
	 };
 }
 
 // This is how you register the output module you are using. 
 // NOTE: only declare one Output module.
 var outputModule = new Output();