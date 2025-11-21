import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue';
import BooksList from '@/views/books/BooksList.vue';
import BooksCreate from '@/views/books/BooksCreate.vue';
import BooksEdit from '@/views/books/BooksEdit.vue';
import BooksDetails from '@/views/books/BooksDetails.vue';


const routes = [
  { path: '/:pathMatch(.*)*', name: '404', component: () => import('../pages/404.vue'), },
  {
    path: '/',
    name: 'wrapper',
    component: () => import('../components/AppWrapper.vue'),
    children: [

      { path: '', redirect: '/books' },

      { path: "/books", name: "books.index", component: BooksList },
      { path: "/books/create", name: "books.create", component: BooksCreate },
      { path: "/books/:id", name: "books.show", component: BooksDetails },
      { path: "/books/:id/edit", name: "books.edit", component: BooksEdit },
      { path: "/authors", name: "authors.index", component: () => import('@/views/authors/AuthorsList.vue') },
      { path: "/authors/:id", name: "authors.show", component: () => import('@/views/authors/AuthorsDetails.vue') },
      { path: "/authors/:id(edit|novo)", name: "authors.edit", component: () => import('@/views/authors/AuthorsForm.vue') },
      { path: "/publishers", name: "publishers.index", component: () => import('@/views/publishers/PublishersList.vue') },
      { path: "/publishers/:id", name: "publishers.show", component: () => import('@/views/publishers/PublishersDetails.vue') },
      { path: "/publishers/:id(edit|novo)", name: "publishers.edit", component: () => import('@/views/publishers/PublishersForm.vue') },

    ]
  },

];

export default createRouter({
  history: createWebHistory(),
  routes,
});
