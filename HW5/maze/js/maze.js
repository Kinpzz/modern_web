window.onload = function() {
	//为开始按钮添加了一个监视器,由开始出发这个游戏的开关
	var start = document.getElementById('start');
	start.addEventListener('mouseover', startListener);
}

//撞墙之后出发的函数
function crashWall() {
	var str = event.target.className.replace(/^wall/, "crash-wall");
	event.target.className = str;
	//失败之后重新开始
	document.getElementById('result-info').innerHTML = "You lose";
}

//当鼠标离开墙壁之后，墙壁恢复
function normalWall() {
	var str = event.target.className.replace(/^crash-wall/, "wall");
	event.target.className = str;
	//当撞墙之后清楚墙壁检测撞墙的监视器，等待重新回到起点再次添加监视器
	delWallListener();
	//同时删除掉有关结束的监视器
	delEndListener(winListener);
	delEndListener(cheatListener);
	var cheat = document.getElementById('is-cheat');
	cheat.addEventListener('mouseover', isCheat);
}

//为每一个墙壁添加监视器
function addWallListener() {
	var wall = document.getElementsByClassName('wall');
	for (var i = 0; i < wall.length; i++) {
		wall[i].addEventListener('mouseover', crashWall);
		wall[i].addEventListener('mouseout', normalWall);
	}
}

//删除每一个墙壁的监视器
function delWallListener() {
	var wall = document.getElementsByClassName('wall');
	for (var i = 0; i < wall.length; i++) {
		wall[i].removeEventListener('mouseover', crashWall);
		wall[i].removeEventListener('mouseout', normalWall);
	}
}
//为结束添加监视器
function addEndListener(str) {
	var end = document.getElementById('end');
	end.addEventListener('mouseover', str);
}
//删除结束的监视器 
function delEndListener(str) {
	var end = document.getElementById('end');
	end.removeEventListener('mouseover', str);
}

//start监视器被触发调用的函数
function startListener() {
	//为每一个墙壁添加监视器
	addWallListener();
	//添加结束的监视器
	addEndListener(winListener);
	//检测是否作弊
	var cheat = document.getElementById('is-cheat');
	cheat.addEventListener('mouseover', isCheat);
	//清空输赢信息栏
	document.getElementById('result-info').innerHTML = "";
}

//end监视器被触发调用的函数
function winListener() {
	//删除掉墙壁的监视器
	delWallListener();
	document.getElementById('result-info').innerHTML = "You win";
}

//作弊监视器
function cheatListener() {
	//删除掉墙壁的监视器
	delWallListener();
	var str = "Don't cheat, you should start from the 'S' and move to the 'E' inside the maze"
	document.getElementById('result-info').innerHTML = str;
	//删除作弊触发器，只在本次触发有效
	delEndListener(cheatListener);
	delEndListener(winListener)
}
function isCheat() {
	//触发作弊监视器
	addEndListener(cheatListener);
}