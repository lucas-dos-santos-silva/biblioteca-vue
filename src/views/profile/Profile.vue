<template>
    <section class="profile-page">
        <header class="profile-header">
            <h1>Perfil</h1>
            <p class="subtitle">Configurações básicas — apenas visual</p>
        </header>

        <main class="profile-card">
            <div class="avatar-area">
                <div class="avatar">
                    <svg viewBox="0 0 24 24" class="avatar-icon" aria-hidden="true">
                        <path fill="currentColor" d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z"/>
                    </svg>
                </div>
                <div class="avatar-texts">
                    <strong>Usuário Exemplo</strong>
                    <span class="muted">Imagem de perfil ilustrativa</span>
                </div>
            </div>

            <form class="profile-form" aria-hidden="true">
                <label class="field">
                    <span class="label">Nome</span>
                    <div class="input readonly">João da Silva</div>
                </label>

                <label class="field">
                    <span class="label">E‑mail</span>
                    <div class="input readonly">joao.silva@exemplo.com</div>
                </label>

                <label class="field">
                    <span class="label">Biografia</span>
                    <div class="textarea readonly">Desenvolvedor front‑end com foco em interfaces acessíveis e reativas.</div>
                </label>

                <div class="actions">
                    <button type="button" class="btn btn-secondary" disabled>Cancelar</button>
                    <button type="button" class="btn btn-primary" disabled>Salvar (visual)</button>
                </div>
            </form>
        </main>
    </section>
</template>

<script setup>
// Componente visual apenas — sem lógica
</script>

<style scoped>
.profile-page {
    max-width: 820px;
    margin: 32px auto;
    padding: 20px;
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
    color: #1f2937;
}

.profile-header h1 {
    margin: 0 0 6px 0;
    font-size: 22px;
    font-weight: 600;
}

.profile-header .subtitle {
    margin: 0;
    color: #6b7280;
    font-size: 13px;
}

.profile-card {
    margin-top: 18px;
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 1px 2px rgba(16,24,40,0.03);
}

.avatar-area {
    display: flex;
    gap: 14px;
    align-items: center;
    margin-bottom: 18px;
}

.avatar {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: linear-gradient(135deg,#e6edf7,#f7f9fc);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0f172a;
    flex-shrink: 0;
    border: 1px solid #e6eef9;
}

.avatar-icon {
    width: 36px;
    height: 36px;
    opacity: 0.9;
}

.avatar-texts strong {
    display: block;
    font-size: 15px;
}

.muted {
    display: block;
    color: #6b7280;
    font-size: 13px;
}

.profile-form {
    display: grid;
    gap: 12px;
}

.field {
    display: grid;
    gap: 6px;
}

.label {
    font-size: 13px;
    color: #4b5563;
}

.input, .textarea {
    background: #f8fafc;
    border: 1px dashed #e6eef9;
    padding: 10px 12px;
    border-radius: 6px;
    color: #111827;
    min-height: 40px;
    display: flex;
    align-items: center;
    font-size: 14px;
}

.textarea {
    min-height: 72px;
    align-items: flex-start;
    white-space: pre-wrap;
}

.readonly {
    cursor: default;
}

.actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-top: 8px;
}

.btn {
    padding: 8px 14px;
    border-radius: 6px;
    font-size: 14px;
    border: 1px solid transparent;
}

.btn-primary {
    background: #2563eb;
    color: white;
}

.btn-secondary {
    background: #ffffff;
    color: #374151;
    border-color: #e5e7eb;
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>