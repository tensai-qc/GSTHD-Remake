<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getCurrentWindow, LogicalSize } from '@tauri-apps/api/window'

import { useConfigStore } from './stores/config'
import { useLayoutStore } from './stores/layout'

import ErrorCard from './components/ErrorCard.vue'
import HelloWorld from './components/HelloWorld.vue'

const configStore = useConfigStore()
const layoutStore = useLayoutStore()

onMounted(async () => {
  await configStore.loadConfig()
  await layoutStore.loadLayout(configStore.config.ActiveLayout)

  try {
    const appWindow = getCurrentWindow()
    await appWindow.setSize(
      new LogicalSize(
        Number(layoutStore.layout.AppSize.Width),
        Number(layoutStore.layout.AppSize.Height)
      )
    )
  } catch (err) {
    console.error('Failed to set window size:', err)
  }
})
</script>

<template>
  <div v-if="configStore?.error" class="error-container">
    <ErrorCard :message="configStore.error">
      <template #hint>
        Please ensure <code>settings.json</code> exists in your app folder and try again.
      </template>
    </ErrorCard>
  </div>
  <div v-else-if="layoutStore?.error" class="error-container">
    <ErrorCard :message="layoutStore.error">
      <template #hint>
        Please ensure <code>{{ configStore.config.ActiveLayout }}</code> exists in your app folder
        and try again.
      </template>
    </ErrorCard>
  </div>
  <div v-else-if="!configStore?.isLoaded || !layoutStore?.isLoaded" class="loading-container">
    <p>Loading...</p>
  </div>

  <div v-else :class="['app-layout', configStore.config.theme]">
    <HelloWorld />
  </div>
</template>

<style scoped>
.error-container,
.loading-container {
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
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
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
