// 使用全局变量撤回ajax请求
var number = null;
$(function() {
	$('#at-plus-container').hover(init,reset);
});
function init() {
	builtNumber();
	changeListClass('active');
	$('#info-bar').attr('class', 'button positive');
	//robot
	$('#at-plus').click(robotClick);
}
function reset() {
	//删除小气泡得数
	removeNumber();
	//清空
	$('#result').html('');
	$('#step').html('');
	//robot
	$('#at-plus').unbind('click');
	if (number != null) {
		number.abort();
	}
}
function defineCallback() {
	var callback = [];
	var button = $('#control-ring').find('li');
	// 打乱
	button.sort(function(){ return 0.5 - Math.random(); });
	showStep(button);
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
function robotClick() {
	$('#at-plus').unbind('click');
	var callback = defineCallback();
	// 使用机器人点击
	callback[0]();
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
