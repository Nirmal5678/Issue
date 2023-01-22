const express=require('express');
const router=express.Router();
const issueController=require('../controller/issue_controller');


router.post('/create',issueController.create);
router.get('/viewProject',issueController.viewProject);


module.exports =router;