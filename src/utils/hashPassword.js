import bcrypt from 'bcryptjs';

const hashPassword = (password) => {
    if(password.length < 8) {
        throw new Error('Password must be 9 characters or longer')
    }

    const hashPasswordx = bcrypt.hash(password, 10);
    return hashPasswordx;
}

export { hashPassword as default }