//使用全局撤回ajax请求
var number = [];
$(function() {
	$('#at-plus-container').hover(init,reset);
});
function init() {
	builtNumber();
	changeListClass('active');
	$('#info-bar').attr('class', 'button positive');
	var callback = defineCallback();
	//robot
	$('#at-plus').click(robotClick.bind(null, callback));
}
function reset() {
	//删除小气泡得数
	removeNumber();
	//清空
	$('#result').html('');
	//robot
	$('#at-plus').unbind('click');
	for (i in number) {
		if (number[i] != null) {
			number[i].abort();
		}
	}
}
function defineCallback() {
	var callback = [];
	var button = $('#control-ring').find('li');
	for (var i = 0; i < button.length; i++) {
		callback[i] = function(i) {
			return function() {
				var text = $(button[i]).find('span');
				if (text.length != 0) {
					text.show();
					// 要换不同的url，否则会被去重
					var randUrl = getRandomNumber(1000);
					number[i] = $.ajax({url: randUrl, context: text, success: function() {
						if (number[i] != null) {
							console.log(number[i]);
							$(this).parent().prop('num', number[i].responseText);
							$(this).html(number[i].responseText);
							// 由于不知道哪一个先到，所以每次检验
							clickSum();
						}
					}});
				}
			};
		}(i);
	}
	return callback;
}
function robotClick(callback) {
	$('#at-plus').unbind('click');
	// 使用机器人点击
	for (i in callback) {
		callback[i]();
	}
}

function changeListClass(str) {
	$('#control-ring').find('li').each(function() {
		if ($(this).prop('num') == 'none') {
			$(this).attr('class', 'button ' + str);
		}
	});
}
function isReady() {
	var list = $('#control-ring').find('li');
	for (var i = 0; i < list.length; i++) {
		if ($(list[i]).prop('num') == 'none') {
			return false;
		}
	}
	return true;
}
function clickSum() {
	if (isReady()) {
		var sum = 0;
		$('#control-ring').find('li').each(function() {
			sum += parseInt($(this).prop('num'));
		});
		$('#result').html(sum);
	}
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
function getRandomNumber(limit) {
  return Math.round(Math.random() * limit);
}