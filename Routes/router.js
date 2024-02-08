const express = require("express")
const router= new express.Router()
const userController =require('../Controller/userController')
const projectController= require('../Controller/projectController')
const jwtMiddleware=require('../Middlewares/jwtMiddleware')
const multerConfig = require("../Middlewares/multerMiddleware")
//register
router.post('/user/register',userController.register)
//login
router.post('/user/login', userController.login)

//add project
router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addprojects)
//getuserprojects
router.get('/user/all-projects',jwtMiddleware,projectController.allUserProjects)
//getallprojects
router.get('/projects/all',jwtMiddleware,projectController.getallProjects)
//
router.get('/projects/home-projects',projectController.getHomeProjects)

router.put('/projects/edit/:id',jwtMiddleware,multerConfig.single("projectImage"),projectController.editProjectController)

router.delete('/projects/remove/:id',jwtMiddleware, projectController.deleteProjectController)


router.put('/profile/edit/',jwtMiddleware,multerConfig.single("profileImage"),userController.editProfileController)

//export router
module.exports=router