const express = require('express');
const routes = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Commentaire = require('../models/Commentaire');
const { Token } = require('../models/Token');
const { type } = require('express/lib/response');
const {auth} = require('../middlewares/auth');
/*const { resetPassword }  = require('../utils/emailTemplates')
const { sendEmail } = require('../utils/sendEmail');*/
//const { Router } = require('express');
const commentaire = require('../models/Commentaire');
const res = require('express/lib/response');




// ajouter un commentaire

routes.post('/addAvis', async(req, res)=>{



try {
   await commentaire.create(req.body)
   res.status(201).json({message: " commentaire ajouter avec succes"}) 
} catch (error) {
    console.log(error.message);
}
})

//modifier un commentaire

routes.put("/MC/:id", async(req, res)=>{

try {
    const Newcomt = await Commentaire.findOneAndUpdate({_id: req.params.id}, 
        req.body, 
        {new : true})
    res.status(201).json(Newcomt )    
} catch (error) {
  console.log(error.message);  
}


})



// supprimer in commentaire

routes.delete('/deletecomt/:id', async (req, res)=>{

try {
    await Commentaire.deleteOne({_id: req.params.id})
    res.status(201).json({message:"commentaire supprimer avec succes"});
} catch (error) {
    console.log(error.message);
}


})


// select touts les commentaire
routes.get('/getcomm', async (req, res) =>{
    try {
        const listcomt = await Commentaire.find();
        res.status(201).json(listcomt)
    } catch (error) {
        console.log(error.message);
    }
})


// select un seul commentaire



routes.get('/getcommbyId/:id', async ( req, res)=>{

try {
    
const oneComt = await Commentaire.findOne({_id:req.params.id});
res.status(201).json(oneComt);

} catch (error) {
  console.log(error.message);  
}



})













