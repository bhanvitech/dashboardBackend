const Migration=require("../models/Migration");
const mongoose=require("mongoose");
const { ObjectId } = mongoose.Types;


const migrationController={
    get:async (req,res)=>{
        try {
            const batchType = req.query.type;
            const id=req.query.id;
              let body={}
              if(batchType){
                body.type=batchType;
              }
              if(id){
                body._id=id
              }
              const migration =  await Migration.find(body)
              const lastMigration = migration[migration.length-1]
              let response = {}
      
              if(migration && migration.length){
                response.total = lastMigration.total;
                response.success = migration.reduce((prev, curr) => prev + curr.success, 0);
                response.failed = migration.reduce((prev, curr) => prev + curr.failed, 0);
                response.rem = response.total - (response.success + response.failed);
                response.totalBatch = migration.length;
                response.data = migration;
                res.status(200).send({data : response,success:true });
              }
            else {
                res.status(400).send({msg:"No list found for migration",success:false});
              }
            } catch (err) {
              console.log(err);
              res.status(500).send(err);
            }
         
    },
    getqueries:async (req,res)=>{
      try {
        const batchType = req.query.type  ;
        console.log("🚀 ~ file: MigrationController.js ~ line 49 ~ getqueries: ~ batchType", batchType)
        const id = req.query.id;
        console.log("🚀 ~ file: MigrationController.js ~ line 51 ~ getqueries: ~ id", id)
        const opt = req.query.opt;
        console.log("🚀 ~ file: MigrationController.js ~ line 53 ~ getqueries: ~ opt", opt)
        let reqBody = {}
        if(batchType){
  reqBody.type = batchType;
}
if(req.query.id){
  reqBody._id = ObjectId(id);
}

console.log("🚀 ~ file: MigrationController.js ~ line 54 ~ getqueries: ~ reqBody", reqBody)
const migration =  await Migration.find(reqBody).lean()
          let response = []
          if(migration && migration.length){
          
            
            migration.map(item=>{
              if(opt){
    const type = opt ==="success"? true: false;

    const newData = item && item.Batchlist.length && item.Batchlist.filter(batch=>batch.isSuccessful===type)
  //  Batchlist = newData;
   response.push(newData)
  } else{
    response.push(item.Batchlist)
  }
            })

          res.send({data : response.flat(),success:true });
        }
        else {
            res.status(400).send({msg:"No list found for migration",success:false});
          }
        } catch (err) {
          console.log(err);
          res.status(500).send(err);
        }  
  },
    post:async (req,res)=>{
        const migrationData =req.body
        const fields=await Migration.find({type:req.body.type}).lean()
       if(fields && fields.length){
           const lastMigration = fields[fields.length-1]
           const lastTotal = lastMigration && lastMigration.total;
           const feildBatchLength = lastMigration && lastMigration.Batchlist && lastMigration.Batchlist.length
           migrationData.total = Number(lastTotal) + Number(feildBatchLength);
        } else {
            migrationData.total = 20;
        }
        migrationData.success=migrationData.Batchlist.filter((batch)=>batch.isSuccessful===true).length;
        migrationData.failed=migrationData.Batchlist.filter((batch)=>batch.isSuccessful===false).length;
        // migrationData.success = migrationData.Batchlist
          const newMigration = new Migration(migrationData);
          try {
            const savedMigration = await newMigration.save();
            res.status(201).json(savedMigration);
          } catch (err) {
            res.status(500).json(err);
          }
    
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
module.exports=migrationController;