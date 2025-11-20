<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import Textarea from 'primevue/textarea';
import { useLibraryStore } from '@/composables/useLibraryStore';
import { useToast } from 'primevue/usetoast';

const router = useRouter();
const store = useLibraryStore();
const toast = useToast();

const form = ref({
    title: '',
    year: '',
    cover: '',
    authorId: null,
    publisherId: null,
    sinopsis: '',
});

const bookName  = computed(() => "Lucas dos Santos Silva");
const bookYear  = computed(() => form.value.year);
const bookCover  = computed(() => form.value.cover || 'https://via.placeholder.com/150x220?text=Capa+do+Livro');

const bookAuthor  = computed(() => {
    const author = store.getAuthor(form.value.authorId);
    return author ? author.name : 'Autor não selecionado';
});

const bookEditor  = computed(() => {
    const publisher = store.getPublisher(form.value.publisherId);
    return publisher ? publisher.name : 'Editora não selecionada';
});

const errors = ref({});

const validate = () => {
    errors.value = {};
    if (!form.value.title || !form.value.title.trim()) errors.value.title = 'Título é obrigatório';
    if (!form.value.year || isNaN(Number(form.value.year))) errors.value.year = 'Ano válido é obrigatório';
    if (!form.value.cover || !form.value.cover.trim()) errors.value.cover = 'URL da capa é obrigatória';
    if (!form.value.authorId) errors.value.authorId = 'Autor é obrigatório';
    if (!form.value.publisherId) errors.value.publisherId = 'Editora é obrigatória';
    if (!form.value.sinopsis || !form.value.sinopsis.trim()) errors.value.sinopsis = 'Sinopse é obrigatória';
    return Object.keys(errors.value).length === 0;
}

const submit = () => {
    if (!validate()) return;
    const created = store.addBook({
        title: form.value.title,
        year: Number(form.value.year),
        cover: form.value.cover,
        sinopsis: form.value.sinopsis,
        authorId: form.value.authorId,
        publisherId: form.value.publisherId,
    });
    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Livro salvo com sucesso!', life: 3000 });
    router.push({ name: 'books.index' });
}

const cancel = () => router.push({ name: 'books.index' });
</script>

<template>
    <div class="flex p-4 w-full">
        <div class="w-1/2">
            <h1 class="text-2xl font-bold mb-6">Inserir Livro</h1>
            
            <div class="flex w-full mb-10 space-x-10">
                <p class="content-end w-1/3 italic text-gray-500">Titulo pertencente ao livro</p>
                <div class="w-2/3"> 
                    <label for="title" class="block mb-2 text-sm font-medium">Título <span class='sr-only'>(Campo obrigatório)</span></label>
                    <InputText id="title" v-model="form.title" placeholder="Digite o título do livro" class="w-full" aria-label="Título do livro" />
                    <div v-if="errors.title" class="text-red-600 text-sm mt-1">{{ errors.title }}</div>
                </div>
            </div>
           

            <div class="flex w-full mb-10 space-x-10">
                <p class="content-end w-1/3 italic text-gray-500">Ano quando o livro foi publicado</p>
                <div class="w-2/3">
                    <label for="year" class="block mb-2 text-sm font-medium">Ano de Publicação <span class='sr-only'>(Campo obrigatório)</span></label>
                    <InputText id="year" v-model="form.year" placeholder="Ex: 1997" class="w-full" aria-label="Ano de publicação" />
                    <div v-if="errors.year" class="text-red-600 text-sm mt-1">{{ errors.year }}</div>
                </div>
            </div>

            <div class="flex w-full mb-10 space-x-10">
                <p class="content-end w-1/3 italic text-gray-500">Selecione o autor do livro</p>
                <div class="w-2/3">
                    <label for="author" class="block mb-2 text-sm font-medium">Autor <span class='sr-only'>(Campo obrigatório)</span></label>
                    <Dropdown id="author" :options="store.authors.value" optionLabel="name" optionValue="id" v-model="form.authorId" placeholder="Selecione um autor" class="w-full" aria-label="Autor do livro" />
                    <div v-if="errors.authorId" class="text-red-600 text-sm mt-1">{{ errors.authorId }}</div>
                </div>
            </div>

            <div class="flex w-full mb-10 space-x-10">
                <p class="content-end w-1/3 italic text-gray-500">Selecione a editora do livro</p>
                <div class="w-2/3">
                    <label for="publisher" class="block mb-2 text-sm font-medium">Editora <span class='sr-only'>(Campo obrigatório)</span></label>
                    <Dropdown id="publisher" v-if="store.publishers.value && store.publishers.value.length" :options="store.publishers.value" optionLabel="name" optionValue="id" v-model="form.publisherId" placeholder="Selecione uma editora" class="w-full" aria-label="Editora do livro" />
                    <div v-else class="text-red-600 text-sm mt-1">Nenhuma editora disponível</div>
                    <div v-if="errors.publisherId" class="text-red-600 text-sm mt-1">{{ errors.publisherId }}</div>
                </div>
            </div>

            <div class="flex w-full mb-10 space-x-10">
                <p class="content-end w-1/3 italic text-gray-500">Insira a o endereço eletronico</p>
                <div class="w-2/3">
                    <label for="cover" class="block mb-2 text-sm font-medium">URL da Capa <span class='sr-only'>(Campo obrigatório)</span></label>
                    <InputText id="cover" v-model="form.cover" placeholder="https://exemplo.com/capa.jpg" class="w-full" aria-label="URL da capa do livro" />
                    <div v-if="errors.cover" class="text-red-600 text-sm mt-1">{{ errors.cover }}</div>
                </div>
            </div>

            <div class="flex w-full mb-10 space-x-10">
                <p class="content-center w-1/3 italic text-gray-500">Insira a sinopse do livro</p>
                <div class="w-2/3">
                    <label for="sinopsis" class="block mb-2 text-sm font-medium">Sinopse <span class='sr-only'>(Campo obrigatório)</span></label>
                    <Textarea id="sinopsis" v-model="form.sinopsis" rows="6" placeholder="Digite uma breve descrição do livro" class="w-full" aria-label="Sinopse do livro" />
                    <div v-if="errors.sinopsis" class="text-red-600 text-sm mt-1">{{ errors.sinopsis }}</div>
                </div>
            </div>

            <div class="flex w-full mb-10 space-x-10">
                <p class="content-center w-1/3 italic text-gray-500">Clique para salvar</p>
                <div class="col-span-1 md:col-span-2 lg:col-span-3 flex gap-4 mt-4 w-2/3">
                    <Button label="Salvar" icon="pi pi-check" severity="success" @click="submit" />
                    <Button label="Cancelar" icon="pi pi-times" class="p-button-secondary" @click="cancel" />
                </div>
            </div>
        </div>
        <div class="book-preview border rounded-lg shadow-lg p-4 w-1/3 mx-auto mb-10" :style="{ backgroundImage: `url(${bookCover})` }">
            <h1 class="text-center text-gray-400 italic">Pré-visualização do Livro</h1>

            <h1 class="text-center text-3xl mt-20">{{  bookName  }}</h1>
            <h1 class="text-center text-xl mt-5">{{  bookAuthor  }}</h1>
            <h1 class="text-center content-end text-xl mt-5">{{  bookEditor }}</h1>
        </div>
    </div>
</template>

<style scoped>
.p-grid { gap: 0.75rem }
</style>