<template>
    <template v-if="!isNotFound">
        <Sidebar></Sidebar>

        <div class="transition-spacing duration-200"
             :class="[isCompactSidebar? 'sm:ml-20' : 'sm:ml-64']">

            <div class="container mx-auto">
                <Header></Header>

                <div class="p-4 overflow-y-scroll" style="height: 30000px">
                    <RouterView></RouterView>
                </div>
            </div>
            
        </div>
    </template>

    <RouterView v-else></RouterView>
</template>

<script setup lang="ts">
import {RouterView, useRoute} from 'vue-router'
import {computed, nextTick, onMounted, ref, toRefs, watch} from "vue";

import Header from '@/layouts/Header.vue'
import Sidebar from "@/layouts/Sidebar.vue";
import {useGeneralStore} from "@/stores/general";
import {storeToRefs} from "pinia";
import {useWindowScroll} from '@vueuse/core'

const route = useRoute()
const generalStore = useGeneralStore()

const {isCompactSidebar} = storeToRefs(generalStore)

const {y: yAxis} = useWindowScroll()

watch(
    () => yAxis.value,
    (newValue) => {
        if (newValue && newValue > 50)
            return generalStore.updateScrollingScreen(true)
        return generalStore.updateScrollingScreen(false)
    }
)

const isNotFound = computed(_ => route.name === '404')
</script>
