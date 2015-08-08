Function.prototype.before = function (pointcutName, aspect) {
var object = this;
	var originalPointcut = object.prototype[pointcutName];

	object.prototype[pointcutName] = function () {		
		var args = arguments;
		aspect.apply(null, args);
		result = originalPointcut.apply(this, args);
		return result;
	}
}

Function.prototype.after = function (pointcutName, aspect) {
	var object = this;
	var originalPointcut = object.prototype[pointcutName];

	object.prototype[pointcutName] = function () {		
		var args = arguments;
		result = originalPointcut.apply(this, args);
		aspect.apply(null, args);
		return result;
	}
}

