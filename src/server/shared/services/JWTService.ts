import * as jwt from 'jsonwebtoken';

interface IJWTService {
    uid: number;
}

const sign = (data: IJWTService) => {
    if (!process.env.JWT_SECRET) return ('JWT_SECRET_NOT_FOUND');

    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const verify = (token: string): IJWTService | 'JWT_SECRET_NOT_FOUND' | 'INVALID_TOKEN' => {
    if (!process.env.JWT_SECRET) return ('JWT_SECRET_NOT_FOUND');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === 'string') return 'INVALID_TOKEN';

        return decoded as IJWTService;
    } catch (err) {
        return 'INVALID_TOKEN';
    }
};

export const JWTService = {
    sign,
    verify
};