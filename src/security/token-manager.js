import jwt from 'jsonwebtoken';
import {InvariantError} from '../exceptions/index.js';

const TokenManager = {
    generateAccessToken: (payload) => jwt.sign(payload, process.env.ACCESS_TOKEN),
    generateRefreshToken: (payload) => jwt.sign(payload, process.env.REFRESH_TOKEN),
    verifyAccessToken: (token) => {
        try {
            const payload = jwt.verify(token, process.env.ACCESS_TOKEN);
            return payload;
        } catch (error) {
            throw new InvariantError("Access token tidak valid");
        }
    },
    verifyRefreshToken: (refreshToken) => {
        try {
            const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
            return payload;
        } catch (error) {
            throw new InvariantError("Refresh token tidak valid");
        }
    }
};

export default TokenManager;