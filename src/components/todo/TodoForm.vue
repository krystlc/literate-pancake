<template>
  <form action="" @submit.prevent="$emit('action:submit')">
    <fieldset class="space-y-4">
      <div>
        <label for="title">
          <span class="sr-only">Title</span>
          <input
            type="text"
            id="title"
            v-model="modelValue.title"
            placeholder="New todo"
            required
          />
        </label>
      </div>
      <div>
        <select
          name="users"
          id="users"
          placeholder="User"
          class="form-select"
          required
          v-model="modelValue.userId"
        >
          <option :value="undefined" disabled>User</option>
          <option v-for="user in users" :value="user.id">
            {{ user.name }}
          </option>
        </select>
      </div>
      <div>
        <select
          name="completed"
          id="status"
          placeholder="Status"
          class=""
          required
          v-model="modelValue.completed"
        >
          <option disabled :value="undefined">Status</option>
          <option :value="false">Open</option>
          <option :value="true">Close</option>
        </select>
      </div>
    </fieldset>
    <fieldset class="action p-8" :disabled="loading">
      <button class="bg-light-green text-white font-medium">Finish</button>
      <button type="button" @click="$emit('action:cancel')">Quit</button>
    </fieldset>
  </form>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { useTodo } from "./todoContext";

defineProps({
  modelValue: {
    type: Object as PropType<{
      id?: number;
      title?: string;
      completed?: boolean;
      userId?: number;
    }>,
    default: () => ({}),
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
    required: false,
  },
});

defineEmits(["action:submit", "action:cancel"]);

const { users } = useTodo();
</script>

<style scoped>
.action button {
  @apply py-4 text-center block w-full rounded-md text-lg;
}
form input,
form select {
  @apply w-full h-12 bg-space-cadet border-none text-white rounded-md placeholder:text-white;
}
</style>
