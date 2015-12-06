#用户注册服务器
## 使用说明
命令行在文件目录下，运行

	node index.js
	
或者

	node index
开启服务器，可以通过 http://localhost:8000进行访问页面
##功能介绍
有两个界面“注册”、“详情”，使用者通过在浏览器中输入不同的URL，可进入相应界面

1. 当浏览器访问 http://localhost:8000/?username=abc 时，如果abc是已经注册的用户，则显示abc的“详情”界面
2. 其它情况均显示“注册”界面
3. “注册”界面点击“重置”，清空表单所有内容
4. “注册”界面点击“提交”，成功则跳转到对应用户的“详情”界面，不成功则回到注册界面，并显示错误原因
5. 校验
	* 用户名6~18位英文字母、数字或下划线，必须以英文字母开头
	* 学号8位数字，不能以0开头
	* 邮箱按照课程讲义中的规则校验
	* 校验发现错误时，要在界面上提示具体出错的原因
	* 用户名、学号、电话、邮箱均不可重复，重复时要在界面上显示具体重复的内容
	
## 实现说明
1. 主页直接读取静态文件
2. 详细信息页面，使用的是response.write动态生成html，未使用ajax或者jade，所以代码有一点冗长
3. 实现了server、router、index、handler等多模块化的分离
4. 校验说明：在前端通过js判断用户名是否合法，在服务器端进行再此校验合法性（不给予反馈，主要是防止不是通过该页面的模拟非法请求），进行查重检验，若重复反馈用户信息。

## 界面
![](http://ww1.sinaimg.cn/large/6177e8b1gw1eyq065vmxuj21kw0sgwls.jpg)
![](http://ww4.sinaimg.cn/large/6177e8b1gw1eyq04xdwtyj20se0uwjut.jpg)
![](http://ww3.sinaimg.cn/large/6177e8b1gw1eyq02kpogjj216g11q7cb.jpg)
![](http://ww1.sinaimg.cn/large/6177e8b1gw1eyq0578zhej20s60i0459.jpg)