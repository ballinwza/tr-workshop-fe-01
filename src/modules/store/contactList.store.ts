import { create } from 'zustand'
import { IContact, IHeaderContactColumns } from '../domain/contact.model'
import { LanguageEnum } from '@/shared/enums/language.enum'
import { shuffle } from 'radash'
import { v4 as uuid4 } from 'uuid'
interface contactListState {
    page: number
    setPage: (page: number) => void
    pageSize: number
    setPageSize: (pageSize: number) => void
    contactDetail: IContact[]
    setContactDetailMax100: () => void
    createContact: (formValue: IContact) => void
    deleteContactByKey: (formValue: IContact) => void
    headerColumnsLang: IHeaderContactColumns
    setHeaderColumnsLang: (lang: LanguageEnum) => void
    searchValue: string
    setSearchValue: (searchValue: string) => void
    onSearching: () => void
}

let mockContactList: IContact[] = [
    {
        key: uuid4(),
        fullName: 'Edward D. George',
        age: 42,
    },
    {
        key: uuid4(),
        fullName: 'Kenneth L. Matas',
        age: 53,
    },
    {
        key: uuid4(),
        fullName: 'Albert N. Cooper',
        age: 32,
    },
    {
        key: uuid4(),
        fullName: 'Max E. Hans',
        age: 58,
    },
    {
        key: uuid4(),
        fullName: 'Heather G. Day',
        age: 27,
    },
    {
        key: uuid4(),
        fullName: 'Laura L. Williams',
        age: 44,
    },
    {
        key: uuid4(),
        fullName: 'Sharon D. Metcalf',
        age: 62,
    },
    {
        key: uuid4(),
        fullName: 'Thomas M. Rosenthal',
        age: 28,
    },
    {
        key: uuid4(),
        fullName: 'Sharon T. Davidson',
        age: 55,
    },
    {
        key: uuid4(),
        fullName: 'คเชนทร์ชาติ จริงบำรุง',
        age: 77,
    },
    {
        key: uuid4(),
        fullName: 'Milena Bodrova',
        age: 79,
    },
    {
        key: uuid4(),
        fullName: 'สุบุษบง ชาวไร่อ้อย',
        age: 76,
    },
    {
        key: uuid4(),
        fullName: 'Michael Fedorov',
        age: 71,
    },
    {
        key: uuid4(),
        fullName: 'ดารินทร์ จินตรารักษ์',
        age: 83,
    },
    {
        key: uuid4(),
        fullName: 'สุปถัมย์ สุขจงรัก',
        age: 71,
    },
    {
        key: uuid4(),
        fullName: '有薗 康平',
        age: 78,
    },
    {
        key: uuid4(),
        fullName: 'Tafutoteka',
        age: 55,
    },
    {
        key: uuid4(),
        fullName: '阿河 優香',
        age: 73,
    },
    {
        key: uuid4(),
        fullName: 'Zumokato',
        age: 55,
    },
    {
        key: uuid4(),
        fullName: 'John Wick',
        age: 44,
    },
]

const assignNewKey = (uniq: number) =>
    mockContactList.map((item) => {
        item.key = uuid4() + uniq
        return {
            ...item,
        }
    })

var mockContactListWithRandom: IContact[] = [
    ...shuffle(assignNewKey(1)),
    ...shuffle(assignNewKey(2)),
    ...shuffle(assignNewKey(3)),
    ...shuffle(assignNewKey(4)),
    ...shuffle(assignNewKey(5)),
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

export const useContactListStore = create<contactListState>((set, get) => ({
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
    contactDetail: [],
    setContactDetailMax100: () => {
        set(() => ({
            contactDetail: mockContactListWithRandom.slice(0, 100),
        }))
    },
    createContact: (formValue: IContact) => {
        if (mockContactListWithRandom.length < 100) {
            mockContactListWithRandom.push(formValue)
            get().setContactDetailMax100()
        }
    },
    deleteContactByKey: (formValue: IContact) => {
        mockContactListWithRandom = mockContactListWithRandom.filter(
            (item) => item.key !== formValue.key,
        )
        get().setContactDetailMax100()
        get().setSearchValue('')
    },
    headerColumnsLang: mockHeaderColumns.en,
    setHeaderColumnsLang: (lang: LanguageEnum) => {
        set(() => ({
            headerColumnsLang: mockHeaderColumns[lang],
        }))
    },
    searchValue: '',
    setSearchValue: (searchValue: string) => {
        set(() => ({
            searchValue,
        }))
        get().onSearching()
    },
    onSearching: () => {
        if (get().searchValue === '') {
            get().setPage(1)
            get().setContactDetailMax100()
        }

        if (get().searchValue.length >= 3) {
            get().setPage(1)
            set(() => ({
                contactDetail: mockContactListWithRandom.filter((item) =>
                    item.fullName
                        .toLowerCase()
                        .includes(get().searchValue.toLowerCase()),
                ),
            }))
        }
    },
}))
