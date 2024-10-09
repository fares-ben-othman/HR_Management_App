const express =require('express'); // importation mte3 express
const pool = require('./connection'); // bech ne3mel el connexion lil data base
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoute= require('./routes/user');
const leaveRoute= require('./routes/leave');
const bonusRoute= require('./routes/bonus');
const path = require('path');
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(bodyParser.json({ limit: '10mb' }));  // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors()); 
app.use(express.json());
//http://127.0.0.1:3000

app.use('/user', userRoute);
app.use('/leave',leaveRoute);
app.use('/bonus',bonusRoute);



app.listen( 3000 ,()=>{
    console.log('server work');
});









