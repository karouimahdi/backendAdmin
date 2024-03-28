const mongoose = require('mongoose');

const rideRequestSchema = new mongoose.Schema({
  firebaseId:{
    type:String,
    unique: true
  },
  HealthStatus: {
    type: String,
    default: 'None'
  },
  carDetails: {
    carImmatriculation: {
      type: String,
      
    },
    carModel: {
      type: String,
      
    }
  },
  destination: {
    latitude: {
      type: Number,
      
    },
    longitude: {
      type: Number,
      
    }
    
  },
  destinationAddress: {
    type: String,
    
  },
  driverLocationData: {
    latitude: {
      type: Number,
      
    },
    longitude: {
      type: Number,
      
    }
    
  },
  fareAmount:{
    type:Number,
  },
    driverName: {
      type: String,
      
    },
    driverPhone: {
      type: String,
      
    },
  source: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    }
  },
  status: {
    type: String,
  },
  time: {
    type: Date,
    
  },
  userName: {
    type: String,
  },
  userPhone: {
    type: String,
  }
});

module.exports = mongoose.model('RideRequest', rideRequestSchema);