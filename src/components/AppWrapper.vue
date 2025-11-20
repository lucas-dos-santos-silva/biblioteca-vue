<script setup>
    import { RouterView } from 'vue-router';
    import Toast from 'primevue/toast';
    import { isArray } from '@/utils/utils.js';

    const menus = [
        {
            label: 'Livros',
            icon: 'pi pi-book',
            path: '/books'
        }
    ];

</script>
<template>
    <div class="flex w-full h-screen">
        <div class="m-2 p-3 bg-gray-100 h-[98vh] rounded-2xl min-w-[80px]">
            <ul class="space-y-4">
                <li v-for="(menu, index) in menus" :key="menu.path ?? index">
                    <RouterLink :to="menu.path" class="block">
                        <div class="flex items-center gap-3 p-3 rounded-2xl hover:bg-gray-200 cursor-pointer">
                            <i :class="[menu.icon, 'text-2xl']" aria-hidden="true" />
                            <span class="text-lg font-medium">{{ menu.label }}</span>
                        </div>
                    </RouterLink>
                </li>
            </ul>
        </div>
        <div class="flex h-full w-full">
            <div class="p-2 w-full h-full">
                <div class="pt-3 border border-black/10 rounded-2xl px-4 pb-4 max-h-[98vh] overflow-auto">
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

</style>