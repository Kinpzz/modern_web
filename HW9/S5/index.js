$(function() {
	var ajaxState = storeAjax();
	setButtonHandler.call(null, ajaxState);
	$('#at-plus-container').hover(init.bind(null, ajaxState),reset.bind(null, ajaxState));
});
function init(ajaxState) {
	builtNumber();
	changeListClass('active');
	// 清除异步可能产生数据
	$('#message').show();
	$('#message').html('');
	$('#result').html('');

	$('#info-bar').attr('class', 'button positive');
	//robot
	$('#at-plus').click(robotClick.bind(null,ajaxState));
}
function reset(ajaxState) {
	//删除小气泡得数
	removeNumber();
	//清空
	$('#step').html('');
	$('#message').hide();
	//robot
	$('#at-plus').unbind('click');
	
	$('#control-ring').find('li').each(function() {
		$(this).unbind('done');
	});
	var number = ajaxState();
	if (number != null) {
		number.abort();
	}
}

function robotClick(ajaxState) {
	$('#at-plus').unbind('click');
	var button = randButton.call(null, ajaxState);
	showStep(button);
}
function randButton(ajaxState) {
	var button = $('#control-ring').find('li');
	button.sort(function() { return 0.5 - Math.random();});
	// 闭包回调函数
	var callback = getCurrentSum();
	// 顺序的按键绑定随机事件
	for (var i = 0; i < button.length - 1; i++) {
		$(button[i]).on('done', $(button[i + 1]).prop('handler').bind(null, callback, ajaxState));
	}
	$(button[button.length - 1]).on('done', bubbleHandler.bind(null, callback));
	// 执行开头
	$(button[0]).prop('handler').call(null, callback, ajaxState);
	return button;
}
function setButtonHandler() {
	$('#button-A').prop('handler', function() {return aHandler;});
	$('#button-B').prop('handler', function() {return bHandler;});
	$('#button-C').prop('handler', function() {return cHandler;});
	$('#button-D').prop('handler', function() {return dHandler;});
	$('#button-E').prop('handler', function() {return eHandler;});
}
function bubbleHandler(callback) {
	try {
		var sum = callback();
		$('#result').html(sum);
		if (0.5 - Math.random() > 0) {
			throw new ErrorMessage('楼主异步调用战斗力感人, 目测超过', callback());
		} else {
			$('#message').html('楼主异步调用战斗力感人, 目测不超过' + sum);
		}
	} catch(err) {
		$('#message').html(err.message + err.currentSum);
	}
}
// 通过闭包的回调函数 传递参数
function getCurrentSum() {
	var currentSum = 0;
	return function(newNum) {
		if (typeof newNum != 'undefined') {
			currentSum += parseInt(newNum);
		} else {
			return currentSum;
		}
	};
}
function storeAjax() {
	var number = null;
	return function(num) {
		if (typeof num != 'undefined') {
			number = num;
		} else {
			// 获取number对象
			return number;
		}
	}
}
function ErrorMessage(message, currentSum) {
	this.message = message;
	this.currentSum = currentSum;
}
function aHandler(callback, ajaxState) {
	var text = $('#button-A').find('span');
	try {
		buttonChange(text);
		var number = $.ajax({url: '/rand', context: text, success: function() {
			if (ajaxState() != null) {
				$(this).parent().prop('num', number.responseText);
				$(this).html(number.responseText);
				callback(number.responseText);
				$('#button-A').trigger('done');
			}
		}});
		ajaxState(number);
		if (0.5 - Math.random() > 0) {
			throw new ErrorMessage('这不是一个天大的秘密', callback());
		} else {
			$('#message').html('这是一个天大的秘密');
		}
	} catch(err) {
		$('#message').html(err.message);
	}
}

function bHandler(callback, ajaxState) {
	var text = $('#button-B').find('span');
	try {
		buttonChange(text);
		var number = $.ajax({url: '/rand', context: text, success: function() {
			if (ajaxState() != null) {
				$(this).parent().prop('num', number.responseText);
				$(this).html(number.responseText);
				callback(number.responseText);
				$('#button-B').trigger('done');
			}
		}});
		ajaxState(number);
		if (0.5 - Math.random() > 0) {
			throw new ErrorMessage('我知道', callback());
		} else {
			$('#message').html('我不知道');
		}
	} catch(err) {
		$('#message').html(err.message);
	}
}

function cHandler(callback, ajaxState) {
	var text = $('#button-C').find('span');
	try {
		buttonChange(text);
		var number = $.ajax({url: '/rand', context: text, success: function() {
			if (ajaxState() != null) {
				$(this).parent().prop('num', number.responseText);
				$(this).html(number.responseText);
				callback(number.responseText);
				$('#button-C').trigger('done');
			}
		}});
		ajaxState(number);
		if (0.5 - Math.random() > 0) {
			throw new ErrorMessage('你知道', callback());
		} else {
			$('#message').html('你不知道');
		}
	} catch(err) {
		$('#message').html(err.message);
	}
}

function dHandler(callback, ajaxState) {
	var text = $('#button-D').find('span');
	try {
		buttonChange(text);
		var number = $.ajax({url: '/rand', context: text, success: function() {
			if (ajaxState() != null) {
				$(this).parent().prop('num', number.responseText);
				$(this).html(number.responseText);
				callback(number.responseText);
				$('#button-D').trigger('done');
			}
		}});
		ajaxState(number);
		if (0.5 - Math.random() > 0) {
			throw new ErrorMessage('他知道', callback());
		} else {
			$('#message').html('他不知道');
		}
	} catch(err) {
		$('#message').html(err.message);
	}
}

function eHandler(callback, ajaxState) {
	var text = $('#button-E').find('span');
	try {
		buttonChange(text);
		var number = $.ajax({url: '/rand', context: text, success: function() {
			if (ajaxState() != null) {
				$(this).parent().prop('num', number.responseText);
				$(this).html(number.responseText);
				callback(number.responseText);
				$('#button-E').trigger('done');
			}
		}});
		ajaxState(number);
		if (0.5 - Math.random() > 0) {
			throw new ErrorMessage('才怪', callback());
		} else {
			$('#message').html('不是才怪');
		}
	}  catch(err) {
		$('#message').html(err.message);
	}
}

function buttonChange(text) {
	$(text).show();
	changeListClass('positive');
	$(text).parent().attr('class', 'button active');
}
function showStep(arr) {
	var step = $('#step').html();
	$(arr).each(function(i) {
		id = $(arr[i]).attr('id').split('button-')[1];
		if (step == '') {
			step += id;
		} else {
			step += '->' + id;
		}
	});
	$('#step').html(step);
}
function changeListClass(str) {
	$('#control-ring').find('li').each(function() {
		if ($(this).prop('num') == 'none') {
			$(this).attr('class', 'button ' + str);
		}
	});
}

function builtNumber() {
	$('#control-ring').find('li').each(function() {
		$(this).prop('num', 'none');
		var text = $('<span>...</span>');
		text.attr('class', 'number');
		text.hide();
		$(this).append(text);
	});
}
function removeNumber() {
	$('#control-ring').find('li').each(function() {
		$(this).find('span').remove();
	});
}
