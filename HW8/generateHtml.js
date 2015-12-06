function errorPage(response, info, error) {
	var email = info.email.replace('%40', '@');
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write('<!--Author by Yan Pengxiang 14331327, group 19, on 5th Dec -->');
	response.write('<!DOCTYPE html>');
	response.write('<html>');
	response.write('<head>');
	response.write('<title>注册</title>');
	response.write('<meta charset=\"utf-8\">');
	response.write('<link rel=\"stylesheet\" type=\"text/css\" href=\"../css/register.css\">');
	response.write('<script type=\"text/javascript\" src=\"../js/jquery.js\"></script>');
	response.write('<script type=\"text/javascript\" src=\"../js/register.js\"></script>');
	response.write('</head>');
	response.write('<body>');
	response.write('<div class=\"reg-body\">');
	response.write('<div class=\"user-image\">');
	response.write('<img src=\"../image/user.jpg\" alt=\"user image\" />');
	response.write('</div>');
	response.write('<div class=\"info-header\">用户注册</div>');
	response.write('<div class=\"reg-form\">');
	response.write('<form action=\"/upload\" method=\"post\">');
	response.write('<div class=\"group-input\">');
	response.write('<div class=\"input-wrapper\">');
	response.write('<input id=\"user-name\" type=\"text\" name=\"username\" placeholder=\"用户名\" value = ' + info.username +' />');
	if (error == 'username') {
		response.write('<label class=\"error\">该用户名已被注册</label>');
	}
	response.write('</div>');
	response.write('<div class=\"input-wrapper\">');
	response.write('<input id=\"student-number\" type=\"text\" name=\"studentnumber\" placeholder=\"学号(8位)\" value = ' + info.studentnumber +' />');
	if (error == 'student number') {
		response.write('<label class=\"error\">该学号已被注册</label>');
	}
	response.write('</div>');
	response.write('<div class=\"input-wrapper\">');
	response.write('<input id=\"tel-num\" type=\"text\" name=\"tel\" placeholder=\"手机号(11位)\" value = ' + info.tel +' />');
	if (error == 'tel') {
		response.write('<label class=\"error\">该手机号已被注册</label>');
	}
	response.write('</div>');
	response.write('<div class=\"input-wrapper\">');
	response.write('<input id=\"email\" type=\"text\" name=\"email\" placeholder=\"邮箱\" value = ' + email +' />');
	if (error == 'email') {
		response.write('<label class=\"error\">该邮箱已被注册</label>');
	}
	response.write('</div>');
	response.write('</div>');
	response.write('<div class=\"input-button\">');
	response.write('<input id=\"reset-info\" class=\"button\" type=\"button\" value=\"重置\"/>');
	response.write('<input id=\"submit-info\" class=\"button\" type=\"button\" value=\"注册\"/>');
	response.write('</div>');
	response.write('</form>');
	response.write('</div>');
	response.write('</div>');
	response.write('</body>');
	response.write('</html>');
	response.end();
}

function infoPage(response, info) {
	var email = info.email.replace('%40', '@');
	response.write('<!--Author by Yan Pengxiang 14331327, group 19, on 5th Dec -->');
	response.write('<!DOCTYPE html>');
	response.write('<html>');
	response.write('<head>');
	response.write('<title>详情</title>');
	response.write('<meta charset=\"utf-8\">');
	response.write('<link rel=\"stylesheet\" type=\"text/css\" href=\"../css/register.css\">');
	response.write('<script type=\"text/javascript\" src=\"../js/jquery.js\"></script>');
	response.write('<script type=\"text/javascript\" src=\"../js/register.js\"></script>');
	response.write('</head>');
	response.write('<body>');
	response.write('<div class=\"reg-body\">');
	response.write('<div class=\"user-image\">');
	response.write('<img src=\"../image/user.jpg\" alt=\"user image\" />');
	response.write('</div>');
	response.write('<div class=\"info-header\">用户详情</div>');
	response.write('<div class=\"reg-form\">');
	response.write('<div class=\"info-list\">');
	response.write('<div>用户名:');
	response.write('<span>' + info.username + '</span>');
	response.write('</div>');
	response.write('<div>学号:');
	response.write('<span>' + info.studentnumber + '</span>');
	response.write('</div>');
	response.write('<div>电话:');
	response.write('<span>' + info.tel + '</span>');
	response.write('</div>');
	response.write('<div>邮箱:');
	response.write('<span>' + email + '</span>');
	response.write('</div>');
	response.write('</div>');
	response.write('<div class=\"input-button\">');
	response.write('<form action=\"/\" type=\"post\">');
	response.write('<input class=\"button\" type=\"submit\" value=\"返回\" />');
	response.write('</form>');
	response.write('</div>');
	response.write('</div>');
	response.write('</div>');
	response.write('</body>');
	response.write('</html>');
	response.end();
}
exports.errorPage = errorPage;
exports.infoPage = infoPage;