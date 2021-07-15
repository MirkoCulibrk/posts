const mongoose = require('mongoose');
const bcrypt=require('bcryptjs');
const userSchema =  mongoose.Schema({
  email: String,
  password: String,
}, {
    versionKey: false 
});

userSchema.statics.findUser = async function (email, password) {
  const user = await User.findOne({ email});
  if(!user){
    return;
  }
  const isMatch=await bcrypt.compare(password,user.password);
  if(!isMatch){
    return;
  }
  return user;
};
userSchema.pre('save',async function(next){
    const user=this;
    if(user.isModified("password")){
      user.password=await bcrypt.hash(user.password,8);
    }
    next();
})
const User = mongoose.model('ModelName', userSchema);

module.exports = User;