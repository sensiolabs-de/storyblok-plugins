<template>
  <div class="sb-mt-4">
    <SbAssetField
      v-model="value.image"
    />
  </div>
  <div class="sb-mt-4">
    <SbTextField
      name="title"
      label="OG Title"
      :required="requirements?.openGraph?.title?.required ?? false"
      v-model="value.title"
      :maxlength="requirements?.openGraph?.title?.maxLength ?? null"
    />
  </div>
  <div class="sb-mt-4">
    <SbTextField
      name="description"
      label="OG Description"
      :required="requirements?.openGraph?.description?.required ?? false"
      v-model="value.description"
      :maxlength="requirements?.openGraph?.description?.maxLength ?? null"
      :auto-grow="true"
      type="textarea"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { type Defaults, type OpenGraphMetadata, type Requirements } from '../interfaces/metadata'
import SbAssetField from './SbAssetField.vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: OpenGraphMetadata,
  requirements?: Requirements,
  defaults?: Defaults
}>()

const prepare = (value: OpenGraphMetadata): OpenGraphMetadata => {
  const inner : OpenGraphMetadata = Object.assign({}, value)

  if (props.defaults?.openGraph) {
    const keys = Object.keys(props.defaults.openGraph)
    for (const key of keys) {
      if (!Object.hasOwn(inner, key)) {
        continue
      }

      // @ts-ignore
      inner[key] = props.defaults?.openGraph[key]
    }
  }

  return inner
}

const value = ref<OpenGraphMetadata>(prepare(props.modelValue))

watch(value, () => emit('update:modelValue', value.value), { deep: true })

</script>