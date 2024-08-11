<template>
  <div class="flex justify-around p-5 bg-gray-100 min-h-screen">
    <KanbanColumn
      v-for="status in columnStatuses"
      :key="status"
      :status="status"
      :cards="getCardsByStatus(status)"
      @move-card="onMoveCard"
    />
  </div>
</template>

<script setup lang="ts">
  import type { Card, TupleOf, ColumnStatus } from "../utils/types";
  import { ref, computed, type ComputedRef } from "vue";
  import KanbanColumn from "./KanbanColumn.vue";

  type GetCardsByStatusFn = (status: ColumnStatus) => Card[];

  type CardMoveEvent = (cardId: string, newStatus: ColumnStatus) => void;

  const cards = ref<Card[]>([
    { id: "1", title: "Task 1", status: "New" },
    { id: "2", title: "Task 7", status: "" },
    { id: "3", title: "Task 3", status: "New" },
    { id: "4", title: "Task 4", status: "New" },
    { id: "5", title: "Task 5", status: "New" },
    // Add more cards with various statuses
  ]);

  const columnStatuses: TupleOf<ColumnStatus, 4> = [
    "New",
    "To Do",
    "In Progress",
    "Done",
  ];

  const getCardsByStatus: ComputedRef<GetCardsByStatusFn> = computed(
    () => (status: ColumnStatus) => {
      return cards.value.filter((card) => card.status === status);
    }
  );

  const onMoveCard: CardMoveEvent = (
    cardId: string,
    newStatus: ColumnStatus
  ) => {
    const card = cards.value.find((card) => card.id === cardId);
    if (card) {
      card.status = newStatus;
    }
  };
</script>
