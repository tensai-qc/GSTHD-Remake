<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useConfigStore } from './stores/config'
import HelloWorld from './components/HelloWorld.vue'

const configStore = ref()

onMounted(async () => {
  const store = useConfigStore()
  configStore.value = store
  await store.loadConfig()
})
</script>

<template>
  <div v-if="configStore?.error" class="error-container">
    <div class="error-card">
      <div class="icon">⚠️</div>
      <br />
      <p>{{ configStore.error }}</p>
      <p class="hint">Please ensure <code>settings.json</code> exists in your app folder and try again.</p>
      <button @click="configStore.loadConfig()">Retry</button>
    </div>
  </div>

  <div v-else-if="!configStore?.isLoaded" class="loading-container">
    <p>Loading settings...</p>
  </div>

  <div v-else :class="['app-layout', configStore.config.theme]">
    <HelloWorld />
  </div>
</template>

<style scoped>
.error-container, .loading-container {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  font-family: system-ui, sans-serif;
  background-color: #1a1a1a;
  color: #fff;
}

.error-card {
  background: #2a2a2a;
  padding: 2.5rem;
  border-radius: 12px;
  max-width: 450px;
  text-align: center;
  border: 1px solid #ff4d4f;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
}

.icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

h2 {
  margin: 0 0 0.5rem 0;
  color: #ff4d4f;
}

.hint {
  font-size: 0.9em;
  color: #aaa;
  margin-top: 1rem;
}

code {
  background: #111;
  padding: 2px 6px;
  border-radius: 4px;
  color: #42b883;
}

button {
  margin-top: 1.5rem;
  padding: 0.6rem 1.5rem;
  font-size: 1rem;
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #ff7875;
}
</style>
