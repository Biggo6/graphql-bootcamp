import jwt from 'jsonwebtoken';

const generateToken = (userId) => {
    jwt.sign({
        userId: userId
    }, 'izwebishot!', {
        expiresIn: '7 days'
    })
}

export { generateToken as default }