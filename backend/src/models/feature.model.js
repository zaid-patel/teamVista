import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const featureSchema=new Schema(
    {
        
        section:{
            type:Schema.Types.ObjectId,
            ref:"Section",
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
        isCompleted:{
            type:Boolean,
            default:false,
        },
        assignedTo:[
            {
                type:Schema.Types.ObjectId,
                ref:"User",
            }
        ],
        deadline:{
            type:Date,
            required:true,
        },
        resources:[
            {
                type:String,
            }
        ]



        
    },
    {
        timestamps:true
     } 

)


featureSchema.plugin(mongooseAggregatePaginate)

export const Feature=mongoose.model('Feature',featureSchema)
