import Author from './Author.js';
import Publisher from './Publisher.js';

export default class Book {
    constructor( data = {}) {

        this.id = data.id;
        this.title = data.title;
        this.year = data.year; 
        this.cover = data.cover;
        this.synopsis = data.synopsis;

        this.author = data.author instanceof Author ? data.author : new Author(data.author);
        this.publisher = data.publisher instanceof Publisher ? data.publisher : new Publisher(data.publisher);
        
    }
}