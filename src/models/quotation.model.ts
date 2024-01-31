import { TQuotation } from "@/types";
import mongoose, {Schema} from "mongoose";


const quotationSchema = new Schema<TQuotation>({
    fullName:{
        type: Schema.Types.String,
        required: true,
        unique: false,
        lowercase: true,
    },
    mobileNumber:{
        type: Schema.Types.Number,
        required: true,
        unique: false,
    },
    message: {
        type: Schema.Types.String,
        lowercase: true,
    },
    quotedProducts: [{
        imageUrl: {
            type: Schema.Types.String,
        },
        prodName: {
            type: Schema.Types.String,
        },
        price: {
            type: Schema.Types.Number,
        },
        qty: {
            type: Schema.Types.Number,
        }
    }]
}, {timestamps: true})



export const Quotation = mongoose.models.Quotation || mongoose.model<TQuotation>("Quotation", quotationSchema)