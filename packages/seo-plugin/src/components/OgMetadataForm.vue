<template>
  <div class="sb-mt-4">
    <SbAssetField
      v-model="value.ogImage"
    />
  </div>
  <div class="sb-mt-4">
    <SbTextField
      name="ogTitle"
      label="OG Title"
      :required="requirements?.ogTitle?.required ?? false"
      v-model="value.ogTitle"
      :maxlength="requirements?.ogTitle?.maxLength ?? null"
    />
  </div>
  <div class="sb-mt-4">
    <SbTextField
      name="ogDescription"
      label="OG Description"
      :required="requirements?.ogDescription?.required ?? false"
      v-model="value.ogDescription"
      :maxlength="requirements?.ogDescription?.maxLength ?? null"
      :auto-grow="true"
      type="textarea"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { type Data, type Requirements } from '../interfaces/metadata'
import SbAssetField from './SbAssetField.vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: Data,
  requirements?: Requirements,
}>()

const value = ref<Data>(props.modelValue)

watch(value, () => emit('update:modelValue', value.value), { deep: true })

</script>