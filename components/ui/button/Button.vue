<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { type ButtonVariants, buttonVariants } from '.'
import { cn } from '@/lib/utils'
import { ReloadIcon } from '@radix-icons/vue'

interface Props extends PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  isLoading: false
})
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    :disabled="loading"
  >
    <template v-if="loading">
      <ReloadIcon class="w-4 h-4 mr-2 animate-spin" />
      <template v-if="size !== 'icon'">
        Please wait
      </template>
    </template>
    <slot v-else />
  </Primitive>
</template>
