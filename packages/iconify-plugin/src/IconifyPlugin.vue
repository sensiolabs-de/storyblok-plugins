<template>
  <div
    v-if="selected"
    style="
      display: flex;
      flex-direction: row;
      gap: 2rem;
      justify-items: center;
      align-items: center;
    "
  >
    <Icon
      :icon="selected"
      width="64"
      height="64"
    />
    <div>
      <SbGroupButton
        :has-spaces="false"
        size="small"
        variant="tertiary"
      >
        <SbButton
          @click.stop="changeIcon = true"
          size="small"
          label="Change icon"
        />
        <SbButton
          v-if="selected"
          icon="x"
          @click.stop="unsetIcon"
          has-icon-only
        />
      </SbGroupButton>
    </div>
  </div>

  <SbCard
    v-if="changeIcon || selected.length === 0"
    as="div"
    :is-loading="loading"
  >
    <SbCardHeader
      as="div"
      :is-loading="loading"
    >
      <SbTextField
        name="search"
        label="Search for an icon"
        :disabled="false"
        :required="false"
        placeholder="Type to start searching"
        :readonly="false"
        v-model="query"
        :error="false"
        :clearable="true"
        :ghost="false"
        :auto-grow="false"
        @clear="query = ''"
      />
    </SbCardHeader>
    <SbCardContent v-if="query.length > 0 && icons.length > 0">
      <div
        v-if="icons.length > 0"
        class="grid"
      >
        <SbButton
          v-for="icon in icons"
          @click.stop="setIcon(icon)"
          :key="icon"
          type="button"
          variant="tertiary"
        >
          <Icon
            :icon="icon"
            width="24"
            height="24"
          />
        </SbButton>
      </div>
    </SbCardContent>
    <SbCardContent v-else-if="query.length > 0 && icons.length === 0">
      No icons found.
    </SbCardContent>
  </SbCard>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import axios from 'axios'
import { useFieldPlugin } from '@storyblok/field-plugin/vue3'

const plugin = useFieldPlugin()

const query = ref<string>('')
const icons = ref<string[]>([])
const loading = ref<boolean>(false)
const changeIcon = ref<boolean>(false)

watch(query, () => {
  if ('' === query.value) {
    return
  }

  const url = new URL('https://api.iconify.design/search')
  url.searchParams.set('query', query.value)
  url.searchParams.set('prefixes', 'fa-solid,fa-regular,fa-brands')

  loading.value = true

  axios
    .get(url.toString())
    .then((response) => response.data)
    .then((data) => {
      icons.value = data.icons
    })
    .finally(() => (loading.value = false))
})

const selected = ref<string>('')
const prefixes = ref<string>('')

watch(plugin, () => {
  selected.value = (plugin?.data?.content as string) ?? ''
  prefixes.value = plugin?.data?.options?.prefixes ?? ''
})

const setIcon = (icon: string): void => {
  selected.value = icon
  changeIcon.value = false
}

const unsetIcon = (): void => {
  selected.value = ''
  changeIcon.value = true
}

watch(selected, () => {
  plugin.actions?.setContent(selected.value)
})
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(16, minmax(0, 1fr));
  grid-auto-rows: auto;
  grid-gap: 1rem;
}

@media (max-width: 1200px) {
  .grid {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }
}

@media (max-width: 992px) {
  .grid {
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }
}

@media (max-width: 768px) {
  .grid {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}
</style>
