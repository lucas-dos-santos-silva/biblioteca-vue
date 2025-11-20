<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { useLibraryStore } from '@/composables/useLibraryStore';

const router = useRouter();
const store = useLibraryStore();

const filteredPublishers = computed(() => store.publishers.value);

const goToPublisher = (id) => router.push({ name: 'publishers.show', params: { id } });
const goToCreate = () => router.push({ name: 'publishers.edit', params: { id: 'novo' } });

</script>
<template>
  <div class="p-4 max-w-4xl mx-auto w-full">
    <h1 class="text-2xl font-bold mb-6">Editoras</h1>
    <Button label="Nova Editora" icon="pi pi-plus" class="mb-4" @click="goToCreate" />
    <DataTable :value="filteredPublishers" class="w-full" stripedRows>
  <Column field="id" header="<label for='publisher-id'>ID</label>" />
  <Column field="name" header="<label for='publisher-name'>Nome</label>" />
      <Column header="Ações">
        <template #body="slotProps">
          <Button label="Ver" icon="pi pi-eye" @click="goToPublisher(slotProps.data.id)" />
        </template>
      </Column>
    </DataTable>
  </div>
</template>
