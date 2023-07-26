<template>
  <transition name="fade">
    <div v-if="modelValue" aria-modal="true" role="dialog" tabindex="-1">
      <button
        type="button"
        class="bg-raisin-black/90 absolute top-0 bottom-0 left-0 right-0"
        @click="$emit('update:modelValue', false)"
      >
        <span class="sr-only">Close</span>
      </button>
      <div class="absolute inset-0 top-8 bg-rich-black p-4">
        <hr class="my-4 border-space-cadet w-8 mx-auto border-b-4 rounded" />
        <slot></slot>
      </div>
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
