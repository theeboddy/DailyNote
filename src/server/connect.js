const { MongoClient, ServerApiVersion } = require('mongodb')
const express = require('express')
const mongoose = require('mongoose');
const authRouter = require('./authRouter')
const cors = require("cors");
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000

const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
    allowedHeaders: "Content-Type"
};
  
const app = express()

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

app.use(cors(corsOptions));
app.use(express.json())
app.use("/authR", authRouter)

const test = async () => {
    try {
        await mongoose.connect('mongodb+srv://bmatv73:Q1xbicz9Zt32gbP8@cluster0.4tkg3vg.mongodb.net/DailyNote?retryWrites=true&w=majority')
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

test()