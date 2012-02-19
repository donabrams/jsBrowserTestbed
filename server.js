var express = require("express");
var server = express.createServer();

server.configure(function(){
	server.use(express.static(__dirname));
	server.use(server.router);
});

server.listen(3000);

console.log('Server running at http://localhost:3000/');