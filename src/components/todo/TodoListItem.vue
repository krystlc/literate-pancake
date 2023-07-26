<template>
  <article
    class="bg-space-cadet rounded-md flex flex-nowrap p-4 items-center gap-4 hover:bg-english-violet group"
  >
    <div
      class="h-10 w-10 rounded-full shrink-0 inline-flex items-center justify-center"
      :class="
        todo.completed
          ? 'bg-light-green text-white'
          : 'bg-english-violet group-hover:bg-space-cadet'
      "
    >
      <span v-if="todo.completed"><CheckmarkIcon /></span>
    </div>
    <div class="flex-1 truncate">
      <h3 class="truncate text-white text-sm mb-2 font-semibold">
        {{ todo.title }}
      </h3>
      <span
        class="bg-english-violet group-hover:bg-space-cadet text-xs px-2 py-1 rounded-md"
        >User: {{ todo.userId }}</span
      >
    </div>
    <div>
      <button
        v-if="!todo.completed"
        type="button"
        class="inline-block h-8 -mb-4 w-auto"
        @click.stop="showDropdown = !showDropdown"
      >
        <span><DotsIcon /></span>
        <span class="sr-only">Options</span>
      </button>
      <AppDropdown v-if="showDropdown" @action:close="showDropdown = false">
        <nav
          class="p-4 text-sm whitespace-nowrap space-y-2 text-left list-none"
          role="menu"
        >
          <li>
            <button
              type="button"
              @click.prevent="
                handleDropdownItemClick(() => $emit('action:edit'))
              "
            >
              Edit ToDo
            </button>
          </li>
          <hr class="border-space-cadet" />
          <li>
            <button
              type="button"
              @click="handleDropdownItemClick(() => $emit('action:complete'))"
            >
              Mark Completed
            </button>
          </li>
        </nav>
      </AppDropdown>
    </div>
  </article>
</template>

<script setup lang="ts">
import { PropType, ref } from "vue";
import { Todo } from "./todoContext";
import DotsIcon from "@/assets/dots.svg";
import CheckmarkIcon from "@/assets/checkmark.svg";
import AppDropdown from "../app/AppDropdown.vue";

defineProps({
  todo: {
    type: Object as PropType<Todo>,
    default: () => ({}),
    required: true,
  },
});

defineEmits(["action:edit", "action:complete"]);

const showDropdown = ref(false);

function handleDropdownItemClick(callback: () => void) {
  callback();
  showDropdown.value = false;
}
</script>
