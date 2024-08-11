<template>
  <div class="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
    <KanbanColumn
      v-for="stage in stages"
      :key="stage.id"
      :stage="stage"
      :contacts="getCardsByStatus(stage.id)"
      @move-card="onMoveCard"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, type ComputedRef, onMounted } from "vue";
  import KanbanColumn from "./KanbanColumn.vue";
  import type { StagesResponse, stageSchema } from "../utils/types/stage";
  import type { ContactResponse, contactSchema } from "../utils/types/contact";
  import type { z } from "zod";

  const fetchData = async () => {
    try {
      const [stagesResponse, contactsResponse] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/stages`),
        fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contacts`),
      ]);

      const stagesData: StagesResponse = await stagesResponse.json();
      const contactsData: ContactResponse = await contactsResponse.json();

      stages.value = stagesData.results;
      contacts.value = contactsData.results;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  type GetCardsByStatusFn = (
    stageId: string
  ) => z.infer<typeof contactSchema>[];

  type CardMoveEvent = (cardId: string, newStageId: string) => void;

  const stages = ref<z.infer<typeof stageSchema>[]>([]);
  const contacts = ref<z.infer<typeof contactSchema>[]>([]);

  onMounted(async () => {
    await fetchData();
  });

  const getCardsByStatus: ComputedRef<GetCardsByStatusFn> = computed(
    () => (stageId: string) => {
      return contacts.value.filter((contact) => contact.stage === stageId);
    }
  );

  const onMoveCard: CardMoveEvent = (cardId: string, newStageId: string) => {
    const card = contacts.value.find((contact) => contact.id === cardId);
    if (card) {
      card.stage = newStageId;
    }
  };
</script>
