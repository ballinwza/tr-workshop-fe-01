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
