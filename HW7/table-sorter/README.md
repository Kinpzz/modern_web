##可以排序的网站为soj上的表格
* http://soj.sysu.edu.cn/ranklist.php

* http://soj.sysu.edu.cn/contests.php

* http://soj.sysu.edu.cn/courses.php

* http://soj.sysu.edu.cn/status.php?username=mayaka

##神秘代码为
	var head = document.getElementsByTagName('head').item(0);var jqScript = document.createElement("script");jqScript.type = "text/javascript";jqScript.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.js";head.appendChild(jqScript);setTimeout(function() {var tbScript = document.createElement("script");tbScript.type = "text/javascript";tbScript.src="https://cdnjs.cloudflare.com/ajax/libs/jquery.tablesorter/2.24.6/js/jquery.tablesorter.js";head.appendChild(tbScript);}, 100);setTimeout(function() {$("table").tablesorter();}, 500);
	
实质是载入了两个js文件，并且设置了延时，使其能在老师要求的一行内完成。