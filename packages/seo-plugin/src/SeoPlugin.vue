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
        v-model="data.global"
        :requirements="requirements"
        :defaults="defaults"
      />
      <og-metadata-form
        v-else-if="currentTab === 1"
        v-model="data.openGraph"
        :requirements="requirements"
        :defaults="defaults"
      />
      <twitter-metadata-form
        v-else-if="currentTab === 2"
        v-model="data.twitter"
        :requirements="requirements"
        :defaults="defaults"
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

const data = ref<Data>({
  global: {
    title: '',
    description: '',
  },
  openGraph: {
    title: '',
    description: '',
    image: null,
  },
  twitter: {
    title: '',
    description: '',
    image: null,
    site: null,
    creator: null,
    card: 'summary',
  }
})

const requirements = ref<Requirements>()
const defaults = ref<Defaults>()

watch(() => plugin.type, () => {
  if (plugin.type !== 'loaded') {
    return
  }

  if (plugin?.data?.content && plugin?.data?.content !== '') {
    data.value = JSON.parse(JSON.stringify(plugin?.data?.content as Data))
    currentTab.value = 0
  }

  requirements.value = plugin?.data?.options?.requirements ? JSON.parse(plugin?.data?.options?.requirements) : undefined
  defaults.value = plugin?.data?.options?.defaults ? JSON.parse(plugin?.data?.options?.defaults) : undefined
})

watch(data, () => plugin.actions?.setContent(JSON.parse(JSON.stringify(data.value))), {deep: true})

</script>