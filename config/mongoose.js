const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/IssueTracker');
const db=mongoose.connection;

db.on('error',function(){
    console.log('error in connecting DB');
});

db.once('open',function(){
    
    console.log('Successfully connected to DB');
    
});

module.exports=db;
