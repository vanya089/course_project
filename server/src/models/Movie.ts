import { Schema, model, Document, Model } from "mongoose";

interface IMovie extends Document {
    title: string;
    description: string;
    movieImageUrl: string;
}

const Movie: Model<IMovie> = model<IMovie>('Movie', new Schema<IMovie>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    movieImageUrl: { type: String, required: true },
}));

export default Movie;
