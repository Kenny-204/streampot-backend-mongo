import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  apiId: {
    type: String,
    required: [true, "A movie must have an api id"],
  },
  name: { type: String, required: [true, "A movie must have a name"] },
  description: String,
  score: Number,
  image: String,
  addedAt: { type: Date, default: Date.now() },
});

const watchlistSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, "A watchlist must have a user"],
  },
  name: {
    type: String,
    // unique: true,
    required: [true, "A Watchlist must have a name"],
  },
  description: String,
  movies: {
    type: [movieSchema],
    default: [],
  },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: Date,
});

watchlistSchema.pre(/^find/, function () {
  this.select("-__v ");
});

const Watchlist = mongoose.model("watchlist", watchlistSchema);

export default Watchlist;
