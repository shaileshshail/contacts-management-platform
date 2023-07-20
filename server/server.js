const express= require("express");
const errorHandler= require("./middlerware/errorHandler");
const connectDB = require("./config/dbConnection");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const credentials = require("./middlerware/credentials");
const corsOptions = require("./config/corsOptions");
require("dotenv").config();

connectDB(); 
const app = express();

const port=process.env.PORT || 5001;

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use("/api/contacts",require("./routes/contactRoutes"));
app.use("/api/users",require("./routes/userRoutes"));
app.use("/api/refresh",require("./routes/refreshRoutes"));
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})