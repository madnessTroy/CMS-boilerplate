<script setup lang="ts">
import {
    AccordionHeader,
    AccordionTrigger,
    type AccordionTriggerProps,
} from 'radix-vue'
import {ChevronDown} from 'lucide-vue-next'
import {cn} from '@/lib/utils'

import {computed} from "vue";

interface ExtendAccordionTriggerProps extends AccordionTriggerProps {
    showArrow: boolean
}

const props = defineProps<ExtendAccordionTriggerProps & { class?: string }>()
const showArrow = computed(() => props.showArrow)
</script>

<template>
    <AccordionHeader class="flex" as="div">
        <AccordionTrigger
            v-bind="props"
            :class="
                cn(
                  'flex flex-1 items-center justify-between font-medium transition-all [&[data-state=open]>svg]:rotate-180',
                  props.class,
                )
            "
        >
            <slot/>
            <ChevronDown
                v-show="showArrow"
                class="h-4 w-4 shrink-0 transition-transform duration-200"
            />
        </AccordionTrigger>
    </AccordionHeader>
</template>
