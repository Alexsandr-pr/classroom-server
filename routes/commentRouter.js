const Router = require("express");
const router = new Router();
const CommentController = require("../controllers/commentController")

router.post("/add", CommentController.addComment);
router.post("/delete/:id", CommentController.deleteComment);
router.put("/update/:id", CommentController.updateComment);
router.get("/:id", CommentController.getCommentById);
router.get("/course/:course_id", CommentController.getCommentsByCourseId);

module.exports = router