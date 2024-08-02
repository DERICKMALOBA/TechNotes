import mongoose from "mongoose";
import AutoIncrement from "mongoose-sequence"; 

const autoIncrement = AutoIncrement(mongoose); 

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "userModel"
    },
    title: { 
        type: String,
        required: true
    },
    text: {
        type: String,
        default: "Employee"
    },
    complete: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

noteSchema.plugin(autoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 500
});

const noteModel = mongoose.model('noteModel', noteSchema);
export default noteModel;
