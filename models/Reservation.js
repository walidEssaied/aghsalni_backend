const mongoose = require( 'mongoose');

const Schema = mongoose.Schema;

const userSchema = Schema({
   idStation: {
       type: String
   },
    date_heure: {
        type: String,
        
    },
    marque_vehicule: {
        type: String,
    },
    Nature_vehicule: {
        type: String
    },
    Nom_client:{
        type:String
    },
    Prenom_client:{
        type:String
    },
    etat :{ type:Boolean,
    default :false,
    },
   Utilistauer : {
       type: mongoose.Schema.Types.ObjectId,
       ref: "utilisateur"
   },
   Station : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "station" 
   }
});
module.exports = mongoose.model('reservation', userSchema);