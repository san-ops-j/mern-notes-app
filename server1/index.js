let express = require("express");
let mongoose = require("mongoose");
const enquiryRouter = require("./App/route/web/enquiryRoutes");
let cors = require('cors')
require('dotenv').config();
let app=express();
app.use(cors())

app.use(express.json());
app.use('/api/auth', enquiryRouter)

//connect to mangoDB
mongoose.connect( process.env.DBURL).then(()=>{
    console.log("connected to mongoDB")
    app.listen(process.env.PORT || 3000,()=>{
        console.log("server is Running "+process.env.PORT)
    })

}).catch((err)=>{console.log(err)})