/*routes.post("/register", async (req, res) => {
    const {
      cin,
        nom,
      prenom,
      role,
      Adr,
      Num_tel,
      MPass
    } = req.body;
  
    const {
        email,
        Nom_station,
        type_lavage,
        latitude,
        longitude,
        password,
        Role
      } = req.body;
    
    try {
       
      const newUser = new Utilisateur({
        cin,
        nom,
      prenom,
      role,
      Adr,
      Num_tel,
      MPass
      });
  
      const searchUser = await Utilisateur.findOne({
        Adr
      });
      if (searchUser) {
        return res.status(500).send({
          msg: "compte déja existe"
        });
      }
  
  
  
      const salt = 10;
      const gensalt = await bcrypt.genSalt(salt);
      const hashedPassword = await bcrypt.hash(MPass, gensalt);
      newUser.MPass = hashedPassword;
  
  
      let result = await newUser.save();
  
      res.status(200).send({
        user: result,
        msg: "enregistrer avec succes"
      });}
      else if( Role == "lavage"){


        const newStation = new Station({
            email,
        Nom_station,
        type_lavage,
        latitude,
        longitude,
        password,
        Role
          });
      
          const searchStation = await Station.findOne({
            email
          });
          if (searchStation) {
            return res.status(500).send({
              msg: "compte déja existe"
          });
          }
      
      
      
          const salt = 10;
          const gensalt = await bcrypt.genSalt(salt);
          const hashedPassword = await bcrypt.hash(password, gensalt);
          newStation.password = hashedPassword;
      
      
          let result = await newStation.save();
      
          res.status(200).send({
            station: result,
            msg: "enregistrer avec succes"
          });









      }
    } catch (error) {
      console.log(error)
      res.status(400).send("vous pouvez pas enregistrer utilisteur");
    }
  })




/*

//get satation avec status false
routes.get('/getbyrole', async (req,res)=>{
 try {
    const st = await Station.find({
        statut: false

    }) 
    res.status(200).send(st)
 } catch (error) {
     console.log(error);
     res.status(401).send(error)
 }
})
    
    
//get all station


routes.get('/getAll', async (req,res)=>{
    try {
       const st = await Station.find({
        
   
       }) 
       res.status(200).send(st)
    } catch (error) {
        console.log(error);
        res.status(401).send(error)
    }
   })



routes.put('/mdf/:id', async (req, res) =>{
    try {
       const id = req.params.id
       let mdd = {
           statut:true
       }
       let aa = await Station.findByIdAndUpdate({_id:id},{...mdd}
        
        )
        res.status(200).send(mdd)
    } catch (error) {
      console.log(error);  
      res.status(401).send(error)
    }
})



routes.delete('/dl/:id', async (req,res)=>{
try {
    const id = req.params.id
    let aa = await Station.deleteOne({_id:id})
    res.status(200).send("supprimer avec succes")
} catch (error) {
    console.log(error);  
      res.status(401).send(error)
}

})





    

routes.post("/login", (req, res) => {
    Utilisateur.findOne({Adr: req.body.Adr}).exec().then((utilisateur) => {
if(!utilisateur){
    return res.status(401).json({
        message: "Utilisateur n'est pas trouve",
        status: false,
        data: undefined
    })
}
bcrypt.compare(req.body.MPass, utilisateur.MPass, async(err, result) => {
    if(err){
        return res.status(401).json({
            status: false,
            message: "Server error, authentification failed",
            data: undefined
        })
    }

    if(result){
        const token = jwt.sign(
            {

                Adr: utilisateur.Adr,
                utilisateurId: utilisateur._id          
              },
                process.env.JWT_KEY,
                {
                    expiresIn: "2h"
                
            }

        );
  


        await Token.findOneAndUpdate({_utilisateurId: utilisateur._id, tokenType: "login"},{token: token},  {new: true, upsert: true})
       return res.status(200).json({
      status: true, 
      message: "login successfuly",
      data: {
          token,
          utilisateur
      }

       })
    }
 
    return res.status(401).json({
        status: true,
        message: "worng password, login failed",   
         data: undefined
 })
})
    })
.catch((err)=>{
    res.status(500).json({
        status: false,  
        message: "server error, authentification failed ",
        data: undefined 
    })
})
});

routes.get("/logout",auth, (req, res) => {
    Token.findOneAndDelete({_utilisateurId: req.utilisateurId, type: "login"}, (err, doc) => {
        if(err) return res.status(401).json({
          status: false,
          message: "server error, logout failed",
        })
        return res.status(200).json({
            status: true,
            message: 'logout successfly'
        })
    
    })
})

routes.get("/authUser", auth, (req,res) => {
    const utilisateurId =req.utilisateurId
    Utilisateur.findById(utilisateurId, (err, utilisateur) =>{
        if(err){
            return res.status(401).json({
                status: false,
                message: "Authentification failed",
                data: undefined
            })
        }
        if(utilisateur){
            res.status(200).json({
                data: utilisateur,
                message: "Authentification successfully!",
                status: true,
            })
        }

    })
})




// modifier un utilisateur

routes.put("/m/:id", async (req, res) => {
    
    try {
     
        const data = await Utilisateur.findOneAndUpdate(
          { _id: req.params.id },
          req.body,
          { new: true }
        )
        res.status(201).json(data);
      }
     catch (error) {
      console.log(error.message);
    }})

 
// supprimer un utilisateur


routes.delete('/supprimerutl/:id', async (req,res)=>{
    try {
        const id = req.params.id
        let SU = await Utilisateur.deleteOne({_id:id})
        res.status(200).send("utilisateur supprimer avec succes ")
    } catch (error) {
        console.log(error);  
          res.status(401).send(error)
    }
    
    })

// get all utilisateur

routes.get('/getutilisateurs', async (req,res)=>{
    try {
       const list = await Utilisateur.find({
        
   
       }) 
       res.status(200).send(list)
    } catch (error) {
        console.log(error);
        res.status(401).send(error)
    }
   })






   










/*routes.post("/forgotPassword", (req, res)=>{
    const {email} = req.body;
    Utilisateur.findOne({email}, (err, utilisateur) =>{
if(err|| !utilisateur){
    return res.status(400).json({
        status: false,
        message: "Error or utilisateur not exist",
        data: undefined
    })
}
const token = jwt.sign({
email: utilisateur.email,
utilisateurId: utilisateur._id
},
process.env.JWT_RESET_PW_KEY,
{
   expiresIn: "20m",
}
)
Token.findOneAndUpdate({_utilisateurId: utilisateur._id, tokenType: " resetPassword"}, {token: token}, {
    new: true, upsert: true
},(err, doc) => {
    if(doc){
        const emailTemplate = resetPassword(email, token);
        sendEmail(emailTemplate);
        res.status(200).json({
        status: true,
        message: "Email for rset password has been sent",
    })
    }else{
        return res.status(400).json({
            status: false,
            message: "Server error",
            data: undefined
        })
    }
})
})
});




routes.put("/resetPassword/:token", (req, res) => {
    const token = req.params.token;
    const { newPassword } = req.body;

    try {
        const decoded = jtw.verify(token, process.env.JWT_RESET_PW_KEY);
        Token.findOne({_utilisateurId: decoded.utilisateurId, token: token, tokenType: "resetPassword"}, async(err, doc) =>{
if(err){
    console.log(err);
    return res.status(500).json({
        status: false,
        message: "Invalid token",
        data: undefined,
    })
}
const utilisateur = await Utilisateur.findOne({email: decoded.email});
bcrypt.hash(newPassword, 10, (err, hash) => {
if (err) {
    console.log(err);
    return res.status(500).json({
        status: false,
        message: "Error, cannot encrypt password",
        data: undefined,  
    })
}
utilisateur.password = hash;
utilisateur
.save()
.then(async (result) => {
    await Token.findOneAndDelete({_utilisateurId: utilisateur.id, tokenType: 'resetPassword' });
res.status(200).json({
    status: false,
    message : "pasword reset was successfuly ",
    data: result
})
})
.catch((err) => {
res.status(500).json({
    status: false,
    message : "Server error ",
    error: err
})
})
         })
    })
    }catch(error){
res.status(500).json({
    status: false,
    message: "Server error",
    error 
})
    }
});

routes.put("/changePassword", auth, async (req, res) => {
    const {oldPassword, newPassword} = req.body;
const utilisateurId = req.utilisateurId;
const utilisateur = await Utilisateur.findById(utilisateurId);
if(utilisateur){
    bcrypt.compare(oldPassword, utilisateur.password, (err, isMatch) => {
        if(err){
            return res.status(500).json({
                status: false,
                message: "Server error",
                error: err
            })
        }
        else if(isMatch){
            bcrypt.hash(newPassword, 10, async (err ,hash) =>{
                if(err){
                    return res.status(500).json({
                status: false,
                message: "Error, cannot enncrypt password",
                error: err
            })
        
            }
            utilisateur.password = hash;
            utilisateur.save().then(updatedUtilisateur => {
                return res.status(200).json({
                    status: true,
                    message: "Password changed succefily",
                   data: updatedUtilisateur
                })
        })
    })
}

else{
    return res.status(401).json({
    status: true,
    message: "old password incorrect",
    data:undefined    
    })
}

})
}


})*/
module.exports = routes;