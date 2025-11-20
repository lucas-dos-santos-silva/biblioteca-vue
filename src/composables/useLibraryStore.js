import { reactive, computed } from 'vue';
import data from '@/data.json';

const state = reactive({
    books: [],
    authors: [],
    publishers: [],
});

(function init() {
    state.books = data.books.map(b => ({
        id: b.id,
        title: b.title,
        year: b.year,
        cover: b.cover,
        sinopsis: b.sinopsis || b.sinopsis || b.sinopsis,
        authorId: b.authorId,
        publisherId: b.publisherId,
    }));

    state.authors = data.authors.map(a => ({ ...a }));
    state.publishers = data.publishers.map(p => ({ ...p }));
})();

function nextId(collection) {
    if (!collection.length) return 1;
    const max = Math.max(...collection.map(i => Number(i.id) || 0));
    return max + 1;
}

export function useLibraryStore() {
    const books = computed(() => state.books);
    const authors = computed(() => state.authors);
    const publishers = computed(() => state.publishers);

    function addBook(book) {
        const id = nextId(state.books);
        const b = { ...book, id };
        state.books.push(b);
        return b;
    }

    function updateBook(id, payload) {
        const idx = state.books.findIndex(b => b.id == id);
        if (idx === -1) return null;
        state.books[idx] = { ...state.books[idx], ...payload };
        return state.books[idx];
    }

    function getBook(id) {
        return state.books.find(b => String(b.id) === String(id));
    }

    function addAuthor(author) {
        const id = nextId(state.authors);
        const a = { ...author, id };
        state.authors.push(a);
        return a;
    }

    function getAuthor(id) {
        return state.authors.find(a => String(a.id) === String(id));
    }

    function updateAuthor(id, payload) {
        const idx = state.authors.findIndex(a => String(a.id) === String(id));
        if (idx === -1) return null;
        state.authors[idx] = { ...state.authors[idx], ...payload };
        return state.authors[idx];
    }

    function addPublisher(pub) {
        const id = nextId(state.publishers);
        const p = { ...pub, id };
        state.publishers.push(p);
        return p;
    }

    function getPublisher(id) {
        return state.publishers.find(p => String(p.id) === String(id));
    }

    function updatePublisher(id, payload) {
        const idx = state.publishers.findIndex(p => String(p.id) === String(id));
        if (idx === -1) return null;
        state.publishers[idx] = { ...state.publishers[idx], ...payload };
        return state.publishers[idx];
    }

    return {
        books,
        authors,
        publishers,
        addBook,
        updateBook,
        getBook,
        addAuthor,
        getAuthor,
        updateAuthor,
        addPublisher,
        getPublisher,
        updatePublisher,
    };
}
