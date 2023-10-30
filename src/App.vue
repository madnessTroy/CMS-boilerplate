<script setup lang="ts">
import {RouterView} from 'vue-router'
import Header from '@/layouts/Header.vue'
import Sidebar from "@/layouts/Sidebar.vue";
</script>

<template>
    <Sidebar></Sidebar>

    <div class="p-4 sm:ml-64">

        <Header></Header>

        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <router-view></router-view>
        </div>

    </div>
</template>
