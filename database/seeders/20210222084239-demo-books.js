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
  
function generateFakeBook(){
    
    const fakeBook = {
      isbn: Math.floor( getRandom( 10000000000000 ) ),
      title: getRandomText(),
      subtitle: getRandomText(),
      description: getRandomText(),
      price: getRandom( 250 ).toFixed(2),
      author: getRandomText(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
  
    console.log(fakeBook);
  
    return fakeBook;
}
  
function generateFakeBooks( numOfBooks )
{
    let books = [];
  
    for( let i = 0; i < numOfBooks; i++ ){
      books.push( generateFakeBook() );
    }
  
    return books;
}

const books1 = require('./books.json');
const books2 = require('./books-2.json');
const books3 = require('./books-3.json');


function normalizeBookInfo( book ){

  const fakeBook = generateFakeBook();

  for( const key in fakeBook ){
    if( book[key] == null ) continue;

    fakeBook[key] = book[key];
  }

  return fakeBook;
}


function getAllBooks(){
  const books = [];

  for( const bookInfoArray of [ books1, books2,books3 ]) {
    for( const bookInfo of bookInfoArray ){
      const normalized = normalizeBookInfo(bookInfo);

      const hasDuplicated = books.find( book => book.isb == normalized.isbn );
      if( hasDuplicated ){
        console.log( "duplicado", { normalized, found: hasDuplicated });
        continue;
      }

      books.push( normalized );
    }
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

    await queryInterface.bulkInsert("Books", getAllBooks(), {} );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
