import express from "express";
import { BaseController } from "./BaseController";
import { BookController } from "./BookControllers";

const controllers : Array<BaseController> = [];

controllers.push( new BookController() );

const apiV1Router = express.Router();

for( const controller of controllers ){
    controller.registerRouter( apiV1Router );
}

export function loadControllers( app : express.Router ){
    app.use("/api/v1/", apiV1Router);
}