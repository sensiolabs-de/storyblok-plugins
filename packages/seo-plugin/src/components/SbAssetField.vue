<template>
  <div
    v-if="value"
    style="
      display: flex;
      flex-direction: row;
      gap: 2rem;
      justify-items: center;
      align-items: center;
    "
  >
    <div
      style="
        width: 128px;
        height: 128px;
        display: grid;
        place-content: center;
        overflow: hidden;
      "
    >
      <img
        :src="value.filename"
        style="max-width: 100%; object-fit: contain"
      />
    </div>
    <div>
      <SbGroupButton
        :has-spaces="false"
        size="small"
        variant="tertiary"
      >
        <SbButton
          variant="primary"
          icon="upload"
          label="Change Image"
          @click.stop="selectAsset"
        />
        <SbButton
          icon="x"
          @click.stop="value = null"
          has-icon-only
        />
      </SbGroupButton>
    </div>
  </div>
  <div v-else>
    <SbButton
      variant="primary"
      icon="upload"
      label="Select Image"
      @click.stop="selectAsset"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useFieldPlugin } from '@storyblok/field-plugin/vue3'
import { type Asset } from '@storyblok/field-plugin'

const plugin = useFieldPlugin()

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: Asset | null
}>()

const value = ref<Asset | null>(props.modelValue)

const selectAsset = (): void => {
  plugin?.actions?.selectAsset().then((asset) => (value.value = asset))
}

watch(value, () => emit('update:modelValue', Object.assign({}, value.value)), {
  deep: true,
})
</script>
