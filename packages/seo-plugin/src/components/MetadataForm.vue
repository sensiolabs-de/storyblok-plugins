<template>
  <div class="sb-mt-4">
    <SbTextField
      name="title"
      label="Title"
      :required="requirements?.global?.title?.required ?? false"
      v-model="value.title"
      :maxlength="requirements?.global?.title?.maxLength ?? null"
    />
  </div>
  <div class="sb-mt-4">
    <SbTextField
      name="description"
      label="Description"
      :required="requirements?.global?.description?.required ?? false"
      v-model="value.description"
      :maxlength="requirements?.global?.description?.maxLength ?? null"
      :auto-grow="true"
      type="textarea"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { type Defaults, type Metadata, type Requirements } from '../interfaces/metadata'

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: Metadata,
  requirements?: Requirements,
  defaults?: Defaults
}>()

const prepare = (value: Metadata): Metadata => {
  const inner : Metadata = Object.assign({}, value)

  if (props.defaults?.global) {
    const keys = Object.keys(props.defaults.global)
    for (const key of keys) {
      if (!Object.hasOwn(inner, key)) {
        continue
      }

      // @ts-ignore
      inner[key] = props.defaults?.global[key]
    }
  }

  return inner
}

const value = ref(prepare(props.modelValue))

watch(value, () => emit('update:modelValue', value.value), { deep: true })
</script>