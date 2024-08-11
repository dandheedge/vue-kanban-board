<!-- KanbanColumn.vue -->
<template>
  <div
    class="kanban-column bg-white shadow rounded p-4 flex-1 mx-2"
    @dragover.prevent
    @drop="onDrop"
  >
    <h2 class="font-bold mb-2">{{ status }}</h2>
    <KanbanCard v-for="card in cards" :key="card.id" :card="card" />
  </div>
</template>

<script setup lang="ts">
  import type { Card } from "../utils/types";
  import { defineProps, defineEmits } from "vue";
  import KanbanCard from "./KanbanCard.vue";

  const props = defineProps<{
    status: string;
    cards: Card[];
  }>();

  const emit =
    defineEmits<(event: "moveCard", cardId: string, status: string) => void>();

  const onDrop = (event: DragEvent) => {
    const cardId = event.dataTransfer?.getData("text/plain");
    if (cardId) {
      emit("moveCard", cardId, props.status);
    }
  };
</script>
