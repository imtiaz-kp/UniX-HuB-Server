const projects = require ('../Models/projectSchema')

//add projects
exports.addprojects=async(req,res)=>{
    console.log("inside add project function")
    const userId=req.payload
    const projectImage=req.file.filename
    console.log(projectImage);
    const {title,languages,overview,github,website}=req.body
    // console.log(title,languages,overview,github,website)
    console.log(`${userId}`)
    try{
        const existingProject = await  projects.findOne({github})
        if(existingProject){
            res.status(406).json("Project already exist!!! Upload another")

        }else{
             const newProject=new projects({
                title,languages,overview,github,website,projectImage,userId
             })
             await newProject.save()
             res.status(200).json(newProject)
            
        }


    }catch(err){
        res.status(401).json( `request failed Error ${err}`)   
    }
    
}
//getuser projects
exports.allUserProjects=async(req,res)=>{
 const userId =req.payload
 try{
    const userProjects=await projects.find({userId:userId})
    res.status(200).json(userProjects)

 }catch(err){
   res.status(401).json(err)
 }
}

//getallprojects
exports.getallProjects=async(req,res)=>{
    const searchKey=req.query.search
    const query={
        languages:{$regex:searchKey,$options:"i"}
       
    }
    try{
       const allProjects=await projects.find(query)
       res.status(200).json(allProjects)
   
    }catch(err){
      res.status(401).json(err)
    }
   }

   //gethomeprojects
   exports.getHomeProjects=async (req,res)=>{
    try{
        const homeProjects=await projects.find().limit(3)
        res.status(200).json(homeProjects)
    
     }catch(err){
       res.status(401).json(err)
     }
   }