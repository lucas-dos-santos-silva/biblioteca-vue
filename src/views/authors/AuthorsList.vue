<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useLibraryStore } from '@/composables/useLibraryStore';

const router = useRouter();
const store = useLibraryStore();

const filteredAuthors = computed(() => store.authors.value);

const goToAuthor = (id) => router.push({ name: 'authors.show', params: { id } });
const goToCreate = () => router.push({ name: 'authors.create', params: { id: 'novo' } });

</script>
<template>
  <div class="p-4 max-w-4xl mx-auto w-full">
    <h1 class="text-2xl font-bold mb-6">Autores</h1>
    <Button label="Novo Autor" icon="pi pi-plus" class="mb-4" @click="goToCreate" />
    <DataTable :value="filteredAuthors" class="w-full" stripedRows>
      <Column field="id" header="<label for='author-id'>ID</label>" />
      <Column field="name" header="<label for='author-name'>Nome</label>" />
      <Column field="birthYear" header="<label for='author-birthYear'>Ano de Nascimento</label>" />
      <Column header="Ações">
        <template #body="slotProps">
          <Button label="Ver" icon="pi pi-eye" @click="goToAuthor(slotProps.data.id)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
