<template>
  <transition name="slide">
    <div
      v-if="showModal"
      aria-modal="true"
      role="dialog"
      tabindex="-1"
      class="absolute inset-0 flex flex-col"
    >
      <button type="button" @click="closeModal" class="h-8">
        <span class="sr-only">Close</span>
      </button>
      <div class="flex-1 bg-rich-black p-4 space-y-4">
        <hr class="my-4 border-space-cadet w-8 mx-auto border-b-4 rounded" />
        <div class="grid grid-cols-5 py-4">
          <button type="button" class="col-span-1" @click="closeModal">
            <span><ArrowIcon /></span><span class="sr-only">Back</span>
          </button>
          <h2 class="col-span-3 text-2xl font-medium text-white text-center">
            {{ title }}
          </h2>
        </div>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import ArrowIcon from "@/assets/arrow.svg";
import { useTodo } from "./todoContext";
import { computed } from "vue";

const { showModal, closeModal, selectedTodoItem } = useTodo();
const title = computed(() =>
  selectedTodoItem.value ? "Edit ToDo" : "Add ToDo"
);
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
