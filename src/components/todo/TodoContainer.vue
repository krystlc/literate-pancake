<template>
  <div
    class="w-full h-screen sm:max-w-[375px] max-h-screen sm:max-h-[812px] flex flex-col shadow-2xl shadow-english-violet relative"
  >
    <TodoHeader />
    <aside class="p-4 pb-0">
      <TodoSearchbar />
    </aside>
    <hr
      class="my-4 w-16 mx-auto border-b-2 rounded transition-colors"
      :class="
        loadingTodos
          ? 'border-english-violet animate-pulse'
          : 'border-space-cadet'
      "
    />
    <main class="flex-1 overflow-auto px-4 pb-4 space-y-4 relative">
      <TodoListItem v-for="todo in todos" :key="todo.id" :todo="todo" />
      <p v-if="!loadingTodos && todos">No results</p>
    </main>
    <button
      type="button"
      class="bg-white rounded-full h-16 w-16 flex items-center justify-center absolute bottom-4 right-4"
      @click="showModal = true"
    >
      <span><PlusIcon /></span>
      <span class="sr-only">Create Todo</span>
    </button>
    <TodoModal v-model="showModal">
      <TodoItemEdit v-if="selectedTodoItem" />
      <TodoItemCreate v-else />
    </TodoModal>
  </div>
</template>

<script setup lang="ts">
import { useTodo } from "./todoContext";
import TodoHeader from "./TodoHeader.vue";
import TodoListItem from "./TodoListItem.vue";
import TodoModal from "./TodoModal.vue";
import TodoSearchbar from "./TodoSearchbar.vue";
import PlusIcon from "@/assets/plus.svg";
import TodoItemCreate from "./TodoItemCreate.vue";
import TodoItemEdit from "./TodoItemEdit.vue";

const { todos, showModal, selectedTodoItem, loadingTodos } = useTodo();
</script>
