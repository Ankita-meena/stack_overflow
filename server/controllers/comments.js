import Comments from "../models/Comments.js";

export const postComment = async (req, res) => {
  const postCommentData = req.body;
  const userId = req.userId;
  const postComment = new Comments({ ...postCommentData, userId });
  try {
    await postComment.save();
    res.status(200).json({ statue: "success", data: { postComment } });
  } catch (error) {
    console.log(error);
    res.status(409).json("Couldn't post a new comment");
  }
};

export const getComment = async (req, res) => {
  const {qid} = req.query;

  try {
        const commentData = await Comments.find({qid})
        res.status(200).json({ statue: "success", data: { commentData } });
  } catch (error) {
        console.log(error);
        res.status(409).json("Couldn't get comment");
  }
};

export const updateComment = async (req, res) => {
  const {cid} = req.query;
  const body = req.body;

  try {
        const commentData = await Comments.findByIdAndUpdate(cid,body)

        res.status(200).json({ statue: "success", data: { commentData }});
  } catch (error) {
        console.log(error);
        res.status(409).json("Couldn't get comment");
  }
};

export const deleteComment = async (req, res) => {
  const {cid} = req.query;

  try {
        const commentData = await Comments.findByIdAndDelete(cid)

        res.status(200).json({ statue: "success"});
  } catch (error) {
        console.log(error);
        res.status(409).json("Couldn't get comment");
  }
};
