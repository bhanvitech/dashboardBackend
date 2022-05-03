const mongoose=require("mongoose");



const migrationschema=new mongoose.Schema({
    name:{type:String,required:true},
    summary: {type:String,required:true},
    type: {type:String,enum : ['Migration','LinkCr'], default: 'Migration'} ,
    sourceServer:{type:String,default:"6.0.1"},
    destinationServer:{type:String,default:"6.0.2"},
    total:{type:Number},
    success:{type:Number},
    failed:{type:Number},
  Batchlist: [
    {
    sourceId: {type:Number,required:true},
    destinationId:{type:Number,required:true},
    sourceName: {type:String,required:true},
    destinationName: {type:String,required:true},
    isSuccessful:{type:Boolean,required:true},
    }
  ],
  createdAt:{
    type:Date,
    default:Date.now
  }
},


);


module.exports=mongoose.model("Migration",migrationschema);
