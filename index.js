var express = require('express');  // gets it from the node_modules folder
var app = express();

app.use(express.static('public')); 

app.listen(3000, function(){
	console.log('Sleep Reaction app listening on port 3000!');
});

