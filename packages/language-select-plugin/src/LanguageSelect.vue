<template>
  <div style="min-height: 200px">
    <SbSelect
      label="Choose an option"
      :options="options"
      :multiple="multiple"
      :filterable="true"
      :first-value-is-all-value="false"
      no-data-text="Sorry, no result found."
      no-data-text-tag="Start typing to add new tag."
      :allow-create="false"
      :clearable="false"
      :disable-internal-search="false"
      :show-count="false"
      v-model="values"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useFieldPlugin } from '@storyblok/field-plugin/vue3'
import { registerLocale, getNames } from '@cospired/i18n-iso-languages'
import en from '@cospired/i18n-iso-languages/langs/en.json'

registerLocale(en)

const plugin = useFieldPlugin()

const options = computed(() => {
  return Object.entries(getNames('en')).map(([code, name]) => ({
    label: `${name}`,
    value: code,
  }))
})

const values = ref<string[] | string>('')
const multiple = ref<boolean>()

watch(
  () => plugin.type,
  () => {
    if (plugin.type !== 'loaded') {
      return
    }

    multiple.value = plugin?.data?.options?.multiple === 'true'

    if (plugin?.data?.content) {
      if (Array.isArray(plugin.data.content)) {
        if (!multiple.value) {
          values.value = (plugin.data.content as string[])[0]
        } else {
          values.value = plugin.data.content as string[]
        }
      } else {
        if (!multiple.value) {
          values.value = plugin.data.content as string
        } else {
          values.value = [plugin.data.content as string]
        }
      }
    }
  },
)

watch(values, () => plugin.actions?.setContent(values.value))
</script>
