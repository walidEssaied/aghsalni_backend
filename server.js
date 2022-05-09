const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./models/Utilisateurs');
const nodemailer = require('nodemailer');
const commentaire = require('./models/Commentaire');
const station = require('./models/station')
require("dotenv").config();
const cors = require('cors');
const app = express();
const reservation = require('./models/Reservation');
const bcrypt = require('bcrypt');
const connect = async () => {
    try {
        mongoose.connect("mongodb://localhost:27017/pfe_lavage",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            async (err) => {
                if (err) console.log(err);
                else {
                    let admin = await users.findOne({
                        role: "admin"
                    });
                    if (!admin) {
                        let MPass = 'admin'
                        const salt = await bcrypt.genSalt(10);
                        const hashed = await bcrypt.hash(MPass, salt);
                        let new_user = new users({
                            cin: 14785236,
                            nom: "oumaima",
                            prenom: "prenom",
                            Num_tel: "23690396",
                            Adr: "oumaimaAkaichi",
                            MPass: hashed,
                            role: "admin"
                        });

                        await new_user.save();
                        console.log(`admin account has been added : ${users.Adr}`);
                    } else {
                        console.log(`{admin account already exist \n admin Adresse : ${admin.Adr}}`);

                    }

                }

            }
        );
        console.log("database connected");
    } catch (error) {
        console.log(error);
        console.log("database not connected");
    }
}
connect()







// hedhom zedethom besh tnahi limit mtaa data
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello jwt");
});
app.get('/', () => {
    resizeBy.send('welcome to my  forma')
})

//app.use('/uploads', express.static('uploads'));

app.get("/uploads/:image", function (req, res) {
    res.sendFile(__dirname + "/uploads/" + req.params.image);
});


app.use("/utilisateur", require("./routers/utilisateurRoutes"));
app.use("/reservation", require("./routers/resrvationRoutes"));
app.use("/comme", require("./routers/commRoutes"));

app.post('/api/forma', (req, res) => {
    let data = req.body
    let smtpTransport = nodemailer.createTransport({
        host: 'smtp.gmail.email',
        service: 'gmail',

        port: 465,
        auth: {
            user: 'oumaimaakaichi00@gmail.com',
            pass: "12362953"
        }
    });

    let mailOptions = {
        from: data.email,
        to: req.body.email,
        subject: `Message from Bold agency`,
        html: `

<h3>Invitation</h3>

<ul>
<li>Bienvenue ${data.name} ${data.lastname}, nous sommes bold agency. 
Nous sommes heureux d'accepter notre invitation, après avoir
 rempli le formulaire d'inscription, 
qui se trouve dans le lien ci-dessous</li>

</ul>

<h3> Lien de formulaire </h3>
<ul>
<li>

</li></ul>
`
    };

    smtpTransport.sendMail(mailOptions, (error, response) => {
        if (error) { res.send(error) }
        else { res.send('Succes') }
    }
    )
    smtpTransport.close();

})
// search station
app.get("/search/:key", async (req, resp) => {
    let data = await station.find({
        "$or": [
            { Nom_station: { $regex: req.params.key } },
            { ville: { $regex: req.params.key } },
        ]
    })
    resp.send(data);
})
// search client
app.get("/searchClient/:key", async (req, resp) => {
    let data = await users.find({
        "$or": [
            { nom: { $regex: req.params.key } },


        ]
    })
    resp.send(data);
})






const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log("Server runing")
});

