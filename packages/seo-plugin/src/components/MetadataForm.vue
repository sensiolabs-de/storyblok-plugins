<template>
  <div class="sb-mt-4">
    <SbTextField
      name="title"
      label="Title"
      :required="requirements?.title?.required ?? false"
      v-model="value.title"
      :maxlength="requirements?.title?.maxLength ?? null"
    />
  </div>
  <div class="sb-mt-4">
    <SbTextField
      name="description"
      label="Description"
      :required="requirements?.description?.required ?? false"
      v-model="value.description"
      :maxlength="requirements?.description?.maxLength ?? null"
      :auto-grow="true"
      type="textarea"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { type Data, type Requirements } from '../interfaces/metadata'

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: Data
  requirements?: Requirements
}>()

const value = ref<Data>(props.modelValue)

watch(value, () => emit('update:modelValue', value.value), { deep: true })
</script>
