const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const brandsSchema=new Schema({
    name:{
        type:String,
        required:true
  
    },
    logourl:{
        type:String,
        required:true
    },
    sellerEmail: {
  type: String,
  required: true
}

},{timestamps:true});
module.exports=mongoose.model('Brands',brandsSchema);