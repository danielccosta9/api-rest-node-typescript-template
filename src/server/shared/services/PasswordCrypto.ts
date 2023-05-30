import { compare, genSalt, hash } from 'bcryptjs';

const SALT_ROUNDS = 10;

const hashPassword = async (password: string) => {
    const saltGenerator = await genSalt(SALT_ROUNDS);

    return await hash(password, saltGenerator);
};

const verifyPassword = async (password: string, hashedPassword: string) => {
    return await compare(password, hashedPassword);
};

export const PasswordCrypto = {
    hashPassword,
    verifyPassword,
};