window.onload = function() {
	var reStart = $('#start');
	var Easier = $('#easy');
	var Harder = $('#hard');
	var title = $('#title-bar');
	var gameBody = $('#game-body');
	var empty = $('#empty');
	var info = $('#info-bar');
	var stepNum = $('#step-num');
	var difficulty = 4;
	var recoverButton = $('#recover');
	var timer;
	// 创建一个拼图的构造函数
	var puzzle = function(name, sizes) {
		return {
			// 存放div 放进gamebody的元素就是这个
			puzzle: [],
			step: '0',
			road: [],
			get_name: function() {
				return name;
			},
			get_size: function() {
				if (sizes <= 4) {
					sizes = '4';
				} else if (sizes > 8) {
					sizes = '8';
				}
				return sizes;
			},
			createPuzzle: function() {
				var sizes = this.get_size();
				for (var i = 0; i < sizes * sizes - 1; i++) {
					this.puzzle[i] = $('<div></div>');
					this.puzzle[i].addClass('puzzle ' + 'puzzle-' + sizes);
					this.puzzle[i].data('col', i % sizes);
					this.puzzle[i].data('row', parseInt(i / sizes));
					this.puzzle[i].data('bgtop', this.puzzle[i].data('col') * 100 / (sizes-1) + '%');
					this.puzzle[i].data('bgleft', this.puzzle[i].data('row') * 100 / (sizes-1) + '%');
				}
				// 空白可以移动的位置
				this.puzzle[i] = $('<div></div>');
				this.puzzle[i].addClass('puzzle-' + sizes);
				this.puzzle[i].attr('id', 'empty');
				this.puzzle[i].data('col', i % sizes);
				this.puzzle[i].data('row', parseInt(i / sizes));
			},
			appendPuzzle: function() {
				var sizes = this.get_size();
				for (var i = 0; i < this.puzzle.length; i++) {
					gameBody.append(this.puzzle[i]);
					// 此处可能为侵式的代码，但是为了动态生成不同大小的拼图，这能这样子做了
					this.puzzle[i].css('backgroundPosition', this.puzzle[i].data('bgtop') + ' ' + this.puzzle[i].data('bgleft'));
					this.puzzle[i].css('left' , 352 / sizes * this.puzzle[i].data('col') + 'px');
					this.puzzle[i].css('top', 352 / sizes * this.puzzle[i].data('row') + 'px');
				}
			},
			removePuzzle: function() {
				for (var i = 0; i < this.puzzle.length; i++) {
					this.puzzle[i].remove();
				}
			},
			changePuzzle: function() {
				var sizes = this.get_size();
				var that = this;
				for (var i = 0; i < sizes * sizes - 1; i++) {
					this.puzzle[i].click(function(i) {
						function change() {
							changePos.call(that.puzzle[i], that);
						}
						return change;
					}(i)); // 闭包
				}
			},
			randomPuzzle: function() {
				var sizes = this.get_size();
				for (var k = 0; k < sizes * sizes -1 ; k++) {
					this.puzzle[k].removeClass('delay');
				} // 去除延时效果
				this.road.length = 0; //清空存储路径的数组
				var dirRow = [0, -1, 0, 1];
				var dirCol = [1, 0, -1, 0];
				empty = this.puzzle[sizes*sizes-1];
				for (var k = 0; k < sizes * sizes * sizes; k++) {
					while (true) {
						var randomDir = Math.floor(Math.random() * 4);
						var nextRow = empty.data('row') + dirRow[randomDir];
						var nextCol = empty.data('col') + dirCol[randomDir];
						if (nextRow < sizes && nextRow >= 0 && nextCol < sizes && nextCol >= 0) {
							break;
						}
					}
					for (var j = 0; j < sizes * sizes - 1; j++) {
						if (this.puzzle[j].data('col') == nextCol && this.puzzle[j].data('row') == nextRow){
							break;
						}
					}
					exchange.call(this.puzzle[j]);
					this.road.push(this.puzzle[j]);
				}
			},
			isWin: function() {
				var sizes = this.get_size();
				for (var i = 0; i < sizes * sizes; i++) {
					if (this.puzzle[i].data('col') != i % sizes || this.puzzle[i].data('row') != parseInt(i / sizes)) {
						return false;
					}
				}
				alert('Congratulations! You pass ' + this.get_name() + ' in ' + this.step + ' step');
				info.html('You pass ' + this.get_name() + ' in ' + this.step + ' step');
				this.step = 0;
				stepNum.html('');
				this.removePuzzle();
				this.init();
				return true;
			},
			init: function() {
				this.road.length = 0;
				this.step = 0;
				stepNum.html('');
				this.createPuzzle();
				this.appendPuzzle();
			},
			recover: function() {
				if(this.road.length) {
					empty = $('#empty');
					var road = this.road;
					timer = setInterval(function() {
							var tempLeft = empty.css('left');
							var tempTop = empty.css('top');
							var tempCol = empty.data('col');
							var tempRow = empty.data('row');
							that = road.pop();
							empty.css('left', that.css('left'));
							empty.css('top', that.css('top'));
							that.css('left', tempLeft);
							that.css('top', tempTop);
							empty.data('row', that.data('row'));
							empty.data('col', that.data('col'));
							that.data('row', tempRow);
							that.data('col', tempCol);
							}, 200);
				} else {
					clearInterval(timer);
				}
			}
		};
	};

	// 实例化初级拼图，第一个参数为模式名称，第二个为大小
	var myPuzzle = puzzle("level 1", '4');
	myPuzzle.init();
	reStart.click(function() {
		clearInterval(timer);
		myPuzzle.removePuzzle();
		myPuzzle.init();
		myPuzzle.randomPuzzle();
		//开始后才可以点击
		myPuzzle.step = 0;
		stepNum.html('');
		myPuzzle.changePuzzle();
		info.html('Use + or - to change difficulty and start');
	});
	var difficulty = 4;
	// 减小难度
	Easier.click(function() {
		clearInterval(timer);
		info.html('Use + or - to change difficulty and start');
		if (difficulty > 4) {
			difficulty--;
			myPuzzle.removePuzzle();
			myPuzzle = puzzle('level ' + (difficulty - 3), difficulty);
			title.html(myPuzzle.get_name());
			myPuzzle.init();
		}
	});
	// 增加难度
	Harder.click(function() {
		clearInterval(timer);
		info.html('Use + or - to change difficulty and start');
		if (difficulty < 8) {
			difficulty++;
			myPuzzle.removePuzzle();
			myPuzzle = puzzle('level ' + (difficulty - 3), difficulty);
			title.html(myPuzzle.get_name());
			myPuzzle.init();
		}
	});
	recoverButton.click(function() {
		myPuzzle.recover();
	});
}

