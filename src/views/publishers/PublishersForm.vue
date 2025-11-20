<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import { useLibraryStore } from '@/composables/useLibraryStore';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

const route = useRoute();
const router = useRouter();
const store = useLibraryStore();
const id = route.params.id;
const toast = useToast();

const isNew = id === 'novo';
const form = ref({
  name: ''
});
const errors = ref({});

onMounted(() => {
  if (!isNew) {
    const publisher = store.getPublisher(id);
    if (!publisher) {
      router.push({ name: 'publishers.index' });
      return;
    }
    form.value = {
      name: publisher.name
    };
  }
});

const validate = () => {
  errors.value = {};
  if (!form.value.name || !form.value.name.trim()) errors.value.name = 'Nome é obrigatório';
  return Object.keys(errors.value).length === 0;
};

const submit = () => {
  if (!validate()) return;
  if (isNew) {
    store.addPublisher({
      name: form.value.name
    });
    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Editora criada com sucesso!', life: 3000 });
  } else {
    store.updatePublisher(id, {
      name: form.value.name
    });
    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Editora editada com sucesso!', life: 3000 });
  }
  router.push({ name: 'publishers.index' });
};

const cancel = () => router.push({ name: 'publishers.index' });
</script>
<template>
  <div class="p-4 max-w-4xl mx-auto w-full">
    <h1 class="text-2xl font-bold mb-6">{{ isNew ? 'Nova Editora' : 'Editar Editora' }}</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="col-span-1">
  <label for="name" class="block mb-2 text-sm font-medium">Nome <span class='sr-only'>(Campo obrigatório)</span></label>
  <InputText id="name" v-model="form.name" placeholder="Digite o nome da editora" class="w-full" aria-label="Nome da editora" />
        <div v-if="errors.name" class="text-red-600 text-sm mt-1">{{ errors.name }}</div>
      </div>
      <div class="col-span-1 md:col-span-2 flex gap-4 mt-4">
        <Button label="Salvar" icon="pi pi-check" severity="success" @click="submit" />
        <Button label="Cancelar" icon="pi pi-times" class="p-button-secondary" @click="cancel" />
      </div>
    </div>
  </div>
</template>
