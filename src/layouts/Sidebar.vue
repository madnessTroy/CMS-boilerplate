<template>
    <aside id="sidebar-multi-level-sidebar"
           class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
           aria-label="Sidebar">
        <div class="h-full px-3 py-4 overflow-y-auto bg-sky-50">
            <div class="flex items-center gap-2 mb-6">
                <div class="w-14">
                    <img src="@/assets/images/logo.webp" alt="logo">
                </div>
                <h4 class="text-2xl font-bold">
                    Web
                    <span class="text-wc-primary">CMS</span>
                </h4>
            </div>
            <!--            <div>-->
            <!--                <label for="changeTheme">123</label>-->
            <!--                <Switch-->
            <!--                    id="changeTheme"-->
            <!--                    :checked="isDark"-->
            <!--                    @update:checked="onChangeTheme"-->
            <!--                ></Switch>-->
            <!--            </div>-->

            <!-- No sub-menu -->
            <div v-for="(item, $idx) in SidebarItems"
                 :key="$idx"
                 class="cursor-pointer mt-2"
            >
                <div class="flex items-center p-3 w-full transition hover:bg-slate-200 rounded-xl"
                     :class="{'bg-slate-200': currentActive(item)}"
                     v-if="!item.hasChild">
                    <span class="material-icons material-icons-outlined md-24">{{ item.icon }}</span>
                    <RouterLink
                        class="ms-4"
                        :to="{name: item.route}"
                    >
                        {{ item.name }}
                    </RouterLink>
                </div>

                <!-- Has sub-menu -->
                <template v-else>
                    <Accordion class="w-full" collapsible type="single" :model-value="activeAccordion"
                               @click="onClickAccor(item.route)">
                        <AccordionItem :value="item.route">
                            <AccordionTrigger
                                class="font-normal flex items-center p-3 w-full transition hover:bg-slate-200 rounded-xl"
                                :class="{'bg-slate-200': currentActive(item)}"
                            >
                                <div>
                                    <span class="material-icons material-icons-outlined md-24">{{ item.icon }}</span>
                                    <span class="ms-4">{{ item.name }}</span>
                                </div>
                            </AccordionTrigger>
                            <div class="mt-2"></div>
                            <AccordionContent
                                v-for="child in item.children" :key="child.name" :value="child.name"
                                class="ps-16 text-sm duration-200 hover:ms-1 hover:text-wc-primary">
                                <RouterLink :to="{name: child.route}" class="block"
                                            :class="{'text-wc-primary': currentActive(child)}">
                                    {{ child.name }}
                                </RouterLink>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </template>
            </div>
        </div>
    </aside>

    <slot/>

</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {RouterLink, useRoute} from "vue-router";
import {SidebarItems} from "@/utils/SidebarItems";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion'
import type {SidebarItem} from "@/@types/global";

const route = useRoute()

const isDark = ref(false)
const isOpen = ref(true)
const activeAccordion = ref('')

const onChangeTheme = () => isDark.value = !isDark.value

const currentActive = (itemRoute: SidebarItem) => {
    if (!itemRoute.hasChild)
        return route?.name === itemRoute.route.toLowerCase()

    else if (itemRoute.children && itemRoute.children.length)
        return itemRoute.children.find(child => child.route === route.name)
}

const onClickAccor = (routeName: string) => activeAccordion.value = routeName

watch(
    () => route.name,
    () => {
        const temp = SidebarItems.find((item: SidebarItem) => {
            if (!item.hasChild)
                return item.route === route.name

            else if (item.children && item.children.length)
                return item.children.find(child => child.route === route.name)
        })

        return activeAccordion.value = temp?.route || ''
    }
)
</script>
