<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div id="app-shell">
    <header class="app-header">
      <span class="app-brand">Ginko · Pagos a proveedores</span>
    </header>
    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
#app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  background: #fff;
}

.app-brand {
  font-weight: 600;
  font-size: 0.95rem;
}

.app-main {
  flex: 1;
}
</style>
