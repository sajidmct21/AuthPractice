import { app } from "./app.js";
import { dbConnection } from "./dbconnection.js";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 3000;
dbConnection()
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running at http://localhost:${port}`);
    })
})