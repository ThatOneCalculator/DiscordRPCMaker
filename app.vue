<style lang="scss" src="~/assets/styles/global.scss" />

<template>
  <NuxtLayout>
    <NuxtLoadingIndicator />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import devtools from '@vue/devtools';

if (process.dev)
  devtools.connect('http://localhost', 8098);
</script>