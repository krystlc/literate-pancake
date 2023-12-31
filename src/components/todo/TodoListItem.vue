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
        >{{ getUserName(todo.userId) }}</span
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
          class="px-4 py-2 text-sm whitespace-nowrap text-left list-none divide-y divide-space-cadet"
          role="menu"
        >
          <li>
            <button type="button" class="block py-2" @click="handleEdit">
              Edit ToDo
            </button>
          </li>
          <li>
            <button
              type="button"
              class="block py-2 disabled:opacity-70"
              :class="{ 'animate-pulse': updatingTodo }"
              :disabled="updatingTodo"
              @click="handleComplete"
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
import { Todo, useUpdateTodo } from "../../composables/useJsonPlaceholder";
import { useTodo } from "./todoContext";
import DotsIcon from "@/assets/dots.svg";
import CheckmarkIcon from "@/assets/checkmark.svg";
import AppDropdown from "../app/AppDropdown.vue";

const props = defineProps({
  todo: {
    type: Object as PropType<Todo>,
    default: () => ({}),
    required: true,
  },
});

const { handleTodoEdit, refetchTodos, selectedTab, users } = useTodo();
const { mutate, result, loading: updatingTodo } = useUpdateTodo();

const showDropdown = ref(false);

function handleEdit() {
  handleTodoEdit({ ...props.todo });
  showDropdown.value = false;
}
async function handleComplete() {
  await mutate({
    ...props.todo,
    completed: true,
  });
  if (!result.value) return;
  if (selectedTab.value === "open") {
    selectedTab.value = "closed";
    return;
  }
  refetchTodos();
  showDropdown.value = false;
}
function getUserName(userId?: number) {
  return users.value.find((u) => u.id === userId)?.name;
}
</script>
