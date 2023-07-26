<template>
  <form action="" @submit.prevent="">
    <fieldset>
      <div class="relative">
        <input
          type="text"
          id="search"
          v-model="searchInput"
          placeholder="Search Todo's"
          class="bg-space-cadet border-none rounded-md w-full h-12 placeholder:text-white text-white text-sm"
        />
        <button class="absolute right-4 flex items-center h-full top-0">
          <span><SearchIcon /></span>
          <span class="sr-only">Search</span>
        </button>
      </div>
    </fieldset>
  </form>
</template>

<script setup lang="ts">
import SearchIcon from "@/assets/search.svg";
import { useTodo } from "./todoContext";

const { searchInput } = useTodo();
</script>
