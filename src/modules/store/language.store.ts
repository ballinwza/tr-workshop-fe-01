import { create } from 'zustand'
import { useHeaderStore } from './header.store'
import { LanguageEnum } from '@/shared/enums/language.enum'
import { useFooterStore } from './footer.store'
import { useSiderStore } from './sidebar.store'
import { useContactListStore } from './contactList.store'
import { useContactFormStore } from './contactForm.store'

interface languageState {
    currentLang: LanguageEnum
    setCurrentLang: (lang: LanguageEnum) => void
    toggleCurrentLang: () => void
    setLanguage: () => void
}

export const useLanguageStore = create<languageState>((set, get) => ({
    currentLang: LanguageEnum.en,
    setCurrentLang: (lang: LanguageEnum) => {
        set(() => ({
            currentLang: lang,
        }))
        get().setLanguage()
    },
    toggleCurrentLang: () => {
        set(() => ({
            currentLang:
                get().currentLang === LanguageEnum.en
                    ? LanguageEnum.th
                    : LanguageEnum.en,
        }))
        get().setLanguage()
    },
    setLanguage: () => {
        useHeaderStore.getState().setHeaderDetailLang(get().currentLang)
        useFooterStore.getState().setFooterDetailLang(get().currentLang)
        useSiderStore.getState().setSiderDetailLang(get().currentLang)
        useContactListStore.getState().setHeaderColumnsLang(get().currentLang)
        useContactFormStore.getState().setFormLang(get().currentLang)
    },
}))
