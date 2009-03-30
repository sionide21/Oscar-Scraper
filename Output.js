/**
 * All output modules must implement this interface.
 */
 function Output() {
 
	/**
	 * This is called before any data is parsed. Return any header
	 * info for the output type. For example, the column names in a csv.
	 */
	this.beforeData = function() {
		return "";
	};
	
	/**
	 * This is called for each record parsed. return the appropriate text
	 * for a record of the format you are implementing. Last is a boolean
	 * determining whether more records follow. 
	 */
	this.formatRecord = function(record, last) {
		return "";
	};
	
	/**
	 * Called after all records are parsed. Return any footer info
	 * for the output type.
	 */
	 this.afterData = function() {
		return "";
	 };
 }
 
 // This is how you register the output module you are using. 
 // NOTE: only declare one Output module.
 var outputModule = new Output();