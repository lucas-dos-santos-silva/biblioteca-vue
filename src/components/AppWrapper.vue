<script setup>
    import { RouterView } from 'vue-router';
    import Toast from 'primevue/toast';
    import { isArray } from '@/utils/utils.js';

    const menus = [
        {
            label: 'Livros',
            icon: 'pi pi-book',
            path: '/books'
        },
        {
            label: 'Autores',
            icon: 'pi pi-user',
            path: '/authors'
        }
        ,
        {
            label: 'Editoras',
            icon: 'pi pi-building',
            path: '/publishers'
        }
    ];

    const fixedItems = [
        {
            label: 'profile',
            icon: 'pi pi-user',
            path: '/profile'
        },
        {
            label: 'settings',
            icon: 'pi pi-cog',
            path: '/settings'
        },
    ]

    function switchToDarkMode() {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    }
</script>
<template>
    <div class="flex w-full h-screen dark:bg-neutral-900 bg-white dark:text-white">
        <div>
            <div class="m-2 p-3 rounded-2xl bg-gray-100 dark:bg-neutral-600 max-h-full">
                <ul class="space-y-4">
                    <li v-for="(fixedItem, index) in fixedItems" :key="fixedItem.path ?? index">
                        <RouterLink :to="fixedItem.path" class="block">
                            <div class="relative flex items-center p-3 rounded-2xl hover:bg-gray-200 transition-colors duration-600 cursor-pointer ease-linear dark:hover:text-black group">
                                <i :class="[fixedItem.icon, 'text-2xl']" aria-hidden="true" />
                                <span class="pointer-events-none whitespace-nowrap absolute left-16 ml-1 text-lg text-white font-medium rounded-lg px-2 py-1 bg-black bg-opacity-80 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                                    {{ fixedItem.label }}
                                </span>
                            </div>
                        </RouterLink>
                    </li>
                    <li @click="switchToDarkMode">
                        <div class="relative flex items-center p-3 rounded-2xl hover:bg-gray-200 cursor-pointer dark:hover:text-black">
                            <i class="pi pi-moon text-2xl"/>
                            <span class="pointer-events-none whitespace-nowrap absolute left-16 ml-1 text-lg text-white font-medium rounded-lg px-2 py-1 bg-black bg-opacity-80 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                                Modo Escuro
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="m-2 p-3 bg-gray-100 dark:bg-neutral-600 max-h-full rounded-2xl">
                <ul class="space-y-4">
                    <li v-for="(menu, index) in menus" :key="menu.path ?? index">
                        <RouterLink :to="menu.path" class="block">
                            <div class="relative flex items-center p-3 rounded-2xl hover:bg-gray-200 dark:hover:text-black cursor-pointer group">
                                <i :class="[menu.icon, 'text-2xl']" aria-hidden="true" />
                                <span class="pointer-events-none whitespace-nowrap absolute left-16 ml-1 text-lg text-white font-medium rounded-lg px-2 py-1 bg-black bg-opacity-80 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                                    {{ menu.label }}
                                </span>
                            </div>
                        </RouterLink>
                    </li>
                </ul>
            </div>
        </div>
        <div class="flex h-full w-full">
            <div class="p-2 w-full h-full">
                <div class="pt-3 border border-black/10 rounded-2xl px-4 pb-4 max-h-[98vh] max-w-full overflow-auto">
                    <RouterView />
                </div>
            </div>
        </div>
    </div>

    <Toast position="bottom-center">
        <template #message="{ message }">
            <span :class="[
                'p-toast-message-icon',
                'pi',
                {
                    'pi-check': message.severity === 'success',
                },
                {
                    'pi-exclamation-triangle':
                        message.severity === 'warning',
                },
                { 'pi-times': message.severity === 'error' },
                {
                    'pi-info-circle': message.severity === 'info',
                },
            ]"></span>
            <div class="p-toast-message-text">
                <span class="p-toast-summary">{{ message.summary }}</span>
                <div class="p-toast-detail">
                    <template v-if="!isArray(message.detail)">
                        <span class="text-black">{{ message.detail }}</span>
                    </template>
                    <p
                        v-else
                        class="m-0"
                        v-for="(item, index) in message.detail"
                        :key="index"
                    >
                        {{ item }}
                    </p>
                </div>
            </div>
        </template>
    </Toast>
</template>
<style scoped lang="less">
/* input.css */
@custom-variant dark (&:where(.dark, .dark *));

</style>