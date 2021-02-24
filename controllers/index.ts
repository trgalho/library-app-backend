import express from "express";
import { BASE_API_SCHEMA } from "../express-config";
import { BaseController } from "./BaseController";
import { BookController } from "./BookControllers";

const controllers : Array<BaseController> = [];

controllers.push( new BookController() );

const apiV1Router = express.Router();

for( const controller of controllers ){
    controller.registerRouter( apiV1Router );
}

export function loadControllers( app : express.Router ){
    app.use(BASE_API_SCHEMA, apiV1Router);
}