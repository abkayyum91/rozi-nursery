import mongoose, {Document, Schema} from "mongoose";

interface ICategory extends Document{
    name: string;
    slug: string;
    imageUrl: string;
    imagePublicId: string;
    trending: boolean;
}

const categorySchema = new Schema<ICategory>({
    name: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    slug:{
        type: Schema.Types.String,
        required: true
    },
    imageUrl: {
        type: Schema.Types.String,
        required: true
    },
    imagePublicId: {
        type: Schema.Types.String,
        required: true
    },
    trending:{
        type: Schema.Types.Boolean,
        required: true,
    }
}, {timestamps: true})


export const Category = mongoose.models.Category || mongoose.model<ICategory>("Category", categorySchema)