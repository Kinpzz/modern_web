$(function() {
	$('#at-plus-container').hover(init,reset);
});
function init() {
	$('#control-ring').find('li').each(function() {
		$(this).prop('num', 'none');
		var text = $('<span>...</span>');
		text.attr('class', 'number');
		text.hide();
		$(this).append(text);
	});
	changeListClass('active');
	$('#info-bar').attr('class', 'button positive');
	$('#control-ring').click(clickButton);
	$('#info-bar').click(clickSum);
}
function reset() {
	//删除小气泡得数
	$('#control-ring').find('li').each(function() {
		$(this).find('span').remove();
	});
	//清空
	$('#result').html('');
	$('#control-ring').off('click', clickButton);
	$('#info-bar').off('click', clickSum);
}
function clickButton() {
	if($(event.target).prop('num') == 'none') {
		changeListClass('positive');
		$(event.target).attr('class', 'button active');
		getNumber.call(event.target);
	}
}
function changeListClass(str) {
	$('#control-ring').find('li').each(function() {
		if ($(this).prop('num') == 'none') {
			$(this).attr('class', 'button ' + str);
		}
	});
}
//得到每一个小起泡的数
function getNumber() {
	var text = $(this).find('span');
	text.show();
	$('#control-ring').off('click', clickButton);
	// context 指定了相关回调函数的上下文，默认是异步
	var number = $.ajax({url: "/rand", context: text, success: function() {
		$(this).parent().prop('num', number.responseText);
		changeListClass('active');
		$(this).html(number.responseText);
		$('#control-ring').click(clickButton);
	}});
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