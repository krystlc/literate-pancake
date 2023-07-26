<template>
  <transition name="fade">
    <div v-if="modelValue" aria-modal="true" role="dialog" tabindex="-1">
      <div
        class="bg-raisin-black/90 absolute top-0 bottom-0 left-0 right-0"
        @click="$emit('update:modelValue', false)"
      ></div>
      <div class="bg-light-green absolute inset-0 top-8">modal time</div>
    </div>
  </transition>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: Boolean,
    default: "",
    required: true,
  },
});
defineEmits(["update:modelValue"]);
</script>

<style scoped>
.fade-enter-active {
  @apply duration-100 ease-out;
}
.fade-enter-from {
  @apply transform opacity-0 scale-125;
}
.fade-enter-to {
  @apply opacity-100 scale-100;
}
.fade-leave-active {
  @apply transform duration-75 ease-in;
}
.fade-leave-from {
  @apply opacity-100 scale-100;
}
.fade-leave-to {
  @apply opacity-0 scale-125;
}
</style>
