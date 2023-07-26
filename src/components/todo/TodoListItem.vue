<template>
  <article
    class="bg-space-cadet rounded-md flex flex-nowrap p-4 items-center gap-4 hover:bg-english-violet group"
  >
    <div
      class="h-10 w-10 rounded-full bg-english-violet shrink-0 group-hover:bg-space-cadet"
    ></div>
    <div class="flex-1 truncate">
      <h3 class="truncate text-white text-sm mb-2 font-semibold">
        {{ todo.title }}
      </h3>
      <span
        class="bg-english-violet group-hover:bg-space-cadet text-xs px-2 py-1 rounded-md"
        >User: {{ todo.userId }}</span
      >
    </div>
    <button type="button" class="inline-block h-12 w-auto">
      <span><DotsIcon /></span>
      <span class="sr-only">Options</span>
    </button>
  </article>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { Todo } from "./todoContext";
import DotsIcon from "@/assets/dots.svg";

defineProps({
  todo: {
    type: Object as PropType<Todo>,
    default: () => ({}),
    required: true,
  },
});

defineEmits(["action:edit", "action:complete"]);
</script>
