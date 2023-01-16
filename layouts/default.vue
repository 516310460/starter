<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div
    class="h-full"
    v-waterMarker="{
      text: 'Bitget Nuxt3 template',
      textColor: 'rgba(16, 185, 129, 0.3)'
  }"
  >
    <header
      class="flex items-center justify-center"
      h="10"
      w="full"
      bg="blue-400"
      text="center white"
    >{{ $t('layouts.header') }}</header>
    <slot />
    <footer
      class="flex items-center justify-center"
      h="10"
      w="full"
      bg="blue-400"
      text="center white"
    >{{ $t('layouts.footer') }}</footer>
  </div>
</template>
