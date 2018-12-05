import bcrypt from 'bcryptjs';

const hashPassword = (password) => {
    if(password.length < 8) {
        throw new Error('Password must be 9 characters or longer')
    }

    const hashPassword = bcrypt.hash(apassword, 10);
    return hashPassword;
}

export { hashPassword as default }