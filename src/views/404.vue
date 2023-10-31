<template>
    <main id="not-found">
        <div class="flex flex-col items-center justify-center">
            <div class="w-1/3">
                <img src="@/assets/images/404-bg.svg" alt="404-image">
            </div>
            <Button variant="wc-primary">
                <RouterLink to="/dashboard">Back to Dashboard</RouterLink>
            </Button>
        </div>
    </main>
</template>

<script setup lang="ts">
import {RouterLink} from "vue-router";
import Button from "@/components/ui/button/Button.vue";
</script>

<style lang="scss">
#not-found {
    max-width: 1920px;
    max-height: 100vh;
}
</style>
