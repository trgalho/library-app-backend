'use strict';

const random_words =  require('./random-words.json');

function getRandom( maxRange = 1 ) {
  return Math.random() * maxRange;
}

function getRandomInt( maxRange ){
  return Math.floor( getRandom( maxRange ) );
}

function getRandomText(){
  const size = 1 + getRandomInt( 4 );
  
  let words = [];

  for( let i = 0; i < size; i++ )
  {
    const randomIndex =getRandomInt( random_words.length - 1 );

    const randomWord = random_words[randomIndex];

    words.push( randomWord );
  }

  return words.join(" ");
}

function generateFakeBook( Sequelize ){
  
  const fakeBook = {
    isbn: Math.floor( getRandom( 10000000000000 ) ),
    title: getRandomText(),
    subtitle: getRandomText(),
    description: getRandomText(),
    price: getRandom( 250 ),
    createdAt: new Date(),
    updatedAt: new Date()
  };

  console.log(fakeBook);

  return fakeBook;
}

function generateFakeBooks( Sequelize, numOfBooks )
{
  let books = [];

  for( let i = 0; i < numOfBooks; i++ ){
    books.push( generateFakeBook( Sequelize ) );
  }

  return books;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert("Books", generateFakeBooks( Sequelize, 20 ), {} );

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    //await queryInterface.bulkInsert("Book", null, {} );
  }
};
