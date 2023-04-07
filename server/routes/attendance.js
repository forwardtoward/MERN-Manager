const router = require("express").Router();
const isAuthenticated = require("../middleware/auth");

const {
  createClass,
  getClasses,
  deleteClass,
  updateClass,
  markAttendance,
  bookClass,
  getAttendance,
  deleteAttendance,
  deleteBooking,
  updateWholeSeries,
  getClassBooking,
  oneTimeSchedule,
  ongoingTimeSchedule,
} = require("../controllers/classAttendance");
// Create event updateWholeSeries
router.post("/create/", isAuthenticated, createClass);
router.post("/update/", isAuthenticated, updateClass);
router.post("/updateWholeSeries/", isAuthenticated, updateWholeSeries);
router.get("/all/:userId", isAuthenticated, getClasses);
router.delete("/:type/:classId", isAuthenticated, deleteClass);

//Add attendance
router.post("/bookClass/", isAuthenticated, bookClass);
router.post("/mark-attendance/", isAuthenticated, markAttendance);
router.get("/get-attendance/:classId", isAuthenticated, getAttendance);
router.get("/get-classBooking/:classId", isAuthenticated, getClassBooking);
router.post("/deleteBooking/:bookingId", isAuthenticated, deleteBooking);
router.post("/delete-attendance/:attendanceId", isAuthenticated, deleteAttendance);

/*router.post("/add-guests", isAuthenticated, addNewGuests)
router.get("/info/:eventId", isAuthenticated, getEventInfo); */
// Reschedule
router.post("/oneTimeSchedule/", isAuthenticated, oneTimeSchedule);
router.post("/ongoingTimeSchedule/", isAuthenticated, ongoingTimeSchedule);

module.exports = router;
