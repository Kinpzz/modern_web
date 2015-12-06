var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    request.setEncoding("utf8");
    var postData = "";
    var pathname = url.parse(request.url).pathname;

    if (!/\?username=/.test(request.url)) {
      console.log("Request for " + pathname + " received.");

      request.addListener("data", function(postDataChunk) {
        postData += postDataChunk;
        console.log("Received POST data chunk '"+
        postDataChunk + "'.");
      });

      request.addListener("end", function() {
        route(handle, pathname, response, postData, true);
      });
    } else {
      var username = request.url.split('?username=')[1];
      console.log(username);
      route(handle, username, response, false);
    }

  }

  http.createServer(onRequest).listen(8000);
  console.log("Server has started.");
}

exports.start = start;