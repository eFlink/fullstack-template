<script setup lang="ts">
import { SendHorizonalIcon } from 'lucide-vue-next';
import { useMutation } from '@tanstack/vue-query'

const { $client } = useNuxtApp()

const input = ref<string>()

/**
 * Query declarations
 */
const getPosts = $client.post.getPosts.useQuery()

/**
 * useMutation pattern defined
 */
const createPost = $client.post.createPost.useMutation()
watch(createPost.status, () => {
  if (createPost.status.value === 'success') {
    getPosts.refresh()
  }
})

</script>

<template>
  <div class="w-full flex flex-col justify-center items-center gap-y-6">
    <div class="flex space-x-4 max-w-xl">
      <Input v-model="input" />
      <!-- Add form validation to not need to put ! -->
      <Button 
        :disabled="!input"
        @click="() => createPost.mutate({name: input!})" 
        size="icon"
        variant="outline"
      >
      <SendHorizonalIcon class="w-4 h-4" />
    </Button>
    </div>
    <div>
      <h2>Posts</h2>
    </div>
    <div v-if="getPosts.status.value === 'success'" class="space-y-2">
      <div v-for="post in getPosts.data.value" class="flex space-x-4">
        <p>{{ post.id }}</p>
        <p>{{ post.name }}</p>
      </div>
    </div>
  </div>
</template>
