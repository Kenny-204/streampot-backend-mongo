import express from "express";
import {
  createWatchlist,
  getWatchlist,
  getAllWatchlistsForUser,
  addMovieToWatchlist,
  deleteMovieFromWatchlist,
} from "../controllers/watchlistControllers.js";
import { protect } from "../controllers/authController.js";

const router = express.Router();

router.route("/").get(protect, getAllWatchlistsForUser).post(createWatchlist);
router.route("/:watchlistId").get(getWatchlist);
router.route("/:watchlistId/movies/:movieId").delete(deleteMovieFromWatchlist);
router.route("/:watchlistId/movies").post(addMovieToWatchlist);

export default router;
