$(function() {
	$('#reset-info').click(resetInfo);
	$('#submit-info').click(checkInfo);
	$('.group-input').focusin(removeError);
	$('#tel-num').focusout(checkTel);
	$('#email').focusout(checkEmail);
	$('#student-number').focusout(checkStuNum);
	$('#user-name').focusout(checkUserName);
});

function resetInfo() {
	var input = $('.group-input').find('input');
	input.each(function(i) {
		$(input[i]).val('');
		removeError.call(input[i]);
	});
	$('.group-input').find('label').remove();
}
function checkInfo() {
	$('.group-input').find('label').remove();
	checkUserName();
	checkStuNum();
	checkEmail();
	checkTel();
	if (checkUserName() && checkStuNum() && checkEmail() && checkTel()) {
		console.log(true);
		$('#submit-info').attr('type', 'submit');
	}
}
function checkTel() {
	var tel = $('#tel-num');
	if (!(/^[1-9][0-9]{10}$/.test(tel.val()))) {
		return errorDisplay.call(tel, '请输入正确的手机号');
	}
	return true;
}
function checkEmail() {
	var email = $('#email');
	if (!(/^[a-zA-z_\-0-9]+@(([a-zA-z_\-])+\.)+[a-zA-Z]{2,4}$/.test(email.val()))) {
		return errorDisplay.call(email, '请输入正确的邮箱');
	}
	return true;
}
function checkStuNum() {
	var stuNum = $('#student-number');
	if (!(/^[1-9][0-9]{7}$/.test(stuNum.val()))) {
		return errorDisplay.call(stuNum, '请输入正确的学号');
	}
	return true;
}
function checkUserName() {
	var userName = $('#user-name');
	if (/^[A-Za-z]+/.test(userName.val())) {
		if (/^[A-Za-z0-9_]+/.test(userName.val())) {
			if (!(/^[A-Za-z][A-Za-z0-9_]{5,17}$/.test(userName.val()))) {
				return errorDisplay.call(userName, '长度应为6-18位');
			}
		} else {
			return errorDisplay.call(userName, '非法字符');
		}
	} else {
		return errorDisplay.call(userName, '用户名只能以字母开头');
	}
	return true;
}
function errorDisplay(str) {
	var label = $('<label><label>')
	label.html(str);
	label.addClass('error');
	$(this).after(label);
	return false;
}
function removeError() {
	$(event.target).parent().find('label').remove();
}