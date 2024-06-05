<template>
  <div class="sb-mt-4">
    <SbAssetField
      v-model="value.twitterImage"
    />
  </div>
  <div class="sb-mt-8 sb-mb-6">
    <SbRadio
      label="Summary"
      name="card"
      :required="requirements?.twitterCard?.required ?? false"
      v-model="value.twitterCard"
      native-value="summary"
    />
    <div class="sb-mt-4">
      <SbRadio
        label="Summary with large image"
        name="card"
        v-model="value.twitterCard"
        native-value="summary_large_image"
      />
    </div>
  </div>
  <div class="sb-mt-4">
    <SbTextField
      name="twitterTitle"
      label="Title"
      :required="requirements?.twitterTitle?.required ?? false"
      v-model="value.twitterTitle"
      :maxlength="requirements?.twitterTitle?.maxLength ?? null"
    />
  </div>
  <div class="sb-mt-4">
    <SbTextField
      name="twitterDescription"
      label="Description"
      :required="requirements?.twitterDescription?.required ?? false"
      v-model="value.twitterDescription"
      :maxlength="requirements?.twitterDescription?.maxLength ?? null"
      :auto-grow="true"
      type="textarea"
    />
  </div>
  <div class="sb-mt-4">
    <SbTextField
      name="twitterSite"
      label="Site"
      prefix="@"
      :required="requirements?.twitterSite?.required ?? false"
      v-model="value.twitterSite"
      placeholder="SensioLabs"
      :maxlength="requirements?.twitterSite?.maxLength ?? null"
      mask="X*"
    />
  </div>
  <div class="sb-mt-4">
    <SbTextField
      name="twitterCreator"
      label="Creator"
      prefix="@"
      :required="requirements?.twitterCreator?.required ?? false"
      v-model="value.twitterCreator"
      placeholder="JohnDoe"
      :maxlength="requirements?.twitterCreator?.maxLength ?? null"
      mask="X*"
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
  requirements?: Requirements
}>()

const value = ref<Data>(props.modelValue)

watch(value, () => emit('update:modelValue', value.value), { deep: true })
</script>