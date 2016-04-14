var express = require('express');  // gets it from the node_modules folder
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static('public')); 

// app.listen(3000, function(){
// 	console.log('Sleep Reaction app listening on port 3000!');
// });
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
