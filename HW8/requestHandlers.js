var fs = require('fs');
var path = require('path');
var ghtml = require('./generateHtml.js');

function start(response, postData) {
  console.log("Request handler 'start' was called.");
  var pathname = __dirname + '/public/index.html';
  fs.readFile(pathname, 'utf-8', function(error,data) {
    if (error) throw error;
    response.write(data);
    response.end();
  });
}

function upload(response, postData) {
  var postArr = postData.toString().split('&');
  var info = {};
  for (var i = 0; i < postArr.length; i++) {
    var pair = postArr[i].toString().split('=');
    info[pair[0]] = pair[1];
  }
  console.log("Request handler 'upload' was called.");
  var storeData = readJson();
  var check = checkAndSync(response, info, storeData);
  if (check == true) {
    console.log('New user ' + info.username +' register.');
    ghtml.infoPage(response, info);
  } else if (typeof check == "string") {
    ghtml.errorPage(response, info, check);
  }
}

function writeJson(response, jsonObj) {
  jsonStr = JSON.stringify(jsonObj);
  try {
    fs.writeFileSync(__dirname + '/data.json', jsonStr)
  } catch(error) {
    throw (error);
  }
  console.log('saved successfully');
  return true;
}
function readJson() {
    var content = fs.readFileSync(__dirname + '/data.json');
    try {
      var jsonContent = JSON.parse(content);
    } catch(error) {
      throw error;
    }
    return jsonContent;
}
function checkAndSync(response, info, storeData) {
  if (illegalCheck(response, info)) {
    var isCorrect = repeatCheck(response, info, storeData);
    if (isCorrect == true) {
      return true;
    } else {
      return isCorrect;
    }
  } else {
    return false;
  }
}
function illegalCheck(response, info) {
  if (!(/^[1-9][0-9]{10}$/.test(info.tel))) {
    return illegalInfo(response, 'tel');
  } else if (!(/^[a-zA-z_\-0-9]+%40(([a-zA-z_\-])+\.)+[a-zA-Z]{2,4}$/.test(info.email))) {
    return illegalInfo(response, 'email');
  } else if (!(/^[1-9][0-9]{7}$/.test(info.studentnumber))) {
    return illegalInfo(response, 'student number');
  } else if (!(/^[A-Za-z][A-Za-z0-9_]{5,17}$/.test(info.username))) {
    return illegalInfo(response, 'username');
  }
  return true;
}
function illegalInfo(response, str) {
  console.log('ERROR: illegal '+ str + ' was received');
  return false;
}
function repeatCheck(response, info, storeData) {
  for (var i in storeData) {
    if (storeData[i].username == info.username) {
      return repeatInfo(response, 'username');
    } else if (storeData[i].studentnumber == info.studentnumber) {
      return repeatInfo(response, 'student number');
    } else if (storeData[i].tel == info.tel) {
      return repeatInfo(response, 'tel');
    } else if (storeData[i].email == info.email) {
      return repeatInfo(response, 'email');
    }
  }
  storeData[storeData.length] = info;
  // 经过所有验证就进行同步
  writeJson(response, storeData);
  return true;
}
function repeatInfo(response, str) {
  console.log('ERROR: ' + str + ' exists');
  return str;
}
function load(pathname, res) {
    fs.exists(__dirname + pathname,function(exists){
        if(exists){
            switch(path.extname(pathname)){
                case ".html":
                    res.writeHead(200, {"Content-Type": "text/html"});
                    break;
                case ".js":
                    res.writeHead(200, {"Content-Type": "text/javascript"});
                    break;
                case ".css":
                    res.writeHead(200, {"Content-Type": "text/css"});
                    break;
                case ".gif":
                    res.writeHead(200, {"Content-Type": "image/gif"});
                    break;
                case ".jpg":
                    res.writeHead(200, {"Content-Type": "image/jpeg"});
                    break;
                case ".png":
                    res.writeHead(200, {"Content-Type": "image/png"});
                    break;
                default:
                    res.writeHead(200, {"Content-Type": "application/octet-stream"});
            }
            fs.readFile(__dirname + pathname,function (error,data){
                if (error) throw error;
                res.write(data);
                res.end();
            });
        }
    });
}

function detail(username, response) {
  var storeData = readJson();
  for (var i in storeData) {
    if (storeData[i].username == username) {
      ghtml.infoPage(response, storeData[i]);
      return true;
    }
  }
  start(response);
  return false;
}

exports.start = start;
exports.upload = upload;
exports.load = load;
exports.detail = detail;