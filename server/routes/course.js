const router = require("express").Router();
const results = require("../validators");
const isAuthenticated = require("../middleware/auth");
const {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/course");

const {
  createQuiz,
  getQuizByCourseLesson,
  submitQuizSolution,
  checkQuizSolution,
  submitAndCheckQuizScore,
} = require("../controllers/courseQuiz");

const {
  createAssignment,
  getAssignmentById,
  updateAssignment,
  getAssignmentByCourseLesson,
  uploadAssignmentSolution,
  assignmentGrading,
} = require("../controllers/courseAssignment");
const { createLesson, deleteLesson, getLesson } = require("../controllers/courseLesson");
const { createVideo, deleteVideo } = require("../controllers/courseVideo");

const { singleUploadControl } = require("../middleware/upload");

router.post("/create", isAuthenticated, singleUploadControl, results, createCourse);
router.get("/", isAuthenticated, results, getCourses);
router.get("/courseId/:id", isAuthenticated, results, getCourse);
router.put("/courseId/:id", isAuthenticated, singleUploadControl, results, updateCourse);
router.delete("/courseId/:id", isAuthenticated, results, deleteCourse);

// quiz routes
router.post("/quiz/:lessonId", isAuthenticated, createQuiz);
router.get("/courseId/:id/lesson/:lessonId/quiz", isAuthenticated, getQuizByCourseLesson);
router.get("/courseId/:id/quiz/:quizId/check-solution", isAuthenticated, checkQuizSolution);
router.put("/courseId/:id/quiz/:quizId/submit", isAuthenticated, submitQuizSolution);
router.get("/courseId/:id/lesson/:lessonId/submit", isAuthenticated, submitAndCheckQuizScore);

// assignment routes
router.post("/courseId/:id/lesson/:lessonId/assignment", isAuthenticated, createAssignment);
router.get("/courseId/:id/assignment/:assignmentId", isAuthenticated, getAssignmentById);
router.put("/courseId/:id/assignment/:assignmentId", isAuthenticated, updateAssignment);
router.get(
  "/courseId/:id/lesson/:lessonId/assignment",
  isAuthenticated,
  getAssignmentByCourseLesson
);
router.put(
  "/courseId/:id/assignment/:assignmentId/submit",
  isAuthenticated,
  uploadAssignmentSolution
);
router.put(
  "/courseId/:id/assignment/:assignmentId/solution/:solutionId/score",
  isAuthenticated,
  assignmentGrading
);

// lessons routes
router.post("/lesson/:courseId", isAuthenticated, results, createLesson);
router.delete("/lessonId/:lessonId", isAuthenticated, results, deleteLesson);
router.get("/lesson/:courseId", isAuthenticated, results, getLesson);

// courseVideo Routes
router.post("/coursevideo/:lessonId", isAuthenticated, results, createVideo);
router.delete("/coursevideo/:videoId", isAuthenticated, results, deleteVideo);
// router.put("/coursevideo/:videoId",isAuthenticated,results,updateVideo);

module.exports = router;
