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

const publisher = computed(() => store.getPublisher(id));
const books = computed(() => store.books.value.filter(b => b.publisherId == id));
const goToEdit = () => router.push({ name: 'publishers.edit', params: { id } });

</script>
<template>
  <div class="p-4 max-w-4xl mx-auto w-full">
    <h1 class="text-2xl font-bold mb-6">Editora</h1>
    <div v-if="publisher">
      <div class="mb-4">
        <div><strong>ID:</strong> {{ publisher.id }}</div>
        <div><strong>Nome:</strong> {{ publisher.name }}</div>
      </div>
      <Button label="Editar Editora" icon="pi pi-pencil" class="mb-6" @click="goToEdit" />
      <Button label="Nova Editora" icon="pi pi-plus" class="mb-6 ml-2" @click="router.push({ name: 'publishers.edit', params: { id: 'novo' } })" />
      <h2 class="text-xl font-semibold mb-2">Livros da Editora</h2>
      <DataTable :value="books" class="w-full" stripedRows>
        <Column field="id" header="<label for='book-id'>ID</label>" />
        <Column field="title" header="Título" />
        <Column field="year" header="Ano" />
      </DataTable>
    </div>
    <div v-else class="text-red-600">Editora não encontrada.</div>
  </div>
</template>
