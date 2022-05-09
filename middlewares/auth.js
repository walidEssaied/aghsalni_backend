const { Token } = require('../models/Token');
require("jsonwebtoken");

let auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; 
    
    const decoded = require("jsonwebtoken").verify(token, process.env.JWT_KEY);

    Token.findOne({_utilisateurId: decoded.utilisateurId, token, tokenType: 'login'}, (err, utilisateurToken) => {
if(err) throw err;
if(!utilisateurToken){
    return res.json({
        isAuth: false,
    })
}        
req.token = token;
req.utilisateurId = decoded.utilisateurId;
next();
    })

}
module.exports = {auth}