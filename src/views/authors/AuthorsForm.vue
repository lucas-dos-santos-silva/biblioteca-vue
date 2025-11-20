<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { useLibraryStore } from '@/composables/useLibraryStore';

const route = useRoute();
const router = useRouter();
const store = useLibraryStore();
const id = route.params.id;
const toast = useToast();

const isNew = id === 'novo';
const form = ref({
  name: '',
  birthYear: ''
});
const errors = ref({});

onMounted(() => {
  if (!isNew) {
    const author = store.getAuthor(id);
    if (!author) {
      router.push({ name: 'authors.index' });
      return;
    }
    form.value = {
      name: author.name,
      birthYear: author.birthYear
    };
  }
});

const validate = () => {
  errors.value = {};
  if (!form.value.name || !form.value.name.trim()) errors.value.name = 'Nome é obrigatório';
  if (!form.value.birthYear || isNaN(Number(form.value.birthYear))) errors.value.birthYear = 'Ano de nascimento válido é obrigatório';
  return Object.keys(errors.value).length === 0;
};

const submit = () => {
  if (!validate()) return;
  if (isNew) {
    store.addAuthor({
      name: form.value.name,
      birthYear: Number(form.value.birthYear)
    });
    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Autor criado com sucesso!', life: 3000 });
  } else {
    store.updateAuthor(id, {
      name: form.value.name,
      birthYear: Number(form.value.birthYear)
    });
    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Autor editado com sucesso!', life: 3000 });
  }
  router.push({ name: 'authors.index' });
};

const cancel = () => router.push({ name: 'authors.index' });
</script>
<template>
  <div class="p-4 max-w-4xl mx-auto w-full">
    <h1 class="text-2xl font-bold mb-6">{{ isNew ? 'Novo Autor' : 'Editar Autor' }}</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="col-span-1">
  <label for="name" class="block mb-2 text-sm font-medium">Nome <span class='sr-only'>(Campo obrigatório)</span></label>
  <InputText id="name" v-model="form.name" placeholder="Digite o nome do autor" class="w-full" aria-label="Nome do autor" />
        <div v-if="errors.name" class="text-red-600 text-sm mt-1">{{ errors.name }}</div>
      </div>
      <div class="col-span-1">
  <label for="birthYear" class="block mb-2 text-sm font-medium">Ano de Nascimento <span class='sr-only'>(Campo obrigatório)</span></label>
  <InputText id="birthYear" v-model="form.birthYear" placeholder="Ex: 1970" class="w-full" aria-label="Ano de nascimento do autor" />
        <div v-if="errors.birthYear" class="text-red-600 text-sm mt-1">{{ errors.birthYear }}</div>
      </div>
      <div class="col-span-1 md:col-span-2 flex gap-4 mt-4">
        <Button label="Salvar" icon="pi pi-check" severity="success" @click="submit" />
        <Button label="Cancelar" icon="pi pi-times" class="p-button-secondary" @click="cancel" />
      </div>
    </div>
  </div>
</template>
