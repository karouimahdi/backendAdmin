const RideRequest = require('../Models/AllRideRequest');
const Facture = require('../Models/Facture');

RideRequest.aggregate([
  {
      "$lookup": {
          "from": "chauffeurs",
          "localField": "driverPhone",
          "foreignField": "phone",
          "as": "driver"
      }
  },
  {
      "$unwind": "$driver"
  },
  {
      "$addFields": {
          "date": { "$toDate": "$time" },
          "day": { "$dayOfMonth": { "$toDate": "$time" } },
          "month": { "$month": { "$toDate": "$time" } },
          "year": { "$year": { "$toDate": "$time" } },
      }
  },
  {
      "$group": {
          "_id": {
              "chauffeur": "$driver._id",
              "month": "$month",
              "year": "$year",
              "day": "$day"
          },
          "totalAmountPerDay": { "$sum": "$fareAmount" }
      }
  },
  {
      "$group": {
          "_id": "$_id.chauffeur",
          "TotalAmountPerDay": { "$push": {
              "Day": "$_id.day",
              "Month": "$_id.month",
              "totalAmount": "$totalAmountPerDay"
          } },
          "totalFareAmount": { "$sum": "$totalAmountPerDay" }
      }
  },
  {
      "$project": {
          "_id": "$_id",
          "TotalAmountPerDay": 1,
          "montant": "$totalFareAmount"
      }
  },
  {
      "$out": "factures"
  }
], (err, result) => {
  if (err) {
      console.error('Error occurred during aggregation:', err);
  } else {
      console.log('Aggregation completed successfully:', result);
  }
});
const saveRide = async (req, res) => {
    try {
        const {
            HealthStatus,
            
            destination,
            
            driverLocation,
            fareAmount,
            driverName,
            driverPhone,
            source,
            status,
            time,
            userName,
            userPhone,
        } = req.body;

        // Créer une nouvelle instance de RideRequest
        const newRideRequest = new RideRequest({
            HealthStatus: HealthStatus,
            destination: {
                latitude: destination.latitude,
                longitude: destination.longitude
            },
            driverLocationData: {
                latitude: driverLocation.latitude,
                longitude: driverLocation.longitude
            },
            fareAmount: fareAmount,
            driverPhone: driverPhone,
            source: {
                latitude: source.latitude,
                longitude: source.longitude
            },
            status: status,
            time: time,
            userName: userName,
            userPhone: userPhone
        });

        // Sauvegarder la demande de trajet dans la base de données
        await newRideRequest.save();

        res.status(201).json({ message: 'Demande de trajet sauvegardée avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la sauvegarde de la demande de trajet :', error);
        res.status(500).json({ message: 'Erreur lors de la sauvegarde de la demande de trajet.' });
    }
};

  // const getfact = (req, res) => {
  //   RideRequest.aggregate(pipeline, (err, data) => {
  //     if (err) {
  //       res.status(500).send("Error during aggregation");
  //     } else {
  //       const factures = data.map((entry) => {
  //         return new Facture({
  //           chauffeur:entry.driverPhone,
  //           date: new Date(entry.time[0]), // assuming time is an array of dates
  //           montant: entry.totalFareAmount,
  //           description: "",
  //           isPaid: false,
  //         });
  //       });
  //       res.send(factures);
  //       console.log(factures);
  //     }
  //   });
  // };
  // Execute the aggregation pipeline
  // const result =  RideRequest.aggregate(pipeline)
  // console.log(result);

module.exports = { saveRide };
