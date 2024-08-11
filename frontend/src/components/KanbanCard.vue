<template>
  <div
    class="kanban-card bg-gray-100 rounded shadow p-3 mb-2 cursor-pointer"
    :draggable="true"
    @dragstart="onDragStart"
  >
    {{ card.title }}
  </div>
</template>

<script setup lang="ts">
  import type { Card } from "../utils/types";
  import { defineProps } from "vue";

  type DragStartEvent = (event: DragEvent) => void;

  const props = defineProps<{
    card: Card;
  }>();

  const onDragStart: DragStartEvent = (event: DragEvent) => {
    if (event.dataTransfer) {
      event.dataTransfer.setData("text/plain", props.card.id);
    }
  };
</script>
