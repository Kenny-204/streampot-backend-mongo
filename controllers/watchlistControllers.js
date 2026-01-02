import Watchlist from "../models/watchlistModel.js";

export async function getAllWatchlists(req, res) {
  try {
    const watchlists = await Watchlist.find();
    res
      .status(200)
      .json({ status: "success", length: watchlists.length, data: watchlists });
  } catch (err) {
    console.log(err);
  }
}

export async function getWatchlist(req, res) {
  try {
    const { watchlistId } = req.params;
    const [watchlist] = await Watchlist.find({ _id: watchlistId }).select(
      "-userId -movies._id",
    );
    res.status(200).json({ status: "success", data: watchlist });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
}

export async function getAllWatchlistsForUser(req, res) {
  try {
    const userId = "user001";
    const watchlists = await Watchlist.find({ userId }).select("-movies");
    res
      .status(200)
      .json({ status: "success", length: watchlists.length, data: watchlists });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
}

export async function createWatchlist(req, res) {
  try {
    const { userId, name, description } = req.body;
    const newWatchlist = await Watchlist.create({ userId, name, description });
    res.status(201).json({ status: "success", data: newWatchlist });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ status: "error", message: { err } });
  }
}

export async function addMovieToWatchlist(req, res) {
  try {
    const watchlistId = req.params.watchlistId;
    const { apiId, name, description, score, image } = req.body;
    const watchlist = await Watchlist.findOneAndUpdate(
      { _id: watchlistId },
      { $addToSet: { movies: { apiId, name, description, score, image } } },
    );
    res.status(200).json({ status: "success", data: watchlist });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
}

export async function deleteMovieFromWatchlist(req, res) {
  try {
    const { watchlistId, movieId } = req.params;
    await Watchlist.findOneAndUpdate(
      { _id: watchlistId },
      { $pull: { movies: { _id: movieId } } },
    );

    res.status(204).json({ status: "success" });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
}
