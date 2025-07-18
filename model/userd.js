const mongoose=require('mongoose');
const { Schema } = mongoose; // ✅ Add this line

const userdSchema=new Schema({
 firstname:{
    type:String,
    required:true
 },
 lastname:{
    type:String,
    required:true
 },
 email:{
    type:String,
    required:true,
    unique:true
 },
 mobileno:{
    type:Number,
    required:true,
    unique:true
 },
  isGoogleUser: { type: Boolean, default: false },
 roles:{
    User:{type:Number,default:2001},
    Seller:Number,
    Admin:Number
 },
 password:{
    type:String,
    required:true
 },
 refreshToken:String

});
module.exports=mongoose.model('Userd',userdSchema);