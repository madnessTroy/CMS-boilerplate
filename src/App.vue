<template>
    <template v-if="!isNotFound">
        <Sidebar></Sidebar>

        <div class="p-4 transition-spacing duration-200" :class="[isCompactSidebar? 'sm:ml-20' : 'sm:ml-64']">

            <Header></Header>

            <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
                <RouterView></RouterView>
            </div>

        </div>
    </template>

    <RouterView v-else></RouterView>
</template>

<script setup lang="ts">
import {RouterView, useRoute} from 'vue-router'
import {computed} from "vue";

import Header from '@/layouts/Header.vue'
import Sidebar from "@/layouts/Sidebar.vue";
import {useGeneralStore} from "@/stores/general";
import {storeToRefs} from "pinia";

const route = useRoute()
const generalStore = useGeneralStore()

const {isCompactSidebar} = storeToRefs(generalStore)

const isNotFound = computed(_ => route.name === '404')
</script>
