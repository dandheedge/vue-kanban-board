<template>
  <div
    class="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg bg-opacity-90 group hover:bg-opacity-100 cursor-move"
    :draggable="true"
    @dragstart="onDragStart"
  >
    <button
      class="absolute top-0 right-0 flex items-center justify-center hidden w-5 h-5 mt-3 mr-2 text-gray-500 rounded hover:bg-gray-200 hover:text-gray-700 group-hover:flex"
    >
      <svg
        class="w-4 h-4 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
        />
      </svg>
    </button>
    <span
      class="flex items-center h-6 px-3 text-xs font-semibold text-pink-500 bg-pink-100 rounded-full"
      >Status: {{ card.status }}</span
    >
    <h4 class="mt-3 text-sm font-medium">
      {{ card.full_name }}
    </h4>
  </div>
</template>

<script setup lang="ts">
  import type { z } from "zod";
  import type { contactSchema } from "../utils/types/contact";
  import { defineProps } from "vue";

  type DragStartEvent = (event: DragEvent) => void;

  const props = defineProps<{
    card: z.infer<typeof contactSchema>;
  }>();

  const onDragStart: DragStartEvent = (event: DragEvent) => {
    if (event.dataTransfer) {
      event.dataTransfer.setData("text/plain", props.card.id);
    }
  };
</script>
