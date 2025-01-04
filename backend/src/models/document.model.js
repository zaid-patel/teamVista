import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const documentSchema=new Schema(
    {
        fileName:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        library:{
            type:Schema.Types.ObjectId,
            ref:"Section",
            required:true,
        }

        
    },
    {
        timestamps:true
     } 

)


documentSchema.plugin(mongooseAggregatePaginate)

export const Document=mongoose.model('Document',documentSchema)
