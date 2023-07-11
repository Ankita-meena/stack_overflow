import express from "express";
import {
  postComment,
  getComment,
  updateComment,
  deleteComment
} from "../controllers/comments.js";

const router = express.Router();

router.post("/post", postComment);
router.get("/get", getComment);
router.patch("/update", updateComment);
router.delete("/delete", deleteComment);

export default router;