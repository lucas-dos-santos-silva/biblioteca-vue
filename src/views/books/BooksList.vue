<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Toolbar from 'primevue/toolbar';
import DataTable from 'primevue/datatable';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import Column from 'primevue/column';
import Dialog from 'primevue/dialog';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useLibraryStore } from '@/composables/useLibraryStore';


const dt = ref();
const products = ref([]);
const productDialog = ref(false);
const product = ref({});
const selectedProducts = ref();
const titleFilter = ref('');
const authorFilter = ref('');
const publisherFilter = ref('');

const store = useLibraryStore();

const productsFromStore = computed(() => store.books.value.map(b => ({
    ...b,
    author: store.getAuthor(b.authorId)?.name || '-',
    publisher: store.getPublisher(b.publisherId)?.name || '-'
})));

const _ = productsFromStore; 

const router = useRouter();

const filteredProducts = computed(() => {
    const t = titleFilter.value?.toLowerCase().trim();
    const a = authorFilter.value?.toLowerCase().trim();
    const p = publisherFilter.value?.toLowerCase().trim();

    return productsFromStore.value.filter((b) => {
        const titleMatch = !t || (b.title || '').toString().toLowerCase().includes(t);
        const authorMatch = !a || (b.author || '').toString().toLowerCase().includes(a);
        const publisherMatch = !p || (b.publisher || '').toString().toLowerCase().includes(p);
        return titleMatch && authorMatch && publisherMatch;
    });
});

const getAuthorName = (authorId) => {
    return store.getAuthor(authorId)?.name || '-';
}

const getPublisherName = (publisherId) => {
    return store.getPublisher(publisherId)?.name || '-';
}
const openNew = () => {
    router.push({ name: 'books.create' });
};

const editProduct = (prod) => {
    router.push({ name: 'books.edit', params: { id: prod.id } });
};

const goToCreateBook = () => router.push({ name: 'books.create' });
const goToEditBook = (id) => router.push({ name: 'books.edit', params: { id } });
const goToAuthor = (id) => router.push({ path: `/authors/${id}` });
const goToPublisher = (id) => router.push({ path: `/publishers/${id}` });

const onRowClick = (event) => {
    product.value = { ...event.data };
    productDialog.value = true;
}


</script>
<template>
    <div class="flex text-2xl">
        <span>Livros</span>
    </div>

    <Toolbar class="mb-6 mt-6">

        <template #end>
            <Button label="Inserir Livro" icon="pi pi-plus" class="mr-2" @click="goToCreateBook" severity="success" />
        </template>
    </Toolbar>

    <div>
        <DataTable
            ref="dt"
            scrollable
            scrollHeight="65vh"
            v-model:selection="selectedProducts"
            :value="filteredProducts"
            dataKey="id"
            :paginator="true"
            :rows="10"
            :sortField="'author'"
            :sortOrder="1"
            rowHover
            @row-click="onRowClick"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} livros"
        >
            <template #header>
                <div class="flex flex-wrap gap-2 items-center justify-between">
                    <h4 class="m-0">Lista de Livros</h4>
                    <div class="flex gap-2 items-center">
                        <IconField>
                            <InputIcon>
                                <i class="pi pi-search" />
                            </InputIcon>
                            <InputText v-model="titleFilter" placeholder="Buscar título..." />
                        </IconField>

                        <InputText v-model="authorFilter" placeholder="Buscar autor..." class="ml-2" />
                        <InputText v-model="publisherFilter" placeholder="Buscar editora..." class="ml-2" />
                    </div>
                </div>
            </template>

            <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
            <Column field="id" header="ID" sortable style="min-width: 6rem"></Column>
            <Column field="title" header="Título" sortable style="min-width: 16rem">
                <template #header>
                    <label for="title">Título</label>
                </template>
                <template #body="slotProps">
                    {{ slotProps.data.title }}
                </template>
            </Column>
            <Column header="Capa">
                <template #header>
                    <label for="cover">Capa</label>
                </template>
                <template #body="slotProps">
                    <img :src="slotProps.data.cover" :alt="slotProps.data.title" class="rounded" style="width: 64px" id="cover" />
                </template>
            </Column>
            <Column field="author" header="Autor" sortable style="min-width: 12rem">
                <template #header>
                    <label for="author">Autor</label>
                </template>
                <template #body="slotProps">
                    {{ slotProps.data.author }}
                </template>
            </Column>
            <Column field="publisher" header="Editora" sortable style="min-width: 12rem">
                <template #header>
                    <label for="publisher">Editora</label>
                </template>
                <template #body="slotProps">
                    {{ slotProps.data.publisher }}
                </template>
            </Column>
            <Column field="year" header="Ano" sortable style="min-width: 6rem">
                <template #header>
                    <label for="year">Ano</label>
                </template>
            </Column>
            <Column header="Sinopse" style="min-width: 24rem">
                <template #header>
                    <label for="sinopsis">Sinopse</label>
                </template>
                <template #body="slotProps">
                    {{ slotProps.data.sinopsis ? (slotProps.data.sinopsis.length > 120 ? slotProps.data.sinopsis.slice(0,120) + '...' : slotProps.data.sinopsis) : '' }}
                </template>
            </Column>
            <Column :exportable="false" style="min-width: 12rem">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" variant="outlined" rounded class="mr-2" @click.stop.prevent="goToEditBook(slotProps.data.id)" />
                    <Button icon="pi pi-user" variant="outlined" rounded class="mr-2" @click.stop.prevent="goToAuthor(slotProps.data.authorId)" />
                    <Button icon="pi pi-building" variant="outlined" rounded class="mr-2" @click.stop.prevent="goToPublisher(slotProps.data.publisherId)" />
                </template>
            </Column>
        </DataTable>
    </div>

    <Dialog v-model:visible="productDialog" header="Detalhes do Livro" :modal="true" :style="{ width: '70rem' }">
        <div v-if="product">
            <div class="flex gap-4">
                <img :src="product.cover" :alt="product.title" class="w-1/3 rounded-2xl"/>
                <div class="border border-gray-300 rounded-2xl p-2 w-full">
                    <h3 class="text-3xl font-semibold">Livro: {{ product.title }}</h3>
                    <p class="text-2xl text-muted">Autor: <span class="italic">{{ getAuthorName(product.authorId) }}</span></p>
                    <p class="text-lg text-muted">Editora: <span class="italic">{{ getPublisherName(product.publisherId) }}</span></p>
                    <p class="text-lg text-muted">Ano: {{ product.year }}</p>
                    <p class="mt-3 text-lg">{{ product.sinopsis }}</p>
                </div>
            </div>
        </div>
    </Dialog>
</template>