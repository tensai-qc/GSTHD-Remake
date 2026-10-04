<script setup lang="ts">
interface Props {
  message: string
  hint?: string
  buttonText?: string
  icon?: string
}

withDefaults(defineProps<Props>(), {
  buttonText: 'Retry',
  icon: '⚠️'
})

const emit = defineEmits<{
  (e: 'retry'): void
}>()
</script>

<template>
  <div class="error-card">
    <div class="icon">{{ icon }}</div>
    <br />
    <p class="message">{{ message }}</p>

    <p v-if="$slots.hint || hint" class="hint">
      <slot name="hint">
        {{ hint }}
      </slot>
    </p>

    <button @click="emit('retry')">{{ buttonText }}</button>
  </div>
</template>

<style scoped>
.error-card {
  background: #2a2a2a;
  padding: 2.5rem;
  border-radius: 12px;
  max-width: 450px;
  text-align: center;
  border: 1px solid #ff4d4f;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  color: #ffffff;
  font-family: system-ui, sans-serif;
}

.icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

h3 {
  margin: 0 0 0.5rem 0;
  color: #ff4d4f;
  font-size: 1.4rem;
}

.message {
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.hint {
  font-size: 0.9em;
  color: #aaa;
  margin-top: 0.5rem;
}

.hint :deep(code) {
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
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: #ff7875;
}
</style>