function changePos(that) {
	var empty = $('#empty');
	var stepNum = $('#step-num');
	var tempLeft = empty.css('left');
	var tempTop = empty.css('top');
	var tempCol = empty.data('col');
	var tempRow = empty.data('row');
	this.addClass('delay');
	function exchanges() {
		empty.css('left', this.css('left'));
		empty.css('top', this.css('top'));
		this.css('left', tempLeft);
		this.css('top', tempTop);

		empty.data('row', this.data('row'));
		empty.data('col', this.data('col'));
		this.data('row', tempRow);
		this.data('col', tempCol);
	}
	if (this.data('col') == empty.data('col')) {
		if (this.data('row') + 1 == empty.data('row') || this.data('row') - 1 == empty.data('row')) {
			exchanges.call(this);
			that.step++;
			stepNum.html('step: ' + that.step);
			that.isWin();
		}
	} else if (this.data('row') == empty.data('row')) {
		if (this.data('col') + 1 == empty.data('col') || this.data('col') - 1 == empty.data('col')) {
			exchanges.call(this);
			that.step++;
			stepNum.html('step: ' + that.step);
			that.isWin();
		}
	}
}

function exchange() {
	var empty = $('#empty');
	var tempLeft = empty.css('left');
	var tempTop = empty.css('top');
	var tempCol = empty.data('col');
	var tempRow = empty.data('row');

	empty.css('left', this.css('left'));
	empty.css('top', this.css('top'));
	this.css('left', tempLeft);
	this.css('top', tempTop);

	empty.data('row', this.data('row'));
	empty.data('col', this.data('col'));
	this.data('row', tempRow);
	this.data('col', tempCol);
}