
// db.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:lucy2018@mainframe-shard-00-00-dj5lt.mongodb.net:27017,mainframe-shard-00-01-dj5lt.mongodb.net:27017,mainframe-shard-00-02-dj5lt.mongodb.net:27017/test?ssl=true&replicaSet=MainFrame-shard-0&authSource=admin&retryWrites=true',{ useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);
;
