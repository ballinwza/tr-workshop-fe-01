import { create } from 'zustand'
import { IHeader } from '../domain/header.model'
import { LanguageEnum } from '@/shared/enums/language.enum'

interface headerState {
    headerDetail: IHeader
    setHeaderDetailLang: (lang: LanguageEnum) => void
    profileImage: string
    setProfileImage: (profileImage: string) => void
}

const mockHeaderDetail: { en: IHeader; th: IHeader } = {
    en: {
        fullname: 'Tradon Urasuk',
    },
    th: {
        fullname: 'ธราดร อุราสุข',
    },
}

export const useHeaderStore = create<headerState>((set) => ({
    headerDetail: mockHeaderDetail.en,
    setHeaderDetailLang: (lang: LanguageEnum) => {
        set(() => ({
            headerDetail: mockHeaderDetail[lang],
        }))
    },
    profileImage: '/icon/abbon-icon.jpg',
    setProfileImage: (profileImage: string) => {
        set(() => ({
            profileImage,
        }))
    },
}))
