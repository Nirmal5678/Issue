const { resolveSoa } = require('dns/promises');
const Project = require('../models/project');
const Issue =require('../models/issue');

module.exports.createProject=function(req,res){
    res.render('project');
}
module.exports.createIssue=function(req,res){
    res.render('createIssue');
}

module.exports.create=function(req,res){
    Project.create(req.body,function(err,project){
        if(err){
            console.log("error in creating project");
            res.redirect('back')
        }
        else{
            res.redirect('/');
        }
    });

}

module.exports.showProject=function(req,res){
    const id=req.query.id;
    
    Project.findOne(id,function(err,project){
        
        
        if(err){

        }
        
        else{
            res.render('showProject',{
                title:project.name,
                project:project
            });
        }
    });

}