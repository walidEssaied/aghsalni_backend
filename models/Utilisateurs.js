const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const utilisateurSchema = Schema({

    cin: {
        type: Number,
        maxLength: 50
    },
    nom: {
        type: String,
        maxLength: 50
    },
    prenom: {
        type:String,
        maxLength:50
    },
    Num_tel: {
        type:Number,
        maxLength:8
    },
    Adr: {
        type:String,
        unique:true,
        trim: true
    },
    MPass:{
        type:String,
        minLength:6
    },
    email:{
 type:String
    },
    role: {
        type: String,
enum:["client","admin"]
    },
    reservation : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "reservation"
    }]
});

module.exports=  mongoose.model("utilisateur", utilisateurSchema);





