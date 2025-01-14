const express = require('express');
const AppointmentController = require('../controllers/DogController');
const { getAllAppointments, getAppointment } = require('../controllers/AppointmentController');
const router = express.Router();

//GET all Appointments
router.get('/', getAllAppointments);

//GET Appointment by ID
router.get('/:id', getAppointment);

module.exports = router;