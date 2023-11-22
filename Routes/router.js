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


//export router
module.exports=router