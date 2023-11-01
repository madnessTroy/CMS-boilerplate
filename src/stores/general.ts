import {defineStore} from 'pinia'

type State = {
    isCompactSidebar: boolean
    isScrollingScreen: boolean
}

export const useGeneralStore = defineStore('general', {
    state: (): State => ({
        isCompactSidebar: false,
        isScrollingScreen: false
    }),

    actions: {
        updateCompactSidebar(compactStatus: boolean): void {
            this.isCompactSidebar = compactStatus
        },
        updateScrollingScreen(scrollingStatus: boolean): void {
            this.isScrollingScreen = scrollingStatus
        }
    }
})
