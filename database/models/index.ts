import  * as Sequelize from "sequelize";
import configs from "../config/config.json"
import BookFactory from "./book";

function getConfigForEnv() : Sequelize.Options
{
  switch( process.env.NODE_ENV ){
    default:
    case "development":
      return configs.development as any;
    case "production":
      return configs.production as any;
    case "test":
      return configs.test as any;
  }
}

function parseStorage( config : Sequelize.Options ) : void
{
  config.storage = `${__dirname}/../${config.storage}`;
}

const config = getConfigForEnv();

parseStorage( config );

console.log( config );

const sequelize = new Sequelize.Sequelize( config );

const Book = BookFactory( sequelize, Sequelize.DataTypes );

export default {
  sequelize,
  Sequelize,
  Book
}
