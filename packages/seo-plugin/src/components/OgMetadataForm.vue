<template>
  <SbFormGroup
    legend="Open Graph"
    description="Controls how the page is previewed when shared on Facebook, LinkedIn and other platforms."
  >
    <div class="sb-mt-4">
      <SbTextField
        v-model="value.ogTitle"
        name="ogTitle"
        label="OG Title"
        placeholder="Title shown in the social preview"
        :required="requirements?.ogTitle?.required ?? false"
        :maxlength="requirements?.ogTitle?.maxLength ?? null"
        :error="!!errors?.ogTitle"
        :error-message="errors?.ogTitle"
      />
    </div>
    <div class="sb-mt-4">
      <SbTextField
        v-model="value.ogDescription"
        name="ogDescription"
        label="OG Description"
        placeholder="Description shown in the social preview"
        :required="requirements?.ogDescription?.required ?? false"
        :maxlength="requirements?.ogDescription?.maxLength ?? null"
        :error="!!errors?.ogDescription"
        :error-message="errors?.ogDescription"
        :auto-grow="true"
        type="textarea"
      />
    </div>
    <div class="sb-mt-4">
      <SbFormItem
        label="OG Image"
        helper-text="Recommended size: 1200 × 630px"
        :is-required="requirements?.ogImage?.required ?? false"
      >
        <SbAssetField
          v-model="value.ogImage"
          :error="errors?.ogImage"
        />
      </SbFormItem>
    </div>
  </SbFormGroup>
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
