import { hash } from 'bcryptjs';

export const hashPassword = async(password) => {
    const salt = 10;
    try {
        const newPassword = await hash(password, salt);
        return newPassword;
    } catch (error) {
        throw new Error("Hubo un error al ingresar datos en el formulario");
    }
}