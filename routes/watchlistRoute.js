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

router.route("/").get(protect, getAllWatchlistsForUser).post(protect,createWatchlist);
router.route("/:watchlistId").get(protect,getWatchlist);
router.route("/:watchlistId/movies/:movieId").delete(protect,deleteMovieFromWatchlist);
router.route("/:watchlistId/movies").post(protect,addMovieToWatchlist);

export default router;
