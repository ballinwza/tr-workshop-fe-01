export interface IContact {
    key: string
    fullName: string
    age: number
}

export interface IHeaderContactColumns {
    numeric: string
    fullName: string
    age: string
    action: {
        head: string
        title: string
        description: string
        confirmMessage: string
        cancelMessage: string
        okTextBtn: string
        cancelTextBtn: string
    }
}

export interface IContactFormDetail {
    name: string
    nameValidateTxt: string
    age: string
    ageValidateTxt: string
    submitTxt: string
    modalTitle: string
    modalDesc: string
    modalOkTxt: string
    modalCancelTxt: string
    errorMessage: string
    successMessage: string
}
