import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const sectionSchema=new Schema(
    {
        project:{
            type:Schema.Types.ObjectId,
            ref:"Project",
            required:true,
        },
        title:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            default:"",
        },
        features:[
            {
                type:Schema.Types.ObjectId,
                ref:"Feature",
            }
        ],
        resources:[
            {
                type:Schema.Types.ObjectId,
                ref:"Document",
            }
        ],
        memebers:[
            {
                type:Schema.Types.ObjectId,
                ref:"User",
            }
        ]



        
    },
    {
        timestamps:true
     } 

)


sectionSchema.plugin(mongooseAggregatePaginate)

export const Section=mongoose.model('Section',sectionSchema)
