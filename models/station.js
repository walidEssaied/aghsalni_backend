const mongoose = require( 'mongoose');
const  autoIncrement =('mongoose-auto-increment');


const userSchema = mongoose.Schema({
    email: {
        type: String,
        
    },
    Nom_station: {
        type: String,
        
       
    },
    type_lavage: {
        type:String,
       
       
    },
    latitude: {
        type:Number,
       
       
    },
    ville: {
        type:String,
       
       
    },
   adresse: {
        type:String,
       
       
    },
    longitude: {
        type:Number,
        
    },
    password:{
        type: String,
      
    },
    statut :{ type:Boolean,
    default :false,
    },
    Role :{ type:String
        
    
    },
    avatar:{
        type:String
    },
    reservation : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "reservation"
    }]



});



 module.exports = mongoose.model('station', userSchema);
