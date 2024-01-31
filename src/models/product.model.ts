import mongoose, { Schema } from "mongoose";
import { TProduct } from "@/types";

 

const productSchema = new Schema<TProduct>({
    productType: {
        type: Schema.Types.String,
        required: true,
        lowercase: true,
    },
    title: {
        type: Schema.Types.String,
        required: true,
        lowercase: true,
    },
    titleSlug: {
        type: Schema.Types.String,
        required: true,
    },
    category: {
        type: Schema.Types.String,
        required: true,
        lowercase: true,
    },
    categorySlug: {
        type: Schema.Types.String,
        required: true,
    },
    bestSeller: {
        type: Schema.Types.Boolean,
    },
    mrp: {
        type: Schema.Types.Number,
        required: true,
    },
    price: {
        type: Schema.Types.Number,
        required: true,
    },
    imageUrl: {
        type: Schema.Types.String,
        required: true,
    },
    imagePublicId: {
        type: Schema.Types.String,
        required: true,
    },
    tags: [{
        type: Schema.Types.String,
        required: true,
        lowercase: true,
    }],
    desc: {
        type: Schema.Types.String,
    },

}, {timestamps: true});




export const Product = mongoose.models.Product || mongoose.model<TProduct>("Product", productSchema);