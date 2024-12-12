/**
 * @author Bryan Mejia
 * 
 * @description
 * - Defines the schema for the location model, will be used to
 *   help with defining location factors. 
 *
 */

const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    coordinates: {
        lat: {
            type: Number,
            required: true,
        },
        lng: {
            type: Number,
            required: true,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Location = mongoose.model('Location', LocationSchema);
module.exports = Location;