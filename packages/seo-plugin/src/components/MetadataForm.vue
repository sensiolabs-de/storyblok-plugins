<template>
  <SbFormGroup
    legend="General"
    description="The title and description search engines display in their results."
  >
    <div class="sb-mt-4">
      <SbTextField
        v-model="value.title"
        name="title"
        label="Title"
        placeholder="Page title"
        :required="requirements?.title?.required ?? false"
        :maxlength="requirements?.title?.maxLength ?? null"
        :error="!!errors?.title"
        :error-message="errors?.title"
      />
    </div>
    <div class="sb-mt-4">
      <SbTextField
        v-model="value.description"
        name="description"
        label="Description"
        placeholder="A short summary of the page"
        :required="requirements?.description?.required ?? false"
        :maxlength="requirements?.description?.maxLength ?? null"
        :error="!!errors?.description"
        :error-message="errors?.description"
        :auto-grow="true"
        type="textarea"
      />
    </div>
    <div class="sb-mt-4">
      <SbFormItem
        label="No index"
        helper-text="Checking this will exclude the page from indexing/sitemap etc."
      >
        <SbToggle
          id="noIndex"
          v-model="value.noIndex"
          name="noIndex"
        />
      </SbFormItem>
    </div>
  </SbFormGroup>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { type Data, type Requirements } from '../interfaces/metadata'
import { type ValidationErrors } from '../validation'

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: Data
  requirements?: Requirements
  errors?: ValidationErrors
}>()

const value = ref<Data>(props.modelValue)

watch(value, () => emit('update:modelValue', value.value), { deep: true })
</script>
