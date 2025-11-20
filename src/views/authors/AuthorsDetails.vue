<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useLibraryStore } from '@/composables/useLibraryStore';

const route = useRoute();
const router = useRouter();
const store = useLibraryStore();
const id = route.params.id;

const author = computed(() => store.getAuthor(id));
const books = computed(() => store.books.value.filter(b => b.authorId == id));
const goToEdit = () => router.push({ name: 'authors.edit', params: { id } });

</script>
<template>
  <div class="p-4 max-w-4xl mx-auto w-full">
    <h1 class="text-2xl font-bold mb-6">Autor</h1>
    <div v-if="author">
      <div class="mb-4">
        <div><strong>ID:</strong> {{ author.id }}</div>
        <div><strong>Nome:</strong> {{ author.name }}</div>
        <div><strong>Ano de Nascimento:</strong> {{ author.birthYear }}</div>
      </div>
      <Button label="Editar Autor" icon="pi pi-pencil" class="mb-6" @click="goToEdit" />
      <Button label="Novo Autor" icon="pi pi-plus" class="mb-6 ml-2" @click="router.push({ name: 'authors.edit', params: { id: 'novo' } })" />
      <h2 class="text-xl font-semibold mb-2">Livros do Autor</h2>
      <DataTable :value="books" class="w-full" stripedRows>
        <Column field="id" header="<label for='book-id'>ID</label>" />
        <Column field="title" header="Título" />
        <Column field="year" header="Ano" />
      </DataTable>
    </div>
    <div v-else class="text-red-600">Autor não encontrado.</div>
  </div>
</template>
