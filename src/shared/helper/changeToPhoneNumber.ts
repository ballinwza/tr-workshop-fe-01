export const changeToPhoneNumber = (phone: string) => {
    return phone.split('-').join('').slice(1, phone.length)
}
