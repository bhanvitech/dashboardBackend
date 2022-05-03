const User=require("../models/user");
 const userController={
    get:async (req,res)=>{
        const query =req.query.new;
        if(req.user.isAdmin){
          
            try{
              const users= query ? await User.find().sort({_id:-1}).limit(10) : await User.find();
               res.status(200).json(users);
                }
            catch(err)
            {
                res.status(500).json(err)
            }
        }
        else{
            res.status(403).json("You are not allowed to view all users!");
        }  
    },
    post:async (req,res)=>{
        
    },
    put:async (req,res)=>{
        try {
            const updatedMigration = await Migration.findByIdAndUpdate(
              req.params.id,
              {
                $set: req.body,
              },
              { new: true }
            );
            res.status(200).json(updatedMigration);
          } catch (err) {
            res.status(500).json(err);
          }
    },
    delete:async (req,res)=>{
        try {
            await Migration.findByIdAndDelete(req.params.id);
            res.status(200).json("The migration has been deleted...");
          } catch (err) {
            res.status(500).json(err);
          }
    }
 }