import {defineStore} from 'pinia'

type State = {
    isCompactSidebar: boolean
}

export const useGeneralStore = defineStore('general', {
    state: (): State => ({
        isCompactSidebar: false
    }),

    actions: {
        updateCompactSidebar(compactStatus: boolean): void {
            this.isCompactSidebar = compactStatus
        }
    }
})
