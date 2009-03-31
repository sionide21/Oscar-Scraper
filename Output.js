/*
 *  Copyright 2009 Ben Olive
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

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