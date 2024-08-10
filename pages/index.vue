<script setup lang="ts">
import { SendHorizonalIcon } from 'lucide-vue-next';

const { $client } = useNuxtApp()

const input = ref<string>()

const hello = $client.hello.useQuery({
  text: 'user'
})

const mutation = $client.mutation.useMutation()
</script>

<template>
  <div>
    <div>
      {{ hello.data.value ? hello.data.value.greeting : 'Loading' }}
    </div>
    <div class="flex space-x-4 max-w-xl">
      <Input v-model="input" />
      <Button 
        @click="mutation.mutate({text: input ?? 'Empty'})" 
        size="icon"
        variant="outline"
      >
      <SendHorizonalIcon class="w-4 h-4" />
    </Button>
    </div>
    <div>
      {{ mutation.status.value === 'success' ? mutation.data.value : 'not queried' }}
    </div>
  </div>
</template>
