export default class Author {
    constructor( data = {}) {
        this.id = data.id;
        this.name = data.name;
        this.birthYear = data.birthYear;
    }
}