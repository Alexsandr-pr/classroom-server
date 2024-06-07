const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const courseRouter = require("./courseRouter");
const commentRouter = require("./commentRouter");


router.use("/user", userRouter);
router.use("/course", courseRouter);
router.use("/comment", commentRouter);
module.exports = router
