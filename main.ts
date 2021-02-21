import express from "express";
import { port } from "./server-config.json";

const app = express();

app.get( "/", ( request, response)=>{
    response.send(
        "Express Server"
    );
});

app.listen( port, ()=>{
    console.log(`Server running on port ${port}`);
});