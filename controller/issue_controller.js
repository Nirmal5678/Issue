const Project=require('../models/project');
const Issue=require('../models/issue');  


module.exports.create=function(req,res){
    try{
        let str=req.body.labels.split(',');                                         //getting labels array from body
        let filtered = str.filter(function (el) {
            return el != '';                                                        //removing extra ','
        });
        filtered = filtered.map(element => {                                        //capitalizing all labels
            return element.toUpperCase();
        });
        
        let newIssue= Issue.create({title:req.body.title,description:req.body.description,labels:filtered,author:req.body.author,projectID:req.body.projectID});
        //creating new issue

        let update= Project.findByIdAndUpdate(req.body.projectID,{$push:{"issues":newIssue.id}});
        //finding project by project id

        return res.redirect('back');
        //redirecting to viewProject
    }
    catch(e){
        return console.log(e);
    }
}



//route handler to view specific project
module.exports.viewProject=function(req,res){
    try{
        let curProject=Project.findById(req.query.project).populate({path:'issues'});     //fetching project by req.query,id
        let cur_project_issues=curProject.issues;                                               //storing current project issues in array.

        let allLabels=[];
        let allTitles=[];
        let allDescriptions=[];
        let allAuthors=[];
        
        let allIssues=Issue.find({});                                                     //fetching all issues
        
        allIssues.forEach((i)=>{
        let al=i.labels;
        al.forEach((j)=>allLabels=[...allLabels,j]);                                            //storing all labels in allLabels array
        allTitles=[...allTitles,i.title]                                                        //storing all titles in allTitles array
        allDescriptions=[...allDescriptions,i.description]                                      //storing all descriptions in allDescriptions array
        allAuthors=[...allAuthors,i.author]                                                     //storing all authors in allAuthors array
        });
        
        allLabels=[...new Set(allLabels)]       //removing duplicates
        allTitles=[...new Set(allTitles)]       //removing duplicates
        allDescriptions=[...new Set(allDescriptions)]       //removing duplicates
        allAuthors=[...new Set(allAuthors)]       //removing duplicates
       
        return res.render('viewProject',{curProject,cur_project_issues,allLabels,allTitles,allDescriptions,allAuthors});
        //rendering viewProject view with current proeject (with issues), all labels, all titles, all descriptions, all authors.
    }
    catch(e){
        return console.log(e);
    }
};



//route handler to filter a project by labels, author , title and description
module.exports.viewProject=function(req,res){
    let findIssue='';
    let curProject='';
    if(req.body.selectAuthor!=0){
        findIssue= Issue.findOne({author:req.body.selectAuthor});                                          //fetching issue by author

        if(findIssue)
        curProject= Project.findById(findIssue.projectID).populate({path:'issues'});                 
    }
    else if(req.body.selectDescription!=0 && req.body.selectTitle!=0){
        findIssue= Issue.findOne({description:req.body.selectDescription,title:req.body.selectTitle});     //fetching issue by auhtor & description

        if(findIssue)
        curProject= Project.findById(findIssue.projectID).populate({path:'issues'});
    }
    else if(req.body.selectLabels!=undefined){

        let arrayLables=req.body.selectLabels;                                                                  //storing all labels in array fetched from body
        var idsArray=[];
        
        for(i of arrayLables){
            let issue = Issue.findOne({labels:{$in:i}});
            idsArray.push(issue.projectID);                                                                     //string all proejct ids of fetched labels
        }

        //checking most occured label
        //var arr1=[3, 'a', 'a', 'a', 2, 3, 'a', 3, 'a', 2, 4, 9, 3];
        let mf = 1;
        let m = 0;
        let projectID;
        for (let i=0; i<idsArray.length; i++)
        {
                for (let j=i; j<idsArray.length; j++)
                {
                        if (idsArray[i] == idsArray[j])
                        m++;
                        if (mf<m)
                        {
                        mf=m; 
                        projectID = idsArray[i];
                        }
                }
                m=0;
        }
        curProject= Project.findById(projectID).populate({path:'issues'});                                     //fetching project after filering most occured projects id
    }

    console.log(curProject);
    let cur_project_issues=curProject.issues;
       
    let allLabels=[];
    let allTitles=[];
    let allDescriptions=[];
    let allAuthors=[];

    let allIssues=Issue.find({});                                                                             //fetching all issues

    allIssues.forEach((i)=>{
    let al=i.labels;
    al.forEach((j)=>allLabels=[...allLabels,j]);                                            //storing all labels in allLabels array
    allTitles=[...allTitles,i.title]                                                        //storing all titles in allTitles array
    allDescriptions=[...allDescriptions,i.description]                                      //storing all descriptions in allDescriptions array
    allAuthors=[...allAuthors,i.author]                                                     //storing all authors in allAuthors array
    });
    
    allLabels=[...new Set(allLabels)]       //removing duplicates
    allTitles=[...new Set(allTitles)]       //removing duplicates
    allDescriptions=[...new Set(allDescriptions)]       //removing duplicates
    allAuthors=[...new Set(allAuthors)]       //removing duplicates
    
    return res.render('viewProject',{curProject,cur_project_issues,allLabels,allTitles,allDescriptions,allAuthors});
};


