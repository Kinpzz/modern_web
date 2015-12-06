$(function() {
	//初始化
	var todoTable = myTable('#todo');
	todoTable.headClick();
	// 奇数行变色
	$("tbody tr:odd").addClass('odd');
	var staffTable = myTable('#staff');
	staffTable.headClick();
});
// myTable的对象原型
var myTable = function(table) {
	return {
		sortIndex: -1,
		row: $(table + ' tbody tr'),
		head: $(table + ' thead th'),
		rowArr: [],
		getTableId: function() {
			return table;
		},
		headClick: function() {
			return headChange.call(this);
		},
		getRow: function() {
			var that = this;
			if (this.rowArr.length == 0) {
				$.each(this.row, function(i) {
					that.rowArr[i] = that.row[i];
				});
			}
			return this.rowArr;
		},
		setRow: function() {
			var that = this;
			$(table + ' tbody').html('');
			$(this.rowArr).each(function(i) {
				$(table + ' tbody').append(that.rowArr[i]);
			});
			oddRow();
		},
		sortRow: function() {
			var that = this;
			this.rowArr = this.getRow();
			this.rowArr.sort(compare.bind(null, this.sortIndex));
			// 使用bind的绑定参数进去，避免全局变量的使用
		}
	};
}
//排序点击触发事件
function headChange() {
	var that = this;
	that.head.each(function(i) {
		$(that.head[i]).click(function(i) {
			return function() {
				that.sortIndex = i;
				that.head.each(function(k) {
					$(that.head[k]).removeClass('sorted');
				});
				if (!$(this).hasClass('sorted')) {
					$(this).addClass('sorted');
					that.sortRow();
					that.setRow();
				}
				if ($(this).hasClass('ascend')) {
					that.rowArr.reverse();
					that.setRow();
					$(this).removeClass('ascend');
					$(this).addClass('descend');
				} else {
					$(this).removeClass('descend');
					$(this).addClass('ascend');
				}
			}
		}(i));
	});
}
// 比较单列大小
function compare(col,a,b) {
		var aString = $($(a).children('td')[col]).html().toString();
		var bString = $($(b).children('td')[col]).html().toString();
		return aString < bString ? -1 : 1;
}
// 奇数行变色函数
function oddRow() {
	$("tbody tr:even").removeClass('odd');
	$("tbody tr:odd").addClass('odd');
}