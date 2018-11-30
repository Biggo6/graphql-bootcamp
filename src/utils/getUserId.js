import jwt from 'jsonwebtoken';

const getUserId = (req) => {
    console.log(req)
    const header = req.request.headers.authorization;
    if(!header) {
        throw new Error('Authorization required');
    }

    const token  = header.replace('Bearer ', '');
    const decode = jwt.verify(token, 'izwebishot!'); 

    return decode.userId;


}

export {getUserId as default}