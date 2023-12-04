import mongoose, {model,Schema,Document} from "mongoose";



interface todoPrint extends Document{
    title:string
    description: string
    user:mongoose.Types.ObjectId  //reference to the user who owns the todo
    completed:boolean
    createdAt:Date
}


const todoSchema = new Schema<todoPrint>({

    title:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        
    },
    completed:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    user:{
        type:Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

})



const Todo = model<todoPrint>("Todo",todoSchema);


export default Todo