var app = require('http').createServer(handler);

//var github = require('octonode');

var statusCode = 200;


app.listen(9000, function() {
  console.log('Node app is running on port', 9000);
});



function handler (req, res) {
  var data = '';
  if (req.method == "POST") {
    req.on('data', function(chunk) {
      data += chunk;
    });
    req.on('end', function() {
      console.log('Received body data:');
      console.log(data.toString());
    });
  }
  res.writeHead(statusCode, {'Content-Type': 'text/plain'});
  res.end();
}
