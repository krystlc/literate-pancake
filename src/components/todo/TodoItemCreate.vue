<template>
  <TodoForm
    v-model="form"
    :loading="loading"
    @action:submit="handleSubmit"
    @action:cancel="closeModal"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTodo } from "./todoContext";
import TodoForm from "./TodoForm.vue";
import { useCreateTodo } from "../../composables/useJsonPlaceholder";

const form = ref({
  completed: false,
  title: "",
  userId: undefined,
});

const { closeModal, selectedTab, refetchTodos } = useTodo();
const { mutate, loading, result } = useCreateTodo();
async function handleSubmit() {
  await mutate(form.value);
  if (!result.value) return;

  if (selectedTab.value === "closed" && form.value.completed) {
    await refetchTodos();
    closeModal();
  }
  selectedTab.value = form.value.completed ? "closed" : "open";
  closeModal();
}
</script>
