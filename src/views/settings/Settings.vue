<template>
    <div class="settings-page">
        <header class="settings-header">
            <h1>Configurações</h1>
            <p class="subtitle">Ajuste suas preferências da aplicação</p>
        </header>

        <main class="settings-content">
            <form @submit.prevent="saveSettings" class="settings-form">
                <div class="field">
                    <label for="displayName">Nome de exibição</label>
                    <input id="displayName" v-model="settings.displayName" type="text" placeholder="Seu nome" />
                </div>

                <div class="field">
                    <label for="notifications">Notificações</label>
                    <input id="notifications" v-model="settings.notifications" type="checkbox" />
                </div>

                <div class="field">
                    <label for="language">Idioma</label>
                    <select id="language" v-model="settings.language">
                        <option value="pt">Português</option>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                    </select>
                </div>

                <div class="field">
                    <label for="theme">Tema</label>
                    <select id="theme" v-model="settings.theme">
                        <option value="light">Claro</option>
                        <option value="dark">Escuro</option>
                        <option value="system">Sistema</option>
                    </select>
                </div>

                <div class="actions">
                    <button type="submit" class="btn primary">Salvar</button>
                    <button type="button" class="btn" @click="resetDefaults">Restaurar padrões</button>
                </div>
            </form>

            <section class="preview">
                <h2>Visualização rápida</h2>
                <p><strong>Nome:</strong> {{ settings.displayName || '—' }}</p>
                <p><strong>Notificações:</strong> {{ settings.notifications ? 'Ativas' : 'Desativadas' }}</p>
                <p><strong>Idioma:</strong> {{ languageLabel }}</p>
                <p><strong>Tema:</strong> {{ settings.theme }}</p>
            </section>
        </main>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const STORAGE_KEY = 'app_settings_v1'

const defaultSettings = {
    displayName: '',
    notifications: true,
    language: 'pt',
    theme: 'system'
}

const settings = ref({ ...defaultSettings })

onMounted(() => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
            Object.assign(settings.value, JSON.parse(raw))
        }
    } catch (e) {
        // falha ao ler storage — ignora e usa padrões
    }
})

function saveSettings() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(settings.value))
        // pequena confirmação simples (pode trocar pelo seu sistema de notificações)
        alert('Configurações salvas.')
    } catch (e) {
        alert('Erro ao salvar configurações.')
    }
}

function resetDefaults() {
    Object.assign(settings.value, defaultSettings)
    saveSettings()
}

const languageLabel = computed(() => {
    const map = { pt: 'Português', en: 'English', es: 'Español' }
    return map[settings.value.language] || settings.value.language
})
</script>

<style scoped>
.settings-page {
    max-width: 900px;
    margin: 32px auto;
    padding: 16px;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    color: #222;
}

.settings-header h1 {
    margin: 0;
    font-size: 1.6rem;
}

.subtitle {
    margin: 4px 0 16px;
    color: #666;
    font-size: 0.95rem;
}

.settings-content {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 24px;
    align-items: start;
}

.settings-form {
    background: #fff;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}

.field {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
}

.field label {
    width: 140px;
    font-weight: 600;
    font-size: 0.95rem;
}

.field input[type="text"],
.field select {
    flex: 1;
    padding: 8px 10px;
    border: 1px solid #dcdcdc;
    border-radius: 6px;
    font-size: 0.95rem;
}

.field input[type="checkbox"] {
    width: 18px;
    height: 18px;
}

.actions {
    display: flex;
    gap: 12px;
    margin-top: 8px;
}

.btn {
    padding: 8px 12px;
    border: 1px solid #cfcfcf;
    background: #fafafa;
    border-radius: 6px;
    cursor: pointer;
}

.btn.primary {
    background: #0366d6;
    color: white;
    border-color: #0366d6;
}

.preview {
    background: #fff;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    font-size: 0.95rem;
}
</style>