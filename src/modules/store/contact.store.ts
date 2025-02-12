import { create } from 'zustand'
import { IContact, IHeaderContactColumns } from '../domain/contact.model'
import { LanguageEnum } from '@/shared/enums/language.enum'

interface contactState {
    page: number
    setPage: (page: number) => void
    pageSize: number
    setPageSize: (pageSize: number) => void
    contactDetail: IContact[]
    createContact: (formValue: IContact) => void
    deleteContactByKey: (formValue: IContact) => void
    setMaximumList: (newContactDetail: IContact[]) => void
    headerColumnsLang: IHeaderContactColumns
    setHeaderColumnsLang: (lang: LanguageEnum) => void
}

const mockContactList: IContact[] = [
    {
        key: '11',
        fullName: 'Edward D. George',
        age: 42,
    },
    {
        key: '12',
        fullName: 'Kenneth L. Matas',
        age: 53,
    },
    {
        key: '13',
        fullName: 'Albert N. Cooper',
        age: 32,
    },
    {
        key: '14',
        fullName: 'Max E. Hans',
        age: 58,
    },
    {
        key: '15',
        fullName: 'Heather G. Day',
        age: 27,
    },
    {
        key: '16',
        fullName: 'Laura L. Williams',
        age: 44,
    },
    {
        key: '17',
        fullName: 'Sharon D. Metcalf',
        age: 62,
    },
    {
        key: '18',
        fullName: 'Thomas M. Rosenthal',
        age: 28,
    },
    {
        key: '19',
        fullName: 'Sharon T. Davidson',
        age: 55,
    },
    {
        key: '21',
        fullName: 'คเชนทร์ชาติ จริงบำรุง',
        age: 77,
    },
    {
        key: '22',
        fullName: 'Milena Bodrova',
        age: 79,
    },
    {
        key: '23',
        fullName: 'สุบุษบง ชาวไร่อ้อย',
        age: 76,
    },
    {
        key: '24',
        fullName: 'Michael Fedorov',
        age: 71,
    },
    {
        key: '25',
        fullName: 'ดารินทร์ จินตรารักษ์',
        age: 83,
    },
    {
        key: '26',
        fullName: 'สุปถัมย์ สุขจงรัก',
        age: 71,
    },
    {
        key: '27',
        fullName: '有薗 康平',
        age: 78,
    },
    {
        key: '28',
        fullName: 'Tafutoteka',
        age: 55,
    },
    {
        key: '29',
        fullName: '阿河 優香',
        age: 73,
    },
    {
        key: '30',
        fullName: 'Zumokato',
        age: 55,
    },
    {
        key: '31',
        fullName: 'Ortensia Milanesi',
        age: 68,
    },
    {
        key: '32',
        fullName: 'John Wick',
        age: 44,
    },
]

const mockHeaderColumns: {
    en: IHeaderContactColumns
    th: IHeaderContactColumns
} = {
    en: {
        numeric: 'No',
        fullName: 'Full Name',
        age: 'Age',
        action: {
            head: 'Action',
            title: 'Delete contact',
            description: 'Are you sure to delete this contact ?',
            confirmMessage: 'Contact was deleted !',
            cancelMessage: 'Contact not delete',
            okTextBtn: 'Delete',
            cancelTextBtn: 'Cancel',
        },
    },
    th: {
        numeric: 'หมายเลข',
        fullName: 'ชื่อ-นามสกุล',
        age: 'อายุ',
        action: {
            head: 'เครื่องมือ',
            title: 'ลบรายชื่อติดต่อ',
            description: 'คุณต้องการที่จะลบรายชื่อติดต่อนี้ใช่ไหม ?',
            confirmMessage: 'รายชื่อติดต่อ ถูกลบแล้ว !',
            cancelMessage: 'รายชื่อติดต่อ ยังไม่ถูกลบ',
            okTextBtn: 'ลบ',
            cancelTextBtn: 'ยกเลิก',
        },
    },
}

export const useContactStore = create<contactState>((set, get) => ({
    page: 1,
    setPage: (page: number) => {
        set(() => ({
            page,
        }))
    },
    pageSize: 20,
    setPageSize: (pageSize: number) => {
        set(() => ({
            pageSize,
        }))
    },
    contactDetail: mockContactList,
    setMaximumList: (newContactDetail: IContact[]) => {
        if (newContactDetail.length > 100) {
            set(() => ({
                contactDetail: get().contactDetail,
            }))
        } else {
            set(() => ({
                contactDetail: newContactDetail,
            }))
        }
    },
    createContact: (formValue: IContact) => {
        get().setMaximumList([...get().contactDetail, formValue])
    },
    deleteContactByKey: (formValue: IContact) => {
        set(() => ({
            contactDetail: get().contactDetail.filter(
                (item) => item.key !== formValue.key,
            ),
        }))
    },
    headerColumnsLang: mockHeaderColumns.en,
    setHeaderColumnsLang: (lang: LanguageEnum) => {
        set(() => ({
            headerColumnsLang: mockHeaderColumns[lang],
        }))
    },
}))
