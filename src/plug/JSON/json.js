/**
 * @author fuqiang[designsor@gmail.com]
 * @version 20111024
 * @fileoverview 简单版本object to jsonstring
 */

(function() {
	dshop.add('json', function() {
		var json = function() {
			var toJSON = function(str) {
				return '"' + str.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g, function() {
					var a = arguments[0];
					return (a == '\n') ? '\\n': (a == '\r') ? '\\r': (a == '\t') ? '\\t': ""
				}) + '"'
			}
			return {
				ObjTostr: function(obj) {
					var json = [];
					for (var i in obj) {
						if (!obj.hasOwnProperty(i)) continue;
						//if(typeof this[i] == "function") continue;  
						json.push(toJSON(i) + ":" + ((obj[i] != null) ? toJSON(obj[i]) : "null"))
					}
					return "{" + json.join(",") + "}";
				}
			}
		} ();
		dshop.mods['json'] = json;
	});
})()

