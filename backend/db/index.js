const { default: mongoose } = require("mongoose");
 
mongoose.connect("mongodb+srv://sam7655677280:cWEBiE7yd4EmEmvo@cluster0.jmh7zz0.mongodb.net/paytm")  

const userSchema =  mongoose.Schema({
  username:{
    type:String, 
    trim:true,   
    lowercase:true,
    minLength:3,
    maxLength:30
  },
  firstname:{
    type:String,
    required:true,
    trim:true,
    maxLength:50
  }, 
  lastname:{
    type:String,
    required:true,
    trim:true,
    maxLength:50
  },
  password:{
    type:String,
    required:true,
    minLength:5
  }
})  

const accountSchema = mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  balance:{
    type:Number,
    require:true
  }

})

const User = mongoose.model('User', userSchema);
const Acount = mongoose.model('Acount',accountSchema)

module.exports = {User, Acount}
   