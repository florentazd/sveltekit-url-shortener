export const isValidEmail = (email: string) => {
    return email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
}

export const isValidPassword = (password: string) => {
    return password.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])(?!^[0-9]*$)(?!^[a-zA-Z]*$).{8,}$/)
}
export const isSamePassword = (password: string, confirmPassword: string) => {
    return password === confirmPassword
}