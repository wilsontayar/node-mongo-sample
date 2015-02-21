var http = require('http');
var qs = require('querystring');
var MongoClient = require('mongodb').MongoClient;

var config = getConfiguration();

function main(){

	http.createServer(function (request, response) {
		if(request.method === "GET") {
			response.writeHead(200, {'Content-Type': 'text/html'});
			getDefaultForm(function(form){
				response.end(form);
			});
		}

	  	if(request.method === "POST") {
	  		var formValues = '';

			request.on('data', function(data) {

				formValues += data;

			});

			request.on('end', function() {

				var form = qs.parse(formValues);
				
				saveNewMessage(form.message);

				console.log('"' + form.message + '" saved!');
			
				getDefaultForm(function(form){
					response.end(form);
				});
			});	    
		}
	}).listen(config.port);

	console.log('Listening on port: ' + config.port);
};

main();

function saveNewMessage(message){

	MongoClient.connect(config.db, function(err, db) {
		db.collection("messages").insert({'message':message}, function(err, result) {
			db.close();
		});
	});
}

function getMessages(callback){
	MongoClient.connect(config.db, function(err, db) {
		db.collection("messages").find().toArray(function(err, result) {
			callback(result);
			db.close();
		});
	});
}

function getDefaultForm(callback){

	getMessages(function(messages){
		var formOutput = '<html><body style="font-family:helvetica">'
	  + '<h1>is my docker node app working with mongodb?</h1>'
	  + '<form method="post">'
	  + '<div><input type="text" id="message" name="message" placeholder="Type your message..." style="width:50%;height:60px;font-size:30px;border:none;"/></div>'
	  + '</form><hr/><ul style="list-style:none;">';

	  for(var i = 0; i < messages.length; i++){
	  	formOutput += '<li>' + messages[i]._id + ' - ' + messages[i].message + '</li>';
	  }

	  formOutput += '</ul></body></html>';

	  callback(formOutput);
	});
};

function getConfiguration() {
	return {
		port: 3000,
		db: "mongodb://localhost:27017/node-mongo-sample"
	};
};