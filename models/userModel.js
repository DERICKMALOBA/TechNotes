import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    roles:[
        {
            type: String,
            default:"Employee"




        }
    ],
    active: {
        type: Boolean,
        default: true
    }

})

const userModel = mongoose.model('userModel', userSchema)
export default userModel;