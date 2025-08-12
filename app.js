const express = require('express')
const userouter=require('./routes/user.routes')
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const connectToDB = require('./config/db')
const indexRouter = require('./routes/index.routes')
const ejs = require('ejs');
dotenv.config();
connectToDB();


app.set('view engine','ejs');
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/',indexRouter)
app.use('/user',userouter)
app.listen(3000,(res,req)=>{
    console.log('server is running on port 3000')
})
console.log("App started successfully. Press any key to exit.");
require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
}).question("Press ENTER to close...", () => process.exit());