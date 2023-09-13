import {Schema, model} from "mongoose";

interface IReview extends Document {
    userId: string;
    title: string;
    description: string;
    imageUrl: string;
}

const ReviewSchema = new Schema<IReview>({
    title: {type: String, required: true},
    description: {type: String, required: true},
    imageUrl: {type: String, required: true},
});

const Review = model<IReview>('Review', ReviewSchema);

export default Review;
