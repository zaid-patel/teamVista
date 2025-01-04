import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const issueSchema=new Schema(
    {
        content:{
            type:String,
            required:true,
        },
        title:{
            type:String,
            required:true,
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        project:{
            type:Schema.Types.ObjectId,
            ref:"Project",
            required:true,
        },
        resolved:{
            type:Boolean,
            default:false,
        }
        
    },
    {
        timestamps:true
     } 

)


issueSchema.plugin(mongooseAggregatePaginate)

export const Issue=mongoose.model('Issue',issueSchema)
