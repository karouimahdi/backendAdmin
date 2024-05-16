const mongoose = require('mongoose');
const Facture = require('./Facture');
const Chauffeur = require("./Chauffeur");

const rideRequestSchema = new mongoose.Schema({
  
  HealthStatus: {
    type: String,
    default: 'None'
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

rideRequestSchema.post('save', async function(rideRequest) {
  const chauffeur = await Chauffeur.findOne({ phone: rideRequest.driverPhone });
  if (!chauffeur) {
    throw new Error('Chauffeur not found');
  }


  
  console.log(`Chauffeur found: ${chauffeur?.Nom}`);

  const facture = await Facture.findOne({
    chauffeur: chauffeur._id,
    date: rideRequest.time.toISOString().split('T')[0],
  });

  if (!facture) {
    facture = new Facture({
      chauffeur: chauffeur._id,
      date: rideRequest.time.toISOString().split('T')[0],
      montant: rideRequest.fareAmount,
    });
  } else {
    facture.montant += rideRequest.fareAmount;
  }

  await facture.save();

  console.log(`Facture created/updated for chauffeur ${chauffeur.name} with date ${facture.date} and montant ${facture.montant}`);
});

const RideRequest = mongoose.model('RideRequest', rideRequestSchema);

module.exports = RideRequest;
