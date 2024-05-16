const mongoose  =require('mongoose')
const Schema  =mongoose.Schema

const FactureSchema = new mongoose.Schema(
    {
        chauffeur: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chauffeur",
            required: true,
        },
        TotalAmountPerDay:[
            {
                day:{
                    type:Date,
                    required:true
                },
                totalAmount:{
                    type:Number,
                    required:true
                }
            }
        ],
       
      

        montant: {
            type: Number,
        },
      
        isPaid: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Facture = mongoose.model('Facture', FactureSchema);
module.exports = Facture;
const changeStream = Facture.watch();

// Listen for change events
changeStream.on('change', (change) => {
    console.log('Change occurred:', change);

    // React to changes accordingly
    // For example, you can emit an event or perform any other action
});