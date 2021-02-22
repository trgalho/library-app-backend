import express from "express";
import http from "http";
import { loadControllers } from "../controllers";
import { BookController } from "../controllers/BookControllers";
import { Database } from "../database";
import { port } from "../express-config.json";
import { PromiseResolver } from "../libs/PromiseResolver";
import { Nullable } from "../libs/Types";

class AppClass {
    private express : express.Application;

    private server : Nullable<http.Server>;
    
    constructor(){
        this.express = express();
        this.server = null;

        this.config();
    }

    private config() {        
        loadControllers( this.express );
    }
    
    private async listen() : Promise<void> {
        const promiseResolver = new PromiseResolver<void>();

        this.server = this.express.listen( port, ()=>{
            console.log(`Server running on port ${port}`);

            promiseResolver.resolve();
        });

        return promiseResolver.getPromise();
    }

    public async run() {
        return this.listen();
    }
}

export const App = new AppClass();