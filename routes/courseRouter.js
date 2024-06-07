
const Router = require("express");
const router = new Router();
const CourseController = require("../controllers/courseController")

router.post("/add", CourseController.addCourse);
router.post("/delete/:id", CourseController.deleteCourse);
router.put("/update/:id", CourseController.updateCourseName);
router.get("/:id", CourseController.getCourseById);
router.get("/", CourseController.getAllCourse);

module.exports = router