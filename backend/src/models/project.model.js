import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const projectSchema=new Schema(
    {
        logo:{
            type:String,
            required:true,
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User",
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
        keywords:[
            {
                type:String,
                
            }
        ],
        isPublic:{
            type:Boolean,
            default:true,
        },
        phase:{
            type: String,
            enum: ['ideation', 'development','active','closed'], 
            default: 'ideation' 
        },
        sections: {
            type: [
                {
                    type: Schema.Types.ObjectId,
                    ref: "Section",
                }
            ],
            default: [],
        },
        members:[
            {
                type:Schema.Types.ObjectId,
                ref:"User",
            }
        ],
        joinReqs:[
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


projectSchema.plugin(mongooseAggregatePaginate)

export const Project=mongoose.model('Project',projectSchema)
