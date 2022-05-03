
const router=require("express").Router();
const verify=require("../verifyToken")
const migrationController=require("../controllers/MigrationController")

//CREATE
router.post("/", verify, async (req, res) => {
  migrationController.post(req,res)
   
  });
  
  //UPDATE
  
  router.put("/:id", verify, async (req, res) => {
   
     migrationController.put(req.res)
   
  });
  
  //DELETE
  
  router.delete("/:id", verify, async (req, res) => {
  
     migrationController.delete(req,res)
  
  });
  
  router.get("/query", verify,  (req, res) => {
   
   migrationController.getqueries(req,res)
});

    //GET ALL
  
  router.get("/", verify,  (req, res) => {
   
     migrationController.get(req,res)
  });
  
  module.exports = router;