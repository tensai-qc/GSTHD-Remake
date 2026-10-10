<script setup lang="ts">
import { onMounted } from 'vue'
import { getCurrentWindow, LogicalSize } from '@tauri-apps/api/window'

import { useConfigStore } from './stores/settings.ts'
import { useLayoutStore } from './stores/layout'

import ErrorCard from './components/ErrorCard.vue'

const configStore = useConfigStore()
const layoutStore = useLayoutStore()

onMounted(async () => {
  await configStore.loadConfig()
  await layoutStore.loadLayout(configStore.config!.ActiveLayout)

  try {
    const appWindow = getCurrentWindow()
    await appWindow.setSize(
      new LogicalSize(layoutStore.layout!.dimensions.width, layoutStore.layout!.dimensions.height)
    )
    await appWindow.show()
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
        Please ensure <code>{{ configStore.config!.ActiveLayout }}</code> exists in your app folder
        and try again.
      </template>
    </ErrorCard>
  </div>
  <div v-else-if="!configStore?.isLoaded || !layoutStore?.isLoaded" class="loading-container">
    <p>Loading...</p>
  </div>

  <div v-else class="app-layout"></div>
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
</style>
