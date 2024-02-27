const mongoose  =require('mongoose')
const Schema  =mongoose.Schema

const FactureSchema = new mongoose.Schema(
    {
        chauffeur: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chauffeur",
            required: true,
          //  unique :true 
        },
        date: {
            type: Date,
            required: true
        },

        montant: {
            type: Number,
        },
        description: {
            type: String,
            trim: true
        },
        isPaid: {
            type: Boolean,
            default: false
        },
        paymentDate: {
            type: Date
        },
        dayKilometrage:{
            type:Number
        },
        nightKilometrage:{
            type:Number
        },
    },
    {
        timestamps: true
    }
);

const Facture = mongoose.model('Facture', FactureSchema);
module.exports = Facture;