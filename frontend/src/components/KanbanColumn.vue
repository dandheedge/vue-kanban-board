<template>
  <div
    class="kanban-column flex flex-col flex-shrink-0 w-48"
    @dragover.prevent
    @drop="onDrop"
  >
    <div class="flex items-center flex-shrink-0 h-10 px-2">
      <span class="block text-sm font-semibold">{{ stage.name }}</span>
      <span
        class="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30"
        >{{ contacts.length }}</span
      >
    </div>
    <div class="flex flex-col pb-2 overflow-auto">
      <KanbanCard
        v-for="contact in contacts"
        :key="contact.id"
        :card="contact"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { contactSchema } from "../utils/types/contact";
  import type { stageSchema } from "../utils/types/stage";
  import { defineProps, defineEmits } from "vue";
  import KanbanCard from "./KanbanCard.vue";
  import type { z } from "zod";

  const props = defineProps<{
    stage: z.infer<typeof stageSchema>;
    contacts: z.infer<typeof contactSchema>[];
  }>();

  const emit =
    defineEmits<(event: "moveCard", cardId: string, status: string) => void>();

  const onDrop = (event: DragEvent) => {
    const cardId = event.dataTransfer?.getData("text/plain");
    if (cardId) {
      emit("moveCard", cardId, props.stage.id);
    }
  };
</script>
