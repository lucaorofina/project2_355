/**
 * @author Bryan Mejia
 * 
 * @description
 * - Define routes that will handle CRUD operations for locations.
 */

const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

router.post('/', locationController.createLocation);
router.get('/', locationController.getLocations);
router.get('/:id', locationController.getLocationById);
router.put('/:id', locationController.updateLocation);
router.delete('/:id', locationController.deleteLocation);

module.exports = router;
