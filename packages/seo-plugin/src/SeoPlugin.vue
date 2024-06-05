<template>
  <SbTabMenu
    :model="[
      {label: 'Global', action: () => (currentTab = 0)},
      {label: 'Open graph', action: () => (currentTab = 1)},
      {label: 'Twitter/ X', action: () => (currentTab = 2)},
    ]"
    :activeIndex="currentTab"
  >
    <template #item="{ item, props }">
      <a
        @click.stop.prevent="item.action()"
        href="#"
        role="menuitem"
        class="sb-tab-menu__action sb-tab-menu__slot-item"
        style="
          color: black;
        "
      >
        {{ item.label }}
      </a>
    </template>
  </SbTabMenu>

  <SbCard
    as="div"
  >
    <SbCardContent>
      <metadata-form
        v-if="currentTab === 0"
        v-model="data"
        :requirements="requirements"
      />
      <og-metadata-form
        v-else-if="currentTab === 1"
        v-model="data"
        :requirements="requirements"
      />
      <twitter-metadata-form
        v-else-if="currentTab === 2"
        v-model="data"
        :requirements="requirements"
      />
    </SbCardContent>
  </SbCard>

</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useFieldPlugin } from '@storyblok/field-plugin/vue3'
import MetadataForm from './components/MetadataForm.vue'
import OgMetadataForm from './components/OgMetadataForm.vue'
import TwitterMetadataForm from './components/TwitterMetadataForm.vue'
import { type Data, type Defaults, type Requirements } from './interfaces/metadata'

const currentTab = ref()

const plugin = useFieldPlugin()

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

    // @ts-ignore
    if (!inner[key]) {
      // @ts-ignore
      inner[key] = defaults[key]
    }
  }

  return inner
}

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

watch(() => plugin.type, () => {
  if (plugin.type !== 'loaded') {
    return
  }

  if (plugin?.data?.content && plugin?.data?.content !== '') {
    data.value = JSON.parse(JSON.stringify(plugin?.data?.content as Data))
  }

  currentTab.value = 0

  requirements.value = plugin?.data?.options?.requirements ? JSON.parse(plugin?.data?.options?.requirements) : undefined
  const defaults = plugin?.data?.options?.defaults ? JSON.parse(plugin?.data?.options?.defaults) : undefined

  data.value = setDefaults(data.value, defaults)
})

watch(data, () => plugin.actions?.setContent(JSON.parse(JSON.stringify(data.value))), {deep: true})

</script>