const express = require('express');
const { getAllAppointments, getAppointment } = require('../controllers/AppointmentController');
const router = express.Router();

router.get('/', getAllAppointments);

module.exports = router;