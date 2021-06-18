require('dotenv').config()
const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;
const bdd = require("./models/setup");
const persons = require("./routes/persons")
const medicalRds = require("./routes/medicalRd")
const firestations = require("./routes/firestations")
const firestationForPerson = require("./routes/getPersonStation")
const router = express.Router();
const {personPopulateDb, medicalRdPopulateDb, firestationPopulateDb, addFkeysFromCreation, addFkFirestationToPerson} = require("./routes/populateDb");

app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use('/Person', persons);
app.use('/MedicalRd', medicalRds);
app.use('/Firestation', firestations);
app.use('/firestationPerson', firestationForPerson)

app.get('/', (req, res)=>{
    res.send("hello world")
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

bdd.sequelize.sync({alter: true})
.then(() => {
    const port = 3050; //? RECUPERE UN PORT LIBRE SINON 3000
    app.listen(port, () => {
        console.log("Ok ca marche");
        console.log("sur serveur" + port);
    });
});