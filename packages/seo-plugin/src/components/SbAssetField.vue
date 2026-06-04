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
          has-icon-only
          @click.stop="value = null"
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
  <p
    v-if="error"
    class="sb-asset-field__error"
  >
    {{ error }}
  </p>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useFieldPlugin } from '@storyblok/field-plugin/vue3'
import { type Asset } from '@storyblok/field-plugin'

const plugin = useFieldPlugin()

const emit = defineEmits(['update:modelValue'])
const props = defineProps<{
  modelValue: Asset | null
  error?: string
}>()

const value = ref<Asset | null>(props.modelValue)

const selectAsset = (): void => {
  plugin?.actions?.selectAsset().then((asset) => (value.value = asset))
}

watch(value, () => emit('update:modelValue', Object.assign({}, value.value)), {
  deep: true,
})
</script>

<style scoped>
.sb-asset-field__error {
  margin: 0.25rem 0 0;
  color: #e6454a;
  font-size: 0.75rem;
}
</style>
