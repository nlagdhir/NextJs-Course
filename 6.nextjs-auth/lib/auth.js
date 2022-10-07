import { hash, compare } from 'bcryptjs'

export const hashPassword = async(password) => {
    const hashedpassword = await hash(password, 12);
    return hashedpassword;
}

export const verifyPassword = async (password, hashedpassword) => {
    const isValid = await compare(password, hashedpassword);
    return isValid;
}