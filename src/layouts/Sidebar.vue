<template>
    <aside id="sidebar-multi-level-sidebar"
           class="fixed top-0 left-0 z-40 h-screen transition-all duration-300 overflow-x-hidden sm:translate-x-0 border-e-2 border-sky-100"
           @mouseover="onEnterSidebar" @mouseleave="onLeaveSidebar"
           :class="[isCompactSidebar && !isHoverSidebar ? 'w-20' : 'w-64']">
        <div class="flex flex-col h-full px-3 py-4 overflow-y-auto bg-sky-50">
            <!-- Logo -->
            <div class="flex justify-between items-center gap-2 mb-6">
                <RouterLink to="/" class="flex items-center gap-2">
                    <div class="w-14">
                        <img src="@/assets/images/logo.webp" alt="logo">
                    </div>
                    <h4 v-show="(!isCompactSidebar && !isHoverSidebar) || (isCompactSidebar && isHoverSidebar)"
                        class="text-2xl font-bold transition duration-200">
                        Web <span class="text-wc-primary">CMS</span>
                    </h4>
                </RouterLink>
                <div v-show="(!isCompactSidebar && !isHoverSidebar) || (isCompactSidebar && isHoverSidebar)"
                     class="material-icons material-icons-outlined md-24 cursor-pointer"
                     @click="onExpandSidebar">
                    menu
                </div>
            </div>

            <!-- Menu items -->
            <div class="flex-1">
                <div v-for="(item, $idx) in sidebarItems"
                     :key="$idx"
                     class="cursor-pointer mt-2"
                >
                    <!-- No sub-menu -->
                    <div class="flex items-center p-3 w-full transition hover:bg-slate-200 rounded-xl"
                         :class="{'bg-slate-200': currentActive(item), 'justify-center': (isCompactSidebar && !isHoverSidebar) || (!isCompactSidebar && isHoverSidebar)}"
                         v-if="!item.children || !item.children.length">
                        <span class="material-icons material-icons-outlined md-24">{{ item.meta?.icon }}</span>
                        <RouterLink
                            v-show="(!isCompactSidebar && !isHoverSidebar) || (isCompactSidebar && isHoverSidebar)"
                            class="w-full ms-4 capitalize"
                            :to="{name: item.name}"
                        >
                            {{ item.meta?.title }}
                        </RouterLink>
                    </div>

                    <!-- Has sub-menu -->
                    <template v-else>
                        <Accordion class="w-full" collapsible type="single" :model-value="activeAccordion as string">
                            <AccordionItem :value="item.name as string">
                                <AccordionTrigger
                                    class="font-normal flex items-center p-3 w-full transition hover:bg-slate-200 rounded-xl"
                                    :class="{'bg-slate-200': currentActive(item), 'justify-center': (isCompactSidebar && !isHoverSidebar) || (!isCompactSidebar && isHoverSidebar)}"
                                    @click="onClickAccor(item.name)"
                                    :show-arrow="!isCompactSidebar || isHoverSidebar"
                                >
                                    <div class="flex">
                                        <p class="material-icons material-icons-outlined md-24">
                                            {{ item.meta?.icon }}
                                        </p>
                                        <p v-show="(!isCompactSidebar && !isHoverSidebar) || (isCompactSidebar && isHoverSidebar)"
                                           class="ms-4">
                                            <span class="capitalize">{{ item.meta?.title }}</span>
                                        </p>
                                    </div>
                                </AccordionTrigger>
                                <div class="mt-2"></div>
                                <AccordionContent
                                    v-for="child in item.children" :key="child.name" :value="child.name"
                                    class="ps-16 text-sm duration-200 hover:ms-1 hover:text-wc-primary">
                                    <RouterLink :to="{name: child.name}" class="block capitalize"
                                                :class="{'text-wc-primary': currentActive(child)}">
                                        {{ child.meta?.title }}
                                    </RouterLink>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </template>
                </div>
            </div>
            <!-- Current Profile -->
            <div class="mt-auto border-t-2 border-sky-100">
                <div class="flex items-center gap-2 mt-4">
                    <div class="w-10 h-10">
                        <img class="rounded-lg w-full h-full" src="@/assets/images/avatar.jpeg" alt="avatar">
                    </div>
                    <div>
                        <p class="text-lg font-bold">Admin WC</p>
                        <p class="text-xs">Administrations</p>
                    </div>
                    <div class="ms-auto">
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <span class="material-icons material-symbols-outlined cursor-pointer md-24">
                                    more_vert
                                </span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="top">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator/>
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Billing</DropdownMenuItem>
                                <DropdownMenuItem>Team</DropdownMenuItem>
                                <DropdownMenuItem>Subscription</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </div>
    </aside>

    <slot/>

</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {type RouteRecordRaw, RouterLink, useRoute, useRouter} from "vue-router";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {useGeneralStore} from "@/stores/general";

const route = useRoute()
const router = useRouter()
const generalStore = useGeneralStore()
const sidebarItems = router.options.routes.filter(route => route.name !== '404')

const activeAccordion = ref<RouteRecordRaw["name"]>('');
const isHoverSidebar = ref(false)
const isCompactSidebar = ref(false)

const currentActive = (currentRoute: RouteRecordRaw) => {
    if (!currentRoute.children || !currentRoute.children.length)
        return route?.name === currentRoute.name

    return currentRoute.children.find(child => child.name === route.name)
}
const onClickAccor = (currentRouteName: RouteRecordRaw["name"]) =>
    activeAccordion.value = currentRouteName === activeAccordion.value
        ? '' : currentRouteName

const onEnterSidebar = () => {
    if (!isCompactSidebar.value) return
    return isHoverSidebar.value = true
}

const onLeaveSidebar = () => {
    if (!isCompactSidebar.value) return
    return isHoverSidebar.value = false
}

const onExpandSidebar = () => {
    isCompactSidebar.value = !isCompactSidebar.value;
    isHoverSidebar.value = isCompactSidebar.value
    return generalStore.updateCompactSidebar(isCompactSidebar.value)
}

watch(
    () => route.name,
    () => {
        const temp = sidebarItems.find((item) => {
            if (!item.children || !item.children.length)
                return item.name === route.name

            return item.children.find(child => child.name === route.name)
        })

        return activeAccordion.value = temp?.name || ''
    }
)
</script>
