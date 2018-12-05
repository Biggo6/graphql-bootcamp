import jwt from 'jsonwebtoken';

const getUserId = (req, requireAuth = true) => {
    
    const header = req.request ? req.request.headers.authorization : req.connection.context.Authorization;
     
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