// 窗口加载完
window.onload = function() {
	// 创建地鼠的洞穴
	createHole();
	mole();
}
// 创建地鼠的洞穴
function createHole() {
	var area = document.getElementById('more-area');
	for (var i = 0; i < 60; i++) {
		var hole = document.createElement('input')
		hole.type = 'radio';
			//根据位置设置值，方便之后查找
		hole.value = i;
		//使用同一个类名，在css对其设置相同的样式
		hole.checked = false;
		hole.className = 'hole';
		area.appendChild(hole);
	}
}

function mole() {
	var score = document.getElementById('score-screen-input');
	var time = document.getElementById('time-screen-input');
	var state = document.getElementById('state-screen-input');
	var start = document.getElementById('start-screen-input');
	var area = document.getElementById('more-area');

	score.value = 0;
	time.value = 30;
	state.value = "Game Over";
	start.value = 2;
	// 记录上一次的游戏状态，默认为游戏结束
	var lastState = state.value;

	// 默认为所有按键添加禁止点击功能，使用监听器
	for (var i = 0; i < 60; i++) {
		area.children[i].addEventListener('click', protectHole);
	}

	// 当点击完开始按钮事件触发
	start.onclick = function() {
		lastState = state.value;

		//若是游戏结束之后重新开始，清除原始数据
		if (lastState == "Game Over") {
			score.value = 0;
			time.value = 30;
			for (var i = 0; i < 60; i++) {
				area.children[i].checked = false;
			}
		}

		// 通过功能键的变换反应游戏状态
		start.value = (parseInt(start.value) + 1) % 2; 	// 对象的变量的加默认为字符串相加，所以使用类型转换

		if (start.value == 2) {
			state.value = "Game Over";
			start.innerHTML = "Start Game";
		} else if (start.value == 1) {
			state.value = "Playing";
			start.innerHTML = "Pause Game";
		} else if (start.value == 0) {
			state.value = "Pause";
			start.innerHTML = "Continue Playing";
		}

		// 游戏从结束状态到开始
		if (state.value == "Playing" && lastState != "Pause") {
			// 时间计时器开始计时
			Timer = setInterval(timeCounter, 1000);
			// 地鼠开始随机出现
			randMole();
		} else if (state.value == "Pause") { // 暂停游戏
			clearInterval(Timer);
		} else if (state.value == "Playing" && lastState == "Pause") { //继续游戏
			Timer = setInterval(timeCounter, 1000);
		}
	}
}

// 游戏结束函数
function gameOver() {
	var area = document.getElementById('more-area');
	var score = document.getElementById('score-screen-input');
	var state = document.getElementById('state-screen-input');
	var start = document.getElementById('start-screen-input');

	// 更改按键值和状态值为结束
	start.value = 2;
	state.value = "Game Over";
	start.innerHTML = "Start Game";
	
	// 清除击杀老鼠得分监听器，采用遍历的方法消除那只未被消灭的地鼠的监听器
	for (var i = 0; i < 60; i++) {
		area.children[i].removeEventListener('click', killMole);
	}
	// 提示游戏结果
	var str = 'Game Over! Final score: ' + score.value;
	alert(str);

}

// 游戏时间计算器
function timeCounter() {
	var time = document.getElementById('time-screen-input');

	if (time.value <= 0) { // 当游戏时间为0时，游戏结束调用游戏结束函数
		time.value = 0;
		gameOver();
		clearInterval(Timer); //　停止计时
	} else {
		time.value--;　// 若游戏时间未到0，游戏时间减少
	}
}

// 随机产生地鼠函数
function randMole(score) {
	var area = document.getElementById('more-area');
	// 产生随机地鼠
	var num = Math.floor(Math.random()*60);
	area.children[num].checked = true;
	// 地鼠即将出现的洞，允许点击
	area.children[num].removeEventListener('click', protectHole);
	// 为地鼠出现的洞，添加杀死地鼠监听器
	area.children[num].addEventListener('click', killMole);
}

// 杀死地鼠函数，点击地鼠出现洞穴触发
function killMole() {
	var score = document.getElementById('score-screen-input');
	var state = document.getElementById('state-screen-input');

	if (state.value == "Playing") {
		score.value++; // 得分
		event.target.checked = false; // 地鼠被消灭
	//　该洞穴地鼠被消灭成为普通洞穴
		event.target.removeEventListener('click', killMole); 
		event.target.addEventListener('click', protectHole);

		// 产生新的地鼠
		randMole();
	}　
}

// 普通被保护洞穴
function protectHole() {
	var state = document.getElementById('state-screen-input');
	var score = document.getElementById('score-screen-input');

	// 若在游戏过程中错误触发，则扣分
	if (state.value == "Playing")score.value--;
	// 禁止点击
	event.target.checked = false;
}
