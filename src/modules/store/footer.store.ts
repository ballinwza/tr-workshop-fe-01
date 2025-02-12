import { create } from 'zustand'

import { LanguageEnum } from '@/shared/enums/language.enum'
import { IFooter } from '../domain/footer.model'

interface footerState {
    footerDetail: IFooter
    setFooterDetailLang: (lang: LanguageEnum) => void
}

const mockFooterDetail: { en: IFooter; th: IFooter } = {
    en: {
        address: `Abbon Corporation Co., Ltd. The Nine Tower Grand Rama 9 Building A 30th Floor, 33/4 Rama 9 Road, Huai Khwang District, Bangkok 10310, Thailand`,
        phoneNumber: '02-055-6635',
        email: 'info@abbon.co.th',
        lineAddress: 'https://page.line.me/377aboho?openQrModal=true',
    },
    th: {
        address: `บริษัท แอ๊บบอน คอร์ปอเรชั่น จำกัด อาคาร เดอะไนน์ ทาวเวอร์ แกรนด์ พระรามเก้า อาคาร A ชั้น 30 33/4 ถนนพระราม 9 ห้วยขวาง ห้วยขวาง กรุงเทพมหานคร 10310`,
        phoneNumber: '02-055-6635',
        email: 'info@abbon.co.th',
        lineAddress: 'https://page.line.me/377aboho?openQrModal=true',
    },
}

export const useFooterStore = create<footerState>((set) => ({
    footerDetail: mockFooterDetail.en,
    setFooterDetailLang: (lang: LanguageEnum) => {
        set(() => ({
            footerDetail: mockFooterDetail[lang],
        }))
    },
}))
