<template>
  <div ref="target" class="relative">
    <div
      class="absolute end-0 z-10 mt-3 rounded-md bg-rich-black before:content-['▴'] before:absolute before:right-1 before:-top-5 before:text-2xl before:text-rich-black"
      role="menu"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";

const emit = defineEmits(["action:close"]);

const target = ref(null);

onClickOutside(target, () => emit("action:close"));
</script>
