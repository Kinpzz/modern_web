window.onload = function() {
	// 在计算器的键区搜索input的标签并存为数组
	var button = document.getElementById('calculator-button-area');
	var input = button.getElementsByTagName('input');
	// 获取两个屏幕的元素
	var process = document.getElementById('screen-inputnum');
	var result = document.getElementById('screen-outputnum');

	// 通过循环对每一个按键重复下列点击触发的函数
	for (var i = 0; i < input.length; i++) {
		input[i].onclick = function() {
			if (this.value == 'CE') {
				process.value = '';
				result.value = '0';
			} else if (this.value == '=') {
				// 用正则表达式将开头为0的数字，如020转化为20，避免八进制错误
				var temp = process.value;
				temp = temp.replace(/^0+/g, "");
				temp = temp.replace(/\+0+/g, "+");
				temp = temp.replace(/-0+/g, "-");
				temp = temp.replace(/\*0+/g, "*");
				temp = temp.replace(/\/0+/g, "/");
				temp = temp.replace(/%0+/g, "%");
				temp = temp.replace(/\(0+/g, "(");
				process.value = temp;
				// 使用正则表达式排除多个除号合法的情况
				var re = /\/{2,}/;
				if (re.exec(process.value) != null) {
					alert("非法输入，请重新输入");
					process.value = '';
					result.value = '0';
				} else if (process.value.indexOf('/0') >= 0) { //判断是否把0作为除数
					alert("0不能作为除数，请重新输入");
					process.value = '';
					result.value = '0';
				} else {
				    // 利用eval错误时抛出的异常来判断是否非法输入
					try {
						// 保留部分精度以去除精度误差
						var outcome = eval(process.value, 8).toFixed(8);
					} catch(e) {
						alert("非法输入，请重新输入");
						outcome = 0;
					}
					//用parseFloat去除多余的0
					result.value = parseFloat(outcome);
					// 运行完等于号将结果放回输入栏
					process.value = result.value;
					if (process.value == '0') {
						process.value = '';
					}
				}
			} else if (this.value == 'DEL') {
				// 删除最后一个字符串来实现退格功能
				process.value = process.value.substring(0, process.value.length-1);
			} else {
				// 控制输入长度
				if (process.value.length > 14) {
					alert("输入过长，无法输入");
				} else {
					process.value += this.value;
				}
			}
		}
	}
}