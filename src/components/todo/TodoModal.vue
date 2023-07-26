<template>
  <transition name="slide">
    <div
      v-if="modelValue"
      aria-modal="true"
      role="dialog"
      tabindex="-1"
      class="absolute inset-0 flex flex-col"
    >
      <button
        type="button"
        @click="$emit('update:modelValue', false)"
        class="h-8"
      >
        <span class="sr-only">Close</span>
      </button>
      <div class="flex-1 bg-rich-black p-4">
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
.slide-enter-active {
  @apply duration-200 ease-out;
}
.slide-enter-from {
  @apply transform translate-y-full;
}
.slide-leave-active {
  @apply transform duration-200 ease-in;
}
.slide-leave-to {
  @apply translate-y-full;
}
</style>
