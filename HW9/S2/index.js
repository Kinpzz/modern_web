var number = null;
$(function() {
	$('#at-plus-container').hover(init,reset);
});
function init() {
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
	// 使用了全局变量实现撤回ajax
	if (number != null) {
		number.abort();
	}
}
function defineCallback() {
	var callback = [];
	var button = $('#control-ring').find('li');
	for (var i = 0; i < button.length; i++) {
		callback[i] = function(i) {
			return function() {
				var text = $(button[i]).find('span');
				buttonChange(text);
				number = $.ajax({url: "/rand", context: text, success: function() {
					if (number != null) {
						$(this).parent().prop('num', number.responseText);
						$(this).html(number.responseText);
						//保证得到数据后才执行下一个
						callback[i + 1]();
					}
				}});
			};
		}(i);
	}
	callback[5] = function() {
		clickSum();
	}
	return callback;
}
function buttonChange(text) {
	$(text).show();
	changeListClass('positive');
	$(text).parent().attr('class', 'button active');
}
function robotClick(callback) {
	builtNumber();
	$('#at-plus').unbind('click');
	// 使用机器人点击
	callback[0]();
}


function changeListClass(str) {
	$('#control-ring').find('li').each(function() {
		if ($(this).prop('num') == 'none') {
			$(this).attr('class', 'button ' + str);
		}
	});
}

function clickSum() {
	var sum = 0;
	$('#control-ring').find('li').each(function() {
		sum += parseInt($(this).prop('num'));
	});
	$('#result').html(sum);
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