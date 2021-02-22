import express from "express";
import http from "http";
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
        this.createRoutes();
    }

    private config() {
        //
    }

    private createRoutes()
    {
        this.express.get( "/", ( request, response)=>{
            response.send(
                "Express Server"
            );
        });
        
        this.express.get( "/books/", async ( request, response )=>{
            //await Database.sequelize.sync();
            const books = await Database.Book.findAll();
            console.log( books );
        
            response.send(books);
        });
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