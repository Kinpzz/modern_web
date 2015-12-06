var fs = require('fs');
function route(handle, pathname, response, postData, post) {
 	if(post) {
		if (/^\/+$/.test(pathname)) pathname = '/';
		console.log("About to route a request for " + pathname);
		if (typeof handle[pathname] === 'function') {
		  	if (pathname == '/upload' && postData == '') {
		  		handle['/'](response, postData);
		  	} else {
		  		handle[pathname](response, postData);
		  	}
		} else{
		  	fs.exists(__dirname + pathname, function(exists) {
		  		if(exists) {
		  			handle["load"](pathname, response);
		  		} else {
		  			response.writeHead(404, {"Content-Type": "text/plain"});
		  			response.write('404 not found');
		  			response.end();
		  		}
		  	});
		}
	} else {
		handle["detail"](pathname, response);
	}

}

exports.route = route;