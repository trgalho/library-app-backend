import express from "express";

export abstract class BaseController {
    protected router : express.Router;

    protected abstract get routePrefix() : string;

    constructor(){
        this.router = express.Router();
    }

    public registerRouter( app : express.Router ){
        app.use( this.routePrefix, this.router );
    }
}