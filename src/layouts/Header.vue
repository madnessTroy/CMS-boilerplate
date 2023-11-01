<template>
    <header class="flex justify-between items-center p-6 transition-all duration-200"
            :class="{'fixed container mx-auto px-10 bg-amber-300 shadow-lg rounded-xl': isScrollingScreen}">
        <div>
            <HoverCard :open-delay="0" :close-delay="100">
                <HoverCardTrigger>Hover</HoverCardTrigger>
                <HoverCardContent>
                    <div>123</div>
                    <div class="mt-4">123</div>
                    <div class="mt-4">123</div>
                    <div class="mt-4">123</div>
                </HoverCardContent>
            </HoverCard>
        </div>
        <div class="flex items-center gap-3">
            <div class="w-8 cursor-pointer">
                <img class="w-full h-full" src="@/assets/images/vn-flag.svg" alt="locale">
            </div>
            <div>
                <Switch
                    :checked="isDarkMode"
                    @update:checked="(value) => isDarkMode = value"
                />
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {storeToRefs} from "pinia";

import {HoverCard, HoverCardContent, HoverCardTrigger} from '@/components/ui/hover-card'
import {Switch} from '@/components/ui/switch'
import {useGeneralStore} from "@/stores/general";

const generalStore = useGeneralStore()
const {isScrollingScreen} = storeToRefs(generalStore)
const isDarkMode = ref(false)
</script>
