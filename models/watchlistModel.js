import mongoose from "mongoose";
// description: "Cast out from his clan, a young Predator finds an unlikely ally in a damaged android and embarks on a treacherous journey in search of the ultimate adversary."
// ​
// genre: Array(3) [ "Action", "Science Fiction", "Adventure" ]
// ​
// imdbId: "tt31227572"
// ​
// poster: "/pHpq9yNUIo6aDoCXEBzjSolywgz.jpg"
// ​
// runtime: 107
// ​
// score: 76
// ​
// title: "Predator: Badlands"
// ​
// year: "2025"
const movieSchema = new mongoose.Schema({
  imdbId: {
    type: String,
    required: [true, "A movie must have an api id"],
  },
  title: { type: String, required: [true, "A movie must have a name"] },
  description: String,
  score: Number,
  poster: String,
  runtime: Number,
  year: String,
  id: String,
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
