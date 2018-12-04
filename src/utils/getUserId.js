import jwt from 'jsonwebtoken';

const getUserId = (req, requireAuth = true) => {
    
    const header = req.request.headers.authorization;
    if(header) {
        const token  = header.replace('Bearer ', '');
        const decode = jwt.verify(token, 'izwebishot!'); 
        return decode.userId;
    }

    if(requireAuth) {
        throw new Error('Authorization required');
    }

    return null;
    
}

export {getUserId as default}