<template>
  <div class="sb-mt-4">
    <SbAssetField
      v-model="value.twitterImage"
      :error="errors?.twitterImage"
    />
  </div>
  <div class="sb-mt-8 sb-mb-6">
    <SbRadio
      v-model="value.twitterCard"
      label="Summary"
      name="card"
      :required="requirements?.twitterCard?.required ?? false"
      native-value="summary"
    />
    <div class="sb-mt-4">
      <SbRadio
        v-model="value.twitterCard"
        label="Summary with large image"
        name="card"
        native-value="summary_large_image"
      />
    </div>
  </div>
  <div class="sb-mt-4">
    <SbTextField
      v-model="value.twitterTitle"
      name="twitterTitle"
      label="Title"
      :required="requirements?.twitterTitle?.required ?? false"
      :maxlength="requirements?.twitterTitle?.maxLength ?? null"
      :error="!!errors?.twitterTitle"
      :error-message="errors?.twitterTitle"
    />
  </div>
  <div class="sb-mt-4">
    <SbTextField
      v-model="value.twitterDescription"
      name="twitterDescription"
      label="Description"
      :required="requirements?.twitterDescription?.required ?? false"
      :maxlength="requirements?.twitterDescription?.maxLength ?? null"
      :error="!!errors?.twitterDescription"
      :error-message="errors?.twitterDescription"
      :auto-grow="true"
      type="textarea"
    />
  </div>
  <div class="sb-mt-4">
    <SbTextField
      v-model="value.twitterSite"
      name="twitterSite"
      label="Site"
      prefix="@"
      :required="requirements?.twitterSite?.required ?? false"
      placeholder="SensioLabs"
      :maxlength="requirements?.twitterSite?.maxLength ?? null"
      :error="!!errors?.twitterSite"
      :error-message="errors?.twitterSite"
      mask="X*"
    />
  </div>
  <div class="sb-mt-4">
    <SbTextField
      v-model="value.twitterCreator"
      name="twitterCreator"
      label="Creator"
      prefix="@"
      :required="requirements?.twitterCreator?.required ?? false"
      placeholder="JohnDoe"
      :maxlength="requirements?.twitterCreator?.maxLength ?? null"
      :error="!!errors?.twitterCreator"
      :error-message="errors?.twitterCreator"
      mask="X*"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { type Data, type Requirements } from '../interfaces/metadata'
import { type ValidationErrors } from '../validation'
import SbAssetField from './SbAssetField.vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: Data
  requirements?: Requirements
  errors?: ValidationErrors
}>()

const value = ref<Data>(props.modelValue)

watch(value, () => emit('update:modelValue', value.value), { deep: true })
</script>
