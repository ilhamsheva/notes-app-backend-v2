import jwt from 'jsonwebtoken';
import {InvariantError} from '../exceptions/index.js';

const TokenManager = {
    generateAccessToken: (payload) => jwt.sign(payload, process.env.ACCESS_TOKEN),
    generateRefreshToken: (payload) => jwt.sign(payload, process.env.REFRESH_TOKEN),
    verifyRefreshToken: (refreshToken) => {
        try {
            const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
            return payload;
        } catch (error) {
            console.log("Error on token: ", error);
            return new InvariantError("Refresh token tidak valid");
        }
    }
};

export default TokenManager;