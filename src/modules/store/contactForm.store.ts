import { LanguageEnum } from '@/shared/enums/language.enum'
import { create } from 'zustand'
import { IContactFormDetail } from '../domain/contact.model'

interface contactFormState {
    formLang: IContactFormDetail
    setFormLang: (lang: LanguageEnum) => void
}

const mockFormLang = {
    en: {
        name: 'Full Name',
        nameValidateTxt: 'Please input your Full Name',
        age: 'Age',
        ageValidateTxt: 'Please input your Age as number',
        submitTxt: 'Submit',
        modalTitle: 'Confirmation',
        modalDesc: 'Do you want to create contact list ?',
        modalOkTxt: 'OK',
        modalCancelTxt: 'Cancel',
        errorMessage: 'Can not create contact list !',
        successMessage: 'Contact list was created',
    },
    th: {
        name: 'ชื่อ-นามสกุล',
        nameValidateTxt: 'กรุณากรอก ชื่อ-นามสกุล',
        age: 'อายุ',
        ageValidateTxt: 'กรุณากรอก อายุ เป็นตัวเลข',
        submitTxt: 'ตกลง',
        modalTitle: 'ยืนยันการสร้างรายชื่อติดต่อ',
        modalDesc: 'คุณต้องการที่จะสร้าง รายชื่อติดต่อ ใช่ไหม ?',
        modalOkTxt: 'ตกลง',
        modalCancelTxt: 'ยกเลิก',
        errorMessage: 'ไม่สามารถสร้างรายชื่อติดต่อได้ !',
        successMessage: 'รายชื่อติดต่อถูกสร้างแล้ว',
    },
}

export const useContactFormStore = create<contactFormState>((set) => ({
    formLang: mockFormLang.en,
    setFormLang: (lang: LanguageEnum) => {
        set(() => ({
            formLang: mockFormLang[lang],
        }))
    },
}))
