import {Schema, model} from "mongoose";

interface IReview extends Document {
    userId: string;
    title: string;
    year: string;
    genre: string;
    description: string;
    imageUrl: string;
}

const ReviewSchema = new Schema<IReview>({
    //userId: {type: String, required: true},
    title: {type: String, required: true, text: true,},
    description: {type: String, required: true, text: true,},
    year: {type: String, required: true, text: true,},
    genre: {type: String, required: true, text: true,},
    imageUrl: {type: String, required: true},
});

const Review = model<IReview>('Review', ReviewSchema);

export default Review;
