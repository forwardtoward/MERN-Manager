const router = require("express").Router();
const {
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
  getBookingType,
  getBookingDetail,

  getBookingTypeDetail,
  createBookingType,
  updateBookingType,
  deleteBookingType,
  cloneBookingType,
} = require("../controllers/calendar");

const {
  createAppointment,
  getAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointment");

const isAuthenticated = require("../middleware/auth");

// ** Booking
router.post("/booking/create", isAuthenticated, createBooking);
router.put("/booking/update/:id", isAuthenticated, updateBooking);
router.get("/booking/get", isAuthenticated, getBooking);
router.get("/booking/info/:link", isAuthenticated, getBookingDetail);
router.delete("/booking/delete/:id", isAuthenticated, deleteBooking);
router.post("/booking-type/create", isAuthenticated, createBookingType);
router.post("/booking-type/clone/:id", isAuthenticated, cloneBookingType);
router.put("/booking-type/update/:id", isAuthenticated, updateBookingType);
router.get("/booking-type/get", isAuthenticated, getBookingType);
router.get("/booking-type/info/:link", isAuthenticated, getBookingTypeDetail);
router.delete("/booking-type/delete/:id", isAuthenticated, deleteBookingType);

// ** Appointment
router.post("/appointment/create", isAuthenticated, createAppointment);
router.post("/appointment/update/", isAuthenticated, updateAppointment);
router.get("/appointment/get", isAuthenticated, getAppointment);
router.delete("/appointment/delete/:id", isAuthenticated, deleteAppointment);

module.exports = router;
