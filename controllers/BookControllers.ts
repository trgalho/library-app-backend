import express from "express";
import { Database } from "../database";
import { BaseController } from "./BaseController";

export class BookController extends BaseController {

    constructor(){
        super();

        this.configureRoutes();
    }

    protected get routePrefix() { return "/book/" };

    public async getBook( request : express.Request, response : express.Response ){
        const { isbn } = request.params;

        const book = await Database.Book.findOne({
            where: { isbn }
        });

        if( book == null ){
            response.status( 404 ).send(`Livro não encontrado para o ISNB ${isbn}`);
        }
        else {
            response.send( book );
        }
    }

    private configureRoutes(){
        this.router.get( "/", this.getAllBooks.bind(this) );
        this.router.get("/:isbn", this.getBook.bind(this) );
    }

    private async getAllBooks( request : express.Request, response : express.Response ){
        const books = await Database.Book.findAll();        
        console.log( books );        
        response.send( books );
    }
}