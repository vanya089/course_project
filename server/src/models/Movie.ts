import { Schema, model} from "mongoose";

interface IMovie extends Document {
    title: string;
    description: string;
    movieImageUrl: string;
}

const MovieSchema = new Schema<IMovie>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    movieImageUrl: { type: String, required: true },
});

const Movie = model<IMovie>('Movie', MovieSchema);

export default Movie;
