<template>
  <div class="min-h-screen min-w-full flex items-center justify-center">
    <TodoProvider>
      <TodoContainer />
    </TodoProvider>
  </div>
</template>

<script setup lang="ts">
import { TodoProvider } from "./components/todo/todoContext";
import TodoContainer from "./components/todo/TodoContainer.vue";
</script>
