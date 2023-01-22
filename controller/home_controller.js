
const Project = require('../models/project');

module.exports.home=function(req,res){
    Project.find({},function(err,project){
        if(err){
            console.log('error in finding project');
        }

        else{
            res.render('home',{
                title:'Home',
                project:project
            });
        }
    });

}