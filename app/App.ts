import express from "express";
import http from "http";
import { loadControllers } from "../controllers";
import { PORT, ORIGIN } from "../express-config";
import { PromiseResolver } from "../libs/PromiseResolver";
import { Nullable } from "../libs/Types";
import cors from 'cors';

class AppClass {
    private express : express.Application;

    private server : Nullable<http.Server>;

    private cors : express.RequestHandler;
    
    constructor(){
        this.express = express();
        this.server = null;

        this.cors = cors( { origin: ORIGIN });

        this.config();
    }

    private config() {
        this.express.use( this.cors );
        loadControllers( this.express );
    }
    
    private async listen() : Promise<void> {
        const promiseResolver = new PromiseResolver<void>();

        console.log(`Starting server on port ${PORT}`);

        this.server = this.express.listen( PORT, ()=>{
            console.log(`Server running on port ${PORT}`);

            promiseResolver.resolve();
        });

        return promiseResolver.getPromise();
    }

    public async run() {
        return this.listen();
    }
}

export const App = new AppClass();