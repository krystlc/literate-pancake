<template>
  <h2>Add Todo</h2>
  <TodoForm
    v-model="form"
    :loading="loading"
    @action:submit="handleSubmit"
    @action:cancel="closeModal"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import TodoForm from "./TodoForm.vue";
import { useTodo } from "./todoContext";
import { useUpdateTodo } from "../../composables/useJsonPlaceholder";

const { selectedTodoItem, closeModal, refetchTodos, selectedTab } = useTodo();
const form = ref({
  id: selectedTodoItem.value?.id!,
  title: selectedTodoItem.value?.title,
  completed: selectedTodoItem.value?.completed,
  userId: selectedTodoItem.value?.userId,
});

const { mutate, loading, result } = useUpdateTodo();
async function handleSubmit() {
  if (!form.value.id) return;

  await mutate(form.value);
  if (!result.value) return;

  selectedTab.value === "closed" && form.value.completed
    ? await refetchTodos()
    : (selectedTab.value = form.value.completed ? "closed" : "open");
  closeModal();
}
</script>
