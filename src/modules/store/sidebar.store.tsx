import { create } from 'zustand'

import { LanguageEnum } from '@/shared/enums/language.enum'
import { type MenuProps } from 'antd'
import { CompassOutlined, HomeOutlined, MailOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { redirectToGoogleMaps } from '@/shared/helper/redirectToGoogleMap'
type MenuItem = Required<MenuProps>['items'][number]

interface siderState {
    currentPath: string
    isVisible: boolean
    toggleIsVisible: () => void
    siderDetail: MenuItem[]
    setSiderDetailLang: (lang: LanguageEnum) => void
}

const mockSiderDetail: { en: MenuItem[]; th: MenuItem[] } = {
    en: [
        {
            key: '/',
            icon: <HomeOutlined />,
            label: <Link href="/">Home</Link>,
        },
        {
            key: 'contact',
            label: 'Contact',
            icon: <MailOutlined />,
            children: [
                {
                    key: '/contact',
                    label: <Link href="/contact">Contact List</Link>,
                },
                {
                    key: '/contact/create',
                    label: <Link href="/contact/create">Create Contact</Link>,
                },
            ],
        },
        {
            key: 'location',
            icon: <CompassOutlined />,
            label: <div onClick={redirectToGoogleMaps}>Current location</div>,
        },
    ],
    th: [
        {
            key: '/',
            icon: <HomeOutlined />,
            label: <Link href="/">หน้าหลัก</Link>,
        },
        {
            key: 'contact',
            label: 'ติดต่อ',
            icon: <MailOutlined />,
            children: [
                {
                    key: '/contact',
                    label: <Link href="/contact">รายการติดต่อ</Link>,
                },
                {
                    key: '/contact/create',
                    label: (
                        <Link href="/contact/create">สร้างรายการติดต่อ</Link>
                    ),
                },
            ],
        },
        {
            key: 'location',
            icon: <CompassOutlined />,
            label: <div onClick={redirectToGoogleMaps}>ตำแหน่งปัจจุบัน</div>,
        },
    ],
}

export const useSiderStore = create<siderState>((set, get) => ({
    currentPath: '/',
    isVisible: false,
    toggleIsVisible: () => {
        set(() => ({
            isVisible: !get().isVisible,
        }))
    },
    siderDetail: mockSiderDetail.en,
    setSiderDetailLang: (lang: LanguageEnum) => {
        set(() => ({
            siderDetail: mockSiderDetail[lang],
        }))
    },
}))
