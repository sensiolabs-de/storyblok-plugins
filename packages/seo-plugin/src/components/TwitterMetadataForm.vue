<template>
  <div class="sb-mt-4">
    <SbAssetField
      v-model="value.image"
    />
  </div>
  <div class="sb-mt-8 sb-mb-6">
    <SbRadio
      label="Summary"
      name="card"
      :required="requirements?.twitter?.card?.required ?? false"
      v-model="value.card"
      native-value="summary"
    />
    <div class="sb-mt-4">
      <SbRadio
        label="Summary with large image"
        name="card"
        v-model="value.card"
        native-value="summary_large_image"
      />
    </div>
  </div>
  <div class="sb-mt-4">
    <SbTextField
      name="title"
      label="Title"
      :required="requirements?.twitter?.title?.required ?? false"
      v-model="value.title"
      :maxlength="requirements?.twitter?.title?.maxLength ?? null"
    />
  </div>
  <div class="sb-mt-4">
    <SbTextField
      name="description"
      label="Description"
      :required="requirements?.twitter?.description?.required ?? false"
      v-model="value.description"
      :maxlength="requirements?.twitter?.description?.maxLength ?? null"
      :auto-grow="true"
      type="textarea"
    />
  </div>
  <div class="sb-mt-4">
    <SbTextField
      name="site"
      label="Site"
      prefix="@"
      :required="requirements?.twitter?.site?.required ?? false"
      v-model="value.site"
      placeholder="SensioLabs"
      :maxlength="requirements?.twitter?.site?.maxLength ?? null"
      mask="X*"
    />
  </div>
  <div class="sb-mt-4">
    <SbTextField
      name="creator"
      label="Creator"
      prefix="@"
      :required="requirements?.twitter?.creator?.required ?? false"
      v-model="value.creator"
      placeholder="JohnDoe"
      :maxlength="requirements?.twitter?.creator?.maxLength ?? null"
      mask="X*"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { type Defaults, type Requirements, type TwitterMetadata } from '../interfaces/metadata'
import SbAssetField from './SbAssetField.vue'

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: TwitterMetadata,
  requirements?: Requirements
  defaults?: Defaults
}>()

const prepare = (value: TwitterMetadata): TwitterMetadata => {
  const inner : TwitterMetadata = Object.assign({}, value)

  if (props.defaults?.twitter) {
    const keys = Object.keys(props.defaults.twitter)
    for (const key of keys) {
      if (!Object.hasOwn(inner, key)) {
        continue
      }

      // @ts-ignore
      inner[key] = props.defaults?.twitter[key]
    }
  }

  return inner
}

const value = ref<TwitterMetadata>(prepare(props.modelValue))

watch(value, () => emit('update:modelValue', value.value), { deep: true })
</script>