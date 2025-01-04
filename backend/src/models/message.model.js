import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const messageSchema=new Schema(
    {
        content:{
            type:String,
            required:true,
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        feature: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Feature',
        },
        section: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Section',
        },
    },
    {
        timestamps:true
     } 

)


messageSchema.pre('save', function (next) {
    if (this.feature && this.section) {
        return next(new Error('A message can only belong to either a feature or a section, not both.'));
    }
    if (!this.feature && !this.section) {
        return next(new Error('A message should belong to either a feature or a section.'));
    }
    next();
});



messageSchema.plugin(mongooseAggregatePaginate)

export const Message=mongoose.model('Message',messageSchema)
