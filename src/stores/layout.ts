import { defineStore } from 'pinia'
import { ref } from 'vue'
import { readTextFile, exists, BaseDirectory } from '@tauri-apps/plugin-fs'

export interface Layout {
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

export const useLayoutStore = defineStore('layout', () => {
  const layout = ref<Layout | null>(null)
  const isLoaded = ref(false)
  const error = ref<string | null>(null)

  const TARGET_DIR = BaseDirectory.Resource

  async function loadLayout(path: string) {
    error.value = null
    isLoaded.value = false

    try {
      const fileExists = await exists(path, { baseDir: TARGET_DIR })
      if (!fileExists) {
        throw new Error(`Layout file not found.`)
      }

      const fileContent = await readTextFile(path, { baseDir: TARGET_DIR })
      layout.value = JSON.parse(fileContent)
      isLoaded.value = true
    } catch (err: any) {
      console.error('Layout load failure:', err)
      error.value = err.message || `An unknown error occurred while reading ${path}.`
      isLoaded.value = false
    }
  }

  return { layout, isLoaded, error, loadLayout }
})
