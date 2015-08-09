Function.prototype.before = function (pointcutName, advice) {
var object = this;
	var originalPointcut = object.prototype[pointcutName];

	object.prototype[pointcutName] = function () {		
		var args = arguments;
		advice.apply(null, args);
		result = originalPointcut.apply(this, args);
		return result;
	}
}

Function.prototype.after = function (pointcutName, advice) {
	var object = this;
	var originalPointcut = object.prototype[pointcutName];

	object.prototype[pointcutName] = function () {		
		var args = arguments;
		result = originalPointcut.apply(this, args);
		advice.apply(null, args);
		return result;
	}
}

Function.prototype.around = function (pointcutName, advicebefore, adviceAfter) {
	var object = this;
	var originalPointcut = object.prototype[pointcutName];

	object.prototype[pointcutName] = function () {		
		var args = arguments;
		advicebefore.apply(null, args);
		result = originalPointcut.apply(this, args);
		adviceAfter.apply(null, args);
		return result;
	}
}