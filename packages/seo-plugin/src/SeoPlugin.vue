<template>
  <SbTabMenu
    :model="[
      { label: 'Global', action: () => (currentTab = 0) },
      { label: 'Open graph', action: () => (currentTab = 1) },
      { label: 'Twitter/ X', action: () => (currentTab = 2) },
    ]"
    :active-index="currentTab"
  >
    <template #item="{ item }">
      <a
        href="#"
        role="menuitem"
        class="sb-tab-menu__action sb-tab-menu__slot-item"
        style="color: black"
        @click.stop.prevent="item.action()"
      >
        {{ item.label }}
      </a>
    </template>
  </SbTabMenu>

  <SbCard as="div">
    <SbCardContent>
      <div class="sl-content">
        <metadata-form
          v-if="currentTab === 0"
          v-model="data"
          :requirements="requirements"
          :errors="errors"
        />
        <og-metadata-form
          v-else-if="currentTab === 1"
          v-model="data"
          :requirements="requirements"
          :errors="errors"
        />
        <twitter-metadata-form
          v-else-if="currentTab === 2"
          v-model="data"
          :requirements="requirements"
          :errors="errors"
        />
      </div>
    </SbCardContent>
  </SbCard>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useFieldPlugin } from '@storyblok/field-plugin/vue3'
import MetadataForm from './components/MetadataForm.vue'
import OgMetadataForm from './components/OgMetadataForm.vue'
import TwitterMetadataForm from './components/TwitterMetadataForm.vue'
import {
  type Data,
  type Defaults,
  type Requirements,
} from './interfaces/metadata'
import { validate, validationMessage } from './validation'

const currentTab = ref()

const data = ref<Data>({
  title: '',
  description: '',
  ogTitle: '',
  ogDescription: '',
  ogImage: null,
  twitterTitle: '',
  twitterDescription: '',
  twitterImage: null,
  twitterSite: null,
  twitterCreator: null,
  twitterCard: 'summary',
})

const requirements = ref<Requirements>()

// Storyblok calls `validateContent` before saving. Returning an `error`
// prevents the story from being saved and surfaces the message in the editor.
const plugin = useFieldPlugin({
  validateContent: (content) => ({
    content,
    error: validationMessage(validate(content as Data, requirements.value)),
  }),
})

// Inline errors are only shown once the editor has actually changed a field,
// so a freshly loaded field never starts out covered in red. `loading` guards
// the programmatic content/defaults assignment during load from flipping this.
const dirty = ref(false)
let loading = false

const errors = computed(() =>
  dirty.value ? validate(data.value, requirements.value) : {},
)

const setDefaults = (value: Data, defaults?: Defaults): Data => {
  const inner: Data = Object.assign({}, value)

  if (!defaults) {
    return inner
  }

  const keys = Object.keys(defaults)

  for (const key of keys) {
    if (!Object.hasOwn(inner, key)) {
      continue
    }

    // @ts-expect-error indexing Data by a dynamic string key
    if (!inner[key]) {
      // @ts-expect-error indexing Data by a dynamic string key
      inner[key] = defaults[key]
    }
  }

  return inner
}

watch(
  () => plugin.type,
  () => {
    if (plugin.type !== 'loaded') {
      return
    }

    loading = true

    if (plugin?.data?.content && plugin?.data?.content !== '') {
      data.value = JSON.parse(JSON.stringify(plugin?.data?.content as Data))
    }

    currentTab.value = 0

    requirements.value = plugin?.data?.options?.requirements
      ? JSON.parse(plugin?.data?.options?.requirements)
      : undefined
    const defaults = plugin?.data?.options?.defaults
      ? JSON.parse(plugin?.data?.options?.defaults)
      : undefined

    data.value = setDefaults(data.value, defaults)

    // Release the guard after the assignments above have flushed through the
    // `data` watcher, so only subsequent user edits mark the field dirty.
    nextTick(() => {
      loading = false
    })
  },
)

watch(
  data,
  () => {
    if (!loading) {
      dirty.value = true
    }

    plugin.actions?.setContent(JSON.parse(JSON.stringify(data.value)))
  },
  { deep: true },
)
</script>

<style scoped>
.sl-content {
  width: 100%;
  min-height: 300px;
}
</style>
