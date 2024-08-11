<script setup lang="ts">
  import KanbanBoard from "./components/KanbanBoard.vue";
</script>

<template>
  <div
    class="flex flex-col w-screen h-screen overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200"
  >
    <div class="px-10 mt-6">
      <h1 class="text-2xl font-bold">Contact Prospect Board</h1>
    </div>
    <KanbanBoard />
  </div>
</template>
