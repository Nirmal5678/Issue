const express=require('express');
const router=express.Router();
const projectController=require('../controller/project_controller');

router.post('/create',projectController.create);
router.get('/createProject',projectController.createProject);
// router.get('/show',projectController.show);
router.get('/showProject',projectController.showProject);
router.get('/createIssue',projectController.createIssue);


module.exports =router;