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
            <div v-for="(item, $idx) in sidebarItems"
                 :key="$idx"
                 class="cursor-pointer mt-2"
            >
                <div class="flex items-center p-3 w-full transition hover:bg-slate-200 rounded-xl"
                     :class="{'bg-slate-200': currentActive(item)}"
                     v-if="!item.children || !item.children.length">
                    <span class="material-icons material-icons-outlined md-24">{{ item.meta?.icon }}</span>
                    <RouterLink
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
                                :class="{'bg-slate-200': currentActive(item)}"
                                @click="onClickAccor(item.name)"
                            >
                                <div class="flex">
                                    <p class="material-icons material-icons-outlined md-24">
                                        {{ item.meta?.icon }}
                                    </p>
                                    <p class="ms-4 ">
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
    </aside>

    <slot/>

</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {type RouteRecordRaw, RouterLink, useRoute, useRouter} from "vue-router";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui/accordion'

const route = useRoute()
const router = useRouter()
const sidebarItems = router.options.routes.filter(route => route.name !== '404')

const activeAccordion = ref<RouteRecordRaw["name"]>('');

const currentActive = (currentRoute: RouteRecordRaw) => route.name === currentRoute.name
const onClickAccor = (currentRouteName: RouteRecordRaw["name"]) =>
    activeAccordion.value = currentRouteName === activeAccordion.value
        ? '' : currentRouteName

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
