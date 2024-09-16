import { account, ID } from '../appwrite/config';

async function login(email: string, password: string) {
    await account.createEmailPasswordSession(email, password);
    return await account.get();
}

async function register(email: string, password: string, name: string) {
    await account.create(ID.unique(), email, password, name);
    return await login(email, password);
}

async function logout() {
    await account.deleteSession('current');
}

async function getUser() {
    return await account.get();
}

export { login, register, logout, getUser };