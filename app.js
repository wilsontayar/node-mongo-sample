var http = require('http');
var qs = require('querystring');
var mongo = require('mongo');

var config = getConfiguration();

function getDefaultForm(){

	var formOutput = '<html><body style="font-family:helvetica>'
	  + '<h1>mongo-node-sample</h1>'
	  + '<form method="post">'
	  + '<div><input type="text" id="message" name="message" placeholder="Type your message..." style="width:50%;height:60px;font-size:30px;border:none;"/></div>'
	  + '</form>';

	  //get mongo tasks;
	  //for(var i = 0; i <= tasks.length; i++){
	  //	formOutput += '<p>' + tasks[i] + '</p>';
	  //}

	  formOutput += '</body></html>';

	  return formOutput;
};

function getConfiguration() {
	return {
		port: 3000,
		db: 'mongo/mongo-node-sample'
	};
};

function main(){

	http.createServer(function (request, response) {
		if(request.method === "GET") {
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.end(getDefaultForm());
		}

	  	if(request.method === "POST") {
	  		var formValues = '';

			request.on('data', function(data) {

				formValues += data;

			});

			request.on('end', function() {

				var form = qs.parse(formValues);
				
				//save form.message;

				console.log('"' + form.message + '" saved!');
			
				response.end(getDefaultForm());
			});	    
		}
	}).listen(config.port);

	console.log('Listening on port: ' + config.port);
};

main();