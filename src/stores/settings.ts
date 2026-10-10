import { defineStore } from 'pinia'
import { ref } from 'vue'
import { readTextFile, exists, BaseDirectory } from '@tauri-apps/plugin-fs'

export interface AppConfig {
  ActiveLayout: string
  DragButton: string
  AutocheckDragButton: string
  DefaultGossipStoneImages: [string]
  DefaultPathGoalImages: [string]
  DefaultPathGoalCount: number
  DefaultWothGossipStoneCount: number
  DefaultWothColors: [string]
  DefaultBarrenColors: [string]
}

export const useConfigStore = defineStore('config', () => {
  const config = ref<AppConfig | null>(null)
  const isLoaded = ref(false)
  const error = ref<string | null>(null)

  const TARGET_DIR = BaseDirectory.Resource

  async function loadConfig() {
    error.value = null
    isLoaded.value = false

    try {
      const fileExists = await exists('settings.json', { baseDir: TARGET_DIR })
      if (!fileExists) {
        throw new Error('Settings file not found.')
      }

      const fileContent = await readTextFile('settings.json', { baseDir: TARGET_DIR })
      config.value = JSON.parse(fileContent)
      isLoaded.value = true
    } catch (err: any) {
      console.error('Config load failure:', err)
      error.value = err.message || 'An unknown error occurred while reading settings.json.'
      isLoaded.value = false
    }
  }

  return { config, isLoaded, error, loadConfig }
})
