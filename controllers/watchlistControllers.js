import Watchlist from "../models/watchlistModel.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";

export const getAllWatchlists = catchAsync(async (req, res, next) => {
  const watchlists = await Watchlist.find();
  res
    .status(200)
    .json({ status: "success", length: watchlists.length, data: watchlists });
});

export const getWatchlist = catchAsync(async (req, res, next) => {
  const { watchlistId } = req.params;
  const [watchlist] = await Watchlist.find({ _id: watchlistId }).select(
    "-userId -movies._id"
  );
  res.status(200).json({ status: "success", data: watchlist });
});

export const getAllWatchlistsForUser = catchAsync(async (req, res, next) => {
  const userId = req.user._id
  const watchlists = await Watchlist.find({ userId }).select("-movies");

  res
    .status(200)
    .json({ status: "success", length: watchlists.length, data: watchlists });
});

export const createWatchlist = catchAsync(async (req, res, next) => {
  const { userId, name, description } = req.body;
  const newWatchlist = await Watchlist.create({ userId, name, description });
  res.status(201).json({ status: "success", data: newWatchlist });
});

export const addMovieToWatchlist = catchAsync(async (req, res, next) => {
  const watchlistId = req.params.watchlistId;
  const { apiId, name, description, score, image } = req.body;
  const watchlist = await Watchlist.findOneAndUpdate(
    { _id: watchlistId },
    { $addToSet: { movies: { apiId, name, description, score, image } } }
  );
  res.status(200).json({ status: "success", data: watchlist });
});

export const deleteMovieFromWatchlist = catchAsync(async (req, res, next) => {
  const { watchlistId, movieId } = req.params;
  await Watchlist.findOneAndUpdate(
    { _id: watchlistId },
    { $pull: { movies: { _id: movieId } } }
  );

  res.status(204).json({ status: "success" });
});
