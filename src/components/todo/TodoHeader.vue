<template>
  <header class="bg-space-cadet sticky">
    <div class="flex justify-between py-8 px-4 text-white">
      <h1 class="text-4xl font-semibold">ToDo’s</h1>
      <button type="button">
        <span><DotsIcon /></span>
        <span class="sr-only">Menu</span>
      </button>
    </div>
    <nav class="flex justify-evenly">
      <button
        v-for="tab in tabOptions"
        :key="tab.value"
        type="button"
        @click="selectedTab = tab.value"
        class="border-b-2 pb-2 px-4"
        :class="
          selectedTab === tab.value
            ? 'border-white text-white'
            : 'border-transparent hover:text-white'
        "
      >
        {{ tab.key }}
      </button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import DotsIcon from "@/assets/dots.svg";
import { useTodo } from "./todoContext";

const { tabOptions, selectedTab } = useTodo();
</script>
